'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Code, Flask, Megaphone, Planet, Rocket, Sparkle } from '@phosphor-icons/react'
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
  status: 'Production' | 'Beta' | 'Experimental'
  description: string
  stack: string[]
  url?: string
}

const tools: Tool[] = [
  // Marketing
  { name: 'CMO Simulator', category: 'Marketing', status: 'Production', description: 'Interactive simulator that walks through CMO-level decision-making across strategy, budget, and execution scenarios.', stack: ['Next.js', 'React', 'Vercel'], url: 'https://cmo-simulator-3il5.vercel.app' },
  { name: 'Graston Growth Engine', category: 'Marketing', status: 'Experimental', description: 'Marketing automation and lead scoring engine built for the Graston Technique ecosystem.', stack: ['Next.js', 'FluentCRM', 'REST API'] },
  { name: 'ROI Calculator', category: 'Marketing', status: 'Beta', description: 'Marketing ROI calculator with inputs for channel spend, conversion rates, and lifetime value.', stack: ['React', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/roi-calculator' },
  { name: 'Brand Builder', category: 'Marketing', status: 'Beta', description: 'Brand positioning worksheet that outputs a one-page brand brief from structured inputs.', stack: ['React', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/brand-builder' },
  { name: 'Marketing Simulator', category: 'Marketing', status: 'Beta', description: 'Simulate marketing campaigns across channels and see projected outcomes before spending.', stack: ['React', 'D3.js'], url: 'https://bearcave-marketing-v2.vercel.app/lab/marketing-simulator' },
  { name: 'Email Simulator', category: 'Marketing', status: 'Beta', description: 'Preview and test email sequences with simulated send/open/click behavior.', stack: ['React', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/email-simulator' },
  { name: 'Social Simulator', category: 'Marketing', status: 'Beta', description: 'Map content calendars against projected reach and engagement by platform and posting frequency.', stack: ['React', 'Chart.js'], url: 'https://bearcave-marketing-v2.vercel.app/lab/social-simulator' },
  // Developer
  { name: 'Clinical Compass', category: 'Developer', status: 'Production', description: 'Healthcare provider lookup and clinical resource tool built for patient-facing use.', stack: ['Next.js', 'REST API', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/clinical-compass' },
  { name: 'License Hub', category: 'Developer', status: 'Production', description: 'Professional license verification hub with state-level lookup and expiration tracking.', stack: ['Next.js', 'Node.js', 'API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/license-hub' },
  { name: 'GT9 Pricing Tool', category: 'Developer', status: 'Production', description: 'Custom pricing calculator for Graston Technique product configurations and course bundles.', stack: ['React', 'TypeScript', 'WooCommerce API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/gt9-pricing' },
  { name: 'SEO Scanner', category: 'Developer', status: 'Beta', description: 'On-page SEO audit tool that scores pages against technical and content best practices.', stack: ['Next.js', 'Cheerio', 'Node.js'], url: 'https://bearcave-marketing-v2.vercel.app/lab/seo-scanner' },
  { name: 'Lead Score Lab', category: 'Developer', status: 'Beta', description: 'Build and test custom lead scoring models against historical CRM data.', stack: ['React', 'TypeScript', 'HubSpot API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/lead-score-lab' },
  // Technologist
  { name: 'Piko Artist Website', category: 'Technologist', status: 'Production', description: 'Full artist portfolio and music platform with streaming integrations and tour management.', stack: ['Next.js', 'Cloudinary', 'Spotify API'], url: 'https://piko-artist-website-v3-three.vercel.app' },
  { name: 'Strum AI', category: 'Technologist', status: 'Beta', description: 'AI-powered music practice and feedback tool built on the Claude API.', stack: ['Next.js', 'Claude API', 'Web Audio API'], url: 'https://jacobs-music-plum.vercel.app' },
  { name: 'Site Optimization & Security', category: 'Technologist', status: 'Production', description: 'Cloudflare Workers-based site optimization pipeline with security headers and edge caching.', stack: ['Cloudflare Workers', 'TypeScript', 'Edge Runtime'], url: 'https://bearcave-marketing-v2.vercel.app/lab/site-optimization' },
  { name: 'Campaign Performance Analyzer', category: 'Technologist', status: 'Beta', description: 'Cross-channel campaign analytics aggregator with GA4, Meta, and Google Ads integration.', stack: ['Next.js', 'GA4 API', 'BigQuery'], url: 'https://bearcave-marketing-v2.vercel.app/lab/campaign-analyzer' },
  { name: 'GA4 Analytics Bridge', category: 'Technologist', status: 'Production', description: 'GA4 to custom dashboard bridge with event schema normalization and automated reporting.', stack: ['Node.js', 'GA4 API', 'Google Sheets API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/ga4-bridge' },
  { name: 'CRM-Aware AI Hook', category: 'Technologist', status: 'Experimental', description: 'React hook that injects CRM contact context into Claude API calls for personalized AI responses.', stack: ['React', 'Claude API', 'HubSpot API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/crm-ai-hook' },
  { name: 'Zero-FOUC Theme Engine', category: 'Technologist', status: 'Production', description: 'Flash-of-unstyled-content elimination system for theme switching in Next.js apps.', stack: ['Next.js', 'TypeScript', 'CSS Variables'], url: 'https://bearcave-marketing-v2.vercel.app/lab/zero-fouc' },
  { name: 'Edge Image Negotiator', category: 'Technologist', status: 'Experimental', description: 'Cloudflare Worker that negotiates optimal image format and size at the edge based on client hints.', stack: ['Cloudflare Workers', 'TypeScript', 'Cloudinary API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/edge-image' },
  { name: 'Global Telemetry Monitor', category: 'Technologist', status: 'Experimental', description: 'Real-time telemetry aggregator for distributed marketing systems and API health monitoring.', stack: ['Node.js', 'WebSockets', 'Grafana'], url: 'https://bearcave-marketing-v2.vercel.app/lab/telemetry' },
  { name: 'Competitor Intelligence Platform', category: 'Technologist', status: 'Beta', description: 'Automated competitor monitoring across web, social, and ad channels with weekly digest.', stack: ['Next.js', 'Playwright', 'OpenAI API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/competitor-intel' },
  { name: 'Link Architect', category: 'Technologist', status: 'Beta', description: 'UTM parameter builder and link management system with campaign attribution tracking.', stack: ['Next.js', 'Supabase', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/link-architect' },
]

const categories = ['All', 'Marketing', 'Developer', 'Technologist'] as const

const categoryCoverClass: Record<Tool['category'], string> = {
  Marketing: styles.toolCoverMarketing,
  Developer: styles.toolCoverDeveloper,
  Technologist: styles.toolCoverTechnologist,
}

const categoryIcons = {
  Marketing: Megaphone,
  Developer: Code,
  Technologist: Planet,
} satisfies Record<Tool['category'], typeof Megaphone>

const statusIcons = {
  Production: Rocket,
  Beta: Sparkle,
  Experimental: Flask,
} satisfies Record<Tool['status'], typeof Rocket>

function ToolCardCover({ tool }: { readonly tool: Tool }) {
  const CategoryIcon = categoryIcons[tool.category]
  const StatusIcon = statusIcons[tool.status]

  return (
    <div className={`${styles.toolCover} ${categoryCoverClass[tool.category]}`} aria-hidden="true">
      <div className={styles.toolCoverGrid} />
      <div className={styles.toolCoverOrb} />
      <div className={styles.toolCoverSweep} />

      <div className={styles.toolCoverStatus}>
        <StatusIcon weight="light" className={styles.toolCoverStatusIcon} />
        <span>{tool.status}</span>
      </div>

      <div className={styles.toolCoverCore}>
        <CategoryIcon weight="light" className={styles.toolCoverIcon} />
      </div>

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
  return (
    <GalleryHoverCard
      title={tool.name}
      summary={tool.description}
      href={tool.url}
      cover={<ToolCardCover tool={tool} />}
      eyebrow={tool.category}
      badges={[tool.status, ...tool.stack.slice(0, 2)]}
      footer={
        <span
          className={styles.toolFooterMeta}
          onMouseEnter={tool.url ? () => onHighlight(`${tool.name}-launch`) : undefined}
          onMouseLeave={tool.url ? () => onHighlight(tool.name) : undefined}
        >
          {tool.url ? 'Open deployed tool' : 'Rebuilding — check back soon'}
        </span>
      }
      ctaLabel={tool.url ? 'Launch app' : undefined}
      external={Boolean(tool.url)}
      interactiveId={tool.name}
      onHighlightChange={onHighlight}
      variant="lab"
    />
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
