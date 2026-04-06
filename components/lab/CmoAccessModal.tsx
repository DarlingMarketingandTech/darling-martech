'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from '@phosphor-icons/react'
import { springCinematic, springEntrance } from '@/lib/motion'
import styles from './CmoAccessModal.module.css'

const SIMULATOR_URL = 'https://cmo-simulator-eight.vercel.app/'
const SESSION_KEY = 'cmo-simulator-access'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

interface CmoAccessModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export default function CmoAccessModal({ isOpen, onClose }: CmoAccessModalProps) {
  const [phase, setPhase] = useState<'form' | 'iframe'>('form')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase('iframe')
      }
    } catch {
      // sessionStorage unavailable — show form
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      restoreFocusRef.current?.focus?.()
      restoreFocusRef.current = null
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (!isOpen || phase !== 'form') return
    const id = requestAnimationFrame(() => {
      document.getElementById('cmo-name')?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen, phase])

  // Reset to form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPhase('form')
      setSubmitStatus('idle')
    }
  }, [isOpen])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading')
    try {
      const res = await fetch('/api/cmo-simulator-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('API error')

      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }

      reset()
      setSubmitStatus('idle')
      setPhase('iframe')
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.scrim}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={`${styles.modal} ${phase === 'iframe' ? styles.modalLarge : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="CMO Simulator access"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={springCinematic}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className={styles.titleBar}>
              <div className={styles.titleLeft}>
                <span className={styles.titleLabel}>Lab Tool</span>
                <span className={styles.titleName}>CMO Simulator</span>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <XIcon weight="regular" size={18} aria-hidden />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {phase === 'form' ? (
                <motion.div
                  key="form"
                  className={styles.formWrap}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={springEntrance}
                >
                  <div className={styles.formInner}>
                    <p className={styles.formHeading}>Get instant access</p>
                    <p className={styles.formSub}>
                      Drop your name and email — that&apos;s it. No login, no sales pitch,
                      no sequences.
                    </p>

                    <ul className={styles.proof}>
                      {[
                        'Built on 15+ years of real client work',
                        'Takes about 10 minutes',
                        'Free. No strings.',
                      ].map((item) => (
                        <li key={item} className={styles.proofItem}>
                          <span className={styles.proofDot} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
                      <div className={styles.field}>
                        <label htmlFor="cmo-name" className={styles.label}>Your name</label>
                        <input
                          id="cmo-name"
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
                        <label htmlFor="cmo-email" className={styles.label}>Email address</label>
                        <input
                          id="cmo-email"
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
                        disabled={submitStatus === 'loading'}
                        className={styles.submitBtn}
                      >
                        {submitStatus === 'loading' ? 'Sending…' : 'Launch the CMO Simulator →'}
                      </button>

                      {submitStatus === 'error' && (
                        <p className={styles.apiError}>
                          Something went wrong — try again or email{' '}
                          <a href="mailto:jacob@darlingmartech.com">jacob@darlingmartech.com</a>
                        </p>
                      )}
                    </form>

                    <p className={styles.disclaimer}>
                      No spam. No sales sequences. Just me knowing you tried the tool.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="iframe"
                  className={styles.iframeWrap}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src={SIMULATOR_URL}
                    title="CMO Simulator"
                    className={styles.iframe}
                    allow="clipboard-write"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
