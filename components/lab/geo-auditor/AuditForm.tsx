'use client'

import { useState } from 'react'
import styles from './geo-auditor.module.css'

export default function AuditForm({
  onResult,
  setLoading,
}: {
  onResult: (data: any) => void
  setLoading: (v: boolean) => void
}) {
  const [url, setUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return

    const normalized =
      trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? trimmed
        : `https://${trimmed}`

    setLoading(true)
    try {
      const res = await fetch('/api/geo-auditor/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      const data = await res.json()
      setLoading(false)
      onResult(data)
    } catch (err) {
      setLoading(false)
      onResult({
        error:
          err instanceof Error
            ? err.message
            : 'Network error — check your connection and try again.',
        code: 'INTERNAL_ERROR',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.flexRow}>
      <input
        type="url"
        placeholder="Enter your domain (https://example.com)"
        className={styles.input}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button className={styles.buttonPrimary} type="submit">
        Run Audit
      </button>
    </form>
  )
}
