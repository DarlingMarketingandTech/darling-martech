'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Megaphone } from '@phosphor-icons/react'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import styles from './FeaturedTool.module.css'

export function FeaturedToolInner() {
  return (
    <div className={styles.container}>
      {/* Left — copy */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.p variants={itemVariants} className={styles.eyebrow}>
          Featured Tool
        </motion.p>
        <motion.h2 variants={itemVariants} className={styles.heading}>
          Run a full CMO<br />strategy session.<br />
          <em className={styles.headingAccent}>Right now.</em>
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.body}>
          Walk through the same decision-making framework I use with clients — budget
          allocation, channel strategy, KPI selection, and execution priority — in about
          10 minutes. Free. No agenda.
        </motion.p>
        <motion.div variants={itemVariants} className={styles.ctaRow}>
          <Link href="/lab/cmo-simulator" className={styles.ctaPrimary}>
            Try the CMO Simulator →
          </Link>
          <Link href="/lab" className={styles.ctaGhost}>
            Browse all lab tools
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — visual card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.cardGrid} aria-hidden="true" />
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.cardSweep} aria-hidden="true" />

        <div className={styles.cardBadge}>
          <motion.span
            className={styles.pulseDot}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          Live · Production
        </div>

        <div className={styles.cardCenter}>
          <div className={styles.iconBox}>
            <Megaphone weight="light" size={32} color="var(--color-accent)" />
          </div>
          <div>
            <p className={styles.cardLabel}>CMO Simulator</p>
            <p className={styles.cardSublabel}>Marketing · Next.js · Vercel</p>
          </div>
        </div>

        <div className={styles.cardStats}>
          {[
            { value: '~10m', label: 'Avg session' },
            { value: 'CMO', label: 'Framework' },
            { value: 'Free', label: 'No catch' },
          ].map((stat) => (
            <div key={stat.label} className={styles.cardStat}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
