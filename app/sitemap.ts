import type { MetadataRoute } from 'next'
import { allServicePages } from '@/data/services'
import { getAllWork } from '@/data/work/work-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://darlingmartech.com'
  const lastModified = new Date()

  const caseStudyUrls = getAllWork().map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceUrls = allServicePages.map((service) => ({
    url: `${baseUrl}${service.routePath ?? `/services/${service.id}`}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: service.kind === 'standalone' ? 0.85 : 0.7,
  }))

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
  ].map((route) => ({
    ...route,
    lastModified,
    changeFrequency: 'monthly' as const,
  }))

  return [
    ...staticRoutes,
    ...serviceUrls,
    ...caseStudyUrls,
  ]
}
