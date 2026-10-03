'use client'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  }
}

const avatars = [
  // Placeholder initials until real customer photos are added.
  { initials: 'JM', bg: 'linear-gradient(135deg, #3B4A5E, #1C2023)' },
  { initials: 'SK', bg: 'linear-gradient(135deg, #C9A88A, #8C6A52)' },
  { initials: 'AR', bg: 'linear-gradient(135deg, #7D8A9C, #4A5566)' },
  { initials: 'DL', bg: 'linear-gradient(135deg, #2A2F36, #0F1114)' },
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background photo (/hero-bg.jpg), faded into white on the left. */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.photo} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <motion.div className={styles.badge} {...fadeUp(0.1)}>
          The AI front desk for growing businesses
        </motion.div>

        <motion.h1 className={styles.heading} {...fadeUp(0.2)}>
          Your front desk,
          <br />
          <span className={styles.gradient}>on autopilot.</span>
        </motion.h1>

        <motion.p className={styles.sub} {...fadeUp(0.32)}>
          Belvoro answers every call, text, DM, email, and website chat. It books real appointments against your live calendar, follows up until leads convert, and shows you the revenue it recovered. One AI, every channel, built around your business.
        </motion.p>

        <motion.div className={styles.btns} {...fadeUp(0.44)}>
          <motion.a
            href="/get-started"
            className={styles.btnMain}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started Free <span aria-hidden="true">→</span>
          </motion.a>
          <motion.a
            href="/watch-demo"
            className={styles.btnGhost}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.playIcon} aria-hidden="true">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1.2v9.6a.5.5 0 0 0 .77.42l7.4-4.8a.5.5 0 0 0 0-.84l-7.4-4.8A.5.5 0 0 0 1 1.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
            Watch Demo
          </motion.a>
        </motion.div>

        <motion.div className={styles.trust} {...fadeUp(0.56)}>
          <div className={styles.avatars} aria-hidden="true">
            {avatars.map((a) => (
              <span key={a.initials} className={styles.avatar} style={{ background: a.bg }}>
                {a.initials}
              </span>
            ))}
          </div>
          <div className={styles.trustText}>
            <strong>Trusted by 100+ businesses</strong>
            <span>to capture more leads and drive growth</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
