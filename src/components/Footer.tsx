
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
      <div className={styles.logo}>
        Belvoro<em>.</em>ai
      </div>
      <p className={styles.copy}>© 2025 Belvoro AI. All rights reserved.</p>
      <div className={styles.links}>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>
      </div>
    </footer>
  )
}
