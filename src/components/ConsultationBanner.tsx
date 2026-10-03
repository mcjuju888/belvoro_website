import styles from './ConsultationBanner.module.css'

export default function ConsultationBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8.2 3.6c-.4-.7-1.3-1-2-.5L4.6 4.2C3.6 4.9 3.1 6.1 3.3 7.3c.7 3.6 2.4 6.9 5 9.5 2.6 2.6 5.9 4.3 9.5 5 1.2.2 2.4-.3 3.1-1.3l1.1-1.6c.5-.7.2-1.6-.5-2l-3.2-2.1c-.6-.4-1.3-.3-1.8.2l-1.2 1.3c-2-1-3.8-2.8-4.8-4.8l1.3-1.2c.5-.5.6-1.2.2-1.8L8.2 3.6Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className={styles.heading}>Not Sure Which Plan Is Right for You?</h2>
        <p className={styles.sub}>Book a free call and we&apos;ll recommend the plan that fits your business.</p>
        <a href="/get-started" className={styles.button}>
          Get a Free Consultation <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
