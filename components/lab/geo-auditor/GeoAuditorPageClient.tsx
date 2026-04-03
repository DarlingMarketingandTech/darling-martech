'use client'

import Link from 'next/link'
import { useEffect, useState, startTransition } from 'react'
import { motion } from 'framer-motion'
import { ArrowClockwise, ArrowRight } from '@phosphor-icons/react'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import type { GeoAuditReport } from '@/lib/geo-auditor/types'
import GeoAuditInputForm from './GeoAuditInputForm'
import GeoAuditProgress from './GeoAuditProgress'
import GeoScorePanel from './GeoScorePanel'
import GeoCheckGrid from './GeoCheckGrid'
import GeoEmailGate from './GeoEmailGate'
import GeoFullReport from './GeoFullReport'
import styles from './geo-auditor.module.css'

type Phase = 'idle' | 'loading' | 'error' | 'results' | 'captured'

type AuditErrorResponse = {
  error?: string
  code?: string
}

const loadingSteps = 6

export default function GeoAuditorPageClient() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [report, setReport] = useState<GeoAuditReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureError, setCaptureError] = useState<string | null>(null)

  useEffect(() => {
    if (phase !== 'loading') return

    const interval = window.setInterval(() => {
      setLoadingStep(current => (current >= loadingSteps - 1 ? current : current + 1))
    }, 650)

    return () => window.clearInterval(interval)
  }, [phase])

  async function handleAuditSubmit(url: string) {
    setError(null)
    setCaptureError(null)
    setLoadingStep(0)
    setReport(null)
    setPhase('loading')

    try {
      const response = await fetch('/api/geo-auditor/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = (await response.json()) as GeoAuditReport & AuditErrorResponse

      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Audit failed. Try again.')
      }

      startTransition(() => {
        setReport(data)
        setPhase('results')
      })
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Audit failed. Try again.'
      setError(message)
      setPhase('error')
    }
  }

  async function handleCapture(payload: { name: string; email: string }) {
    if (!report) return

    setCaptureError(null)
    setIsCapturing(true)

    try {
      const response = await fetch('/api/geo-auditor/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          auditData: report,
        }),
      })

      const data = (await response.json()) as { success?: boolean; message?: string }

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Could not send the report email.')
      }

      setPhase('captured')
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : 'Could not send the report email.'
      setCaptureError(message)
    } finally {
      setIsCapturing(false)
    }
  }

  function reset() {
    setPhase('idle')
    setReport(null)
    setError(null)
    setCaptureError(null)
    setLoadingStep(0)
    setIsCapturing(false)
  }

  const previewChecks = report?.checks ?? []
  const topPreviewActions = report?.topActions.slice(0, 3) ?? []

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.shell}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={viewport}
      >
        <motion.section className={styles.hero} variants={itemVariants}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>GEO Readiness Auditor</p>
            <h1 className={styles.heroTitle}>See whether AI systems can actually find and trust your site.</h1>
            <p className={styles.heroBody}>
              This audit checks the structural and trust signals that influence AI-era discoverability: crawler access, schema, authority cues, FAQ readiness, content structure, and metadata clarity.
            </p>
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.metaList}>
              <span className={styles.metaPill}>6 weighted checks</span>
              <span className={styles.metaPill}>Fast public-url audit</span>
              <span className={styles.metaPill}>Free score + gated full report</span>
            </div>
            {phase === 'idle' || phase === 'error' ? (
              <GeoAuditInputForm onSubmit={handleAuditSubmit} />
            ) : null}
          </div>
        </motion.section>

        {phase === 'loading' ? <GeoAuditProgress currentStep={loadingStep} /> : null}

        {phase === 'error' ? (
          <section className={styles.errorCard}>
            <p className={styles.eyebrow}>Audit Failed</p>
            <h2 className={styles.errorTitle}>The audit could not finish for that URL.</h2>
            <p className={styles.errorBody}>{error}</p>
            <div className={styles.nextStepCard}>
              <button className={styles.buttonSecondary} type="button" onClick={reset}>
                <ArrowClockwise size={18} weight="regular" aria-hidden="true" />
                Try another URL
              </button>
            </div>
          </section>
        ) : null}

        {(phase === 'results' || phase === 'captured') && report ? (
          <div className={styles.resultStack}>
            <GeoScorePanel report={report} />

            {phase === 'results' ? (
              <section className={styles.previewBlock}>
                <div className={styles.previewHeader}>
                  <p className={styles.eyebrow}>Free Preview</p>
                  <h2 className={styles.sectionTitle}>Top findings before you unlock the full report</h2>
                  <p className={styles.sectionBody}>
                    You can already see the score and the top issues. The full report adds the exact evidence and detailed recommendations for every check.
                  </p>
                </div>

                {topPreviewActions.length > 0 ? (
                  <div className={styles.previewActions}>
                    {topPreviewActions.map(action => (
                      <article key={action.title} className={styles.actionCard}>
                        <div className={styles.actionHeader}>
                          <h3 className={styles.actionTitle}>{action.title}</h3>
                          <span className={styles.priorityPill} data-priority={action.priority}>{action.priority}</span>
                        </div>
                        <p className={styles.actionBody}>{action.recommendation}</p>
                      </article>
                    ))}
                  </div>
                ) : null}

                <GeoCheckGrid checks={previewChecks} />
                <GeoEmailGate
                  report={report}
                  onSubmit={handleCapture}
                  isSubmitting={isCapturing}
                  error={captureError}
                />
              </section>
            ) : (
              <GeoFullReport report={report} />
            )}
          </div>
        ) : null}

        {(phase === 'results' || phase === 'captured') ? (
          <div>
            <button className={styles.buttonSecondary} type="button" onClick={reset}>
              <ArrowClockwise size={18} weight="regular" aria-hidden="true" />
              Run another audit
            </button>
          </div>
        ) : null}

        <motion.div className={styles.nextStepCard} variants={itemVariants}>
          <div>
            <p className={styles.eyebrow}>Need help implementing the fixes?</p>
            <h2 className={styles.nextStepTitle}>Turn the audit into an execution plan.</h2>
            <p className={styles.sectionBody}>
              If the findings show structural gaps, I can map the highest-impact fixes to your site, service pages, and proof architecture.
            </p>
          </div>
          <Link className={styles.buttonPrimary} href="/contact?intent=tool">
            Talk through the findings
            <ArrowRight size={18} weight="regular" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
