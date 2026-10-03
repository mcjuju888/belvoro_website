'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import CharacterAvatar, { type CharacterName } from './CharacterAvatar'
import styles from './Navbar.module.css'

const EASE = [0.16, 1, 0.3, 1] as const
const CLOSE_DELAY_MS = 180

const SOLUTIONS: { character: CharacterName; title: string; line: string; href: string }[] = [
  {
    character: 'channel',
    title: 'Every Channel, Every Lead',
    line: 'One inbox. No missed opportunities.',
    href: '/product/channels',
  },
  {
    character: 'memory',
    title: 'Memory & Context',
    line: 'Every customer interaction, remembered.',
    href: '/product/memory',
  },
  {
    character: 'marketing',
    title: 'Outbound Marketing',
    line: 'Reach the right customers automatically.',
    href: '/product/marketing',
  },
]

// No destinations yet: these rows are buttons that do nothing until links are added.
// To link one, add `href` and it renders as a normal link.
const RESOURCES: { icon: 'video' | 'doc'; title: string; line: string; href?: string }[] = [
  { icon: 'video', title: 'Demo Video', line: 'See Belvoro in action' },
  { icon: 'doc', title: 'Business Proposal Document', line: 'Explore features & compare plans', href: '/proposal' },
]

type MenuKey = 'solutions' | 'resources'

function Chevron() {
  return (
    <svg className={styles.chevron} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ResourceIcon({ kind }: { kind: 'video' | 'doc' }) {
  return (
    <span className={styles.resourceIcon} aria-hidden="true">
      {kind === 'video' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="#fff" strokeWidth="1.8" />
          <path d="M10 9.2v5.6l4.8-2.8L10 9.2Z" fill="#fff" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5l-5-5Z" />
          <path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h5" />
        </svg>
      )}
    </span>
  )
}

function ResourceRows({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {RESOURCES.map((r) => {
        const content = (
          <>
            <ResourceIcon kind={r.icon} />
            <span>
              <span className={styles.solutionTitle}>{r.title}</span>
              <span className={styles.solutionLine}>{r.line}</span>
            </span>
          </>
        )
        return r.href ? (
          <a key={r.title} href={r.href} className={styles.solution} onClick={onNavigate}>{content}</a>
        ) : (
          <button key={r.title} type="button" className={`${styles.solution} ${styles.rowButton}`}>{content}</button>
        )
      })}
    </>
  )
}

function SolutionRows({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {SOLUTIONS.map((s) => (
        <a key={s.title} href={s.href} className={styles.solution} onClick={onNavigate}>
          <CharacterAvatar name={s.character} size={44} />
          <span>
            <span className={styles.solutionTitle}>{s.title}</span>
            <span className={styles.solutionLine}>{s.line}</span>
          </span>
        </a>
      ))}
    </>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<MenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
  }

  const openMenu = (key: MenuKey) => {
    cancelClose()
    setOpen(key)
  }

  // Short delay so moving the mouse from the button to the panel doesn't close it.
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY_MS)
  }

  const closeAll = useCallback(() => {
    cancelClose()
    setOpen(null)
    setMobileOpen(false)
  }, [])

  // Escape closes everything; a click outside the navbar closes everything.
  useEffect(() => {
    if (!open && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const key = open
      closeAll()
      if (key) navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${key}"]`)?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open, mobileOpen, closeAll])

  useEffect(() => () => cancelClose(), [])

  // Close a menu when keyboard focus leaves it.
  const onMenuBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null)
  }

  const menuProps = (key: MenuKey) => ({
    className: `${styles.item} ${open === key ? styles.open : ''}`,
    onMouseEnter: () => openMenu(key),
    onMouseLeave: scheduleClose,
    onBlur: onMenuBlur,
  })

  const triggerProps = (key: MenuKey) => ({
    type: 'button' as const,
    className: styles.link,
    'data-menu': key,
    'aria-expanded': open === key,
    'aria-controls': `nav-${key}`,
    onClick: () => (open === key ? setOpen(null) : openMenu(key)),
  })

  return (
    <motion.nav
      ref={navRef}
      className={`${styles.nav} ${scrolled || mobileOpen ? styles.navScrolled : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Link href="/" className={styles.logoLink} aria-label="Belvoro home" onClick={closeAll}>
        <Image src="/logo.png" alt="Belvoro" width={165} height={29} className={styles.logoImg} priority />
      </Link>

      {/* Desktop menu */}
      <div className={styles.links}>
        <div {...menuProps('solutions')}>
          <button {...triggerProps('solutions')}>
            Solutions
            <Chevron />
          </button>
          <div id="nav-solutions" className={`${styles.dropdown} ${styles.solutionsPanel}`}>
            <span className={styles.panelTitle}>Explore</span>
            <SolutionRows onNavigate={closeAll} />
          </div>
        </div>

        <div className={styles.item}>
          <a href="/pricing" className={styles.link}>Pricing</a>
        </div>

        <div {...menuProps('resources')}>
          <button {...triggerProps('resources')}>
            Resources
            <Chevron />
          </button>
          <div id="nav-resources" className={`${styles.dropdown} ${styles.solutionsPanel} ${styles.resourcesPanel}`}>
            <span className={styles.panelTitle}>Learn</span>
            <ResourceRows onNavigate={closeAll} />
          </div>
        </div>
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started <span aria-hidden="true">→</span>
        </motion.a>
        <button
          type="button"
          className={styles.burger}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`${styles.burgerLines} ${mobileOpen ? styles.burgerX : ''}`} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </motion.div>

      {/* Mobile menu */}
      <div id="nav-mobile" className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelOpen : ''}`}>
        <span className={styles.panelTitle}>Solutions</span>
        <SolutionRows onNavigate={closeAll} />
        <div className={styles.mobileDivider} />
        <a href="/pricing" className={styles.mobileLink} onClick={closeAll}>Pricing</a>
        <div className={styles.mobileDivider} />
        <span className={styles.panelTitle}>Resources</span>
        <ResourceRows onNavigate={closeAll} />
        <div className={styles.mobileDivider} />
        <a href="https://belvorodashboard.com" className={styles.mobileLink}>Log in</a>
      </div>
    </motion.nav>
  )
}
