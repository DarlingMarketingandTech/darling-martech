'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import styles from './ContactCTA.module.css'

export function ContactCTA() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.h2 className={styles.headline} variants={itemVariants}>
          Need help choosing the right next step?
        </motion.h2>
        <motion.p className={styles.body} variants={itemVariants}>
          If you&apos;ve looked at the work, services, or tools and still need direction,
          we can map the right path together.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springEntrance}
            className="inline-block"
          >
            <Link href="/contact?intent=unsure" className={styles.ctaButton}>
              Start a conversation →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
