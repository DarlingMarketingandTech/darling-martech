'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { CaseStudy } from '@/lib/case-studies'
import { getAdjacentCaseStudies } from '@/lib/case-studies'
import { CaseStudyImages } from './CaseStudyImages'
import styles from './CaseStudyContent.module.css'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export function CaseStudyContent({ cs }: { cs: CaseStudy }) {
  const { prev, next } = getAdjacentCaseStudies(cs.slug)

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

        {/* Hero */}
        <div className={styles.heroGrid}>
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={styles.industryLabel}
            >
              {cs.industry}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={styles.clientName}
            >
              {cs.client}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.tagline}
            >
              {cs.tagline}
            </motion.p>
          </div>

          {/* Services sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.services}
          >
            <p className={styles.servicesLabel}>Services</p>
            <ul className={styles.servicesList}>
              {cs.services?.map((s) => (
                <li key={s} className={styles.servicesItem}>
                  <span className={styles.servicesDot} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            {cs.url && (
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.siteLink}
              >
                Visit site →
              </a>
            )}
          </motion.div>
        </div>

        {/* Results bar */}
        {cs.hero?.results && (
          <FadeUp>
            <div className={styles.resultsBar}>
              {cs.hero.results.map((r) => (
                <div key={r.label} className={styles.resultCell}>
                  <p className={styles.resultValue}>{r.value}</p>
                  <p className={styles.resultLabel}>{r.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        )}

        {/* Challenge / Solution */}
        {cs.hero && (
          <div className={styles.twoCol}>
            <FadeUp>
              <div>
                <p className={styles.sectionEyebrow}>The Challenge</p>
                <p className={styles.bodyText}>{cs.hero.challenge}</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <p className={styles.sectionEyebrow}>The Solution</p>
                <p className={styles.bodyText}>{cs.hero.solution}</p>
              </div>
            </FadeUp>
          </div>
        )}

        {/* Body content */}
        {cs.body && (
          <>
            <FadeUp>
              <div className={styles.contextBlock}>
                <p className={styles.sectionEyebrow}>Context</p>
                <p className={styles.bodyTextLg}>{cs.body.context}</p>
              </div>
            </FadeUp>

            <FadeUp>
              <div className={styles.approachBlock}>
                <p className={styles.sectionEyebrow}>Approach</p>
                <ol className={styles.approachList}>
                  {cs.body.approach.map((step, i) => (
                    <li key={i} className={styles.approachItem}>
                      <span className={styles.stepNum}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className={styles.stepText}>{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeUp>

            <FadeUp>
              <div className={styles.outcomeBlock}>
                <p className={styles.sectionEyebrow}>Outcome</p>
                <p className={styles.bodyTextLg}>{cs.body.outcome}</p>
              </div>
            </FadeUp>
          </>
        )}

        {/* Project images from Cloudinary */}
        {cs.cloudinaryFolder && <CaseStudyImages cloudinaryFolder={cs.cloudinaryFolder} />}

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <FadeUp>
            <div className={styles.prevNext}>
              {prev ? (
                <Link href={`/work/${prev.slug}`} className={styles.prevNextCell}>
                  <p className={styles.prevNextLabel}>Previous</p>
                  <p className={styles.prevNextTitle}>← {prev.client}</p>
                </Link>
              ) : (
                <div className={styles.prevNextEmpty} />
              )}
              {next ? (
                <Link href={`/work/${next.slug}`} className={`${styles.prevNextCell} ${styles.prevNextRight}`}>
                  <p className={styles.prevNextLabel}>Next</p>
                  <p className={styles.prevNextTitle}>{next.client} →</p>
                </Link>
              ) : (
                <div className={styles.prevNextEmpty} />
              )}
            </div>
          </FadeUp>
        )}

        {/* Bottom nav */}
        <FadeUp>
          <div className={styles.bottomNav}>
            <Link href="/work" className={styles.backLink}>← All work</Link>
            <Link href="/contact" className={styles.ctaBtn}>
              Start a project
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </FadeUp>

      </div>
    </article>
  )
}
