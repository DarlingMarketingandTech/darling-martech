import type { IndustryTag, OutcomeTag, ServiceTag } from './taxonomy'

export type ServicePageKind = 'parent' | 'standalone'
export type ServiceLayer = 'strategy' | 'build' | 'growth'

export type ServiceOverviewItem = {
  id: string
  title: string
  summary: string
  bullets: string[]
  href: string
}

export type ServiceProof = {
  label: string
  href: string
  result: string
  signalLabel: string
  metric: string
  sceneTarget?: string
}

export type ServiceStat = {
  value: string
  label: string
}

export type ProofTool = {
  /** Lab slug — used to build /lab/[slug] link */
  labSlug: string
  eyebrow: string
  title: string
  body: string
  /** Label for the external CTA button */
  externalCtaLabel: string
  externalCtaHref: string
  /** Label for the internal "see how it was built" link */
  internalCtaLabel?: string
  /** Cloudinary image public ID for the tool preview */
  imagePublicId?: string
  /** Alt text for the preview image */
  imageAlt?: string
}

type BaseServicePage = {
  id: string
  routePath?: string
  kind: ServicePageKind
  layer: ServiceLayer
  eyebrow: string
  title: string
  summary: string
  deliverables: string[]
  proof: ServiceProof[]
  serviceIds: ServiceTag[]
  industryIds?: IndustryTag[]
  outcomeIds?: OutcomeTag[]
  tagline?: string
  proofStats?: ServiceStat[]
  proofWorkSlugs?: string[]
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  /** Short pricing signal shown on detail page — e.g. "$2K–$5K · 2–4 week engagement" */
  pricingSignal?: string
  /** IDs of related service pages to cross-link at the bottom of the detail page */
  relatedServiceSlugs?: string[]
  /** Lab tools that demonstrate this service's capabilities — rendered as proof artifact cards */
  proofTools?: ProofTool[]
}

export type ParentServiceDetail = BaseServicePage & {
  kind: 'parent'
  sceneTarget: string
  /** IDs of standalone service pages to surface as productized offers inside this module */
  childServiceSlugs?: string[]
}

export type StandaloneServicePage = BaseServicePage & {
  kind: 'standalone'
  sceneTarget?: string
}

export type ServicePageEntry = ParentServiceDetail | StandaloneServicePage

export type SpecializedService = {
  title: string
  description: string
}

export type EngagementModel = {
  id: string
  title: string
  summary: string
  bestFor: string
}

export const serviceLayerMeta: Array<{
  id: ServiceLayer
  label: string
  shortLabel: string
  description: string
}> = [
  {
    id: 'strategy',
    label: 'Strategy',
    shortLabel: 'Strategy',
    description: 'Direction, positioning, and senior-level marketing leadership.',
  },
  {
    id: 'build',
    label: 'Build',
    shortLabel: 'Build',
    description: 'Brand systems, websites, automation, revenue infrastructure, and specialty execution.',
  },
  {
    id: 'growth',
    label: 'Growth',
    shortLabel: 'Growth',
    description: 'Search visibility, demand generation, measurement, and conversion improvement.',
  },
]

export const serviceOverview: ServiceOverviewItem[] = [
  {
    id: 'strategy',
    title: 'Strategy & Leadership',
    summary:
      'Positioning, audits, launch planning, campaign direction, and embedded senior marketing leadership when you need clarity before execution.',
    bullets: ['Fractional marketing lead', 'Positioning and GTM', 'Channel planning'],
    href: '/services#strategy',
  },
  {
    id: 'brand-web',
    title: 'Brand, Websites & UX',
    summary:
      'Brand identity systems, conversion-focused websites, and digital experiences built to earn trust and move people to action.',
    bullets: ['Brand identity', 'Website redesigns', 'Booking and quote flows'],
    href: '/services#brand-web',
  },
  {
    id: 'systems',
    title: 'CRM, Automation & AI',
    summary:
      'Backend systems that make marketing easier to run: CRM architecture, workflow automation, integrations, dashboards, and internal AI tools.',
    bullets: ['CRM architecture', 'Workflow automation', 'AI and internal tools'],
    href: '/services#systems',
  },
  {
    id: 'growth',
    title: 'SEO, Content & Demand',
    summary:
      'Local SEO, content systems, paid acquisition, and conversion cleanup designed to turn visibility into booked calls, patients, orders, or leads.',
    bullets: ['Local SEO', 'Content systems', 'Paid and organic growth'],
    href: '/services#growth',
  },
]

