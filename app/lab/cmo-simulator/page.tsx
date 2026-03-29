'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PlayCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import CmoAccessModal from '@/components/lab/CmoAccessModal'
import { springEntrance, viewport } from '@/lib/motion'
import styles from '@/components/lab/LabDetailPage.module.css'

function AutoLaunch({ onLaunch }: { onLaunch: () => void }) {
  const searchParams = useSearchParams()
  const autoLaunched = useRef(false)

  useEffect(() => {
    if (!autoLaunched.current && searchParams.get('launch') === '1') {
      onLaunch()
      autoLaunched.current = true
    }
  }, [searchParams, onLaunch])

  return null
}

export default function CmoSimulatorPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.page}>
      {/* Back link */}
      <div className={styles.backWrap}>
        <Link href="/lab" className={styles.backLink}>
          <ArrowLeft weight="regular" size={15} />
          All builds
        </Link>
      </div>

      {/* Hero */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.heroMeta}>
          <span className={styles.category}>Marketing</span>
          <span className={styles.year}>2025</span>
        </div>
        <h1 className={styles.h1}>CMO Simulator</h1>
        <p className={styles.tagline}>
          A 10-minute interactive framework that walks you through CMO-level decision-making —
          budget allocation, channel strategy, KPI selection, and execution priority. The same
          logic I use with clients.
        </p>
        <div className={styles.metrics}>
          {[
            { value: '~10 min', label: 'Average session time' },
            { value: 'Free', label: 'No cost, no catch' },
            { value: '15+ yrs', label: 'Of real client frameworks distilled' },
          ].map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Try It Now */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Try It Now</span>
        <h2 className={styles.sectionH2}>Launch the simulator below.</h2>
        <p className={styles.sectionBody}>
          This is the actual tool — not a screenshot, not a video. Drop your name and email
          to unlock it and it opens right here in the page.
        </p>
        <motion.button
          className={styles.launchBtn}
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <PlayCircle weight="fill" size={20} />
          Launch CMO Simulator
        </motion.button>
      </motion.section>

      {/* The Problem */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Problem</span>
        <div className={styles.prose}>
          <p>
            Most marketing conversations start in the wrong place. Teams jump straight to
            tactics — which channels, which ads, which content — before establishing the
            strategic logic that should be driving those decisions. The result is fragmented
            execution, wasted budget, and no clear story for what&apos;s working and why.
          </p>
          <p>
            CMO-level thinking is a specific skill. It&apos;s the ability to see budget
            allocation, channel strategy, KPI selection, and execution priority as an
            integrated system — where each decision informs the others. Most marketers never
            get exposure to that kind of structured decision-making unless they&apos;ve worked
            directly with a senior strategist.
          </p>
          <p>
            I built the CMO Simulator to make that framework self-serve. The same logic I use
            when I onboard a new client — the questions I ask, the tradeoffs I surface, the
            prioritization decisions — packaged as an interactive tool you can run yourself
            in about 10 minutes.
          </p>
        </div>
      </motion.section>

      {/* Screen Captures */}
      <motion.section
        className={styles.screenshotsSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Screen Captures</span>
        <div className={styles.screenshots}>
          <figure className={styles.figure}>
            <div className={styles.screenshotFrame}>
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_Q1.png"
                alt="CMO Simulator — question one walkthrough"
                width={1400}
                height={2200}
                className={styles.screenshot}
                unoptimized
              />
            </div>
            <figcaption className={styles.caption}>
              The simulator walks through one decision at a time — no overwhelm, just structure.
            </figcaption>
          </figure>
          <figure className={styles.figure}>
            <div className={styles.screenshotFrame}>
              <Image
                src="https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_build_your_own_company.png"
                alt="CMO Simulator — build your own company step"
                width={1400}
                height={734}
                className={styles.screenshot}
                unoptimized
              />
            </div>
            <figcaption className={styles.caption}>
              Each step builds the strategic foundation before moving to the next decision layer.
            </figcaption>
          </figure>
        </div>
      </motion.section>

      {/* The Build */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Build</span>
        <div className={styles.prose}>
          <p>
            The CMO Simulator is structured as a guided decision-making session. The user moves
            through a series of framing questions — about their organization&apos;s goals, their
            current marketing reality, their budget constraints, and their execution capacity —
            and at each step, the tool responds with the strategic logic that a CMO would apply.
          </p>
          <p>
            The experience is less &ldquo;quiz&rdquo; and more &ldquo;thinking partner.&rdquo;
            The goal isn&apos;t to give you a score. It&apos;s to walk you through the exact
            sequence of questions a senior marketer asks before touching tactics. Budget before
            channels. Channels before content. Measurement before execution.
          </p>
          <p>
            The access gate is intentionally light. Name and email — that&apos;s it. No sales
            sequence follows. I use the data to understand who&apos;s engaging with the tool and
            to reach out personally if someone&apos;s situation looks like a fit for working
            together. The simulator does the qualifying; I do the conversation.
          </p>
        </div>
        <div className={styles.stackTable}>
          <div className={styles.stackHeader}>
            <span>Layer</span>
            <span>Choice</span>
            <span>Why</span>
          </div>
          {[
            { layer: 'Framework', choice: 'Next.js App Router', why: 'Full React control with server rendering for fast initial load and good SEO on the access page' },
            { layer: 'Hosting', choice: 'Vercel', why: 'Instant deployment, preview URLs, global CDN' },
            { layer: 'State', choice: 'React + session flow', why: 'Multi-step wizard with conditional branching based on user responses' },
            { layer: 'Access Gate', choice: 'Name + email + Resend', why: 'Light-touch gating — not a paywall, just context capture with email notification on access' },
            { layer: 'Persistence', choice: 'sessionStorage bypass', why: 'Returning visitors skip the gate — frictionless after the first visit' },
          ].map((row) => (
            <div key={row.layer} className={styles.stackRow}>
              <span className={styles.stackLayer}>{row.layer}</span>
              <span className={styles.stackChoice}>{row.choice}</span>
              <span className={styles.stackWhy}>{row.why}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* The Impact */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Impact</span>
        <div className={styles.prose}>
          <p>
            The CMO Simulator serves two purposes. For potential clients, it demonstrates the
            kind of thinking they&apos;d get working with me — before they have to commit to a
            conversation. It builds credibility in a way a case study can&apos;t: you experience
            the framework instead of reading about it.
          </p>
          <p>
            For me, it&apos;s a qualification mechanism. Someone who takes 10 minutes to work
            through a CMO-level decision framework has already demonstrated the kind of strategic
            mindset that makes for a good client engagement. By the time they reach out,
            we&apos;re already aligned on how to think about marketing problems.
          </p>
        </div>
      </motion.section>

      {/* What This Proves */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>What This Proves</span>
        <blockquote className={styles.proofQuote}>
          That the best sales tool is a demonstration of how you think — and that a free
          interactive framework can qualify clients better than any discovery call script.
        </blockquote>
      </motion.section>

      {/* CTA */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <p className={styles.ctaLine}>
          Ready to think through your marketing strategy with someone who&apos;s done this for 15 years?
        </p>
        <Link href="/contact" className={styles.ctaBtn}>
          Let&apos;s talk
          <ArrowRight weight="regular" size={16} />
        </Link>
        <Link href="/lab" className={styles.backToLab}>
          ← Back to all builds
        </Link>
      </motion.section>

      {/* Auto-launch from ?launch=1 query param */}
      <Suspense>
        <AutoLaunch onLaunch={() => setModalOpen(true)} />
      </Suspense>

      {/* Access Modal */}
      <CmoAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
