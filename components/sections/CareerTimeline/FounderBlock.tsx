'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './CareerTimeline.module.css'

export function FounderBlock() {
  return (
    <motion.div
      className={styles.founderBlock}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={containerVariants}
    >
      {/* Left — year anchor */}
      <motion.div variants={itemVariants}>
        <p className={styles.founderYear}>2026</p>
        <p className={styles.founderPresent}>Present</p>
        <p className={styles.founderRole}>Founder</p>
      </motion.div>

      {/* Right — editorial copy */}
      <motion.div variants={containerVariants} className={styles.founderCopy}>
        <motion.div variants={itemVariants}>
          <h3 className={styles.founderHeading}>Darling MarTech</h3>
          <p className={styles.founderPara}>
            I started Darling MarTech in January 2026 because small businesses deserve the kind of
            senior-level marketing strategy and technical execution that used to be reserved for brands
            with agency retainers — and they deserve it from one person who actually does the work.
          </p>
        </motion.div>
        <motion.p variants={itemVariants} className={styles.founderPara}>
          I work with small businesses and startups that need both the strategy and the system
          that executes it. The ones who are tired of hiring agencies that hand them off to juniors,
          or freelancers who can build a site but can&apos;t build a pipeline.
        </motion.p>
        <motion.p variants={itemVariants} className={styles.founderPara}>
          I solve the gap between marketing vision and technical reality. No hand-offs. No account
          managers. Strategy, automation, development, and analytics — handled directly, measured
          honestly, built to compound.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
