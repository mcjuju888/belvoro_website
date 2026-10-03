'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ProductFeature, ProductTheme } from './ProductIntro'
import styles from './WhyItMatters.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

interface WhyItMattersProps {
  theme: ProductTheme
  subtitle: string
  cards: ProductFeature[]
}

/** Shared "Why it matters." row of 4 cards for the /product/* pages. */
export default function WhyItMatters({ theme, subtitle, cards }: WhyItMattersProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section className={`${styles.why} ${styles[theme]}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className={styles.heading}>Why it matters.</h2>
          <p className={styles.sub}>{subtitle}</p>
        </motion.div>

        <div className={styles.grid} ref={gridRef}>
          {cards.map((c, i) => (
            // The wrapper fades in; the inner card owns the CSS hover lift.
            <motion.div
              key={c.title}
              className={styles.cell}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
            >
              <article className={styles.card}>
                <span className={styles.icon}>{c.icon}</span>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.text}>{c.text}</p>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
