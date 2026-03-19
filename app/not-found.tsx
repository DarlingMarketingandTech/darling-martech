'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6"
      >
        404 — Page Not Found
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display font-black text-[clamp(3rem,8vw,8rem)] leading-[0.95] tracking-tightest text-warm-off-white mb-6"
      >
        Dead end.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-mid-gray font-body text-lg max-w-md mb-12"
      >
        This page doesn&apos;t exist — but good marketing systems never hit a dead end.
        Let&apos;s get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/"
          className="inline-block font-body font-medium text-sm bg-electric-orange text-warm-off-white px-6 py-3 hover:bg-electric-orange/90 transition-colors"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="inline-block font-body text-sm text-mid-gray hover:text-warm-off-white transition-colors"
        >
          Get in touch →
        </Link>
      </motion.div>
    </section>
  )
}
