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
          Ready to build something that works?
        </motion.h2>
        <motion.p className={styles.body} variants={itemVariants}>
          I work directly with a small number of clients at a time. Every engagement gets my full attention.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springEntrance}
            className="inline-block"
          >
            <Link href="/contact" className={styles.ctaButton}>
              Let&apos;s talk →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
