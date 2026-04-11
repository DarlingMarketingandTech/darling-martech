'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PlanetIcon } from '@phosphor-icons/react'
import LabModal from '@/components/lab/LabModal'
import { SectionHero } from '@/components/shared/SectionHero'
import { analytics } from '@/lib/analytics'
import styles from '@/app/tools/Tools.module.css'

type IframeToolSession = {
  src: string
  slug: string
  name: string
  detailHref?: string
}

type FeaturedLab = {
  slug: string
  name: string
  eyebrow: string
  whenToUse: string
  startHere?: boolean
  description: string
  primaryHref: string
  primaryLabel: string
  primaryAriaLabel: string
  aboutHref?: string
  aboutLabel?: string
  stack: string[]
  screenshot?: {
    src: string
    alt: string
  }
  stats?: { value: string; label: string }[]
}

const featuredLabs: FeaturedLab[] = [
  {
    slug: 'cmo-simulator',
    name: 'CMO Simulator',
    eyebrow: 'Start here for most teams',
    whenToUse: 'Use this first if you need a clear strategic direction before choosing channels or tools.',
    startHere: true,
    description:
      'Walk through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. Same framework I use with clients. Takes about 10 minutes.',
    primaryHref: '/tools?launch=cmo-simulator',
    primaryLabel: 'Launch simulator',
    primaryAriaLabel: 'Launch CMO Simulator',
    aboutHref: '/tools/cmo-simulator',
    aboutLabel: 'How it works',
    stack: ['Next.js', 'React', 'Vercel', 'Marketing Strategy'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_900,f_auto,q_auto/CMO_Simulator.jpg',
      alt: 'CMO Simulator interface preview',
    },
  },
  {
    slug: 'geo-readiness-auditor',
    name: 'GEO Readiness Auditor',
    eyebrow: 'AI discoverability check',
    whenToUse: 'Choose this when your site traffic is flat and you need to spot AI visibility gaps fast.',
    description:
      'Is your site visible to AI? Run a fast 0-100 GEO audit, see top issues instantly, then unlock the full prioritized fix report by email.',
    primaryHref: '/tools/geo-readiness-auditor',
    primaryLabel: 'Run audit',
    primaryAriaLabel: 'Run GEO Readiness Auditor',
    stack: ['Next.js', 'TypeScript', 'Cheerio', 'Resend'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png',
      alt: 'GEO Readiness Auditor interface preview',
    },
  },
  {
    slug: 'cmo-roadmap-generator',
    name: 'CMO Roadmap Generator',
    eyebrow: 'Execution planning',
    whenToUse: 'Choose this when you know your goals and need a prioritized plan your team can execute.',
    description:
      'Structured intake: goals, constraints, and budget reality — then a prioritized roadmap you can execute or hand to a team. Free entry, same framing I use in live engagements.',
    primaryHref: '/tools/cmo-roadmap-generator',
    primaryLabel: 'View tool',
    primaryAriaLabel: 'Open CMO Roadmap Generator',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_900,f_auto,q_auto/v1774736805/cmo-roadmap-generator-home.png',
      alt: 'CMO Roadmap Generator intake preview',
    },
  },
  {
    slug: 'attribution-snapshot',
    name: 'Attribution Snapshot',
    eyebrow: 'Channel credit clarity',
    whenToUse: 'Choose this when paid-channel reporting conflicts and you need a directional attribution read.',
    description:
      'Upload a lightweight Google Ads or Meta export, compare four attribution models, and see where channel credit stays stable versus where your reporting setup still leaves too much ambiguity.',
    primaryHref: '/tools/attribution-snapshot',
    primaryLabel: 'Open tool',
    primaryAriaLabel: 'Open Attribution Snapshot',
    stack: ['Client-side analysis', 'CSV import', 'Attribution modeling'],
    stats: [
      { value: '4', label: 'models compared' },
      { value: 'CSV', label: 'template-driven import' },
      { value: 'Fast', label: 'directional read' },
    ],
  },
]

const iframeToolBySlug: Record<string, IframeToolSession> = {
  'cmo-simulator': {
    src: '/tools/cmo-simulator?launch=1',
    slug: 'cmo-simulator',
    name: 'CMO Simulator',
    detailHref: '/tools/cmo-simulator',
  },
}

const analyticsEventBySlug: Record<string, string> = {
  'cmo-simulator': 'cmo_simulator',
  'geo-readiness-auditor': 'geo_readiness_auditor',
  'cmo-roadmap-generator': 'cmo_roadmap_generator',
  'attribution-snapshot': 'attribution_snapshot',
}

