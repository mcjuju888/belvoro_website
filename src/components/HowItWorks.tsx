'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './HowItWorks.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We study your call flow, services, and how your business actually operates day-to-day.',
  },
  {
    num: '02',
    title: 'Build',
    desc: 'We design and train your AI agent around your real customer conversations and goals.',
  },
  {
    num: '03',
    title: 'Deploy',
    desc: 'Integrated with your phone system and tools. Minimal disruption, maximum impact.',
  },
  {
    num: '04',
    title: 'Optimize',
    desc: 'We refine based on real call data and conversations, always improving over time.',
  },
]

export default function HowItWorks() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={styles.badge}>Process</span>
          <h2 className={styles.heading}>
            We handle the setup, <span className={styles.gradient}>you handle the business.</span>
          </h2>
          <p className={styles.sub}>No technical work required on your end.</p>
        </motion.div>

        <motion.div
          className={styles.card}
          ref={gridRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
            >
              {/* Inner layer lifts on hover, so the step's divider stays put. */}
              <div className={styles.stepBody}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