export const serviceDetails: ParentServiceDetail[] = [
  {
    id: 'strategy',
    kind: 'parent',
    layer: 'strategy',
    sceneTarget: 'strategy-core',
    eyebrow: 'Strategy',
    title: 'Fractional Marketing Leadership & Growth Strategy',
    serviceIds: ['fractional-cmo', 'brand-strategy'],
    industryIds: ['healthcare', 'legal', 'saas', 'ecommerce', 'hospitality', 'nonprofit'],
    tagline: 'Senior-level thinking before more random execution.',
    summary:
      'For businesses that need senior-level thinking before they need more random execution. I step in to clarify positioning, priorities, budgets, channels, and the roadmap.',
    deliverables: [
      'Marketing audits and growth opportunity mapping',
      'Brand positioning and messaging strategy',
      'Go-to-market and campaign planning',
      'Budget planning, KPI frameworks, and reporting cadence',
      'Fractional CMO / embedded marketing leadership',
    ],
    proof: [
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: '45% patient growth over 3 years across a multi-division medical group.',
        signalLabel: 'Embedded leadership',
        metric: '45% patient growth',
        sceneTarget: 'strategy-pike',
      },
      {
        label: 'Riley Bennett Egloff',
        href: '/work/riley-bennett-egloff',
        result: 'Seven-year embedded engagement spanning strategy, website, PR, and business development.',
        signalLabel: 'Long-cycle advisory',
        metric: '7+ year engagement',
        sceneTarget: 'strategy-rbe',
      },
      {
        label: 'Primary Colours',
        href: '/work/primary-colours',
        result: 'Structured sponsorship strategy that helped generate $46k+ in exhibition revenue.',
        signalLabel: 'Revenue architecture',
        metric: '$46k+ raised',
        sceneTarget: 'strategy-primary-colours',
      },
    ],
    pricingSignal: '$3.5K–$12K/month · Audit-first, retainer, or embedded',
    relatedServiceSlugs: ['martech-audit', 'systems', 'growth'],
    childServiceSlugs: ['fractional-cmo'],
    proofTools: [
      {
        labSlug: 'cmo-simulator',
        eyebrow: 'Interactive framework',
        title: 'Try the CMO Simulator.',
        body: 'A 10-minute guided decision framework that walks through budget allocation, channel strategy, KPI selection, and execution priority — the same logic used with clients.',
        externalCtaLabel: 'Run the simulator',
        externalCtaHref: '/lab/cmo-simulator',
        internalCtaLabel: 'See how it was built',
        imagePublicId: 'CMO_Sim-_Q1',
        imageAlt: 'CMO Simulator — interactive strategy walkthrough',
      },
    ],
  },
  {
    id: 'brand-web',
    kind: 'parent',
    layer: 'build',
    sceneTarget: 'build-brand-web',
    eyebrow: 'Brand & Experience',
    title: 'Brand Identity, Websites & Conversion Design',
    serviceIds: ['brand-identity', 'web-development', 'conversion-design'],
    industryIds: ['legal', 'hospitality', 'local-service', 'ecommerce', 'healthcare'],
    tagline: 'The front-end layer people see — built to earn trust and move them to act.',
    summary:
      'I build the front-end layer people actually see: visual identity, messaging, site structure, conversion paths, and the trust signals that make the right clients act.',
    deliverables: [
      'Brand identity systems, logos, and brand playbooks',
      'Website strategy, copy structure, and UX architecture',
      'Next.js and WordPress website builds and redesigns',
      'Booking, quote, catering, check-in, and contact funnel design',
      'Mobile-first conversion and performance optimization',
    ],
    proof: [
      {
        label: '317 BBQ',
        href: '/work/317-bbq',
        result: '40% lift in order conversions and 2x catering inquiries after the redesign.',
        signalLabel: 'Conversion rebuild',
        metric: '40% conversion lift',
        sceneTarget: 'build-317bbq',
      },
      {
        label: 'Hoosier Boy Barbershop',
        href: '/work/hoosier-boy-barbershop',
        result: '90% more online bookings with a local-first identity and booking experience.',
        signalLabel: 'Booking flow',
        metric: '90% more bookings',
        sceneTarget: 'build-hoosier-boy',
      },
      {
        label: 'Tuohy Bailey & Moore',
        href: '/work/tuohy-bailey-moore',
        result: '60% more contact form submissions after brand and website rebuild.',
        signalLabel: 'Trust-led redesign',
        metric: '60% more inquiries',
        sceneTarget: 'build-tbm',
      },
    ],
    pricingSignal: '$4K–$20K · Project-based depending on scope',
    relatedServiceSlugs: ['strategy', 'growth', 'commerce'],
  },
  {
    id: 'systems',
    kind: 'parent',
    layer: 'build',
    sceneTarget: 'build-systems',
    eyebrow: 'Systems',
    title: 'CRM Architecture, Automation, Integrations & AI Tools',
    serviceIds: ['crm-automation', 'lead-gen-workflows', 'email-marketing', 'agentic-systems'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    tagline: 'The operational layer most firms never get right.',
    summary:
      'This is the operational layer most firms never get right. I wire together the CRM, automations, APIs, dashboards, and internal tools that keep marketing and sales moving without manual chaos.',
    deliverables: [
      'CRM architecture and lifecycle automation design',
      'Lead scoring, onboarding, nurture, and reactivation workflows',
      'Membership, LMS, and e-commerce platform integrations',
      'Custom calculators, dashboards, and internal tools',
      'AI assistants, AI-enabled workflows, and API-based automations',
    ],
    proof: [
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: '95% reduction in manual overhead and 48 hours saved per week.',
        signalLabel: 'Automation engine',
        metric: '95% less manual overhead',
        sceneTarget: 'build-graston',
      },
      {
        label: 'The Launchpad',
        href: '/work/the-launchpad',
        result: 'Provider directory membership funnel with zero manual enrollment steps.',
        signalLabel: 'Lifecycle workflow',
        metric: '0 manual enrollment steps',
        sceneTarget: 'build-launchpad',
      },
      {
        label: 'Lab tools',
        href: '/lab',
        result: 'Custom calculators, analytics bridges, SEO scanners, and AI experiments already shipped.',
        signalLabel: 'Custom tooling',
        metric: 'Production-ready internal tools',
        sceneTarget: 'build-lab',
      },
    ],
    pricingSignal: '$4K–$30K+ · Scoped by stack size and integration depth',
    relatedServiceSlugs: ['martech-audit', 'strategy', 'commerce'],
    childServiceSlugs: ['martech-audit'],
    proofTools: [
      {
        labSlug: 'graston-growth-engine',
        eyebrow: 'Live build',
        title: 'See the Graston Growth Engine in action.',
        body: 'A two-sided provider directory with real-time spatial search, AI-powered support automation, and a per-provider analytics dashboard — built as a production system, not a demo.',
        externalCtaLabel: 'Explore the live build',
        externalCtaHref: 'https://graston-growth-engine.vercel.app/',
        internalCtaLabel: 'See the full build breakdown',
        imagePublicId: 'graston-growth-engine_-_admin_command_center',
        imageAlt: 'Graston Growth Engine — admin command center',
      },
    ],
  },
  {
    id: 'growth',
    kind: 'parent',
    layer: 'growth',
    sceneTarget: 'growth-core',
    eyebrow: 'Demand Generation',
    title: 'SEO, Content Systems, Paid Acquisition & Analytics',
    serviceIds: ['seo-content', 'local-seo', 'technical-seo', 'paid-acquisition', 'analytics-reporting'],
    industryIds: ['local-service', 'healthcare', 'legal', 'hospitality', 'ecommerce'],
    tagline: 'Get found, get understood, get chosen.',
    summary:
      'I help businesses get found, get understood, and get chosen. That means search visibility, useful content, paid demand when needed, and clean measurement behind all of it.',
    deliverables: [
      'Local SEO architecture and Google Business optimization',
      'Content strategy and conversion-focused content systems',
      'Paid search and campaign planning',
      'Analytics setup, dashboards, and attribution cleanup',
      'Review and trust-signal strategy for local and professional services',
    ],
    proof: [
      {
        label: 'PrimaryCare Indy',
        href: '/work/primarycare-indy',
        result: '300% organic traffic growth and 75% more online bookings.',
        signalLabel: 'Organic demand',
        metric: '300% organic traffic growth',
        sceneTarget: 'growth-primarycare',
      },
      {
        label: 'UrgentCare Indy',
        href: '/work/urgentcare-indy',
        result: 'Top-3 local search visibility and 35% more online bookings.',
        signalLabel: 'Local visibility',
        metric: 'Top-3 local rankings',
        sceneTarget: 'growth-urgentcare',
      },
      {
        label: 'Russell Painting',
        href: '/work/russell-painting',
        result: 'Heritage-led SEO and trust architecture turned the site into a lead engine.',
        signalLabel: 'Trust + search',
        metric: 'Lead engine rebuilt',
        sceneTarget: 'growth-russell',
      },
    ],
    pricingSignal: '$2K–$8K/month · Project or retainer depending on scope',
    relatedServiceSlugs: ['geo-optimization', 'brand-web', 'martech-audit'],
    childServiceSlugs: ['geo-optimization'],
  },
  {
    id: 'commerce',
    kind: 'parent',
    layer: 'build',
    sceneTarget: 'build-commerce',
    eyebrow: 'Revenue Systems',
    title: 'E-Commerce, Checkout Flows & Revenue Operations',
    serviceIds: ['ecommerce', 'conversion-design', 'crm-automation'],
    industryIds: ['ecommerce', 'hospitality', 'local-service'],
    tagline: 'The path from interest to purchase — built to convert.',
    summary:
      'When revenue depends on checkout, upsells, payment plans, or product education, the sales system has to do more than look good. I build the path from interest to purchase.',
    deliverables: [
      'WooCommerce and payment workflow implementation',
      'Quote-to-order and installment flow design',
      'Product education systems that reduce friction and support load',
      'Cross-sell, upsell, and offer architecture',
      'Revenue reporting and conversion diagnostics',
    ],
    proof: [
      {
        label: 'The Closer',
        href: '/work/the-closer',
        result: 'Quote-to-order automation that pushed manual invoicing essentially to zero.',
        signalLabel: 'Payment infrastructure',
        metric: '0 manual invoices post-deployment',
        sceneTarget: 'build-closer',
      },
      {
        label: 'Behr Pet Essentials',
        href: '/work/behr-pet-essentials',
        result: '28% higher cart value and 40% fewer support tickets.',
        signalLabel: 'Offer architecture',
        metric: '28% higher cart value',
        sceneTarget: 'build-behr',
      },
      {
        label: '317 BBQ',
        href: '/work/317-bbq',
        result: 'Menu-first ordering and catering pathways built around purchase intent.',
        signalLabel: 'Path-to-purchase',
        metric: '2x catering inquiries',
        sceneTarget: 'build-317bbq-orders',
      },
    ],
    pricingSignal: '$4K–$18K · Project-based, scoped by platform complexity',
    relatedServiceSlugs: ['brand-web', 'systems', 'martech-audit'],
  },
  {
    id: 'specialized',
    kind: 'parent',
    layer: 'build',
    sceneTarget: 'build-specialized',
    eyebrow: 'Specialized Builds',
    title: 'Industry-Specific Systems & Specialty Engagements',
    serviceIds: ['web-development', 'crm-automation', 'brand-identity', 'analytics-reporting'],
    industryIds: ['healthcare', 'legal', 'nonprofit', 'local-service', 'saas'],
    tagline: 'Built around the operational realities of your world.',
    summary:
      'A lot of the work is not generic. I regularly build around the operational realities of healthcare, legal, membership platforms, local service businesses, and founder-led brands.',
    deliverables: [
      'Healthcare patient acquisition, scheduling, and check-in flows',
      'Law firm and professional services trust-led websites',
      'Membership and training ecosystem builds',
      'Event marketing, sponsorship packaging, and campaign support',
      'Photography-driven storytelling and launch content systems',
    ],
    proof: [
      {
        label: 'UrgentCare Indy',
        href: '/work/urgentcare-indy',
        result: 'Check-in, pricing transparency, and patient acquisition built into one experience.',
        signalLabel: 'Healthcare flow',
        metric: '60% of visits via online check-in',
        sceneTarget: 'build-urgentcare-flow',
      },
      {
        label: 'Black Letter',
        href: '/work/black-letter',
        result: 'Premium legal advisory identity designed to signal authority without category cliches.',
        signalLabel: 'Professional branding',
        metric: 'Full identity system delivered',
        sceneTarget: 'build-black-letter',
      },
      {
        label: 'Primary Colours',
        href: '/work/primary-colours',
        result: 'Campaign, sponsorship, and audience infrastructure built around a 23-day exhibition.',
        signalLabel: 'Campaign infrastructure',
        metric: '10,000+ audience reached',
        sceneTarget: 'build-primary-colours-exhibit',
      },
    ],
    pricingSignal: '$4K–$25K · Scoped per industry and engagement depth',
    relatedServiceSlugs: ['strategy', 'brand-web', 'systems'],
  },
]

