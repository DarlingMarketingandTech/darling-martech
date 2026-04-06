import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
  name:       z.string().min(1, 'Name is required').max(100),
  company:    z.string().max(200).optional(),
  email:      z.string().email('Valid email required').max(254),
  intent:     z.enum(['service', 'work', 'tool', 'unsure']).optional(),
  service:    z.string().max(200).optional(),
  toolOutput: z.string().max(1000).optional(),
  challenge:  z.string().min(1, 'Primary challenge is required').max(5000),
})

export async function POST(request: NextRequest) {
  // Reject non-JSON bodies early
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

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
  }

  const data = parsed.data

  const intentLabel: Record<string, string> = {
    service: 'Knows what they need',
    work:    'Came from work proof',
    tool:    'Just ran a tool',
    unsure:  'Not sure yet',
  }

  const subjectContext = data.service
    ?? (data.intent ? intentLabel[data.intent] : 'General inquiry')

  const companyFragment = data.company ? ` at ${data.company}` : ''

  const emailLines = [
    `Name: ${data.name}`,
    `Company: ${data.company || 'N/A'}`,
    `Email: ${data.email}`,
    `Intent: ${data.intent ? intentLabel[data.intent] : 'N/A'}`,
    data.service    ? `Service area: ${data.service}`               : null,
    data.toolOutput ? `Tool output / key finding: ${data.toolOutput}` : null,
    '',
    'Primary challenge:',
    data.challenge,
  ].filter((line): line is string => line !== null)

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from:    'Darling MarTech <noreply@darlingmartech.com>',
      to:      ['jacob@darlingmartech.com'],
      replyTo: data.email,
      subject: `New inquiry from ${data.name}${companyFragment} — ${subjectContext}`,
      text:    emailLines.join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
