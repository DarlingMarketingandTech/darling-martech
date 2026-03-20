'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'

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
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
    <section
      ref={ref}
      className="py-28 px-6 md:px-10 border-t"
      style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.01)' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={itemVariants}
          className="text-xs font-body tracking-widest uppercase mb-16"
          style={{ color: 'var(--color-accent)' }}
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
                transition={springEntrance}
              >
                <blockquote
                  className="font-accent text-2xl md:text-4xl leading-snug max-w-4xl"
                  style={{ color: 'var(--color-text)' }}
                >
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-3 mt-8">
                  <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                  <cite className="text-sm font-body not-italic" style={{ color: 'var(--color-muted)' }}>
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
                key={testimonials[i].author}
                onClick={() => setActive(i)}
                className="group relative p-1"
                aria-label={`View testimonial ${i + 1}`}
              >
                <motion.span
                  className="block h-[2px]"
                  animate={{
                    width: i === active ? 32 : 16,
                    background: i === active ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                  }}
                  transition={springEntrance}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Grid of all quotes (visible on md+) */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 gap-px"
          style={{ background: 'var(--color-border)' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              variants={itemVariants}
              onClick={() => setActive(i)}
              className="p-10 md:p-14 flex flex-col justify-between gap-8 cursor-pointer"
              style={{
                background: i === active ? 'rgba(255,77,0,0.04)' : 'var(--color-base)',
                boxShadow: i === active ? 'inset 0 0 0 1px rgba(255,77,0,0.2)' : undefined,
              }}
              whileHover={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <blockquote
                className="font-accent text-xl leading-snug"
                style={{ color: 'rgba(245,240,232,0.8)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-6 h-px" style={{ background: 'var(--color-accent)' }} />
                <cite className="text-sm font-body not-italic" style={{ color: 'var(--color-muted)' }}>
                  {t.author}{t.year && `, ${t.year}`}
                </cite>
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
