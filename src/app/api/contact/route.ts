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

    const resend = new Resend(apiKey)

    const body = await req.json()
    const {
      fullName,
      businessName,
      email,
      phone,
      industry,
      callVolume,
      message,
    } = body

    const subjectBusiness = String(businessName ?? '').slice(0, 200)

    const toEmail =
      process.env.CONTACT_TO_EMAIL?.trim() || 'belvoroai@gmail.com'

    await resend.emails.send({
      from: 'Belvoro Website <onboarding@resend.dev>',
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
        <p>${escapeHtml(message).replace(/\r?\n/g, '<br />')}</p>
      `,
      replyTo: String(email ?? ''),
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
