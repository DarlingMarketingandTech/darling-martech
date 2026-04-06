'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { springEntrance } from '@/lib/motion'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactServiceOptions } from '@/data/services'
import Link from 'next/link'
import styles from './ContactForm.module.css'

// ── Intent tile definitions ─────────────────────────────────────────────────

export type Intent = 'service' | 'work' | 'tool' | 'unsure'

const INTENT_TILES: { id: Intent; label: string }[] = [
  { id: 'service', label: 'I know what I need' },
  { id: 'work',    label: 'I saw something in your work' },
  { id: 'tool',    label: 'I just ran a tool' },
  { id: 'unsure',  label: "I'm not sure yet" },
]

// Per-intent copy for the challenge field
const CHALLENGE_COPY: Record<Intent, { label: string; placeholder: string }> = {
  service: {
    label: 'Tell me what you\'re building or fixing',
    placeholder: 'What\'s the scope as you see it?',
  },
  work: {
    label: 'What situation did you recognize?',
    placeholder: 'What problem did that case study remind you of?',
  },
  tool: {
    label: 'What did the tool surface for you?',
    placeholder: 'What was your biggest gap or priority?',
  },
  unsure: {
    label: 'What\'s the problem you\'re trying to solve?',
    placeholder: 'Start anywhere — even rough is useful',
  },
}

// Per-intent success next-step
const SUCCESS_NEXT: Record<Intent, { label: string; href: string }> = {
  service: { label: 'See relevant work →', href: '/work' },
  work:    { label: 'Explore all case studies →', href: '/work' },
  tool:    { label: 'Revisit the tools →', href: '/tools' },
  unsure:  { label: 'See how I run these conversations →', href: '/process' },
}

// ── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name:      z.string().min(1, 'Name is required'),
  company:   z.string().optional(),
  email:     z.string().email('Enter a valid email address'),
  service:   z.string().optional(),
  toolOutput: z.string().optional(),
  challenge: z.string().min(1, 'Tell me a bit about what you\'re dealing with'),
  intent:    z.enum(['service', 'work', 'tool', 'unsure']).optional(),
})

type FormData = z.infer<typeof schema>

// ── Component ─────────────────────────────────────────────────────────────────

interface ContactFormProps {
  defaultIntent?: Intent
}

export function ContactForm({ defaultIntent }: ContactFormProps) {
  const searchParams = useSearchParams()
  const [intent, setIntent] = useState<Intent | null>(defaultIntent ?? null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  // Parse ?intent= on mount and sync both state and form field
  useEffect(() => {
    const param = searchParams.get('intent') as Intent | null
    if (param && INTENT_TILES.some((t) => t.id === param)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIntent(param)
      setValue('intent', param)
    }
  }, [searchParams, setValue])

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────

  if (status === 'success') {
    const nextStep = intent ? SUCCESS_NEXT[intent] : SUCCESS_NEXT.unsure
    return (
      <motion.div
        className={styles.successBox}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.successLine} />
        <p className={styles.successTitle}>Got it.</p>
        <p className={styles.successBody}>
          Jacob will review this and follow up within 1 business day — usually faster.
          If it&apos;s a fit, you&apos;ll hear back with a direct response, not a calendar link.
        </p>
        <Link href={nextStep.href} className={styles.successNextStep}>
          {nextStep.label}
        </Link>
      </motion.div>
    )
  }

  // ── Challenge field copy ──────────────────────────────────────────────────

  const challengeCopy = intent ? CHALLENGE_COPY[intent] : CHALLENGE_COPY.unsure

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.formWrap}>
      {/* Step 1 — Intent tiles */}
      <div className={styles.intentStep}>
        <p className={styles.intentLabel}>What brought you here today?</p>
        <div className={styles.intentTiles}>
          {INTENT_TILES.map((tile) => (
            <button
              key={tile.id}
              type="button"
              className={`${styles.intentTile} ${intent === tile.id ? styles.intentTileActive : ''}`}
              onClick={() => {
                setIntent(tile.id)
                setValue('intent', tile.id)
              }}
            >
              {tile.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — Form fields (animate in after tile selection) */}
      <AnimatePresence>
        {intent && (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
            noValidate
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springEntrance}
          >
            {/* Hidden intent field */}
            <input type="hidden" {...register('intent')} />

            {/* Name + Email row */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name')}
                  data-error={!!errors.name}
                />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
              </div>
              <div className={styles.field}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  {...register('email')}
                  data-error={!!errors.email}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
            </div>

            {/* Company — always optional */}
            <div className={styles.field}>
              <Label htmlFor="company">
                Company or website <span className={styles.optional}>(optional)</span>
              </Label>
              <Input id="company" placeholder="yourcompany.com" {...register('company')} />
            </div>

            {/* Service dropdown — only for "I know what I need" */}
            {intent === 'service' && (
              <div className={styles.field}>
                <Label htmlFor="service">Service area</Label>
                <select
                  id="service"
                  {...register('service')}
                  className={`${styles.select} ${errors.service ? styles.selectError : ''}`}
                >
                  {contactServiceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className={styles.option}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.service && <p className={styles.error}>{errors.service.message}</p>}
              </div>
            )}

            {/* Tool output — only for "I just ran a tool" */}
            {intent === 'tool' && (
              <div className={styles.field}>
                <Label htmlFor="toolOutput">
                  Key finding or output <span className={styles.optional}>(optional)</span>
                </Label>
                <Input
                  id="toolOutput"
                  placeholder="Paste your headline finding or biggest gap"
                  {...register('toolOutput')}
                />
              </div>
            )}

            {/* Primary challenge — adaptive label/placeholder */}
            <div className={styles.field}>
              <Label htmlFor="challenge">{challengeCopy.label}</Label>
              <Textarea
                id="challenge"
                placeholder={challengeCopy.placeholder}
                {...register('challenge')}
                data-error={!!errors.challenge}
              />
              {errors.challenge && <p className={styles.error}>{errors.challenge.message}</p>}
            </div>

            {/* Submit */}
            <div className={styles.submitRow}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={styles.submitBtn}
              >
                {status === 'loading' ? 'Sending...' : (
                  <>Send it <span className={styles.arrow}>→</span></>
                )}
              </button>
              <p className={styles.submitTrust}>
                No pitch. Just a real conversation.
              </p>

              {status === 'error' && (
                <p className={styles.submitError}>
                  Submission failed. Try again or email{' '}
                  <a href="mailto:jacob@darlingmartech.com" className={styles.emailLink}>
                    jacob@darlingmartech.com
                  </a>{' '}
                  directly.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