export const standaloneServicePages: StandaloneServicePage[] = [
  {
    id: 'martech-audit',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Audit Offer',
    title: 'MarTech Audit',
    tagline: 'Find what is redundant, broken, or slowing growth before another dollar gets wasted.',
    summary:
      'The MarTech Audit is a productized audit-and-fix engagement for businesses whose CRM, automation, attribution, forms, reporting, or tool stack has become expensive, overlapping, or unreliable. I do not stop at a slide deck. I identify the problems, show you what to keep, what to cut, and what to rebuild, then map the next implementation move.',
    deliverables: [
      'Full stack inventory across CRM, automation, analytics, forms, and reporting tools',
      'Redundancy and overlap analysis to identify wasted spend and conflicting systems',
      'Attribution, lifecycle, and handoff review to expose breakpoints in lead flow',
      'Priority-ranked remediation roadmap with what to cut, consolidate, and rebuild first',
      'Executive summary you can act on immediately or use to scope the implementation phase',
    ],
    proof: [
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: 'A fragmented education and membership stack became a unified system that generated 212% more qualified leads and removed most manual work.',
        signalLabel: 'Stack rebuild',
        metric: '+212% qualified leads',
      },
      {
        label: 'The Fortress',
        href: '/work/the-fortress',
        result: 'Infrastructure hardening eliminated direct-origin exposure and blocked more than 85k threats per month.',
        signalLabel: 'Risk reduction',
        metric: '85k+ threats blocked',
      },
      {
        label: 'The Compass',
        href: '/work/the-compass',
        result: 'Analytics and monitoring design surfaced issues before they became outages or blind spots for the team.',
        signalLabel: 'Visibility',
        metric: '94% issues auto-resolved',
      },
    ],
    proofStats: [
      { value: '40%+', label: 'of tools often found to be redundant or overlapping in messy stacks' },
      { value: '2-4 weeks', label: 'to complete the audit, findings, and implementation roadmap' },
      { value: '$2K-$5K', label: 'typical audit engagement depending on stack complexity' },
    ],
    proofWorkSlugs: ['graston-technique', 'the-fortress', 'the-compass', 'the-launchpad'],
    serviceIds: ['martech-audit', 'crm-automation', 'analytics-reporting'],
    industryIds: ['healthcare', 'saas', 'b2b', 'ecommerce'],
    outcomeIds: ['cost-reduction', 'revenue-attribution', 'time-saved'],
    primaryCtaLabel: 'Request a MarTech Audit',
    secondaryCtaLabel: 'See audit proof',
    secondaryCtaHref: '/work',
    pricingSignal: '$2K–$5K · 2–4 week engagement, deliverable-backed',
    relatedServiceSlugs: ['systems', 'strategy', 'growth'],
  },
  {
    id: 'geo-optimization',
    routePath: '/services/website-ux/geo-optimization',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'SEO / GEO Offer',
    title: 'GEO Optimization',
    tagline: 'Make your site easier for AI systems to read, trust, and cite.',
    summary:
      'GEO Optimization is a focused service for businesses that want visibility in AI-assisted search and answer engines, not just traditional rankings. I audit structure, schema, content hierarchy, trust signals, and crawl directives, then implement the highest-leverage fixes in the right order.',
    deliverables: [
      'GEO readiness baseline using the live GEO Readiness Auditor',
      'Schema coverage and machine-readability implementation plan',
      'Robots and crawler directives aligned for AI bot access',
      'E-E-A-T signal upgrades across author, about, and citation surfaces',
      'FAQ, heading, and content-structure rewrites for answer-engine retrieval',
      'Implementation roadmap with priority by impact and effort',
    ],
    proof: [
      {
        label: 'GEO Readiness Auditor',
        href: '/lab/geo-readiness-auditor',
        result: 'Live tool scores AI visibility from 0-100 and returns prioritized technical and content fixes.',
        signalLabel: 'Live diagnostic',
        metric: '0-100 GEO score',
      },
      {
        label: 'PrimaryCare Indy',
        href: '/work/primarycare-indy',
        result: 'Search visibility architecture produced sustained organic growth and significantly higher booking volume.',
        signalLabel: 'Organic visibility',
        metric: '300% traffic growth',
      },
      {
        label: 'Russell Painting',
        href: '/work/russell-painting',
        result: 'Trust-led technical and content structure rebuilt the site into a stronger lead acquisition channel.',
        signalLabel: 'Trust architecture',
        metric: 'Lead engine rebuilt',
      },
    ],
    proofStats: [
      { value: '0-100', label: 'GEO readiness score from the live auditor' },
      { value: '60 sec', label: 'to generate a baseline report and top fixes' },
      { value: '6', label: 'core AI visibility checks used to prioritize work' },
    ],
    proofWorkSlugs: ['primarycare-indy', 'russell-painting', 'graston-technique'],
    serviceIds: ['geo-optimization', 'technical-seo', 'seo-content'],
    industryIds: ['healthcare', 'local-service', 'b2b', 'saas'],
    outcomeIds: ['traffic-growth', 'lead-gen', 'conversion-lift'],
    primaryCtaLabel: 'Run the free GEO audit',
    secondaryCtaLabel: 'See GEO build details',
    secondaryCtaHref: '/lab/geo-readiness-auditor',
    pricingSignal: '$1.5K–$4K · One-time implementation, optional retainer',
    relatedServiceSlugs: ['growth', 'martech-audit', 'brand-web'],
    proofTools: [
      {
        labSlug: 'geo-readiness-auditor',
        eyebrow: 'Proof tool',
        title: 'Run the free GEO audit first.',
        body: 'Get your 0-100 AI visibility score in under a minute, see the highest-impact fixes, and use that report to scope what needs to be implemented next.',
        externalCtaLabel: 'Run the free audit',
        externalCtaHref: 'https://darling-martech-geo-audit-tool.vercel.app/',
        internalCtaLabel: 'See how the auditor was built',
        imagePublicId: 'v1774692217/GEO_Readiness_Auditor',
        imageAlt: 'GEO Readiness Auditor preview',
      },
    ],
  },
  {
    id: 'fractional-cmo',
    kind: 'standalone',
    layer: 'strategy',
    eyebrow: 'Fractional CMO',
    title: 'Fractional CMO & Embedded Marketing Leadership',
    tagline: 'Senior-level strategy and execution direction — without building a full department before you are ready.',
    summary:
      'Most businesses do not need a full-time CMO right now. They need senior-level thinking embedded in how decisions get made — someone who owns the strategy, directs execution, and keeps the whole system accountable. That is what this engagement is. I step in as your marketing leadership layer: setting priorities, directing vendors and internal teams, building the measurement system, and making sure strategy connects to what actually gets built.',
    deliverables: [
      'Monthly strategic planning and priority-setting sessions',
      'KPI framework, reporting cadence, and dashboard setup',
      'Messaging, positioning, and channel strategy direction',
      'Budget planning and vendor/agency oversight',
      'Campaign and launch planning with execution direction',
      'CRM and marketing system architecture decisions',
      'Ongoing conversion and acquisition optimization leadership',
    ],
    proof: [
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: '45% patient growth over 3 years across five divisions — brand architecture, digital infrastructure, and acquisition strategy built from scratch.',
        signalLabel: 'Embedded CMO',
        metric: '45% patient growth',
      },
      {
        label: 'Riley Bennett Egloff',
        href: '/work/riley-bennett-egloff',
        result: 'Seven-year embedded engagement spanning website, PR, social, email, and business development for a 29-attorney firm.',
        signalLabel: 'Long-cycle advisory',
        metric: '7+ year engagement',
      },
      {
        label: 'Primary Colours',
        href: '/work/primary-colours',
        result: 'End-to-end campaign and sponsorship strategy that structured $46k+ in exhibition revenue and reached 10,000+ audience members.',
        signalLabel: 'Revenue architecture',
        metric: '$46k+ raised',
      },
    ],
    proofStats: [
      { value: '15+', label: 'years embedded in client marketing operations across healthcare, legal, SaaS, and local service' },
      { value: '3–12mo', label: 'typical engagement duration — most clients extend well beyond the initial term' },
      { value: '1 owner', label: 'no account managers, no hand-offs, no junior team running point while I disappear' },
    ],
    proofWorkSlugs: ['pike-medical-consultants', 'riley-bennett-egloff'],
    serviceIds: ['fractional-cmo', 'brand-strategy'],
    industryIds: ['healthcare', 'legal', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['lead-gen', 'revenue-attribution', 'brand-awareness'],
    primaryCtaLabel: 'Start a strategy conversation',
    secondaryCtaLabel: 'See the proof',
    secondaryCtaHref: '/work',
    pricingSignal: '$3.5K–$12K/month · Audit-first onboarding, then monthly retainer',
    relatedServiceSlugs: ['strategy', 'martech-audit', 'growth', 'systems'],
    proofTools: [
      {
        labSlug: 'cmo-simulator',
        eyebrow: 'Interactive framework',
        title: 'Try the CMO Simulator.',
        body: 'A 10-minute guided decision framework that walks through budget allocation, channel strategy, KPI selection, and execution priority — the same logic applied in every fractional engagement.',
        externalCtaLabel: 'Run the simulator',
        externalCtaHref: '/lab/cmo-simulator',
        internalCtaLabel: 'See how it was built',
        imagePublicId: 'CMO_Sim-_Q1',
        imageAlt: 'CMO Simulator — interactive strategy walkthrough',
      },
    ],
  },
]

