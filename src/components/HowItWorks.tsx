import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We study your call flow, services, and how your business actually operates day-to-day.',
  },
  {
    num: '02',
    title: 'Build',
    desc: "We work alongside you to design and train your AI front desk around your real customer conversations and goals.\
     Fully customized to your business. No payment until you're satisfied.",
  },
  {
    num: '03',
    title: 'Deploy',
    desc: 'Integrated with your phone system and tools. Minimal disruption, maximum impact.',
  },
  {
    num: '04',
    title: 'Optimize',
    desc: 'We refine based on real call data and conversations, always improving over time.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="container">
      <div className={styles.eyebrow}>Process</div>
      <h2 className={styles.heading}>
        We handle setup, <i>You handle the business</i>
      </h2>
      <p className={styles.sub}>
        We handle everything, no technical work required on your end.
      </p>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.stepNum}>{s.num}</div>
            <h4 className={styles.stepTitle}>{s.title}</h4>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
