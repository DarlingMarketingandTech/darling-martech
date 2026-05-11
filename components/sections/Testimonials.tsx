'use client'

import { useCallback, useId, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { KeyboardEvent } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { testimonials as defaultTestimonials, type Testimonial } from '@/data/testimonials'
import { containerVariants, fadeVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'
import styles from './Testimonials.module.css'

type TestimonialsProps = {
  items?: Testimonial[]
  label?: string
  title?: string
  intro?: string
  className?: string
}

function getRelationshipCount(items: Testimonial[]) {
  return new Set(items.map((item) => item.relationship)).size
}

function getDateRange(items: Testimonial[]) {
  const years = items
    .map((item) => Number(item.dateLabel.slice(-4)))
    .filter((year) => Number.isFinite(year))
    .sort((a, b) => a - b)

  if (!years.length) {
    return ''
  }

  const first = years[0]
  const last = years[years.length - 1]
  return first === last ? String(first) : `${first}-${last}`
}

function getPreview(quote: string, maxLength = 180) {
  const firstParagraph = quote.split('\n\n')[0].replace(/\s+/g, ' ').trim()
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }

  return `${firstParagraph.slice(0, maxLength).trimEnd()}…`
}

export function Testimonials({
  items = defaultTestimonials,
  label = 'What People Are Saying',
  title = 'Proof that travels well.',
  intro = 'Peer recommendations from operators I&apos;ve worked with — collected as proof, not filler.',
  className,
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const carouselId = useId()
  const hasItems = items.length > 0
  const active = items[activeIndex] ?? items[0]

  const stats = useMemo(
    () => [
      { value: String(items.length).padStart(2, '0'), label: 'Recommendations loaded' },
      { value: getDateRange(items), label: 'Timeline of trust' },
      { value: String(getRelationshipCount(items)).padStart(2, '0'), label: 'Collaboration contexts' },
    ],
    [items]
  )

  const goTo = useCallback((index: number) => {
    const nextIndex = (index + items.length) % items.length
    setActiveIndex(nextIndex)
  }, [items.length])

  const handleCarouselKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goTo(activeIndex - 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        goTo(activeIndex + 1)
        break
      case 'Home':
        event.preventDefault()
        goTo(0)
        break
      case 'End':
        event.preventDefault()
        goTo(items.length - 1)
        break
      default:
        break
    }
  }, [activeIndex, goTo, items.length])

  if (!hasItems) {
    return null
  }

  return (
    <section className={cn(styles.section, className)} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className={styles.headerCopy}>
            <motion.p variants={fadeVariants} className={styles.label}>
              {label}
            </motion.p>
            <motion.h2 variants={itemVariants} id="testimonials-title" className={styles.heading}>
              {title}
            </motion.h2>
            <motion.p variants={itemVariants} className={styles.intro}>
              {intro}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className={styles.metrics} aria-label="Testimonial metrics">
            {stats.map((stat) => (
              <div key={stat.label} className={styles.metricCard}>
                <span className={styles.metricValue}>{stat.value}</span>
                <span className={styles.metricLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className={styles.experienceShell}>
          <motion.div
            className={styles.spotlight}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={springEntrance}
          >
            <div className={styles.spotlightBackdrop} aria-hidden="true">
              <div className={styles.grid} />
              <motion.div
                className={styles.glow}
                animate={shouldReduceMotion ? undefined : { x: [0, 18, -12, 0], y: [0, -12, 10, 0] }}
                transition={shouldReduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className={styles.beam} />
            </div>

            <div
              className={styles.spotlightInner}
              tabIndex={0}
              onKeyDown={handleCarouselKeyDown}
              aria-roledescription="carousel"
              aria-label="Testimonials carousel"
              aria-describedby={`${carouselId}-instructions`}
            >
              <div id={`${carouselId}-instructions`} className={styles.srOnly}>
                Use left and right arrow keys to change testimonials. Press Home for the first testimonial and End for the last.
              </div>
              <div className={styles.srOnly} role="status" aria-live="polite">
                Showing testimonial {activeIndex + 1} of {items.length}: {active.author}.
              </div>

              <div className={styles.eyebrowRow}>
                <div className={styles.eyebrowCluster}>
                  <span className={styles.eyebrowTag}>LinkedIn recommendations</span>
                  <span className={styles.eyebrowMeta}>{active.dateLabel}</span>
                </div>
                <span className={styles.slideStatus}>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className={styles.quoteFrame}
                  id={`${carouselId}-panel`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${activeIndex + 1} of ${items.length}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, rotateX: 6 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, rotateX: -4 }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                >
                  <span className={styles.quoteMark} aria-hidden="true">
                    &ldquo;
                  </span>

                  <blockquote className={styles.quote}>
                    {active.quote.split('\n\n').map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>

                  <div className={styles.personCard}>
                    <div className={styles.personIdentity}>
                      <p className={styles.author}>{active.author}</p>
                      <p className={styles.role}>{active.role}</p>
                    </div>
                    <div className={styles.personMeta}>
                      <span className={styles.metaPill}>{active.relationship}</span>
                      <span className={styles.metaDate}>{active.dateLabel}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={() => goTo(activeIndex - 1)}
                  aria-label="Show previous testimonial"
                >
                  <CaretLeft weight="bold" className={styles.controlIcon} />
                </button>
                <div className={styles.progressCluster} role="group" aria-label="Choose testimonial">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(styles.progressDot, index === activeIndex && styles.progressDotActive)}
                      onClick={() => goTo(index)}
                      aria-label={`Show testimonial from ${item.author}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.controlButton}
                  onClick={() => goTo(activeIndex + 1)}
                  aria-label="Show next testimonial"
                >
                  <CaretRight weight="bold" className={styles.controlIcon} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.rail}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                variants={itemVariants}
                onClick={() => goTo(index)}
                className={cn(styles.railCard, index === activeIndex && styles.railCardActive)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={springEntrance}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-controls={`${carouselId}-panel`}
              >
                <div className={styles.railHeader}>
                  <div>
                    <p className={styles.railAuthor}>{item.author}</p>
                    <p className={styles.railRole}>{item.role}</p>
                  </div>
                  <span className={styles.railYear}>{item.dateLabel.slice(-4)}</span>
                </div>

                <p className={styles.railRelationship}>{item.relationship}</p>
                <p className={styles.railPreview}>{getPreview(item.quote)}</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
