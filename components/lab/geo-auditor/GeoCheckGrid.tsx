'use client'

import type { AuditCheckResult } from '@/lib/geo-auditor/types'
import GeoCheckCard from './GeoCheckCard'
import styles from './geo-auditor.module.css'

interface GeoCheckGridProps {
  checks: AuditCheckResult[]
  showDetails?: boolean
}

export default function GeoCheckGrid({ checks, showDetails = false }: GeoCheckGridProps) {
  return (
    <div className={styles.checkGrid}>
      {checks.map(check => (
        <GeoCheckCard key={check.id} check={check} showDetails={showDetails} />
      ))}
    </div>
  )
}
