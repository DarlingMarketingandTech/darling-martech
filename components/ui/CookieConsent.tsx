'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-50 border border-white/8 bg-[#111111] p-5"
        >
          <p className="text-sm text-warm-off-white/80 font-body leading-relaxed mb-4">
            This site uses cookies to improve your experience and analyze site traffic.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={accept}
              className="text-xs font-body font-medium bg-electric-orange text-warm-off-white px-4 py-2 hover:bg-electric-orange/90 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="text-xs font-body text-mid-gray hover:text-warm-off-white transition-colors"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
