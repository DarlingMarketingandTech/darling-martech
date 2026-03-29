import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
  name:       z.string().min(1, 'Name is required'),
  company:    z.string().optional(),
  email:      z.string().email('Valid email required'),
  intent:     z.enum(['service', 'work', 'tool', 'unsure']).optional(),
  service:    z.string().optional(),
  toolOutput: z.string().optional(),
  challenge:  z.string().min(1, 'Primary challenge is required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const resend = new Resend(process.env.RESEND_API_KEY)

    const intentLabel: Record<string, string> = {
      service: 'Knows what they need',
      work:    'Came from work proof',
      tool:    'Just ran a tool',
      unsure:  'Not sure yet',
    }

    const subjectContext = data.service
      ?? (data.intent ? intentLabel[data.intent] : 'General inquiry')

    const companyFragment = data.company ? ` at ${data.company}` : ''

    await resend.emails.send({
      from:    'Darling MarTech <noreply@darlingmartech.com>',
      to:      ['jacob@jacobdarling.com'],
      replyTo: data.email,
      subject: `New inquiry from ${data.name}${companyFragment} — ${subjectContext}`,
      text: `
Name: ${data.name}
Company: ${data.company || 'N/A'}
Email: ${data.email}
Intent: ${data.intent ? intentLabel[data.intent] : 'N/A'}
${data.service ? `Service area: ${data.service}` : ''}
${data.toolOutput ? `Tool output / key finding: ${data.toolOutput}` : ''}

Primary challenge:
${data.challenge}
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
