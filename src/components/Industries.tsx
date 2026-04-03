import styles from './Industries.module.css'

const industries = [
  {
    icon: '🗓',
    title: 'Appointment-Based',
    desc: 'Clinics, salons, auto shops — businesses where scheduling drives everything.',
    tags: ['Booking & rescheduling', 'SMS reminders', 'No-show reduction'],
  },
  {
    icon: '🚗',
    title: 'Sales-Driven',
    desc: 'Dealerships and sales orgs capturing, qualifying, and converting every lead.',
    tags: ['Lead capture & scoring', 'Trade-in intake', 'Appointment setting'],
  },
  {
    icon: '🏢',
    title: 'High-Volume Multi-Dept.',
    desc: 'Complex operations managing high call volumes and smart routing across departments.',
    tags: ['Intent-based routing', 'Multi-dept flows', 'Real-time dashboard'],
  },
]

export default function Industries() {
  return (
    <section id="industries" className={styles.section}>
      <div className={styles.eyebrow}>Industries</div>
      <h2 className={styles.heading}>
        Built for businesses that<br />
        <i>can't miss a call</i>
      </h2>
      <p className={styles.sub}>
        Belvoro adapts to your operation — appointments, sales, or high-volume routing.
      </p>
      <div className={styles.grid}>
        {industries.map((ind) => (
          <div key={ind.title} className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.icon}>{ind.icon}</div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{ind.title}</h3>
              <p className={styles.cardDesc}>{ind.desc}</p>
              <ul className={styles.tags}>
                {ind.tags.map((t) => (
                  <li key={t} className={styles.tag}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
