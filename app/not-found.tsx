'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.section}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.eyebrow}
      >
        404 — Page Not Found
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={styles.headline}
      >
        Dead end.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={styles.body}
      >
        This page doesn&apos;t exist — but good marketing systems never hit a dead end.
        Let&apos;s get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={styles.actions}
      >
        <Link href="/" className={styles.primaryBtn}>
          Back to home
        </Link>
        <Link href="/contact" className={styles.secondaryLink}>
          Get in touch →
        </Link>
      </motion.div>
    </section>
  )
}
