'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { springStandard, springEntrance } from '@/lib/motion'
import styles from './Nav.module.css'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/lab', label: 'Lab' },
  { href: '/studio', label: 'Studio' },
]

// Desktop nav link with orange underline on hover
function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      className={styles.navLink}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className={styles.navLinkText}
        animate={{ color: hovered ? 'var(--color-text)' : 'var(--color-muted)' }}
        transition={springStandard}
      >
        {label}
      </motion.span>
      <motion.span
        className={styles.navLinkUnderline}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      />
    </Link>
  )
}

// Nav pill variants — full-width transparent vs centered floating pill
const navVariants = {
  full: {
    opacity: 1,
    y: 0,
    maxWidth: '1400px',
    borderRadius: '0px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
  },
  pill: {
    opacity: 1,
    y: 24,
    maxWidth: '900px',
    borderRadius: '9999px',
    backgroundColor: 'rgba(20,20,20,0.85)',
    boxShadow:
      '0 8px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(245, 240, 232, 0.08)',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  // Mobile: glass bar (no pill shape)
  mobileFull: {
    opacity: 1,
    y: 0,
    maxWidth: '100%',
    borderRadius: '0px',
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  mobileScrolled: {
    opacity: 1,
    y: 0,
    maxWidth: '100%',
    borderRadius: '0px',
    backgroundColor: 'rgba(10,10,10,0.92)',
    boxShadow: '0 1px 0 rgba(245, 240, 232, 0.06)',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
}

const mobileOverlayContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const mobileOverlayItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springEntrance },
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { scrollY } = useScroll()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const getNavState = () => {
    if (isMobile) return scrolled ? 'mobileScrolled' : 'mobileFull'
    return scrolled ? 'pill' : 'full'
  }

  return (
    <>
      <header className={styles.header}>
        <motion.nav
          className={styles.navInner}
          initial={{ opacity: 0, y: -20 }}
          animate={getNavState()}
          variants={navVariants}
          transition={springStandard}
          style={{
            backdropFilter:
              (scrolled && !isMobile) ? 'blur(20px)' : 'blur(0px)',
          }}
          aria-label="Site navigation"
        >
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <span className={styles.logoWord}>Darling</span>
            <span className={styles.logoAccent}>MarTech</span>
          </Link>

          {/* Desktop center links */}
          <ul className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          {/* Right: CTA (desktop) + Hamburger (mobile) */}
          <div className={styles.navRight}>
            <motion.div
              className={styles.ctaWrap}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springStandard}
            >
              <Link href="/contact" className={styles.cta}>
                Let&apos;s talk →
              </Link>
            </motion.div>

            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={springStandard}
                    style={{ display: 'flex' }}
                  >
                    <X size={22} weight="light" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={springStandard}
                    style={{ display: 'flex' }}
                  >
                    <List size={22} weight="light" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.ul
              className={styles.overlayLinks}
              initial="hidden"
              animate="visible"
              variants={mobileOverlayContainer}
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={mobileOverlayItem}>
                  <Link
                    href={link.href}
                    className={styles.overlayLink}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.38 }}
            >
              <Link href="/contact" className={styles.overlayCta} onClick={closeMenu}>
                Let&apos;s talk →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
