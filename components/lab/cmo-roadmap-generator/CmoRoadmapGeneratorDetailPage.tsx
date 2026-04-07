'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ListChecks, Path } from '@phosphor-icons/react'
import { analytics } from '@/lib/analytics'
import { springEntrance, viewport } from '@/lib/motion'
import styles from './CmoRoadmapGeneratorDetailPage.module.css'

const RELATED_SERVICES = [
  { href: '/services/fractional-cmo', label: 'Fractional CMO' },
  { href: '/services/brand-strategy', label: 'Brand strategy' },
  { href: '/services/martech-audit', label: 'MarTech audit' },
] as const

export default function CmoRoadmapGeneratorDetailPage() {
  useEffect(() => {
    analytics.toolView('CMO Roadmap Generator', 'route')
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.backWrap}>
        <Link href="/tools" className={styles.backLink}>
          <ArrowLeft size={15} weight="regular" />
          All tools
        </Link>
      </div>

      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.heroMeta}>
          <span className={styles.category}>Tools</span>
          <span className={styles.year}>2026</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <h1 className={styles.title}>Build a 90-day marketing roadmap you can actually execute.</h1>
            <p className={styles.tagline}>
              Guided intake, deterministic planning logic, phased priorities, and a clear next step — native to this site, not a bolted-on microsite.
            </p>
            <p className={styles.intro}>
              The CMO Roadmap Generator turns a short set of answers about your goals, bottlenecks, channels, and capacity into a prioritized roadmap you can align on internally or bring into a focused conversation.
            </p>
            <div className={styles.heroActions}>
              <Link href="/tools/cmo-roadmap-generator/intake" className={styles.primaryCta}>
                Start the intake
                <ArrowRight size={18} weight="regular" aria-hidden />
              </Link>
              <a href="#what-you-get" className={styles.secondaryCta}>
                What the roadmap includes
              </a>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.metricStrip}>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>7</span>
                <span className={styles.metricLabel}>framing questions</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>90</span>
                <span className={styles.metricLabel}>day phased plan</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>1</span>
                <span className={styles.metricLabel}>artifact you keep</span>
              </div>
            </div>
            <div className={styles.signalGrid}>
              {[
                'Executive summary tied to your inputs',
                'Top priorities and three 30-day phases',
                'Service and engagement recommendations plus watch-outs',
              ].map((item) => (
                <div key={item} className={styles.signalCard}>
                  <ListChecks size={18} weight="regular" aria-hidden />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>What it is</span>
        <h2 className={styles.sectionTitle}>A structured planning pass, not a generic template download.</h2>
        <p className={styles.sectionBody}>
          You answer the same kinds of questions I use in live engagements: what you are trying to move, what is blocking progress, which channels are in play, how mature the stack is, and what the team can realistically carry. The output is a roadmap shaped around that reality — written so you can execute, delegate, or use it to scope the right help.
        </p>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Who it is for</span>
        <h2 className={styles.sectionTitle}>Operators who need sequence before more spend or more hires.</h2>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Founders with unclear priorities</h3>
            <p className={styles.cardBody}>You know marketing matters, but the next 90 days need a clear order of operations.</p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Teams juggling too many channels</h3>
            <p className={styles.cardBody}>You need weighting and phasing — not another list of tactics.</p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Leaders who want a plan before a full engagement</h3>
            <p className={styles.cardBody}>You want an artifact that makes internal alignment or vendor conversations faster.</p>
          </article>
          <article className={styles.card}>
            <h3 className={styles.cardTitle}>Anyone preparing to invest or rebuild</h3>
            <p className={styles.cardBody}>You want confidence that spend and build work map to the actual bottleneck.</p>
          </article>
        </div>
      </motion.section>

      <motion.section
        id="what-you-get"
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>What the roadmap includes</span>
        <h2 className={styles.sectionTitle}>Deliverables designed to be useful the same day.</h2>
        <ul className={styles.bulletList}>
          <li>Executive summary grounded in your stage, goal, and bottleneck</li>
          <li>Top three priorities with explicit rationale</li>
          <li>A three-phase 30 / 30 / 30 plan you can calendar</li>
          <li>Recommended service path and engagement shape when deeper work makes sense</li>
          <li>Watch-outs so you do not mistake motion for progress</li>
          <li>Room for share, print, and email handoff once the full flow ships on this route</li>
        </ul>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>How it works</span>
        <h2 className={styles.sectionTitle}>High-level flow from answers to artifact.</h2>
        <ol className={styles.stepsList}>
          <li>You complete a guided intake — seven questions covering business context, goal, bottleneck, channels, stack maturity, and team capacity.</li>
          <li>The engine applies deterministic rules: your answers set flags and weights; there is no open-ended model improvisation in the planning layer.</li>
          <li>Roadmap modules are ranked and placed into phased work so the plan reads as a sequence, not a pile of ideas.</li>
          <li>You leave with a 90-day view you can keep, share internally, or use to open a specific service conversation.</li>
        </ol>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Why deterministic planning matters</span>
        <h2 className={styles.sectionTitle}>Same inputs, same structure — so the roadmap is defensible.</h2>
        <blockquote className={styles.quote}>
          This is not a quiz score, not a one-off AI guess, and not a static PDF template. It is explicit logic that maps a small set of real constraints to phased priorities. That keeps the output consistent enough to debate, revise, and execute — which is what planning is for.
        </blockquote>
        <p className={styles.sectionBody}>
          When the logic is visible and repeatable, your team can argue with the plan productively instead of wondering how it was invented.
        </p>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>After you run it</span>
        <h2 className={styles.sectionTitle}>Keep the artifact, then choose your next move.</h2>
        <ul className={styles.bulletList}>
          <li>Keep the roadmap as the single source of truth for the next quarter</li>
          <li>Share it with leadership or agency partners so everyone works from the same sequence</li>
          <li>Save or print it for working sessions (full print and email paths land with the completed native flow)</li>
          <li>Use it to enter the right service conversation with context already on the table</li>
        </ul>
      </motion.section>

      <motion.section
        id="start-intake"
        className={styles.intakeSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.intakeCard}>
          <Path size={28} weight="regular" className={styles.intakeIcon} aria-hidden />
          <h2 className={styles.intakeTitle}>Start the intake</h2>
          <p className={styles.intakeBody}>
            Seven questions, then your roadmap renders on-site. You can print, copy a shareable link, or email yourself a summary — all from the results view.
          </p>
          <p className={styles.intakeBody}>
            Prefer to talk before running the flow? Start with context and I will meet you where you are.
          </p>
          <div className={styles.intakeActions}>
            <Link href="/tools/cmo-roadmap-generator/intake" className={styles.primaryCta}>
              Begin the questionnaire
              <ArrowRight size={18} weight="regular" aria-hidden />
            </Link>
            <Link href="/contact?intent=tool" className={styles.secondaryCta}>
              Talk through your roadmap first
            </Link>
            <Link href="/tools" className={styles.ghostLink}>
              ← Back to all tools
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Related services</span>
        <h2 className={styles.sectionTitle}>Where this connects in the broader offer map.</h2>
        <ul className={styles.serviceList}>
          {RELATED_SERVICES.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.serviceLink}>
                {item.label}
                <ArrowRight size={16} weight="regular" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </motion.section>
    </main>
  )
}
