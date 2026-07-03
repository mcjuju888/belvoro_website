'use client'
import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import styles from './RevenueCalculator.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

// Belvoro recovers missed/after-hours inquiries and rescues stalling leads
// with automated follow-up. Conservative capture assumption baked in below.
const RECOVERY_RATE = 0.72 // of missed inquiries, how many Belvoro converts into live conversations
const FOLLOWUP_LIFT = 0.18 // extra closes from multi-touch follow-up on leads that would've gone cold

interface SliderCfg {
  key: 'inquiries' | 'missedPct' | 'closeRate' | 'avgValue'
  label: string
  min: number
  max: number
  step: number
  format: (v: number) => string
}

interface Preset {
  key: string
  label: string
  values: { inquiries: number; missedPct: number; closeRate: number; avgValue: number }
}

// Starting points per industry. Sale value = revenue per closed customer:
// the vehicle for a dealership, first-year treatment value for dental,
// average ticket for service businesses.
const PRESETS: Preset[] = [
  { key: 'auto',    label: 'Auto Dealership',  values: { inquiries: 350, missedPct: 28, closeRate: 10, avgValue: 32000 } },
  { key: 'dental',  label: 'Dental & Clinics', values: { inquiries: 180, missedPct: 22, closeRate: 35, avgValue: 900 } },
  { key: 'service', label: 'Service Business', values: { inquiries: 200, missedPct: 25, closeRate: 20, avgValue: 2500 } },
]

const SLIDERS: SliderCfg[] = [
  { key: 'inquiries', label: 'Inquiries per month (calls, texts, DMs, emails)', min: 20, max: 1000, step: 10, format: (v) => `${v}` },
  { key: 'missedPct', label: 'Missed or answered too late', min: 5, max: 60, step: 1, format: (v) => `${v}%` },
  { key: 'closeRate', label: 'Of the leads you do reach, how many buy', min: 5, max: 60, step: 1, format: (v) => `${v}%` },
  { key: 'avgValue', label: 'Average sale / customer value', min: 100, max: 60000, step: 100, format: (v) => `$${v.toLocaleString()}` },
]

function money(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  return `$${Math.round(v).toLocaleString()}`
}

function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(0)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const controls = animate(prev.current, value, {
      duration: 0.6,
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

    // Money currently walking out the door
    const lostMonthly = missed * close * values.avgValue

    // What Belvoro puts back: recovered missed inquiries + follow-up lift on
    // the leads that would have gone cold
    const recoveredFromMissed = missed * RECOVERY_RATE * close * values.avgValue
    const reached = values.inquiries - missed
    const followupGain = reached * (1 - close) * FOLLOWUP_LIFT * close * values.avgValue
    const recoveredMonthly = recoveredFromMissed + followupGain

    return {
      lostMonthly,
      recoveredMonthly,
      recoveredYearly: recoveredMonthly * 12,
      extraCustomers: Math.round(missed * RECOVERY_RATE * close + reached * (1 - close) * FOLLOWUP_LIFT * close),
    }
  }, [values])

  const ctaHref = useMemo(() => {
    const params = new URLSearchParams({
      calc: '1',
      inquiries: String(values.inquiries),
      missed: String(values.missedPct),
      recovered: String(Math.round(calc.recoveredMonthly)),
    })
    return `/get-started?${params.toString()}`
  }, [values, calc])

  return (
    <section id="calculator" className={styles.section} ref={sectionRef}>
      <div className="container">
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Revenue recovery calculator
        </motion.div>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
        >
          How much is <i>silence</i> costing you?
        </motion.h2>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Every missed call, slow reply, and lead that goes cold has a dollar value.
          Move the sliders to match your business.
        </motion.p>

        <motion.div
          className={styles.presetRow}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        >
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`${styles.presetBtn} ${preset === p.key ? styles.presetOn : ''}`}
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
            {SLIDERS.map((s) => (
              <div key={s.key} className={styles.control}>
                <div className={styles.controlHead}>
                  <label className={styles.controlLabel}>{s.label}</label>
                  <span className={styles.controlValue}>{s.format(values[s.key])}</span>
                </div>
                <input
                  type="range"
                  className={styles.slider}
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={values[s.key]}
                  onChange={(e) => setValues((prev) => ({ ...prev, [s.key]: Number(e.target.value) }))}
                  style={{ ['--fill' as string]: `${((values[s.key] - s.min) / (s.max - s.min)) * 100}%` }}
                />
              </div>
            ))}
          </div>

          <div className={styles.results}>
            <div className={styles.resultLost}>
              <div className={styles.resultLabel}>Revenue leaking every month</div>
              <CountUp value={calc.lostMonthly} className={styles.lostNum} />
              <div className={styles.resultNote}>from inquiries nobody answered in time</div>
            </div>

            <div className={styles.resultRecovered}>
              <div className={styles.resultLabel}>Belvoro puts back</div>
              <CountUp value={calc.recoveredMonthly} className={styles.recoveredNum} />
              <div className={styles.resultper}>/ month</div>
              <div className={styles.resultYear}>
                That&apos;s <CountUp value={calc.recoveredYearly} className={styles.yearNum} /> a year
                or about {calc.extraCustomers} extra customer{calc.extraCustomers === 1 ? '' : 's'} every month.
              </div>
              <motion.a
                href={ctaHref}
                className={styles.cta}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(32,159,168,0.38)' }}
                whileTap={{ scale: 0.97 }}
              >
                Recover It: Get Started
              </motion.a>
            </div>
          </div>

          <div className={styles.disclaimer}>
            Estimate assumes Belvoro engages {Math.round(RECOVERY_RATE * 100)}% of missed inquiries instantly and
            multi-touch follow-up revives {Math.round(FOLLOWUP_LIFT * 100)}% of leads that would otherwise go cold.
            Your numbers depend on your market; we&apos;ll show you real figures in your dashboard.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
