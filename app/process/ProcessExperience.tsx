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
import {
  processHero,
  processProblemCards,
  processProofBridge,
  processPhaseIntro,
  processPhaseSteps,
  processHowWorkRuns,
  processNotCookieCutter,
  processToolsPhilosophy,
} from '@/data/process'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import { ToolPathRail } from '@/components/sections/ToolPathRail/ToolPathRail'
import styles from './ProcessPage.module.css'

const PHASE_ICONS = [MagnifyingGlass, Compass, Wrench, ChartLineUp] as const

export function ProcessExperience() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroInner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className={styles.eyebrow}>
            {processHero.eyebrow}
          </motion.p>
          <motion.h1 variants={itemVariants} className={styles.headline}>
            {processHero.headline}
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.lead}>
            {processHero.lead}
          </motion.p>
          <motion.div variants={itemVariants} className={styles.heroActions}>
            <Link href="/services/martech-audit" className={styles.primaryCta}>
              Request a MarTech Audit
            </Link>
            <Link href="/contact?intent=service" className={styles.secondaryCta}>
              Start a conversation
              <ArrowRight size={15} weight="light" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className={styles.problemSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Where teams get stuck
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Problems, outcomes, and where to start.
          </motion.h2>
          <div className={styles.problemGrid}>
            {processProblemCards.map((card) => (
              <motion.article
                key={card.id}
                className={styles.problemCard}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <h3 className={styles.problemTitle}>{card.problem}</h3>
                <p className={styles.problemOutcome}>
                  <span className={styles.problemOutcomeLabel}>What good looks like</span>
                  {card.outcome}
                </p>
                <div className={styles.problemActions}>
                  <Link href={card.primaryHref} className={styles.problemPrimaryLink}>
                    {card.primaryLabel}
                    <ArrowRight size={14} weight="light" aria-hidden />
                  </Link>
                  {card.proofHref ? (
                    <Link href={card.proofHref} className={styles.proofInlineLink}>
                      {card.proofLabel}
                    </Link>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ToolPathRail
        mode="path"
        location="process_tool_path"
        eyebrow="Guided tool path"
        title="Assess, prioritize, and plan before you buy."
        description="If you are not sure which engagement model fits yet, run the sequence below. Each step sharpens the next conversation."
      />

      <section className={styles.runSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processHowWorkRuns.eyebrow}
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processHowWorkRuns.headline}
          </motion.h2>
          <motion.p
            className={styles.runIntro}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processHowWorkRuns.intro}
          </motion.p>
          <ul className={styles.runList}>
            {processHowWorkRuns.bullets.map((item) => (
              <motion.li
                key={item.title}
                className={styles.runItem}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <strong className={styles.runItemTitle}>{item.title}</strong>
                <p className={styles.runItemBody}>{item.body}</p>
              </motion.li>
            ))}
          </ul>
          <motion.p
            className={styles.soloNote}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processHowWorkRuns.soloNote}
          </motion.p>
        </div>
      </section>

      <section className={styles.nuanceSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processNotCookieCutter.eyebrow}
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processNotCookieCutter.headline}
          </motion.h2>
          <motion.p
            className={styles.nuanceBody}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processNotCookieCutter.body}
          </motion.p>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            A schematic — not a script
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Four ideas every engagement passes through.
          </motion.h2>
          <motion.p
            className={styles.phaseFraming}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processPhaseIntro}
          </motion.p>
          <div className={styles.stepsGrid}>
            {processPhaseSteps.map((step, i) => {
              const Icon = PHASE_ICONS[i] ?? MagnifyingGlass
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

      <section className={styles.pathsSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Engagement shapes
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Three ways work usually takes form.
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

      <section className={styles.proofSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Receipts, not claims
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            Proof lives in the work.
          </motion.h2>
          <ul className={styles.proofBridgeList}>
            {processProofBridge.map((item) => (
              <motion.li
                key={item.slug}
                className={styles.proofBridgeItem}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
              >
                <Link href={`/work/${item.slug}`} className={styles.proofBridgeLink}>
                  {item.label}
                  <ArrowRight size={14} weight="light" aria-hidden />
                </Link>
                {item.context ? <p className={styles.proofBridgeContext}>{item.context}</p> : null}
              </motion.li>
            ))}
          </ul>
          <motion.p className={styles.proofBridgeMore} variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
            <Link href="/work" className={styles.proofBridgeMoreLink}>
              View all case studies
              <ArrowRight size={14} weight="light" aria-hidden />
            </Link>
          </motion.p>
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className={styles.sectionContainer}>
          <motion.p
            className={styles.sectionEyebrow}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processToolsPhilosophy.eyebrow}
          </motion.p>
          <motion.h2
            className={styles.sectionHeadline}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processToolsPhilosophy.headline}
          </motion.h2>
          <motion.p
            className={styles.toolsBody}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {processToolsPhilosophy.body}
          </motion.p>
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={viewport}>
            <Link href={processToolsPhilosophy.ctaHref} className={styles.toolsCta}>
              {processToolsPhilosophy.ctaLabel}
              <ArrowRight size={14} weight="light" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaBlock}>
            <div className={styles.ctaCopy}>
              <p className={styles.sectionEyebrow}>Next step</p>
              <h2 className={styles.ctaHeadline}>
                Not sure where to start? The audit still works.
              </h2>
              <p className={styles.ctaLead}>
                The MarTech Audit surfaces the real constraints, prioritizes what to fix first, and gives you a roadmap you can use — whether we continue together or not.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/services/martech-audit" className={styles.primaryCta}>
                Request a MarTech Audit
              </Link>
              <Link href="/contact?intent=service" className={styles.secondaryCta}>
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
