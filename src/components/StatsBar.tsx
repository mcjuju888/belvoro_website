'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './StatsBar.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const stats = [
  { num: '6', label: 'Channels answered by one AI:\ncalls, SMS, email, IG, FB, web chat.' },
  { num: '<10s', label: 'Typical first response.\nAny hour, any channel.' },
  { num: '0', label: 'Leads that go cold without\nan automated follow-up.' },
  { num: '100%', label: 'Of recovered revenue tracked\nin your dashboard. Not vibes.' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className={styles.stats} ref={ref}>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className={styles.stat}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
        >
          <div className={styles.num}><em>{s.num}</em></div>
          <div className={styles.label}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
