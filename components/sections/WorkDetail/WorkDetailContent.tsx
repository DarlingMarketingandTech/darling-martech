'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { CaseStudy, CloudinaryAsset, Deliverable, FlagshipProofModule, ProcessPhase } from '@/lib/work'
import { getWorkDetailTemplate } from '@/lib/work'
import { getProjectMedia } from '@/lib/media/getProjectMedia'
import { getBrandDnaProfile } from '@/data/work/brand-dna'
import type { MediaAsset } from '@/data/assets/types'
import { containerVariants, itemVariants, springEntrance } from '@/lib/motion'
import { analytics } from '@/lib/analytics'
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

function MappedMediaGrid({
  assets,
  maxAssets = 4,
  portrait = false,
}: {
  assets: MediaAsset[]
  maxAssets?: number
  portrait?: boolean
}) {
  const displayAssets = assets.slice(0, maxAssets)
  if (displayAssets.length === 0) return null

  return (
    <div className={`${styles.narrativeMediaGrid} ${portrait ? styles.narrativeMediaGridPortrait : ''}`}>
      {displayAssets.map((asset) => (
        <figure key={asset.publicId} className={styles.narrativeMediaCard}>
          <div className={styles.narrativeMediaImageFrame}>
            <CldImage
              src={asset.publicId}
              alt={asset.alt}
              width={960}
              height={portrait ? 1080 : 640}
              crop="fill"
              gravity="auto"
              className={styles.narrativeMediaImage}
            />
          </div>
          {asset.caption && <figcaption className={styles.narrativeMediaCaption}>{asset.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

function NarrativeMediaSections({ cs, isFlagship = false }: { cs: CaseStudy; isFlagship?: boolean }) {
  const projectMedia = getProjectMedia(cs.slug)

  if (!projectMedia) return null

  // Flagship pages: proof modules carry the image story — suppress campaign/logo dumps
  // to avoid turning the page into a random media gallery.
  if (isFlagship) {
    // Only render screens when the flagship page does NOT already have flagshipProofModules
    // (modules render their own supporting images inline).
    if (cs.flagshipProofModules && cs.flagshipProofModules.length > 0) return null

    return (
      <>
        {projectMedia.screens && projectMedia.screens.length > 0 && (
          <SectionBlock eyebrow="Interface surfaces" title="Website and platform screens">
            <MappedMediaGrid assets={projectMedia.screens} maxAssets={2} />
          </SectionBlock>
        )}
      </>
    )
  }

  return (
    <>
      {projectMedia.screens && projectMedia.screens.length > 0 && (
        <SectionBlock eyebrow="Website and results" title="Interface surfaces that carried conversion and clarity">
          <MappedMediaGrid assets={projectMedia.screens} maxAssets={3} />
        </SectionBlock>
      )}

      {projectMedia.productInUse && projectMedia.productInUse.length > 0 && (
        <SectionBlock eyebrow="Product craftsmanship and treatment precision" title="Proof of clinical and operational precision">
          <MappedMediaGrid assets={projectMedia.productInUse} maxAssets={2} portrait />
        </SectionBlock>
      )}

      {projectMedia.campaign && projectMedia.campaign.length > 0 && (
        <SectionBlock eyebrow="Campaign and proof" title="Supporting campaign creative tied to outcomes">
          <MappedMediaGrid assets={projectMedia.campaign} maxAssets={4} />
        </SectionBlock>
      )}

      {projectMedia.logos && projectMedia.logos.length > 0 && (
        <SectionBlock eyebrow="Trust and brand" title="Identity assets that anchor authority and recall">
          <MappedMediaGrid assets={projectMedia.logos} maxAssets={4} />
        </SectionBlock>
      )}
    </>
  )
}

function BrandIdentitySnapshot({ cs }: { cs: CaseStudy }) {
  const profile = getBrandDnaProfile(cs.slug)

  if (!profile) return null

  const previewImages = profile.featuredImageFiles.slice(0, 3)

  return (
    <SectionBlock eyebrow="Supporting brand and campaign proof" title="Supporting brand and campaign material from the engagement">
      <div className={styles.brandIdentityShell}>
        <div className={styles.brandIdentityContent}>
          {(profile.name || profile.tagline) && (
            <div className={styles.brandIdentityHeader}>
              {profile.name && <h3 className={styles.brandIdentityName}>{profile.name}</h3>}
              {profile.tagline && <p className={styles.brandIdentityTagline}>{profile.tagline}</p>}
              {profile.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.brandIdentityWebsite}
                >
                  Visit brand site
                  <ArrowUpRight weight="regular" size={12} aria-hidden />
                </a>
              )}
            </div>
          )}

          {profile.overview && <p className={styles.brandIdentityOverview}>{profile.overview}</p>}

          <div className={styles.brandIdentityMetaGrid}>
            {profile.brandValues.length > 0 && (
              <div className={styles.brandMetaCard}>
                <p className={styles.brandMetaLabel}>Values</p>
                <div className={styles.brandTokenList}>
                  {profile.brandValues.slice(0, 5).map((value) => (
                    <span key={value} className={styles.brandToken}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.visualAesthetics.length > 0 && (
              <div className={styles.brandMetaCard}>
                <p className={styles.brandMetaLabel}>Aesthetic direction</p>
                <div className={styles.brandTokenList}>
                  {profile.visualAesthetics.slice(0, 5).map((value) => (
                    <span key={value} className={styles.brandToken}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.toneOfVoice.length > 0 && (
              <div className={styles.brandMetaCard}>
                <p className={styles.brandMetaLabel}>Voice</p>
                <div className={styles.brandTokenList}>
                  {profile.toneOfVoice.slice(0, 5).map((value) => (
                    <span key={value} className={styles.brandToken}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.fonts.length > 0 && (
              <div className={styles.brandMetaCard}>
                <p className={styles.brandMetaLabel}>Fonts</p>
                <div className={styles.brandTokenList}>
                  {profile.fonts.slice(0, 4).map((font) => (
                    <span key={font} className={styles.brandToken}>
                      {font}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.colors.length > 0 && (
              <div className={styles.brandMetaCard}>
                <p className={styles.brandMetaLabel}>Palette</p>
                <div className={styles.brandColorList}>
                  {profile.colors.slice(0, 6).map((color) => (
                    <span key={color} className={styles.brandColorSwatch}>
                      <span className={styles.brandColorChip} style={{ backgroundColor: color }} aria-hidden />
                      <span>{color}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {profile.campaignCreativeTitles.length > 0 && (
            <div className={styles.brandCampaigns}>
              <p className={styles.brandMetaLabel}>Campaign hooks</p>
              <div className={styles.brandTokenList}>
                {profile.campaignCreativeTitles.slice(0, 4).map((title) => (
                  <span key={title} className={styles.brandToken}>
                    {title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {previewImages.length > 0 && (
          <div className={styles.brandImageGrid}>
            {previewImages.map((imageFile) => (
              <figure key={imageFile} className={styles.brandImageFrame}>
                <Image
                  src={`/images/work-brand-dna/${cs.slug}/${imageFile}`}
                  alt={`${cs.client} brand creative`}
                  width={840}
                  height={840}
                  className={styles.brandImage}
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </SectionBlock>
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

function FlagshipProofModulesSection({ modules }: { modules: FlagshipProofModule[] }) {
  const groupedModules =
    modules.length >= 6
      ? [
          {
            heading: 'Acquisition and conversion systems',
            items: modules.slice(0, 2),
          },
          {
            heading: 'Retention, visibility, and operating intelligence',
            items: modules.slice(2, 5),
          },
          {
            heading: 'Platform stability and infrastructure',
            items: modules.slice(5),
          },
        ]
      : [{ heading: '', items: modules }]

  return (
    <FadeUp>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>What changed</p>
          <h2 className={styles.sectionHeadline}>The systems behind the results</h2>
        </div>
        <div className={styles.flagshipModuleStack}>
          {groupedModules.map((group) => (
            <section key={group.heading || 'default'} className={styles.flagshipModuleGroup}>
              {group.heading && <h3 className={styles.flagshipGroupHeading}>{group.heading}</h3>}
              {group.items.map((module) => (
                <article key={module.title} className={styles.flagshipModule}>
                  <div className={styles.flagshipModuleCopy}>
                    <h3 className={styles.flagshipModuleTitle}>{module.title}</h3>
                    {module.body.split('\n\n').filter(Boolean).map((paragraph, i) => (
                      <p key={i} className={styles.flagshipModuleBody}>{paragraph}</p>
                    ))}
                  </div>
                  {module.imagePublicId && (
                    <figure className={styles.flagshipModuleFigure}>
                      <div className={styles.flagshipModuleImageFrame}>
                        <CldImage
                          src={module.imagePublicId}
                          alt={module.imageAlt ?? module.title}
                          width={960}
                          height={640}
                          crop="fill"
                          gravity="auto"
                          className={styles.flagshipModuleImage}
                        />
                      </div>
                      {module.imageCaption && (
                        <figcaption className={styles.flagshipModuleCaption}>{module.imageCaption}</figcaption>
                      )}
                    </figure>
                  )}
                </article>
              ))}
            </section>
          ))}
        </div>
      </section>
    </FadeUp>
  )
}

function ClosingStatement({ text }: { text: string }) {
  return (
    <FadeUp>
      <section className={styles.closingStatementSection}>
        <p className={styles.closingStatementEyebrow}>What this proves</p>
        <blockquote className={styles.closingStatement}>{text}</blockquote>
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

type WorkToolRecommendation = {
  label: string
  slug: string
  href: string
  body: string
}

function getWorkToolRecommendation(cs: CaseStudy): WorkToolRecommendation {
  const bySlug: Record<string, WorkToolRecommendation> = {
    'russell-painting': {
      label: 'GEO Readiness Auditor',
      slug: 'geo-readiness-auditor',
      href: '/tools/geo-readiness-auditor',
      body: 'Check whether your site is visible to AI-assisted search before scaling more SEO execution.',
    },
    'hoosier-boy-barbershop': {
      label: 'GEO Readiness Auditor',
      slug: 'geo-readiness-auditor',
      href: '/tools/geo-readiness-auditor',
      body: 'Use this to surface local discoverability gaps before expanding demand channels.',
    },
    'graston-growth-engine': {
      label: 'Attribution Snapshot',
      slug: 'attribution-snapshot',
      href: '/tools/attribution-snapshot',
      body: 'Compare attribution models quickly before rebuilding reporting or CRM workflows.',
    },
    '317-bbq': {
      label: 'Attribution Snapshot',
      slug: 'attribution-snapshot',
      href: '/tools/attribution-snapshot',
      body: 'Validate where conversion credit is stable before changing campaign allocation.',
    },
    'graston-technique': {
      label: 'CMO Simulator',
      slug: 'cmo-simulator',
      href: '/tools/cmo-simulator?launch=1',
      body: 'Run the same CMO-level decision framework that shaped this engagement architecture.',
    },
    'pike-medical-consultants': {
      label: 'CMO Simulator',
      slug: 'cmo-simulator',
      href: '/tools/cmo-simulator?launch=1',
      body: 'Use this to pressure-test priorities and sequencing before choosing a growth path.',
    },
  }

  if (bySlug[cs.slug]) return bySlug[cs.slug]

  if (cs.category === 'Healthcare' || cs.category === 'Legal & Professional') {
    return {
      label: 'CMO Roadmap Generator',
      slug: 'cmo-roadmap-generator',
      href: '/tools/cmo-roadmap-generator',
      body: 'Turn strategy constraints into a practical 90-day roadmap you can execute or refine.',
    }
  }

  return {
    label: 'CMO Roadmap Generator',
    slug: 'cmo-roadmap-generator',
    href: '/tools/cmo-roadmap-generator',
    body: 'Build a prioritized roadmap from your current constraints before starting a new build.',
  }
}

function DivisionProofBlock({ divisions }: { divisions: CaseStudy[] }) {
  if (divisions.length === 0) return null

  return (
    <FadeUp>
      <section className={styles.divisionProofBlock}>
        <div className={styles.divisionProofHeader}>
          <p className={styles.sectionEyebrow}>Where the platform strategy showed up in the field</p>
          <h2 className={styles.divisionProofHeadline}>Division proof inside this healthcare platform</h2>
        </div>
        <div className={styles.divisionProofGrid}>
          {divisions.map((division) => {
            const divisionMedia = getProjectMedia(division.slug)
            const thumbId =
              divisionMedia?.hero?.publicId ??
              division.cardPublicId ??
              division.heroPublicId ??
              division.logoPublicId
            const primaryMetric = division.metrics[0] ?? ''
            const context =
              division.slug === 'primarycare-indy'
                ? 'Independent primary care competing with health systems on SEO and patient acquisition.'
                : 'Urgent care site rebuilt around speed-to-booking and transparent pricing — then wired to online check-in.'

            const logoConfig =
              division.slug === 'primarycare-indy'
                ? { publicId: 'primarycare-logo-anchor', maxWidth: 220 }
                : { publicId: 'urgentcare-logo-anchor', maxWidth: 190 }

            return (
              <Link key={division.slug} href={`/work/${division.slug}`} className={styles.divisionProofCard}>
                <div className={styles.divisionProofLogoRow}>
                  <div
                    className={styles.divisionProofLogoWrap}
                    style={{ maxWidth: logoConfig.maxWidth }}
                  >
                    <CldImage
                      src={logoConfig.publicId}
                      alt={`${division.client} logo`}
                      width={440}
                      height={96}
                      crop="fit"
                      className={styles.divisionProofLogo}
                    />
                  </div>
                </div>
                {thumbId && (
                  <div className={styles.divisionProofThumb}>
                    <CldImage
                      src={thumbId}
                      alt={division.client}
                      width={640}
                      height={400}
                      crop="fill"
                      gravity="auto"
                      className={styles.divisionProofImage}
                    />
                  </div>
                )}
                <div className={styles.divisionProofMeta}>
                  <p className={styles.divisionProofMetric}>{primaryMetric}</p>
                  <p className={styles.divisionProofClient}>{division.client}</p>
                  <p className={styles.divisionProofContext}>{context}</p>
                  <span className={styles.divisionProofCta}>
                    Full case study
                    <ArrowRight weight="light" size={13} aria-hidden />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </FadeUp>
  )
}

function ToolPromptPanel({ cs }: { cs: CaseStudy }) {
  const recommendedTool = getWorkToolRecommendation(cs)

  return (
    <FadeUp>
      <section className={styles.toolPromptSection} aria-label="Try the framework">
        <div className={styles.toolPromptCard}>
          <div>
            <p className={styles.toolPromptLabel}>Try the framework</p>
            <h2 className={styles.toolPromptTitle}>Run {recommendedTool.label} on your version.</h2>
            <p className={styles.toolPromptBody}>{recommendedTool.body}</p>
          </div>
          <Link
            href={recommendedTool.href}
            className={styles.toolPromptLink}
            onClick={() => analytics.ctaClick(`work_detail_${cs.slug}`, recommendedTool.slug)}
          >
            Open tool
            <ArrowRight weight="regular" size={14} />
          </Link>
        </div>
      </section>
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
  const projectMedia = getProjectMedia(cs.slug)
  const heroImage =
    projectMedia?.hero?.publicId ??
    cs.heroPublicId ??
    cs.cloudinaryAssets?.find((asset) => asset.publicId !== cs.logoPublicId)?.publicId ??
    cs.cloudinaryAssets?.[0]?.publicId ??
    cs.logoPublicId
  const heroAlt = projectMedia?.hero?.alt ?? cs.client
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
                        alt={heroAlt}
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

                  {!projectMedia && cs.cloudinaryAssets && cs.cloudinaryAssets.length > 0 && (
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

            <NarrativeMediaSections cs={cs} />

            <BrandIdentitySnapshot cs={cs} />

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
            {cs.slug === 'pike-medical-consultants' && related.length > 0 && (
              <DivisionProofBlock divisions={related} />
            )}

            <SectionBlock eyebrow="Why this mattered">
              <BodyCopy text={cs.challenge} />
            </SectionBlock>

            {isFlagshipLongform && cs.flagshipProofModules && cs.flagshipProofModules.length > 0 ? (
              <FlagshipProofModulesSection modules={cs.flagshipProofModules} />
            ) : (
              <SectionBlock eyebrow="What got rebuilt">
                <DeliverableGrid deliverables={cs.deliverables} isSystemPage={false} />
              </SectionBlock>
            )}

            <NarrativeMediaSections cs={cs} isFlagship={isFlagshipLongform} />

            {isFlagshipLongform && cs.systemsSynthesis && (
              <SectionBlock eyebrow="How the platform was rebuilt" title="What sat underneath the visible work">
                <BodyCopy text={cs.systemsSynthesis} />
              </SectionBlock>
            )}

            <BrandIdentitySnapshot cs={cs} />

            <SectionBlock eyebrow={isFlagshipLongform ? 'Results and operating impact' : 'The Outcome'}>
              <BodyCopy text={cs.outcome} />
              {isFlagshipLongform && !cs.closingStatement && <BodyCopy text={cs.whatThisMeansForYou} />}
            </SectionBlock>

            {isFlagshipLongform && cs.closingStatement && (
              <ClosingStatement text={cs.closingStatement} />
            )}
          </>
        )}

        <RouteOutLinks
          cs={cs}
          template={detailTemplate}
          parent={parent}
          related={related}
          serviceBacklink={serviceBacklink}
        />

        <ToolPromptPanel cs={cs} />

        <ContactCta cs={cs} />
      </div>
    </article>
  )
}
