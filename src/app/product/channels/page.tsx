import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/site'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ChannelsContent from './ChannelsContent'
import ChannelsMoreSections from './ChannelsMoreSections'

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist for Calls, Texts & DMs | Belvoro AI",
  description: "Never miss a lead. Belvoro answers phone calls, SMS, email, Instagram, Facebook, WhatsApp and website chat instantly, from one AI front desk.",
  path: '/product/channels',
})

export default function ChannelsPage() {
  // Drop public/characters/call-avatar.png in and it replaces the caller photo on the call screen.
  const callAvatar = existsSync(path.join(process.cwd(), 'public', 'characters', 'call-avatar.png'))
    ? '/characters/call-avatar.png'
    : null

  return (
    <>
      <Navbar />
      <main>
        <ChannelsContent />
        <ChannelsMoreSections callAvatar={callAvatar} />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
