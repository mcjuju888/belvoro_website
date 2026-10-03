'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './FeatureScroll.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const features = [
  {
    title: 'Every Channel, One Front Desk',
    desc: 'Calls, texts, emails, WhatsApp, Instagram and Messenger are answered instantly by one AI, all connected through the same customer history.',
  },
  {
    title: 'Every Conversation, One Place',
    desc: 'Your team can see and reply to calls, messages, DMs, emails and website chats from one connected inbox instead of jumping between apps.',
  },
  {
    title: 'Never Lose the Customer Context',
    desc: 'Every conversation, appointment and interaction is stored in one complete customer profile, so your team always knows what happened before.',
  },
  {
    title: 'Appointments That Stay on Track',
    desc: 'Automatically send appointment confirmations, reminders and follow-ups so customers stay informed and fewer bookings are missed.',
  },
  {
    title: 'Knows When Your Team Should Step In',
    desc: 'When a person is needed, Belvoro collects the right information, alerts your team and hands off the conversation with full context attached.',
  },
  {
    title: 'Turn Great Visits Into Reviews',
    desc: 'After a completed appointment, Belvoro automatically sends customers a direct link to your Google review page at the right time.',
  },
  {
    title: 'Your Reputation Keeps Moving',
    desc: 'When a Google review comes in, Belvoro can draft and publish a professional response so your business stays responsive and consistent.',
  },
  {
    title: 'Reach the Right Customers',
    desc: 'Belvoro uses customer history, conversations and past activity to find the right audience and create personalized outreach for each person.',
  },
  {
    title: 'Create. Publish. Grow.',
    desc: 'Enhance photos, create short-form video content, generate captions and publish directly to your social channels from Belvoro.',
  },
  {
    title: 'Keep Your Whole Team Connected',
    desc: 'Organize staff into departments, assign customers and conversations, and see who handled each interaction from one connected system.',
  },
]

export default function FeatureScroll() {
  const gridRef = useRef<HTMLDivElement>(null)
  // Start the staggered fade once the grid enters view, so cards appear one after the other.
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section id="features" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={styles.badge}>What Belvoro does</span>
          <h2 className={styles.heading}>
            One AI that runs your
            <br />
            <span className={styles.gradient}>entire front desk.</span>
          </h2>
        </motion.div>

        <div className={styles.grid} ref={gridRef}>
          {features.map((f, i) => (
            // The wrapper handles the fade-in; the inner card owns the hover lift,
            // so framer's inline transform never fights the CSS :hover transform.
            <motion.div
              key={f.title}
              className={styles.cell}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
            >
              <article className={styles.card}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
