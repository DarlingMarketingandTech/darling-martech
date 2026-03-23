import type { CaseStudy } from '@/lib/work'

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Darling MarTech',
    alternateName: 'Marketing and Technology LLC',
    description:
      'Marketing strategy, technology, and automation consulting for small businesses and startups. Based in Indianapolis, IN.',
    url: 'https://darlingmartech.com',
    email: 'jacob@jacobdarling.com',
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
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.titleTag,
    description: cs.metaDescription,
    author: {
      '@type': 'Person',
      name: 'Jacob Darling',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Darling MarTech',
      url: 'https://darlingmartech.com',
    },
    mainEntityOfPage: `https://darlingmartech.com/work/${cs.slug}`,
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
