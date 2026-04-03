'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './geo-auditor.module.css'

export default function CheckItem({ check }: { check: any }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.checkItem}>
      <div
        className={styles.checkHeader}
        onClick={() => setOpen(!open)}
      >
        <span>{check.label}</span>
        <span>{check.status}</span>
      </div>

      <p>{check.message}</p>

      <AnimatePresence>
        {open && check.fix && (
          <motion.div
            className={styles.fixContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {check.fix}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
