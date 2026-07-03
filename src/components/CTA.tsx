'use client'
import { motion } from 'framer-motion'
import styles from './CTA.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.pill}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          No templates. Built for you.
        </motion.div>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Ready to put your front desk<br />
          <i>on autopilot?</i>
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
        >
          Custom AI: built around your business, live in days.
        </motion.p>

        <motion.div
          className={styles.btns}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
        >
          <motion.a
            href="/get-started"
            className={styles.btnDark}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(28,32,35,0.25)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started Free
          </motion.a>
          <motion.a
            href="/watch-demo"
            className={styles.btnOutline}
            whileHover={{ scale: 1.02, borderColor: '#bbb' }}
            whileTap={{ scale: 0.97 }}
          >
            Watch Demo →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
