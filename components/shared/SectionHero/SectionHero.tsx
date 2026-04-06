'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/motion'
import styles from './SectionHero.module.css'

export type SectionHeroVariant = 'services' | 'work' | 'tools'

export type SectionHeroCta = {
  label: string
  href: string
  kind?: 'primary' | 'secondary'
}

export type SectionHeroProps = {
  variant: SectionHeroVariant
  eyebrow: string
  title: string
  description: string
  primaryCta: SectionHeroCta
  secondaryCta?: SectionHeroCta
  supportingContent?: React.ReactNode
  className?: string
}

function getCtaClass(kind: SectionHeroCta['kind']) {
  return kind === 'secondary' ? styles.ctaSecondary : styles.ctaPrimary
}

export function SectionHero({
  variant,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  supportingContent,
  className,
}: SectionHeroProps) {
  const sectionClassName = [styles.section, styles[variant], className].filter(Boolean).join(' ')

  return (
    <section className={sectionClassName}>
      <div className={styles.inner}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className={styles.eyebrow}>
            {eyebrow}
          </motion.p>
          <motion.h1 variants={itemVariants} className={styles.title}>
            {title}
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.description}>
            {description}
          </motion.p>

          <motion.div variants={itemVariants} className={styles.actions}>
            <Link
              href={primaryCta.href}
              className={getCtaClass(primaryCta.kind ?? 'primary')}
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={getCtaClass(secondaryCta.kind ?? 'secondary')}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </motion.div>

          {supportingContent ? (
            <motion.div variants={itemVariants} className={styles.supportingContent}>
              {supportingContent}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}