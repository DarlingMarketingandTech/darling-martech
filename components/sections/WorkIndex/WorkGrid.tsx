'use client'

import Link from 'next/link'
import { useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import type { CaseStudy, WorkDashboardTier } from '@/lib/work'
import type { ServiceTag } from '@/data/taxonomy'
import styles from './WorkIndex.module.css'
import { WorkDashboardCard } from './WorkDashboardCard'

// ── Sub-nav segments ──────────────────────────────────────────────────────────
type WorkSegment = 'All' | 'Client Work' | 'Systems' | 'Brand'

const SEGMENT_LABELS: WorkSegment[] = ['All', 'Client Work', 'Systems', 'Brand']

const SEGMENT_CATEGORY_MAP: Record<WorkSegment, string[]> = {
  'All': [],
  'Client Work': ['Healthcare', 'Legal & Professional', 'Hospitality & Local', 'E-Commerce', 'Non-Profit'],
  'Systems': ['Automation & Systems'],
  'Brand': ['Brand Identity'],
}

const WORK_TAB_IDS: Record<WorkSegment, string> = {
  All: 'work-tab-all',
  'Client Work': 'work-tab-client-work',
  Systems: 'work-tab-systems',
  Brand: 'work-tab-brand',
}

const WORK_INDEX_PANEL_ID = 'work-index-filter-panel'

const CARD_STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

const CARD_ITEM = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 24 } },
}

function getTierRank(tier: WorkDashboardTier | undefined) {
  if (tier === 'flagship') return 0
  if (tier === 'system') return 1
  return 2
}

function sortStudies(studies: CaseStudy[]) {
  return [...studies].sort((left, right) => {
    const tierDiff = getTierRank(left.dashboardTier) - getTierRank(right.dashboardTier)
    if (tierDiff !== 0) return tierDiff

    const lr = left.editorialRank ?? Infinity
    const rr = right.editorialRank ?? Infinity
    return lr - rr
  })
}

function WorkHeroEntry() {
  return (
    <div className={styles.heroEntry}>
      <span className={styles.heroEyebrow}>Selected work</span>
      <h1 className={styles.heroHeadline}>Proof beats promises.</h1>
      <p className={styles.heroSubhead}>
        Outcomes you can trace — strategy, systems, and execution — without the vendor runaround.
      </p>
    </div>
  )
}

function WorkSubNav({ active, onChange }: { readonly active: WorkSegment; readonly onChange: (segment: WorkSegment) => void }) {
  const handleTabKeyDown = (event: ReactKeyboardEvent, seg: WorkSegment) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const i = SEGMENT_LABELS.indexOf(seg)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = (i + delta + SEGMENT_LABELS.length) % SEGMENT_LABELS.length
    const nextSeg = SEGMENT_LABELS[next]

    onChange(nextSeg)
    requestAnimationFrame(() => document.getElementById(WORK_TAB_IDS[nextSeg])?.focus())
  }

  return (
    <div className={styles.subNav} role="tablist" aria-label="Work filters">
      <div className={styles.subNavTrack}>
        {SEGMENT_LABELS.map((seg) => (
          <button
            key={seg}
            id={WORK_TAB_IDS[seg]}
            role="tab"
            aria-selected={active === seg}
            aria-controls={WORK_INDEX_PANEL_ID}
            tabIndex={active === seg ? 0 : -1}
            onClick={() => onChange(seg)}
            onKeyDown={(e) => handleTabKeyDown(e, seg)}
            className={`${styles.subNavBtn} ${active === seg ? styles.subNavBtnActive : ''}`}
          >
            {seg}
          </button>
        ))}
      </div>
    </div>
  )
}

