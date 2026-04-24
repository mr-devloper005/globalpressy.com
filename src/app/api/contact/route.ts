import { NextResponse } from 'next/server'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Valid email required').max(320),
  topic: z.enum(['editorial', 'general', 'other']),
  subject: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().min(20, 'Please add a bit more detail (at least 20 characters)').max(10000),
})

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors
    const msg =
      first.name?.[0] || first.email?.[0] || first.message?.[0] || first.topic?.[0] || 'Invalid input'
    return NextResponse.json({ ok: false, error: msg }, { status: 400 })
  }

  const data = parsed.data
  const webhook = process.env.CONTACT_FORM_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact_form',
          ...data,
          at: new Date().toISOString(),
        }),
      })
    } catch {
      return NextResponse.json(
        { ok: false, error: 'We could not forward your message. Please try again or email us directly.' },
        { status: 502 }
      )
    }
  }

  return NextResponse.json({ ok: true })
}
