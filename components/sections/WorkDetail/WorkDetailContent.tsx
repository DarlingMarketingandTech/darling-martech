'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CaseStudy, CloudinaryAsset, Deliverable, ProcessPhase } from '@/lib/work'
import { getWorkDetailTemplate } from '@/lib/work'
import { containerVariants, itemVariants, springEntrance } from '@/lib/motion'
import styles from './WorkDetail.module.css'

const WorkAmbient = dynamic(
  () => import('@/components/3d/WorkAmbient').then((module) => module.WorkAmbient),
  {
    ssr: false,
    loading: () => null,
  }
)

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

function getParagraphs(text: string) {
  return text.split('\n\n').filter(Boolean)
}

function getLeadSentence(text: string) {
  const firstParagraph = getParagraphs(text)[0] ?? ''
  const normalized = firstParagraph.replace(/\s+/g, ' ').trim()
  const sentenceMatch = normalized.match(/^.+?[.!?](?=\s|$)/)
  const sentence = sentenceMatch?.[0] ?? normalized

  if (sentence.length <= 170) return sentence
  return `${sentence.slice(0, 167).trimEnd()}...`
}

function parseMetric(metric: string) {
  const parts = metric.match(/^([^\s]+(?:\s[^\s]+)?)\s(.+)/) || [metric, metric, '']
  return { value: parts[1], label: parts[2] || '\u00a0' }
}

function BodyCopy({ text }: { text: string }) {
  return (
    <>
      {getParagraphs(text).map((paragraph, index) => (
        <p key={index} className={styles.bodyParagraph}>
          {paragraph}
        </p>
      ))}
    </>
  )
}

function MetricBand({
  cs,
  emphasizeFirst = false,
  maxMetrics = 4,
}: {
  cs: CaseStudy
  emphasizeFirst?: boolean
  maxMetrics?: number
}) {
  const metrics = cs.metrics.slice(0, maxMetrics)
  const metricClassName =
    cs.theme?.metricStyle === 'ticker'
      ? styles.metricsTicker
      : cs.theme?.metricStyle === 'pill'
        ? styles.metricsPill
        : styles.metricsPanel
  const impactCountClassName =
    metrics.length === 4 ? styles.metricsImpactFour : metrics.length === 3 ? styles.metricsImpactThree : ''

  return (
    <FadeUp>
      <div
        className={`${styles.metricsBar} ${emphasizeFirst ? styles.metricsImpact : metricClassName} ${emphasizeFirst ? impactCountClassName : ''}`}
      >
        {metrics.map((metric, index) => {
          const parts = parseMetric(metric)

          return (
            <div
              key={metric}
              className={`${styles.metricCell} ${emphasizeFirst && index === 0 ? styles.metricCellPrimary : ''}`}
            >
              <p className={styles.metricValue}>{parts.value}</p>
              <p className={styles.metricLabel}>{parts.label}</p>
            </div>
          )
        })}
      </div>
    </FadeUp>
  )
}

function AssetStrip({
  assets,
  mediaStyle,
  maxAssets = 3,
}: {
  assets: NonNullable<CaseStudy['cloudinaryAssets']>
  mediaStyle: NonNullable<CaseStudy['theme']>['mediaStyle'] | undefined
  maxAssets?: number
}) {
  const displayAssets = assets.slice(0, maxAssets)

  return (
    <div className={`${styles.assetStrip} ${mediaStyle === 'stack' ? styles.assetStripStack : ''}`}>
      {displayAssets.map((asset) => (
        <div key={asset.publicId} className={styles.assetThumb}>
          <CldImage
            src={asset.publicId}
            alt={asset.label}
            width={360}
            height={mediaStyle === 'portrait' ? 420 : 260}
            crop="fill"
            gravity="auto"
            className={styles.assetThumbImage}
          />
        </div>
      ))}
    </div>
  )
}

function SectionBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title?: string
  children: React.ReactNode
}) {
  return (
    <FadeUp>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>{eyebrow}</p>
          {title && <h2 className={styles.sectionHeadline}>{title}</h2>}
        </div>
        {children}
      </section>
    </FadeUp>
  )
}

