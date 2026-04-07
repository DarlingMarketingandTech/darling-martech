'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import {
  encodeIntakePayload,
  ROADMAP_INTAKE_QUERY_KEY,
} from '@/lib/cmo-roadmap-generator/intake-payload'
import { ROADMAP_QUESTIONS, type ToolQuestion } from '@/lib/cmo-roadmap-generator/questions'
import type { ActiveChannel, IntakeAnswers } from '@/lib/cmo-roadmap-generator/types'
import { analytics } from '@/lib/analytics'
import { springEntrance, viewport } from '@/lib/motion'
import styles from './RoadmapIntakeForm.module.css'

function isStepValid(question: ToolQuestion, answers: Partial<IntakeAnswers>): boolean {
  if (question.type === 'multi-select') {
    const channels = answers.activeChannels
    return Array.isArray(channels) && channels.length >= 1
  }
  const value = answers[question.id]
  return typeof value === 'string' && value.length > 0
}

function firstInvalidStepIndex(answers: Partial<IntakeAnswers>): number | null {
  const idx = ROADMAP_QUESTIONS.findIndex((q) => !isStepValid(q, answers))
  return idx === -1 ? null : idx
}

export default function RoadmapIntakeForm() {
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<IntakeAnswers>>({})
  const [attemptedAdvance, setAttemptedAdvance] = useState(false)

  const question = ROADMAP_QUESTIONS[stepIndex]
  const total = ROADMAP_QUESTIONS.length
  const valid = isStepValid(question, answers)
  const showError = attemptedAdvance && !valid

  const selectSingle = useCallback((q: ToolQuestion, value: string) => {
    if (q.type !== 'single-select') return
    setAnswers((prev) => ({ ...prev, [q.id]: value as IntakeAnswers[typeof q.id] }))
    setAttemptedAdvance(false)
  }, [])

  const toggleChannel = useCallback((channel: ActiveChannel) => {
    setAnswers((prev) => {
      const current = prev.activeChannels ?? []
      const next = current.includes(channel)
        ? current.filter((c) => c !== channel)
        : [...current, channel]
      return { ...prev, activeChannels: next }
    })
    setAttemptedAdvance(false)
  }, [])

  const goNext = useCallback(() => {
    if (!isStepValid(question, answers)) {
      setAttemptedAdvance(true)
      return
    }
    setAttemptedAdvance(false)
    if (stepIndex < total - 1) {
      setStepIndex((i) => i + 1)
    }
  }, [answers, question, stepIndex, total])

  const goBack = useCallback(() => {
    setAttemptedAdvance(false)
    setStepIndex((i) => Math.max(i - 1, 0))
  }, [])

  const submit = useCallback(() => {
    const invalidAt = firstInvalidStepIndex(answers)
    if (invalidAt !== null) {
      setStepIndex(invalidAt)
      setAttemptedAdvance(true)
      return
    }

    const complete: IntakeAnswers = {
      businessType: answers.businessType!,
      businessStage: answers.businessStage!,
      mainGoal: answers.mainGoal!,
      bottleneck: answers.bottleneck!,
      activeChannels: answers.activeChannels!,
      stackMaturity: answers.stackMaturity!,
      teamCapacity: answers.teamCapacity!,
    }

    const encoded = encodeIntakePayload(complete)
    const query = new URLSearchParams({ [ROADMAP_INTAKE_QUERY_KEY]: encoded })
    analytics.toolInteraction('CMO Roadmap Generator', 'intake_complete', {
      step_count: total,
    })
    router.push(`/tools/cmo-roadmap-generator/results?${query.toString()}`)
  }, [answers, router, total])

  const optionSelected = useMemo(() => {
    if (question.type === 'multi-select') {
      return new Set(answers.activeChannels ?? [])
    }
    const v = answers[question.id]
    return typeof v === 'string' ? v : null
  }, [answers, question])

  return (
    <main className={styles.page}>
      <div className={styles.backWrap}>
        <Link href="/tools/cmo-roadmap-generator" className={styles.backLink}>
          <ArrowLeft size={15} weight="regular" aria-hidden />
          Tool overview
        </Link>
      </div>

      <motion.section
        className={styles.shell}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <p className={styles.kicker}>
          Step {stepIndex + 1} of {total}
        </p>
        <h1 className={styles.title}>CMO Roadmap Generator</h1>
        <p className={styles.intro}>
          Answer seven questions the way you would in a live planning session. Your roadmap is built from these inputs only — no account required.
        </p>

        <motion.div
          key={question.id}
          className={styles.questionCard}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <h2 className={styles.questionTitle}>{question.label}</h2>
          {question.helpText ? <p className={styles.helpText}>{question.helpText}</p> : null}

          {question.type === 'single-select' ? (
            <ul className={styles.optionList} role="list">
              {question.options.map((option) => {
                const selected = optionSelected === option.value
                return (
                  <li key={option.value} className={styles.optionLi}>
                    <button
                      type="button"
                      className={selected ? styles.optionButtonSelected : styles.optionButton}
                      onClick={() => selectSingle(question, option.value)}
                      aria-pressed={selected}
                    >
                      <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <ul className={styles.optionList} role="list">
              <li className={styles.multiHint}>Select every channel you actively use today (at least one).</li>
              {question.options.map((option) => {
                const selected = optionSelected instanceof Set && optionSelected.has(option.value as ActiveChannel)
                return (
                  <li key={option.value} className={styles.optionLi}>
                    <button
                      type="button"
                      className={selected ? styles.optionButtonSelected : styles.optionButton}
                      onClick={() => toggleChannel(option.value as ActiveChannel)}
                      aria-pressed={selected}
                    >
                      <span className={styles.optionCheck} aria-hidden>
                        {selected ? '✓' : ''}
                      </span>
                      <span className={styles.optionLabel}>{option.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {showError ? (
            <p className={styles.fieldError} role="alert">
              {question.type === 'multi-select'
                ? 'Choose at least one channel to continue.'
                : 'Choose an option to continue.'}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <button type="button" className={styles.button} onClick={goBack} disabled={stepIndex === 0}>
            Back
          </button>
          {stepIndex < total - 1 ? (
            <button type="button" className={styles.buttonPrimary} onClick={goNext}>
              Next
              <ArrowRight size={18} weight="regular" aria-hidden />
            </button>
          ) : (
            <button type="button" className={styles.buttonPrimary} onClick={submit}>
              View roadmap
              <ArrowRight size={18} weight="regular" aria-hidden />
            </button>
          )}
        </motion.div>
      </motion.section>
    </main>
  )
}
