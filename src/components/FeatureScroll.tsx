'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './FeatureScroll.module.css'

const features = [
  {
    num: '01',
    title: 'Every Channel, One Brain',
    desc: 'Calls, texts, emails, Instagram DMs, Facebook Messenger, and your website chat — all answered instantly by one AI. Someone who DMs, then texts, then calls is recognized as the same person with full history.',
    tag: '6 channels',
  },
  {
    num: '02',
    title: 'Real Appointment Booking',
    desc: 'Not "someone will call you back." The AI checks your live availability, books against your real calendar with double-booking prevention, and sends reminders at 24h and 2h so people actually show up.',
    tag: 'Live scheduling',
  },
  {
    num: '03',
    title: 'No Lead Ever Goes Cold',
    desc: 'When a lead stops replying, the AI follows up — at 4 hours, next day, and day 3 — each message written fresh from the actual conversation. Dormant contacts get re-engaged automatically, months later.',
    tag: 'Auto follow-up',
  },
  {
    num: '04',
    title: 'Your Team Calls the Hot Ones First',
    desc: 'Every lead is scored on real buying signals — timeline, budget, the exact car or service they asked about. Your dashboard ranks who to call first, with the reasons shown.',
    tag: 'Lead scoring',
  },
  {
    num: '05',
    title: 'Knows When to Get a Human',
    desc: 'Price negotiation, complaints, VIPs — the AI pages your team by text and email with the full conversation attached, then steps aside. No dead ends, no "let me transfer you" loops.',
    tag: 'Smart handoff',
  },
  {
    num: '06',
    title: 'Reviews on Autopilot',
    desc: 'After a completed visit, happy customers get one friendly nudge to your Google review page — perfectly timed, never spammy, one ask per customer ever.',
    tag: 'Reputation',
  },
  {
    num: '07',
    title: 'Proof, Not Promises',
    desc: 'Your dashboard shows response times, after-hours leads captured, appointments booked, show rates, and the actual dollars recovered — plus a weekly report in your inbox every Monday.',
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
  const [phase] = useState(1)
  // active = index of the CENTER card
  const [active, setActive] = useState(0)
  const [completed, setCompleted] = useState(false)
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

      // Section is "active" when it occupies most of the viewport
      const sectionVisible = rect.top <= 80 && rect.bottom >= window.innerHeight - 80

      // If sprayed, never lock
      if (sprayed) return

      // If section not in sticky zone, don't intercept
      if (!sectionVisible) return

      if (animating.current) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      accumulated.current += e.deltaY

      if (Math.abs(accumulated.current) < THRESHOLD) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      const dir = accumulated.current > 0 ? 1 : -1
      accumulated.current = 0

      // At first card scrolling back — let page scroll naturally
      if (phase === 1 && dir < 0 && active === 0) {
        return
      }

      e.preventDefault()
      e.stopPropagation()

      // Phase 1 carousel forward
      if (phase === 1 && dir > 0) {
        if (active < features.length - 1) {
          animating.current = true
          setActive(prev => prev + 1)
          if (active + 1 === features.length - 1) {
            setTimeout(() => {
              animating.current = false
            }, 500)
          } else {
            setTimeout(() => { animating.current = false }, 500)
          }
        } else {
          // Last card — trigger spray and unlock
          animating.current = true
          setSprayed(true)
          setCompleted(true)
          setTimeout(() => { animating.current = false }, 900)
        }
        return
      }

      // Phase 1 carousel backward
      if (phase === 1 && dir < 0) {
        if (active > 0) {
          animating.current = true
          setActive(prev => prev - 1)
          setTimeout(() => { animating.current = false }, 500)
        }
        // at active === 0 scrolling back — do nothing, let user scroll up naturally
        return
      }
    }

    // Use capture phase so we intercept before anything else
    window.addEventListener('wheel', handleWheel, {
      passive: false,
      capture: true,
    })

    return () => window.removeEventListener('wheel', handleWheel, {
      capture: true,
    })
  }, [phase, active, sprayed, completed])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sprayed) {
          document.body.style.overscrollBehavior = 'none'
        } else {
          document.body.style.overscrollBehavior = 'auto'
        }
      },
      { threshold: 0.6 },
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      document.body.style.overscrollBehavior = 'auto'
    }
  }, [sprayed])

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
      <div className={styles.desktopOnly}>
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
                <motion.div
                  key={i}
                  className={styles.gridCard}
                  initial={{ opacity: 0, y: 40, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{
                    y: -14,
                    scale: 1.05,
                    boxShadow:
                      '0 0 0 1px rgba(32,159,168,0.4), 0 12px 24px rgba(32,159,168,0.25), 0 28px 56px rgba(32,159,168,0.2)',
                    borderColor: 'rgba(32,159,168,0.5)',
                    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
                  }}
                >
                  <div className={styles.cardNum}>{f.num}</div>
                  <span className={styles.cardTag}>{f.tag}</span>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardDesc}>{f.desc}</p>
                </motion.div>
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
            {phase === 1 && active < features.length - 1 && (
              <span>Scroll for next feature ↓</span>
            )}
            {phase === 1 && active === features.length - 1 && (
              <span>Scroll to reveal all features ↓</span>
            )}
          </div>
        )}
      </div>

      <div className={styles.mobileOnly}>
        <div className={styles.mobileHeader}>
          <div className={styles.eyebrow}>Features</div>
          <h2 className={styles.heading}>
            Built to handle <i>everything</i>
          </h2>
        </div>
        <div className={styles.mobileGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.mobileCard}>
              <div className={styles.mobileCardTop}>
                <span className={styles.cardTag}>{f.tag}</span>
                <span className={styles.cardNum}>{f.num}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
