'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { springStandard } from '@/lib/motion'
import styles from './CareerTimeline.module.css'

export type JobDetail = {
  category: string
  bullets: string[]
}

export type Job = {
  title: string
  company: string
  location: string
  period: string
  year: string
  summary: string
  details: JobDetail[]
}

interface TimelineCardProps {
  job: Job
  isOpen: boolean
  onToggle: () => void
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

export function TimelineCard({ job, isOpen, onToggle, index }: TimelineCardProps) {
  return (
    <motion.div
      className={styles.cardOuter}
      variants={cardVariants}
      custom={index}
    >
      {/* Year label — desktop only, left of spine */}
      <span className={styles.yearLabel}>{job.year}</span>

      {/* Dot connector — desktop only */}
      <motion.span
        className={styles.dot}
        whileHover={{ scale: 1.4 }}
        transition={springStandard}
      />

      {/* Card */}
      <div
        className={styles.card}
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
      >
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.cardMeta}>
            <p className={styles.cardYearMobile}>{job.year}</p>
            <p className={styles.cardTitle}>{job.title}</p>
            <p className={styles.cardCompany}>{job.company}</p>
            <p className={styles.cardLocation}>{job.location}</p>
            <p className={styles.cardPeriod}>{job.period}</p>
            <p className={styles.cardSummary}>{job.summary}</p>
          </div>
          <motion.span
            className={styles.chevron}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={springStandard}
          >
            <CaretDown size={18} weight="light" />
          </motion.span>
        </div>

        {/* Accordion details */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className={styles.detailsWrap}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springStandard}
            >
              <div className={styles.detailsInner}>
                <div className={styles.detailGroups}>
                  {job.details.map((group) => (
                    <div key={group.category} className={styles.detailGroup}>
                      <p className={styles.detailCategory}>{group.category}</p>
                      <ul className={styles.detailBullets}>
                        {group.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
