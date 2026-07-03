'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import styles from './LiveDemo.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

interface Msg {
  from: 'customer' | 'ai'
  text: string
  time: string
}

const SCRIPT: Msg[] = [
  { from: 'customer', text: 'hey do you still have the 2022 camry se listed?', time: '11:42 PM' },
  { from: 'ai', text: 'We do! Midnight Black, 22,000 miles, $26,500. Want to come take it for a spin this week?', time: '11:42 PM' },
  { from: 'customer', text: 'can i do saturday morning?', time: '11:42 PM' },
  { from: 'ai', text: 'Saturday at 10:00 AM is open. What name should I put the test drive under?', time: '11:43 PM' },
  { from: 'customer', text: 'Mike Torres', time: '11:43 PM' },
  { from: 'ai', text: "You're all set, Mike. Test drive Saturday at 10:00 AM. I'll text you a reminder the day before. 🔑", time: '11:43 PM' },
]

const TYPING_MS = 1100
const READ_MS = 1500
const RESTART_MS = 5000

export default function LiveDemo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // count = messages currently shown; typing = a bubble is being "typed"
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>((r) => { timers.push(setTimeout(r, ms)) })

    const run = async () => {
      while (!cancelled) {
        setCount(0)
        setTyping(false)
        await wait(800)
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return
          if (SCRIPT[i].from === 'ai') {
            setTyping(true)
            await wait(TYPING_MS)
            setTyping(false)
          } else {
            await wait(READ_MS)
          }
          if (cancelled) return
          setCount(i + 1)
        }
        await wait(RESTART_MS)
      }
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [inView])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [count, typing])

  const booked = count >= SCRIPT.length

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Watch it work
          </motion.div>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            11:42 PM. Your team is asleep.<br />
            <i>Belvoro isn&apos;t.</i>
          </motion.h2>
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            A real late-night inquiry, answered in seconds and booked in under a minute.
            The same conversation works over text, Instagram, Facebook, email, web chat, and voice.
          </motion.p>
          <motion.div
            className={styles.badges}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
          >
            {['SMS', 'Instagram', 'Facebook', 'Email', 'Web Chat', 'Phone'].map((b) => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.phoneWrap}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        >
          <div className={styles.phone}>
            <div className={styles.phoneHead}>
              <div className={styles.avatar}>B</div>
              <div>
                <div className={styles.phoneName}>Bella · Smart Wheels Auto</div>
                <div className={styles.phoneStatus}><span className={styles.dot} /> Responds instantly</div>
              </div>
              <div className={styles.phoneTime}>11:42 PM</div>
            </div>
            <div className={styles.msgs} ref={scrollRef}>
              <AnimatePresence>
                {SCRIPT.slice(0, count).map((m, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.bubbleRow} ${m.from === 'ai' ? styles.rowAi : styles.rowCustomer}`}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <div className={m.from === 'ai' ? styles.bubbleAi : styles.bubbleCustomer}>
                      {m.text}
                    </div>
                    <div className={styles.msgTime}>{m.time}</div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    className={`${styles.bubbleRow} ${styles.rowAi}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`${styles.bubbleAi} ${styles.typing}`}>
                      <i /><i /><i />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {booked && (
                <motion.div
                  className={styles.bookedBar}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  ✓ Test drive booked · Reminders scheduled · Lead scored 🔥
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
