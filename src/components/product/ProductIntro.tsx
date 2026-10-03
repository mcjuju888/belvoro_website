'use client'
import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './ProductIntro.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

export type ProductTheme = 'purple' | 'beige' | 'sage'

export interface ProductFeature {
  title: string
  text: string
  icon: ReactNode
}

interface ProductIntroProps {
  theme: ProductTheme
  badge: string
  /** Hero headline: first line dark, second line in the theme gradient. */
  title: [string, string]
  /** A string, or an array of lines that break exactly there on desktop (they flow normally on phones). */
  subtitle: string | string[]
  character: { src: string; width: number; height: number; alt: string }
  /** Features heading, two lines. */
  featuresTitle: [string, string]
  featuresText: string
  features: ProductFeature[]
}

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  }
}

/** Shared hero + feature-grid for the /product/* pages. */
export default function ProductIntro({
  theme,
  badge,
  title,
  subtitle,
  character,
  featuresTitle,
  featuresText,
  features,
}: ProductIntroProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <div className={styles[theme]}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <motion.span className={styles.badge} {...fadeUp(0.05)}>{badge}</motion.span>
            <motion.h1 className={styles.heading} {...fadeUp(0.15)}>
              {title[0]}
              <br />
              <span className={styles.gradient}>{title[1]}</span>
            </motion.h1>
            <motion.p className={styles.sub} {...fadeUp(0.27)}>
              {Array.isArray(subtitle)
                ? subtitle.map((line, i) => (
                    <span key={i} className={styles.subLine}>{line}{i < subtitle.length - 1 ? ' ' : ''}</span>
                  ))
                : subtitle}
            </motion.p>

            {/* Same buttons as the homepage hero. */}
            <motion.div className={styles.btns} {...fadeUp(0.39)}>
              <motion.a
                href="/get-started"
                className={styles.btnMain}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Started Free <span aria-hidden="true">→</span>
              </motion.a>
              <motion.a
                href="/watch-demo"
                className={styles.btnGhost}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={styles.playIcon} aria-hidden="true">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <path d="M1 1.2v9.6a.5.5 0 0 0 .77.42l7.4-4.8a.5.5 0 0 0 0-.84l-7.4-4.8A.5.5 0 0 0 1 1.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
                Watch Demo
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className={styles.heroArt}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {/* Gentle CSS float; the soft foot shadow is part of the artwork. */}
            <Image
              src={character.src}
              alt={character.alt}
              width={character.width}
              height={character.height}
              priority
              className={styles.characterImg}
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={`container ${styles.featuresInner}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className={styles.featuresHeading}>
              {featuresTitle[0]}
              <br />
              {featuresTitle[1]}
            </h2>
            <p className={styles.featuresText}>{featuresText}</p>
          </motion.div>

          <div className={styles.grid} ref={gridRef}>
            {features.map((f, i) => (
              // The wrapper fades in; the inner card owns the CSS hover lift.
              <motion.div
                key={f.title}
                className={styles.cell}
                initial={{ opacity: 0, y: 24 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              >
                <article className={styles.card}>
                  <span className={styles.iconCircle}>{f.icon}</span>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardText}>{f.text}</p>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
