'use client'
import { motion } from 'framer-motion'
import styles from './FeatureScroll.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const features = [
  {
    num: '01',
    title: 'Every Channel, One Brain',
    desc: 'Calls, texts, emails, Instagram DMs, Facebook Messenger, and your website chat. All answered instantly by one AI that recognizes the same person across every channel, with full history.',
    tag: '6 channels',
  },
  {
    num: '02',
    title: 'Real Appointment Booking',
    desc: 'Not "someone will call you back." The AI checks your live availability, books against your real calendar with double-booking prevention, and sends reminders so people actually show up.',
    tag: 'Live scheduling',
  },
  {
    num: '03',
    title: 'No Lead Ever Goes Cold',
    desc: 'When a lead stops replying, the AI follows up at 4 hours, next day, and day 3. Each message is written fresh from the actual conversation. Dormant contacts get re-engaged months later.',
    tag: 'Auto follow-up',
  },
  {
    num: '04',
    title: 'Hot Leads Rise to the Top',
    desc: 'Every lead is scored on real buying signals: timeline, budget, the exact car or service they asked about. Your dashboard ranks who to call first, with the reasons shown.',
    tag: 'Lead scoring',
  },
  {
    num: '05',
    title: 'Knows When to Get a Human',
    desc: 'Price negotiation, complaints, VIPs. The AI pages your team by text and email with the full conversation attached, then steps aside. No dead ends, no transfer loops.',
    tag: 'Smart handoff',
  },
  {
    num: '06',
    title: 'Reviews on Autopilot',
    desc: 'After a completed visit, happy customers get one friendly nudge to your Google review page. Perfectly timed, never spammy, one ask per customer ever.',
    tag: 'Reputation',
  },
  {
    num: '07',
    title: 'Proof, Not Promises',
    desc: 'Your dashboard shows response times, after-hours leads captured, appointments booked, show rates, and the actual dollars recovered. Plus a weekly report every Monday.',
    tag: 'Revenue tracking',
  },
  {
    num: '08',
    title: 'Custom Built For You',
    desc: 'Not a template bot. A dealership gets test drives and trade-ins; a dental office gets cleanings and recalls. Your services, your hours, your voice.',
    tag: 'Fully custom',
  },
]

export default function FeatureScroll() {
  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          What Belvoro does
        </motion.div>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        >
          One AI that runs your<br /><i>entire front desk.</i>
        </motion.h2>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              className={styles.card}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.04, ease: EASE }}
            >
              <div className={styles.cardTop}>
                <span className={styles.num}>{f.num}</span>
                <span className={styles.tag}>{f.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
