'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AuditForm from '@/components/lab/geo-auditor/AuditForm'
import ScoreGauge from '@/components/lab/geo-auditor/ScoreGauge'
import CheckItem from '@/components/lab/geo-auditor/CheckItem'
import EmailGate from '@/components/lab/geo-auditor/EmailGate'
import styles from '@/components/lab/geo-auditor/geo-auditor.module.css'

export default function GeoAuditorPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'results'>('idle')
  const [result, setResult] = useState<any>(null)

  function handleResult(data: any) {
    setResult(data)
    setState('results')
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {state === 'idle' && (
        <AuditForm
          onResult={handleResult}
          setLoading={(v) =>
            setState(v ? 'loading' : 'idle')
          }
        />
      )}

      {state === 'loading' && <p>Analyzing site...</p>}

      {state === 'results' && result && (
        <div className={styles.gridTwo}>
          <div className={styles.card}>
            <ScoreGauge score={result.score} />
          </div>

          <div className={styles.grid}>
            {result.checks.map((c: any) => (
              <CheckItem key={c.id} check={c} />
            ))}
            <EmailGate auditData={result} />
          </div>
        </div>
      )}
    </motion.div>
  )
}
