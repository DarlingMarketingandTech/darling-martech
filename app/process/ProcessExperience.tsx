'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MagnifyingGlass,
  Compass,
  Wrench,
  ChartLineUp,
} from '@phosphor-icons/react'
import { engagementModels } from '@/data/services'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './ProcessPage.module.css'

const STEPS = [
  {
    number: '01',
    icon: MagnifyingGlass,
    label: 'Diagnose',
    description:
      'Before any work starts, I need to understand what is actually happening — not just what feels broken. That means auditing the stack, the strategy, the data, and the gaps. Most clients skip this. That is why they are talking to me.',
  },
  {
    number: '02',
    icon: Compass,
    label: 'Design',
    description:
      'After diagnosis, I design the system or plan that will fix it. That might be a positioning strategy, a CRM architecture, a content system, or an acquisition roadmap. The design phase is where the scope gets defined and the priorities get sequenced.',
  },
  {
    number: '03',
    icon: Wrench,
    label: 'Build',
    description:
      'This is where I execute. Website, automation stack, CRM workflows, analytics setup, launch content — whatever was scoped. I build directly. No hand-offs. No junior team members running point while I disappear.',
  },
  {
    number: '04',
    icon: ChartLineUp,
    label: 'Optimize',
    description:
      'After launch or implementation, the work shifts to measurement and iteration. What is converting? What is leaking? What is the next constraint? This phase is where embedded retainers live and where the highest-leverage compounding happens.',
  },
]

const BUYER_PATHS = [
  {
    type: 'Burned Founder',
    description:
      'You have already tried the agency route. You burned money, got a deck, and nothing moved. You need one person who owns the strategy and builds the thing.',
    recommended: 'Audit / Advisory → Project Build',
    href: '/services/martech-audit',
  },
  {
    type: 'Scaling Operator',
    description:
      'Revenue is growing but the systems are not keeping up. The CRM is a mess, attribution is broken, and the marketing calendar is reactive. You need infrastructure, not just tactics.',
    recommended: 'Project Build or Embedded',
    href: '/services/agentic-marketing-systems',
  },
  {
    type: 'Tech-Confused CMO',
    description:
      'You understand strategy but the technical stack is opaque. You need a partner who speaks both languages and can turn marketing intent into working systems without requiring a PhD to manage it.',
    recommended: 'Audit / Advisory → Embedded',
    href: '/services/martech-audit',
  },
  {
    type: 'Ambitious Newcomer',
    description:
      'You are building something new and want to do it right the first time. No technical debt, no mismatched tools, no wasted budget. Start with a clear foundation.',
    recommended: 'Audit / Advisory → Project Build',
    href: '/services/brand-strategy',
  },
]

export function ProcessExperience() {
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
            How I Work
          </motion.p>
          <motion.h1 variants={itemVariants} className={styles.headline}>
            Diagnosis before execution.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.lead}>
            Most marketing problems are not strategy problems or execution problems in isolation.
            They are sequencing problems. I start with a clear picture of what is happening, then
            design and build the system that fixes it — no hand-offs, no agency layers.
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroActions}>
            <Link href="/services/martech-audit" className={styles.primaryCta}>
              Request a MarTech Audit
            </Link>
            <Link href="/contact" className={styles.secondaryCta}>
              Start a conversation
              <ArrowRight size={15} weight="light" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4-step operating model ── */}
      <section className={styles.stepsSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Operating model
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Four phases. One owner. No hand-offs.
          </motion.h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className={styles.stepCard}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                >
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <span className={styles.stepIconWrap}>
                      <Icon size={18} weight="light" />
                    </span>
                  </div>
                  <h3 className={styles.stepLabel}>{step.label}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Engagement paths ── */}
      <section className={styles.pathsSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Engagement models
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Three ways to engage.
          </motion.h2>
          <div className={styles.pathsGrid}>
            {engagementModels.map((model) => (
              <motion.div
                key={model.id}
                className={styles.pathCard}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <h3 className={styles.pathTitle}>{model.title}</h3>
                <p className={styles.pathSummary}>{model.summary}</p>
                <p className={styles.pathBestFor}>
                  <span className={styles.pathBestForLabel}>Best for:</span> {model.bestFor}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Which path is right for you ── */}
      <section className={styles.buyerSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Which path fits
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Different problems, different entry points.
          </motion.h2>
          <div className={styles.buyerGrid}>
            {BUYER_PATHS.map((buyer) => (
              <motion.div
                key={buyer.type}
                className={styles.buyerCard}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <h3 className={styles.buyerType}>{buyer.type}</h3>
                <p className={styles.buyerDescription}>{buyer.description}</p>
                <div className={styles.buyerRecommended}>
                  <span className={styles.buyerRecommendedLabel}>Recommended path:</span>
                  <span className={styles.buyerRecommendedValue}>{buyer.recommended}</span>
                </div>
                <Link href={buyer.href} className={styles.buyerCta}>
                  Get started <ArrowRight size={13} weight="light" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to expect ── */}
      <section className={styles.expectSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.expectBlock}>
            <div className={styles.expectCopy}>
              <motion.p
                className={styles.sectionEyebrow}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                What to expect
              </motion.p>
              <motion.h2
                className={styles.sectionHeadline}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                How the first phase works.
              </motion.h2>
              <motion.p
                className={styles.expectLead}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                Most engagements start with a MarTech Audit or a strategy conversation. Here is
                what happens from there.
              </motion.p>
            </div>
            <motion.ol
              className={styles.expectList}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {[
                {
                  heading: 'Intake and scoping call',
                  body: 'A 30–45 minute call to understand the business, current stack, and what is not working. No sales pitch. Just diagnosis.',
                },
                {
                  heading: 'Audit or strategy deliverable',
                  body: 'Within 2–4 weeks, you receive a written findings document with prioritized recommendations and a clear implementation roadmap.',
                },
                {
                  heading: 'Scope decision',
                  body: 'You decide whether to implement internally, hand off the roadmap, or continue into a project build or retainer engagement.',
                },
                {
                  heading: 'Build or optimize phase',
                  body: 'If we continue, execution begins against the roadmap. Milestones are defined upfront. Deliverables are tied to outcomes, not hours.',
                },
              ].map((item, i) => (
                <motion.li key={i} className={styles.expectItem} variants={itemVariants}>
                  <span className={styles.expectNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong className={styles.expectHeading}>{item.heading}</strong>
                    <p className={styles.expectBody}>{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
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
                Not sure which path fits? Start with the audit.
              </h2>
              <p className={styles.ctaLead}>
                The MarTech Audit is how most engagements start. It surfaces the real problems,
                prioritizes what to fix first, and gives you a roadmap you can use — whether we
                continue together or not.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/services/martech-audit" className={styles.primaryCta}>
                Request a MarTech Audit
              </Link>
              <Link href="/contact" className={styles.secondaryCta}>
                Start a project
                <ArrowRight size={15} weight="light" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
