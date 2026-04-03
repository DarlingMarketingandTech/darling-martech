'use client'

import { CheckCircle, Warning, XCircle } from '@phosphor-icons/react'
import type { AuditCheckResult } from '@/lib/geo-auditor/types'
import styles from './geo-auditor.module.css'

interface GeoCheckCardProps {
  check: AuditCheckResult
  showDetails?: boolean
}

function StatusIcon({ status }: { status: AuditCheckResult['status'] }) {
  if (status === 'pass') return <CheckCircle size={20} weight="fill" aria-hidden="true" />
  if (status === 'warn') return <Warning size={20} weight="fill" aria-hidden="true" />
  return <XCircle size={20} weight="fill" aria-hidden="true" />
}

export default function GeoCheckCard({ check, showDetails = false }: GeoCheckCardProps) {
  return (
    <article className={styles.checkCard} data-status={check.status}>
      <div className={styles.checkHeader}>
        <div className={styles.checkTitleWrap}>
          <span className={styles.checkIcon}><StatusIcon status={check.status} /></span>
          <div>
            <h3 className={styles.checkTitle}>{check.label}</h3>
            <p className={styles.checkMeta}>
              {check.score}/{check.maxScore} points • {check.priority} priority
            </p>
          </div>
        </div>
        <span className={styles.statusPill} data-status={check.status}>{check.status}</span>
      </div>

      <p className={styles.checkSummary}>{check.summary}</p>

      {showDetails ? (
        <div className={styles.checkDetails}>
          <div className={styles.detailBlock}>
            <span className={styles.detailLabel}>Why it matters</span>
            <p className={styles.detailText}>{check.whyItMatters}</p>
          </div>
          <div className={styles.detailBlock}>
            <span className={styles.detailLabel}>Recommendation</span>
            <p className={styles.detailText}>{check.recommendation}</p>
          </div>
          <div className={styles.detailBlock}>
            <span className={styles.detailLabel}>Evidence</span>
            <ul className={styles.evidenceList}>
              {check.evidence.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  )
}
