'use client'
import { useState } from 'react'
import styles from './Testimonial.module.css'

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
    initials:"ATC",
  },
  {
    quote: "Our front desk used to get overwhelmed during peak hours. Now every call gets answered professionally and appointments get booked automatically.",
    name: "Service Director",
    company: "Leaside Physio",
    initials: "LP",
  },
]

export default function Testimonial() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const go = (index: number) => {
    setDirection(index > active ? 'right' : 'left')
    setActive(index)
  }

  const prev = () => go(active === 0 ? testimonials.length - 1 : active - 1)
  const next = () => go(active === testimonials.length - 1 ? 0 : active + 1)

  const t = testimonials[active]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.quote} key={active}>
            "{t.quote}"
          </p>
          <div className={styles.attr}>
            <div className={styles.avatar}>{t.initials}</div>
            <div>
              <div className={styles.name}>{t.name}</div>
              <div className={styles.role}>{t.company}</div>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prev}>←</button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button className={styles.arrowBtn} onClick={next}>→</button>
        </div>
      </div>
    </section>
  )
}
