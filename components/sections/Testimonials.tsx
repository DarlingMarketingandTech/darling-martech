'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

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
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (paused || !inView) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, inView, next])

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

        {/* Featured rotating quote */}
        <div
          className="mb-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[200px] md:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <blockquote className="font-accent text-2xl md:text-4xl text-warm-off-white leading-snug max-w-4xl">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3 mt-8">
                  <div className="w-8 h-px bg-electric-orange" />
                  <cite className="text-sm text-mid-gray font-body not-italic">
                    {testimonials[active].author}
                    {testimonials[active].year && `, ${testimonials[active].year}`}
                  </cite>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative p-1"
                aria-label={`View testimonial ${i + 1}`}
              >
                <span
                  className={`block h-[2px] transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-electric-orange'
                      : 'w-4 bg-white/15 group-hover:bg-white/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Grid of all quotes (visible on md+) */}
        <div className="hidden md:grid md:grid-cols-2 gap-px bg-white/5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`bg-obsidian p-10 md:p-14 flex flex-col justify-between gap-8 cursor-pointer transition-colors duration-200 ${
                i === active ? 'ring-1 ring-electric-orange/20' : 'hover:bg-white/[0.02]'
              }`}
            >
              <blockquote className="font-accent text-xl text-warm-off-white/80 leading-snug">
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
