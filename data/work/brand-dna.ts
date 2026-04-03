import { BRAND_DNA_PROFILES, type BrandDnaProfile } from './brand-dna.generated'

export { type BrandDnaProfile }

export function getBrandDnaProfile(slug: string): BrandDnaProfile | null {
  return BRAND_DNA_PROFILES[slug] ?? null
}
