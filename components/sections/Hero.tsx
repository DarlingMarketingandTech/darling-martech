'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { containerVariants, itemVariants, springEntrance } from '@/lib/motion'
import styles from './Hero.module.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: '15+',    label: 'Years Experience'    },
  { value: '400+',   label: 'Automations Built'   },
  { value: '30,000+', label: 'Users Served'       },
  { value: '40%',    label: 'Avg Conversion Lift' },
]

// ─── Hero paths — adapted from 21st.dev/kokonutd/background-paths ─────────────
// Stroke: --color-accent at low opacity. Deterministic durations (no Math.random).

function HeroPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    // Deterministic duration: 18–30s range, varies per path
    duration: 18 + (i % 7) * 1.8,
  }))

  return (
    <div className={styles.pathsLayer} aria-hidden="true">
      <svg
        className={styles.pathsSvg}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="var(--color-accent)"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.0022}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.45, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// ─── CTA button variants — parent hover propagates to arrow child ─────────────

const ctaVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.02 },
  tap:   { scale: 0.98 },
}

const arrowVariants = {
  rest:  { x: 0 },
  hover: { x: 5, transition: springEntrance },
}

// ─── Right column entrance ────────────────────────────────────────────────────

const rightColVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, delay: 0.4 } },
}

// ─── Stats bar entrance ───────────────────────────────────────────────────────

const statsBarVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { ...springEntrance, delay: 0.65 } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className={styles.section}>
      {/* Dot grid — 2% opacity atmospheric texture */}
      <div className={styles.dotGrid} aria-hidden="true" />

      {/* Thin orange accent line — far left viewport edge */}
      <div className={styles.accentLine} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.layout}>

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className={styles.leftCol}>

            {/* Staggered entrance: eyebrow → h1 → subheadline → cta */}
            <motion.div
              className={styles.leftContent}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Eyebrow */}
              <motion.p variants={itemVariants} className={styles.eyebrow}>
                Indianapolis, IN · Strategy &amp; Technology
              </motion.p>

              {/* H1 — "in one person" in Instrument Serif italic accent */}
              <motion.h1 variants={itemVariants} className={styles.headline}>
                15 years of marketing strategy and systems architecture —{' '}
                <em className={styles.headlineAccent}>in one person</em>{', working directly with you.'}
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={itemVariants} className={styles.subheadline}>
                Jacob Darling builds the marketing infrastructure that makes small
                businesses and startups grow — strategy, technology, automation,
                and execution. No agencies. No hand-offs. Just results you can
                measure.
              </motion.p>

              {/* CTA — solid orange, sharp corners, arrow shifts on hover */}
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={ctaVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  transition={springEntrance}
                  className="inline-block"
                >
                  <Link href="/contact" className={styles.ctaButton}>
                    <span>Let&apos;s build something that works</span><motion.span variants={arrowVariants} className={styles.ctaArrow}>
                      <ArrowRight weight="regular" size={18} />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Stats bar — separate entrance with 0.65s delay */}
            <motion.div
              className={styles.statsBar}
              variants={statsBarVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — animated paths ────────────────────────────── */}
          <motion.div
            className={styles.rightCol}
            variants={rightColVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            <div className={styles.pathsContainer}>
              <HeroPaths position={1} />
              <HeroPaths position={-1} />
            </div>

            {/* Gradient fade — left edge blends paths into base color */}
            <div className={styles.pathsFade} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
