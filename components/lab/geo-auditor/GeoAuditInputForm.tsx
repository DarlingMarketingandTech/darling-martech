'use client'

import { useState } from 'react'
import { GlobeHemisphereWest, ArrowRight } from '@phosphor-icons/react'
import styles from './geo-auditor.module.css'

interface GeoAuditInputFormProps {
  onSubmit: (url: string) => void
  disabled?: boolean
}

export default function GeoAuditInputForm({ onSubmit, disabled = false }: GeoAuditInputFormProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = url.trim()

    if (!trimmed) {
      setError('Enter a website URL to audit.')
      return
    }

    setError(null)
    onSubmit(trimmed)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Website URL</span>
        <div className={styles.inputRow}>
          <div className={styles.inputWrap}>
            <GlobeHemisphereWest className={styles.inputIcon} size={18} weight="regular" aria-hidden="true" />
            <input
              className={styles.input}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="example.com"
              value={url}
              onChange={event => setUrl(event.target.value)}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'geo-audit-url-error' : undefined}
              disabled={disabled}
            />
          </div>
          <button className={styles.buttonPrimary} type="submit" disabled={disabled}>
            Run Audit
            <ArrowRight size={18} weight="regular" aria-hidden="true" />
          </button>
        </div>
      </label>
      {error ? (
        <p className={styles.fieldError} id="geo-audit-url-error">{error}</p>
      ) : (
        <p className={styles.helperText}>
          Use a live public URL. The auditor checks crawler access, schema, trust signals, structure, FAQ patterns, and metadata clarity.
        </p>
      )}
    </form>
  )
}
