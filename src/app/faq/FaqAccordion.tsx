'use client'
import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './page.module.css'

export type Faq = { question: string; answer: string; highlight: string }

const EASE = [0.16, 1, 0.3, 1] as const

function Chevron() {
  return (
    <svg className={styles.chevron} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  // Index of the open question, or null when all are closed. Only one at a time; the first starts open.
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className={styles.list}>
      {faqs.map((faq, i) => {
        const isOpen = open === i
        const buttonId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <h2 className={styles.questionWrap}>
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
            </h2>
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
                  <div className={styles.answerBody}>
                    <p className={styles.answer}>{faq.answer}</p>
                    <p className={styles.highlight}>
                      <span className={styles.gradient}>{faq.highlight}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
