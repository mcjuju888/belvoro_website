import styles from './Industries.module.css'

const industries = [
  {
    title: 'Appointment-Based',
    desc: 'For clinics, salons, and service businesses where scheduling drives operations.',
    tags: [
      'Booking & rescheduling',
      'Automated SMS reminders',
      'No-show reduction tools',
      'Calendar syncing & availability tracking',
    ],
  },
  {
    title: 'Sales-Driven',
    desc: 'Built for businesses that rely on capturing, qualifying, and converting every lead.',
    tags: [
      'Lead capture & scoring',
      'Appointment scheduling',
      'Customer profiles & database storage',
    ],
  },
  {
    title: 'High-Volume Multi-Dept.',
    desc: 'Designed for teams handling large call volumes across multiple departments.',
    tags: [
      'Intent-based call routing',
      'Multi-department workflows',
      'Real-time analytics dashboard',
      'Internal notifications & handoffs',
    ],
  },
]

export default function Industries() {
  return (
    <section id="industries" className={styles.section}>
      <div className="container">
        <div className={styles.eyebrow}>Industries we serve</div>
        <h2 className={styles.heading}>
          Built for businesses that<br />
          <i>Rely on thier front desk</i>
        </h2>
        <p className={styles.sub}>
          Belvoro adapts to your operation — appointments,
          sales, or high-volume routing.
        </p>
        <div className={styles.grid}>
          {industries.map((ind, i) => (
            <div key={i} className={styles.card}>
              <h3 className={styles.cardTitle}>{ind.title}</h3>
              <p className={styles.cardDesc}>{ind.desc}</p>
              <ul className={styles.tags}>
                {ind.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    <span className={styles.check}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
