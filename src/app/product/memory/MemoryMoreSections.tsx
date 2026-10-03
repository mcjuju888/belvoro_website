'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './more.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

// Left-side art, laid out in the design's own units (a 540 x 380 area measured
// from the original screenshot). CSS multiplies every unit by --k, so the
// character, labels and arrows keep the design's proportions at any size.
// Each label: pill right edge (`right`) and vertical centre (`cy`); its arrow
// runs from `from` to the tip `to` (which stops just short of the body), with
// curve control points `c1`/`c2`. `mTop` is the phone layout (labels stacked,
// arrows hidden).
const FACTS = [
  { lines: ['Has a fish allergy'], right: 206, cy: 38, from: [211, 38], c1: [240, 35], c2: [300, 42], to: [337, 66], mTop: 8 },
  { lines: ['Interested in SUVs'], right: 191, cy: 137, from: [195, 135], c1: [220, 130], c2: [258, 132], to: [283, 142], mTop: 31 },
  { lines: ['Follow up in 2 weeks'], right: 180, cy: 222, from: [184, 223], c1: [210, 218], c2: [248, 220], to: [275, 229], mTop: 54 },
  { lines: ['Budget is around', '$35,000'], right: 187, cy: 302, from: [192, 305], c1: [220, 308], c2: [259, 302], to: [285, 290], mTop: 77 },
] as const

/** Arrow-head: two short strokes back from the tip along the curve's end direction. */
function arrowHead(c2: readonly number[], to: readonly number[]) {
  const ang = Math.atan2(to[1] - c2[1], to[0] - c2[0])
  const len = 11, spread = (36 * Math.PI) / 180
  const p = (d: number) => `${(to[0] - len * Math.cos(ang + d)).toFixed(1)} ${(to[1] - len * Math.sin(ang + d)).toFixed(1)}`
  return `M${p(spread)} L${to[0]} ${to[1]} L${p(-spread)}`
}

const CHECKLIST = [
  'Calls, texts, emails & DMs across every channel',
  'Every interaction with your business',
  'Appointments & appointment status',
  'Notes, tasks & internal updates',
  'Team activity: who they spoke with, met with, and who handled each interaction',
]

export default function MemoryMoreSections({ hasProfileImage }: { hasProfileImage: boolean }) {
  const artRef = useRef<HTMLDivElement>(null)
  const artInView = useInView(artRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* SCREENSHOT CARD: shows /customer-profile.png once that file is added to /public */}
      <section className={styles.shot}>
        <div className="container">
          <motion.div
            className={styles.shotCard}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {hasProfileImage && (
              // unoptimized: serve the original PNG so the UI text stays crisp.
              <Image
                src="/customer-profile.png"
                alt="Belvoro customer profile with full conversation history, notes and appointments"
                fill
                unoptimized
                sizes="(max-width: 1100px) 100vw, 1040px"
                className={styles.shotImg}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* CUSTOMER HISTORY */}
      <section className={styles.history}>
        <div className={`container ${styles.historyInner}`}>
          <div className={styles.art} ref={artRef}>
            <div className={styles.glow} aria-hidden="true" />
            <Image
              src="/characters/memory.png"
              alt="Beige Belvoro character holding a folder"
              width={933}
              height={1141}
              className={styles.character}
            />
            <ul className={styles.facts}>
              {FACTS.map((f, i) => (
                // Outer element pops in (framer); inner element floats (CSS).
                // Each fact covers the whole art area so its arrow can be drawn
                // in the same units as the pill.
                <motion.li
                  key={f.lines.join(' ')}
                  className={styles.fact}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={artInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 + i * 0.18 }}
                >
                  <span
                    className={styles.factFloat}
                    style={{ animationDuration: `${5.5 + i * 0.7}s`, animationDelay: `${-i * 1.1}s` }}
                  >
                    <span
                      className={styles.pill}
                      style={{
                        ['--right' as string]: 540 - f.right,
                        ['--cy' as string]: f.cy,
                        ['--m-top' as string]: `${f.mTop}%`,
                      }}
                    >
                      {f.lines.map((l, j) => (
                        <span key={j} className={styles.pillLine}>{l}</span>
                      ))}
                    </span>
                    <svg className={styles.arrow} viewBox="0 0 540 380" fill="none" aria-hidden="true">
                      <path
                        d={`M${f.from[0]} ${f.from[1]} C ${f.c1[0]} ${f.c1[1]}, ${f.c2[0]} ${f.c2[1]}, ${f.to[0]} ${f.to[1]}`}
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                      />
                      <path d={arrowHead(f.c2, f.to)} stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className={styles.heading}>
              All your customer history,
              <br />
              <span className={styles.gradient}>connected &amp; organized.</span>
            </h2>
            <p className={styles.text}>
              Belvoro brings every customer&apos;s conversations, appointments, notes, tasks, and history
              into one profile, keeping your team organized, your marketing smarter, and every
              interaction more personalized.
            </p>
            <ul className={styles.checklist}>
              {CHECKLIST.map((item) => (
                <li key={item}>
                  <span className={styles.check} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2 5 8.6 9.5 3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  )
}
