'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote:
      'Jacob has a great balance of strategic thinking and hands-on execution... I\'d recommend him to anyone looking for a marketing professional who\'s both forward-thinking and results-oriented.',
    author: 'Jesse Wey',
    year: '2025',
  },
  {
    quote:
      'Jacob is the kind of marketer who makes an immediate impact... figuring out how to put new technologies to work in practical ways.',
    author: 'Andrew Bastnagel',
    year: '2025',
  },
  {
    quote:
      'Exuberance and moxie are unparalleled... ability to implement strategies that produce a positive ROI.',
    author: 'Kevin Martin See',
    year: '',
  },
  {
    quote:
      'Energy and ingenuity are extremely valuable assets... expanded our vision.',
    author: 'Ben Worrell',
    year: '',
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 px-6 md:px-10 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-electric-orange text-xs font-body tracking-widest uppercase mb-16"
        >
          What Clients Say
        </motion.p>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-obsidian p-10 md:p-14 flex flex-col justify-between gap-8"
            >
              <blockquote className="font-accent text-xl md:text-2xl text-warm-off-white leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-6 h-px bg-electric-orange" />
                <cite className="text-sm text-mid-gray font-body not-italic">
                  {t.author}{t.year && `, ${t.year}`}
                </cite>
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
