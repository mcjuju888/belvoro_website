import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.badge}>
          <div className={styles.badgeDot}><span /></div>
          <span className={styles.badgeText}>AI front desk — live in days</span>
        </div>

        <h1 className={styles.heading}>
          Your front desk,<br />
          <i>on autopilot.</i>
        </h1>

        <p className={styles.sub}>
          Belvoro answers every call, books appointments, qualifies leads, and follows up by SMS — around the clock, without hiring anyone.
        </p>

        <div className={styles.btns}>
          <a href="/get-started" className={styles.btnMain}>Get Started Free</a>
          <a href="/watch-demo" className={styles.btnGhost}>Watch Demo →</a>
        </div>

        <div className={styles.social}>
          <span className={styles.socialLabel}>Trusted by</span>
          <div className={styles.clientPill}>
            <div className={styles.clientAvatar}>DH</div>
            <span className={styles.clientName}>DH Auto Group</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardTitle}>Live Dashboard</span>
            <div className={styles.liveIndicator}>
              <div className={styles.liveDot} />
              Live
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <div className={styles.icon}>📞</div>
                <div>
                  <div className={styles.rowTitle}>Incoming call</div>
                  <div className={styles.rowSub}>John M. — trade-in inquiry</div>
                </div>
              </div>
              <span className={`${styles.badge2} ${styles.badgeGreen}`}>Booked</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <div className={styles.icon}>💬</div>
                <div>
                  <div className={styles.rowTitle}>SMS sent</div>
                  <div className={styles.rowSub}>Appointment reminder — 2pm</div>
                </div>
              </div>
              <span className={`${styles.badge2} ${styles.badgeGray}`}>Delivered</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <div className={styles.icon}>🎯</div>
                <div>
                  <div className={styles.rowTitle}>Lead qualified</div>
                  <div className={styles.rowSub}>Sarah K. — 2022 Honda CRV</div>
                </div>
              </div>
              <span className={`${styles.badge2} ${styles.badgeOrange}`}>Hot lead</span>
            </div>
            <div className={styles.statRow}>
              <div className={styles.stat}>
                <div className={styles.statNum}><em>24</em></div>
                <div className={styles.statLabel}>Calls today</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>8</div>
                <div className={styles.statLabel}>Booked</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}><em>0</em></div>
                <div className={styles.statLabel}>Missed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
