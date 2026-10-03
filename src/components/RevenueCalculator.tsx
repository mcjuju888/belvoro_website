'use client'
import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import styles from './RevenueCalculator.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

// Share of the leaking revenue Belvoro is assumed to win back.
// Change this one number to adjust every result in the calculator.
const RECOVERY_RATE = 0.8

interface SliderCfg {
  key: 'inquiries' | 'missedPct' | 'closeRate' | 'avgValue'
  label: string
  min: number
  max: number
  step: number
  format: (v: number) => string
  /** Optional list of allowed values. When set, the slider moves through this
      list (one stop per position) instead of a single fixed step. */
  stops?: number[]
}

interface Preset {
  key: string
  label: string
  values: { inquiries: number; missedPct: number; closeRate: number; avgValue: number }
}

// Starting points per industry. Sale value = revenue per closed customer:
// the vehicle for a dealership, a year of enrolment for daycare, the average
// job for HVAC and plumbing, first-year treatment value for dental.
const PRESETS: Preset[] = [
  { key: 'auto',     label: 'Auto Dealership',  values: { inquiries: 350, missedPct: 28, closeRate: 10, avgValue: 32000 } },
  { key: 'daycare',  label: 'Daycare',          values: { inquiries: 80,  missedPct: 30, closeRate: 25, avgValue: 12000 } },
  { key: 'hvac',     label: 'HVAC',             values: { inquiries: 200, missedPct: 25, closeRate: 30, avgValue: 2500 } },
  { key: 'plumbing', label: 'Plumbing',         values: { inquiries: 250, missedPct: 30, closeRate: 40, avgValue: 650 } },
  { key: 'dental',   label: 'Dental & Clinics', values: { inquiries: 300, missedPct: 25, closeRate: 35, avgValue: 1200 } },
]

/** Builds the allowed values for a slider from [from, to, step] ranges. */
function buildStops(ranges: [number, number, number][]): number[] {
  const stops: number[] = []
  for (const [from, to, step] of ranges) {
    for (let v = from; v <= to; v += step) {
      if (stops[stops.length - 1] !== v) stops.push(v)
    }
  }
  return stops
}

// Fine steps for small sales, coarser steps for big ones, so $650 and $32,000
// are both exact and each range gets a comfortable share of the track.
const AVG_VALUE_STOPS = buildStops([
  [100, 1_000, 10],
  [1_000, 10_000, 100],
  [10_000, 60_000, 500],
])

/** Index of the stop closest to a value. */
function nearestStop(stops: number[], v: number): number {
  let best = 0
  for (let i = 1; i < stops.length; i++) {
    if (Math.abs(stops[i] - v) < Math.abs(stops[best] - v)) best = i
  }
  return best
}

const SLIDERS: SliderCfg[] = [
  { key: 'inquiries', label: 'Inquiries per month (calls, texts, DMs, emails)', min: 20, max: 1000, step: 10, format: (v) => `${v}` },
  { key: 'missedPct', label: 'Missed or answered too late', min: 5, max: 60, step: 1, format: (v) => `${v}%` },
  { key: 'closeRate', label: 'Of the leads you do reach, how many buy', min: 5, max: 60, step: 1, format: (v) => `${v}%` },
  { key: 'avgValue', label: 'Average sale / customer value', min: 100, max: 60000, step: 10, format: (v) => `$${v.toLocaleString('en-US')}`, stops: AVG_VALUE_STOPS },
]

/** Full dollars with separators: $313,600 */
function money(v: number): string {
  return `$${Math.round(v).toLocaleString('en-US')}`
}

