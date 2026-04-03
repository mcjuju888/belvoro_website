import styles from './Features.module.css'

const features = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: '24/7 Call Answering',
    desc: 'Never miss a lead. Your AI answers every call instantly — day, night, or weekend.',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Lead Qualification',
    desc: 'Asks the right questions and captures structured data from every caller, automatically.',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: 'Appointment Booking',
    desc: 'Books, reschedules, and cancels based on your availability and rules — no back-and-forth.',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Smart Call Routing',
    desc: 'Detects caller intent and transfers to the right person or department — no dead ends.',
  },
  {
    num: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    title: 'SMS Follow-Ups',
    desc: 'Confirmations, reminders, and Google review nudges sent automatically after every call.',
  },
  {
    num: '06',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#209FA8" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Custom Dashboard',
    desc: 'All calls, leads, and bookings flow into a dashboard built for how your business runs.',
  },
]

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.eyebrow}>What Belvoro does</div>
      <h2 className={styles.heading}>
        Everything your front desk<br />
        <i>should</i> handle
      </h2>
      <p className={styles.sub}>
        Not a template bot. Every Belvoro agent is custom-built around your services, call flow, and customers.
      </p>
      <div className={styles.grid}>
        {features.map((f) => (
          <div key={f.num} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <span className={styles.num}>{f.num}</span>
            </div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
