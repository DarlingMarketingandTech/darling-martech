'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const roles = [
  'Strategy & Technology',
  'Marketing Automation',
  'Revenue Systems',
  'CRM Architecture',
]

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '400+', label: 'Automations Built' },
  { value: '30,000+', label: 'Users Served' },
  { value: '40%', label: 'Avg Conversion Lift' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export function Hero() {
  const typedRole = useTypingEffect(roles, 70, 40, 3000)

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 md:px-10 overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Orange accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-electric-orange/20" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-electric-orange text-sm font-body tracking-widest uppercase mb-8"
          >
            Indianapolis, IN · {typedRole}
            <span className="inline-block w-[2px] h-[14px] bg-electric-orange ml-0.5 animate-pulse align-middle" />
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tightest text-warm-off-white mb-8 text-balance"
          >
            15 years of marketing strategy and systems architecture —{' '}
            <em className="font-accent font-normal not-italic text-electric-orange">
              in one person
            </em>
            , working directly with you.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-mid-gray font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
          >
            Jacob Darling builds the marketing infrastructure that makes small businesses and startups
            grow — strategy, technology, automation, and execution. No agencies. No hand-offs. Just
            results you can measure.
          </motion.p>

          {/* CTA */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <Link
              href="/contact"
              className="inline-block font-body font-medium text-base bg-electric-orange text-warm-off-white px-8 py-4 hover:bg-electric-orange/90 transition-all duration-200 group"
            >
              Let&apos;s build something that works
              <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-24 pt-8 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="md:px-10 first:pl-0">
              <p className="font-display font-black text-4xl md:text-5xl text-warm-off-white tracking-tighter">
                {stat.value}
              </p>
              <p className="text-sm text-mid-gray font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