function ProblemVisualPanel({
  cs,
  parent,
  heroImage,
}: {
  cs: CaseStudy
  parent: CaseStudy | null
  heroImage?: string
}) {
  const fallbackAsset =
    cs.cloudinaryAssets?.find((asset) => asset.publicId !== heroImage) ??
    cs.cloudinaryAssets?.[0]
  const visualAsset: CloudinaryAsset | undefined = cs.problemVisualPublicId
    ? {
        publicId: cs.problemVisualPublicId,
        label: `${cs.client} problem visual`,
        folder: '',
      }
    : fallbackAsset

  if (visualAsset) {
    return (
      <div className={styles.problemVisualFrame}>
        <CldImage
          src={visualAsset.publicId}
          alt={visualAsset.label}
          width={880}
          height={880}
          crop="fill"
          gravity="auto"
          className={styles.problemVisualImage}
        />
      </div>
    )
  }

  return (
    <div className={styles.problemStatementCard}>
      <p className={styles.problemStatementEyebrow}>System framing</p>
      <p className={styles.problemStatementHeadline}>{cs.headline}</p>
      <p className={styles.problemStatementCopy}>{getLeadSentence(cs.challenge)}</p>
      <div className={styles.problemStatementTags}>
        {parent && <span className={styles.problemStatementTag}>Inside {parent.client}</span>}
        <span className={styles.problemStatementTag}>{cs.category}</span>
        <span className={styles.problemStatementTag}>{parseMetric(cs.metrics[0] ?? cs.client).value}</span>
      </div>
    </div>
  )
}

function ProblemSystemSection({
  cs,
  parent,
  heroImage,
  compact = false,
}: {
  cs: CaseStudy
  parent: CaseStudy | null
  heroImage?: string
  compact?: boolean
}) {
  const challengeText = compact ? getLeadSentence(cs.challenge) : cs.challenge
  const approachText = compact ? getLeadSentence(cs.approach) : cs.approach

  return (
    <FadeUp>
      <section className={`${styles.section} ${styles.problemSystemSection}`}>
        <div className={styles.problemSystemGrid}>
          <div className={styles.problemRail}>
            <div className={styles.problemRailInner}>
              <p className={styles.sectionEyebrow}>Problem / System</p>
              <h2 className={styles.problemRailHeadline}>{cs.headline}</h2>
              <p className={styles.problemRailCopy}>{getLeadSentence(cs.challenge)}</p>

              <div className={styles.problemRailMeta}>
                {parent && <span className={styles.problemRailBadge}>Inside {parent.client}</span>}
                <span className={styles.problemRailBadge}>Built for conversion</span>
              </div>

              <ProblemVisualPanel cs={cs} parent={parent} heroImage={heroImage} />
            </div>
          </div>

          <div className={styles.problemContent}>
            <div className={styles.problemCopyBlock}>
              <p className={styles.sectionEyebrow}>The Challenge</p>
              <BodyCopy text={challengeText} />
            </div>

            <div className={styles.problemCopyBlock}>
              <p className={styles.sectionEyebrow}>The Approach</p>
              <BodyCopy text={approachText} />
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  )
}

