'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'

export function ContactCTA() {
  return (
    <section className="py-32 px-6 md:px-10 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest mb-8"
            style={{ color: 'var(--color-text)' }}
          >
            Ready to build something that works?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-lg leading-relaxed mb-12"
            style={{ color: 'var(--color-muted)' }}
          >
            I work directly with a small number of clients at a time. Every engagement gets my full attention.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springEntrance}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-medium text-base px-8 py-4 group"
                style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
              >
                Let&apos;s talk
                <span className="group-hover:translate-x-1" style={{ transition: 'transform 0.2s' }}>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
