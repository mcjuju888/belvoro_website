import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { SITE_URL, pageMetadata } from '@/lib/site'
import './globals.css'

// Fonts are self-hosted by Next.js so they never block the page from rendering.
// The CSS uses them through var(--font-inter) and var(--font-jakarta).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Fallback for any page without its own title and description.
  ...pageMetadata({
    title: 'Belvoro AI | Your Front Desk, On Autopilot',
    description: 'Belvoro answers every call, text, DM, email, and website chat, books appointments against your live calendar, follows up until leads convert, and shows you the revenue it recovered.',
    path: '/',
  }),
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {children}
        {WIDGET_URL && WIDGET_KEY && (
          <Script src={WIDGET_URL} data-belvoro={WIDGET_KEY} strategy="lazyOnload" />
        )}
      </body>
    </html>
  )
}
