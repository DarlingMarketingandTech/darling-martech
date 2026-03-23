// Types and helpers for the /work case study section
// Separate from lib/case-studies.ts (legacy home page data)

export type WorkCategory =
  | 'Automation & Systems'
  | 'Healthcare'
  | 'Legal & Professional'
  | 'Hospitality & Local'
  | 'E-Commerce'
  | 'Brand Identity'
  | 'Non-Profit'

export type WorkCard = {
  slug: string
  label: string         // e.g. "Hospitality · Brand Identity & Web"
  client: string        // Display name
  headline: string      // One-line hook
  metrics: string[]     // 2–3 stat strings
  category: WorkCategory
  logoPublicId?: string // Cloudinary public_id for logo/anchor image
  heroPublicId?: string // Optional hero image public_id
  featured?: boolean    // Pinned to top of grid
}

export type Deliverable = {
  title: string
  description: string
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
  cloudinaryAssets?: CloudinaryAsset[]
}

// Helpers
export function getWorkBySlug(slug: string, data: CaseStudy[]): CaseStudy | undefined {
  return data.find((cs) => cs.slug === slug)
}
