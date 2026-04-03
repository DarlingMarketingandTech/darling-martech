'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'
import styles from './geo-auditor.module.css'

const steps = [
  'Fetching homepage',
  'Checking AI crawler access',
  'Analyzing structured data',
  'Reviewing content structure',
  'Checking trust signals',
  'Building report',
]

interface GeoAuditProgressProps {
  currentStep: number
}

export default function GeoAuditProgress({ currentStep }: GeoAuditProgressProps) {
  const safeStep = Math.max(0, Math.min(currentStep, steps.length - 1))
  const progress = ((safeStep + 1) / steps.length) * 100

  return (
    <motion.section
      className={styles.progressPanel}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.progressHeader} variants={itemVariants}>
        <p className={styles.eyebrow}>Running GEO Audit</p>
        <h2 className={styles.sectionTitle}>Checking the signals AI systems actually use</h2>
        <p className={styles.sectionBody}>
          This usually takes a few seconds. We are validating technical access, structured content, and authority cues.
        </p>
      </motion.div>

      <motion.div className={styles.progressBar} variants={itemVariants} aria-hidden="true">
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        />
      </motion.div>

      <motion.ol className={styles.progressSteps} variants={containerVariants}>
        {steps.map((step, index) => {
          const state = index < safeStep ? 'complete' : index === safeStep ? 'active' : 'idle'
          return (
            <motion.li
              key={step}
              className={styles[`progressStep${state[0].toUpperCase()}${state.slice(1)}`]}
              variants={itemVariants}
            >
              <span className={styles.progressIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span>{step}</span>
            </motion.li>
          )
        })}
      </motion.ol>
    </motion.section>
  )
}
