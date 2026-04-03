'use client'

import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import type { GeoAuditReport } from '@/lib/geo-auditor/types'
import styles from './geo-auditor.module.css'

interface GeoEmailGateProps {
  report: GeoAuditReport
  onSubmit: (payload: { name: string; email: string }) => Promise<void>
  isSubmitting?: boolean
  error?: string | null
}

export default function GeoEmailGate({ report, onSubmit, isSubmitting = false, error = null }: GeoEmailGateProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail) {
      setLocalError('Enter your name and email to unlock the full report.')
      return
    }

    setLocalError(null)
    await onSubmit({ name: trimmedName, email: trimmedEmail })
  }

  const failingChecks = report.checks.filter(check => check.status !== 'pass').map(check => check.label).join(', ')

  return (
    <section className={styles.gateCard}>
      <div className={styles.gateIntro}>
        <p className={styles.eyebrow}>Unlock Full Report</p>
        <h2 className={styles.sectionTitle}>Get the full recommendations and action plan by email</h2>
        <p className={styles.sectionBody}>
          You already have the headline score. Enter your details and I’ll send the complete report with the exact fixes, evidence, and next-priority actions.
        </p>
      </div>

      <form className={styles.gateForm} onSubmit={handleSubmit}>
        <input type="hidden" name="toolSlug" value="geo-readiness-auditor" />
        <input type="hidden" name="url" value={report.url} />
        <input type="hidden" name="score" value={String(report.score)} />
        <input type="hidden" name="failingChecks" value={failingChecks} />

        <div className={styles.twoColumnFields}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Name</span>
            <input className={styles.input} value={name} onChange={event => setName(event.target.value)} disabled={isSubmitting} />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Email</span>
            <input className={styles.input} type="email" value={email} onChange={event => setEmail(event.target.value)} disabled={isSubmitting} />
          </label>
        </div>

        {localError || error ? <p className={styles.fieldError}>{localError ?? error}</p> : null}

        <div className={styles.gateFooter}>
          <p className={styles.helperText}>No pitch. Just the report and a clear next step if you want help implementing it.</p>
          <button className={styles.buttonPrimary} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending report...' : 'Email me the full report'}
            <ArrowRight size={18} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>
  )
}
