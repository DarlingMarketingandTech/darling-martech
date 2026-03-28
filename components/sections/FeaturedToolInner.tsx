'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import styles from './FeaturedTool.module.css'

type FeaturedLab = {
  slug: string
  eyebrow: string
  heading: string
  headingAccent: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  cardLabel: string
  cardSubLabel: string
  imageSrc: string
  imageAlt: string
  stats: { value: string; label: string }[]
}

const featuredLabs: FeaturedLab[] = [
  {
    slug: 'cmo-simulator',
    eyebrow: 'Featured Tool',
    heading: 'Run a full CMO strategy session.',
    headingAccent: 'Right now.',
    body:
      'Walk through the same decision-making framework I use with clients — budget allocation, channel strategy, KPI selection, and execution priority — in about 10 minutes. Free. No agenda.',
    primaryLabel: 'Try the CMO Simulator',
    primaryHref: '/lab/cmo-simulator',
    secondaryLabel: 'Browse all lab tools',
    secondaryHref: '/lab',
    cardLabel: 'CMO Simulator',
    cardSubLabel: 'Marketing · Next.js · Vercel',
    imageSrc: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/CMO_Simulator.jpg',
    imageAlt: 'CMO Simulator interface preview',
    stats: [
      { value: '~10m', label: 'Avg session' },
      { value: 'CMO', label: 'Framework' },
      { value: 'Free', label: 'No catch' },
    ],
  },
  {
    slug: 'geo-readiness-auditor',
    eyebrow: 'Featured Tool',
    heading: 'Audit your AI visibility in 60 seconds.',
    headingAccent: 'Fix what matters first.',
    body:
      'Run a free GEO readiness audit, see your 0-100 visibility score, and unlock a prioritized roadmap of technical fixes by email. Built for SMB teams, not enterprise budgets.',
    primaryLabel: 'Run GEO Audit',
    primaryHref: '/lab/geo-readiness-auditor',
    secondaryLabel: 'Browse all lab tools',
    secondaryHref: '/lab',
    cardLabel: 'GEO Readiness Auditor',
    cardSubLabel: 'GEO Optimization · Technical SEO · Next.js',
    imageSrc: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png',
    imageAlt: 'GEO Readiness Auditor interface preview',
    stats: [
      { value: '0-100', label: 'GEO score' },
      { value: '60s', label: 'Fast audit' },
      { value: '6', label: 'Signal checks' },
    ],
  },
]

export function FeaturedToolInner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const activeTool = featuredLabs[activeIndex]

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredLabs.length)
    }, 8000)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <div className={styles.container}>
      <motion.div
        key={`copy-${activeTool.slug}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.p variants={itemVariants} className={styles.eyebrow}>
          {activeTool.eyebrow}
        </motion.p>
        <motion.h2 variants={itemVariants} className={styles.heading}>
          {activeTool.heading}
          <br />
          <em className={styles.headingAccent}>{activeTool.headingAccent}</em>
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.body}>
          {activeTool.body}
        </motion.p>
        <motion.div variants={itemVariants} className={styles.ctaRow}>
          <Link href={activeTool.primaryHref} className={styles.ctaPrimary}>
            {activeTool.primaryLabel} →
          </Link>
          <Link href={activeTool.secondaryHref} className={styles.ctaGhost}>
            {activeTool.secondaryLabel}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.selectorRow}>
          {featuredLabs.map((tool, index) => (
            <button
              key={tool.slug}
              type="button"
              className={`${styles.selectorButton} ${index === activeIndex ? styles.selectorButtonActive : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              {tool.cardLabel}
            </button>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        key={`card-${activeTool.slug}`}
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.cardImageWrap}>
          <Image
            src={activeTool.imageSrc}
            alt={activeTool.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.cardImage}
            unoptimized
          />
        </div>
        <div className={styles.cardImageScrim} aria-hidden="true" />
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
          <div>
            <p className={styles.cardLabel}>{activeTool.cardLabel}</p>
            <p className={styles.cardSublabel}>{activeTool.cardSubLabel}</p>
          </div>
        </div>

        <div className={styles.cardStats}>
          {activeTool.stats.map((stat) => (
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
