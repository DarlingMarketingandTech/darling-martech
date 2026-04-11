'use client'

import Link from 'next/link'
import { useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import type { CaseStudy, WorkDashboardTier } from '@/lib/work'
import type { ServiceTag } from '@/data/taxonomy'
import styles from './WorkIndex.module.css'
import { WorkDashboardCard } from './WorkDashboardCard'

type WorkSegment = 'All' | 'Client Work' | 'Systems' | 'Brand'

const SEGMENT_LABELS: WorkSegment[] = ['All', 'Client Work', 'Systems', 'Brand']

const SEGMENT_CATEGORY_MAP: Record<WorkSegment, string[]> = {
  All: [],
  'Client Work': ['Healthcare', 'Legal & Professional', 'Hospitality & Local', 'E-Commerce', 'Non-Profit'],
  Systems: ['Automation & Systems'],
  Brand: ['Brand Identity'],
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

const FLAGSHIP_CONTEXT_BY_SLUG: Record<string, { label: string; items: string[] }> = {
  '317-bbq': {
    label: 'Project notes',
    items: ['Menu-first UX', 'Catering pathway', 'Proudly Indiana', 'Photography + video'],
  },
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

function SubProjectStrip({
  childStudies,
  parentCategory,
  expanded = false,
}: {
  readonly childStudies: CaseStudy[]
  readonly parentCategory?: string
  readonly expanded?: boolean
}) {
  if (childStudies.length === 0) return null

  const stripLabel = parentCategory === 'Healthcare'
    ? 'Divisions inside this engagement'
    : 'Systems built inside this engagement'

  return (
    <div className={`${styles.subProjectStrip}${expanded ? ` ${styles.subProjectStripExpanded}` : ''}`}>
      <span className={styles.subProjectLabel}>{stripLabel}</span>

      <div className={styles.subProjectList}>
        {childStudies.map((child) => {
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

function FlagshipContextStrip({ slug }: { readonly slug: string }) {
  const context = FLAGSHIP_CONTEXT_BY_SLUG[slug]
  if (!context) return null

  return (
    <div className={styles.subProjectStrip}>
      <span className={styles.subProjectLabel}>{context.label}</span>
      <div className={styles.subProjectList}>
        {context.items.map((item) => (
          <span key={item} className={styles.subProjectItem}>
            <span className={styles.subProjectName}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function FlagshipUnit({
  study,
  allStudies,
  stripExpanded = false,
}: {
  readonly study: CaseStudy
  readonly allStudies: CaseStudy[]
  readonly stripExpanded?: boolean
}) {
  const children = useMemo(
    () => (study.relatedProjectSlugs ?? []).flatMap(
      (slug) => allStudies.filter((s) => s.slug === slug && s.dashboardTier === 'system')
    ),
    [study.relatedProjectSlugs, allStudies]
  )

  return (
    <div className={styles.flagshipUnit}>
      <WorkDashboardCard study={study} layoutRole="flagship" />
      <SubProjectStrip childStudies={children} parentCategory={study.category} expanded={stripExpanded} />
      {children.length === 0 && <FlagshipContextStrip slug={study.slug} />}
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

  // Slugs of flagships that have at least one system-child — used to
  // ensure parent flagships stay visible in the Systems segment even when
  // their category is not 'Automation & Systems'.
  const flagshipsWithChildren = useMemo(
    () => new Set(
      orderedStudies
        .filter((s) => s.dashboardTier === 'flagship' && (s.relatedProjectSlugs ?? []).some((slug) => systemSlugs.has(slug)))
        .map((s) => s.slug)
    ),
    [orderedStudies, systemSlugs]
  )

  const visibleStudies = useMemo(() => {
    let result = orderedStudies.filter((s) => !systemSlugs.has(s.slug))

    if (activeSegment === 'Systems') {
      // In Systems view: show all flagships that have system-children regardless of
      // their category, so the strip under each parent is reachable. Supporting
      // non-flagship entries are excluded — Systems is depth-of-engagement proof,
      // not a broad secondary grid.
      result = result.filter((s) => s.dashboardTier === 'flagship' && flagshipsWithChildren.has(s.slug))
    } else if (activeSegment !== 'All') {
      const cats = SEGMENT_CATEGORY_MAP[activeSegment]
      result = result.filter((s) => cats.includes(s.category))
    }

    if (activeServiceFilter) {
      result = result.filter((s) => s.serviceIds?.includes(activeServiceFilter))
    }

    return result
  }, [activeSegment, activeServiceFilter, flagshipsWithChildren, orderedStudies, systemSlugs])

  const flagshipStudies = useMemo(
    () => visibleStudies.filter((s) => s.dashboardTier === 'flagship'),
    [visibleStudies]
  )

  const supportingStudies = useMemo(
    () => visibleStudies.filter((s) => s.dashboardTier !== 'flagship'),
    [visibleStudies]
  )

  const supportingLabel = activeSegment === 'All' ? 'Supporting proof' : `${activeSegment} proof`

  // Group supporting studies by category only when showing all segments.
  // When a single segment is active the category is already implied by the filter.
  const supportingGroups = useMemo(() => {
    if (activeSegment !== 'All') return null

    const groups: { category: string; studies: CaseStudy[] }[] = []
    const seen = new Map<string, CaseStudy[]>()

    for (const study of supportingStudies) {
      const cat = study.category ?? 'Other'
      if (!seen.has(cat)) {
        seen.set(cat, [])
        groups.push({ category: cat, studies: seen.get(cat)! })
      }
      seen.get(cat)!.push(study)
    }

    return groups
  }, [activeSegment, supportingStudies])

  return (
    <>
      <WorkSubNav active={activeSegment} onChange={setActiveSegment} />

      <div id={WORK_INDEX_PANEL_ID} role="tabpanel" className={styles.flagshipSections}>
        <span id="flagship-proof" className={styles.anchorTarget} aria-hidden="true" />
        {flagshipStudies.length > 0 && (
          <>
            <div className={styles.flagshipIntro}>
              <span className={styles.flagshipIntroLabel}>
                {activeSegment === 'Systems' ? 'Systems depth' : 'Flagship proof'}
              </span>
              <p className={styles.flagshipIntroHint}>
                {activeSegment === 'Systems'
                  ? 'The builds behind the builds — systems, tools, and infrastructure created inside each client engagement.'
                  : 'New here? Start with these anchor cases first — full context, strongest outcomes, and what changed.'}
              </p>
            </div>

            {flagshipStudies.map((study, index) => (
              <div key={study.slug} style={index > 0 ? { marginTop: '1.5rem' } : undefined}>
                <FlagshipUnit
                  study={study}
                  allStudies={orderedStudies}
                  stripExpanded={activeSegment === 'Systems'}
                />
              </div>
            ))}
          </>
        )}

        {supportingStudies.length > 0 && (
          <>
            {flagshipStudies.length > 0 && (
              <div className={styles.sectionDivider}>
                <span className={styles.sectionDividerLabel}>{supportingLabel}</span>
              </div>
            )}

            {supportingGroups ? (
              // Grouped view: one labeled section per category
              supportingGroups.map((group, groupIndex) => (
                <div key={group.category} className={groupIndex > 0 ? styles.categoryGroup : undefined}>
                  <div className={styles.categoryGroupHeader}>
                    <span className={styles.categoryGroupLabel}>{group.category}</span>
                  </div>
                  <motion.div
                    className={styles.supportingGrid}
                    variants={CARD_STAGGER}
                    initial="hidden"
                    animate="visible"
                  >
                    {group.studies.map((study) => (
                      <motion.div key={study.slug} variants={CARD_ITEM}>
                        <WorkDashboardCard study={study} layoutRole="supporting" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))
            ) : (
              // Filtered view: flat grid (segment already implies the category)
              <>
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
      <MagneticButton radius={120} maxPull={14}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          style={{ display: 'inline-block' }}
        >
          <Link href="/contact?intent=work" className={styles.ctaBtn}>
            Start one
            <ArrowRight className={styles.ctaIcon} />
          </Link>
        </motion.div>
      </MagneticButton>
    </div>
  )
}
