import styles from './Ticker.module.css'

const items = [
  '24/7 AI Call Answering',
  'SMS · Email · WhatsApp · Instagram · Facebook',
  'Meta Ads Lead Capture',
  'Built-In Website Chat',
  'Unified Communications Inbox',
  'Human Takeover',
  'Smart AI-to-Human Handoff',
  'Appointment Booking',
  'Confirmations & Reminders',
  'Inventory & Catalog Integration',
  'Google Review Booster',
  'Automated Review Responses',
  'Complete Customer Profiles',
  'Customer Journey & History',
  'Steer the AI',
  'Manual SMS & Email Outreach',
  'AI Target Outreach',
  'Outbound Marketing Studio',
  'Team Members & Departments',
  'Custom Dashboard',
  'Fully Customized System',
  '24/7 Service & Support',
]

export default function Ticker() {
  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {allItems.map((item, i) => (
          <span key={i} className={styles.item} aria-hidden={i >= items.length}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
