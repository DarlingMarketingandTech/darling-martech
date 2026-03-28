'use client'

import Link from 'next/link'
import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import { SERVICE_TAGS, INDUSTRY_TAGS } from '@/data/taxonomy'
import { workIndex } from '@/data/work/work-index'
import type { ServicePageEntry } from '@/data/services'
import styles from './ServiceDetail.module.css'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : inView ? { opacity: 1, y: 0 } : undefined}
      transition={reduceMotion ? { duration: 0 } : { ...springEntrance, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ServiceDetailPage({ service }: { service: ServicePageEntry }) {
  const primaryCtaLabel = service.primaryCtaLabel ?? 'Request a MarTech Audit'
  const secondaryCtaLabel = service.secondaryCtaLabel ?? 'See the work'
  const secondaryCtaHref = service.secondaryCtaHref ?? '/work'
  const relatedWork = useMemo(
    () =>
      (service.proofWorkSlugs ?? [])
        .map((slug) => workIndex.find((item) => item.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [service.proofWorkSlugs]
  )

  return (
    <main className={styles.page}>
      <div className={styles.backNav}>
        <Link href="/services" className={styles.backLink}>
          <ArrowLeft weight="regular" size={14} />
          All services
        </Link>
      </div>

      <section className={styles.hero}>
        <FadeUp>
          <p className={styles.eyebrow}>{service.eyebrow}</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1 className={styles.headline}>{service.title}</h1>
        </FadeUp>
        {service.tagline && (
          <FadeUp delay={0.1}>
            <p className={styles.tagline}>{service.tagline}</p>
          </FadeUp>
        )}
        <FadeUp delay={0.15}>
          <p className={styles.summary}>{service.summary}</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <MagneticButton>
            <Link href="/contact" className={styles.heroCta}>
              {primaryCtaLabel}
              <ArrowRight weight="regular" size={16} />
            </Link>
          </MagneticButton>
        </FadeUp>
      </section>

      {service.proofStats?.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Audit snapshot</h2>
          </FadeUp>
          <div className={styles.statsGrid}>
            {service.proofStats.map((stat, index) => (
              <FadeUp key={stat.label} delay={index * 0.05}>
                <article className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <p className={styles.statLabel}>{stat.label}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <FadeUp>
          <h2 className={styles.sectionLabel}>What&apos;s included</h2>
        </FadeUp>
        <motion.ul
          className={styles.deliverables}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {service.deliverables.map((item) => (
            <motion.li key={item} className={styles.deliverable} variants={itemVariants}>
              <CheckCircle weight="fill" size={18} className={styles.checkIcon} aria-hidden />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <section className={styles.section}>
        <FadeUp>
          <h2 className={styles.sectionLabel}>Proof it works</h2>
        </FadeUp>
        <div className={styles.proofGrid}>
          {service.proof.map((proof, index) => (
            <FadeUp key={proof.label} delay={index * 0.07}>
              <Link href={proof.href} className={styles.proofCard}>
                <span className={styles.proofMetric}>{proof.metric}</span>
                <span className={styles.proofSignal}>{proof.signalLabel}</span>
                <p className={styles.proofResult}>{proof.result}</p>
                <span className={styles.proofClient}>
                  {proof.label}
                  <ArrowUpRight weight="regular" size={13} />
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {relatedWork.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Related case studies</h2>
          </FadeUp>
          <div className={styles.relatedGrid}>
            {relatedWork.map((item, index) => (
              <FadeUp key={item.slug} delay={index * 0.05}>
                <Link href={`/work/${item.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedClient}>{item.client}</span>
                  <h3 className={styles.relatedHeadline}>{item.headline}</h3>
                  <p className={styles.relatedMetrics}>{item.metrics.join(' · ')}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.tagRow}>
          {service.serviceIds.map((id) => (
            <span key={id} className={styles.tag}>
              {SERVICE_TAGS[id]}
            </span>
          ))}
          {service.industryIds?.map((id) => (
            <span key={id} className={`${styles.tag} ${styles.tagIndustry}`}>
              {INDUSTRY_TAGS[id]}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.ctaStrip}>
        <FadeUp>
          <h2 className={styles.ctaHeadline}>Ready to get started?</h2>
          <p className={styles.ctaBody}>
            I work with a small number of clients at a time. Every engagement gets my full attention.
          </p>
          <div className={styles.ctaButtons}>
            <MagneticButton>
              <Link href="/contact" className={styles.ctaPrimary}>
                {primaryCtaLabel}
                <ArrowRight weight="regular" size={16} />
              </Link>
            </MagneticButton>
            <Link href={secondaryCtaHref} className={styles.ctaSecondary}>
              {secondaryCtaLabel}
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
