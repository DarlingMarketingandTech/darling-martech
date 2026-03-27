'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon, ArrowSquareOutIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { springCinematic } from '@/lib/motion'
import styles from './LabModal.module.css'

interface LabModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly toolSrc: string
  readonly toolName: string
  readonly toolSlug: string
}

export default function LabModal({ isOpen, onClose, toolSrc, toolName, toolSlug }: LabModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

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
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={`${toolName} — interactive tool`}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={springCinematic}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.titleBar}>
              <div className={styles.titleLeft}>
                <span className={styles.titleLabel}>Lab Tool</span>
                <span className={styles.titleName}>{toolName}</span>
              </div>
              <div className={styles.titleActions}>
                <Link href={`/lab/${toolSlug}`} className={styles.readLink}>
                  <ArrowSquareOutIcon weight="regular" size={16} />
                  Read the build
                </Link>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close tool">
                  <XIcon weight="regular" size={18} />
                </button>
              </div>
            </div>
            <div className={styles.iframeWrapper}>
              <iframe
                src={toolSrc}
                title={toolName}
                className={styles.iframe}
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