function DeliverableGrid({
  deliverables,
  isSystemPage,
}: {
  deliverables: Deliverable[]
  isSystemPage: boolean
}) {
  return (
    <motion.div
      className={`${styles.deliverableGrid} ${isSystemPage ? styles.deliverableBento : ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {deliverables.map((deliverable, index) => (
        <motion.div
          key={deliverable.title}
          variants={itemVariants}
          className={`${styles.deliverable} ${isSystemPage ? styles.deliverableBentoCard : ''} ${deliverable.emphasis === 'feature' ? styles.deliverableFeature : ''}`}
        >
          {isSystemPage && (
            <div className={styles.deliverableMeta}>
              <span className={styles.deliverableIndex}>{String(index + 1).padStart(2, '0')}</span>
              <ArrowUpRight weight="bold" size={14} className={styles.deliverableIcon} />
            </div>
          )}

          <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
          <p className={styles.deliverableDesc}>{deliverable.description}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ProcessTimeline({ process }: { process: ProcessPhase[] }) {
  return (
    <SectionBlock eyebrow="The Process" title="How the system got built">
      <div className={styles.processTimeline}>
        {process.map((phase, index) => (
          <FadeUp key={phase.label} delay={index * 0.05}>
            <div className={styles.processStep}>
              <div className={styles.processMarker}>
                <span className={styles.processNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.processLine} aria-hidden="true" />
              </div>

              <div className={styles.processContent}>
                <div className={styles.processHeading}>
                  <p className={styles.processLabel}>{phase.label}</p>
                </div>
                <p className={styles.processDesc}>{phase.description}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionBlock>
  )
}

function RelatedProjects({
  related,
  parent,
}: {
  related: CaseStudy[]
  parent: CaseStudy | null
}) {
  if (related.length === 0) return null

  return (
    <SectionBlock eyebrow={parent ? 'Related Projects' : 'Systems Built'}>
      <div className={styles.relatedGrid}>
        {related.map((study) => (
          <Link key={study.slug} href={`/work/${study.slug}`} className={styles.relatedCard}>
            <p className={styles.relatedLabel}>{study.label}</p>
            <p className={styles.relatedClient}>{study.client}</p>
            <p className={styles.relatedHeadline}>{study.headline}</p>
            <span className={styles.relatedArrow}>
              View case study
              <ArrowRight weight="regular" size={13} />
            </span>
          </Link>
        ))}
      </div>
    </SectionBlock>
  )
}

function RouteOutLinks({
  cs,
  template,
  parent,
  related,
  serviceBacklink,
}: {
  cs: CaseStudy
  template: ReturnType<typeof getWorkDetailTemplate>
  parent: CaseStudy | null
  related: CaseStudy[]
  serviceBacklink?: { href: string; label: string } | null
}) {
  const addUnique = (list: CaseStudy[], next: CaseStudy, max: number) => {
    if (list.some((s) => s.slug === next.slug)) return list
    if (list.length >= max) return list
    return [...list, next]
  }

  let picks: CaseStudy[] = []

  if (template === 'system-compact' || template === 'system-expanded') {
    const max = 3
    if (parent) picks = addUnique(picks, parent, max)
    for (const r of related) {
      picks = addUnique(picks, r, max)
      if (picks.length >= max) break
    }
  } else if (cs.slug === 'graston-technique') {
    // Keep breadth, but don’t dump the whole system catalog.
    const max = 2
    const growthEngine = related.find((r) => r.slug === 'graston-growth-engine')
    const compass = related.find((r) => r.slug === 'the-compass')
    if (growthEngine) picks = addUnique(picks, growthEngine, max)
    if (compass) picks = addUnique(picks, compass, max)
    if (picks.length < max) picks = related.slice(0, max)
  } else {
    // Flagship + supporting: 1–2 related proof links.
    const max = 2
    picks = related.slice(0, max)
  }

  return (
    <section className={styles.routeOutSection}>
      <div className={styles.routeOutInner}>
        {serviceBacklink ? (
          <p className={styles.routeOutService}>
            <span className={styles.routeOutLabel}>This build supports</span>{' '}
            <Link href={serviceBacklink.href} className={styles.routeOutServiceLink}>
              {serviceBacklink.label}
            </Link>
          </p>
        ) : (
          <p className={styles.routeOutServiceFallback}>
            <span className={styles.routeOutLabel}>Primary proof route</span> {cs.client}
          </p>
        )}

        {picks.length > 0 && (
          <div className={styles.routeOutRelated}>
            <p className={styles.routeOutRelatedLabel}>
              {cs.category === 'Healthcare' && !parent ? 'Division engagements' : 'Related proof'}
            </p>
            <div className={styles.routeOutRelatedList}>
              {picks.map((study) => (
                <Link key={study.slug} href={`/work/${study.slug}`} className={styles.routeOutRelatedLink}>
                  <span>{study.client}</span>
                  <ArrowRight weight="light" size={14} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ContactCta({ cs }: { cs: CaseStudy }) {
  return (
    <FadeUp>
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaHeadline}>
          Ready to <span className={styles.ctaAccent}>{cs.ctaLine}</span>?
        </h2>
        <p className={styles.ctaSub}>Let&apos;s talk about what that looks like.</p>

        <div className={styles.ctaActions}>
          <MagneticButton radius={120} maxPull={16}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springEntrance}
              style={{ display: 'inline-block' }}
            >
              <Link href="/contact?intent=work" className={styles.ctaBtn}>
                Let&apos;s talk
                <ArrowRight weight="regular" size={14} />
              </Link>
            </motion.div>
          </MagneticButton>

          <Link href="/work" className={styles.backLink}>
            <ArrowLeft weight="regular" size={14} />
            All work
          </Link>
        </div>
      </section>
    </FadeUp>
  )
}

function PrevNextNav({
  prev,
  next,
}: {
  prev: CaseStudy | null
  next: CaseStudy | null
}) {
  if (!prev && !next) return null

  return (
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
          <Link href={`/work/${next.slug}`} className={`${styles.prevNextCell} ${styles.prevNextRight}`}>
            <p className={styles.prevNextLabel}>Next</p>
            <p className={styles.prevNextTitle}>{next.client} →</p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </FadeUp>
  )
}

export function WorkDetailContent({
  cs,
  parent,
  related,
  serviceBacklink,
}: {
  cs: CaseStudy
  parent: CaseStudy | null
  related: CaseStudy[]
  serviceBacklink?: { href: string; label: string } | null
}) {
  const heroImage =
    cs.heroPublicId ??
    cs.cloudinaryAssets?.find((asset) => asset.publicId !== cs.logoPublicId)?.publicId ??
    cs.cloudinaryAssets?.[0]?.publicId ??
    cs.logoPublicId
  const layoutClassName =
    cs.theme?.layout === 'stacked'
      ? styles.layoutStacked
      : cs.theme?.layout === 'editorial'
        ? styles.layoutEditorial
        : styles.layoutSplit
  const derivedSystemChild = Boolean(cs.parentProjectSlug)
  let detailTemplate = getWorkDetailTemplate(cs.slug)
  // Runtime fallback: if the slug isn't explicitly mapped but it’s clearly a child,
  // it should still use compact system-child weight.
  if (derivedSystemChild && detailTemplate === 'supporting-standard') detailTemplate = 'system-compact'

  const isFlagshipLongform = detailTemplate === 'flagship-longform'
  const isSupportingStandard = detailTemplate === 'supporting-standard'
  const isSystemCompact = detailTemplate === 'system-compact'
  const isSystemExpanded = detailTemplate === 'system-expanded'
  const isSystemChildTemplate = isSystemCompact || isSystemExpanded
  const primaryProofSignal = cs.metrics[0] ?? ''
  const signalText = primaryProofSignal ? `Signal: ${primaryProofSignal}` : ''

  // Hero openings should lead with business framing:
  // problem → intervention → proof signal (system-child: system role + outcome).
  const heroHeadlineText = isSystemChildTemplate ? getLeadSentence(cs.approach) : getLeadSentence(cs.challenge)
  const heroSubheadText = isSystemChildTemplate
    ? `${getLeadSentence(cs.challenge)} ${signalText}`.trim()
    : `${getLeadSentence(cs.approach)} ${signalText}`.trim()

  const assetStripMaxAssets = isSystemCompact ? 1 : 2

  return (
    <article className={`${styles.article} ${layoutClassName}`}>
      <div className={styles.inner}>
        <section className={styles.heroShell}>
          <div className={styles.heroAmbient}>
            <WorkAmbient mode={cs.visualMode} density={cs.theme?.density ?? 'balanced'} />
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className={styles.breadcrumb}
              >
                <Link href="/work" className={styles.breadcrumbLink}>
                  Work
                </Link>
                <span className={styles.breadcrumbSep}>/</span>
                <span>{cs.client}</span>
              </motion.div>

              {parent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                >
                  <Link href={`/work/${parent.slug}`} className={styles.parentBadge}>
                    <ArrowLeft weight="regular" size={12} />
                    Part of the {parent.client} engagement
                  </Link>
                </motion.div>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className={styles.heroLabel}
              >
                {cs.label}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springEntrance, delay: 0.12 }}
                className={styles.heroClient}
              >
                {cs.client}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springEntrance, delay: 0.18 }}
                className={styles.heroHeadline}
              >
                {heroHeadlineText}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springEntrance, delay: 0.24 }}
                className={styles.heroSubhead}
              >
                {heroSubheadText}
              </motion.p>

              {!isSystemCompact && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springEntrance, delay: 0.28 }}
                  className={styles.heroChips}
                >
                  {cs.label.split('·').map((chip) => (
                    <span key={chip} className={styles.heroChip}>
                      {chip.trim()}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.18 }}
              className={styles.heroVisual}
            >
              <FloatingCard maxTilt={8} className={styles.heroVisualFrame}>
                <div className={styles.heroMediaCard}>
                  {heroImage ? (
                    <div className={styles.heroMediaPrimary}>
                      <CldImage
                        src={heroImage}
                        alt={cs.client}
                        width={960}
                        height={720}
                        crop="fill"
                        gravity="auto"
                        className={styles.heroMediaImage}
                        priority
                      />
                    </div>
                  ) : (
                    <div className={styles.heroMediaFallback}>
                      <p className={styles.heroMediaFallbackLabel}>{cs.category}</p>
                      <p className={styles.heroMediaFallbackClient}>{cs.client}</p>
                    </div>
                  )}

                  {cs.cloudinaryAssets && cs.cloudinaryAssets.length > 0 && (
                    <AssetStrip
                      assets={cs.cloudinaryAssets}
                      mediaStyle={cs.theme?.mediaStyle}
                      maxAssets={assetStripMaxAssets}
                    />
                  )}
                </div>
              </FloatingCard>
            </motion.div>
          </div>

          <MetricBand
            cs={cs}
            emphasizeFirst={isSystemExpanded}
            maxMetrics={isFlagshipLongform ? 3 : isSupportingStandard ? 2 : isSystemExpanded ? 3 : 1}
          />

          {serviceBacklink ? (
            <FadeUp>
              <p className={styles.serviceBacklink}>
                <span className={styles.serviceBacklinkLabel}>This build supports</span>{' '}
                <Link href={serviceBacklink.href} className={styles.serviceBacklinkLink}>
                  {serviceBacklink.label}
                  <ArrowUpRight weight="regular" size={12} aria-hidden />
                </Link>
              </p>
            </FadeUp>
          ) : null}
        </section>

        {isSystemCompact || isSystemExpanded ? (
          <>
            <ProblemSystemSection
              cs={cs}
              parent={parent}
              heroImage={heroImage}
              compact={isSystemCompact}
            />

            <SectionBlock eyebrow={isSystemCompact ? 'The Build' : 'What got rebuilt'}>
              <DeliverableGrid
                deliverables={isSystemCompact ? cs.deliverables.slice(0, 3) : cs.deliverables}
                isSystemPage={isSystemExpanded}
              />
            </SectionBlock>

            {isSystemExpanded && cs.process && cs.process.length > 0 && (
              <ProcessTimeline process={cs.process} />
            )}

            <SectionBlock eyebrow="The Outcome">
              <BodyCopy text={cs.outcome} />
            </SectionBlock>

            {isSystemExpanded && (
              <SectionBlock eyebrow="What This Means For You">
                <BodyCopy text={cs.whatThisMeansForYou} />
              </SectionBlock>
            )}
          </>
        ) : (
          <>
            <SectionBlock eyebrow="Why this mattered">
              <BodyCopy text={cs.challenge} />
            </SectionBlock>

            <SectionBlock eyebrow="What got rebuilt">
              <DeliverableGrid deliverables={cs.deliverables} isSystemPage={false} />
            </SectionBlock>

            <SectionBlock eyebrow={isFlagshipLongform ? 'Results and operating impact' : 'The Outcome'}>
              <BodyCopy text={cs.outcome} />
              {isFlagshipLongform && <BodyCopy text={cs.whatThisMeansForYou} />}
            </SectionBlock>
          </>
        )}

        <RouteOutLinks
          cs={cs}
          template={detailTemplate}
          parent={parent}
          related={related}
          serviceBacklink={serviceBacklink}
        />

        <ContactCta cs={cs} />
      </div>
    </article>
  )
}
