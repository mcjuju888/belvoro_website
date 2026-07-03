import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Belvoro AI — Your Front Desk, On Autopilot',
  description: 'Belvoro answers every call, text, DM, email, and website chat — books appointments against your live calendar, follows up until leads convert, and shows you the revenue it recovered.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  other: {
    'facebook-domain-verification': 'i9wtojplh1stieqe9xxvpkhsl45x1b',
  },
}

// Dogfood: the Belvoro chat widget on Belvoro's own site. Enable by setting
// NEXT_PUBLIC_BELVORO_WIDGET_URL (e.g. https://api.belvoroai.com/widget.js)
// and NEXT_PUBLIC_BELVORO_WIDGET_KEY (a tenant widget key) at build time.
const WIDGET_URL = process.env.NEXT_PUBLIC_BELVORO_WIDGET_URL
const WIDGET_KEY = process.env.NEXT_PUBLIC_BELVORO_WIDGET_KEY

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {WIDGET_URL && WIDGET_KEY && (
          <Script src={WIDGET_URL} data-belvoro={WIDGET_KEY} strategy="lazyOnload" />
        )}
      </body>
    </html>
  )
}
