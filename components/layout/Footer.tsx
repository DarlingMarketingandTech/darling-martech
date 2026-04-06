'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeVariants, viewport } from '@/lib/motion'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className={styles.inner}>
        {/* Logo + tagline */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoName}>Darling</span>
            <span className={styles.logoAccent}>MarTech</span>
          </Link>
          <p className={styles.tagline}>
            Marketing strategy and technology for small businesses and startups.
          </p>
        </div>

        {/* Navigation links */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/work"     className={styles.navLink}>Work</Link>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/process"  className={styles.navLink}>Process</Link>
          <Link href="/tools"    className={styles.navLink}>Tools</Link>
          <Link href="/studio"   className={styles.navLink}>Studio</Link>
          <Link href="/about"    className={styles.navLink}>About</Link>
          <Link href="/contact"  className={styles.navLink}>Contact</Link>
        </nav>

        {/* Legal */}
        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} Marketing and Technology LLC</p>
          <p className={styles.legalEmail}>
            Indianapolis, IN ·{' '}
            <a href="mailto:jacob@darlingmartech.com" className={styles.emailLink}>
              jacob@darlingmartech.com
            </a>
          </p>
          <p className={styles.legalLinkRow}>
            <Link href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
