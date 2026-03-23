'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { getAllWork } from '@/data/work/work-data'
import { containerVariants, itemVariants, fadeVariants, viewport, springStandard, springEntrance } from '@/lib/motion'
import styles from './CaseStudies.module.css'

const featuredTeasers = [
  {
    slug: 'primarycare-indy',
    description: 'Independent clinic positioning, patient intake clarity, and local search infrastructure that made the practice competitive with major health systems.',
  },
  {
    slug: 'hoosier-boy-barbershop',
    description: 'Indiana-rooted brand identity, booking experience, and local discovery system built to win without paid media.',
  },
  {
    slug: 'behr-pet-essentials',
    description: 'Infographic-first product education and direct-response content that turned complexity into conversion.',
  },
  {
    slug: 'primary-colours',
    description: 'Sponsorship architecture and exhibition marketing that turned a community event into a real revenue engine.',
  },
  {
    slug: 'russell-painting',
    description: 'Trust-led web architecture and local SEO that made a legacy reputation visible online.',
  },
] as const

const caseStudies = featuredTeasers
  .map((teaser, index) => {
    const study = getAllWork().find((item) => item.slug === teaser.slug)
    if (!study) return null

    return {
      num: String(index + 1).padStart(2, '0'),
      client: study.client,
      industry: study.label.split('·')[0]?.trim() ?? study.category,
      stat: study.metrics[0],
      description: teaser.description,
      slug: study.slug,
    }
  })
  .filter((study): study is NonNullable<typeof study> => Boolean(study))

const rowVariants = {
  rest: {
    backgroundColor: 'rgba(0,0,0,0)',
    transition: springStandard,
  },
  hover: {
    backgroundColor: 'var(--color-surface)',
    transition: springStandard,
  },
}

const borderVariants = {
  rest: { scaleY: 0, transition: springStandard },
  hover: { scaleY: 1, transition: springStandard },
}

const arrowVariants = {
  rest: { x: 0, opacity: 0.45, transition: springStandard },
  hover: { x: 4, opacity: 1, transition: springStandard },
}

const MotionLink = motion(Link)

export function CaseStudies() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={fadeVariants} className={styles.label}>
            Selected Work
          </motion.p>
          <motion.h2 variants={itemVariants} className={styles.heading}>
            Work that proves the point.
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.subheading}>
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s what
            strategy and execution look like when the same person does both.
          </motion.p>
        </motion.div>

        {/* Case study list */}
        <motion.ul
          className={styles.list}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {caseStudies.map((cs) => (
            <motion.li key={cs.client} variants={itemVariants}>
              <MotionLink
                href={`/work/${cs.slug}`}
                className={styles.row}
                initial="rest"
                whileHover="hover"
                variants={rowVariants}
              >
                {/* Orange left border — scaleY reveal from center */}
                <motion.span
                  className={styles.rowBorder}
                  variants={borderVariants}
                  style={{ originY: 0.5 }}
                />

                {/* Decorative sequential number */}
                <span className={styles.number} aria-hidden="true">
                  {cs.num}
                </span>

                {/* Info block */}
                <div className={styles.info}>
                  <span className={styles.clientName}>{cs.client}</span>
                  <span className={styles.industry}>{cs.industry}</span>
                  <p className={styles.description}>{cs.description}</p>
                </div>

                {/* Stat + arrow */}
                <div className={styles.statGroup}>
                  <span className={styles.stat}>{cs.stat}</span>
                  <motion.span variants={arrowVariants} className={styles.arrowWrap}>
                    <ArrowRight size={18} weight="regular" />
                  </motion.span>
                </div>
              </MotionLink>
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer CTA */}
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <Link href="/work" className={styles.cta}>
            See all work
            <ArrowRight size={15} weight="regular" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
