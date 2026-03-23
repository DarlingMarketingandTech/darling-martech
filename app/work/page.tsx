'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getAllCaseStudies } from '@/lib/case-studies'
import { containerVariants, itemVariants, fadeVariants, springEntrance, viewport } from '@/lib/motion'
import styles from './Work.module.css'

const allStudies = getAllCaseStudies()

function WorkCard({ cs, index }: { cs: ReturnType<typeof getAllCaseStudies>[0]; index: number }) {
  const isReady = cs.status === 'ready'

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      whileHover={isReady ? { scale: 1.005 } : undefined}
      transition={springEntrance}
    >
      {isReady ? (
        <Link href={`/work/${cs.slug}`} className={styles.cardLink}>
          <WorkCardInner cs={cs} />
        </Link>
      ) : (
        <div className={styles.cardDisabled}>
          <WorkCardInner cs={cs} />
        </div>
      )}
    </motion.div>
  )
}

function WorkCardInner({ cs }: { cs: ReturnType<typeof getAllCaseStudies>[0] }) {
  return (
    <div className={styles.cardPadding}>
      <div className={styles.cardTop}>
        <div>
          <span className={styles.cardIndustry}>{cs.industry}</span>
          <h2 className={styles.cardClient}>{cs.client}</h2>
        </div>
        <div className={styles.cardMetricWrap}>
          <p className={styles.cardMetric}>{cs.metric}</p>
          <p className={styles.cardMetricLabel}>{cs.metricLabel}</p>
        </div>
      </div>

      <p className={styles.cardDesc}>{cs.description}</p>

      <div className={styles.cardBottom}>
        <div className={styles.cardTags}>
          {cs.services?.slice(0, 3).map((s) => (
            <span key={s} className={styles.cardTag}>{s}</span>
          ))}
        </div>
        {cs.status === 'ready' && (
          <span className={styles.cardCta}>View case study →</span>
        )}
        {cs.status === 'content-needed' && (
          <span className={styles.cardSoon}>Coming soon</span>
        )}
      </div>
    </div>
  )
}

export default function WorkPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.headerWrap}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeVariants} className={styles.eyebrow}>
            Selected Work
          </motion.p>
          <motion.h1 variants={itemVariants} className={styles.headline}>
            Work that proves the point.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.subheadline}>
            Across healthcare, legal, finance, retail, nonprofits, and local business — here&apos;s
            what strategy and execution look like when the same person does both.
          </motion.p>
        </motion.div>

        {/* Case study grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {allStudies.map((cs, i) => (
            <WorkCard key={cs.slug} cs={cs} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className={styles.ctaBody}>
            More case studies are in development. Ready to become the next one?
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springEntrance}
              style={{ display: 'inline-block' }}
            >
              <Link href="/contact" className={styles.ctaBtn}>
                Let&apos;s talk
                <span className={styles.ctaArrow}>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
