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
    if (!url) return

    setLoading(true)

    const res = await fetch('/api/geo-auditor/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await res.json()
    setLoading(false)
    onResult(data)
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
