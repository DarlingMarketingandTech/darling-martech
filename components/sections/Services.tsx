'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="text-electric-orange text-xs font-body tracking-widest uppercase mb-4"
            >
              What I Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tightest text-warm-off-white"
            >
              Four disciplines.<br />One person.<br />Zero hand-offs.
            </motion.h2>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="bg-obsidian p-10 md:p-14 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              <p className="font-display font-black text-6xl text-white/5 mb-6 leading-none group-hover:text-electric-orange/10 transition-colors duration-300">
                {service.number}
              </p>
              <h3 className="font-display font-bold text-xl md:text-2xl text-warm-off-white mb-4 leading-tight tracking-tight">
                {service.title}
              </h3>
              <p className="text-mid-gray font-body leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
