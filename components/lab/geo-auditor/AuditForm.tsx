'use client'

import { useState, type FormEvent } from 'react'
import type { GeoAuditErrorResponse, GeoAuditReport } from '@/lib/geo-auditor/types'
import styles from './geo-auditor.module.css'

type AuditResponse = GeoAuditReport | GeoAuditErrorResponse

interface AuditFormProps {
  onResult: (data: AuditResponse) => void
  setLoading: (value: boolean) => void
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  return trimmed.startsWith('http://') || trimmed.startsWith('https://') ? trimmed : `https://${trimmed}`
}

export default function AuditForm({ onResult, setLoading }: AuditFormProps) {
  const [url, setUrl] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalized = normalizeUrl(url)
    if (!normalized) return

    setSubmitError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/geo-readiness-auditor/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
      })

      const contentType = response.headers.get('content-type') ?? ''
      let payload: AuditResponse

      if (contentType.includes('application/json')) {
        payload = (await response.json()) as AuditResponse
      } else {
        payload = {
          error: await response.text(),
          code: 'INTERNAL_ERROR',
        }
      }

      if (!response.ok && 'error' in payload) {
        setSubmitError(payload.error)
      }

      onResult(payload)
    } catch (error) {
      const fallback: GeoAuditErrorResponse = {
        error: error instanceof Error ? error.message : 'Network error while running the audit.',
        code: 'INTERNAL_ERROR',
      }
      setSubmitError(fallback.error)
      onResult(fallback)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formStack}>
      <label htmlFor="geo-audit-url" className={styles.label}>
        Enter a live homepage URL
      </label>
      <div className={styles.flexRow}>
        <input
          id="geo-audit-url"
          type="url"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="example.com"
          className={styles.input}
          value={url}
          onChange={event => setUrl(event.target.value)}
          required
        />
        <button className={styles.buttonPrimary} type="submit">
          Run audit
        </button>
      </div>
      <p className={styles.helper}>
        Free: score, top findings, and the first priority actions. Full roadmap: unlocked by email after the audit proves useful.
      </p>
      {submitError ? <p className={styles.formError}>{submitError}</p> : null}
    </form>
  )
}
