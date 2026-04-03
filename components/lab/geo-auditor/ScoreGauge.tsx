'use client'

import { motion } from 'framer-motion'
import styles from './geo-auditor.module.css'

export default function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset =
    circumference - (score / 100) * circumference

  return (
    <div className={styles.gaugeWrapper}>
      <svg width="180" height="180">
        <circle
          cx="90"
          cy="90"
          r="70"
          stroke="var(--color-border)"
          strokeWidth="10"
          fill="transparent"
        />
        <motion.circle
          cx="90"
          cy="90"
          r="70"
          stroke="var(--color-accent)"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1 }}
        />
      </svg>

      <div className={styles.scoreBadge}>
        {score}/100
      </div>
    </div>
  )
}
