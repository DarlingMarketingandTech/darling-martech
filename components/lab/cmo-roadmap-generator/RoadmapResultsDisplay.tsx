'use client'

import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, WarningCircle } from '@phosphor-icons/react'
import { composeRoadmap } from '@/lib/cmo-roadmap-generator/compose-roadmap'
import { decodeIntakePayload } from '@/lib/cmo-roadmap-generator/intake-payload'
import { analytics } from '@/lib/analytics'
import { springEntrance, viewport } from '@/lib/motion'
import RoadmapResultsLeadForm from './RoadmapResultsLeadForm'
import RoadmapResultsToolbar from './RoadmapResultsToolbar'
import styles from './RoadmapResults.module.css'

export type RoadmapResultsDisplayProps = {
  readonly encodedPayload: string | undefined
}

export default function RoadmapResultsDisplay({ encodedPayload }: RoadmapResultsDisplayProps) {
  const decoded = useMemo(() => decodeIntakePayload(encodedPayload), [encodedPayload])

  useEffect(() => {
    if (decoded.ok) {
      analytics.toolView('CMO Roadmap Generator Results', 'route')
    }
  }, [decoded.ok])

  if (!decoded.ok) {
    const title =
      decoded.error === 'missing'
        ? 'No roadmap data in this link'
        : 'This roadmap link could not be read'

    return (
      <main className={styles.page}>
        <div className={`${styles.backWrap} ${styles.noPrint}`}>
          <Link href="/tools/cmo-roadmap-generator" className={styles.backLink}>
            <ArrowLeft size={15} weight="regular" aria-hidden />
            Tool overview
          </Link>
        </div>

        <motion.section
          className={styles.fallbackShell}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <p className={styles.fallbackEyebrow}>CMO Roadmap Generator</p>
          <h1 className={styles.fallbackTitle}>{title}</h1>
          <p className={styles.fallbackBody}>
            {decoded.error === 'missing'
              ? 'Complete the intake and use “View roadmap” to land here with a full artifact in the URL. Bookmarks to this address without that payload will always look empty.'
              : 'The link may be truncated, edited, or from an older format. Run the intake again to generate a fresh, valid roadmap link.'}
          </p>
          <div className={`${styles.fallbackActions} ${styles.noPrint}`}>
            <Link href="/tools/cmo-roadmap-generator/intake" className={styles.primaryCta}>
              Start the intake
            </Link>
            <Link href="/tools" className={styles.secondaryCta}>
              All tools
            </Link>
          </div>
        </motion.section>
      </main>
    )
  }

  const roadmap = composeRoadmap(decoded.answers)

  return (
    <main className={styles.page}>
      <div className={`${styles.backWrap} ${styles.noPrint}`}>
        <Link href="/tools/cmo-roadmap-generator/intake" className={styles.backLink}>
          <ArrowLeft size={15} weight="regular" aria-hidden />
          Edit answers
        </Link>
      </div>

      <div className={styles.printHeader}>
        <p className={styles.printBrand}>Darling MarTech</p>
        <p className={styles.printMeta}>CMO Roadmap Generator · 90-day planning artifact</p>
      </div>

      <article className={styles.shell}>
        <RoadmapResultsToolbar />

        <header className={styles.docHeader}>
          <p className={styles.kicker}>Your roadmap</p>
          <h1 className={styles.title}>90-day marketing plan</h1>
          <p className={styles.lede}>{roadmap.executiveSummary}</p>
        </header>

        <motion.section
          className={styles.snapshot}
          aria-labelledby="snapshot-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <h2 id="snapshot-heading" className={styles.sectionLabel}>
            Context from your intake
          </h2>
          <ul className={styles.snapshotList}>
            {roadmap.businessSnapshotLines.map((line) => (
              <li key={line} className={styles.snapshotLine}>
                {line}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className={styles.priorities}
          aria-labelledby="priorities-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <h2 id="priorities-heading" className={styles.sectionLabel}>
            Top three priorities
          </h2>
          <p className={styles.sectionIntro}>
            These are the first moves the composition engine surfaced — sequenced again inside each phase below.
          </p>
          <ol className={styles.priorityList}>
            {roadmap.topPriorities.map((item, index) => (
              <li key={item.title} className={styles.priorityItem}>
                <span className={styles.priorityRank} aria-hidden>
                  {index + 1}
                </span>
                <div className={styles.priorityBody}>
                  <h3 className={styles.priorityTitle}>{item.title}</h3>
                  <p className={styles.priorityDesc}>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>

        {roadmap.phases.map((phase) => (
          <motion.section
            key={phase.phaseLabel}
            className={styles.phaseSection}
            aria-labelledby={`phase-${phase.phaseLabel}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={springEntrance}
          >
            <header className={styles.phaseHeader}>
              <span className={styles.phaseEyebrow}>{phase.phaseLabel}</span>
              <h2 id={`phase-${phase.phaseLabel}`} className={styles.phaseTitle}>
                {phase.headline}
              </h2>
              <p className={styles.phaseRange}>{phase.rangeLabel}</p>
              <p className={styles.phaseIntent}>{phase.intent}</p>
            </header>

            {phase.modules.length === 0 ? (
              <p className={styles.phaseEmpty}>No modules slotted in this window — your roadmap may compress into adjacent phases.</p>
            ) : (
              <ul className={styles.moduleList}>
                {phase.modules.map((module) => (
                  <li key={module.id}>
                    <article className={styles.moduleCard}>
                      <h3 className={styles.moduleTitle}>{module.title}</h3>
                      <p className={styles.moduleDesc}>{module.description}</p>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        ))}

        <motion.section
          className={styles.whySection}
          aria-labelledby="why-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <h2 id="why-heading" className={styles.sectionLabel}>
            Why this roadmap
          </h2>
          <p className={styles.sectionIntro}>
            How this artifact relates to your inputs — not a score, not a black box.
          </p>
          <ol className={styles.whyList}>
            {roadmap.whyThisRoadmap.map((line) => (
              <li key={line} className={styles.whyItem}>
                {line}
              </li>
            ))}
          </ol>
        </motion.section>

        <aside className={styles.watchSection} aria-labelledby="watch-heading">
          <div className={styles.watchHeader}>
            <WarningCircle className={styles.watchIcon} size={22} weight="regular" aria-hidden />
            <h2 id="watch-heading" className={styles.watchTitle}>
              Watch-outs
            </h2>
          </div>
          <p className={styles.watchIntro}>Keep these in view when you translate the plan into calendar and budget.</p>
          <ul className={styles.watchList}>
            {roadmap.watchOuts.map((line) => (
              <li key={line} className={styles.watchItem}>
                {line}
              </li>
            ))}
          </ul>
        </aside>

        <motion.section
          className={styles.recoSection}
          aria-labelledby="reco-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <h2 id="reco-heading" className={styles.sectionLabel}>
            Suggested engagement shape
          </h2>
          <p className={styles.sectionIntro}>
            Directional only — useful when you want to discuss execution with the same framing as this roadmap.
          </p>
          <dl className={styles.recoGrid}>
            <div className={styles.recoRow}>
              <dt className={styles.recoTerm}>Primary service</dt>
              <dd className={styles.recoDef}>{roadmap.recommendedPrimaryService}</dd>
            </div>
            {roadmap.recommendedSupportingService ? (
              <div className={styles.recoRow}>
                <dt className={styles.recoTerm}>Supporting service</dt>
                <dd className={styles.recoDef}>{roadmap.recommendedSupportingService}</dd>
              </div>
            ) : null}
            <div className={styles.recoRow}>
              <dt className={styles.recoTerm}>Format</dt>
              <dd className={styles.recoDef}>{roadmap.recommendedEngagementFormat}</dd>
            </div>
            <div className={styles.recoRow}>
              <dt className={styles.recoTerm}>Shape</dt>
              <dd className={styles.recoDef}>{roadmap.recommendedEngagementShape}</dd>
            </div>
          </dl>
        </motion.section>

        {encodedPayload ? <RoadmapResultsLeadForm encodedPayload={encodedPayload} /> : null}
      </article>
    </main>
  )
}
