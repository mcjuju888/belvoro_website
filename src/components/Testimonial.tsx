'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Testimonial.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

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

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
}

export default function Testimonial() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const go = (index: number) => {
    setDirection(index > active ? 1 : -1)
    setActive(index)
  }

  const prev = () => go(active === 0 ? testimonials.length - 1 : active - 1)
  const next = () => go(active === testimonials.length - 1 ? 0 : active + 1)

  const t = testimonials[active]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.attr}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <motion.button
            className={styles.arrowBtn}
            onClick={prev}
            whileHover={{ scale: 1.1, backgroundColor: '#209FA8', borderColor: '#209FA8', color: '#fff' }}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.15 }}
          >
            ←
          </motion.button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <motion.button
            className={styles.arrowBtn}
            onClick={next}
            whileHover={{ scale: 1.1, backgroundColor: '#209FA8', borderColor: '#209FA8', color: '#fff' }}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.15 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  )
}
