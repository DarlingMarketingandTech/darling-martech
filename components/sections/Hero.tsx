'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { containerVariants, itemVariants, springEntrance } from '@/lib/motion'
import { KineticHeadline } from '@/components/motion/KineticHeadline'
import { StatCounter } from '@/components/motion/StatCounter'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useFinePointer } from '@/hooks/useFinePointer'
import styles from './Hero.module.css'

// Lazy-load the 3D canvas — never blocks initial render
const HeroBackground = dynamic(
  () => import('@/components/3d/HeroBackground').then((m) => m.HeroBackground),
  {
    ssr: false,
    loading: () => null,
  }
)

// ── CTA arrow variants — parent hover propagates ──────────────────────────────

const ctaVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.02 },
  tap:   { scale: 0.98 },
}

const arrowVariants = {
  rest:  { x: 0 },
  hover: { x: 6, transition: springEntrance },
}

// ── Stats bar entrance ────────────────────────────────────────────────────────

const statsBarVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { ...springEntrance, delay: 0.65 } },
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const scrollProgress = useRef(0)
  const [interactiveTarget, setInteractiveTarget] = useState<string | null>(null)
  const isFinePointer = useFinePointer()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    scrollProgress.current = latest
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized -1 to 1 for 3D camera rig
      mouseX.current = (e.clientX / globalThis.window.innerWidth) * 2 - 1
      mouseY.current = -(e.clientY / globalThis.window.innerHeight) * 2 + 1
    }

    globalThis.window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => globalThis.window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* ── 3D canvas — lazy loaded, behind everything ── */}
      <HeroBackground
        mouseX={mouseX}
        mouseY={mouseY}
        scrollProgress={scrollProgress}
        interactiveTarget={isFinePointer ? interactiveTarget : null}
      />

      {/* ── Dot grid — 2% opacity atmospheric texture ── */}
      <div className={styles.dotGrid} aria-hidden="true" />

      {/* ── Thin orange accent line — far left edge ── */}
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

              {/* KineticHeadline — word-by-word 3D entrance */}
              <motion.div variants={itemVariants}>
                <KineticHeadline
                  accentPhrase="in one person"
                  className={styles.heroHeadline}
                >
                  {`15 years of marketing strategy and systems architecture — in one person, working directly with you.`}
                </KineticHeadline>
              </motion.div>

              {/* Subheadline */}
              <motion.p variants={itemVariants} className={styles.subheadline}>
                Jacob Darling builds the marketing infrastructure that makes small
                businesses and startups grow — strategy, technology, automation,
                and execution. No agencies. No hand-offs. Just results you can
                measure.
              </motion.p>

              {/* CTA — magnetic hover + spring scale */}
              <motion.div variants={itemVariants}>
                <MagneticButton radius={120} maxPull={16}>
                  <motion.div
                    variants={ctaVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    transition={springEntrance}
                    style={{ display: 'inline-block' }}
                  >
                    <Link
                      href="/contact"
                      className={styles.ctaButton}
                      onMouseEnter={() => setInteractiveTarget('hero-cta')}
                      onMouseLeave={() => setInteractiveTarget(null)}
                      onFocus={() => setInteractiveTarget('hero-cta')}
                      onBlur={() => setInteractiveTarget(null)}
                    >
                      <span>Let&apos;s build something that works</span>
                      <motion.span variants={arrowVariants} className={styles.ctaArrow}>
                        <ArrowRightIcon weight="regular" size={18} />
                      </motion.span>
                    </Link>
                  </motion.div>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Stats bar — animated counters, separate delayed entrance */}
            <motion.div
              className={styles.statsBar}
              variants={statsBarVariants}
              initial="hidden"
              animate="visible"
              onMouseEnter={() => setInteractiveTarget('hero-stats')}
              onMouseLeave={() => setInteractiveTarget(null)}
            >
              <StatCounter value={15}    suffix="+"  label="Years Experience"    delay={0.7} />
              <StatCounter value={400}   suffix="+"  label="Automations Built"   delay={0.85} />
              <StatCounter value={30}    suffix="k+" label="Users Served"        delay={1} />
              <StatCounter value={40}    suffix="%"  label="Avg Conversion Lift" delay={1.15} />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — animated paths (kept as visual accent) ────── */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            aria-hidden="true"
          >
            <div className={styles.pathsContainer}>
              <HeroPaths position={1} />
              <HeroPaths position={-1} />
            </div>
            <div className={styles.pathsFade} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ── SVG path accent (kept from original — now layered behind 3D) ──────────────

function HeroPaths({ position }: Readonly<{ position: number }>) {
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
