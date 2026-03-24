'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { springEntrance } from '@/lib/motion'
import styles from './CmoSimulator.module.css'

// Metadata lives in layout.tsx — do NOT add it here (client component restriction)

const SIMULATOR_URL = 'https://cmo-simulator-eight.vercel.app/'
const SESSION_KEY = 'cmo-simulator-access'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export default function CmoSimulatorPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'popup-blocked'>('idle')

  // Session bypass — returning visitors skip the form
  useEffect(() => {
    let hasAccess = false
    try {
      hasAccess = Boolean(sessionStorage.getItem(SESSION_KEY))
    } catch {
      // sessionStorage unavailable (private browsing, embedded webview) — show gate
    }
    if (hasAccess) {
      window.open(SIMULATOR_URL, '_blank', 'noopener,noreferrer')
      router.replace('/lab')
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/cmo-simulator-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('API error')

      // Persist access in session storage
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }

      // Open simulator — handle popup blockers
      const popup = window.open(SIMULATOR_URL, '_blank', 'noopener,noreferrer')
      if (popup === null) {
        setStatus('popup-blocked')
      } else {
        router.replace('/lab')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/lab">Lab</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span>CMO Simulator</span>
          </nav>

          <p className={styles.eyebrow}>Free Tool · Marketing Strategy</p>
          <h1 className={styles.heading}>
            Think like a CMO for<br />
            <em className={styles.headingAccent}>10 minutes.</em>
          </h1>
          <p className={styles.body}>
            Walk through budget allocation, channel strategy, KPI selection, and
            execution priority — the same decision-making framework I use with clients.
            No agenda. No pitch at the end.
          </p>

          <ul className={styles.proof} role="list">
            {[
              'Built on 15+ years of real client work',
              'No login required after this form',
              'Takes about 10 minutes to complete',
            ].map((item) => (
              <li key={item} className={styles.proofItem}>
                <span className={styles.proofDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — form panel */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springEntrance, delay: 0.1 }}
        >
          {status === 'popup-blocked' ? (
            <div className={styles.fallback}>
              <p className={styles.fallbackText}>
                Your browser blocked the popup. Click below to open the simulator:
              </p>
              <a
                href={SIMULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
                Open CMO Simulator →
              </a>
            </div>
          ) : (
            <>
              <p className={styles.panelHeading}>Get instant access</p>
              <p className={styles.panelSub}>Drop your name and email — that&apos;s it.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Your name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    className={styles.input}
                    data-error={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className={styles.fieldError}>{errors.name.message}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className={styles.input}
                    data-error={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={styles.fieldError}>{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Sending…' : 'Launch the CMO Simulator →'}
                </button>

                {status === 'error' && (
                  <p className={styles.apiError}>
                    Something went wrong — try again or email{' '}
                    <a href="mailto:jacob@jacobdarling.com">jacob@jacobdarling.com</a>
                  </p>
                )}
              </form>

              <p className={styles.disclaimer}>
                No spam. No sales sequences. Just me knowing you tried the tool.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