export const allServicePages: ServicePageEntry[] = [...serviceDetails, ...standaloneServicePages]

export const specializedServices: SpecializedService[] = [
  {
    title: 'Local SEO & Google Business',
    description: 'Maps visibility, review strategy, and neighborhood-level search architecture for local service businesses.',
  },
  {
    title: 'Healthcare Patient Acquisition',
    description: 'Scheduling, check-in, provider discovery, pricing clarity, and urgent-care style decision flows.',
  },
  {
    title: 'Law Firm & Advisory Marketing',
    description: 'Trust-led websites, credential storytelling, business development support, and premium professional branding.',
  },
  {
    title: 'Membership & LMS Platforms',
    description: 'LearnDash, WooCommerce, CRM syncing, access control, and lifecycle automation for training businesses.',
  },
  {
    title: 'Custom Tools & Calculators',
    description: 'Internal tools, quote engines, pricing calculators, SEO scanners, dashboards, and niche web apps.',
  },
  {
    title: 'Analytics & Attribution',
    description: 'GA4 cleanup, dashboards, reporting bridges, lead-source clarity, and decision-ready KPI systems.',
  },
  {
    title: 'AI Assistants & Workflow Automation',
    description: 'Practical AI integrations tied into CRM, website, content, or internal process workflows.',
  },
  {
    title: 'Photography-Led Storytelling',
    description: 'Visual asset planning for brands where the product, place, or experience must sell through the screen.',
  },
]

