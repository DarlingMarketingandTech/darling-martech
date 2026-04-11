import type { CaseStudy } from '@/lib/work'
import { SITE_URL } from '@/lib/config'

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Darling MarTech',
    alternateName: 'Marketing and Technology LLC',
    description:
      'Marketing strategy, technology, and automation consulting for small businesses and startups. Based in Indianapolis, IN.',
    url: SITE_URL,
    email: 'jacob@darlingmartech.com',
    founder: {
      '@type': 'Person',
      name: 'Jacob Darling',
      jobTitle: 'Marketing Strategist & Systems Architect',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indianapolis',
      addressRegion: 'IN',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: [
      'Marketing Strategy',
      'Marketing Technology',
      'Web Development',
      'CRM Implementation',
      'Marketing Automation',
      'SEO',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WorkCaseStudyJsonLd({ cs }: { cs: CaseStudy }) {
  const image = cs.heroPublicId ?? cs.logoPublicId
  const caseStudyUrl = `${SITE_URL}/work/${cs.slug}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${caseStudyUrl}#article`,
    url: caseStudyUrl,
    headline: cs.titleTag,
    name: cs.client,
    description: cs.metaDescription,
    author: {
      '@type': 'Person',
      name: 'Jacob Darling',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Darling MarTech',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': caseStudyUrl,
      url: caseStudyUrl,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Darling MarTech',
      url: SITE_URL,
    },
    about: cs.client,
    image: image ? [`https://res.cloudinary.com/djhqowk67/image/upload/${image}`] : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
