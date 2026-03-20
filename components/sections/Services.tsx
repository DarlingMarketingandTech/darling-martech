'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, fadeVariants, viewport } from '@/lib/motion'

const services = [
  {
    number: '01',
    title: 'Marketing Strategy & Consulting',
    description:
      'Brand positioning, go-to-market planning, and campaign strategy built around your specific goals — not a templated playbook.',
  },
  {
    number: '02',
    title: 'Web & App Development',
    description:
      'Fast, modern websites and web apps built with Next.js — designed to look sharp, perform well, and turn visitors into clients.',
  },
  {
    number: '03',
    title: 'Tech Implementation',
    description:
      'The right tools, configured the right way. CRM, automation, analytics, and integrations handled by someone who understands both the tech and the marketing strategy behind it.',
  },
  {
    number: '04',
    title: 'SEO & Digital Marketing',
    description:
      'Search strategy, content systems, and digital campaigns built to compound over time — bringing qualified leads to you consistently.',
  },
]

export function Services() {
  return (
    <section id="services" className="py-28 px-6 md:px-10 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div>
            <motion.p
              variants={fadeVariants}
              className="text-xs font-body tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              What I Do
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-display font-black text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tightest"
              style={{ color: 'var(--color-text)' }}
            >
              Four disciplines.<br />One person.<br />Zero hand-offs.
            </motion.h2>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-px"
          style={{ background: 'var(--color-border)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              variants={itemVariants}
              className="p-10 md:p-14 group"
              style={{ background: 'var(--color-base)' }}
              whileHover={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <p
                className="font-display font-black text-6xl mb-6 leading-none"
                style={{ color: 'rgba(255,255,255,0.05)' }}
              >
                {service.number}
              </p>
              <h3
                className="font-display font-bold text-xl md:text-2xl mb-4 leading-tight tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                {service.title}
              </h3>
              <p className="font-body leading-relaxed text-sm md:text-base" style={{ color: 'var(--color-muted)' }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
