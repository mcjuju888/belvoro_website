import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Belvoro AI — Your Front Desk, On Autopilot',
  description: 'Belvoro answers every call, books appointments, qualifies leads, and follows up by SMS — around the clock, without hiring anyone.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
