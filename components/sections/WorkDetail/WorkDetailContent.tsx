'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import type { CaseStudy } from '@/lib/work'
import { containerVariants, itemVariants, springEntrance } from '@/lib/motion'
import styles from './WorkDetail.module.css'

// Sub-projects that are part of Graston
const GRASTON_SUB_SLUGS = ['the-closer', 'the-compass', 'the-fortress', 'the-launchpad']

// Graston sub-project reference data for the detail page links
const GRASTON_SUBS = [
  { slug: 'the-launchpad', label: 'Marketing Automation', client: 'The Launchpad', headline: '95% of the manual work. Gone.' },
  { slug: 'the-closer', label: 'Revenue Systems', client: 'The Closer', headline: 'High-ticket deals were dying at the invoice. I fixed the close.' },
  { slug: 'the-compass', label: 'Observability', client: 'The Compass', headline: '94% of problems resolved before anyone gets paged.' },
  { slug: 'the-fortress', label: 'Security Architecture', client: 'The Fortress', headline: 'The server your attackers never find.' },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springEntrance, delay }}
    >
      {children}
    </motion.div>
  )
}

// Split text on double-newline into paragraphs
function BodyCopy({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={styles.bodyParagraph}>
          {p}
        </p>
      ))}
    </>
  )
}

export function WorkDetailContent({
  cs,
  prev,
  next,
}: {
  cs: CaseStudy
  prev: CaseStudy | null
  next: CaseStudy | null
}) {
  const isGrastonSub = GRASTON_SUB_SLUGS.includes(cs.slug)
  const isGrastonMain = cs.slug === 'graston-technique'

  return (
    <article className={styles.article}>
      <div className={styles.inner}>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={styles.breadcrumb}
        >
          <Link href="/work" className={styles.breadcrumbLink}>Work</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>{cs.client}</span>
        </motion.div>

        {/* Graston sub-project back-link */}
        {isGrastonSub && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <Link href="/work/graston-technique" className={styles.grastonBadge}>
              <ArrowLeft weight="regular" size={12} />
              Part of the Graston Technique® engagement
            </Link>
          </motion.div>
        )}

        {/* Hero */}
        <div className={styles.heroGrid}>
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={styles.heroLabel}
            >
              {cs.label}
            </motion.p>

            {/* Logo */}
            {cs.logoPublicId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className={styles.heroLogoWrap}
              >
                <CldImage
                  src={cs.logoPublicId}
                  alt={`${cs.client} logo`}
                  width={160}
                  height={44}
                  crop="fit"
                  className={styles.heroLogoImg}
                />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.1 }}
              className={styles.heroClient}
            >
              {cs.client}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.18 }}
              className={styles.heroHeadline}
            >
              {cs.headline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.25 }}
              className={styles.heroSubhead}
            >
              {cs.subhead}
            </motion.p>
          </div>

          {/* Services sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springEntrance, delay: 0.2 }}
            className={styles.sidebar}
          >
            <p className={styles.sidebarLabel}>Services</p>
            <ul className={styles.sidebarList}>
              {cs.label.split('·').map((s) => (
                <li key={s} className={styles.sidebarItem}>
                  <span className={styles.sidebarDot} aria-hidden="true" />
                  {s.trim()}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Metrics bar */}
        <FadeUp>
          <div className={styles.metricsBar}>
            {cs.metrics.map((m) => {
              const parts = m.match(/^([^\s]+)\s(.+)/) || [m, m, '']
              return (
                <div key={m} className={styles.metricCell}>
                  <p className={styles.metricValue}>{parts[1]}</p>
                  <p className={styles.metricLabel}>{parts[2] || '\u00a0'}</p>
                </div>
              )
            })}
          </div>
        </FadeUp>

        {/* Challenge */}
        <FadeUp>
          <div className={styles.section}>
            <p className={styles.sectionEyebrow}>The Challenge</p>
            <BodyCopy text={cs.challenge} />
          </div>
        </FadeUp>

        {/* Approach */}
        <FadeUp>
          <div className={styles.section}>
            <p className={styles.sectionEyebrow}>The Approach</p>
            <BodyCopy text={cs.approach} />
          </div>
        </FadeUp>

        {/* Deliverables */}
        <FadeUp>
          <div className={styles.section}>
            <p className={styles.sectionEyebrow}>The Work</p>
            <motion.div
              className={styles.deliverableGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {cs.deliverables.map((d) => (
                <motion.div key={d.title} variants={itemVariants} className={styles.deliverable}>
                  <h3 className={styles.deliverableTitle}>{d.title}</h3>
                  <p className={styles.deliverableDesc}>{d.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </FadeUp>

        {/* Process (optional) */}
        {cs.process && cs.process.length > 0 && (
          <FadeUp>
            <div className={styles.section}>
              <p className={styles.sectionEyebrow}>The Process</p>
              <div className={styles.processList}>
                {cs.process.map((phase) => (
                  <div key={phase.label} className={styles.processPhase}>
                    <p className={styles.processLabel}>{phase.label}</p>
                    <p className={styles.processDesc}>{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {/* Outcome */}
        <FadeUp>
          <div className={styles.section}>
            <p className={styles.sectionEyebrow}>The Outcome</p>
            <BodyCopy text={cs.outcome} />
          </div>
        </FadeUp>

        {/* What This Means For You */}
        <FadeUp>
          <div className={styles.section}>
            <p className={styles.sectionEyebrow}>What This Means For You</p>
            <BodyCopy text={cs.whatThisMeansForYou} />
          </div>
        </FadeUp>

        {/* Graston sub-project cross-links */}
        {isGrastonMain && (
          <FadeUp>
            <div className={styles.section}>
              <p className={styles.sectionEyebrow}>Systems Built</p>
              <div className={styles.systemsGrid}>
                {GRASTON_SUBS.map((sub) => (
                  <Link key={sub.slug} href={`/work/${sub.slug}`} className={styles.systemCard}>
                    <p className={styles.systemLabel}>{sub.label}</p>
                    <p className={styles.systemClient}>{sub.client}</p>
                    <p className={styles.systemHeadline}>{sub.headline}</p>
                    <span className={styles.systemArrow}>View system →</span>
                  </Link>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {/* CTA */}
        <FadeUp>
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaHeadline}>
              Ready to{' '}
              <span className={styles.ctaAccent}>{cs.ctaLine}</span>?
            </h2>
            <p className={styles.ctaSub}>Let&apos;s talk about what that looks like.</p>
            <div className={styles.ctaActions}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springEntrance}
                style={{ display: 'inline-block' }}
              >
                <Link href="/contact" className={styles.ctaBtn}>
                  Let&apos;s talk
                  <ArrowRight weight="regular" size={14} />
                </Link>
              </motion.div>
              <Link href="/work" className={styles.backLink}>
                <ArrowLeft weight="regular" size={14} />
                All work
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Prev / Next */}
        {(prev || next) && (
          <FadeUp>
            <div className={styles.prevNext}>
              {prev ? (
                <Link href={`/work/${prev.slug}`} className={styles.prevNextCell}>
                  <p className={styles.prevNextLabel}>Previous</p>
                  <p className={styles.prevNextTitle}>← {prev.client}</p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className={`${styles.prevNextCell} ${styles.prevNextRight}`}
                >
                  <p className={styles.prevNextLabel}>Next</p>
                  <p className={styles.prevNextTitle}>{next.client} →</p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </FadeUp>
        )}

      </div>
    </article>
  )
}
