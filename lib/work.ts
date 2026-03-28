// Types and helpers for the /work case study section
// Separate from lib/case-studies.ts (legacy home page data)

import type { IndustryTag, OutcomeTag, ServiceTag } from '@/data/taxonomy'

export type WorkCategory =
  | 'Automation & Systems'
  | 'Healthcare'
  | 'Legal & Professional'
  | 'Hospitality & Local'
  | 'E-Commerce'
  | 'Brand Identity'
  | 'Non-Profit'

export type WorkVisualMode = 'signal' | 'orbit' | 'mesh' | 'beacon'

export type WorkLayoutMode = 'editorial' | 'split' | 'stacked'

export type WorkMetricStyle = 'pill' | 'panel' | 'ticker'

export type WorkMediaStyle = 'portrait' | 'landscape' | 'stack'
export type WorkDashboardTier = 'flagship' | 'system' | 'standard'

export type WorkTheme = {
  layout?: WorkLayoutMode
  metricStyle?: WorkMetricStyle
  mediaStyle?: WorkMediaStyle
  density?: 'calm' | 'balanced' | 'kinetic'
}

export type WorkCard = {
  slug: string
  label: string         // e.g. "Hospitality · Brand Identity & Web"
  client: string        // Display name
  headline: string      // One-line hook
  metrics: string[]     // 2–3 stat strings
  category: WorkCategory
  logoPublicId?: string // Cloudinary public_id for logo/anchor image
  heroPublicId?: string // Optional hero image public_id
  cardPublicId?: string // Optional still image override for the /work index cards only
  cardPreviewPublicId?: string
  cardPreviewType?: 'image' | 'video'
  featured?: boolean    // Pinned to top of grid
  visualMode?: WorkVisualMode
  theme?: WorkTheme
  dashboardTier?: WorkDashboardTier
  parentProjectSlug?: string
  relatedProjectSlugs?: string[]
  serviceIds?: ServiceTag[]
  industryIds?: IndustryTag[]
  outcomeIds?: OutcomeTag[]
}

export type Deliverable = {
  title: string
  description: string
  emphasis?: 'feature' | 'standard'
}

export type ProcessPhase = {
  label: string
  description: string
}

export type CloudinaryAsset = {
  publicId: string
  label: string
  folder: string
}

export type CaseStudy = WorkCard & {
  titleTag: string
  metaDescription: string
  subhead: string
  challenge: string
  approach: string
  deliverables: Deliverable[]
  outcome: string
  process?: ProcessPhase[]
  whatThisMeansForYou: string
  ctaLine: string
  problemVisualPublicId?: string
  cloudinaryAssets?: CloudinaryAsset[]
}

export const workSlugAliases: Record<string, string> = {
  'primary-care-indy': 'primarycare-indy',
  'urgent-care-indy': 'urgentcare-indy',
  'rbe-law': 'riley-bennett-egloff',
}

export function resolveWorkSlug(slug: string) {
  return workSlugAliases[slug] ?? slug
}

export function isWorkSlugAlias(slug: string) {
  return resolveWorkSlug(slug) !== slug
}

export function getCanonicalWorkPath(slug: string) {
  return `/work/${resolveWorkSlug(slug)}`
}

// Helpers
export function getWorkBySlug(slug: string, data: CaseStudy[]): CaseStudy | undefined {
  const resolvedSlug = resolveWorkSlug(slug)
  return data.find((cs) => cs.slug === resolvedSlug)
}
