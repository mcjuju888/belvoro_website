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
      <div className="container">
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Process
        </motion.div>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          We handle setup, <i>You handle the business</i>
        </motion.h2>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          We handle everything, no technical work required on your end.
        </motion.p>

        <div className={styles.grid} ref={gridRef}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.step}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            >
              <div className={styles.stepNum}>{s.num}</div>
              <h4 className={styles.stepTitle}>{s.title}</h4>
              <p className={styles.stepDesc}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