function SubProjectStrip({ children, parentCategory }: { readonly children: CaseStudy[]; readonly parentCategory?: string }) {
  if (children.length === 0) return null

  const stripLabel = parentCategory === 'Healthcare'
    ? 'Divisions inside this engagement'
    : 'Systems built inside this engagement'

  return (
    <div className={styles.subProjectStrip}>
      <span className={styles.subProjectLabel}>{stripLabel}</span>

      <div className={styles.subProjectList}>
        {children.map((child) => {
          const primaryMetric = child.metrics[0]

          return (
            <Link key={child.slug} href={`/work/${child.slug}`} className={styles.subProjectItem}>
              <span className={styles.subProjectName}>{child.client}</span>
              {primaryMetric && <span className={styles.subProjectMetric}>{primaryMetric}</span>}
              <ArrowRight className={styles.subProjectArrow} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function FlagshipUnit({ study, allStudies }: { readonly study: CaseStudy; readonly allStudies: CaseStudy[] }) {
  const children = useMemo(
    () => (study.relatedProjectSlugs ?? []).flatMap(
      (slug) => allStudies.filter((s) => s.slug === slug && s.dashboardTier === 'system')
    ),
    [study.relatedProjectSlugs, allStudies]
  )

  return (
    <div className={styles.flagshipUnit}>
      <WorkDashboardCard study={study} layoutRole="flagship" />
      <SubProjectStrip children={children} parentCategory={study.category} />
    </div>
  )
}

export function WorkIndexExperience({ studies, initialServiceFilter = null }: { studies: CaseStudy[]; initialServiceFilter?: ServiceTag | null }) {
  const [activeSegment, setActiveSegment] = useState<WorkSegment>('All')
  const activeServiceFilter = initialServiceFilter

  const orderedStudies = useMemo(() => sortStudies(studies), [studies])

  const systemSlugs = useMemo(
    () => new Set(orderedStudies.filter((s) => s.dashboardTier === 'system').map((s) => s.slug)),
    [orderedStudies]
  )

  const visibleStudies = useMemo(() => {
    let result = orderedStudies.filter((s) => !systemSlugs.has(s.slug))

    if (activeSegment !== 'All') {
      const cats = SEGMENT_CATEGORY_MAP[activeSegment]
      result = result.filter((s) => cats.includes(s.category))
    }

    if (activeServiceFilter) {
      result = result.filter((s) => s.serviceIds?.includes(activeServiceFilter))
    }

    return result
  }, [activeSegment, activeServiceFilter, orderedStudies, systemSlugs])

  const flagshipStudies = useMemo(
    () => visibleStudies.filter((s) => s.dashboardTier === 'flagship'),
    [visibleStudies]
  )

  const supportingStudies = useMemo(
    () => visibleStudies.filter((s) => s.dashboardTier !== 'flagship'),
    [visibleStudies]
  )

  const supportingLabel = activeSegment === 'All' ? 'Supporting proof' : `${activeSegment} proof`

  return (
    <>
      <WorkHeroEntry />
      <WorkSubNav active={activeSegment} onChange={setActiveSegment} />

      <div id={WORK_INDEX_PANEL_ID} role="tabpanel" className={styles.flagshipSections}>

        {/* Flagship */}
        {flagshipStudies.length > 0 && (
          <>
            <div className={styles.flagshipIntro}>
              <span className={styles.flagshipIntroLabel}>Flagship proof</span>
              <p className={styles.flagshipIntroHint}>
                Anchor cases — full context, metrics, and what changed.
              </p>
            </div>

            {flagshipStudies.map((study) => (
              <FlagshipUnit key={study.slug} study={study} allStudies={orderedStudies} />
            ))}
          </>
        )}

        {/* Supporting */}
        {supportingStudies.length > 0 && (
          <>
            {flagshipStudies.length > 0 && (
              <div className={styles.sectionDivider}>
                <span className={styles.sectionDividerLabel}>{supportingLabel}</span>
              </div>
            )}

            <div className={styles.flagshipIntro}>
              <p className={styles.flagshipIntroHint}>
                Focused proof across websites, conversion, local visibility, and marketing systems — scanned, not studied.
              </p>
            </div>

            <motion.div
              className={styles.supportingGrid}
              variants={CARD_STAGGER}
              initial="hidden"
              animate="visible"
            >
              {supportingStudies.map((study) => (
                <motion.div key={study.slug} variants={CARD_ITEM}>
                  <WorkDashboardCard study={study} layoutRole="supporting" />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </>
  )
}

export function WorkBottomCTA() {
  return (
    <div className={styles.cta}>
      <p className={styles.ctaText}>Every serious build started as a conversation.</p>
      <MagneticButton href="/contact?intent=work" className={styles.ctaBtn}>
        Start one
        <ArrowRight className={styles.ctaIcon} />
      </MagneticButton>
    </div>
  )
}
