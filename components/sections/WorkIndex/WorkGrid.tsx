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

const HERO_TRANSITION = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
}

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
  return [...studies].sort((left, right) => getTierRank(left.dashboardTier) - getTierRank(right.dashboardTier))
}

// ── Hero entry ────────────────────────────────────────────────────────────────

function WorkHeroEntry() {
  return (
    <section className={styles.heroEntry}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={HERO_TRANSITION}
      >
        <p className={styles.heroEyebrow}>Selected work</p>
        <h1 className={styles.heroHeadline}>Proof beats promises.</h1>
        <p className={styles.heroSubhead}>
          Outcomes you can trace — strategy, systems, and execution — without the vendor runaround.
        </p>
      </motion.div>
    </section>
  )
}

// ── Sub-nav ───────────────────────────────────────────────────────────────────

function WorkSubNav({
  active,
  onChange,
}: {
  readonly active: WorkSegment
  readonly onChange: (segment: WorkSegment) => void
}) {
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
    <nav className={styles.subNav} aria-label="Filter work by type">
      <div className={styles.subNavTrack} role="tablist" aria-label="Work categories">
        {SEGMENT_LABELS.map((seg) => (
          <button
            key={seg}
            id={WORK_TAB_IDS[seg]}
            type="button"
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
    </nav>
  )
}

// ── Sub-project strip ─────────────────────────────────────────────────────────
// Compact linked row beneath a flagship parent — never in the main grid.

function SubProjectStrip({ children }: { readonly children: CaseStudy[] }) {
  if (children.length === 0) return null
  return (
    <div className={styles.subProjectStrip}>
      <span className={styles.subProjectLabel}>Systems behind this work</span>
      <div className={styles.subProjectList}>
        {children.map((child) => (
          <Link
            key={child.slug}
            href={`/work/${child.slug}`}
            className={styles.subProjectItem}
          >
            <span className={styles.subProjectName}>{child.client}</span>
            <ArrowRight weight="light" className={styles.subProjectArrow} />
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Flagship card wrapper ─────────────────────────────────────────────────────
// Renders the flagship card + its sub-project strip as a unit.

function FlagshipUnit({
  study,
  allStudies,
}: {
  readonly study: CaseStudy
  readonly allStudies: CaseStudy[]
}) {
  const children = useMemo(
    () => (study.relatedProjectSlugs ?? []).flatMap(
      (slug) => allStudies.filter((s) => s.slug === slug && s.dashboardTier === 'system')
    ),
    [study.relatedProjectSlugs, allStudies]
  )

  return (
    <motion.div className={styles.flagshipUnit} variants={CARD_ITEM}>
      <WorkDashboardCard study={study} />
      <SubProjectStrip>{children}</SubProjectStrip>
    </motion.div>
  )
}

// ── Main experience ───────────────────────────────────────────────────────────

export function WorkIndexExperience({
  studies,
  initialServiceFilter = null,
}: {
  studies: CaseStudy[]
  initialServiceFilter?: ServiceTag | null
}) {
  const [activeSegment, setActiveSegment] = useState<WorkSegment>('All')
  const activeServiceFilter = initialServiceFilter

  const orderedStudies = useMemo(() => sortStudies(studies), [studies])

  // System-tier slugs (sub-projects) — never rendered in supporting grid
  const systemSlugs = useMemo(
    () => new Set(orderedStudies.filter((s) => s.dashboardTier === 'system').map((s) => s.slug)),
    [orderedStudies]
  )

  // Visible studies filtered by segment — system slugs excluded (shown via SubProjectStrip)
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

  return (
    <>
      <WorkHeroEntry />

      <WorkSubNav
        active={activeSegment}
        onChange={setActiveSegment}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSegment + (activeServiceFilter ?? '')}
          id={WORK_INDEX_PANEL_ID}
          role="tabpanel"
          aria-labelledby={WORK_TAB_IDS[activeSegment]}
          tabIndex={-1}
          initial="hidden"
          animate="visible"
          variants={CARD_STAGGER}
        >
          {/* ── Flagship proof ── */}
          {flagshipStudies.length > 0 && (
            <>
              <header className={styles.flagshipIntro}>
                <p className={styles.flagshipIntroLabel}>Flagship proof</p>
                <p className={styles.flagshipIntroHint}>
                  Anchor cases — full context, metrics, and what changed.
                </p>
              </header>
              <div className={styles.flagshipSection}>
                {flagshipStudies.map((study) => (
                  <FlagshipUnit key={study.slug} study={study} allStudies={orderedStudies} />
                ))}
              </div>
            </>
          )}

          {/* ── Supporting proof ── */}
          {supportingStudies.length > 0 && (
            <>
              {flagshipStudies.length > 0 && (
                <div className={styles.sectionDivider}>
                  <span className={styles.sectionDividerLabel}>Supporting cases</span>
                </div>
              )}
              <div className={styles.supportingGrid}>
                {supportingStudies.map((study) => (
                  <motion.div key={study.slug} variants={CARD_ITEM}>
                    <WorkDashboardCard study={study} layoutRole="supporting" />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// ── Bottom CTA ────────────────────────────────────────────────────────────────

export function WorkBottomCTA() {
  return (
    <motion.div
      className={styles.cta}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={HERO_TRANSITION}
    >
      <p className={styles.ctaText}>Every serious build started as a conversation.</p>
      <MagneticButton radius={120} maxPull={14}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={HERO_TRANSITION}
          style={{ display: 'inline-block' }}
        >
          <Link href="/contact?intent=work" className={styles.ctaBtn}>
            Start one
            <ArrowRight weight="light" className={styles.ctaIcon} />
          </Link>
        </motion.div>
      </MagneticButton>
    </motion.div>
  )
}
