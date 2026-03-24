'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllWork } from '@/data/work/work-data'
import type { CaseStudy } from '@/lib/work'
import { cn } from '@/lib/utils'
import {
  containerVariants,
  fadeVariants,
  itemVariants,
  springEntrance,
  viewport,
} from '@/lib/motion'
import styles from './CaseStudies.module.css'

const showcaseSlugs = [
  '317-bbq',
  'graston-technique',
  'hoosier-boy-barbershop',
  'pike-medical-consultants',
  'behr-pet-essentials',
] as const

function isArtwork(publicId: string) {
  return /(?:^|[_-])(logo|Logo)(?:[_-]|$)|Full_Logo|webheader/i.test(publicId)
}

function getShowcaseStudies() {
  return showcaseSlugs
    .map((slug) => getAllWork().find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study))
}

function HomeWorkCard({
  study,
  active,
  onActivate,
}: {
  study: CaseStudy
  active: boolean
  onActivate: () => void
}) {
  const mediaPublicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId
  const metrics = study.metrics.slice(0, 2)

  return (
    <motion.article
      className={cn(styles.cardShell, active && styles.cardShellActive)}
      whileHover={{ y: -6 }}
      transition={springEntrance}
    >
      <Link
        href={`/work/${study.slug}`}
        className={styles.card}
        onMouseEnter={onActivate}
        onFocus={onActivate}
      >
        <div className={styles.cardMediaWrap}>
          {mediaPublicId && isArtwork(mediaPublicId) ? (
            <div className={cn(styles.cardMedia, styles.cardArtwork)}>
              <div className={styles.cardBackdropGrid} aria-hidden="true" />
              <div className={styles.cardArtworkGlow} aria-hidden="true" />
              <CldImage
                src={mediaPublicId}
                alt={`${study.client} case study cover`}
                width={900}
                height={560}
                crop="fit"
                className={styles.cardArtworkImage}
                sizes="(min-width: 1200px) 28rem, (min-width: 768px) 22rem, 86vw"
              />
              <span className={styles.cardBadge}>{study.category}</span>
            </div>
          ) : mediaPublicId ? (
            <div className={styles.cardMedia}>
              <CldImage
                src={mediaPublicId}
                alt={`${study.client} case study cover`}
                width={1200}
                height={900}
                crop="fill"
                gravity="auto"
                className={styles.cardMediaImage}
                sizes="(min-width: 1200px) 28rem, (min-width: 768px) 22rem, 86vw"
              />
              <div className={styles.cardMediaShade} />
              <span className={styles.cardBadge}>{study.category}</span>
            </div>
          ) : (
            <div className={cn(styles.cardMedia, styles.cardFallback)} aria-hidden="true">
              <div className={styles.cardBackdropGrid} />
              <div className={styles.cardFallbackBeam} />
              <div className={styles.cardFallbackWordmark}>{study.client}</div>
              <span className={styles.cardBadge}>{study.category}</span>
            </div>
          )}
        </div>

        <div className={styles.cardBody}>
          <p className={styles.cardEyebrow}>{study.label}</p>
          <h3 className={styles.cardTitle}>{study.client}</h3>
          <p className={styles.cardSummary}>{study.headline}</p>

          <div className={styles.cardMetrics}>
            {metrics.map((metric, index) => (
              <span key={metric} className={cn(styles.cardMetric, index === 0 && styles.cardMetricAccent)}>
                {metric}
              </span>
            ))}
          </div>

          <span className={styles.cardCta}>
            Open case study
            <ArrowRight className={styles.cardCtaIcon} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export function CaseStudies() {
  const studies = useMemo(() => getShowcaseStudies(), [])
  const railRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeStudy = studies[activeIndex] ?? studies[0]

  const scrollToIndex = (index: number) => {
    const rail = railRef.current
    if (!rail) return

    const nextIndex = Math.max(0, Math.min(index, studies.length - 1))
    const child = rail.children[nextIndex] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    setActiveIndex(nextIndex)
  }

  const handleScroll = () => {
    const rail = railRef.current
    if (!rail) return

    const snapPoint = rail.scrollLeft + rail.clientWidth * 0.18
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    Array.from(rail.children).forEach((child, index) => {
      const element = child as HTMLElement
      const distance = Math.abs(element.offsetLeft - snapPoint)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex((current) => (current === closestIndex ? current : closestIndex))
  }

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className={styles.headerCopy}>
            <motion.p variants={fadeVariants} className={styles.label}>
              Selected Work
            </motion.p>
            <motion.h2 variants={itemVariants} className={styles.heading}>
              Work that proves the point.
            </motion.h2>
            <motion.p variants={itemVariants} className={styles.subheading}>
              A smaller command-center view of a few case studies. Browse the highlights here, then
              step into the full system on the work page.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className={styles.headerActions}>
            <Link href="/work" className={styles.primaryCta}>
              Explore all work
              <ArrowRight className={styles.primaryCtaIcon} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.signalBar}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <div className={styles.signalGroup}>
            <span className={styles.signalLabel}>Current signal</span>
            <div className={styles.signalPrimary}>
              <span className={styles.signalMetric}>{activeStudy?.metrics[0] ?? 'Selected work'}</span>
              <span className={styles.signalClient}>{activeStudy?.client ?? 'Darling MarTech'}</span>
            </div>
          </div>

          <div className={styles.signalGroup}>
            <span className={styles.signalLabel}>Visible projects</span>
            <span className={styles.signalCount}>{String(studies.length).padStart(2, '0')}</span>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
            >
              <ChevronLeft className={styles.controlIcon} />
            </button>
            <button
              type="button"
              className={styles.controlButton}
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === studies.length - 1}
              aria-label="Next project"
            >
              <ChevronRight className={styles.controlIcon} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className={styles.railOuter}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <div className={styles.rail} ref={railRef} onScroll={handleScroll}>
            {studies.map((study, index) => (
              <div key={study.slug} className={styles.railSlide}>
                <HomeWorkCard
                  study={study}
                  active={index === activeIndex}
                  onActivate={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className={styles.progressTrack} aria-hidden="true">
          <motion.div
            className={styles.progressBar}
            animate={{ width: `${((activeIndex + 1) / Math.max(studies.length, 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  )
}
