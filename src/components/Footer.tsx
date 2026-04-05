import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <Image
            src="/logo.jpeg"
            alt="Belvoro AI"
            width={140}
            height={40}
            className={styles.logo}
          />
          <p className={styles.tagline}>
            Your front desk, on autopilot.
          </p>
        </div>

        <div className={styles.center}>
          <div className={styles.contactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .96h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <a href="tel:+16479810452" className={styles.contactLink}>
              +1 (647) 981-0452
            </a>
          </div>
          <div className={styles.contactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:belvoroai@gmail.com" className={styles.contactLink}>
              belvoroai@gmail.com
            </a>
          </div>
          <div className={styles.contactItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            <a
              href="https://instagram.com/belvoro.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Instagram
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupTitle}>Company</span>
            <a href="/#features" className={styles.link}>Features</a>
            <a href="/#how-it-works" className={styles.link}>How it works</a>
            <a href="/#industries" className={styles.link}>Industries</a>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupTitle}>Get in touch</span>
            <a href="/get-started" className={styles.link}>Get Started</a>
            <a href="/watch-demo" className={styles.link}>Watch Demo</a>
            <a href="https://belvorodashboard.com" className={styles.link}>Client Login</a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2025 Belvoro AI. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="/privacy" className={styles.bottomLink}>Privacy</a>
          <a href="/terms" className={styles.bottomLink}>Terms</a>
        </div>
      </div>
    </footer>
  )
}
