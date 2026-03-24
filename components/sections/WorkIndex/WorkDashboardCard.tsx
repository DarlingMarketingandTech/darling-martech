'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy, WorkDashboardTier } from '@/lib/work'
import { cn } from '@/lib/utils'
import styles from './WorkIndex.module.css'

const CARD_TRANSITION = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
}

function isLogoArtwork(publicId: string) {
  return /(?:^|[_-])(logo|Logo)(?:[_-]|$)|Full_Logo|webheader/i.test(publicId)
}

function getTierClassName(tier: WorkDashboardTier) {
  if (tier === 'flagship') return styles.tierFlagship
  if (tier === 'system') return styles.tierSystem
  return styles.tierStandard
}

function WorkDashboardMedia({ study, tier }: { study: CaseStudy; tier: WorkDashboardTier }) {
  const mediaPublicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId

  if (mediaPublicId && isLogoArtwork(mediaPublicId)) {
    return (
      <div className={cn(styles.dashboardMedia, styles.dashboardArtwork)}>
        <div className={styles.dashboardBackdropGrid} aria-hidden="true" />
        <div className={styles.dashboardArtworkGlow} aria-hidden="true" />
        <CldImage
          src={mediaPublicId}
          alt={`${study.client} case study cover`}
          width={tier === 'flagship' ? 900 : 640}
          height={tier === 'flagship' ? 620 : 420}
          crop="fit"
          className={styles.dashboardArtworkImage}
          sizes={tier === 'flagship' ? '(min-width: 1180px) 44vw, 100vw' : '(min-width: 1180px) 24vw, 100vw'}
        />
        <span className={styles.dashboardMediaBadge}>{study.category}</span>
      </div>
    )
  }

  if (mediaPublicId) {
    return (
      <div className={styles.dashboardMedia}>
        <CldImage
          src={mediaPublicId}
          alt={`${study.client} case study cover`}
          width={1200}
          height={900}
          crop="fill"
          gravity="auto"
          className={styles.dashboardMediaImage}
          sizes={tier === 'flagship' ? '(min-width: 1180px) 44vw, 100vw' : '(min-width: 1180px) 24vw, 100vw'}
        />
        <div className={styles.dashboardMediaShade} />
        <span className={styles.dashboardMediaBadge}>{study.category}</span>
      </div>
    )
  }

  return (
    <div className={cn(styles.dashboardMedia, styles.dashboardFallback)} aria-hidden="true">
      <div className={styles.dashboardBackdropGrid} />
      <div className={styles.dashboardFallbackBeam} />
      <div className={styles.dashboardFallbackWordmark}>{study.client}</div>
      <span className={styles.dashboardMediaBadge}>{study.category}</span>
    </div>
  )
}

export function WorkDashboardCard({
  study,
  active,
  onActivate,
  onDeactivate,
}: {
  study: CaseStudy
  active: boolean
  onActivate: (slug: string) => void
  onDeactivate: () => void
}) {
  const tier = study.dashboardTier ?? 'standard'
  const metrics = study.metrics.slice(0, tier === 'flagship' ? 3 : 2)
  const mediaPublicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId
  const hasArtworkMedia = Boolean(mediaPublicId && isLogoArtwork(mediaPublicId))

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
        layout: CARD_TRANSITION,
      }}
      whileHover={{ y: -6 }}
      className={cn(
        styles.dashboardCardShell,
        getTierClassName(tier),
        hasArtworkMedia && styles.dashboardCardArtworkShell,
        active && styles.dashboardCardShellActive
      )}
    >
      <Link
        href={`/work/${study.slug}`}
        className={styles.dashboardCard}
        onMouseEnter={() => onActivate(study.slug)}
        onMouseLeave={onDeactivate}
        onFocus={() => onActivate(study.slug)}
        onBlur={onDeactivate}
      >
        <div className={styles.dashboardMediaWrap}>
          <WorkDashboardMedia study={study} tier={tier} />
        </div>

        <div className={styles.dashboardCardBody}>
          <div className={styles.dashboardCardTop}>
            <p className={styles.dashboardEyebrow}>{study.label}</p>
            <span className={styles.dashboardTierTag}>
              {tier === 'flagship' ? 'Flagship build' : tier === 'system' ? 'System build' : study.category}
            </span>
          </div>

          <div className={styles.dashboardCardCopy}>
            <h3 className={styles.dashboardTitle}>{study.client}</h3>
            <p className={styles.dashboardSummary}>{study.headline}</p>
          </div>

          <div className={styles.dashboardMetrics}>
            {metrics.map((metric, index) => (
              <span
                key={metric}
                className={cn(styles.dashboardMetric, index === 0 && styles.dashboardMetricAccent)}
              >
                {metric}
              </span>
            ))}
          </div>

          <div className={styles.dashboardFooter}>
            <span className={styles.dashboardFooterMeta}>
              {study.parentProjectSlug ? 'Connected to parent system' : study.category}
            </span>
            <span className={styles.dashboardCta}>
              Open case study
              <ArrowRight className={styles.dashboardCtaIcon} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
