'use client'
import { motion } from 'framer-motion'
import styles from './CTA.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div className={styles.badge} {...fadeUp(0)}>
          No template. Built for you.
        </motion.div>

        <motion.h2 className={styles.heading} {...fadeUp(0.08)}>
          Ready to put your front desk
          <br />
          <span className={styles.gradient}>on autopilot?</span>
        </motion.h2>

        <motion.p className={styles.sub} {...fadeUp(0.16)}>
          Custom AI, built around your business. Live in days.
        </motion.p>

        {/* Same buttons as the hero. */}
        <motion.div className={styles.btns} {...fadeUp(0.24)}>
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
      </div>
    </section>
  )
}
