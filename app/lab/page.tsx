'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
  {
    name: 'CMO Simulator',
    category: 'Marketing',
    status: 'Production',
    description: 'Interactive simulator that walks through CMO-level decision-making across strategy, budget, and execution scenarios.',
    stack: ['Next.js', 'React', 'Vercel'],
    url: 'https://cmo-simulator-3il5.vercel.app',
  },
  {
    name: 'Graston Growth Engine',
    category: 'Marketing',
    status: 'Experimental',
    description: 'Marketing automation and lead scoring engine built for the Graston Technique ecosystem.',
    stack: ['Next.js', 'FluentCRM', 'REST API'],
    // url: 'https://graston-growth-enginegg-zkj2.vercel.app', // not ready
  },
  {
    name: 'ROI Calculator',
    category: 'Marketing',
    status: 'Beta',
    description: 'Marketing ROI calculator with inputs for channel spend, conversion rates, and lifetime value.',
    stack: ['React', 'TypeScript'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/roi-calculator',
  },
  {
    name: 'Brand Builder',
    category: 'Marketing',
    status: 'Beta',
    description: 'Brand positioning worksheet that outputs a one-page brand brief from structured inputs.',
    stack: ['React', 'TypeScript'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/brand-builder',
  },
  {
    name: 'Marketing Simulator',
    category: 'Marketing',
    status: 'Beta',
    description: 'Simulate marketing campaigns across channels and see projected outcomes before spending.',
    stack: ['React', 'D3.js'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/marketing-simulator',
  },
  {
    name: 'Email Simulator',
    category: 'Marketing',
    status: 'Beta',
    description: 'Preview and test email sequences with simulated send/open/click behavior.',
    stack: ['React', 'TypeScript'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/email-simulator',
  },
  {
    name: 'Social Simulator',
    category: 'Marketing',
    status: 'Beta',
    description: 'Map content calendars against projected reach and engagement by platform and posting frequency.',
    stack: ['React', 'Chart.js'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/social-simulator',
  },
  // Developer
  {
    name: 'Clinical Compass',
    category: 'Developer',
    status: 'Production',
    description: 'Healthcare provider lookup and clinical resource tool built for patient-facing use.',
    stack: ['Next.js', 'REST API', 'TypeScript'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/clinical-compass',
  },
  {
    name: 'License Hub',
    category: 'Developer',
    status: 'Production',
    description: 'Professional license verification hub with state-level lookup and expiration tracking.',
    stack: ['Next.js', 'Node.js', 'API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/license-hub',
  },
  {
    name: 'GT9 Pricing Tool',
    category: 'Developer',
    status: 'Production',
    description: 'Custom pricing calculator for Graston Technique product configurations and course bundles.',
    stack: ['React', 'TypeScript', 'WooCommerce API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/gt9-pricing',
  },
  {
    name: 'SEO Scanner',
    category: 'Developer',
    status: 'Beta',
    description: 'On-page SEO audit tool that scores pages against technical and content best practices.',
    stack: ['Next.js', 'Cheerio', 'Node.js'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/seo-scanner',
  },
  {
    name: 'Lead Score Lab',
    category: 'Developer',
    status: 'Beta',
    description: 'Build and test custom lead scoring models against historical CRM data.',
    stack: ['React', 'TypeScript', 'HubSpot API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/lead-score-lab',
  },
  // Technologist
  {
    name: 'Piko Artist Website',
    category: 'Technologist',
    status: 'Production',
    description: 'Full artist portfolio and music platform with streaming integrations and tour management.',
    stack: ['Next.js', 'Cloudinary', 'Spotify API'],
    url: 'https://piko-artist-website-v3-three.vercel.app',
  },
  {
    name: 'Strum AI',
    category: 'Technologist',
    status: 'Beta',
    description: 'AI-powered music practice and feedback tool built on the Claude API.',
    stack: ['Next.js', 'Claude API', 'Web Audio API'],
    url: 'https://jacobs-music-plum.vercel.app',
  },
  {
    name: 'Site Optimization & Security',
    category: 'Technologist',
    status: 'Production',
    description: 'Cloudflare Workers-based site optimization pipeline with security headers and edge caching.',
    stack: ['Cloudflare Workers', 'TypeScript', 'Edge Runtime'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/site-optimization',
  },
  {
    name: 'Campaign Performance Analyzer',
    category: 'Technologist',
    status: 'Beta',
    description: 'Cross-channel campaign analytics aggregator with GA4, Meta, and Google Ads integration.',
    stack: ['Next.js', 'GA4 API', 'BigQuery'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/campaign-analyzer',
  },
  {
    name: 'GA4 Analytics Bridge',
    category: 'Technologist',
    status: 'Production',
    description: 'GA4 to custom dashboard bridge with event schema normalization and automated reporting.',
    stack: ['Node.js', 'GA4 API', 'Google Sheets API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/ga4-bridge',
  },
  {
    name: 'CRM-Aware AI Hook',
    category: 'Technologist',
    status: 'Experimental',
    description: 'React hook that injects CRM contact context into Claude API calls for personalized AI responses.',
    stack: ['React', 'Claude API', 'HubSpot API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/crm-ai-hook',
  },
  {
    name: 'Zero-FOUC Theme Engine',
    category: 'Technologist',
    status: 'Production',
    description: 'Flash-of-unstyled-content elimination system for theme switching in Next.js apps.',
    stack: ['Next.js', 'TypeScript', 'CSS Variables'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/zero-fouc',
  },
  {
    name: 'Edge Image Negotiator',
    category: 'Technologist',
    status: 'Experimental',
    description: 'Cloudflare Worker that negotiates optimal image format and size at the edge based on client hints.',
    stack: ['Cloudflare Workers', 'TypeScript', 'Cloudinary API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/edge-image',
  },
  {
    name: 'Global Telemetry Monitor',
    category: 'Technologist',
    status: 'Experimental',
    description: 'Real-time telemetry aggregator for distributed marketing systems and API health monitoring.',
    stack: ['Node.js', 'WebSockets', 'Grafana'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/telemetry',
  },
  {
    name: 'Competitor Intelligence Platform',
    category: 'Technologist',
    status: 'Beta',
    description: 'Automated competitor monitoring across web, social, and ad channels with weekly digest.',
    stack: ['Next.js', 'Playwright', 'OpenAI API'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/competitor-intel',
  },
  {
    name: 'Link Architect',
    category: 'Technologist',
    status: 'Beta',
    description: 'UTM parameter builder and link management system with campaign attribution tracking.',
    stack: ['Next.js', 'Supabase', 'TypeScript'],
    url: 'https://bearcave-marketing-v2.vercel.app/lab/link-architect',
  },
]

const categories = ['All', 'Marketing', 'Developer', 'Technologist'] as const
const statusColors = {
  Production: 'text-green-400 border-green-400/20',
  Beta: 'text-yellow-400 border-yellow-400/20',
  Experimental: 'text-electric-orange border-electric-orange/20',
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="border border-white/8 bg-white/[0.01] p-7 flex flex-col gap-4 hover:border-white/15 transition-colors duration-200 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`inline-block text-xs font-body border px-2 py-0.5 mb-3 ${statusColors[tool.status]}`}>
            {tool.status}
          </span>
          <h3 className="font-display font-bold text-base text-warm-off-white leading-tight">
            {tool.name}
          </h3>
        </div>
        <span className="text-xs text-mid-gray/60 font-body shrink-0 border border-white/8 px-2 py-1">
          {tool.category}
        </span>
      </div>

      <p className="text-sm text-mid-gray font-body leading-relaxed flex-1">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tool.stack.map((t) => (
          <span key={t} className="text-xs text-mid-gray/50 font-body bg-white/[0.03] px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>

      {tool.url ? (
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-body text-electric-orange hover:underline mt-1 group-hover:gap-2 transition-all duration-150"
        >
          Launch app →
        </a>
      ) : (
        <span className="text-xs text-mid-gray/30 font-body mt-1">Rebuilding — check back soon</span>
      )}
    </motion.div>
  )
}

export default function LabPage() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[LabPage] mounted without route metadata export.')
    }
  }, [])

  const filtered = activeCategory === 'All' ? tools : tools.filter((t) => t.category === activeCategory)

  return (
    <main className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6"
          >
            Lab
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-6 text-balance max-w-3xl"
          >
            Tools &amp; Experiments.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mid-gray font-body text-lg leading-relaxed max-w-xl"
          >
            Marketing tools, developer utilities, and technologist experiments — built to solve real
            problems and shipped to production.
          </motion.p>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-body px-4 py-2 border transition-colors duration-150 ${
                activeCategory === cat
                  ? 'border-electric-orange text-warm-off-white bg-electric-orange/10'
                  : 'border-white/10 text-mid-gray hover:border-white/25 hover:text-warm-off-white'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-60">
                {cat === 'All' ? tools.length : tools.filter((t) => t.category === cat).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((tool, i) => (
            <div key={tool.name} className="bg-obsidian">
              <ToolCard tool={tool} index={i} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
