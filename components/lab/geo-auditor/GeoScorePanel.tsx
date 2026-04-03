'use client'

import { motion } from 'framer-motion'
import { fadeVariants, itemVariants, containerVariants } from '@/lib/motion'
import { getBandLabel, getBandColor } from '@/lib/geo-auditor/scoring'
import type { GeoAuditReport } from '@/lib/geo-auditor/types'
import styles from './geo-auditor.module.css'

interface GeoScorePanelProps {
  report: GeoAuditReport
}

export default function GeoScorePanel({ report }: GeoScorePanelProps) {
  const bandLabel = getBandLabel(report.band)
  const bandColor = getBandColor(report.band)

  return (
    <motion.section
      className={styles.scorePanel}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.scoreHero} variants={fadeVariants}>
        <div className={styles.scoreDial} style={{ ['--band-color' as string]: bandColor }}>
          <span className={styles.scoreValue}>{report.score}</span>
          <span className={styles.scoreMax}>/100</span>
        </div>

        <div className={styles.scoreCopy}>
          <div className={styles.bandPill} style={{ ['--band-color' as string]: bandColor }}>
            {bandLabel}
          </div>
          <h2 className={styles.sectionTitle}>{report.summary.headline}</h2>
          <p className={styles.sectionBody}>{report.summary.overview}</p>
        </div>
      </motion.div>

      <motion.div className={styles.summaryGrid} variants={containerVariants}>
        <motion.div className={styles.summaryCard} variants={itemVariants}>
          <span className={styles.summaryLabel}>Top Priority</span>
          <p className={styles.summaryText}>{report.summary.topPriority}</p>
        </motion.div>
        <motion.div className={styles.summaryCard} variants={itemVariants}>
          <span className={styles.summaryLabel}>Crawl Check</span>
          <p className={styles.summaryText}>
            Homepage fetched: {report.crawl.homepageFetched ? 'Yes' : 'No'}
            {report.crawl.responseTimeMs ? ` • ${report.crawl.responseTimeMs} ms response` : ''}
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
