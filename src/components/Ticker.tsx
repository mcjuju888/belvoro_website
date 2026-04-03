import styles from './Ticker.module.css'

const items = [
  '24/7 Call Answering',
  'Lead Qualification',
  'Appointment Booking',
  'SMS Follow-Ups & Reminders',
  'Smart Call Routing',
  'Custom Dashboard',
  'Email Automation',
  'Voicemail Detection',
  'Lead Pipeline Tracking',
  'Google Review Boosters',
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
