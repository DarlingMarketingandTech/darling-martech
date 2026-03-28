'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Gauge, Pulse, Stack, Cube } from '@phosphor-icons/react'
import { ServicesAmbient } from '@/components/3d/ServicesAmbient'
import {
  engagementModels,
  type ParentServiceDetail,
  type StandaloneServicePage,
  serviceDetails,
  serviceLayerMeta,
  specializedServices,
  standaloneServicePages,
  type ServiceLayer,
} from '@/data/services'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './ServicesPage.module.css'

function getLayerIcon(layer: ServiceLayer) {
  if (layer === 'strategy') return Stack
  if (layer === 'growth') return Gauge
  return Cpu
}

function ArchitectureRail({
  activeLayer,
  firstServiceByLayer,
  countsByLayer,
  mobile = false,
}: {
  activeLayer: ServiceLayer
  firstServiceByLayer: Record<ServiceLayer, string>
  countsByLayer: Record<ServiceLayer, number>
  mobile?: boolean
}) {
  return (
    <nav
      className={mobile ? styles.mobileLayerNav : styles.architectureRail}
      aria-label={mobile ? 'Service layers' : 'Services architecture'}
    >
      <p className={styles.railLabel}>{mobile ? 'Jump to layer' : 'Architecture rail'}</p>
      <div className={mobile ? styles.mobileLayerList : styles.railList}>
        {serviceLayerMeta.map((layer) => {
          const Icon = getLayerIcon(layer.id)
          const active = activeLayer === layer.id

          return (
            <Link
              key={layer.id}
              href={`#${firstServiceByLayer[layer.id]}`}
              className={`${mobile ? styles.mobileLayerLink : styles.railLink} ${
                active ? (mobile ? styles.mobileLayerLinkActive : styles.railLinkActive) : ''
              }`}
            >
              <span className={mobile ? styles.mobileLayerIcon : styles.railIcon}>
                <Icon size={mobile ? 14 : 16} weight="light" />
              </span>
              <span className={mobile ? styles.mobileLayerCopy : styles.railCopy}>
                <span className={styles.railTitle}>{layer.label}</span>
                {!mobile && <span className={styles.railDescription}>{layer.description}</span>}
              </span>
              <span className={mobile ? styles.mobileLayerCount : styles.railCount}>
                {countsByLayer[layer.id]}
              </span>
              {!mobile && <span className={styles.railPulse} aria-hidden="true" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

function ServiceModule({
  service,
  active,
  childOffers,
  registerSectionRef,
  onProofTargetChange,
  onProofTargetClear,
}: {
  service: ParentServiceDetail
  active: boolean
  childOffers: StandaloneServicePage[]
  registerSectionRef: (id: string, node: HTMLElement | null) => void
  onProofTargetChange: (target: string) => void
  onProofTargetClear: () => void
}) {
  const [activeProofIndex, setActiveProofIndex] = useState(0)
  const proofControlRef = useRef<HTMLDivElement>(null)
  const featuredProof = service.proof[activeProofIndex] ?? service.proof[0]

  const handleProofActivate = (index: number) => {
    setActiveProofIndex(index)
    onProofTargetChange(service.proof[index].sceneTarget ?? service.sceneTarget)
  }

  const resetProofState = () => {
    setActiveProofIndex(0)
    onProofTargetClear()
  }

  return (
    <motion.article
      id={service.id}
      ref={(node) => registerSectionRef(service.id, node)}
      className={`${styles.serviceModule} ${active ? styles.serviceModuleActive : ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      aria-labelledby={`${service.id}-title`}
      data-layer={service.layer}
    >
      <div className={styles.moduleFrame}>
        <motion.div variants={itemVariants} className={styles.moduleHeader}>
          <div className={styles.moduleHeaderCopy}>
            <p className={styles.serviceEyebrow}>{service.eyebrow}</p>
            <h2 id={`${service.id}-title`} className={styles.serviceTitle}>
              {service.title}
            </h2>
            <p className={styles.serviceSummary}>{service.summary}</p>
          </div>

          <div className={styles.moduleLayerTag}>
            <span className={styles.moduleLayerKicker}>Layer</span>
            <span className={styles.moduleLayerValue}>
              {serviceLayerMeta.find((layer) => layer.id === service.layer)?.label}
            </span>
          </div>
        </motion.div>

        <div className={styles.moduleGrid}>
          <motion.div variants={itemVariants} className={styles.deliverablePanel}>
            <div className={styles.panelHeader}>
              <p className={styles.panelLabel}>Typical deliverables</p>
              <span className={styles.panelMeta}>{service.deliverables.length} modules</span>
            </div>

            <ul className={styles.deliverableList}>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.proofPanel}>
            <div className={styles.panelHeader}>
              <p className={styles.panelLabel}>Highlight proof</p>
              <span className={styles.signalPill}>
                <Pulse size={14} weight="regular" />
                {featuredProof.signalLabel}
              </span>
            </div>

            <Link
              href={featuredProof.href}
              className={styles.featuredProof}
              onMouseEnter={() => onProofTargetChange(featuredProof.sceneTarget ?? service.sceneTarget)}
              onMouseLeave={onProofTargetClear}
              onFocus={() => onProofTargetChange(featuredProof.sceneTarget ?? service.sceneTarget)}
              onBlur={onProofTargetClear}
            >
              <div className={styles.featuredProofGrid} aria-hidden="true" />
              <div className={styles.featuredProofGlow} aria-hidden="true" />

              <div className={styles.featuredProofTop}>
                <span className={styles.featuredProofKicker}>{featuredProof.signalLabel}</span>
                <span className={styles.featuredProofMetric}>{featuredProof.metric}</span>
              </div>

              <div className={styles.featuredProofBody}>
                <h3 className={styles.featuredProofTitle}>{featuredProof.label}</h3>
                <p className={styles.featuredProofResult}>{featuredProof.result}</p>
              </div>

              <span className={styles.featuredProofCta}>
                View case study
                <ArrowRight size={16} weight="light" />
              </span>
            </Link>

            <Link href={`/services/${service.id}`} className={styles.serviceDeepLink}>
              Explore {service.eyebrow} services
              <ArrowRight size={14} weight="light" />
            </Link>

            <div
              ref={proofControlRef}
              className={styles.proofControls}
              onMouseLeave={resetProofState}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  resetProofState()
                }
              }}
            >
              {service.proof.map((proof, index) => (
                <button
                  key={proof.href}
                  type="button"
                  className={`${styles.proofSignal} ${
                    index === activeProofIndex ? styles.proofSignalActive : ''
                  }`}
                  onMouseEnter={() => handleProofActivate(index)}
                  onFocus={() => handleProofActivate(index)}
                  aria-pressed={index === activeProofIndex}
                >
                  <span className={styles.proofSignalLabel}>{proof.signalLabel}</span>
                  <span className={styles.proofSignalTitle}>{proof.label}</span>
                  <span className={styles.proofSignalMetric}>{proof.metric}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {childOffers.length > 0 && (
          <motion.div variants={itemVariants} className={styles.childOffersStrip}>
            <p className={styles.childOffersLabel}>Productized offers</p>
            <div className={styles.childOffersList}>
              {childOffers.map((offer) => (
                <Link key={offer.id} href={`/services/${offer.id}`} className={styles.childOfferCard}>
                  <div className={styles.childOfferTop}>
                    <span className={styles.childOfferEyebrow}>{offer.eyebrow}</span>
                    {offer.pricingSignal && (
                      <span className={styles.childOfferPricing}>{offer.pricingSignal}</span>
                    )}
                  </div>
                  <p className={styles.childOfferTitle}>{offer.title}</p>
                  <p className={styles.childOfferSummary}>{offer.tagline}</p>
                  <span className={styles.childOfferCta}>
                    See full offer details
                    <ArrowRight size={13} weight="light" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  )
}

export function ServicesExperience() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const ratiosRef = useRef<Record<string, number>>({})
  const [activeServiceId, setActiveServiceId] = useState(serviceDetails[0]?.id ?? '')
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0
        }

        let nextId = activeServiceId
        let bestRatio = 0

        for (const service of serviceDetails) {
          const ratio = ratiosRef.current[service.id] ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            nextId = service.id
          }
        }

        if (bestRatio > 0 && nextId !== activeServiceId) {
          setActiveServiceId(nextId)
        }
      },
      {
        rootMargin: '-22% 0px -42% 0px',
        threshold: [0.15, 0.3, 0.5, 0.72],
      }
    )

    for (const service of serviceDetails) {
      const node = sectionRefs.current[service.id]
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [activeServiceId])

  const countsByLayer = useMemo(
    () =>
      serviceDetails.reduce<Record<ServiceLayer, number>>(
        (acc, service) => {
          acc[service.layer] += 1
          return acc
        },
        { strategy: 0, build: 0, growth: 0 }
      ),
    []
  )

  const firstServiceByLayer = useMemo(
    () =>
      serviceLayerMeta.reduce<Record<ServiceLayer, string>>((acc, layer) => {
        acc[layer.id] = serviceDetails.find((service) => service.layer === layer.id)?.id ?? serviceDetails[0].id
        return acc
      }, { strategy: serviceDetails[0].id, build: serviceDetails[0].id, growth: serviceDetails[0].id }),
    []
  )

  const activeService =
    serviceDetails.find((service) => service.id === activeServiceId) ?? serviceDetails[0]
  const activeLayer = activeService.layer
  const activeTarget = hoveredTarget ?? activeService.sceneTarget
  const auditOffer = standaloneServicePages.find((service) => service.id === 'martech-audit')

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.heroCopy}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={itemVariants} className={styles.eyebrow}>
              Services
            </motion.p>
            <motion.h1 variants={itemVariants} className={styles.headline}>
              The strategy layer, the build layer, and the growth layer.
            </motion.h1>
            <motion.p variants={itemVariants} className={styles.lead}>
              I work with businesses that need more than isolated deliverables. Some need a clearer
              market position. Some need a website that finally converts. Some need the backend
              systems cleaned up so marketing can actually run. Most need a combination.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.systemBrief}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={itemVariants} className={styles.panelLabel}>
              System brief
            </motion.p>
            <motion.p variants={itemVariants} className={styles.panelText}>
              This page is structured like the work itself: start with the layer you need,
              inspect the services in that lane, and follow the proof into real case studies.
            </motion.p>

            <motion.div variants={itemVariants} className={styles.briefLayers}>
              {serviceLayerMeta.map((layer) => {
                const Icon = getLayerIcon(layer.id)

                return (
                  <div key={layer.id} className={styles.briefLayer}>
                    <span className={styles.briefLayerIcon}>
                      <Icon size={16} weight="light" />
                    </span>
                    <div>
                      <p className={styles.briefLayerTitle}>{layer.label}</p>
                      <p className={styles.briefLayerText}>{layer.description}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={itemVariants} className={styles.heroActions}>
              <Link href="/work" className={styles.primaryCta}>
                View case studies
              </Link>
              <Link href="/contact" className={styles.secondaryCta}>
                Start a project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.workspace}>
        <aside className={styles.utilityColumn}>
          <div className={styles.utilitySticky}>
            <ArchitectureRail
              activeLayer={activeLayer}
              firstServiceByLayer={firstServiceByLayer}
              countsByLayer={countsByLayer}
            />

            <div className={styles.viewportShell}>
              <div className={styles.viewportHeader}>
                <p className={styles.panelLabel}>System viewport</p>
                <p className={styles.viewportText}>
                  Active layer: {serviceLayerMeta.find((layer) => layer.id === activeLayer)?.label}
                </p>
              </div>
              <ServicesAmbient
                activeLayer={activeLayer}
                interactiveTarget={activeTarget}
                className={styles.viewportCanvas}
              />
            </div>
          </div>
        </aside>

        <div className={styles.contentColumn}>
          <ArchitectureRail
            mobile
            activeLayer={activeLayer}
            firstServiceByLayer={firstServiceByLayer}
            countsByLayer={countsByLayer}
          />

          <section className={styles.contentIntro}>
            <p className={styles.sectionEyebrow}>Core Services</p>
            <h2 className={styles.sectionHeadline}>What I can build, lead, and improve.</h2>
          </section>

          {auditOffer ? (
            <section className={styles.auditSpotlight}>
              <div>
                <p className={styles.panelLabel}>Productized offer</p>
                <h2 className={styles.auditTitle}>{auditOffer.title}</h2>
                <p className={styles.panelText}>{auditOffer.summary}</p>
              </div>
              <div className={styles.auditMeta}>
                {auditOffer.proofStats?.slice(0, 2).map((stat) => (
                  <div key={stat.label} className={styles.auditStat}>
                    <span className={styles.auditStatValue}>{stat.value}</span>
                    <span className={styles.auditStatLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.heroActions}>
                <Link href={`/services/${auditOffer.id}`} className={styles.primaryCta}>
                  Explore the audit
                </Link>
                <Link href="/contact" className={styles.secondaryCta}>
                  Request a MarTech Audit
                </Link>
              </div>
            </section>
          ) : null}

          <div className={styles.serviceStack}>
            {serviceDetails.map((service) => {
              const childOffers = (service.childServiceSlugs ?? [])
                .map((slug) => standaloneServicePages.find((p) => p.id === slug))
                .filter((p): p is StandaloneServicePage => Boolean(p))

              return (
              <ServiceModule
                key={service.id}
                service={service}
                active={service.id === activeService.id}
                childOffers={childOffers}
                registerSectionRef={(id, node) => {
                  sectionRefs.current[id] = node
                }}
                onProofTargetChange={setHoveredTarget}
                onProofTargetClear={() => setHoveredTarget(null)}
              />
              )
            })}
          </div>

          <section className={styles.coverageSection}>
            <div className={styles.coverageHeader}>
              <p className={styles.sectionEyebrow}>Recurring Buildouts</p>
              <h2 className={styles.sectionHeadline}>Common asks that sit inside the larger system.</h2>
            </div>

            <div className={styles.specializedGrid}>
              {specializedServices.map((item) => (
                <article key={item.title} className={styles.specializedCard}>
                  <h3 className={styles.specializedTitle}>{item.title}</h3>
                  <p className={styles.specializedText}>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.engagementSection}>
            <div className={styles.engagementHeader}>
              <p className={styles.sectionEyebrow}>How To Work With Me</p>
              <h2 className={styles.sectionHeadline}>Three ways to engage, depending on what you need.</h2>
            </div>

            <div className={styles.engagementGrid}>
              {engagementModels.map((model) => (
                <article key={model.id} className={styles.engagementCard}>
                  <div className={styles.engagementCardTop}>
                    <span className={styles.engagementIcon}>
                      <Cube size={17} weight="light" />
                    </span>
                    <h3 className={styles.engagementTitle}>{model.title}</h3>
                  </div>
                  <p className={styles.engagementSummary}>{model.summary}</p>
                  <p className={styles.engagementBestFor}>{model.bestFor}</p>
                </article>
              ))}
            </div>

            <div className={styles.engagementCta}>
              <div>
                <p className={styles.panelLabel}>Next step</p>
                <p className={styles.panelText}>
                  If you already know the layer you need, we can start there. If not, that is
                  exactly what the first conversation is for.
                </p>
              </div>
              <div className={styles.heroActions}>
                <Link href="/contact" className={styles.primaryCta}>
                  Let&apos;s talk
                </Link>
                <Link href="/work" className={styles.secondaryCta}>
                  See the work
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
