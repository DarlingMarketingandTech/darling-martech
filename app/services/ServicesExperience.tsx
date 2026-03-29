'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Gauge, Stack } from '@phosphor-icons/react'
import {
  serviceDetails,
  serviceLayerMeta,
  standaloneServicePages,
  type ServiceLayer,
} from '@/data/services'

const MotionLink = motion(Link)
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './ServicesPage.module.css'

function getLayerIcon(layer: ServiceLayer) {
  if (layer === 'strategy') return Stack
  if (layer === 'growth') return Gauge
  return Cpu
}

/** One service per layer — first match */
function getLayerRepresentative(layer: ServiceLayer) {
  return serviceDetails.find((s) => s.layer === layer)
}

const FLAGSHIP_PROOF = [
  {
    label: 'Graston Technique',
    href: '/work/graston-technique',
    signalLabel: 'Automation engine',
    metric: '95% less manual overhead',
    result: '95% reduction in manual overhead. 48 hours saved per week.',
  },
  {
    label: '317 BBQ',
    href: '/work/317-bbq',
    signalLabel: 'Conversion rebuild',
    metric: '40% conversion lift',
    result: '40% lift in order conversions and 2× catering inquiries after the redesign.',
  },
  {
    label: 'PrimaryCare Indy',
    href: '/work/primarycare-indy',
    signalLabel: 'Organic demand',
    metric: '300% traffic growth',
    result: '300% organic traffic growth and 75% more online bookings.',
  },
]

export function ServicesExperience() {
  const featuredOfferSlugs = ['martech-audit', 'agentic-marketing-systems', 'the-conductor'] as const
  const featuredOffers = featuredOfferSlugs
    .map((slug) => standaloneServicePages.find((s) => s.id === slug))
    .filter((offer): offer is NonNullable<typeof offer> => Boolean(offer))

  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroInner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className={styles.eyebrow}>
            Services
          </motion.p>
          <motion.h1 variants={itemVariants} className={styles.headline}>
            Strategy. Build. Growth.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.lead}>
            I work across all three layers — or just the one you need. Strategy to set the
            direction, build to execute it, growth to sustain it.
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroActions}>
            <Link href="/contact?intent=service" className={styles.primaryCta}>
              Start a project
            </Link>
            <Link href="/work" className={styles.secondaryCta}>
              See the work
              <ArrowRight size={15} weight="light" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Layer selector ── */}
      <section className={styles.layerSection}>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionEyebrow}>How the work is structured</p>
          <div className={styles.layerGrid}>
            {serviceLayerMeta.map((layer) => {
              const Icon = getLayerIcon(layer.id)
              const rep = getLayerRepresentative(layer.id)
              const href = rep ? `/services/${rep.id}` : '/services'

              return (
                <MotionLink
                  key={layer.id}
                  href={href}
                  className={styles.layerCard}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  <div className={styles.layerCardTop}>
                    <span className={styles.layerIconWrap}>
                      <Icon size={17} weight="light" />
                    </span>
                    <span className={styles.layerLabel}>{layer.label}</span>
                  </div>
                  <p className={styles.layerDescription}>{layer.description}</p>
                  <span className={styles.layerCardCta}>
                    Explore {layer.label}
                    <ArrowRight size={14} weight="light" />
                  </span>
                </MotionLink>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured offers ── */}
      {featuredOffers.length > 0 && (
        <section className={styles.offersSection}>
          <div className={styles.sectionContainer}>
            <p className={styles.sectionEyebrow}>Productized offers</p>
            <h2 className={styles.sectionHeadline}>Fixed-scope, deliverable-backed engagements.</h2>
            <div className={styles.offersGrid}>
              {featuredOffers.map((offer) => (
                <article key={offer.id} className={styles.offerCard}>
                  <div className={styles.offerTop}>
                    <span className={styles.offerEyebrow}>{offer.eyebrow}</span>
                    {offer.pricingSignal && (
                      <span className={styles.offerPricing}>{offer.pricingSignal}</span>
                    )}
                  </div>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerTagline}>{offer.tagline}</p>
                  <Link href={offer.routePath ?? `/services/${offer.id}`} className={styles.offerCta}>
                    See full offer details
                    <ArrowRight size={14} weight="light" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Proof strip ── */}
      <section className={styles.proofSection}>
        <div className={styles.sectionContainer}>
          <p className={styles.sectionEyebrow}>Results</p>
          <div className={styles.proofStrip}>
            {FLAGSHIP_PROOF.map((proof) => (
              <Link key={proof.href} href={proof.href} className={styles.proofItem}>
                <span className={styles.proofMetric}>{proof.metric}</span>
                <span className={styles.proofClient}>{proof.label}</span>
                <span className={styles.proofResult}>{proof.result}</span>
                <span className={styles.proofReadMore}>
                  View case study <ArrowRight size={13} weight="light" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaBlock}>
            <div className={styles.ctaCopy}>
              <p className={styles.sectionEyebrow}>Next step</p>
              <h2 className={styles.ctaHeadline}>
                Not sure which layer you need? That is what the first conversation is for.
              </h2>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact?intent=unsure" className={styles.primaryCta}>
                Let&apos;s talk
              </Link>
              <Link href="/work" className={styles.secondaryCta}>
                See the work
                <ArrowRight size={15} weight="light" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