function LabFeaturedCard({
  lab,
  screenshotPriority = false,
}: {
  readonly lab: FeaturedLab
  /** First featured card image is LCP on /tools — use Next.js priority loading. */
  readonly screenshotPriority?: boolean
}) {
  const statsLength = lab.stats?.length ?? 0

  return (
    <article className={styles.featuredCard}>
      {/* Overlay link provides the primary full-card action without nesting interactive elements. */}
      <Link
        href={lab.primaryHref}
        className={styles.cardLink}
        aria-label={lab.primaryAriaLabel}
        onClick={() => {
          const event = analyticsEventBySlug[lab.slug]
          if (event) analytics.ctaClick('tools_index', event)
        }}
      >
        <span className={styles.srOnly}>{lab.name}</span>
      </Link>

      <div className={styles.featuredContent}>
      <div className={styles.featuredLeft}>
        <div>
          <div className={styles.featuredPill}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            {lab.eyebrow}
          </div>
          {lab.startHere ? (
            <p className={styles.startHereLabel}>Best first step on this page</p>
          ) : null}
          <h2 className={styles.featuredTitle}>{lab.name}</h2>
          <p className={styles.featuredDesc}>{lab.description}</p>
          <p className={styles.whenToUse}>{lab.whenToUse}</p>
          <div className={styles.featuredStack}>
            {lab.stack.map((tag) => (
              <span key={tag} className={styles.toolCoverTag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={styles.featuredFooter}>
          <span className={styles.primaryCta} aria-hidden="true">{lab.primaryLabel}</span>
          {lab.aboutHref ? (
            <Link
              href={lab.aboutHref}
              className={styles.secondaryLink}
              aria-label={`Learn how ${lab.name} works`}
            >
              {lab.aboutLabel ?? 'How it works'}
            </Link>
          ) : null}
        </div>
      </div>

      <div className={styles.featuredRight}>
        <div className={styles.featuredRightGrid} aria-hidden="true" />
        <div className={styles.featuredRightGlow} aria-hidden="true" />
        <div className={styles.featuredRightContent}>
          {lab.screenshot ? (
            <div className={styles.featuredScreenshot}>
              <Image
                src={lab.screenshot.src}
                alt={lab.screenshot.alt}
                width={900}
                height={476}
                className={styles.featuredScreenshotImg}
                unoptimized
                priority={screenshotPriority}
              />
            </div>
          ) : (
            <>
              <div className={styles.featuredIconBox}>
                <PlanetIcon weight="light" size={34} color="var(--color-accent)" />
              </div>
              {lab.stats && (
                <div className={styles.featuredStats}>
                  {lab.stats.map((stat, index) => (
                    <Fragment key={stat.label}>
                      <div className={styles.featuredStat}>
                        <div className={styles.featuredStatValue}>{stat.value}</div>
                        <div className={styles.featuredStatLabel}>{stat.label}</div>
                      </div>
                      {index < statsLength - 1 && <div className={styles.featuredStatDivider} />}
                    </Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </article>
  )
}

export default function LabPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [iframeTool, setIframeTool] = useState<IframeToolSession | null>(null)
  const [iframePayload, setIframePayload] = useState<IframeToolSession | null>(null)
  const openIframeTool = useCallback((session: IframeToolSession) => {
    setIframePayload(session)
    setIframeTool(session)
  }, [])
  const closeIframeTool = useCallback(() => setIframeTool(null), [])

  useEffect(() => {
    const launchSlug = searchParams.get('launch')
    if (!launchSlug) return

    const launchConfig = iframeToolBySlug[launchSlug]
    if (!launchConfig) return

    const launchTimer = window.setTimeout(() => {
      openIframeTool(launchConfig)
    }, 0)
    router.replace('/tools', { scroll: false })
    return () => window.clearTimeout(launchTimer)
  }, [openIframeTool, router, searchParams])

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <SectionHero
          variant="tools"
          eyebrow="Tools"
          title="Self-serve strategy that scales."
          description="Four practical utilities to diagnose, prioritize, and lock in your next marketing move. Run the tool, capture your output, and skip directly to the right conversation."
          primaryCta={{ label: 'Browse utilities', href: '/tools#visitor-utilities' }}
          secondaryCta={{ label: 'Talk through your output', href: '/contact?intent=tool' }}
          supportingContent={(
            <div className={styles.heroSupport} aria-label="How to use these tools">
              <span className={styles.heroChip}>Diagnose</span>
              <span className={styles.heroChip}>Prioritize</span>
              <span className={styles.heroChip}>Act</span>
            </div>
          )}
        />

        {/* Primary visitor utilities */}
        <section id="visitor-utilities" className={styles.featuredGrid} aria-label="Visitor utilities">
          {featuredLabs.map((lab, index) => (
            <LabFeaturedCard
              key={lab.name}
              lab={lab}
              screenshotPriority={index === 0}
            />
          ))}
        </section>
      </div>

      <section className={styles.finalCta}>
        <p>Want a second set of eyes on the output? I can convert your tool results into a practical, workplan-ready roadmap.</p>
        <Link href="/contact?intent=tool" className={styles.finalCtaBtn}>
          Turn your output into a workplan →
        </Link>
      </section>

      {iframePayload && (
        <LabModal
          isOpen={iframeTool !== null}
          onClose={closeIframeTool}
          toolSrc={iframePayload.src}
          toolName={iframePayload.name}
          toolSlug={iframePayload.slug}
          detailHref={iframePayload.detailHref}
        />
      )}
    </main>
  )
}
