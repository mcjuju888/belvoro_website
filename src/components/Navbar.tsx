import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        Belvoro<em>.</em>ai
      </div>
      <div className={styles.links}>
        <a href="/#features">Features</a>
        <a href="/#how-it-works">How it works</a>
        <a href="/#industries">Industries</a>
      </div>
      <div className={styles.actions}>
        <a href="https://belvorodashboard.com" className={styles.loginBtn}>Log in</a>
        <a href="/get-started" className={styles.startBtn}>Get Started →</a>
      </div>
    </nav>
  )
}
