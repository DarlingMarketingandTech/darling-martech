'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, EnvelopeSimple } from '@phosphor-icons/react'
import type { GeoAuditReport } from '@/lib/geo-auditor/types'
import styles from './geo-auditor.module.css'

interface EmailGateProps {
  report: GeoAuditReport
}

interface CaptureResponse {
  success: boolean
  message: string
}

export default function EmailGate({ report }: EmailGateProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [pending, setPending] = useState(false)
  const [response, setResponse] = useState<CaptureResponse | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setResponse(null)

    try {
      const request = await fetch('/api/geo-readiness-auditor/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: company.trim() || undefined,
          audit: report,
        }),
      })

      const payload = (await request.json()) as CaptureResponse
      setResponse(payload)
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : 'Could not unlock the full report right now.',
      })
    } finally {
      setPending(false)
    }
  }

  if (response?.success) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIconWrap}>
          <EnvelopeSimple weight="regular" size={18} />
        </div>
        <div>
          <p className={styles.successTitle}>Full report sent</p>
          <p className={styles.successBody}>{response.message}</p>
          <a className={styles.inlineLink} href="/contact?intent=tool">
            Talk through the findings <ArrowRight size={16} weight="regular" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.gateWrap}>
      <div className={styles.gateIntro}>
        <p className={styles.eyebrow}>Unlock the full report</p>
        <h3 className={styles.sectionTitle}>Get the deeper roadmap in your inbox.</h3>
        <p className={styles.sectionIntro}>
          This unlocks the full check breakdown, the detailed recommendation list, and the exact priority sequence I would use next.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div>
          <label className={styles.label} htmlFor="geo-audit-name">
            Name
          </label>
          <input
            id="geo-audit-name"
            className={styles.input}
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="geo-audit-email">
            Email
          </label>
          <input
            id="geo-audit-email"
            className={styles.input}
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGridFull}>
          <label className={styles.label} htmlFor="geo-audit-company">
            Company <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="geo-audit-company"
            className={styles.input}
            value={company}
            onChange={event => setCompany(event.target.value)}
          />
        </div>
        <div className={styles.formGridFull}>
          <button className={styles.buttonPrimary} type="submit" disabled={pending}>
            {pending ? 'Sending report…' : 'Unlock full report'}
          </button>
        </div>
      </form>

      {response && !response.success ? <p className={styles.formError}>{response.message}</p> : null}
    </div>
  )
}
