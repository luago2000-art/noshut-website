import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getResend } from '@/lib/resend'
import { COMPANY } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Nome troppo corto'),
  company: z.string().optional(),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Messaggio troppo corto'),
})

const rateLimit = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 10 * 60 * 1000
  const entry = rateLimit.get(ip)
  if (!entry || entry.reset < now) {
    rateLimit.set(ip, { count: 1, reset: now + window })
    return true
  }
  if (entry.count >= 3) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', fields: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const { name, company, email, phone, service, message } = parsed.data

  try {
    const resend = getResend()
    await Promise.all([
      resend.emails.send({
        from: `NOSHUT Sito <noreply@noshut.it>`,
        to: [COMPANY.email],
        subject: `Nuovo contatto da ${name}${company ? ` — ${company}` : ''}`,
        text: `
Nome: ${name}
Azienda: ${company || 'N/D'}
Email: ${email}
Telefono: ${phone || 'N/D'}
Servizio: ${service || 'N/D'}

Messaggio:
${message}
        `.trim(),
      }),
      resend.emails.send({
        from: `NOSHUT <noreply@noshut.it>`,
        to: [email],
        subject: 'Abbiamo ricevuto la tua richiesta — NOSHUT',
        text: `
Ciao ${name},

grazie per averci contattato! Abbiamo ricevuto la tua richiesta e ti risponderemo entro 24 ore lavorative.

Il tuo messaggio:
${message}

---
NOSHUT — Luigi Agostino
${COMPANY.email}
${COMPANY.website}
        `.trim(),
      }),
    ])

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}
