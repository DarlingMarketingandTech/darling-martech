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

export type WorkDetailTemplate = 'flagship-longform' | 'supporting-standard' | 'system-compact' | 'system-expanded'

// Proof-type template selection for `/work/[slug]`.
// This is intentionally slug-driven (not just dashboardTier), so we can honor
// the work-proof priority map where template weight differs from tier.
export function getWorkDetailTemplate(slug: string): WorkDetailTemplate {
  const flagshipLongform = new Set([
    'graston-technique',
    'pike-medical-consultants',
    '317-bbq',
    'hoosier-boy-barbershop',
    // High-value supporting but treated as longform template weight.
    'russell-painting',
  ])

  const supportingStandard = new Set([
    'riley-bennett-egloff',
    'tuohy-bailey-moore',
    'behr-pet-essentials',
    'circle-city-kicks',
    'black-letter',
    'clean-aesthetic',
    'perpetual-movement-fitness',
    'primary-colours',
  ])

  const systemCompact = new Set([
    'the-launchpad',
    'the-closer',
    'the-compass',
    'the-fortress',
    'smart-sales-pricing',
    'investment-roi-planner',
    'clinical-compass',
    'license-requirements',
    'primarycare-indy',
    'urgentcare-indy',
  ])

  const systemExpanded = new Set(['graston-growth-engine', 'barbershop-command-center'])

  if (systemExpanded.has(slug)) return 'system-expanded'
  if (systemCompact.has(slug)) return 'system-compact'
  if (flagshipLongform.has(slug)) return 'flagship-longform'
  if (supportingStandard.has(slug)) return 'supporting-standard'

  // Safe fallback: if content isn't in our explicit proof map, prefer a
  // normal “supporting” weight unless runtime logic overrides it.
  return 'supporting-standard'
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
  /** When set, work detail links to this `/services/[slug]` page as the primary Batch 1 (or other) offering this study proves */
  primaryServicePageSlug?: string
  /** Editorial sort rank within the flagship tier — lower number surfaces first. Unset entries fall after ranked ones. */
  editorialRank?: number
}

export type Deliverable = {
  title: string
  description: string
  emphasis?: 'feature' | 'standard'
}

/** A structured proof module for flagship longform case studies.
 * Groups related work into a named bucket with a short narrative and
 * one optional supporting image from the project media registry.
 */
export type FlagshipProofModule = {
  /** Short heading — what this bucket did, not what it's named */
  title: string
  /** 1–2 short paragraphs (separated by \n\n) explaining the intervention */
  body: string
  /** Optional: Cloudinary publicId for a single supporting visual */
  imagePublicId?: string
  /** Alt text when imagePublicId is set */
  imageAlt?: string
  /** Caption tied to outcome, not decoration */
  imageCaption?: string
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
  /** Flagship-longform only: structured proof modules replacing the generic deliverable grid */
  flagshipProofModules?: FlagshipProofModule[]
  /** Flagship-longform only: synthesis bridging the detailed modules to the brand/support materials */
  systemsSynthesis?: string
  /** Flagship-longform only: synthesis paragraph before route-out — what this build proves about the offer */
  closingStatement?: string
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
