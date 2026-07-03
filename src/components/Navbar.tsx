'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

const EASE = [0.16, 1, 0.3, 1] as const

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Watch Demo', href: '/watch-demo' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/logo.png"
          alt="Belvoro AI"
          width={160}
          height={44}
          className={styles.logoImg}
          priority
        />
      </Link>

      <div className={styles.links}>
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EASE }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.42 }}
      >
        <a href="https://belvorodashboard.com" className={styles.loginBtn}>Log in</a>
        <motion.a
          href="/get-started"
          className={styles.startBtn}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started →
        </motion.a>
      </motion.div>
    </motion.nav>
  )
}
