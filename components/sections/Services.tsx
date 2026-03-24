'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChartLineUpIcon,
  CircuitryIcon,
  PaletteIcon,
  RocketLaunchIcon,
} from '@phosphor-icons/react'
import {
  containerVariants,
  itemVariants,
  springEntrance,
  viewport,
} from '@/lib/motion'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { serviceOverview } from '@/data/services'
import styles from '@/styles/Services.module.css'

const iconMap = {
  strategy: ChartLineUpIcon,
  'brand-web': PaletteIcon,
  systems: CircuitryIcon,
  growth: RocketLaunchIcon,
} as const

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.intro}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className={styles.header}>
            <motion.p variants={itemVariants} className={styles.eyebrow}>
              Services
            </motion.p>
            <motion.h2 variants={itemVariants} className={styles.headline}>
              Strategy, systems, and execution that actually connect.
            </motion.h2>
          </div>

          <motion.div variants={itemVariants} className={styles.copyBlock}>
            <p className={styles.body}>
              The short version: I help businesses clarify the offer, sharpen the brand,
              rebuild the website, wire up the backend systems, and improve how leads,
              bookings, sales, and reporting work together.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/services" className={styles.primaryCta}>
                Explore services
                <ArrowRightIcon size={18} weight="regular" />
              </Link>
              <Link href="/work" className={styles.secondaryCta}>
                See the proof
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {serviceOverview.map((service, index) => {
            const Icon = iconMap[service.id as keyof typeof iconMap]
            const posClass = styles[`card${index + 1}` as keyof typeof styles]

            return (
              <motion.div
                key={service.title}
                className={`${styles.cardWrapper} ${posClass}`}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={springEntrance}
              >
                <Link href={service.href} className={styles.cardLink}>
                  <FloatingCard maxTilt={10} className={styles.card}>
                    <div className={styles.gridTexture} aria-hidden="true" />
                    <div className={styles.holoOverlay} aria-hidden="true" />

                    <div className={styles.cardContent}>
                      <div className={styles.cardTop}>
                        <span className={styles.iconWrap}>
                          <Icon size={28} weight="light" />
                        </span>
                        <span className={styles.arrowWrap}>
                          <ArrowUpRightIcon size={20} weight="regular" />
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      <p className={styles.cardDesc}>{service.summary}</p>
                      <ul className={styles.cardList}>
                        {service.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </FloatingCard>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
