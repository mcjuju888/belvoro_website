import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/logo.jpeg"
          alt="Belvoro AI"
          width={160}
          height={44}
          className={styles.logoImg}
          priority
        />
      </Link>
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
