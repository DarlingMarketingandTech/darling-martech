'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeVariants, viewport } from '@/lib/motion'

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
  return (
    <section id="work" className="py-28 px-6 md:px-10 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p
            variants={fadeVariants}
            className="text-xs font-body tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Selected Work
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tightest max-w-2xl"
            style={{ color: 'var(--color-text)' }}
          >
            Work that proves the point.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body mt-4 max-w-xl text-base"
            style={{ color: 'var(--color-muted)' }}
          >
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s what
            strategy and execution look like when the same person does both.
          </motion.p>
        </motion.div>

        {/* Case study list */}
        <motion.div
          className="divide-y"
          style={{ borderColor: 'var(--color-border)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {caseStudies.map((cs) => (
            <motion.div
              key={cs.client}
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-8 group cursor-default"
              whileHover={{ x: 2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
                <div className="min-w-[180px]">
                  <p
                    className="font-display font-bold text-lg"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {cs.client}
                  </p>
                  <p className="text-xs font-body uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {cs.industry}
                  </p>
                </div>
                <p className="text-sm font-body leading-relaxed max-w-md" style={{ color: 'var(--color-muted)' }}>
                  {cs.description}
                </p>
              </div>
              <div
                className="font-display font-black text-2xl md:text-right tabular"
                style={{ color: 'rgba(255,77,0,0.7)' }}
              >
                {cs.metric}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
