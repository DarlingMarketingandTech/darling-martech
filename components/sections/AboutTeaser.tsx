'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideInLeft, slideInRight, itemVariants, containerVariants, viewport } from '@/lib/motion'

export function AboutTeaser() {
  return (
    <section className="py-28 px-6 md:px-10 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <motion.div
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Photo */}
        <motion.div
          variants={slideInLeft}
          className="relative aspect-[4/5] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <Image
            src="/images/jacob-bio-photo-splash.jpg"
            alt="Jacob Darling — Marketing Strategist based in Indianapolis"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Orange accent */}
          <div className="absolute bottom-0 left-0 w-16 h-1" style={{ background: 'var(--color-accent)' }} />
        </motion.div>

        {/* Copy */}
        <div>
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tightest mb-8"
            style={{ color: 'var(--color-text)' }}
          >
            Both sides.<br />One person.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body leading-relaxed text-base md:text-lg mb-10"
            style={{ color: 'var(--color-muted)' }}
          >
            Most consultants know marketing or technology. I&apos;ve spent 15 years doing both —
            leading marketing teams, architecting CRM systems, building automation workflows, and
            shipping code. When you hire me, you get me directly. No account managers. No hand-offs.
            Just clear thinking and clean execution.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm"
              style={{ color: 'var(--color-accent)' }}
            >
              Read my story →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
