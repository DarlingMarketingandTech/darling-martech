'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'
import { CodeIcon, MegaphoneIcon, PlanetIcon, RocketIcon } from '@phosphor-icons/react'
import { GalleryHoverCard } from '@/components/ui/gallery-hover-card'
import { containerVariants, itemVariants, fadeVariants, viewport } from '@/lib/motion'
import { useFinePointer } from '@/hooks/useFinePointer'
import styles from './Lab.module.css'

const LabTelemetryScene = dynamic(
  () => import('@/components/3d/LabTelemetryScene').then((module) => module.LabTelemetryScene),
  {
    ssr: false,
    loading: () => null,
  }
)

type Tool = {
  name: string
  category: 'Marketing' | 'Developer' | 'Technologist'
  status: 'Production'
  description: string
  stack: string[]
  url?: string
  detailHref?: string
  coverImage?: string
}

const tools: Tool[] = [
  // Marketing
  { name: 'Graston Growth Engine', category: 'Marketing', status: 'Production', description: 'Full-stack provider directory and lead-gen OS — map-integrated spatial search, AI assistant console, Premier analytics suite, and automated support ticketing for a national healthcare brand.', stack: ['Next.js', 'Supabase', 'Google Maps API', 'TypeScript'], detailHref: '/lab/graston-growth-engine', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/graston-growth-engine_-_for_providers.png' },
  { name: 'GEO Readiness Auditor', category: 'Marketing', status: 'Production', description: 'SMB-focused AI visibility audit that scores GEO readiness (0-100), flags top-priority issues, and unlocks a full fix roadmap by email.', stack: ['Next.js', 'TypeScript', 'Cheerio', 'Resend'], detailHref: '/lab/geo-readiness-auditor', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png' },
  { name: 'Investment ROI Planner', category: 'Marketing', status: 'Production', description: 'Self-serve financial planning tool that helps practitioners calculate ROI on Graston certification before talking to sales.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/investment-roi-planner', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/Graston_Technique_ROI_Calculator_-_main.png' },
  // Developer
  { name: 'Barbershop Command Center', category: 'Developer', status: 'Production', description: 'Full-stack business OS for barbershop owners — unified scheduling dashboard, revenue projection, barber-specific availability, and a high-conversion client booking engine.', stack: ['Next.js', 'React', 'Supabase'], detailHref: '/lab/barbershop-command-center', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/Barbershop_Command_Center.jpg' },
  { name: 'Clinical Compass', category: 'Developer', status: 'Production', description: 'Decision-support tool helping Graston practitioners navigate clinical protocols and treatment pathways without calling the home office.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/clinical-compass', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/graston_instruments_-_clinical_compass.jpg' },
  { name: 'License Requirements Navigator', category: 'Developer', status: 'Production', description: 'State-by-state licensing lookup for healthcare practitioners — which credentials they need, which Graston certs count toward them.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/license-requirements', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/Practitioner_License_Requirements_I_Graston_Technique_-_search.png' },
  { name: 'Smart Sales & Pricing Tool', category: 'Developer', status: 'Production', description: 'Real-time pricing calculator for Graston certification bundles, equipment configurations, and institutional accounts.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/smart-sales-pricing', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/Graston_Technique_Smart_Pricing_Tool_-_home.png' },
  // Technologist
  { name: 'PRO DJ Studio', category: 'Technologist', status: 'Production', description: 'Professional-grade mixing environment built for the browser — dual-deck architecture, real-time AI STEM separation, and a 3D-accelerated interface at near-hardware latency.', stack: ['Next.js', 'Web Audio API', 'Zustand'], detailHref: '/lab/pro-dj-studio', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/PRO_DJ_STUDIO_-_home.png' },
  { name: 'Strum AI', category: 'Technologist', status: 'Production', description: 'AI-driven guitar transcription engine — converts audio ideas into chord charts, tabs, and interactive notation with a Notion-like song management system.', stack: ['React', 'Vite', 'AI Audio'], detailHref: '/lab/strum-ai', coverImage: 'https://res.cloudinary.com/djhqowk67/image/upload/w_800,f_auto,q_auto/STRUM_AI_I_Pro_Guitar_Transcription.png' },
  { name: 'Site Optimization & Security', category: 'Technologist', status: 'Production', description: 'Cloudflare Workers-based site optimization pipeline with security headers and edge caching.', stack: ['Cloudflare Workers', 'TypeScript', 'Edge Runtime'], url: 'https://bearcave-marketing-v2.vercel.app/lab/site-optimization', coverImage: 'https://images.pexels.com/photos/6466141/pexels-photo-6466141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'GA4 Analytics Bridge', category: 'Technologist', status: 'Production', description: 'GA4 to custom dashboard bridge with event schema normalization and automated reporting.', stack: ['Node.js', 'GA4 API', 'Google Sheets API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/ga4-bridge', coverImage: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Zero-FOUC Theme Engine', category: 'Technologist', status: 'Production', description: 'Flash-of-unstyled-content elimination system for theme switching in Next.js apps.', stack: ['Next.js', 'TypeScript', 'CSS Variables'], url: 'https://bearcave-marketing-v2.vercel.app/lab/zero-fouc', coverImage: 'https://images.pexels.com/photos/36571389/pexels-photo-36571389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
]

const categories = ['All', 'Marketing', 'Developer', 'Technologist'] as const

const categoryCoverClass: Record<Tool['category'], string> = {
  Marketing: styles.toolCoverMarketing,
  Developer: styles.toolCoverDeveloper,
  Technologist: styles.toolCoverTechnologist,
}

const categoryIcons = {
  Marketing: MegaphoneIcon,
  Developer: CodeIcon,
  Technologist: PlanetIcon,
} satisfies Record<Tool['category'], typeof MegaphoneIcon>

const statusIcons = {
  Production: RocketIcon,
} satisfies Record<Tool['status'], typeof RocketIcon>

function ToolCardCover({ tool }: { readonly tool: Tool }) {
  const CategoryIcon = categoryIcons[tool.category]
  const StatusIcon = statusIcons[tool.status]

  return (
    <div className={`${styles.toolCover} ${categoryCoverClass[tool.category]}`} aria-hidden="true">
      {tool.coverImage && (
        <>
          <Image
            src={tool.coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className={styles.toolCoverImage}
            unoptimized
          />
          <div className={styles.toolCoverImageScrim} />
        </>
      )}
      <div className={styles.toolCoverGrid} />
      <div className={styles.toolCoverOrb} />
      <div className={styles.toolCoverSweep} />

      <div className={styles.toolCoverStatus}>
        <StatusIcon weight="light" className={styles.toolCoverStatusIcon} />
        <span>{tool.status}</span>
      </div>

      {!tool.coverImage && (
        <div className={styles.toolCoverCore}>
          <CategoryIcon weight="light" className={styles.toolCoverIcon} />
        </div>
      )}

      <div className={styles.toolCoverStack}>
        {tool.stack.slice(0, 2).map((item) => (
          <span key={item} className={styles.toolCoverTag}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function ToolCard({
  tool,
  onHighlight,
}: {
  readonly tool: Tool
  readonly onHighlight: (target: string | null) => void
}) {
  const hasDetail = Boolean(tool.detailHref)
  const hasUrl = Boolean(tool.url)

  let footerText: string
  if (hasDetail) {
    footerText = 'Explore build details'
  } else if (hasUrl) {
    footerText = 'Open deployed tool'
  } else {
    footerText = 'Rebuilding — check back soon'
  }

  let ctaLabel: string | undefined
  if (hasDetail) {
    ctaLabel = 'Read the build'
  } else if (hasUrl) {
    ctaLabel = 'Launch app'
  }

  return (
    <GalleryHoverCard
      title={tool.name}
      summary={tool.description}
      href={tool.detailHref ?? tool.url}
      cover={<ToolCardCover tool={tool} />}
      eyebrow={tool.category}
      badges={[tool.status, ...tool.stack.slice(0, 2)]}
      footer={
        <span className={styles.toolFooterMeta}>{footerText}</span>
      }
      ctaLabel={ctaLabel}
      external={!hasDetail && hasUrl}
      interactiveId={tool.name}
      onHighlightChange={onHighlight}
      variant="lab"
    />
  )
}

type FeaturedLab = {
  name: string
  description: string
  href: string
  ctaLabel: string
  stack: string[]
  screenshot?: {
    src: string
    alt: string
  }
  stats?: { value: string; label: string }[]
}

const featuredLabs: FeaturedLab[] = [
  {
    name: 'CMO Simulator',
    description:
      'Walk through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. Same framework I use with clients. Takes about 10 minutes.',
    href: '/lab/cmo-simulator',
    ctaLabel: 'Launch CMO Simulator',
    stack: ['Next.js', 'React', 'Vercel', 'Marketing Strategy'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_900,f_auto,q_auto/CMO_Simulator.jpg',
      alt: 'CMO Simulator interface preview',
    },
  },
  {
    name: 'GEO Readiness Auditor',
    description:
      'Is your site visible to AI? Run a fast 0-100 GEO audit, see top issues instantly, then unlock the full prioritized fix report by email.',
    href: '/lab/geo-readiness-auditor',
    ctaLabel: 'Run GEO Audit',
    stack: ['Next.js', 'TypeScript', 'Cheerio', 'Resend'],
    screenshot: {
      src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1200,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png',
      alt: 'GEO Readiness Auditor interface preview',
    },
  },
]

function LabFeaturedCard({ lab }: { readonly lab: FeaturedLab }) {
  const statsLength = lab.stats?.length ?? 0

  return (
    <div className={styles.featuredCard}>
      <div className={styles.featuredLeft}>
        <div>
          <div className={styles.featuredPill}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            Production · Featured
          </div>
          <h2 className={styles.featuredTitle}>{lab.name}</h2>
          <p className={styles.featuredDesc}>{lab.description}</p>
          <div className={styles.featuredStack}>
            {lab.stack.map((tag) => (
              <span key={tag} className={styles.toolCoverTag}>{tag}</span>
            ))}
          </div>
        </div>
        <Link href={lab.href} className={styles.featuredCta}>
          {lab.ctaLabel} →
        </Link>
      </div>

      <div className={styles.featuredRight}>
        <div className={styles.featuredRightGrid} aria-hidden="true" />
        <div className={styles.featuredRightGlow} aria-hidden="true" />
        <div className={styles.featuredRightContent}>
          {lab.screenshot ? (
            <div className={styles.featuredScreenshot}>
              <Image
                src={lab.screenshot.src}
                alt={lab.screenshot.alt}
                width={900}
                height={476}
                className={styles.featuredScreenshotImg}
                unoptimized
              />
            </div>
          ) : (
            <>
              <div className={styles.featuredIconBox}>
                <PlanetIcon weight="light" size={34} color="var(--color-accent)" />
              </div>
              {lab.stats && (
                <div className={styles.featuredStats}>
                  {lab.stats.map((stat, index) => (
                    <Fragment key={stat.label}>
                      <div className={styles.featuredStat}>
                        <div className={styles.featuredStatValue}>{stat.value}</div>
                        <div className={styles.featuredStatLabel}>{stat.label}</div>
                      </div>
                      {index < statsLength - 1 && <div className={styles.featuredStatDivider} />}
                    </Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LabPage() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All')
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const isFinePointer = useFinePointer()
  const filtered = activeCategory === 'All' ? tools : tools.filter((t) => t.category === activeCategory)

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <section className={styles.telemetryPanel}>
          <LabTelemetryScene
            activeCategory={activeCategory}
            hoveredTool={hoveredTool}
            intensity={hoveredTool ? 'active' : 'balanced'}
          />

          <motion.div className={styles.headerWrap} variants={containerVariants} initial="hidden" animate="visible">
            <motion.p variants={fadeVariants} className={styles.eyebrow}>Lab</motion.p>
            <motion.h1 variants={itemVariants} className={styles.headline}>
              Tools &amp; Experiments.
            </motion.h1>
            <motion.p variants={itemVariants} className={styles.subheadline}>
              Marketing tools, developer utilities, and technologist experiments — built to solve real
              problems and shipped to production.
            </motion.p>
          </motion.div>

          <motion.div className={styles.filters} variants={containerVariants} initial="hidden" animate="visible">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                variants={itemVariants}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={isFinePointer ? () => setHoveredTool(`${cat}-filter`) : undefined}
                onMouseLeave={isFinePointer ? () => setHoveredTool(null) : undefined}
              >
                {cat}
                <span className={styles.filterCount}>
                  {cat === 'All' ? tools.length : tools.filter((t) => t.category === cat).length}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Featured labs */}
        <section className={styles.featuredGrid} aria-label="Featured labs">
          {featuredLabs.map((lab) => (
            <LabFeaturedCard key={lab.name} lab={lab} />
          ))}
        </section>

        {/* Tools grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {filtered.map((tool) => (
            <motion.div key={tool.name} variants={itemVariants} className={styles.gridCell}>
              <ToolCard tool={tool} onHighlight={setHoveredTool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
