import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
      <div className={styles.left}>
        <div className={styles.badge}>
          <div className={styles.badgeDot}><span /></div>
          <span className={styles.badgeText}>AI front desk — Accepting new business now</span>
        </div>

        <h1 className={styles.heading}>
          Your front desk,<br />
          <i>on autopilot.</i>
        </h1>

        <p className={styles.sub}>
          Belvoro answers every call, books appointments, qualifies leads, and follows up by SMS, around the clock, without hiring anyone.
        </p>

        <div className={styles.btns}>
          <a href="/get-started" className={styles.btnMain}>Get Started Free</a>
          <a href="/watch-demo" className={styles.btnGhost}>Watch Demo →</a>
        </div>
      </div>
      
      <div className={styles.right}>
        <Image
          src="/dashboard-preview.png"
          alt="Belvoro dashboard preview"
          width={600}
          height={500}
          className={styles.heroImage}
          priority
        />
      </div>
      </div>
    </section>
  )
}
