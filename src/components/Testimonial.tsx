'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Testimonial.module.css'

const EASE = [0.16, 1, 0.3, 1] as const
const AUTO_ADVANCE_MS = 6000
const SWIPE_PX = 50

const testimonials = [
  {
    quote: "Belvoro handles our incoming calls better than we expected. It books appointments, answers questions, and makes sure no lead goes cold.",
    name: "General Manager",
    company: "Home Highlight Services",
    initials: "HH",
  },
  {
    quote: "We used to miss calls every day when the team was busy. Since Belvoro went live we haven't missed a single lead. It pays for itself every week.",
    name: "Owner",
    company: "Prestige Auto Sales",
    initials: "PA",
  },
  {
    quote: "The setup was shockingly fast. They built it around our exact workflow and it was live within days. Our booking rate is up significantly.",
    name: "Owner",
    company: "Apex Training Centre",
    initials: "ATC",
  },
  {
    quote: "Our front desk used to get overwhelmed during peak hours. Now every call gets answered professionally and appointments get booked automatically.",
    name: "Service Director",
    company: "Leaside Physio",
    initials: "LP",
  },
]

type TestimonialData = (typeof testimonials)[number]

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
}

function Slide({ t, className, ...rest }: { t: TestimonialData; className?: string; 'aria-hidden'?: boolean }) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`} {...rest}>
      <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className={styles.attr}>
        <div className={styles.avatar} aria-hidden="true">{t.initials}</div>
        <div>
          <div className={styles.name}>{t.name}</div>
          <div className={styles.company}>{t.company}</div>
        </div>
      </figcaption>
    </figure>
  )
}

function ArrowIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Testimonial() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  // Bumped on every manual navigation so the 6s timer restarts from zero.
  const [tick, setTick] = useState(0)
  const touchX = useRef<number | null>(null)

  const count = testimonials.length

  const go = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir)
    setActive((index + count) % count)
    setTick((t) => t + 1)
  }, [count])

  const prev = () => go(active - 1, -1)
  const next = useCallback(() => go(active + 1, 1), [go, active])

  // Auto-advance, paused on hover/focus and for visitors who prefer reduced motion.
  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => {
      setDirection(1)
      setActive((a) => (a + 1) % count)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(id)
  }, [active, paused, tick, count])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    setPaused(true)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current
    touchX.current = null
    setPaused(false)
    if (start === null) return
    const dx = e.changedTouches[0].clientX - start
    if (dx <= -SWIPE_PX) next()
    else if (dx >= SWIPE_PX) prev()
  }

  return (
    <section className={styles.section} aria-label="Customer testimonials">
      <div className={styles.inner}>
        <div
          className={styles.card}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* All quotes share one grid cell. Invisible copies size the card to the
              longest quote so it never jumps; the visible one slides/fades on top. */}
          <div className={styles.slides}>
            {testimonials.map((t) => (
              <Slide key={t.company} t={t} className={`${styles.slide} ${styles.sizer}`} aria-hidden />
            ))}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={active}
                className={styles.slide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
                aria-live={paused ? 'polite' : 'off'}
              >
                <Slide t={testimonials[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrowBtn} onClick={prev} aria-label="Previous testimonial">
              <ArrowIcon dir="left" />
            </button>
            <div className={styles.dots}>
              {testimonials.map((t, i) => (
                <button
                  key={t.company}
                  type="button"
                  className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  aria-label={`Show testimonial ${i + 1} of ${count}`}
                  aria-current={i === active}
                />
              ))}
            </div>
            <button type="button" className={styles.arrowBtn} onClick={next} aria-label="Next testimonial">
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
