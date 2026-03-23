'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { GalleryHoverCard } from '@/components/ui/gallery-hover-card'
import { buildCloudinaryUrl, buildCloudinaryVideoUrl } from '@/lib/cloudinary'
import { useFinePointer } from '@/hooks/useFinePointer'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CaseStudy, WorkCategory } from '@/lib/work'
import {
  containerVariants,
  fadeVariants,
  itemVariants,
  springEntrance,
  springStandard,
  viewport,
} from '@/lib/motion'
import styles from './WorkIndex.module.css'

const WorkAmbient = dynamic(
  () => import('@/components/3d/WorkAmbient').then((module) => module.WorkAmbient),
  {
    ssr: false,
    loading: () => null,
  }
)

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

const PRIMARY_FEATURED_SLUG = 'hoosier-boy-barbershop'

function MetricPill({ text }: { text: string }) {
  const startsWithData = /^[\d+\-$£€¥×#]/.test(text.trim())

  return (
    <span className={`${styles.metricPill} ${startsWithData ? styles.metricPillAccent : ''}`}>
      {text}
    </span>
  )
}

function isLogoArtwork(publicId: string) {
  return /(?:^|[_-])(logo|Logo)(?:[_-]|$)|Full_Logo/i.test(publicId)
}

function WorkCardCover({ study }: { study: CaseStudy }) {
  const isFinePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const shouldPlayPreviewVideo = Boolean(
    study.cardPreviewPublicId &&
    study.cardPreviewType === 'video' &&
    isFinePointer &&
    !reducedMotion
  )

  if (shouldPlayPreviewVideo) {
    return (
      <div className={styles.workCover}>
        <video
          className={styles.workCoverVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={
            study.heroPublicId
              ? buildCloudinaryUrl(study.heroPublicId, 'f_auto,q_auto,w_960')
              : undefined
          }
        >
          <source
            src={buildCloudinaryVideoUrl(study.cardPreviewPublicId!, 'f_auto,q_auto,w_960')}
            type="video/mp4"
          />
        </video>
        <div className={styles.workCoverShade} />
        <span className={styles.workCoverBadge}>{study.category}</span>
      </div>
    )
  }

  if (study.cardPreviewPublicId && study.cardPreviewType === 'image') {
    return (
      <div className={styles.workCover}>
        <CldImage
          src={study.cardPreviewPublicId}
          alt={`${study.client} case study preview`}
          width={960}
          height={720}
          crop="fill"
          gravity="auto"
          className={styles.workCoverImage}
        />
        <div className={styles.workCoverShade} />
        <span className={styles.workCoverBadge}>{study.category}</span>
      </div>
    )
  }

  if (study.heroPublicId) {
    if (isLogoArtwork(study.heroPublicId)) {
      return (
        <div className={`${styles.workCover} ${styles.workCoverArtwork}`}>
          <div className={styles.workCoverGrid} aria-hidden="true" />
          <div className={styles.workCoverArtworkGlow} aria-hidden="true" />
          <CldImage
            src={study.heroPublicId}
            alt={`${study.client} case study cover`}
            width={520}
            height={420}
            crop="fit"
            className={styles.workCoverArtworkImage}
          />
          <span className={styles.workCoverBadge}>{study.category}</span>
        </div>
      )
    }

    return (
      <div className={styles.workCover}>
        <CldImage
          src={study.heroPublicId}
          alt={`${study.client} case study cover`}
          width={960}
          height={720}
          crop="fill"
          gravity="auto"
          className={styles.workCoverImage}
        />
        <div className={styles.workCoverShade} />
        <span className={styles.workCoverBadge}>{study.category}</span>
      </div>
    )
  }

  if (study.logoPublicId) {
    return (
      <div className={`${styles.workCover} ${styles.workCoverLogo}`}>
        <div className={styles.workCoverGrid} aria-hidden="true" />
        <CldImage
          src={study.logoPublicId}
          alt={`${study.client} logo`}
          width={280}
          height={120}
          crop="fit"
          className={styles.workCoverLogoImage}
        />
        <span className={styles.workCoverBadge}>{study.category}</span>
      </div>
    )
  }

  return (
    <div className={`${styles.workCover} ${styles.workCoverFallback}`} aria-hidden="true">
      <div className={styles.workFallbackGrid} />
      <div className={styles.workFallbackBeam} />
      <div className={styles.workFallbackWordmark}>{study.client}</div>
      <span className={styles.workCoverBadge}>{study.category}</span>
    </div>
  )
}

function WorkCard({
  study,
  onSignalChange,
}: {
  study: CaseStudy
  onSignalChange: (target: string | null) => void
}) {
  return (
    <GalleryHoverCard
      title={study.client}
      summary={study.headline}
      href={`/work/${study.slug}`}
      cover={<WorkCardCover study={study} />}
      eyebrow={study.label}
      badges={study.metrics.slice(0, 3)}
      footer={
        study.parentProjectSlug ? (
          <span className={styles.workFooterMeta}>System build</span>
        ) : (
          <span className={styles.workFooterMeta}>{study.category}</span>
        )
      }
      ctaLabel="View case study"
      interactiveId={study.slug}
      onHighlightChange={onSignalChange}
      variant="work"
    />
  )
}

function FeaturedLead({
  study,
  interactiveTarget,
  onSignalChange,
  isFinePointer,
}: {
  study: CaseStudy
  interactiveTarget: string | null
  onSignalChange: (target: string | null) => void
  isFinePointer: boolean
}) {
  const heroImage = study.heroPublicId ?? study.logoPublicId

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.heroFeatureWrap}
    >
      <motion.div variants={itemVariants} className={styles.heroFeatureCopy}>
        <p className={styles.heroEyebrow}>Selected Work</p>
        <h1 className={styles.heroHeadline}>Proof, not promises.</h1>
        <p className={styles.heroSubhead}>
          15+ years. 30,000+ users served. 40% average conversion lift. Real projects.
          Real outcomes.
        </p>

        <div className={styles.heroStats}>
          {[
            ['19', 'Case studies'],
            ['6', 'Core verticals'],
            ['30k+', 'Users served'],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={styles.heroStat}
              onMouseEnter={isFinePointer ? () => onSignalChange(`${study.slug}-stat-${index}`) : undefined}
              onMouseLeave={isFinePointer ? () => onSignalChange(null) : undefined}
            >
              <span className={styles.heroStatValue}>{value}</span>
              <span className={styles.heroStatLabel}>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.heroFeatureVisual}>
        <div className={styles.heroAmbient}>
          <WorkAmbient
            mode={study.visualMode}
            density={study.theme?.density ?? 'balanced'}
            interactiveTarget={interactiveTarget}
          />
        </div>
        <FloatingCard maxTilt={9} className={styles.heroFeatureCardFrame}>
          <Link
            href={`/work/${study.slug}`}
            className={styles.heroFeatureCard}
            onMouseEnter={isFinePointer ? () => onSignalChange(study.slug) : undefined}
            onMouseLeave={isFinePointer ? () => onSignalChange(null) : undefined}
            onFocus={() => onSignalChange(study.slug)}
            onBlur={() => onSignalChange(null)}
          >
            <div className={styles.heroFeatureHeader}>
              <p className={styles.featuredKicker}>Featured engagement</p>
              {study.parentProjectSlug && <span className={styles.subprojectTag}>Parent platform</span>}
            </div>

            {heroImage && (
              <div className={styles.heroFeatureMedia}>
                <CldImage
                  src={heroImage}
                  alt={study.client}
                  width={960}
                  height={640}
                  crop="fill"
                  gravity="auto"
                  className={styles.heroFeatureImage}
                />
              </div>
            )}

            <div className={styles.heroFeatureBody}>
              <p className={styles.heroFeatureLabel}>{study.label}</p>
              <h2 className={styles.heroFeatureClient}>{study.client}</h2>
              <p className={styles.heroFeatureHeadline}>{study.headline}</p>
            </div>

            <div className={styles.heroFeatureMetrics}>
              {study.metrics.map((metric, index) => (
                <span
                  key={metric}
                  onMouseEnter={isFinePointer ? () => onSignalChange(`${study.slug}-metric-${index}`) : undefined}
                  onMouseLeave={isFinePointer ? () => onSignalChange(study.slug) : undefined}
                >
                  <MetricPill text={metric} />
                </span>
              ))}
            </div>

            <span className={styles.heroFeatureCta}>
              Explore the full case study
              <ArrowRight weight="regular" size={16} />
            </span>
          </Link>
        </FloatingCard>
      </motion.div>
    </motion.div>
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
    <motion.div
      className={styles.filterBar}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={containerVariants}
    >
      {categories.map((filter) => (
        <motion.button
          key={filter}
          type="button"
          variants={itemVariants}
          onClick={() => setActiveFilter(filter)}
          className={`${styles.filterPill} ${activeFilter === filter ? styles.filterPillActive : ''}`}
          whileTap={{ scale: 0.97 }}
          transition={springStandard}
        >
          {filter}
        </motion.button>
      ))}
    </motion.div>
  )
}

function FeaturedRail({
  studies,
  onSignalChange,
  isFinePointer,
}: {
  studies: CaseStudy[]
  onSignalChange: (target: string | null) => void
  isFinePointer: boolean
}) {
  if (studies.length === 0) return null

  return (
    <motion.div
      className={styles.featuredRail}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {studies.map((study, index) => (
        <motion.div key={study.slug} variants={itemVariants} custom={index}>
          <Link
            href={`/work/${study.slug}`}
            className={styles.featuredRailCard}
            onMouseEnter={isFinePointer ? () => onSignalChange(study.slug) : undefined}
            onMouseLeave={isFinePointer ? () => onSignalChange(null) : undefined}
            onFocus={() => onSignalChange(study.slug)}
            onBlur={() => onSignalChange(null)}
          >
            <div className={styles.featuredRailMeta}>
              <span className={styles.featuredRailBadge}>
                {study.parentProjectSlug ? 'Related system' : 'Flagship build'}
              </span>
              <span className={styles.featuredRailCategory}>{study.category}</span>
            </div>
            <h3 className={styles.featuredRailClient}>{study.client}</h3>
            <p className={styles.featuredRailHeadline}>{study.headline}</p>
            <div className={styles.featuredRailMetrics}>
              {study.metrics.slice(0, 2).map((metric) => (
                <MetricPill key={metric} text={metric} />
              ))}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function WorkHero({
  studies,
  interactiveTarget,
  onSignalChange,
  isFinePointer,
}: {
  studies: CaseStudy[]
  interactiveTarget: string | null
  onSignalChange: (target: string | null) => void
  isFinePointer: boolean
}) {
  const featuredStudy =
    studies.find((study) => study.slug === PRIMARY_FEATURED_SLUG) ??
    studies.find((study) => study.featured) ??
    studies[0]

  return (
    <FeaturedLead
      study={featuredStudy}
      interactiveTarget={interactiveTarget}
      onSignalChange={onSignalChange}
      isFinePointer={isFinePointer}
    />
  )
}

export function WorkGrid({
  studies,
  onSignalChange,
  isFinePointer,
}: {
  studies: CaseStudy[]
  onSignalChange: (target: string | null) => void
  isFinePointer: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<'All Work' | WorkCategory>('All Work')
  const featuredLead =
    studies.find((study) => study.slug === PRIMARY_FEATURED_SLUG) ??
    studies.find((study) => study.featured) ??
    studies[0]

  const categories = useMemo(
    () => filterOrder.filter((filter) => filter === 'All Work' || studies.some((study) => study.category === filter)),
    [studies]
  )

  const featuredRailStudies = useMemo(
    () => studies.filter((study) => study.featured && study.slug !== featuredLead.slug),
    [featuredLead.slug, studies]
  )

  const filteredStudies = useMemo(() => {
    const collection = studies.filter((study) => study.slug !== featuredLead.slug && !study.featured)

    if (activeFilter === 'All Work') return collection
    return collection.filter((study) => study.category === activeFilter)
  }, [activeFilter, featuredLead.slug, studies])

  return (
    <>
      <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} categories={categories} />

      {activeFilter === 'All Work' && (
        <FeaturedRail
          studies={featuredRailStudies}
          onSignalChange={onSignalChange}
          isFinePointer={isFinePointer}
        />
      )}

      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {filteredStudies.map((study, index) => (
          <motion.div key={study.slug} variants={itemVariants} custom={index}>
            <WorkCard study={study} onSignalChange={onSignalChange} />
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}

export function WorkIndexExperience({ studies }: { studies: CaseStudy[] }) {
  const [interactiveTarget, setInteractiveTarget] = useState<string | null>(null)
  const isFinePointer = useFinePointer()

  return (
    <>
      <WorkHero
        studies={studies}
        interactiveTarget={interactiveTarget}
        onSignalChange={setInteractiveTarget}
        isFinePointer={isFinePointer}
      />
      <WorkGrid
        studies={studies}
        onSignalChange={setInteractiveTarget}
        isFinePointer={isFinePointer}
      />
    </>
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
      <motion.p variants={fadeVariants} className={styles.ctaText}>
        Every project started with a conversation.
      </motion.p>
      <motion.div variants={itemVariants}>
        <MagneticButton radius={120} maxPull={14}>
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
        </MagneticButton>
      </motion.div>
    </motion.div>
  )
}
