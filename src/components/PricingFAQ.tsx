'use client'
import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PricingFAQ.module.css'

/* ------------------------------------------------------------------
   FAQ CONTENT: edit the questions and answers here.
   Add or remove entries freely; the design adapts automatically.
   ------------------------------------------------------------------ */
const FAQS: { question: string; answer: string }[] = [
  { question: 'Question 1', answer: 'Answer coming soon' },
  { question: 'Question 2', answer: 'Answer coming soon' },
  { question: 'Question 3', answer: 'Answer coming soon' },
  { question: 'Question 4', answer: 'Answer coming soon' },
  { question: 'Question 5', answer: 'Answer coming soon' },
]

const EASE = [0.16, 1, 0.3, 1] as const

function Chevron() {
  return (
    <svg className={styles.chevron} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PricingFAQ() {
  // Index of the open question, or null when all are closed. Only one at a time.
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
          <p className={styles.sub}>Everything you need to know about our pricing</p>
        </header>

        <div className={styles.list}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            const buttonId = `${baseId}-q${i}`
            const panelId = `${baseId}-a${i}`
            return (
              <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <h3 className={styles.questionWrap}>
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <Chevron />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className={styles.answer}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
