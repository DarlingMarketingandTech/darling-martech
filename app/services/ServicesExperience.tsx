'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  ChartLineUpIcon,
  CircuitryIcon,
  PaletteIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './ServicesPage.module.css'

// ── Cluster data ──────────────────────────────────────────────────────────────

const clusters = [
  {
    id: 'strategy',
    Icon: ChartLineUpIcon,
    label: 'Strategy & Leadership',
    problem: 'No senior owner of the whole system',
    body: 'When marketing activity exists but no one is truly steering the strategy, systems, and priorities underneath it, growth gets harder to trust. This is for businesses that need clearer direction before they need more activity.',
    links: [
      { label: 'Fractional CMO / Strategic Leadership', href: '/services/fractional-cmo' },
      { label: 'Positioning & Messaging Strategy', href: '/services/brand-strategy' },
      { label: 'Marketing Audit & Growth Roadmap', href: '/services/martech-audit' },
    ],
    proof: {
      client: 'Graston Technique',
      metric: '+212% qualified leads',
      href: '/work/graston-technique',
    },
  },
  {
    id: 'brand-web',
    Icon: PaletteIcon,
    label: 'Websites, UX & Brand',
    problem: 'The site is underperforming',
    body: 'If the website is not building trust or moving people to action, growth gets harder than it should be. This cluster focuses on clarity, conversion, structure, and digital trust — not just aesthetics.',
    links: [
      { label: 'Website Strategy & Rebuilds', href: '/services/website-strategy' },
      { label: 'Conversion UX & Lead Flow', href: '/services/conversion-optimization' },
      { label: 'Brand Identity Systems', href: '/services/brand-strategy' },
    ],
    proof: {
      client: 'Pike Medical Consultants',
      metric: '45% patient growth',
      href: '/work/pike-medical-consultants',
    },
  },
  {
    id: 'systems',
    Icon: CircuitryIcon,
    label: 'CRM, Automation & AI',
    problem: 'Systems, leads, and follow-up are disconnected',
    body: 'When leads, follow-up, and reporting live in disconnected tools, growth becomes manual and unreliable. This cluster fixes the structure behind how the business actually runs.',
    links: [
      { label: 'CRM Architecture', href: '/services/crm-architecture' },
      { label: 'Workflow Automation', href: '/services/agentic-marketing-systems' },
      { label: 'MarTech audit & stack review', href: '/services/martech-audit' },
    ],
    proof: {
      client: 'Graston Growth Engine',
      metric: '95% less manual overhead',
      href: '/work/graston-growth-engine',
    },
  },
  {
    id: 'growth',
    Icon: RocketLaunchIcon,
    label: 'Growth, SEO & Demand',
    problem: 'Visibility and conversion are too weak',
    body: "If the business should be more visible, converting better, or producing more qualified demand, this is where the work starts. The fix is usually structure and conversion clarity — not just more content or more spend.",
    links: [
      { label: 'Local SEO', href: '/services/local-seo' },
      { label: 'Conversion Optimization', href: '/services/conversion-optimization' },
      { label: 'GEO / AI Search Readiness', href: '/services/geo-optimization' },
    ],
    proof: {
      client: 'Russell Painting',
      metric: '4.9★ local trust conversion',
      href: '/work/russell-painting',
    },
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function ServicesExperience() {
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
            The work usually starts in one of four places.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.lead}>
            Most businesses don&apos;t need more activity. They need the right bottleneck fixed
            first — whether that&apos;s strategy, website performance, CRM and automation, or
            visibility and demand.
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroActions}>
            <Link href="/contact?intent=service" className={styles.primaryCta}>
              Start a conversation
            </Link>
            <Link href="/work" className={styles.secondaryCta}>
              See the work
              <ArrowRightIcon size={15} weight="light" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4 Problem Clusters ── */}
      <section className={styles.clustersSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.clustersGrid}>
            {clusters.map((cluster, i) => (
              <motion.div
                key={cluster.id}
                className={styles.clusterCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Cluster header */}
                <div className={styles.clusterHeader}>
                  <span className={styles.clusterIconWrap}>
                    <cluster.Icon size={18} weight="light" />
                  </span>
                  <div>
                    <p className={styles.clusterLabel}>{cluster.label}</p>
                    <p className={styles.clusterProblem}>{cluster.problem}</p>
                  </div>
                </div>

                {/* Body */}
                <p className={styles.clusterBody}>{cluster.body}</p>

                {/* Child-service links */}
                <ul className={styles.clusterLinks}>
                  {cluster.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.clusterLink}>
                        <ArrowRightIcon size={13} weight="regular" className={styles.clusterLinkArrow} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Proof anchor */}
                <Link href={cluster.proof.href} className={styles.clusterProof}>
                  <span className={styles.clusterProofMetric}>{cluster.proof.metric}</span>
                  <span className={styles.clusterProofClient}>{cluster.proof.client} →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <motion.div
            className={styles.ctaBlock}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className={styles.ctaCopy}>
              <p className={styles.sectionEyebrow}>Next step</p>
              <h2 className={styles.ctaHeadline}>
                If you can name the problem, the next step is a conversation.
              </h2>
              <p className={styles.ctaBody}>
                No pitch. Just a practical conversation about what is actually getting in the way.
                I reply within 1 business day, usually faster.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact?intent=service" className={styles.primaryCta}>
                Start a conversation
              </Link>
              <Link href="/work" className={styles.secondaryCta}>
                See the work
                <ArrowRightIcon size={15} weight="light" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
