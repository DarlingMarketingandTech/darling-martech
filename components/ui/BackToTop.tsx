'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springStandard } from '@/lib/motion'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={springStandard}
          whileHover={{ scale: 1.1, borderColor: 'var(--color-border-accent)', color: 'var(--color-accent)' }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center border"
          style={{
            background: 'rgba(10,10,10,0.80)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-muted)',
          }}
          aria-label="Back to top"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 12V2M2 6l5-4 5 4" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
