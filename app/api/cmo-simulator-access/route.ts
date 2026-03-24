// app/api/cmo-simulator-access/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Darling MarTech <noreply@darlingmartech.com>',
      to: ['jacob@jacobdarling.com'],
      subject: `New CMO Simulator signup — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Time: ${new Date().toISOString()}`,
        '',
        'Sent from darlingmartech.com/lab/cmo-simulator',
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('CMO Simulator access error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
