/**
 * Governance map for admin-proxy routes: what belongs in the Custom GPT action schema vs connector-only.
 * Not imported by route handlers yet; single source of truth for documentation and tooling.
 */
export const GPT_API_SURFACE = {
  cloudinary: {
    usageCheck: '/api/cloudinary/assets/usage-check',
    recommend: '/api/cloudinary/assets/recommend',
  },
  siteAudit: {
    page: '/api/site-audit/page',
    robots: '/api/site-audit/robots',
    sitemap: '/api/site-audit/sitemap',
    crawl: '/api/site-audit/crawl',
    urlCheck: '/api/site-audit/url-check',
  },
} as const

export const OPTIONAL_API_SURFACE = {
  cloudinary: {
    search: '/api/cloudinary/assets/search',
    update: '/api/cloudinary/assets/update',
    bulkUpdate: '/api/cloudinary/assets/bulk-update',
  },
} as const
