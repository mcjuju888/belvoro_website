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
  return (
    <>
      <Navbar />
      <main>
        <ChannelsContent />
        <ChannelsMoreSections />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
