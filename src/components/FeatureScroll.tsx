'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import styles from './FeatureScroll.module.css'

const features = [
  {
    num: '01',
    title: '24/7 Call Answering',
    desc: 'Never miss a lead. Your AI answers every call instantly — day, night, or weekend. No voicemail, no hold music, no lost revenue.',
    tag: 'Always on',
  },
  {
    num: '02',
    title: 'Lead Qualification',
    desc: 'Asks the right questions and captures structured data from every caller automatically — synced straight to your dashboard.',
    tag: 'Structured data',
  },
  {
    num: '03',
    title: 'Appointment Booking',
    desc: 'Books, reschedules, and cancels based on your live availability rules. No back-and-forth, no double bookings.',
    tag: 'Live scheduling',
  },
  {
    num: '04',
    title: 'Smart Call Routing',
    desc: 'Detects caller intent and transfers to the right person or department instantly — no dead ends, no frustrated customers.',
    tag: 'Intent detection',
  },
  {
    num: '05',
    title: 'SMS Follow-Ups',
    desc: 'Confirmations, reminders, and Google review nudges sent automatically after every interaction.',
    tag: 'Auto-send',
  },
  {
    num: '06',
    title: 'Custom Dashboard',
    desc: 'All calls, leads, and bookings flow into a dashboard built specifically for how your business runs.',
    tag: 'Your data',
  },
]

export default function FeatureScroll() {
  const [phase, setPhase] = useState(0)
  // active = index of the CENTER card
  const [active, setActive] = useState(1)
  const [, setCompleted] = useState(false)
  const [sprayed, setSprayed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const accumulated = useRef(0)
  const animating = useRef(false)
  const THRESHOLD = 70

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.4
      if (!inView) return
      if (sprayed) return
      if (animating.current) { e.preventDefault(); return }

      accumulated.current += e.deltaY

      if (Math.abs(accumulated.current) < THRESHOLD) {
        if (phase === 1 && !sprayed) e.preventDefault()
        return
      }

      const dir = accumulated.current > 0 ? 1 : -1
      accumulated.current = 0

      // Phase 0 -> 1: split block into cards
      if (phase === 0 && dir > 0) {
        e.preventDefault()
        animating.current = true
        setPhase(1)
        setTimeout(() => { animating.current = false }, 700)
        return
      }

      // Phase 1 carousel
      if (phase === 1) {
        if (dir > 0) {
          if (active === features.length - 1 && !sprayed) {
            e.preventDefault()
            animating.current = true
            setSprayed(true)
            setCompleted(true)
            setTimeout(() => { animating.current = false }, 900)
            return
          }
          if (active < features.length - 1) {
            e.preventDefault()
            animating.current = true
            setActive(prev => prev + 1)
            setTimeout(() => { animating.current = false }, 500)
          }
        } else {
          if (active > 1) {
            e.preventDefault()
            animating.current = true
            setActive(prev => prev - 1)
            setTimeout(() => { animating.current = false }, 500)
          } else if (active === 1) {
            e.preventDefault()
            animating.current = true
            setPhase(0)
            setCompleted(false)
            setSprayed(false)
            setTimeout(() => { animating.current = false }, 700)
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [phase, active, sprayed])

  const getPosition = (index: number) => {
    const diff = index - active
    if (diff === 0) return 'center'
    if (diff === -1) return 'left'
    if (diff === 1) return 'right'
    if (diff <= -2) return 'far-left'
    return 'far-right'
  }

  return (
    <section id="features" ref={sectionRef} className={styles.section}>
      <div className={styles.label}>
        <div className={styles.eyebrow}>Features</div>
        <h2 className={styles.heading}>
          Built to handle <i>everything</i>
        </h2>
      </div>

      <div className={`${styles.stage} ${sprayed ? styles.stageSprayed : ''}`}>
        {sprayed ? (
          <div className={styles.grid}>
            {features.map((f, i) => (
              <div
                key={i}
                className={styles.gridCard}
                style={{ '--gi': i } as CSSProperties}
              >
                <div className={styles.cardNum}>{f.num}</div>
                <span className={styles.cardTag}>{f.tag}</span>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={`${styles.block} ${phase === 0 ? styles.blockVisible : styles.blockHidden}`}>
              <div className={styles.blockInner}>
                <div className={styles.blockEyebrow}>What Belvoro does</div>
                <div className={styles.blockTitle}>
                  Your AI front desk,<br />
                  <i>fully automated</i>
                </div>
                <div className={styles.blockHint}>↓ scroll to explore</div>
              </div>
            </div>

            {phase === 1 && features.map((f, i) => {
              const pos = getPosition(i)
              if (pos === 'far-left' || pos === 'far-right') return null
              return (
                <div
                  key={i}
                  className={`
                    ${styles.card}
                    ${pos === 'center' ? styles.cardCenter : ''}
                    ${pos === 'left' ? styles.cardLeft : ''}
                    ${pos === 'right' ? styles.cardRight : ''}
                  `}
                >
                  <div className={styles.cardNum}>{f.num}</div>
                  <span className={styles.cardTag}>{f.tag}</span>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardDesc}>{f.desc}</p>
                </div>
              )
            })}
          </>
        )}
      </div>

      {phase === 1 && !sprayed && (
        <div className={styles.dots}>
          {features.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      )}

      {!sprayed && (
        <div className={styles.scrollHint}>
          {phase === 0 && <span>Scroll to explore ↓</span>}
          {phase === 1 && active < features.length - 1 && (
            <span>Scroll for next feature ↓</span>
          )}
          {phase === 1 && active === features.length - 1 && (
            <span>Scroll to reveal all features ↓</span>
          )}
        </div>
      )}
    </section>
  )
}
