import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Valid email required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Darling MarTech <noreply@darlingmartech.com>',
      to: ['jacob@jacobdarling.com'],
      replyTo: data.email,
      subject: `New inquiry from ${data.name}${data.company ? ` at ${data.company}` : ''} — ${data.service}`,
      text: `
Name: ${data.name}
Company: ${data.company || 'N/A'}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}
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
