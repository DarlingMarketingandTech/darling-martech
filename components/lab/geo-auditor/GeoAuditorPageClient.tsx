'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChartBarHorizontal, CheckCircle, GlobeHemisphereWest, WarningCircle, XCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import AuditForm from '@/components/lab/geo-auditor/AuditForm'
import EmailGate from '@/components/lab/geo-auditor/EmailGate'
import { containerVariants, fadeVariants, itemVariants, viewport } from '@/lib/motion'
import type { AuditCheckResult, GeoAuditErrorResponse, GeoAuditReport } from '@/lib/geo-auditor/types'
import styles from '@/components/lab/geo-auditor/geo-auditor.module.css'

type AuditState = 'idle' | 'loading' | 'results'
type AuditResponse = GeoAuditReport | GeoAuditErrorResponse | null

const progressSteps = [
  'Fetching the homepage',
  'Checking AI crawler access',
  'Inspecting schema and metadata',
  'Reviewing headings and answer patterns',
  'Scoring trust and discoverability signals',
  'Building the priority roadmap',
]

function isErrorResponse(result: AuditResponse): result is GeoAuditErrorResponse {
  return Boolean(result && 'error' in result)
}

function statusIcon(status: AuditCheckResult['status']) {
  if (status === 'pass') return <CheckCircle size={18} weight="fill" />
  if (status === 'warn') return <WarningCircle size={18} weight="fill" />
  return <XCircle size={18} weight="fill" />
}

export default function GeoAuditorPageClient() {
  const [state, setState] = useState<AuditState>('idle')
  const [result, setResult] = useState<AuditResponse>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (state !== 'loading') {
      setActiveStep(0)
      return
    }

    const interval = window.setInterval(() => {
      setActiveStep(current => (current < progressSteps.length - 1 ? current + 1 : current))
    }, 650)

    return () => window.clearInterval(interval)
  }, [state])

  const report = useMemo(() => {
    if (result && !('error' in result)) return result
    return null
  }, [result])

  const primaryActions = report?.topActions.slice(0, 3) ?? []

  function handleResult(data: GeoAuditReport | GeoAuditErrorResponse) {
    setResult(data)
    setState('results')
  }

  return (
    <motion.div className={styles.container} initial="hidden" animate="visible" variants={containerVariants}>
      <motion.section className={styles.hero} variants={fadeVariants}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Tool · GEO Readiness Auditor</p>
          <h1 className={styles.title}>Check whether your site is ready to be discovered in AI search.</h1>
          <p className={styles.lead}>
            This is a lightweight operator-facing diagnosis. It checks crawler access, structured data, extractable content, trust signals, and the page framing that affects AI discoverability.
          </p>
        </div>
        <div className={styles.heroProof}>
          <div className={styles.statChip}>
            <ChartBarHorizontal size={18} weight="regular" />
            Six weighted checks
          </div>
          <div className={styles.statChip}>
            <GlobeHemisphereWest size={18} weight="regular" />
            Under 90 seconds
          </div>
          <div className={styles.statChip}>
            <ArrowRight size={18} weight="regular" />
            Full report gated only after value is proven
          </div>
        </div>
      </motion.section>

      <motion.section className={styles.card} variants={itemVariants}>
        <AuditForm
          onResult={handleResult}
          setLoading={value => {
            setState(value ? 'loading' : 'idle')
            if (value) setResult(null)
          }}
        />
      </motion.section>

      {state === 'loading' ? (
        <motion.section className={styles.card} variants={itemVariants}>
          <p className={styles.sectionTitle}>Running the audit</p>
          <p className={styles.sectionIntro}>No fluff. Just a fast crawl, a clear score, and the first fixes that matter.</p>
          <ul className={styles.progressList}>
            {progressSteps.map((step, index) => (
              <li key={step} className={styles.progressItem}>
                <span className={`${styles.progressDot} ${index <= activeStep ? styles.progressDotActive : ''}`} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      ) : null}

      {state === 'results' && isErrorResponse(result) ? (
        <motion.section className={styles.card} variants={itemVariants}>
          <p className={styles.errorTitle}>Could not complete the audit</p>
          <p className={styles.errorBody}>{result.error}</p>
          {result.code ? <p className={styles.errorMeta}>Code: {result.code}</p> : null}
          <button className={styles.buttonSecondary} type="button" onClick={() => setState('idle')}>
            Try another URL
          </button>
        </motion.section>
      ) : null}

      {report ? (
        <>
          <motion.section className={styles.gridTwo} variants={itemVariants}>
            <div className={styles.card}>
              <p className={styles.scoreLabel}>GEO score</p>
              <div className={styles.scoreValue}>{report.score}</div>
              <div className={`${styles.bandBadge} ${styles[`band${report.band[0].toUpperCase()}${report.band.slice(1)}`]}`}>{report.band}</div>
              <p className={styles.sectionIntro}>Homepage fetched in {report.crawl.responseTimeMs ?? 0} ms.</p>
            </div>
            <div className={styles.card}>
              <p className={styles.sectionTitle}>{report.summary.headline}</p>
              <p className={styles.summaryBody}>{report.summary.overview}</p>
              <p className={styles.summaryBody}>
                <strong>What I would fix first:</strong> {report.summary.topPriority}
              </p>
            </div>
          </motion.section>

          <motion.section className={styles.gridTwo} variants={itemVariants}>
            <div className={styles.card}>
              <p className={styles.sectionTitle}>Top actions</p>
              <div className={styles.actionList}>
                {primaryActions.map(action => (
                  <div key={action.title} className={styles.actionItem}>
                    <div>
                      <p className={styles.actionTitle}>{action.title}</p>
                      <p className={styles.actionBody}>{action.recommendation}</p>
                    </div>
                    <div className={styles.actionMeta}>
                      <span>{action.priority} priority</span>
                      <span>{action.effort} effort</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.card}>
              <p className={styles.sectionTitle}>What the free audit gives you</p>
              <p className={styles.sectionIntro}>A usable diagnosis, not just a number.</p>
              <div className={styles.keyPoints}>
                <div className={styles.keyPoint}>Score and readiness band</div>
                <div className={styles.keyPoint}>Six weighted checks with pass, warn, and fail states</div>
                <div className={styles.keyPoint}>The first fixes worth prioritizing</div>
                <div className={styles.keyPoint}>A deeper report available only after the summary proves useful</div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} viewport={viewport} whileInView="visible" initial="hidden">
            <div className={styles.card}>
              <p className={styles.sectionTitle}>Check-by-check breakdown</p>
              <div className={styles.checkGrid}>
                {report.checks.map(check => (
                  <div key={check.id} className={styles.checkCard}>
                    <div className={styles.checkCardHeader}>
                      <div className={styles.checkStatus}>{statusIcon(check.status)}</div>
                      <div>
                        <p className={styles.checkTitle}>{check.label}</p>
                        <p className={styles.checkSummary}>{check.summary}</p>
                      </div>
                    </div>
                    <p className={styles.checkWhy}>{check.whyItMatters}</p>
                    <p className={styles.checkRecommendation}>{check.recommendation}</p>
                    <ul className={styles.checkEvidence}>
                      {check.evidence.map(evidence => (
                        <li key={evidence}>{evidence}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className={styles.card}>
              <EmailGate report={report} />
            </div>
          </motion.section>
        </>
      ) : null}
    </motion.div>
  )
}
