'use client'

import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import type { GeoAuditReport } from '@/lib/geo-auditor/types'
import GeoCheckGrid from './GeoCheckGrid'
import styles from './geo-auditor.module.css'

interface GeoFullReportProps {
  report: GeoAuditReport
}

export default function GeoFullReport({ report }: GeoFullReportProps) {
  return (
    <section className={styles.fullReport}>
      <div className={styles.reportHeader}>
        <p className={styles.eyebrow}>Full Report</p>
        <h2 className={styles.sectionTitle}>Priority actions and full diagnostic detail</h2>
        <p className={styles.sectionBody}>{report.summary.topPriority}</p>
      </div>

      <div className={styles.actionGrid}>
        {report.topActions.map(action => (
          <article key={action.title} className={styles.actionCard}>
            <div className={styles.actionHeader}>
              <h3 className={styles.actionTitle}>{action.title}</h3>
              <span className={styles.priorityPill} data-priority={action.priority}>{action.priority}</span>
            </div>
            <p className={styles.actionBody}>{action.recommendation}</p>
            <div className={styles.actionMetaRow}>
              <span>Effort: {action.effort}</span>
              <span>Impact: {action.impact}</span>
            </div>
          </article>
        ))}
      </div>

      <GeoCheckGrid checks={report.checks} showDetails />

      <div className={styles.nextStepCard}>
        <div>
          <p className={styles.eyebrow}>Next Step</p>
          <h3 className={styles.nextStepTitle}>Want help fixing the highest-priority GEO gaps?</h3>
          <p className={styles.sectionBody}>
            Bring the report into a conversation and I’ll translate the findings into an implementation plan.
          </p>
        </div>
        <Link className={styles.buttonPrimary} href="/contact?intent=tool">
          Talk through the report
          <ArrowRight size={18} weight="regular" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
