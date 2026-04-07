import { SITE_URL } from '@/lib/config'

/**
 * Canonical public origin for this app (no trailing slash).
 * Uses the shared site URL config so metadata, sitemap, robots,
 * JSON-LD, and GEO audit helpers all agree on the same origin.
 */
export const SITE_ORIGIN = SITE_URL.replace(/\/$/, '')

/** Hostname only, for visible labels (e.g. footer, OG badge). */
export const SITE_HOSTNAME = new URL(SITE_ORIGIN).hostname

export const GEO_OPTIMIZATION_PATH = '/services/growth/geo-optimization'

export const geoOptimizationUrl = () => `${SITE_ORIGIN}${GEO_OPTIMIZATION_PATH}`
