'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from '@phosphor-icons/react'
import type { CaseStudy } from '@/lib/work'
import {
  containerVariants,
  itemVariants,
  fadeVariants,
  springEntrance,
  viewport,
} from '@/lib/motion'
import styles from './WorkIndex.module.css'

// Metrics that start with a number/symbol get accent color
function MetricPill({ text }: { text: string }) {
  const startsWithData = /^[\d+\-$£€¥×#]/.test(text.trim())
  return (
    <span className={`${styles.cardMetric} ${startsWithData ? styles.cardMetricAccent : ''}`}>
      {text}
    </span>
  )
}

function WorkCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const inner = (
    <div className={styles.cardPadding}>
      <span className={styles.cardBorder} aria-hidden="true" />

      {/* Logo or category badge */}
      <div className={styles.cardLogo}>
        {cs.logoPublicId ? (
          <CldImage
            src={cs.logoPublicId}
            alt={`${cs.client} logo`}
            width={120}
            height={36}
            crop="fit"
            className={styles.cardLogoImg}
          />
        ) : (
          <span className={styles.cardCategoryBadge}>{cs.category}</span>
        )}
      </div>

      {/* Header */}
      <div className={styles.cardHeader}>
        <p className={styles.cardLabel}>{cs.label}</p>
        <h2 className={styles.cardClient}>{cs.client}</h2>
        <p className={styles.cardHeadline}>{cs.headline}</p>
      </div>

      {/* Metrics */}
      <div className={styles.cardMetrics}>
        {cs.metrics.map((m) => (
          <MetricPill key={m} text={m} />
        ))}
      </div>

      {/* Footer arrow */}
      <div className={styles.cardFooter}>
        <span className={styles.cardArrow}>
          View case study
          <ArrowRight weight="regular" size={14} />
        </span>
      </div>
    </div>
  )

  return (
    <motion.div variants={itemVariants} custom={index} transition={springEntrance}>
      <Link href={`/work/${cs.slug}`} className={`${styles.card} ${styles.cardEnabled}`}>
        {inner}
      </Link>
    </motion.div>
  )
}

export function WorkGrid({ studies }: { studies: CaseStudy[] }) {
  return (
    <motion.div
      className={styles.grid}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {studies.map((cs, i) => (
        <WorkCard key={cs.slug} cs={cs} index={i} />
      ))}
    </motion.div>
  )
}

export function WorkHero() {
  return (
    <motion.div
      className={styles.hero}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p variants={fadeVariants} className={styles.heroEyebrow}>
        Selected Work
      </motion.p>
      <motion.h1 variants={itemVariants} className={styles.heroHeadline}>
        Proof, not promises.
      </motion.h1>
      <motion.p variants={itemVariants} className={styles.heroSubhead}>
        15+ years. 30,000+ users served. 40% average conversion lift. Real projects. Real outcomes.
      </motion.p>
    </motion.div>
  )
}

export function WorkBottomCTA() {
  return (
    <motion.div
      className={styles.cta}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={containerVariants}
    >
      <motion.p variants={itemVariants} className={styles.ctaText}>
        Every project started with a conversation.
      </motion.p>
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={springEntrance}
          style={{ display: 'inline-block' }}
        >
          <Link href="/contact" className={styles.ctaBtn}>
            Start one
            <ArrowRight weight="regular" size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
