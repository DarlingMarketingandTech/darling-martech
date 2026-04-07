'use client'

import { useCallback, useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { analytics } from '@/lib/analytics'
import styles from './RoadmapResultsLeadForm.module.css'

type LeadFormProps = {
  readonly encodedPayload: string
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function RoadmapResultsLeadForm({ encodedPayload }: LeadFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrorMessage(null)
      setState('loading')

      try {
        const response = await fetch('/api/cmo-roadmap-generator/send-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            d: encodedPayload,
            email,
            name: name.trim() || undefined,
            company: company.trim() || undefined,
          }),
        })

        const payload = (await response.json()) as { success?: boolean; error?: string; code?: string }

        if (!response.ok) {
          setErrorMessage(payload.error ?? 'Something went wrong. Please try again.')
          setState('error')
          return
        }

        if (payload.success) {
          analytics.toolInteraction('CMO Roadmap Generator', 'roadmap_email_sent', {})
          setState('success')
        } else {
          setErrorMessage('Unexpected response from server.')
          setState('error')
        }
      } catch {
        setErrorMessage('Network error. Check your connection and try again.')
        setState('error')
      }
    },
    [company, email, encodedPayload, name],
  )

  if (state === 'success') {
    return (
      <section className={styles.section} aria-labelledby="roadmap-lead-success-heading">
        <div className={styles.successInner}>
          <CheckCircle className={styles.successIcon} size={36} weight="regular" aria-hidden />
          <h2 id="roadmap-lead-success-heading" className={styles.successTitle}>
            Check your inbox
          </h2>
          <p className={styles.successBody}>
            I sent a full text and HTML summary of this roadmap to <strong>{email}</strong>. It matches what you see on this page — recomputed on the server from your intake payload, not pasted from the browser.
          </p>
          <p className={styles.successHint}>
            If it does not arrive within a few minutes, check spam or promotions. You can still use <strong>Copy share link</strong> or print anytime.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} aria-labelledby="roadmap-lead-heading">
      <div className={styles.sectionInner}>
        <h2 id="roadmap-lead-heading" className={styles.title}>
          Email this roadmap
        </h2>
        <p className={styles.body}>
          Same roadmap you see here, delivered as a readable summary. Your intake stays encoded in the link — I do not ask you to re-enter those answers.
        </p>

        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="roadmap-email">
              Work email <span className={styles.required}>(required)</span>
            </label>
            <input
              id="roadmap-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state === 'loading'}
              aria-invalid={state === 'error' && !email ? true : undefined}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="roadmap-name">
              Name <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="roadmap-name"
              name="name"
              type="text"
              autoComplete="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={state === 'loading'}
              maxLength={100}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="roadmap-company">
              Company <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="roadmap-company"
              name="company"
              type="text"
              autoComplete="organization"
              className={styles.input}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={state === 'loading'}
              maxLength={200}
            />
          </div>

          {errorMessage ? (
            <p className={styles.fieldError} role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button type="submit" className={styles.submit} disabled={state === 'loading'}>
            {state === 'loading' ? 'Sending…' : 'Send to my inbox'}
          </button>
        </form>
      </div>
    </section>
  )
}
