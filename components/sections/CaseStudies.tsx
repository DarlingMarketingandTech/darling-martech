'use client'

import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { motion } from 'framer-motion'
import { ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { getAllWork } from '@/data/work/work-data'
import type { CaseStudy } from '@/lib/work'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
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

function scrollSlideIntoRail(
  rail: HTMLDivElement,
  slide: HTMLElement,
  behavior: ScrollBehavior
) {
  const railRect = rail.getBoundingClientRect()
  const slideRect = slide.getBoundingClientRect()
  const slideLeftInRail = slideRect.left - railRect.left + rail.scrollLeft
  const padding = 8
  const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth)
  const left = Math.max(0, Math.min(slideLeftInRail - padding, maxScroll))
  rail.scrollTo({ left, behavior })
}

function HomeWorkCard({ study }: { study: CaseStudy }) {
  const mediaPublicId = study.cardPublicId ?? study.heroPublicId ?? study.logoPublicId
  const metrics = study.metrics.slice(0, 2)

  return (
    <motion.article
      className={styles.cardShell}
      whileHover={{ y: -4 }}
      transition={springEntrance}
    >
      <Link href={`/work/${study.slug}`} className={styles.card}>
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
            View case
            <ArrowRight weight="light" className={styles.cardCtaIcon} aria-hidden />
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
  const reduceMotion = useReducedMotion()

  const scrollBehavior: ScrollBehavior = reduceMotion ? 'instant' : 'smooth'

  /** Keeps nav state aligned if the showcase list is shorter than the stored index (data/HMR). */
  const navIndex =
    studies.length > 0 ? Math.min(activeIndex, Math.max(0, studies.length - 1)) : 0

  const scrollToIndex = (index: number) => {
    const rail = railRef.current
    if (!rail) return

    const nextIndex = Math.max(0, Math.min(index, studies.length - 1))
    const child = rail.children[nextIndex] as HTMLElement | undefined
    if (!child) return
    scrollSlideIntoRail(rail, child, scrollBehavior)
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

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (studies.length === 0) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(navIndex - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(navIndex + 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      scrollToIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      scrollToIndex(studies.length - 1)
    }
  }

  const currentStudy = studies[navIndex]

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
              Selected proof
            </motion.p>
            <motion.h2 variants={itemVariants} className={styles.heading}>
              A tight edit of the work.
            </motion.h2>
            <motion.p variants={itemVariants} className={styles.subheading}>
              Five case studies — same rigor as the work index, less surface area. Open any card for
              the full story; everything else lives on{' '}
              <Link href="/work" className={styles.subheadingLink}>
                /work
              </Link>
              .
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className={styles.headerActions}>
            <div className={styles.railNav} role="group" aria-label="Scroll case studies">
              <button
                type="button"
                className={styles.railNavBtn}
                onClick={() => scrollToIndex(navIndex - 1)}
                disabled={navIndex === 0}
                aria-label="Previous case study"
              >
                <CaretLeft weight="regular" className={styles.railNavIcon} aria-hidden />
              </button>
              <button
                type="button"
                className={styles.railNavBtn}
                onClick={() => scrollToIndex(navIndex + 1)}
                disabled={navIndex === studies.length - 1}
                aria-label="Next case study"
              >
                <CaretRight weight="regular" className={styles.railNavIcon} aria-hidden />
              </button>
            </div>
            <Link href="/work" className={styles.primaryCta}>
              Full proof on /work
              <ArrowRight weight="light" className={styles.primaryCtaIcon} aria-hidden />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.railOuter}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          {currentStudy && (
            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
              Showing {currentStudy.client}, case study {navIndex + 1} of {studies.length}.
            </p>
          )}
          <div
            className={styles.rail}
            ref={railRef}
            onScroll={handleScroll}
            role="region"
            aria-label="Selected proof — horizontal case study list"
            tabIndex={0}
            onKeyDown={handleRailKeyDown}
          >
            {studies.map((study) => (
              <div key={study.slug} className={styles.railSlide}>
                <HomeWorkCard study={study} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
