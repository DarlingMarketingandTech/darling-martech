'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import LabModal from './LabModal'
import { springEntrance, viewport } from '@/lib/motion'
import type { LabDetailProps } from '@/data/labs'
import styles from './LabDetailPage.module.css'

export default function LabDetailPage({
  slug,
  name,
  category,
  year,
  tagline,
  metrics,
  problemBody,
  buildStack,
  buildBody,
  impactBody,
  proofStatement,
  ctaLine,
  toolSrc,
  screenshots,
}: LabDetailProps) {
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

      {/* Hero — animate on mount, not whileInView */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.heroMeta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <h1 className={styles.h1}>{name}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.metrics}>
          {metrics.map((m) => (
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
        <h2 className={styles.sectionH2}>Launch the tool below.</h2>
        <p className={styles.sectionBody}>
          This is the actual tool — not a screenshot, not a video. Click Launch to open it
          in a full panel and use it yourself.
        </p>
        <motion.button
          className={styles.launchBtn}
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <PlayCircle weight="fill" size={20} />
          Launch {name}
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
          {problemBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.section>

      {/* Screen Captures — conditional */}
      {screenshots.length > 0 && (
        <motion.section
          className={styles.screenshotsSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <span className={styles.sectionLabel}>Screen Captures</span>
          <div className={styles.screenshots}>
            {screenshots.map((s, i) => (
              <figure key={i} className={styles.figure}>
                <div className={styles.screenshotFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} className={styles.screenshot} loading="lazy" />
                </div>
                <figcaption className={styles.caption}>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </motion.section>
      )}

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
          {buildBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className={styles.stackTable}>
          <div className={styles.stackHeader}>
            <span>Layer</span>
            <span>Choice</span>
            <span>Why</span>
          </div>
          {buildStack.map((row) => (
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
          {impactBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
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
        <blockquote className={styles.proofQuote}>{proofStatement}</blockquote>
      </motion.section>

      {/* CTA */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <p className={styles.ctaLine}>{ctaLine}</p>
        <Link href="/contact" className={styles.ctaBtn}>
          Let&apos;s talk
          <ArrowRight weight="regular" size={16} />
        </Link>
        <Link href="/lab" className={styles.backToLab}>
          ← Back to all builds
        </Link>
      </motion.section>

      {/* Modal */}
      <LabModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        toolSrc={toolSrc}
        toolName={name}
        toolSlug={slug}
      />
    </main>
  )
}
