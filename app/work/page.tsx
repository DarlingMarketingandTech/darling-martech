'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getAllCaseStudies } from '@/lib/case-studies'
import type { Metadata } from 'next'

const allStudies = getAllCaseStudies()

function WorkCard({ cs, index }: { cs: ReturnType<typeof getAllCaseStudies>[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isReady = cs.status === 'ready'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {isReady ? (
        <Link href={`/work/${cs.slug}`} className="group block border border-white/8 hover:border-electric-orange/30 transition-colors duration-300 bg-white/[0.01] hover:bg-white/[0.03]">
          <WorkCardInner cs={cs} />
        </Link>
      ) : (
        <div className="block border border-white/5 opacity-60 cursor-default">
          <WorkCardInner cs={cs} />
        </div>
      )}
    </motion.div>
  )
}

function WorkCardInner({ cs }: { cs: ReturnType<typeof getAllCaseStudies>[0] }) {
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-xs text-electric-orange font-body tracking-widest uppercase">
            {cs.industry}
          </span>
          <h2 className="font-display font-bold text-xl md:text-2xl text-warm-off-white mt-2 leading-tight tracking-tight group-hover:text-electric-orange transition-colors duration-200">
            {cs.client}
          </h2>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-black text-3xl md:text-4xl text-electric-orange leading-none">
            {cs.metric}
          </p>
          <p className="text-xs text-mid-gray font-body mt-1">{cs.metricLabel}</p>
        </div>
      </div>

      <p className="text-mid-gray font-body text-sm leading-relaxed mb-6">
        {cs.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {cs.services?.slice(0, 3).map((s) => (
            <span key={s} className="text-xs text-mid-gray/70 font-body border border-white/8 px-2.5 py-1">
              {s}
            </span>
          ))}
        </div>
        {cs.status === 'ready' && (
          <span className="text-xs text-electric-orange font-body group-hover:translate-x-1 transition-transform duration-200 inline-block">
            View case study →
          </span>
        )}
        {cs.status === 'content-needed' && (
          <span className="text-xs text-mid-gray/40 font-body">Coming soon</span>
        )}
      </div>
    </div>
  )
}

export default function WorkPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <main className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6"
          >
            Selected Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-6 text-balance max-w-3xl"
          >
            Work that proves the point.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mid-gray font-body text-lg leading-relaxed max-w-xl"
          >
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s
            what strategy and execution look like when the same person does both.
          </motion.p>
        </div>

        {/* Case study grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {allStudies.map((cs, i) => (
            <WorkCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-white/5"
        >
          <p className="text-mid-gray font-body mb-4">
            More case studies are in development. Ready to become the next one?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-body font-medium text-sm bg-electric-orange text-warm-off-white px-6 py-3 hover:bg-electric-orange/90 transition-colors group"
          >
            Let&apos;s talk
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
