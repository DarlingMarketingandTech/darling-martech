'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { Activity, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import type { CaseStudy, WorkCategory, WorkDashboardTier } from '@/lib/work'
import styles from './WorkIndex.module.css'
import { WorkDashboardCard } from './WorkDashboardCard'

const filterOrder: Array<'All Work' | WorkCategory> = [
  'All Work',
  'Automation & Systems',
  'Healthcare',
  'Legal & Professional',
  'Hospitality & Local',
  'E-Commerce',
  'Brand Identity',
  'Non-Profit',
]

const HERO_TRANSITION = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
}

function isLogoArtwork(publicId: string) {
  return /(?:^|[_-])(logo|Logo)(?:[_-]|$)|Full_Logo|webheader/i.test(publicId)
}

function getTierRank(tier: WorkDashboardTier | undefined) {
  if (tier === 'flagship') return 0
  if (tier === 'system') return 1
  return 2
}

function sortStudies(studies: CaseStudy[]) {
  return [...studies].sort((left, right) => getTierRank(left.dashboardTier) - getTierRank(right.dashboardTier))
}

function getDefaultStudy(studies: CaseStudy[]) {
  return studies.find((study) => study.dashboardTier === 'flagship') ?? studies[0] ?? null
}

function SignalMedia({ study }: { study: CaseStudy }) {
  const publicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId

  if (publicId && isLogoArtwork(publicId)) {
    return (
      <div className={`${styles.signalMedia} ${styles.signalMediaArtwork}`}>
        <div className={styles.signalMediaGrid} aria-hidden="true" />
        <div className={styles.signalMediaGlow} aria-hidden="true" />
        <CldImage
          src={publicId}
          alt={`${study.client} case study cover`}
          width={720}
          height={520}
          crop="fit"
          className={styles.signalMediaArtworkImage}
          sizes="(min-width: 1080px) 26vw, 100vw"
        />
      </div>
    )
  }

  if (publicId) {
    return (
      <div className={styles.signalMedia}>
        <CldImage
          src={publicId}
          alt={`${study.client} case study cover`}
          width={960}
          height={720}
          crop="fill"
          gravity="auto"
          className={styles.signalMediaImage}
          sizes="(min-width: 1080px) 26vw, 100vw"
        />
        <div className={styles.signalMediaShade} />
      </div>
    )
  }

  return (
    <div className={`${styles.signalMedia} ${styles.signalMediaFallback}`} aria-hidden="true">
      <div className={styles.signalMediaGrid} />
      <div className={styles.signalMediaGlow} />
      <div className={styles.signalMediaFallbackWordmark}>{study.client}</div>
    </div>
  )
}

function WorkHeroSummary({
  studies,
  activeStudy,
}: {
  studies: CaseStudy[]
  activeStudy: CaseStudy
}) {
  const stats = [
    { value: `${studies.length}`, label: 'Case studies' },
    { value: `${new Set(studies.map((study) => study.category)).size}`, label: 'Core verticals' },
    { value: `${studies.filter((study) => study.dashboardTier === 'flagship').length}`, label: 'Flagship builds' },
  ]

  return (
    <section className={styles.heroWrap}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={HERO_TRANSITION}
        className={styles.heroCopy}
      >
        <p className={styles.heroEyebrow}>Selected Work</p>
        <h1 className={styles.heroHeadline}>Proof, not promises.</h1>
        <p className={styles.heroSubhead}>
          Strategy, systems, and execution for businesses that needed more than a pretty website.
          This index is built like a command center because the work itself behaves like infrastructure.
        </p>

        <div className={styles.heroStats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.heroStat}>
              <span className={styles.heroStatValue}>{stat.value}</span>
              <span className={styles.heroStatLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...HERO_TRANSITION, delay: 0.08 }}
        className={styles.signalPanelShell}
      >
        <Link href={`/work/${activeStudy.slug}`} className={styles.signalPanel}>
          <div className={styles.signalPanelHeader}>
            <span className={styles.signalPanelKicker}>Current signal</span>
            <span className={styles.signalPanelCategory}>{activeStudy.category}</span>
          </div>

          <div className={styles.signalPanelMediaWrap}>
            <SignalMedia study={activeStudy} />
          </div>

          <div className={styles.signalPanelBody}>
            <p className={styles.signalPanelLabel}>{activeStudy.label}</p>
            <h2 className={styles.signalPanelTitle}>{activeStudy.client}</h2>
            <p className={styles.signalPanelSummary}>{activeStudy.headline}</p>
          </div>

          <div className={styles.signalPanelMetrics}>
            {activeStudy.metrics.slice(0, 2).map((metric, index) => (
              <span
                key={metric}
                className={`${styles.signalPanelMetric} ${index === 0 ? styles.signalPanelMetricAccent : ''}`}
              >
                {metric}
              </span>
            ))}
          </div>

          <span className={styles.signalPanelCta}>
            Inspect case study
            <ArrowRight className={styles.signalPanelCtaIcon} />
          </span>
        </Link>
      </motion.div>
    </section>
  )
}

