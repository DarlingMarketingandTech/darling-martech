'use client'

import { useCallback, useState } from 'react'
import { Check, CopySimple, Printer } from '@phosphor-icons/react'
import styles from './RoadmapResultsToolbar.module.css'

export default function RoadmapResultsToolbar() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const handleCopy = useCallback(async () => {
    setCopyError(false)
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), 3200)
    }
  }, [])

  return (
    <div className={styles.toolbar}>
      <button type="button" className={styles.toolbarBtn} onClick={handlePrint}>
        <Printer size={18} weight="regular" aria-hidden />
        Save PDF / Print
      </button>
      <button type="button" className={styles.toolbarBtn} onClick={handleCopy} aria-describedby="roadmap-toolbar-copy-status">
        {copied ? <Check size={18} weight="regular" aria-hidden /> : <CopySimple size={18} weight="regular" aria-hidden />}
        {copied ? 'Link copied' : 'Copy share link'}
      </button>
      <p id="roadmap-toolbar-copy-status" className={styles.srOnly} role="status" aria-live="polite">
        {copied ? 'Share link copied to clipboard.' : copyError ? 'Could not copy. Select the address bar or try again.' : ''}
      </p>
      {copyError ? (
        <p className={styles.toolbarError} role="alert">
          Clipboard unavailable — copy the URL from the address bar.
        </p>
      ) : null}
    </div>
  )
}
