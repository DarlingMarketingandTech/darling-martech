'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springStandard } from '@/lib/motion'

const COOKIE_KEY = 'dm-cookie-consent'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setShow(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={springStandard}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-50 border p-5"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p className="text-sm font-body leading-relaxed mb-4" style={{ color: 'rgba(245,240,232,0.8)' }}>
            This site uses cookies to improve your experience and analyze site traffic.
          </p>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={accept}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springStandard}
              className="text-xs font-body font-medium px-4 py-2"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
            >
              Accept
            </motion.button>
            <button
              onClick={decline}
              className="text-xs font-body"
              style={{ color: 'var(--color-muted)' }}
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
