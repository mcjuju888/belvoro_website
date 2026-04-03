import styles from './StatsBar.module.css'

const stats = [
  { num: '24/7', label: 'Always-on call answering.\nNo missed leads.' },
  { num: '0', label: 'Calls that go unanswered\nwithout a follow-up.' },
  { num: '2–5x', label: 'More booked appointments\nin the first 30 days.' },
  { num: '100%', label: 'Custom-built for your\nworkflow and services.' },
]

export default function StatsBar() {
  return (
    <div className={styles.stats}>
      {stats.map((s, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.num}><em>{s.num}</em></div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
