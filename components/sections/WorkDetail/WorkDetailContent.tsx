'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import type { CaseStudy } from '@/lib/work'
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ ...springEntrance, delay }}
    >
      {children}
    </motion.div>
  )
}

function BodyCopy({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean)

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.bodyParagraph}>
          {paragraph}
        </p>
      ))}
    </>
  )
}

function MetricBand({ cs }: { cs: CaseStudy }) {
  const metricClassName =
    cs.theme?.metricStyle === 'ticker'
      ? styles.metricsTicker
      : cs.theme?.metricStyle === 'pill'
        ? styles.metricsPill
        : styles.metricsPanel

  return (
    <FadeUp>
      <div className={`${styles.metricsBar} ${metricClassName}`}>
        {cs.metrics.map((metric) => {
          const parts = metric.match(/^([^\s]+(?:\s[^\s]+)?)\s(.+)/) || [metric, metric, '']

          return (
            <div key={metric} className={styles.metricCell}>
              <p className={styles.metricValue}>{parts[1]}</p>
              <p className={styles.metricLabel}>{parts[2] || '\u00a0'}</p>
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
}: {
  assets: NonNullable<CaseStudy['cloudinaryAssets']>
  mediaStyle: NonNullable<CaseStudy['theme']>['mediaStyle'] | undefined
}) {
  const displayAssets = assets.slice(0, 3)

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

export function WorkDetailContent({
  cs,
  prev,
  next,
  parent,
  related,
}: {
  cs: CaseStudy
  prev: CaseStudy | null
  next: CaseStudy | null
  parent: CaseStudy | null
  related: CaseStudy[]
}) {
  const heroImage = cs.heroPublicId ?? cs.cloudinaryAssets?.[1]?.publicId ?? cs.logoPublicId
  const layoutClassName =
    cs.theme?.layout === 'stacked'
      ? styles.layoutStacked
      : cs.theme?.layout === 'editorial'
        ? styles.layoutEditorial
        : styles.layoutSplit

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
                {cs.headline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springEntrance, delay: 0.24 }}
                className={styles.heroSubhead}
              >
                {cs.subhead}
              </motion.p>

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

                  {cs.cloudinaryAssets && cs.cloudinaryAssets.length > 1 && (
                    <AssetStrip assets={cs.cloudinaryAssets} mediaStyle={cs.theme?.mediaStyle} />
                  )}
                </div>
              </FloatingCard>
            </motion.div>
          </div>

          <MetricBand cs={cs} />
        </section>

        <SectionBlock eyebrow="The Challenge">
          <BodyCopy text={cs.challenge} />
        </SectionBlock>

        <SectionBlock eyebrow="The Approach">
          <BodyCopy text={cs.approach} />
        </SectionBlock>

        <SectionBlock eyebrow="The Work">
          <motion.div
            className={styles.deliverableGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {cs.deliverables.map((deliverable) => (
              <motion.div key={deliverable.title} variants={itemVariants} className={styles.deliverable}>
                <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
                <p className={styles.deliverableDesc}>{deliverable.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </SectionBlock>

        {related.length > 0 && (
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
        )}

        {cs.process && cs.process.length > 0 && (
          <SectionBlock eyebrow="The Process">
            <div className={styles.processList}>
              {cs.process.map((phase) => (
                <div key={phase.label} className={styles.processPhase}>
                  <p className={styles.processLabel}>{phase.label}</p>
                  <p className={styles.processDesc}>{phase.description}</p>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        <SectionBlock eyebrow="The Outcome">
          <BodyCopy text={cs.outcome} />
        </SectionBlock>

        <SectionBlock eyebrow="What This Means For You">
          <BodyCopy text={cs.whatThisMeansForYou} />
        </SectionBlock>

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
                  <Link href="/contact" className={styles.ctaBtn}>
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
                <Link href={`/work/${next.slug}`} className={`${styles.prevNextCell} ${styles.prevNextRight}`}>
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
