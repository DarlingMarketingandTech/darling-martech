import type { MetadataRoute } from 'next'
import { allServicePages } from '@/data/services'
import { LAB_DETAIL_DATA } from '@/data/labs'
import { getAllWork } from '@/data/work/work-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://darlingmartech.com'

  const caseStudyUrls = getAllWork().map((cs) => ({
    url: `${baseUrl}/work/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceUrls = allServicePages.map((service) => ({
    url: `${baseUrl}${service.routePath ?? `/services/${service.id}`}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: service.kind === 'standalone' ? 0.85 : 0.7,
  }))

  const labUrls = Object.keys(LAB_DETAIL_DATA).map((slug) => ({
    url: `${baseUrl}/lab/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...serviceUrls,
    ...caseStudyUrls,
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...labUrls,
    {
      url: `${baseUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}
