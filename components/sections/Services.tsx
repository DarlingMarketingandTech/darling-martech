'use client'

import { motion } from 'framer-motion'
import {
  ChartLineUpIcon,
  CodeIcon,
  GearIcon,
  MagnifyingGlassIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react'
import {
  containerVariants,
  itemVariants,
  viewport,
} from '@/lib/motion'
import { FloatingCard } from '@/components/3d/FloatingCard'
import styles from '@/styles/Services.module.css'

const services = [
  {
    icon: ChartLineUpIcon,
    title: 'Marketing Strategy & Consulting',
    description:
      'Brand positioning, go-to-market planning, and campaign strategy built around your specific goals — not a templated playbook.',
    posClass: styles.card1,
  },
  {
    icon: CodeIcon,
    title: 'Web & App Development',
    description:
      'Fast, modern websites and web apps built with Next.js — designed to look sharp, perform well, and turn visitors into clients.',
    posClass: styles.card2,
  },
  {
    icon: GearIcon,
    title: 'Tech Implementation',
    description:
      'The right tools, configured the right way. CRM, automation, analytics, and integrations handled by someone who understands both the tech and the marketing strategy behind it.',
    posClass: styles.card3,
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'SEO & Digital Marketing',
    description:
      'Search strategy, content systems, and digital campaigns built to compound over time — bringing qualified leads to you consistently.',
    posClass: styles.card4,
  },
]

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>

        {/* ── Section header ── */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.p variants={itemVariants} className={styles.eyebrow}>
            What I Do
          </motion.p>
          <motion.h2 variants={itemVariants} className={styles.headline}>
            Four disciplines.<br />One person.<br />Zero hand-offs.
          </motion.h2>
        </motion.div>

        {/* ── Asymmetric card grid ── */}
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
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className={`${styles.cardWrapper} ${service.posClass}`}
                variants={itemVariants}
              >
                {/* FloatingCard adds 3D tilt — wraps the visual card */}
                <FloatingCard maxTilt={10} className={styles.card}>
                  {/* Dot-grid texture layer */}
                  <div className={styles.gridTexture} aria-hidden="true" />

                  {/* Holographic gradient overlay — shifts on hover via CSS */}
                  <div className={styles.holoOverlay} aria-hidden="true" />

                  {/* Card content */}
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
                    <p className={styles.cardDesc}>{service.description}</p>
                  </div>
                </FloatingCard>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
