'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { CaseStudy } from '@/lib/case-studies'
import { getAdjacentCaseStudies } from '@/lib/case-studies'
import { CaseStudyImages } from './CaseStudyImages'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export function CaseStudyContent({ cs }: { cs: CaseStudy }) {
  const { prev, next } = getAdjacentCaseStudies(cs.slug)

  return (
    <article className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 text-xs text-mid-gray font-body mb-12"
        >
          <Link href="/work" className="hover:text-warm-off-white transition-colors">Work</Link>
          <span className="text-mid-gray/30">/</span>
          <span>{cs.client}</span>
        </motion.div>

        {/* Hero */}
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 mb-20 items-start">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-electric-orange text-xs font-body tracking-widest uppercase mb-4"
            >
              {cs.industry}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-6 text-balance"
            >
              {cs.client}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-mid-gray font-body text-lg leading-relaxed max-w-2xl"
            >
              {cs.tagline}
            </motion.p>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0 min-w-[200px]"
          >
            <p className="text-xs text-mid-gray/60 font-body tracking-widest uppercase mb-3">Services</p>
            <ul className="space-y-2">
              {cs.services?.map((s) => (
                <li key={s} className="text-sm text-warm-off-white/80 font-body flex items-center gap-2">
                  <span className="w-1 h-1 bg-electric-orange rounded-full shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            {cs.url && (
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-electric-orange font-body hover:underline mt-5"
              >
                Visit site →
              </a>
            )}
          </motion.div>
        </div>

        {/* Results bar */}
        {cs.hero?.results && (
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-20">
              {cs.hero.results.map((r) => (
                <div key={r.label} className="bg-obsidian p-8 md:p-10">
                  <p className="font-display font-black text-4xl md:text-5xl text-electric-orange leading-none tracking-tighter mb-2">
                    {r.value}
                  </p>
                  <p className="text-sm text-mid-gray font-body leading-snug">{r.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        )}

        {/* Challenge / Solution */}
        {cs.hero && (
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
            <FadeUp>
              <div>
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-5">The Challenge</p>
                <p className="text-warm-off-white/80 font-body leading-relaxed">{cs.hero.challenge}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-5">The Solution</p>
                <p className="text-warm-off-white/80 font-body leading-relaxed">{cs.hero.solution}</p>
              </div>
            </FadeUp>
          </div>
        )}

        {/* Body content */}
        {cs.body && (
          <>
            <FadeUp>
              <div className="border-t border-white/5 pt-16 mb-16">
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-6">Context</p>
                <p className="text-warm-off-white/80 font-body leading-relaxed max-w-3xl text-lg">
                  {cs.body.context}
                </p>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="mb-16">
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-8">Approach</p>
                <ol className="space-y-5">
                  {cs.body.approach.map((step, i) => (
                    <li key={i} className="flex gap-6 items-start">
                      <span className="font-display font-black text-5xl text-white/5 leading-none shrink-0 w-10 text-right">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-warm-off-white/75 font-body leading-relaxed pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="border-t border-white/5 pt-16 mb-20">
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-6">Outcome</p>
                <p className="text-warm-off-white/80 font-body leading-relaxed max-w-3xl text-lg">
                  {cs.body.outcome}
                </p>
              </div>
            </FadeUp>
          </>
        )}

        {/* Project images from Cloudinary */}
        {cs.cloudinaryFolder && <CaseStudyImages cloudinaryFolder={cs.cloudinaryFolder} />}

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <FadeUp>
            <div className="grid grid-cols-2 gap-px bg-white/5 mb-12">
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="bg-obsidian p-8 group hover:bg-white/[0.02] transition-colors"
                >
                  <p className="text-xs text-mid-gray/60 font-body tracking-widest uppercase mb-2">Previous</p>
                  <p className="text-warm-off-white font-display font-bold text-lg tracking-tight group-hover:text-electric-orange transition-colors">
                    ← {prev.client}
                  </p>
                </Link>
              ) : (
                <div className="bg-obsidian p-8" />
              )}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="bg-obsidian p-8 text-right group hover:bg-white/[0.02] transition-colors"
                >
                  <p className="text-xs text-mid-gray/60 font-body tracking-widest uppercase mb-2">Next</p>
                  <p className="text-warm-off-white font-display font-bold text-lg tracking-tight group-hover:text-electric-orange transition-colors">
                    {next.client} →
                  </p>
                </Link>
              ) : (
                <div className="bg-obsidian p-8" />
              )}
            </div>
          </FadeUp>
        )}

        {/* Bottom nav */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/5">
            <Link
              href="/work"
              className="text-sm text-mid-gray font-body hover:text-warm-off-white transition-colors"
            >
              ← All work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body font-medium text-sm bg-electric-orange text-warm-off-white px-6 py-3 hover:bg-electric-orange/90 transition-colors group"
            >
              Start a project
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </FadeUp>

      </div>
    </article>
  )
}