/** Compact dollars: $3.8M, $250K, $4.2K, $900 */
function moneyShort(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 10_000) return `$${Math.round(v / 1_000)}K`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`
  return `$${Math.round(v)}`
}

function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const controls = animate(prev.current, value, {
      duration: 0.35,
      ease: 'easeOut',
      onUpdate: (v) => { node.textContent = money(v) },
    })
    prev.current = value
    return () => controls.stop()
  }, [value])
  return <span ref={ref} className={className}>{money(value)}</span>
}

export default function RevenueCalculator() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [preset, setPreset] = useState('auto')
  const [values, setValues] = useState(PRESETS[0].values)

  const applyPreset = (p: Preset) => {
    setPreset(p.key)
    setValues(p.values)
  }

  const calc = useMemo(() => {
    const missed = values.inquiries * (values.missedPct / 100)
    const close = values.closeRate / 100

    // Money currently walking out the door.
    const leakingMonthly = Math.round(missed * close * values.avgValue)
    // What Belvoro puts back. Derived from the rounded leaking number so the
    // two figures on screen always relate exactly.
    const recoveredMonthly = Math.round(leakingMonthly * RECOVERY_RATE)

    return {
      leakingMonthly,
      recoveredMonthly,
      recoveredYearly: recoveredMonthly * 12,
      extraCustomers: Math.round(missed * close * RECOVERY_RATE),
    }
  }, [values])

  const ctaHref = useMemo(() => {
    // The get-started page reads these to pre-fill the visitor's message.
    const params = new URLSearchParams({
      calc: '1',
      inquiries: String(values.inquiries),
      missed: String(values.missedPct),
      recovered: String(calc.recoveredMonthly),
    })
    return `/get-started?${params.toString()}`
  }, [values, calc])

  return (
    <section id="calculator" className={styles.section} ref={sectionRef}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className={styles.badge}>Revenue recovery calculator</span>
          <h2 className={styles.heading}>
            How much is <span className={styles.gradient}>silence</span> costing you?
          </h2>
        </motion.div>

        <motion.div
          className={styles.presetRow}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`${styles.presetBtn} ${preset === p.key ? styles.presetOn : ''}`}
              aria-pressed={preset === p.key}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <div className={styles.controls}>
            {SLIDERS.map((s) => {
              // Stop-based sliders move through positions 0..n-1; plain ones use the value itself.
              const pos = s.stops ? nearestStop(s.stops, values[s.key]) : values[s.key]
              const posMin = s.stops ? 0 : s.min
              const posMax = s.stops ? s.stops.length - 1 : s.max
              return (
                <div key={s.key} className={styles.control}>
                  <div className={styles.controlHead}>
                    <label className={styles.controlLabel} htmlFor={`calc-${s.key}`}>{s.label}</label>
                    <span className={styles.controlValue}>{s.format(values[s.key])}</span>
                  </div>
                  <input
                    id={`calc-${s.key}`}
                    type="range"
                    className={styles.slider}
                    min={posMin}
                    max={posMax}
                    step={s.stops ? 1 : s.step}
                    value={pos}
                    aria-valuetext={s.format(values[s.key])}
                    onChange={(e) => {
                      const raw = Number(e.target.value)
                      const next = s.stops ? s.stops[raw] : raw
                      setValues((prev) => ({ ...prev, [s.key]: next }))
                    }}
                    style={{ ['--fill' as string]: `${((pos - posMin) / (posMax - posMin)) * 100}%` }}
                  />
                </div>
              )
            })}
          </div>

          <div className={styles.results}>
            <div className={styles.resultLost}>
              <div className={styles.resultLabelLost}>Revenue leaking every month</div>
              <CountUp value={calc.leakingMonthly} className={styles.lostNum} />
              <div className={styles.resultNote}>From inquiries nobody answered in time</div>
            </div>

            <div className={styles.resultRecovered}>
              <div className={styles.resultLabel}>Belvoro puts back</div>
              <div className={styles.recoveredLine}>
                <CountUp value={calc.recoveredMonthly} className={styles.recoveredNum} />
                <span className={styles.perMonth}>/ month</span>
              </div>
              <div className={styles.resultYear}>
                That&apos;s <strong>{moneyShort(calc.recoveredYearly)}</strong> a year, or about{' '}
                {calc.extraCustomers} extra customer{calc.extraCustomers === 1 ? '' : 's'} every month
              </div>
              <motion.a
                href={ctaHref}
                className={styles.cta}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start recovering it <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <p className={styles.disclaimer}>
          Estimate assumes Belvoro wins back {Math.round(RECOVERY_RATE * 100)}% of the revenue from missed inquiries.
          Your real numbers will show in your dashboard.
        </p>
      </div>
    </section>
  )
}
