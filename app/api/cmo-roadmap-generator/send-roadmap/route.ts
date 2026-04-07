import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { composeRoadmap } from '@/lib/cmo-roadmap-generator/compose-roadmap'
import { decodeIntakePayload } from '@/lib/cmo-roadmap-generator/intake-payload'
import { formatRoadmapEmailHtml, formatRoadmapEmailText } from '@/lib/cmo-roadmap-generator/roadmap-email-format'
import { checkRateLimit, getClientIp } from '@/lib/geo-auditor/rate-limiter'

export const runtime = 'nodejs'

const sendRoadmapBodySchema = z.object({
  d: z.string().min(1, 'Roadmap data is missing. Reload the results page and try again.'),
  email: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim().toLowerCase() : val),
    z.string().email('Please enter a valid email address').max(254),
  ),
  name: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim() : val),
    z.string().max(100).optional(),
  ),
  company: z.preprocess(
    (val) => (typeof val === 'string' ? val.trim() : val),
    z.string().max(200).optional(),
  ),
})

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = sendRoadmapBodySchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    const message = first?.message ?? 'Invalid request'
    return NextResponse.json({ error: message, details: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data

  const decoded = decodeIntakePayload(data.d)
  if (!decoded.ok) {
    return NextResponse.json(
      {
        error:
          decoded.error === 'missing'
            ? 'Roadmap data is missing. Open your roadmap from the intake flow again.'
            : 'This roadmap link is invalid or expired. Run the intake again to generate a new link.',
        code: 'INVALID_PAYLOAD',
      },
      { status: 400 },
    )
  }

  const roadmap = composeRoadmap(decoded.answers)

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Email delivery is not configured on this environment. Use “Copy share link” or print to keep your roadmap.',
        code: 'EMAIL_UNAVAILABLE',
      },
      { status: 503 },
    )
  }

  const ip = getClientIp(request)
  const rl = await checkRateLimit(ip, 'roadmap-send')
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: `Too many requests. Try again in about ${rl.resetIn} seconds.`,
        code: 'RATE_LIMITED',
      },
      { status: 429 },
    )
  }

  const textBody = formatRoadmapEmailText(roadmap, data.name)
  const htmlBody = formatRoadmapEmailHtml(roadmap, data.name)

  const companyNote = data.company ? ` (${data.company})` : ''
  const subjectName = data.name ? data.name : data.email

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Darling MarTech <noreply@darlingmartech.com>',
      to: [data.email],
      bcc: ['jacob@darlingmartech.com'],
      replyTo: data.email,
      subject: `Your 90-day marketing roadmap — ${subjectName}${companyNote}`,
      text: textBody,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[send-roadmap] Resend error:', error)
    return NextResponse.json(
      { error: 'The message could not be sent. Try again in a moment or use copy link / print.', code: 'SEND_FAILED' },
      { status: 500 },
    )
  }
}