export const engagementModels: EngagementModel[] = [
  {
    id: 'audit',
    title: 'Audit / Advisory',
    summary:
      'Best when you need diagnosis first: positioning gaps, conversion issues, channel confusion, or backend friction that is slowing growth.',
    bestFor: 'Strategy resets, second opinions, roadmap definition, and priority-setting before a larger engagement.',
  },
  {
    id: 'project',
    title: 'Project Build',
    summary:
      'Best for defined execution: a website rebuild, a CRM cleanup, a launch system, a reporting stack, or a scoped conversion project.',
    bestFor: 'Businesses that know what needs to be built and want senior-level execution without agency hand-offs.',
  },
  {
    id: 'embedded',
    title: 'Embedded / Fractional',
    summary:
      'Best when strategy and execution need to stay connected over time, with one person owning the thinking and the system architecture.',
    bestFor: 'Fractional marketing leadership, ongoing optimization, and infrastructure stewardship across multiple channels or teams.',
  },
]

export const contactServiceOptions = [
  { value: '', label: 'What do you need help with?' },
  { value: 'MarTech Audit', label: 'MarTech Audit' },
  { value: 'Fractional Marketing Leadership & Strategy', label: 'Fractional Marketing Leadership & Strategy' },
  { value: 'Brand Identity, Website & Conversion Design', label: 'Brand Identity, Website & Conversion Design' },
  { value: 'CRM, Automation, Integrations & AI Tools', label: 'CRM, Automation, Integrations & AI Tools' },
  { value: 'SEO, Content, Paid Acquisition & Analytics', label: 'SEO, Content, Paid Acquisition & Analytics' },
  { value: 'E-Commerce & Revenue Systems', label: 'E-Commerce & Revenue Systems' },
  { value: 'Specialized or Industry-Specific Engagement', label: 'Specialized or Industry-Specific Engagement' },
  { value: "Not sure yet — let's talk", label: "Not sure yet — let's talk" },
]

export function getServicePageBySlug(slug: string) {
  return allServicePages.find((service) => service.id === slug)
}

export function generateServiceStaticParams() {
  return allServicePages.map((service) => ({ slug: service.id }))
}
