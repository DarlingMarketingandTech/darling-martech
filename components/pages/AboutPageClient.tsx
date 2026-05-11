'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, slideInRight, fadeVariants, springEntrance, viewport } from '@/lib/motion'
import { buildCloudinaryUrl } from '@/lib/cloudinary'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { CareerTimeline } from '@/components/sections/CareerTimeline/CareerTimeline'
import styles from '@/app/about/About.module.css'

const BIO_PHOTO_SRC = buildCloudinaryUrl('studio/graphic-design/bio-featured-2')

const credentialStats = [
  { value: '15+', label: 'Years experience' },
  { value: '400+', label: 'Automation workflows built' },
  { value: '30,000+', label: 'Users served through platforms and systems' },
  { value: '40%', label: 'Average conversion lift delivered' },
]

const credentialGroups = [
  {
    title: 'Education',
    items: [
      'B.S. Business Management — Indiana University, 2008',
    ],
  },
  {
    title: 'Recognition',
    items: [
      'Gold Key Photography Award — Scholastic Art & Writing Awards, 2008',
    ],
  },
  {
    title: 'Operating range',
    items: [
      'Healthcare, legal, finance, e-commerce, nonprofit, SaaS, and local service businesses',
      'Indianapolis-based with strategy-to-execution delivery across brand, web, CRM, automation, and analytics',
    ],
  },
] as const

const industries = [
  'Healthcare', 'Legal', 'Finance', 'SaaS / Tech',
  'Retail / E-commerce', 'Media / Entertainment',
  'Nonprofit', 'B2B', 'B2C', 'Local Service',
]

type AboutPageClientProps = {
  siteUrl: string
}

export default function AboutPageClient({ siteUrl }: AboutPageClientProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Jacob Darling',
            jobTitle: 'Marketing Strategist & Systems Architect',
            url: siteUrl,
            email: 'jacob@darlingmartech.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Indianapolis',
              addressRegion: 'IN',
              addressCountry: 'US',
            },
          }),
        }}
      />

      <article className={styles.article}>
        <div className={styles.inner}>

          {/* ── Hero block ── */}
          <div className={styles.heroGrid}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.p variants={fadeVariants} className={styles.eyebrow}>
                About Jacob Darling
              </motion.p>
              <motion.h1 variants={itemVariants} className={styles.headline}>
                Strategy and systems — built by someone who&apos;s done both for 15 years.
              </motion.h1>
              <motion.div variants={containerVariants} className={styles.bio}>
                <motion.p variants={itemVariants}>
                  I&apos;m Jacob Darling — a marketing strategist, systems architect, and technologist
                  based in Indianapolis. Over the past 15 years I&apos;ve built marketing infrastructure
                  for healthcare systems, law firms, financial advisors, e-commerce brands, nonprofits,
                  and startups. I&apos;ve led marketing from the inside as a director and built campaigns
                  from the outside as a consultant. I know both sides.
                </motion.p>
                <motion.p variants={itemVariants}>
                  What makes me different isn&apos;t just the range — it&apos;s the depth. I don&apos;t
                  hand your strategy to a developer and hope for the best. I build the strategy and the
                  system that executes it. CRM architecture, marketing automation, web development,
                  analytics pipelines, AI integrations — I do the work myself, and I measure everything.
                </motion.p>
                <motion.p variants={itemVariants}>
                  I started Darling MarTech because small businesses deserve the kind of senior-level
                  thinking and hands-on execution that used to be reserved for brands with agency
                  retainers. When you work with me, you get me — directly, personally, and accountably.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} initial="hidden" animate="visible">
              <div className={styles.photoWrap}>
                <Image
                  src={BIO_PHOTO_SRC}
                  alt="Jacob Darling — Marketing Strategist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </div>
              <div className={styles.credentialsCard}>
                <p className={styles.credLabel}>Credentials</p>
                <p className={styles.credIntro}>
                  Strategic depth is only useful if it shows up in the work. These are the signals behind how I operate.
                </p>
                <div className={styles.credStatsGrid}>
                  {credentialStats.map((stat) => (
                    <div key={stat.label} className={styles.credStatCard}>
                      <span className={styles.credStatValue}>{stat.value}</span>
                      <span className={styles.credStatLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.credGroupList}>
                  {credentialGroups.map((group) => (
                    <div key={group.title} className={styles.credGroup}>
                      <p className={styles.credGroupTitle}>{group.title}</p>
                      <ul className={styles.credList}>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Industries ── */}
          <motion.div
            className={styles.industries}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.p variants={fadeVariants} className={styles.sectionLabel}>
              Industries
            </motion.p>
            <motion.div variants={containerVariants} className={styles.tagGrid}>
              {industries.map((ind) => (
                <motion.span key={ind} variants={itemVariants} className={styles.tag}>
                  {ind}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Career Timeline ── */}
          <CareerTimeline />

          {/* ── CTA ── */}
          <motion.div
            className={styles.ctaStrip}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className={styles.ctaHeadline}>Ready to work together?</h2>
              <p className={styles.ctaBody}>I keep my client list small. Let&apos;s see if we&apos;re a fit.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MagneticButton radius={120} maxPull={16}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springEntrance}
                  style={{ display: 'inline-block' }}
                >
                  <Link href="/contact" className={styles.ctaBtn}>
                    Get in touch
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>

        </div>
      </article>
    </>
  )
}
