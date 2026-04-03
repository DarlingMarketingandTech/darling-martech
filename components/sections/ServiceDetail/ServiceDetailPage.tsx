'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Warning, Plus, Minus } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { analytics } from '@/lib/analytics'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import { SERVICE_TAGS, INDUSTRY_TAGS } from '@/data/taxonomy'
import { workIndex } from '@/data/work/work-index'
import { allServicePages, serviceDetails, type ServicePageEntry, type ProofTool, type FaqItem } from '@/data/services'
import styles from './ServiceDetail.module.css'

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <FadeUp delay={index * 0.05}>
      <div className={styles.faqItem}>
        <button
          className={styles.faqQuestion}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{item.q}</span>
          {open ? (
            <Minus weight="regular" size={16} aria-hidden className={styles.faqIcon} />
          ) : (
            <Plus weight="regular" size={16} aria-hidden className={styles.faqIcon} />
          )}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className={styles.faqAnswerWrapper}
            >
              <p className={styles.faqAnswer}>{item.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

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

type DiagnosticToolRecommendation = {
  label: string
  description: string
  href: string
  slug: string
}

const diagnosticToolByServiceId: Record<string, DiagnosticToolRecommendation> = {
  strategy: {
    label: 'CMO Simulator',
    description: 'Run a CMO-level decision session before committing to scope.',
    href: '/tools/cmo-simulator?launch=1',
    slug: 'cmo-simulator',
  },
  'fractional-cmo': {
    label: 'CMO Simulator',
    description: 'Pressure-test priorities, budget, and channel focus in one session.',
    href: '/tools/cmo-simulator?launch=1',
    slug: 'cmo-simulator',
  },
  'martech-audit': {
    label: 'CMO Roadmap Generator',
    description: 'Turn strategic inputs into a practical 90-day plan draft.',
    href: '/tools',
    slug: 'cmo-roadmap-generator',
  },
  systems: {
    label: 'Attribution Snapshot',
    description: 'See where measurement confidence breaks before systems work starts.',
    href: '/tools/attribution-snapshot',
    slug: 'attribution-snapshot',
  },
  'crm-architecture': {
    label: 'Attribution Snapshot',
    description: 'Validate model spread and reporting confidence before CRM changes.',
    href: '/tools/attribution-snapshot',
    slug: 'attribution-snapshot',
  },
  growth: {
    label: 'GEO Readiness Auditor',
    description: 'Get a visibility score and prioritized GEO fixes in minutes.',
    href: '/tools/geo-readiness-auditor',
    slug: 'geo-readiness-auditor',
  },
  'local-seo': {
    label: 'GEO Readiness Auditor',
    description: 'Check discoverability issues before investing in more SEO execution.',
    href: '/tools/geo-readiness-auditor',
    slug: 'geo-readiness-auditor',
  },
  'geo-optimization': {
    label: 'GEO Readiness Auditor',
    description: 'See AI visibility gaps and route fixes into your roadmap quickly.',
    href: '/tools/geo-readiness-auditor',
    slug: 'geo-readiness-auditor',
  },
}

export function ServiceDetailPage({ service }: { service: ServicePageEntry }) {
  const primaryCtaLabel = service.primaryCtaLabel ?? 'Request a MarTech Audit'
  const secondaryCtaLabel = service.secondaryCtaLabel ?? 'See the work'
  const secondaryCtaHref = service.secondaryCtaHref ?? '/work'
  const proofTools = service.proofTools ?? []

  // Build a filtered work link when the secondary CTA points to /work
  const workHref = useMemo(() => {
    if (secondaryCtaHref !== '/work') return secondaryCtaHref
    const primaryTag = service.serviceIds[0]
    return primaryTag ? `/work?service=${primaryTag}` : '/work'
  }, [secondaryCtaHref, service.serviceIds])

  const relatedWork = useMemo(
    () =>
      (service.proofWorkSlugs ?? [])
        .map((slug) => workIndex.find((item) => item.slug === slug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [service.proofWorkSlugs]
  )

  const relatedServices = useMemo(
    () =>
      (service.relatedServiceSlugs ?? [])
        .map((slug) => allServicePages.find((s) => s.id === slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [service.relatedServiceSlugs]
  )

  const childServices = useMemo(
    () =>
      service.kind === 'parent'
        ? (service.childServiceSlugs ?? [])
            .map((slug) => allServicePages.find((s) => s.id === slug))
            .filter((s): s is NonNullable<typeof s> => Boolean(s))
        : [],
    [service]
  )

  const parentService = useMemo(() => {
    if (service.kind !== 'standalone') return null
    const candidates = serviceDetails.filter((p) => p.childServiceSlugs?.includes(service.id))
    if (!candidates.length) return null
    const byLayer = candidates.find((p) => p.layer === service.layer)
    return byLayer ?? candidates[0]
  }, [service.id, service.kind, service.layer])

  const diagnosticTool = useMemo<DiagnosticToolRecommendation>(() => {
    if (diagnosticToolByServiceId[service.id]) return diagnosticToolByServiceId[service.id]
    const fallbackByLayer: Record<ServicePageEntry['layer'], DiagnosticToolRecommendation> = {
      strategy: {
        label: 'CMO Simulator',
        description: 'Run a strategic decision session to sharpen priorities before scope.',
        href: '/tools/cmo-simulator?launch=1',
        slug: 'cmo-simulator',
      },
      build: {
        label: 'CMO Roadmap Generator',
        description: 'Build a practical plan you can execute or bring into engagement.',
        href: '/tools',
        slug: 'cmo-roadmap-generator',
      },
      growth: {
        label: 'GEO Readiness Auditor',
        description: 'Start with a visibility diagnostic before investing in channel expansion.',
        href: '/tools/geo-readiness-auditor',
        slug: 'geo-readiness-auditor',
      },
    }
    return fallbackByLayer[service.layer]
  }, [service.id, service.layer])

  return (
    <main className={styles.page}>
      <div className={styles.backNav}>
        <Link href="/services" className={styles.backLink}>
          <ArrowLeft weight="regular" size={14} />
          All services
        </Link>
        {parentService && (
          <Link href={`/services/${parentService.id}`} className={styles.parentLink}>
            Part of {parentService.eyebrow}
            <ArrowUpRight weight="regular" size={12} />
          </Link>
        )}
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
            <Link href="/contact?intent=service" className={styles.heroCta}>
              {primaryCtaLabel}
              <ArrowRight weight="regular" size={16} />
            </Link>
          </MagneticButton>
        </FadeUp>
      </section>

      {service.pricingSignal && (
        <FadeUp delay={0.25}>
          <div className={styles.pricingSignal}>
            <span className={styles.pricingSignalLabel}>Typical investment</span>
            <span className={styles.pricingSignalValue}>{service.pricingSignal}</span>
          </div>
        </FadeUp>
      )}

      <section className={styles.section} aria-label="Diagnose before engagement">
        <FadeUp delay={0.27}>
          <div className={styles.diagnosticCard}>
            <div>
              <p className={styles.diagnosticLabel}>Diagnose before engagement</p>
              <h2 className={styles.diagnosticTitle}>Try {diagnosticTool.label} first.</h2>
              <p className={styles.diagnosticBody}>{diagnosticTool.description}</p>
            </div>
            <Link
              href={diagnosticTool.href}
              className={styles.diagnosticCta}
              onClick={() => analytics.ctaClick(`service_detail_${service.id}`, diagnosticTool.slug)}
            >
              Launch tool
              <ArrowRight weight="regular" size={14} />
            </Link>
          </div>
        </FadeUp>
      </section>

      {service.supportImagePublicId && service.supportImageAlt ? (
        <section className={styles.section} aria-label="Proof preview">
          <FadeUp delay={0.28}>
            <figure className={styles.proofVisual}>
              <div className={styles.proofVisualFrame}>
                <CldImage
                  src={service.supportImagePublicId}
                  alt={service.supportImageAlt}
                  width={1200}
                  height={675}
                  sizes="(max-width: 768px) 100vw, min(960px, 92vw)"
                  crop="fill"
                  gravity="auto"
                  className={styles.proofVisualImage}
                />
              </div>
              {service.supportImageCaption ? (
                <figcaption className={styles.proofVisualCaption}>{service.supportImageCaption}</figcaption>
              ) : null}
              {service.supportImageWorkSlug ? (
                <Link
                  href={`/work/${service.supportImageWorkSlug}`}
                  className={styles.proofVisualLink}
                >
                  View case study
                  <ArrowUpRight weight="regular" size={14} aria-hidden />
                </Link>
              ) : null}
            </figure>
          </FadeUp>
        </section>
      ) : null}

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

      {service.signsYouNeedIt?.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Signs you need this</h2>
          </FadeUp>
          <motion.ul
            className={styles.signsList}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {service.signsYouNeedIt.map((item) => (
              <motion.li key={item} className={styles.signsItem} variants={itemVariants}>
                <Warning weight="fill" size={16} className={styles.signsIcon} aria-hidden />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      ) : null}

      <section className={styles.section}>
        <FadeUp>
          <h2 className={styles.sectionLabel}>What this usually includes</h2>
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

      {service.faqItems?.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Common questions</h2>
          </FadeUp>
          <div className={styles.faqList}>
            {service.faqItems.map((item, index) => (
              <FaqAccordionItem key={item.q} item={item} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <FadeUp>
          <h2 className={styles.sectionLabel}>Related proof</h2>
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

      {proofTools.length > 0 ? (
        <section className={styles.section}>
          {proofTools.map((tool: ProofTool) => (
            <FadeUp key={tool.labSlug}>
              <div className={styles.geoAuditCard}>
                {tool.imagePublicId && (
                  <div className={styles.geoAuditMedia}>
                    <Image
                      src={`https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/${tool.imagePublicId}.png`}
                      alt={tool.imageAlt ?? `${tool.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className={styles.geoAuditImage}
                      unoptimized
                    />
                  </div>
                )}
                <div className={styles.geoAuditContent}>
                  <p className={styles.geoAuditEyebrow}>{tool.eyebrow}</p>
                  <h3 className={styles.geoAuditTitle}>{tool.title}</h3>
                  <p className={styles.geoAuditBody}>{tool.body}</p>
                  <div className={styles.geoAuditActions}>
                    {tool.externalCtaHref.startsWith('/') ? (
                      <Link href={tool.externalCtaHref} className={styles.geoAuditPrimary}>
                        {tool.externalCtaLabel}
                        <ArrowRight weight="regular" size={15} />
                      </Link>
                    ) : (
                      <a
                        href={tool.externalCtaHref}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.geoAuditPrimary}
                      >
                        {tool.externalCtaLabel}
                        <ArrowUpRight weight="regular" size={15} />
                      </a>
                    )}
                    {tool.internalCtaLabel && (
                      <Link href={`/tools/${tool.labSlug}`} className={styles.geoAuditSecondary}>
                        {tool.internalCtaLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </section>
      ) : null}

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

      {childServices.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Featured offers in this service</h2>
          </FadeUp>
          <div className={styles.relatedServicesGrid}>
            {childServices.map((child, index) => (
              <FadeUp key={child.id} delay={index * 0.05}>
                <Link href={child.routePath ?? `/services/${child.id}`} className={styles.relatedServiceCard}>
                  <span className={styles.relatedServiceEyebrow}>{child.eyebrow}</span>
                  <h3 className={styles.relatedServiceTitle}>{child.title}</h3>
                  <span className={styles.relatedServiceCta}>
                    View offer
                    <ArrowUpRight weight="regular" size={13} />
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>
      ) : null}

      {relatedServices.length ? (
        <section className={styles.section}>
          <FadeUp>
            <h2 className={styles.sectionLabel}>Related services</h2>
          </FadeUp>
          <div className={styles.relatedServicesGrid}>
            {relatedServices.map((s, index) => (
              <FadeUp key={s.id} delay={index * 0.05}>
                <Link href={s.routePath ?? `/services/${s.id}`} className={styles.relatedServiceCard}>
                  <span className={styles.relatedServiceEyebrow}>{s.eyebrow}</span>
                  <h3 className={styles.relatedServiceTitle}>{s.title}</h3>
                  <span className={styles.relatedServiceCta}>
                    Explore
                    <ArrowUpRight weight="regular" size={13} />
                  </span>
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
              <Link href="/contact?intent=service" className={styles.ctaPrimary}>
                {primaryCtaLabel}
                <ArrowRight weight="regular" size={16} />
              </Link>
            </MagneticButton>
            <Link href={workHref} className={styles.ctaSecondary}>
              {secondaryCtaLabel}
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}
