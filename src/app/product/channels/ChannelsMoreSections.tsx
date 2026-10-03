'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import BellaChat from '@/components/BellaChat'
import CallPlayer from '@/components/CallPlayer'
import {
  FacebookIcon,
  GlobeIcon,
  GmailIcon,
  InstagramIcon,
  PhoneIcon,
  SmsIcon,
  WhatsAppIcon,
} from '@/components/ChannelIcons'
import WhyItMatters from '@/components/product/WhyItMatters'
import type { ProductFeature } from '@/components/product/ProductIntro'
import styles from './more.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

// Loose, playful layout: (left, top) are the icon centre in % of the icon area.
// `bubble` puts icons that aren't a coloured circle themselves on a white disc.
const CHANNELS = [
  { label: 'Calls', icon: <PhoneIcon />, left: 9, top: 12 },
  { label: 'SMS', icon: <SmsIcon />, left: 32, top: 26 },
  { label: 'Facebook Messenger', icon: <FacebookIcon />, left: 57, top: 6 },
  { label: 'Built-in Web Chat', icon: <GlobeIcon />, left: 85, top: 22, bubble: true },
  { label: 'Email', icon: <GmailIcon />, left: 14, top: 64, bubble: true },
  { label: 'Instagram', icon: <InstagramIcon />, left: 42, top: 74 },
  { label: 'WhatsApp', icon: <WhatsAppIcon />, left: 70, top: 62 },
]

const lineIcon = {
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

const WHY: ProductFeature[] = [
  {
    title: 'Capture more leads',
    text: 'Every inquiry gets a response, so you never lose a potential customer.',
    icon: (
      <svg {...lineIcon}>
        <path d="M5 20V13M10 20V9M15 20V11M20 20V5" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: 'Save time',
    text: 'Your team can focus on in-person customers, not chasing messages.',
    icon: (
      <svg {...lineIcon}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    title: 'Provide a better experience',
    text: 'Instant, accurate answers create a professional and consistent experience.',
    icon: (
      <svg {...lineIcon}>
        <circle cx="12" cy="8" r="3.8" />
        <path d="M4.5 20.5c.8-3.9 3.8-6.2 7.5-6.2s6.7 2.3 7.5 6.2" />
      </svg>
    ),
  },
  {
    title: 'Drive more revenue',
    text: 'More conversations, more appointments, and more customers.',
    icon: (
      <svg {...lineIcon}>
        <path d="M3.5 17 9.5 11l4 4 7-7.5" />
        <path d="M15 7.5h5.5V13" />
      </svg>
    ),
  },
]

/** mm:ss */
function clock(seconds: number) {
  const m = Math.floor(seconds / 60) % 60
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/** Call screen with a live call timer that counts up while it is on screen. */
function CallScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { margin: '-60px' })
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!visible) {
      setSeconds(0)
      return
    }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [visible])

  return (
    <div ref={ref} className={styles.callScreen}>
      {/* The static "00:04" was removed from this image so the live timer can sit in its place. */}
      <Image
        src="/call-screen.png"
        alt="Incoming call from Sarah Mitchell, answered instantly by Belvoro"
        width={760}
        height={1393}
        className={styles.callImg}
      />
      <span className={styles.callTimer} aria-hidden="true">{clock(seconds)}</span>
    </div>
  )
}

export default function ChannelsMoreSections() {
  const iconsRef = useRef<HTMLUListElement>(null)
  const iconsInView = useInView(iconsRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* YOUR LEADS ARE EVERYWHERE */}
      <section className={styles.everywhere}>
        <div className={`container ${styles.everywhereInner}`}>
          <div>
            <motion.h2
              className={styles.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Your leads are everywhere.
              <br />
              <span className={styles.gradient}>So are we.</span>
            </motion.h2>
            <motion.p
              className={styles.sub}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            >
              Calls, texts, DMs, emails and web chat, all answered by the same AI, with the same
              customer history behind every reply.
            </motion.p>

            <ul className={styles.icons} ref={iconsRef}>
              {CHANNELS.map((c, i) => (
                // Outer element fades in; inner element floats (CSS), so the two never fight.
                <motion.li
                  key={c.label}
                  className={styles.iconSpot}
                  style={{ left: `${c.left}%`, top: `${c.top}%`, x: '-50%', y: -22 }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={iconsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  <span
                    className={styles.iconFloat}
                    style={{ animationDuration: `${6 + (i % 3) * 1.3}s`, animationDelay: `${-i * 0.9}s` }}
                  >
                    <span className={`${styles.icon} ${c.bubble ? styles.iconBubble : ''}`}>{c.icon}</span>
                    <span className={styles.iconLabel}>{c.label}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className={styles.demo}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <BellaChat className={styles.chat} />
            <CallScreen />
          </motion.div>
        </div>
      </section>

      {/* NATURAL CONVERSATION */}
      <section className={styles.voice}>
        <div className="container">
          <motion.div
            className={styles.voiceCard}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className={styles.voiceArt}>
              <Image
                src="/characters/channel.png"
                alt="Purple Belvoro character waving hello"
                width={1089}
                height={1188}
                className={styles.voiceCharacter}
              />
            </div>
            <div className={styles.voiceCopy}>
              <span className={styles.label}>24/7 AI receptionist</span>
              <h2 className={styles.voiceHeading}>
                A natural conversation
                <br />
                from the first hello.
              </h2>
              <p className={styles.voiceText}>
                Belvoro sounds like your business. It answers questions, qualifies leads, books
                appointments, and knows when to get a human, all with a natural, on-brand voice.
              </p>
              <CallPlayer src="/demo-call.mp4" label="demo call recording" />
            </div>
          </motion.div>
        </div>
      </section>

      <WhyItMatters
        theme="purple"
        subtitle="More leads, happier customers, and a front desk that never sleeps."
        cards={WHY}
      />
    </>
  )
}
