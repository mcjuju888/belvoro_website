import styles from './Ticker.module.css'

const items = [
  '24/7 Call Answering',
  'SMS · Email · Instagram · Facebook · Web Chat',
  'Live Appointment Booking',
  'Multi-Touch Follow-Up Sequences',
  'Lead Scoring & Hot-Lead Alerts',
  'Human Handoff With Full Context',
  'Automatic Appointment Reminders',
  'Google Review Generation',
  'Dormant Lead Reactivation',
  'Revenue Attribution Dashboard',
  'Weekly Owner Reports',
]

export default function Ticker() {
  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {allItems.map((item, i) => (
          <span key={i} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
