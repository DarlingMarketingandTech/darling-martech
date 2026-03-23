'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useFinePointer } from '@/hooks/useFinePointer'
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

function MetricPill({ text }: { text: string }) {
  const startsWithData = /^[\d+\-$£€¥×#]/.test(text.trim())

  return (
    <span className={`${styles.metricPill} ${startsWithData ? styles.metricPillAccent : ''}`}>
      {text}
    </span>
  )
}

function LogoOrBadge({ study }: { study: CaseStudy }) {
  if (study.logoPublicId) {
    return (
      <CldImage
        src={study.logoPublicId}
        alt={`${study.client} logo`}
        width={140}
        height={40}
        crop="fit"
        className={styles.cardLogoImg}
      />
    )
  }

  return <span className={styles.cardBadge}>{study.category}</span>
}

function WorkCard({
  study,
  index,
  onSignalChange,
  isFinePointer,
}: {
  study: CaseStudy
  index: number
  onSignalChange: (target: string | null) => void
  isFinePointer: boolean
}) {
  const isSubproject = Boolean(study.parentProjectSlug)

  return (
    <motion.div variants={itemVariants} custom={index}>
      <FloatingCard maxTilt={7} className={styles.cardFrame}>
        <Link
          href={`/work/${study.slug}`}
          className={styles.card}
          onMouseEnter={isFinePointer ? () => onSignalChange(study.slug) : undefined}
          onMouseLeave={isFinePointer ? () => onSignalChange(null) : undefined}
          onFocus={() => onSignalChange(study.slug)}
          onBlur={() => onSignalChange(null)}
        >
          <span className={styles.cardAccent} aria-hidden="true" />
          <div className={styles.cardTop}>
            <div className={styles.cardLogoWrap}>
              <LogoOrBadge study={study} />
            </div>
            {isSubproject && <span className={styles.subprojectTag}>System build</span>}
          </div>

          <div className={styles.cardBody}>
            <p className={styles.cardLabel}>{study.label}</p>
            <h3 className={styles.cardClient}>{study.client}</h3>
            <p className={styles.cardHeadline}>{study.headline}</p>
          </div>

          <div className={styles.cardMetrics}>
            {study.metrics.map((metric) => (
              <MetricPill key={metric} text={metric} />
            ))}
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardFooterText}>
              View case study
              <ArrowRight weight="regular" size={14} />
            </span>
          </div>
        </Link>
      </FloatingCard>
    </motion.div>
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
  const featuredStudy = studies.find((study) => study.featured) ?? studies[0]

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
  const featuredLead = studies.find((study) => study.featured) ?? studies[0]

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
          <WorkCard
            key={study.slug}
            study={study}
            index={index}
            onSignalChange={onSignalChange}
            isFinePointer={isFinePointer}
          />
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
