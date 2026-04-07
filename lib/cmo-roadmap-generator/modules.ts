import type { RoadmapModule } from './types'

export const ALL_ROADMAP_MODULES: RoadmapModule[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Positioning',
    description: 'Clarify what you do, who it is for, and how the offer should be framed.',
    defaultPhase: 1,
  },
  {
    id: 'gtm-planning',
    title: 'Go-To-Market Planning',
    description: 'Turn goals, audience, and channel choices into a coordinated go-to-market plan.',
    defaultPhase: 1,
  },
  {
    id: 'martech-audit',
    title: 'MarTech Audit & Cleanup',
    description: 'Audit the stack, remove friction, and establish a more reliable operating baseline.',
    defaultPhase: 1,
  },
  {
    id: 'kpi-baseline',
    title: 'KPI / Reporting Baseline',
    description: 'Define the reporting layer needed to make better decisions.',
    defaultPhase: 1,
  },
  {
    id: 'website-conversion',
    title: 'Website Redesign & Conversion UX',
    description: 'Improve the website’s ability to explain the offer and turn attention into action.',
    defaultPhase: 2,
  },
  {
    id: 'crm-cleanup',
    title: 'CRM / Lead Flow Cleanup',
    description: 'Reduce lead loss and improve handoff, routing, and follow-up logic.',
    defaultPhase: 2,
  },
  {
    id: 'local-seo',
    title: 'Local SEO / GEO Optimization',
    description: 'Strengthen discoverability and trust signals where local visibility matters.',
    defaultPhase: 2,
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Optimization',
    description: 'Test, refine, and improve performance once the foundation is in place.',
    defaultPhase: 3,
  },
  {
    id: 'email-automation',
    title: 'Lifecycle / Email Automation',
    description: 'Add structured nurture, follow-up, and lifecycle messaging.',
    defaultPhase: 3,
  },
  {
    id: 'attribution-cleanup',
    title: 'Attribution / Reporting Cleanup',
    description: 'Tighten attribution and reporting so the next decisions are easier to trust.',
    defaultPhase: 3,
  },
]
