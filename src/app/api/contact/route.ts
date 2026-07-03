import { Resend } from 'resend'
import { NextResponse } from 'next/server'

function escapeHtml(s: unknown): string {
  const str = String(s ?? '')
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Simple in-memory rate limit (per serverless instance, good enough to stop
// naive form spam; the honeypot catches most bots before this).
const hits = new Map<string, number[]>()
function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const list = (hits.get(key) ?? []).filter((t) => t > now - windowMs)
  if (list.length >= max) return true
  list.push(now)
  hits.set(key, list)
  return false
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey?.trim()) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email is not configured on the server.' },
        { status: 503 },
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const {
      fullName,
      businessName,
      email,
      phone,
      industry,
      callVolume,
      message,
      website, // honeypot
    } = body as Record<string, unknown>

    // Bots fill the hidden field. Pretend success and drop it.
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    // Server-side validation (mirrors the required fields on the form)
    const name = String(fullName ?? '').trim()
    const emailStr = String(email ?? '').trim()
    if (!name || name.length > 200) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) || emailStr.length > 320) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(`contact:${ip}`, 5, 3600000) || rateLimited(`contact-email:${emailStr.toLowerCase()}`, 3, 3600000)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later or email us directly.' },
        { status: 429 },
      )
    }

    const resend = new Resend(apiKey)
    const subjectBusiness = String(businessName ?? '').slice(0, 200) || name
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'belvoroai@gmail.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || 'Belvoro Website <onboarding@resend.dev>'

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Lead: ${subjectBusiness}`,
      html: `
        <h2>New Get Started Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Business:</strong> ${escapeHtml(businessName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Industry:</strong> ${escapeHtml(industry)}</p>
        <p><strong>Monthly Call Volume:</strong> ${escapeHtml(callVolume)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(String(message ?? '').slice(0, 5000)).replace(/\r?\n/g, '<br />')}</p>
      `,
      replyTo: emailStr,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    )
  }
}
