'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideInLeft, slideInRight, itemVariants, containerVariants, viewport } from '@/lib/motion'
import { cloudinaryLoader } from '@/lib/cloudinary'
import styles from './AboutTeaser.module.css'

// Bio portrait — studio/graphic-design/bio-featured-2 (1009×1188)
const BIO_PHOTO_PUBLIC_ID = 'studio/graphic-design/bio-featured-2'

export function AboutTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.layout}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* Left column — copy */}
          <motion.div className={styles.textCol} variants={slideInLeft}>
            <p className={styles.label}>About</p>
            <h2 className={styles.headline}>
              Both sides.<br />One person.
            </h2>
            <p className={styles.body}>
              Most consultants know marketing or technology. I&apos;ve spent 15 years doing both —
              leading marketing teams, architecting CRM systems, building automation workflows, and
              shipping code. When you hire me, you get me directly. No account managers. No
              hand-offs. Just clear thinking and clean execution.
            </p>
            <motion.div variants={itemVariants}>
              <Link href="/about" className={styles.cta}>
                Read my story →
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — photo */}
          <motion.div className={styles.imageCol} variants={slideInRight}>
            <div className={styles.imageWrap}>
              <div className={styles.accentLine} aria-hidden="true" />
              <Image
                loader={cloudinaryLoader}
                src={BIO_PHOTO_PUBLIC_ID}
                alt="Jacob Darling — Marketing Strategist and Systems Architect based in Indianapolis"
                fill
                className={styles.image}
                sizes="(max-width: 767px) 100vw, 40vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
