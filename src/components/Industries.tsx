'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Industries.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const industries = [
  {
    title: 'Auto Dealerships',
    desc: 'An AI BDC that works every lead like your best rep on their best day, around the clock.',
    tags: [
      'Live inventory answers, never an invented car or price',
      'Test drives booked against real availability',
      'Trade-in & financing intake, handed to F&I',
      'After-hours leads captured while you’re closed',
    ],
  },
  {
    title: 'Dental & Clinics',
    desc: 'Same platform, different language: patients, visits, and recalls instead of leads and test drives.',
    tags: [
      'Cleanings & consults booked with reminders',
      'No-show defense: 24h and 2h confirmations',
      'Recall reactivation for overdue patients',
      'Emergency requests flagged to staff instantly',
    ],
  },
  {
    title: 'Any Appointment Business',
    desc: 'Salons, physio, trades, training centres: if bookings drive revenue, Belvoro fits in days.',
    tags: [
      'Your services, hours, and vocabulary, not a template',
      'Lead scoring so hot inquiries get called first',
      'Human handoff with the full conversation attached',
      'Weekly report: leads, bookings, revenue recovered',
    ],
  },
]

export default function Industries() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section id="industries" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Industries we serve
        </motion.div>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Built for businesses that<br />
          <i>Rely on their front desk</i>
        </motion.h2>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          Belvoro adapts to your operation: appointments,
          sales, or high-volume routing.
        </motion.p>

        <div className={styles.grid} ref={gridRef}>
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              <h3 className={styles.cardTitle}>{ind.title}</h3>
              <p className={styles.cardDesc}>{ind.desc}</p>
              <ul className={styles.tags}>
                {ind.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    <span className={styles.check}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
