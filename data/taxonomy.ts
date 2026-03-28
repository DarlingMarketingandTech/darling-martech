// Shared tag taxonomy — cross-referenced by services.ts, work-index.ts, and labs.ts
// ServiceTag drives the "Filter by service" mode on /work and auto-links lab tools to service pages

export const SERVICE_TAGS = {
  'crm-automation':      'CRM & Automation',
  'technical-seo':       'Technical SEO',
  'geo-optimization':    'GEO Optimization',
  'conversion-design':   'Conversion Design',
  'brand-strategy':      'Brand Strategy',
  'data-analytics':      'Data & Analytics',
  'agentic-systems':     'Agentic Systems',
  'martech-audit':       'MarTech Audit',
  'the-fortress':        'The Fortress',
  'the-conductor':       'The Conductor',
  'lead-gen-workflows':  'Lead Gen Workflows',
  'email-marketing':     'Email Marketing',
  'paid-acquisition':    'Paid Acquisition',
  'seo-content':         'SEO & Content',
  'web-development':     'Web Development',
  'ecommerce':           'E-Commerce',
  'fractional-cmo':      'Fractional CMO',
  'local-seo':           'Local SEO',
  'brand-identity':      'Brand Identity',
  'analytics-reporting': 'Analytics & Reporting',
} as const

export const INDUSTRY_TAGS = {
  'healthcare':    'Healthcare',
  'legal':         'Legal',
  'ecommerce':     'E-Commerce',
  'saas':          'SaaS',
  'hospitality':   'Hospitality',
  'nonprofit':     'Nonprofit',
  'local-service': 'Local Service',
  'finance':       'Finance',
  'b2b':           'B2B',
} as const

export const OUTCOME_TAGS = {
  'lead-gen':            'Lead Generation',
  'conversion-lift':     'Conversion Lift',
  'time-saved':          'Time Saved',
  'revenue-attribution': 'Revenue Attribution',
  'retention':           'Retention',
  'brand-awareness':     'Brand Awareness',
  'cost-reduction':      'Cost Reduction',
  'traffic-growth':      'Traffic Growth',
  'booking-growth':      'Booking Growth',
} as const

export type ServiceTag  = keyof typeof SERVICE_TAGS
export type IndustryTag = keyof typeof INDUSTRY_TAGS
export type OutcomeTag  = keyof typeof OUTCOME_TAGS
