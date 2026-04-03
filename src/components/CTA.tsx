import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.pill}>No templates. Built for you.</div>
      <h2 className={styles.heading}>
        Ready to put your front desk<br />
        <i>on autopilot?</i>
      </h2>
      <p className={styles.sub}>Custom AI — built around your business, live in days.</p>
      <div className={styles.btns}>
        <a href="/get-started" className={styles.btnDark}>Get Started Free</a>
        <a href="/watch-demo" className={styles.btnOutline}>Watch Demo →</a>
      </div>
    </section>
  )
}
