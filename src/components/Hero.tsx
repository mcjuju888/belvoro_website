'use client'
import Image from 'next/image'
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

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.left}>
          <motion.div className={styles.badge} {...fadeUp(0.1)}>
            <div className={styles.badgeDot}><span /></div>
            <span className={styles.badgeText}>Accepting new business now</span>
          </motion.div>

          <motion.h1 className={styles.heading} {...fadeUp(0.2)}>
            Your front desk,<br />
            <i>on autopilot.</i>
          </motion.h1>

          <motion.p className={styles.sub} {...fadeUp(0.32)}>
            Belvoro answers every call, text, DM, email, and website chat — books real appointments against your live calendar, follows up until leads convert, and shows you the revenue it recovered. One AI, every channel, built around your business.
          </motion.p>

          <motion.div className={styles.btns} {...fadeUp(0.44)}>
            <motion.a
              href="/get-started"
              className={styles.btnMain}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(32,159,168,0.38)' }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Free
            </motion.a>
            <motion.a
              href="/watch-demo"
              className={styles.btnGhost}
              whileHover={{ scale: 1.02, borderColor: '#bbb' }}
              whileTap={{ scale: 0.97 }}
            >
              Watch Demo →
            </motion.a>
          </motion.div>
        </div>

        <div className={styles.right}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/dashboard-preview.png"
                alt="Belvoro dashboard preview"
                width={600}
                height={500}
                className={styles.heroImage}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
