'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { analytics } from '@/lib/analytics'
import { itemVariants, viewport } from '@/lib/motion'
import styles from './ToolPathRail.module.css'

type ToolItem = {
  slug: string
  name: string
  stage: string
  promise: string
  output: string
  href: string
  ctaLabel: string
}

const TOOL_ITEMS: ToolItem[] = [
  {
    slug: 'cmo-simulator',
    name: 'CMO Simulator',
    stage: 'Assess',
    promise: 'Run a CMO-level decision session and expose priority gaps.',
    output: 'Strategic direction signal',
    href: '/tools/cmo-simulator?launch=1',
    ctaLabel: 'Run the session',
  },
  {
    slug: 'geo-readiness-auditor',
    name: 'GEO Readiness Auditor',
    stage: 'Prioritize',
    promise: 'See if AI search can find your business and what to fix first.',
    output: '0-100 readiness score + fix direction',
    href: '/tools/geo-readiness-auditor',
    ctaLabel: 'Get your GEO score',
  },
  {
    slug: 'cmo-roadmap-generator',
    name: 'CMO Roadmap Generator',
    stage: 'Plan',
    promise: 'Turn constraints and goals into a practical 90-day plan.',
    output: 'Prioritized roadmap draft',
    href: '/tools/cmo-roadmap-generator',
    ctaLabel: 'Build your roadmap',
  },
  {
    slug: 'attribution-snapshot',
    name: 'Attribution Snapshot',
    stage: 'Validate',
    promise: 'Compare model spread before shifting spend or channel strategy.',
    output: 'Model confidence snapshot',
    href: '/tools/attribution-snapshot',
    ctaLabel: 'Compare channel credit',
  },
]

type ToolPathRailProps = {
  mode: 'grid' | 'path'
  location: string
  eyebrow?: string
  title: string
  description: string
}

export function ToolPathRail({ mode, location, eyebrow = 'Free tools', title, description }: ToolPathRailProps) {
  if (mode === 'path') {
    return (
      <section className={styles.section} aria-label="Guided tool path">
        <div className={styles.inner}>
          <motion.p className={styles.eyebrow} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
            {eyebrow}
          </motion.p>
          <motion.h2 className={styles.title} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
            {title}
          </motion.h2>
          <motion.p className={styles.description} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
            {description}
          </motion.p>

          <ol className={styles.pathList}>
            {TOOL_ITEMS.slice(0, 3).map((tool, index) => (
              <li key={tool.slug} className={styles.pathItem}>
                <span className={styles.pathStep}>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.pathStage}>{tool.stage}</p>
                <p className={styles.pathName}>{tool.name}</p>
                <p className={styles.pathBody}>{tool.promise}</p>
                <Link
                  href={tool.href}
                  className={styles.pathLink}
                  onClick={() => analytics.ctaClick(location, tool.slug)}
                >
                  {tool.ctaLabel}
                  <ArrowRightIcon size={14} weight="light" />
                </Link>
              </li>
            ))}
            <li className={styles.pathItem}>
              <span className={styles.pathStep}>04</span>
              <p className={styles.pathStage}>Talk</p>
              <p className={styles.pathName}>Context-ready conversation</p>
              <p className={styles.pathBody}>Bring the output and the decision point you are stuck on. I will map the right next move.</p>
              <Link
                href="/contact?intent=tool"
                className={styles.pathLink}
                onClick={() => analytics.ctaClick(location, 'tool_contact')}
              >
                Turn output into a plan
                <ArrowRightIcon size={14} weight="light" />
              </Link>
            </li>
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} aria-label="Choose your tool starting point">
      <div className={styles.inner}>
        <motion.p className={styles.eyebrow} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
          {eyebrow}
        </motion.p>
        <motion.h2 className={styles.title} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
          {title}
        </motion.h2>
        <motion.p className={styles.description} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
          {description}
        </motion.p>

        <div className={styles.grid}>
          {TOOL_ITEMS.map((tool, index) => (
            <article key={tool.slug} className={`${styles.card} ${index === 0 ? styles.cardWide : ''}`}>
              <div className={styles.cardTop}>
                <span className={styles.stagePill}>{tool.stage}</span>
                <span className={styles.outputLabel}>{tool.output}</span>
              </div>
              <h3 className={styles.cardTitle}>{tool.name}</h3>
              <p className={styles.cardBody}>{tool.promise}</p>
              <Link
                href={tool.href}
                className={styles.cardLink}
                onClick={() => analytics.ctaClick(location, tool.slug)}
              >
                {tool.ctaLabel}
                <ArrowRightIcon size={14} weight="light" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
