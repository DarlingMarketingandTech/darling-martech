'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from '@phosphor-icons/react'
import type { CaseStudy, WorkDashboardTier } from '@/lib/work'
import { cn } from '@/lib/utils'
import styles from './WorkIndex.module.css'

const CARD_TRANSITION = { type: 'spring', stiffness: 260, damping: 28 }

function isLogoArtwork(publicId: string) {
  return /(?:^|[_-])(logo|Logo)(?:[_-]|$)|Full_Logo|webheader/i.test(publicId)
}

function getTierClassName(tier: WorkDashboardTier) {
  if (tier === 'flagship') return styles.tierFlagship
  if (tier === 'system') return styles.tierSystem
  return styles.tierStandard
}

function WorkDashboardMedia({ study }: { study: CaseStudy }) {
  const mediaPublicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId

  if (!mediaPublicId) {
    return (
      <div className={styles.dashboardMediaFallback}>
        {study.client}
      </div>
    )
  }

  const isLogo = isLogoArtwork(mediaPublicId)

  return (
    <div className={styles.dashboardMediaWrap}>
      <CldImage
        src={mediaPublicId}
        alt={study.client}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: isLogo ? 'contain' : 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  )
}

export function WorkDashboardCard({
  study,
  layoutRole = 'flagship',
}: {
  readonly study: CaseStudy
  readonly layoutRole?: 'flagship' | 'supporting'
}) {
  const tier = study.dashboardTier ?? 'standard'
  const isSupporting = layoutRole === 'supporting'

  const metrics = study.metrics.slice(0, 1)
  const eyebrow = isSupporting ? study.category : study.label

  return (
    <Link href={`/work/${study.slug}`} className={cn(styles.dashboardCardShell, getTierClassName(tier))}>
      <motion.article
        className={styles.dashboardCard}
        whileHover={{ scale: 1.02 }}
        transition={CARD_TRANSITION}
      >
        <WorkDashboardMedia study={study} />

        <div className={styles.dashboardCardBody}>
          <div className={styles.dashboardCardTop}>
            <span className={styles.dashboardEyebrow}>{eyebrow}</span>
          </div>

          <div className={styles.dashboardCardCopy}>
            <h3 className={styles.dashboardTitle}>{study.client}</h3>

            {isSupporting && metrics.length > 0 && (
              <div className={styles.dashboardMetrics}>
                {metrics.map((metric, index) => (
                  <span
                    key={index}
                    className={cn(styles.dashboardMetric, index === 0 && styles.dashboardMetricAccent)}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}

            <p className={styles.dashboardSummary}>{study.headline}</p>

            {!isSupporting && metrics.length > 0 && (
              <div className={styles.dashboardMetrics}>
                {metrics.map((metric, index) => (
                  <span
                    key={index}
                    className={cn(styles.dashboardMetric, index === 0 && styles.dashboardMetricAccent)}
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}
          </div>

          {!isSupporting && (
            <div className={styles.dashboardFooter}>
              <span className={styles.dashboardCta}>Read case study</span>
              <ArrowRight className={styles.dashboardCtaIcon} />
            </div>
          )}
        </div>
      </motion.article>
    </Link>
  )
}
