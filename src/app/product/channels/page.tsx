import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import ChannelsContent from './ChannelsContent'
import ChannelsMoreSections from './ChannelsMoreSections'

export const metadata: Metadata = {
  title: 'Every Channel, Every Lead | Belvoro AI',
  description: 'Belvoro answers calls, texts, emails, Instagram, Facebook, WhatsApp, and website chat instantly. One AI front desk, connected across every channel.',
}

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
