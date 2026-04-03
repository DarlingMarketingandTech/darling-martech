'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Fragment, useCallback, useState } from 'react'
import { PlanetIcon } from '@phosphor-icons/react'
import LabModal from '@/components/lab/LabModal'
import { containerVariants, itemVariants, fadeVariants } from '@/lib/motion'
import styles from '@/app/tools/Tools.module.css'

const LabTelemetryScene = dynamic(
  () => import('@/components/3d/LabTelemetryScene').then((module) => module.LabTelemetryScene),
  {
    ssr: false,
    loading: () => null,
  }
)

type IframeToolSession = {
  src: string
  slug: string
  name: string
}

type FeaturedLab = {
  name: string
  description: string
  ctaLabel: string
  stack: string[]
  href?: string
  external?: boolean
  iframeLaunch?: { src: string; slug: string }
  screenshot?: {
    src: string
    alt: string
  }
  stats?: { value: string; label: string }[]
  /** Short label in the hero pill — distinguishes visitor utilities from the grid below. */
  pill?: string
}

const featuredLabs: FeaturedLab[] = [
  {
    name: 'CMO Simulator',
    pill: 'Visitor utility',
    description:
      'Walk through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. Same framework I use with clients. Takes about 10 minutes.',
    href: '/tools/cmo-simulator?launch=1',
    ctaLabel: 'Launch CMO Simulator →',
    stack: ['Next.js', 'React', 'Vercel', 'Marketing Strategy'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_900,f_auto,q_auto/CMO_Simulator.jpg',
      alt: 'CMO Simulator interface preview',
    },
  },
  {
    name: 'GEO Readiness Auditor',
    pill: 'Visitor utility',
    description:
      'Is your site visible to AI? Run a fast 0-100 GEO audit, see top issues instantly, then unlock the full prioritized fix report by email.',
    href: '/tools/geo-readiness-auditor',
    ctaLabel: 'Run free GEO audit →',
    stack: ['Next.js', 'TypeScript', 'Cheerio', 'Resend'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png',
      alt: 'GEO Readiness Auditor interface preview',
    },
  },
  {
    name: 'CMO Roadmap Generator',
    pill: 'Visitor utility',
    description:
      'Structured intake: goals, constraints, and budget reality — then a prioritized roadmap you can execute or hand to a team. Free entry, same framing I use in live engagements.',
    iframeLaunch: {
      src: 'https://cmo-roadmap-generator.vercel.app/intake',
      slug: 'cmo-roadmap-generator',
    },
    ctaLabel: 'Build your roadmap →',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_900,f_auto,q_auto/v1774736805/cmo-roadmap-generator-home.png',
      alt: 'CMO Roadmap Generator intake preview',
    },
  },
]

function LabFeaturedCard({
  lab,
  onOpenIframe,
  screenshotPriority = false,
}: {
  readonly lab: FeaturedLab
  readonly onOpenIframe: (session: IframeToolSession) => void
  /** First featured card image is LCP on /tools — use Next.js priority loading. */
  readonly screenshotPriority?: boolean
}) {
  const statsLength = lab.stats?.length ?? 0
  const launch = lab.iframeLaunch

  return (
    <div className={styles.featuredCard}>
      <div className={styles.featuredLeft}>
        <div>
          <div className={styles.featuredPill}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            {lab.pill ?? 'Production · Featured'}
          </div>
          <h2 className={styles.featuredTitle}>{lab.name}</h2>
          <p className={styles.featuredDesc}>{lab.description}</p>
          <div className={styles.featuredStack}>
            {lab.stack.map((tag) => (
              <span key={tag} className={styles.toolCoverTag}>{tag}</span>
            ))}
          </div>
        </div>
        {launch ? (
          <button
            type="button"
            className={styles.featuredCta}
            onClick={() => onOpenIframe({ src: launch.src, slug: launch.slug, name: lab.name })}
          >
            {lab.ctaLabel}
          </button>
        ) : (
          <Link
            href={lab.href!}
            className={styles.featuredCta}
            {...(lab.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {lab.ctaLabel}
          </Link>
        )}
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
  )
}

export default function LabPage() {
  const [iframeTool, setIframeTool] = useState<IframeToolSession | null>(null)
  const [iframePayload, setIframePayload] = useState<IframeToolSession | null>(null)
  const openIframeTool = useCallback((session: IframeToolSession) => {
    setIframePayload(session)
    setIframeTool(session)
  }, [])
  const closeIframeTool = useCallback(() => setIframeTool(null), [])

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <section className={styles.telemetryPanel}>
          <LabTelemetryScene
            activeCategory="All"
            hoveredTool={null}
            intensity="balanced"
          />

          <motion.div className={styles.headerWrap} variants={containerVariants} initial="hidden" animate="visible">
          <motion.p variants={fadeVariants} className={styles.eyebrow}>Tools</motion.p>
          <motion.h1 variants={itemVariants} className={styles.headline}>
            self-serve strategy that scales.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.subheadline}>
            Three practical utilities to diagnose, prioritize, and lock in your next marketing move. Run the tool, capture your output, and skip directly to the right conversation.
            </motion.p>
          </motion.div>
        </section>

        {/* Primary visitor utilities */}
        <section className={styles.featuredGrid} aria-label="Visitor utilities">
          {featuredLabs.map((lab, index) => (
            <LabFeaturedCard
              key={lab.name}
              lab={lab}
              onOpenIframe={openIframeTool}
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
        />
      )}
    </main>
  )
}
