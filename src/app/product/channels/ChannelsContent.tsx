'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ProductIntro, { type ProductFeature } from '@/components/product/ProductIntro'
import styles from './page.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const FEATURES: ProductFeature[] = [
  {
    title: 'Answers calls instantly',
    text: '24/7 AI receptionist with a natural, on-brand voice.',
    icon: (
      <svg {...iconProps}>
        <path d="M8.2 3.6c-.4-.7-1.3-1-2-.5L4.6 4.2C3.6 4.9 3.1 6.1 3.3 7.3c.7 3.6 2.4 6.9 5 9.5 2.6 2.6 5.9 4.3 9.5 5 1.2.2 2.4-.3 3.1-1.3l1.1-1.6c.5-.7.2-1.6-.5-2l-3.2-2.1c-.6-.4-1.3-.3-1.8.2l-1.2 1.3c-2-1-3.8-2.8-4.8-4.8l1.3-1.2c.5-.5.6-1.2.2-1.8L8.2 3.6Z" />
      </svg>
    ),
  },
  {
    title: 'Reply to messages',
    text: 'Texts, DMs, emails and website chats answered in seconds.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3.5c-4.9 0-8.5 3.3-8.5 7.4 0 2.2 1 4.1 2.7 5.5l-.7 3.6 3.9-2c.8.2 1.7.3 2.6.3 4.9 0 8.5-3.3 8.5-7.4S16.9 3.5 12 3.5Z" />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    title: 'Book appointments',
    text: 'Checks real availability and books directly into your calendar.',
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: 'Confirmations & Reminders',
    text: 'Automatically confirms appointments and sends timely reminders to reduce no-shows.',
    icon: (
      <svg {...iconProps}>
        <path d="M6 9.5a6 6 0 0 1 12 0c0 4.2 1.6 6 2.5 7H3.5c.9-1 2.5-2.8 2.5-7Z" />
        <path d="M10 20a2.2 2.2 0 0 0 4 0" />
      </svg>
    ),
  },
  {
    title: 'Transfer or hand off',
    text: 'Knows when to get a human and passes full context to your team.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20.5c.8-3.9 3.8-6.2 7.5-6.2s6.7 2.3 7.5 6.2" />
      </svg>
    ),
  },
  {
    title: 'One inbox. Every conversation.',
    text: 'Keep every conversation and contact in one place, and reply without switching apps.',
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 13.5 6 5.5c.3-.9 1.1-1.5 2-1.5h8c.9 0 1.7.6 2 1.5l2.5 8" />
        <path d="M3.5 13.5V18a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-4.5h-5a3 3 0 0 1-6 0h-6Z" />
      </svg>
    ),
  },
]

export default function ChannelsContent() {
  return (
    <>
      <ProductIntro
        theme="purple"
        badge="Inbound communication"
        title={['All Your Channels.', 'One AI Front Desk.']}
        subtitle={[
          'Belvoro answers calls, texts, emails, Instagram, Facebook,',
          'WhatsApp, and website chat instantly. One AI front desk,',
          'connected across every channel, so you never miss a lead, day or night.',
        ]}
        character={{ src: '/characters/channel-hero.png', width: 1031, height: 1223, alt: 'Purple Belvoro character' }}
        featuresTitle={['One AI front desk', 'for every conversation.']}
        featuresText="No more switching between apps or missing messages. Belvoro handles every channel, replies instantly, and keeps everything organized in one place."
        features={FEATURES}
      />

      {/* CONNECTED CHANNELS: inbox preview */}
      <section className={styles.inbox}>
        <div className="container">
          <motion.h2
            className={styles.inboxHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Connected to the channels
            <br />
            your customers use
          </motion.h2>
          <motion.div
            className={styles.inboxFrame}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            {/* unoptimized: serve the original PNG so the UI text stays crisp
                (Next's default re-compression softens small text). */}
            <Image
              src="/inbox-preview.png"
              alt="Belvoro inbox showing conversations from Instagram, WhatsApp, email, Facebook and SMS in one place"
              width={1213}
              height={682}
              unoptimized
              className={styles.inboxImg}
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
