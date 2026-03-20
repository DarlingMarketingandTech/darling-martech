'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllCaseStudies } from '@/lib/case-studies'
import { containerVariants, itemVariants, fadeVariants, springEntrance, viewport } from '@/lib/motion'

const allStudies = getAllCaseStudies()

function WorkCard({ cs, index }: { cs: ReturnType<typeof getAllCaseStudies>[0]; index: number }) {
  const isReady = cs.status === 'ready'

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={isReady ? { scale: 1.005 } : undefined}
      transition={springEntrance}
    >
      {isReady ? (
        <Link
          href={`/work/${cs.slug}`}
          className="group block border hover:border-[var(--color-border-accent)]"
          style={{
            borderColor: 'var(--color-border)',
            background: 'rgba(255,255,255,0.01)',
          }}
        >
          <WorkCardInner cs={cs} />
        </Link>
      ) : (
        <div className="block border opacity-60 cursor-default" style={{ borderColor: 'rgba(245,240,232,0.05)' }}>
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
          <span className="text-xs font-body tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>
            {cs.industry}
          </span>
          <h2
            className="font-display font-bold text-xl md:text-2xl mt-2 leading-tight tracking-tight group-hover:text-[var(--color-accent)]"
            style={{ color: 'var(--color-text)' }}
          >
            {cs.client}
          </h2>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display font-black text-3xl md:text-4xl leading-none tabular" style={{ color: 'var(--color-accent)' }}>
            {cs.metric}
          </p>
          <p className="text-xs font-body mt-1" style={{ color: 'var(--color-muted)' }}>{cs.metricLabel}</p>
        </div>
      </div>

      <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
        {cs.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {cs.services?.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs font-body border px-2.5 py-1"
              style={{ color: 'rgba(136,136,136,0.7)', borderColor: 'var(--color-border)' }}
            >
              {s}
            </span>
          ))}
        </div>
        {cs.status === 'ready' && (
          <span className="text-xs font-body group-hover:translate-x-1 inline-block" style={{ color: 'var(--color-accent)', transition: 'transform 0.2s' }}>
            View case study →
          </span>
        )}
        {cs.status === 'content-needed' && (
          <span className="text-xs font-body" style={{ color: 'rgba(136,136,136,0.4)' }}>Coming soon</span>
        )}
      </div>
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header — above fold, use animate */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeVariants}
            className="text-xs font-body tracking-widest uppercase mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Selected Work
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest mb-6 text-balance max-w-3xl"
            style={{ color: 'var(--color-text)' }}
          >
            Work that proves the point.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="font-body text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-muted)' }}
          >
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s
            what strategy and execution look like when the same person does both.
          </motion.p>
        </motion.div>

        {/* Case study grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-px"
          style={{ background: 'var(--color-border)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {allStudies.map((cs, i) => (
            <WorkCard key={cs.slug} cs={cs} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 pt-12 border-t"
          style={{ borderColor: 'var(--color-border)' }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="font-body mb-4" style={{ color: 'var(--color-muted)' }}>
            More case studies are in development. Ready to become the next one?
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
                className="inline-flex items-center gap-2 font-body font-medium text-sm px-6 py-3 group"
                style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
              >
                Let&apos;s talk
                <span className="group-hover:translate-x-1" style={{ transition: 'transform 0.2s' }}>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
