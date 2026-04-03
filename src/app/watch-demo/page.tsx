import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function WatchDemo() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.eyebrow}>Product Demo</div>
            <h1 className={styles.heading}>
              See Belvoro <i>in action</i>
            </h1>
            <p className={styles.sub}>
              Watch how Belvoro handles real calls, books appointments, and qualifies
              leads — automatically.
            </p>
          </div>

          {/* Video placeholder */}
          <div className={styles.videoWrap}>
            <div className={styles.videoInner}>
              <div className={styles.playBtn}>
                <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
              <p className={styles.videoLabel}>Demo video coming soon</p>
            </div>
          </div>

          {/* Feature cards */}
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📞</div>
              <h3 className={styles.cardTitle}>Live Call Handling</h3>
              <p className={styles.cardDesc}>
                Watch the AI answer and qualify a real inbound call from start to finish.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🗓</div>
              <h3 className={styles.cardTitle}>Appointment Booking</h3>
              <p className={styles.cardDesc}>
                See how it books directly into the calendar in real time without any human input.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>💬</div>
              <h3 className={styles.cardTitle}>SMS Follow-Up</h3>
              <p className={styles.cardDesc}>
                Automatic confirmation and reminder texts sent instantly after every call.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <p className={styles.ctaText}>Ready to get your own?</p>
            <div className={styles.ctaBtns}>
              <a href="/get-started" className={styles.btnMain}>Get Started Free</a>
              <a href="/get-started" className={styles.btnOutline}>Contact Us</a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
