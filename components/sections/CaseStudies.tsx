'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const caseStudies = [
  {
    client: 'Primary Care Indy',
    industry: 'Healthcare',
    metric: '210% ROI',
    description: 'Unified brand system across 3+ locations. Digital-first patient intake strategy.',
  },
  {
    client: 'Hoosier Boy Barbershop',
    industry: 'Local Retail',
    metric: '4.1× booking lift',
    description: 'Full brand identity, Americana iconography, environmental design. Zero paid media at launch.',
  },
  {
    client: 'Behr Pet Essentials',
    industry: 'E-Commerce',
    metric: '+28% avg cart value',
    description: 'Infographic-first content architecture, direct-response campaign system.',
  },
  {
    client: 'Urgent Care Indy',
    industry: 'Healthcare',
    metric: '+35% bookings',
    description: 'Digital integration and patient growth strategy.',
  },
  {
    client: 'Primary Colours',
    industry: 'Nonprofit',
    metric: '$46k+ revenue',
    description: 'Event marketing, sponsorship, and arts nonprofit strategy.',
  },
]

export function CaseStudies() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-electric-orange text-xs font-body tracking-widest uppercase mb-4"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tightest text-warm-off-white max-w-2xl"
          >
            Work that proves the point.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mid-gray font-body mt-4 max-w-xl text-base"
          >
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s what
            strategy and execution look like when the same person does both.
          </motion.p>
        </div>

        {/* Case study list */}
        <div className="divide-y divide-white/5">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-8 group cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
                <div className="min-w-[180px]">
                  <p className="font-display font-bold text-lg text-warm-off-white group-hover:text-electric-orange transition-colors duration-200">
                    {cs.client}
                  </p>
                  <p className="text-xs text-mid-gray font-body uppercase tracking-wider mt-0.5">
                    {cs.industry}
                  </p>
                </div>
                <p className="text-sm text-mid-gray font-body leading-relaxed max-w-md">
                  {cs.description}
                </p>
              </div>
              <div className="font-display font-black text-2xl text-electric-orange/70 group-hover:text-electric-orange transition-colors duration-200 md:text-right">
                {cs.metric}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
