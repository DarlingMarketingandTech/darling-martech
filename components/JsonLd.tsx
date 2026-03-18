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
