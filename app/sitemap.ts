import type { MetadataRoute } from 'next'
import { allServicePages } from '@/data/services'
import { getAllWork } from '@/data/work/work-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://darlingmartech.com'

  const caseStudyUrls = getAllWork().map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceUrls = allServicePages.map((service) => ({
    url: `${baseUrl}${service.routePath ?? `/services/${service.id}`}`,
    changeFrequency: 'monthly' as const,
    priority: service.kind === 'standalone' ? 0.85 : 0.7,
  }))

  // NOTE: We intentionally omit `lastModified` unless we have real per-page timestamps.
  // Setting it to `new Date()` for every URL on every deploy is a low-signal sitemap pattern.
  const staticRoutes = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/about`, priority: 0.8 },
    { url: `${baseUrl}/work`, priority: 0.8 },
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/tools`, priority: 0.75 },
    { url: `${baseUrl}/tools/cmo-simulator`, priority: 0.8 },
    { url: `${baseUrl}/process`, priority: 0.7 },
    { url: `${baseUrl}/studio`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    {
      url: `${baseUrl}/privacy-policy`,
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ].map((route) => ({
    ...route,
    changeFrequency: route.changeFrequency ?? ('monthly' as const),
  }))

  return [...staticRoutes, ...serviceUrls, ...caseStudyUrls]
}
