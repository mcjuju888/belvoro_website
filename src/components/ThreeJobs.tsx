'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './ThreeJobs.module.css'
import {
  FacebookIcon,
  GlobeIcon,
  GmailIcon,
  InstagramIcon,
  PhoneIcon,
  SmsIcon,
  WhatsAppIcon,
} from './ChannelIcons'

const EASE = [0.16, 1, 0.3, 1] as const

/* ---------- Marketing line icons (card 3) ---------- */

const lineProps = {
  viewBox: '0 0 24 24',
  width: 22,
  height: 22,
  fill: 'none',
  stroke: '#8A8F98',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function PlaneIcon() {
  return (
    <svg {...lineProps}>
      <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" />
      <path d="m10 13 4.5-4.5" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg {...lineProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <circle cx="9" cy="9" r="1.8" />
      <path d="m20.5 15-4.5-4.5L6 20.5" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg {...lineProps}>
      <rect x="2.5" y="6" width="13" height="12" rx="2" />
      <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    </svg>
  )
}

function MegaphoneIcon() {
  return (
    <svg {...lineProps}>
      <path d="M3.5 10v4a1 1 0 0 0 1 1H7l9 4.5v-15L7 9H4.5a1 1 0 0 0-1 1Z" />
      <path d="m8 15 1.5 5h2.5L11 15.8" />
      <path d="M19.5 9.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  )
}

/* ---------- Data ---------- */

type Floater = { key: string; node: React.ReactNode; top: string; left: string }

const cards: {
  /** Anchor id, so other pages and the navbar can link to this card. */
  id: string
  theme: string
  image: string
  imageW: number
  imageH: number
  alt: string
  title: string
  text: string
  href: string
  floatKind: 'brand' | 'label' | 'line'
  floaters: Floater[]
}[] = [
  {
    id: 'every-channel',
    theme: styles.lavender,
    image: '/characters/channel.png',
    imageW: 1089,
    imageH: 1188,
    alt: 'Purple Belvoro character waving',
    title: 'Every Channel, Every Lead',
    text: 'Answers calls, texts, emails, Instagram, Facebook, web chat and more, instantly. Capture every lead, day or night.',
    href: '/product/channels',
    floatKind: 'brand',
    floaters: [
      { key: 'whatsapp', node: <WhatsAppIcon />, top: '13%', left: '25%' },
      { key: 'web', node: <GlobeIcon />, top: '9%', left: '50%' },
      { key: 'gmail', node: <GmailIcon />, top: '13%', left: '75%' },
      { key: 'facebook', node: <FacebookIcon />, top: '36%', left: '12%' },
      { key: 'sms', node: <SmsIcon />, top: '34%', left: '88%' },
      { key: 'phone', node: <PhoneIcon />, top: '62%', left: '11%' },
      { key: 'instagram', node: <InstagramIcon />, top: '62%', left: '86%' },
    ],
  },
  {
    id: 'memory-context',
    theme: styles.beige,
    image: '/characters/memory.png',
    imageW: 933,
    imageH: 1141,
    alt: 'Beige Belvoro character holding a folder',
    title: 'Memory & Context',
    text: 'Keeps track of every customer, conversation, and detail. One complete profile so every interaction is personalized and informed.',
    href: '/product/memory',
    floatKind: 'label',
    floaters: [
      { key: 'past', node: 'Past conversations', top: '12%', left: '60%' },
      { key: 'prefs', node: 'Preferences', top: '29%', left: '75%' },
      { key: 'appts', node: 'Appointments', top: '51%', left: '81%' },
      { key: 'notes', node: 'Notes & tasks', top: '73%', left: '77%' },
    ],
  },
  {
    id: 'outbound-marketing',
    theme: styles.sage,
    image: '/characters/marketing.png',
    imageW: 1118,
    imageH: 1107,
    alt: 'Sage green Belvoro character with a megaphone',
    title: 'Outbound Marketing',
    text: 'Automatically follow up, re-engage past customers, run targeted outreach campaigns, and create ready-to-post content to bring in more business.',
    href: '/product/marketing',
    floatKind: 'line',
    floaters: [
      { key: 'send', node: <PlaneIcon />, top: '12%', left: '62%' },
      { key: 'image', node: <ImageIcon />, top: '27%', left: '80%' },
      { key: 'video', node: <VideoIcon />, top: '50%', left: '87%' },
      { key: 'promo', node: <MegaphoneIcon />, top: '72%', left: '82%' },
    ],
  },
]

export default function ThreeJobs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={styles.badge}>Built for businesses that want to grow</span>
          <h2 className={styles.heading}>
            One assistant. <span className={styles.gradient}>Three jobs.</span>
          </h2>
          <p className={styles.sub}>
            Belvoro combines 24/7 lead response, customer memory, and automated marketing into one powerful system, so your business keeps growing even when you&apos;re busy.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              id={card.id}
              className={`${styles.card} ${card.theme}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div className={`${styles.art} ${styles[card.floatKind]}`}>
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={card.imageW}
                  height={card.imageH}
                  className={styles.character}
                  sizes="(max-width: 900px) 70vw, 240px"
                />
                {card.floaters.map((f, j) => (
                  <motion.span
                    key={f.key}
                    className={card.floatKind === 'label' ? styles.pill : styles.bubble}
                    style={{ top: f.top, left: f.left, x: '-50%', y: '-50%' }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 + j * 0.08, ease: EASE }}
                  >
                    {f.node}
                  </motion.span>
                ))}
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.text}>{card.text}</p>
                <a href={card.href} className={styles.more}>
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