function MetricStream({
  activeStudy,
  visibleCount,
  activeFilter,
}: {
  activeStudy: CaseStudy
  visibleCount: number
  activeFilter: 'All Work' | WorkCategory
}) {
  const countRef = useRef<HTMLSpanElement>(null)
  const clientRef = useRef<HTMLParagraphElement>(null)
  const metricRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const previousCount = useRef(visibleCount)

  useEffect(() => {
    const state = { value: previousCount.current }

    gsap.to(state, {
      value: visibleCount,
      duration: 0.8,
      ease: 'power3.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.round(state.value).toString().padStart(2, '0')
        }
      },
    })

    previousCount.current = visibleCount
  }, [visibleCount])

  useEffect(() => {
    if (!clientRef.current || !metricRef.current || !lineRef.current) return

    gsap.killTweensOf([clientRef.current, metricRef.current, lineRef.current])

    gsap.set(lineRef.current, { transformOrigin: 'left center', scaleX: 0 })
    gsap.fromTo(
      [clientRef.current, metricRef.current],
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.44, stagger: 0.06, ease: 'power2.out' }
    )
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.7, ease: 'power2.out' })
  }, [activeFilter, activeStudy.slug])

  return (
    <div className={styles.metricStream}>
      <div className={styles.metricStreamPrimary}>
        <div className={styles.metricStreamHeading}>
          <Activity className={styles.metricStreamIcon} />
          <span className={styles.metricStreamEyebrow}>Live signal</span>
        </div>
        <p ref={metricRef} className={styles.metricStreamValue}>
          {activeStudy.metrics[0]}
        </p>
        <p ref={clientRef} className={styles.metricStreamContext}>
          {activeStudy.client}
          {' // '}
          {activeFilter === 'All Work' ? 'All sectors' : activeFilter}
        </p>
        <span ref={lineRef} className={styles.metricStreamLine} aria-hidden="true" />
      </div>

      <div className={styles.metricStreamCount}>
        <span className={styles.metricStreamCountLabel}>Visible projects</span>
        <span ref={countRef} className={styles.metricStreamCountValue}>
          {visibleCount.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function FilterBar({
  activeFilter,
  setActiveFilter,
  categories,
}: {
  activeFilter: 'All Work' | WorkCategory
  setActiveFilter: (filter: 'All Work' | WorkCategory) => void
  categories: Array<'All Work' | WorkCategory>
}) {
  return (
    <div className={styles.filterBar} role="tablist" aria-label="Work filters">
      {categories.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => setActiveFilter(filter)}
          className={`${styles.filterPill} ${activeFilter === filter ? styles.filterPillActive : ''}`}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

function ResultsHeader({
  activeStudy,
  visibleCount,
  activeFilter,
  setActiveFilter,
  categories,
}: {
  activeStudy: CaseStudy
  visibleCount: number
  activeFilter: 'All Work' | WorkCategory
  setActiveFilter: (filter: 'All Work' | WorkCategory) => void
  categories: Array<'All Work' | WorkCategory>
}) {
  return (
    <section className={styles.resultsHeader}>
      <MetricStream activeStudy={activeStudy} visibleCount={visibleCount} activeFilter={activeFilter} />
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} categories={categories} />
    </section>
  )
}

export function WorkIndexExperience({ studies }: { studies: CaseStudy[] }) {
  const [activeFilter, setActiveFilter] = useState<'All Work' | WorkCategory>('All Work')
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const orderedStudies = useMemo(() => sortStudies(studies), [studies])
  const categories = useMemo(
    () => filterOrder.filter((filter) => filter === 'All Work' || studies.some((study) => study.category === filter)),
    [studies]
  )

  const visibleStudies = useMemo(() => {
    if (activeFilter === 'All Work') return orderedStudies
    return orderedStudies.filter((study) => study.category === activeFilter)
  }, [activeFilter, orderedStudies])

  const defaultStudy = useMemo(
    () => getDefaultStudy(visibleStudies) ?? getDefaultStudy(orderedStudies),
    [orderedStudies, visibleStudies]
  )

  const activeStudy = useMemo(
    () => visibleStudies.find((study) => study.slug === activeSlug) ?? defaultStudy,
    [activeSlug, defaultStudy, visibleStudies]
  )

  if (!activeStudy) return null

  return (
    <>
      <WorkHeroSummary studies={studies} activeStudy={activeStudy} />

      <ResultsHeader
        activeStudy={activeStudy}
        visibleCount={visibleStudies.length}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        categories={categories}
      />

      <motion.section layout className={styles.dashboardGrid}>
        <AnimatePresence mode="popLayout">
          {visibleStudies.map((study) => (
            <WorkDashboardCard
              key={study.slug}
              study={study}
              active={study.slug === activeStudy.slug}
              onActivate={setActiveSlug}
              onDeactivate={() => setActiveSlug(null)}
            />
          ))}
        </AnimatePresence>
      </motion.section>
    </>
  )
}

export function WorkBottomCTA() {
  return (
    <motion.div
      className={styles.cta}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={HERO_TRANSITION}
    >
      <p className={styles.ctaText}>Every system started with a conversation.</p>
      <MagneticButton radius={120} maxPull={14}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={HERO_TRANSITION}
          style={{ display: 'inline-block' }}
        >
          <Link href="/contact" className={styles.ctaBtn}>
            Start one
            <ArrowRight className={styles.ctaIcon} />
          </Link>
        </motion.div>
      </MagneticButton>
    </motion.div>
  )
}
