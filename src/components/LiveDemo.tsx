'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './LiveDemo.module.css'
import CallPlayer from './CallPlayer'
import BellaChat from './BellaChat'
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

const CHANNELS = [
  { label: 'Phone', icon: <PhoneIcon /> },
  { label: 'SMS', icon: <SmsIcon /> },
  { label: 'Email', icon: <GmailIcon /> },
  { label: 'Instagram', icon: <InstagramIcon /> },
  { label: 'Facebook', icon: <FacebookIcon /> },
  { label: 'WhatsApp', icon: <WhatsAppIcon /> },
  { label: 'Web chat', icon: <GlobeIcon /> },
]

export default function LiveDemo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="live-demo" className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Watch it work
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            11:42 PM. Your team is asleep.<br />
            <span className={styles.gradient}>Belvoro isn&apos;t.</span>
          </motion.h2>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            A real late-night inquiry, answered in seconds and booked in under a minute.
            The same conversation works over calls, text, email, Instagram, Facebook, WhatsApp, and a custom-built web chat.
          </motion.p>
          <motion.ul
            className={styles.channels}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          >
            {CHANNELS.map((c) => (
              <li key={c.label} className={styles.channel} title={c.label}>
                {c.icon}
                <span className={styles.srOnly}>{c.label}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div
            className={styles.player}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
          >
            <CallPlayer src="/demo-call.mp4" label="demo call recording" />
          </motion.div>
        </div>

        <motion.div
          className={styles.phoneWrap}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <BellaChat />
        </motion.div>
      </div>
    </section>
  )
}
