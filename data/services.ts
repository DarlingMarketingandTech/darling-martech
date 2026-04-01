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

export type FaqItem = {
  q: string
  a: string
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
  /** Signs a buyer needs this service — symptom-led bullets displayed before deliverables */
  signsYouNeedIt?: string[]
  /** FAQ items rendered in an accordion below deliverables */
  faqItems?: FaqItem[]
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
      'When no one is truly steering the whole system, priorities drift and results get harder to trust. This is where senior direction, clear sequencing, and accountable execution come in.',
    bullets: ['Fractional marketing lead', 'Positioning and GTM', 'Channel planning'],
    href: '/services#strategy',
  },
  {
    id: 'brand-web',
    title: 'Brand, Websites & UX',
    summary:
      'When the site looks acceptable but underperforms — trust is weak, pages are unclear, conversion is low — a rebuild or restructure fixes the structure, not just the visuals.',
    bullets: ['Brand identity', 'Website redesigns', 'Booking and quote flows'],
    href: '/services#brand-web',
  },
  {
    id: 'systems',
    title: 'CRM, Automation & AI',
    summary:
      'When leads, follow-up, and reporting live in disconnected tools, growth becomes manual and unreliable. This work fixes the structure behind how the business actually runs.',
    bullets: ['CRM architecture', 'Workflow automation', 'AI and internal tools'],
    href: '/services#systems',
  },
  {
    id: 'growth',
    title: 'SEO, Content & Demand',
    summary:
      'When visibility is weaker than it should be or traffic isn\'t turning into action, the fix is usually structure and conversion clarity — not just more content or more spend.',
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
    primaryCtaLabel: 'Start a strategy conversation',
    secondaryCtaLabel: 'See strategy proof',
    relatedServiceSlugs: ['martech-audit', 'systems', 'growth'],
    childServiceSlugs: ['fractional-cmo'],
    proofTools: [
      {
        labSlug: 'cmo-simulator',
        eyebrow: 'Interactive framework',
        title: 'Try the CMO Simulator.',
        body: 'A 10-minute guided decision framework that walks through budget allocation, channel strategy, KPI selection, and execution priority — the same logic used with clients.',
        externalCtaLabel: 'Run the simulator',
        externalCtaHref: '/tools/cmo-simulator',
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
    primaryCtaLabel: 'Plan a website or brand rebuild',
    secondaryCtaLabel: 'See brand and website proof',
    secondaryCtaHref: '/work?service=web-development',
    relatedServiceSlugs: ['strategy', 'growth', 'commerce', 'martech-audit'],
    childServiceSlugs: ['brand-strategy', 'website-redesign-conversion-ux'],
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
        label: 'Internal tools',
        href: '/work/graston-growth-engine',
        result: 'Custom calculators, analytics dashboards, SEO scanners, and AI-powered support tools built for production.',
        signalLabel: 'Custom tooling',
        metric: 'Production-ready internal tools',
        sceneTarget: 'build-lab',
      },
    ],
    pricingSignal: '$4K–$30K+ · Scoped by stack size and integration depth',
    primaryCtaLabel: 'Start a systems conversation',
    secondaryCtaLabel: 'See systems proof',
    relatedServiceSlugs: ['martech-audit', 'strategy', 'growth', 'commerce'],
    childServiceSlugs: ['martech-audit', 'agentic-marketing-systems', 'the-fortress'],
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
    primaryCtaLabel: 'Start a growth conversation',
    secondaryCtaLabel: 'See growth proof',
    secondaryCtaHref: '/work?service=local-seo',
    relatedServiceSlugs: ['brand-web', 'systems', 'strategy', 'martech-audit'],
    childServiceSlugs: ['geo-optimization', 'the-conductor'],
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
    primaryCtaLabel: 'Talk through your revenue system',
    secondaryCtaLabel: 'See revenue systems proof',
    secondaryCtaHref: '/work?service=conversion-design',
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
    primaryCtaLabel: 'Talk through your specialized build',
    secondaryCtaLabel: 'See specialized proof',
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
    routePath: '/services/growth/geo-optimization',
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
        href: '/tools',
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
    secondaryCtaHref: '/tools',
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
    tagline: 'Senior marketing leadership for businesses that need a real owner of the whole system — not another vendor.',
    summary:
      'When marketing activity exists but no one is truly steering it, the symptoms are predictable: priorities shift without a clear reason, vendors produce work that does not connect, reporting exists but no one trusts it, and leadership can feel something is off but cannot see exactly where. The business is not short on effort — it is short on direction. A fractional CMO engagement puts a senior owner in place without requiring a full-time hire. I step in as the accountable lead across strategy, systems, measurement, and execution direction — setting the right priorities, aligning vendors and internal teams to a shared plan, building reporting that connects marketing to business outcomes, and making sure what gets built is what actually moves the needle. Most of this work is not about doing more. It is about getting the whole system to work together.',
    deliverables: [
      'Marketing audit and goal alignment — understanding what exists, what is working, and what to prioritize first',
      'Channel and offer prioritization — a clear plan for where to focus energy and budget',
      'Messaging and positioning direction — making sure what you say matches what buyers need to hear',
      'KPI framework and reporting cadence — connecting marketing activity to the metrics that actually matter',
      'Vendor and team coordination — directing execution partners toward shared goals',
      'Campaign and launch planning with execution oversight',
      'Ongoing strategic leadership — monthly planning sessions and decision support as the business evolves',
    ],
    signsYouNeedIt: [
      'The team is busy, but no one owns the full system',
      'Marketing priorities keep shifting because no one is steering them',
      'Vendors and freelancers are producing work without enough alignment or shared direction',
      'Reporting exists but leadership does not fully trust it or know how to act on it',
      'Strategy gets set but rarely makes it all the way into execution',
      'You know something is off in marketing, but it is hard to clearly see where',
      'Every campaign feels like a one-off — there is no operating system underneath it',
    ],
    faqItems: [
      {
        q: 'What does a fractional CMO actually do?',
        a: 'A fractional CMO is the senior marketing owner embedded in your business on a part-time basis. That means setting the strategy, directing vendors and internal teams, building the measurement system, and making sure what gets built is what actually moves the needle. It is not consulting from a distance — it is accountable leadership with regular working sessions and real execution oversight.',
      },
      {
        q: 'How is this different from hiring a marketing agency?',
        a: 'An agency executes what you tell them to. A fractional CMO owns the strategy that tells them what to do. If you already have vendors running SEO, paid, email, or content, the missing layer is usually someone senior enough to prioritize, align, and hold that work to a commercial standard. That is this engagement.',
      },
      {
        q: 'Do you implement too, or only advise?',
        a: 'Both. The strategy decisions, direction, and oversight are always part of this engagement. Depending on scope, I also get hands-on with specific builds — website architecture, CRM decisions, reporting setup, campaign structure. The balance depends on what the business needs most.',
      },
      {
        q: 'Is this right for a small team?',
        a: 'Yes — most clients in this engagement have lean teams or no in-house marketing staff at all. The model is built for businesses that are not ready to hire a full marketing department but need senior direction now. I work with what exists: founders, operations leads, a part-time coordinator, or a mix of external vendors.',
      },
      {
        q: 'How long do these engagements usually last?',
        a: 'Most engagements start with a 3-month minimum. The first month is typically an audit and alignment phase — getting clear on what exists and what needs to change. From there, most clients continue on a monthly retainer basis. A number extend well beyond a year once the foundation is in place.',
      },
    ],
    proof: [
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: '+212% qualified leads and 95% reduction in operational overhead after strategy, systems, and execution were rebuilt under one operating model.',
        signalLabel: 'Strategy + systems',
        metric: '+212% qualified leads',
      },
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: '45% patient growth over 3 years across five divisions — brand architecture, digital infrastructure, and acquisition strategy built from scratch and stewarded long-term.',
        signalLabel: 'Embedded CMO',
        metric: '45% patient growth',
      },
    ],
    proofStats: [
      { value: '15+', label: 'years embedded in client marketing operations across healthcare, legal, SaaS, and local service' },
      { value: '3–12mo', label: 'typical engagement duration — most clients extend well beyond the initial term' },
      { value: '1 owner', label: 'no account managers, no hand-offs, no junior team running point while I disappear' },
    ],
    proofWorkSlugs: ['graston-technique', 'pike-medical-consultants'],
    serviceIds: ['fractional-cmo', 'brand-strategy'],
    industryIds: ['healthcare', 'legal', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['lead-gen', 'revenue-attribution', 'brand-awareness'],
    primaryCtaLabel: 'Start a strategy conversation',
    secondaryCtaLabel: 'See the Graston build',
    secondaryCtaHref: '/work/graston-technique',
    pricingSignal: '$3.5K–$12K/month · Audit-first onboarding, then monthly retainer',
    relatedServiceSlugs: ['strategy', 'martech-audit', 'website-strategy', 'crm-architecture'],
    proofTools: [
      {
        labSlug: 'cmo-simulator',
        eyebrow: 'Interactive framework',
        title: 'Try the CMO Simulator.',
        body: 'A 10-minute guided decision framework that walks through budget allocation, channel strategy, KPI selection, and execution priority — the same logic applied in every fractional engagement.',
        externalCtaLabel: 'Run the simulator',
        externalCtaHref: '/tools/cmo-simulator',
        internalCtaLabel: 'See how it was built',
        imagePublicId: 'CMO_Sim-_Q1',
        imageAlt: 'CMO Simulator — interactive strategy walkthrough',
      },
    ],
  },
  {
    id: 'agentic-marketing-systems',
    routePath: '/services/systems/agentic-marketing-systems',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Systems',
    title: 'Agentic Marketing Systems & Workflow Automation',
    tagline: 'The operational infrastructure that makes marketing faster, more measurable, and less dependent on manual effort.',
    summary:
      'Most marketing teams are not slow because they lack ideas. They are slow because every step requires a human touch it should not need. I build the systems layer — CRM-connected workflows, AI-assisted automations, internal tooling, and orchestrated processes — that removes the manual drag and gives marketing and sales teams real operational leverage. This is not AI experimentation. It is infrastructure built to run.',
    deliverables: [
      'Workflow architecture and process mapping across marketing and sales operations',
      'CRM-connected automation design (lead routing, intake, lifecycle, reactivation)',
      'AI-assisted internal tooling — calculators, dashboards, and support automation',
      'Membership, LMS, and e-commerce platform integrations with CRM sync',
      'Lead scoring and qualification workflow design',
      'Analytics-aware automations with built-in reporting triggers',
      'Operational cleanup — deduplication, handoff repair, and stack consolidation',
    ],
    proof: [
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: '400+ automations built across a unified LMS, CRM, e-commerce, and provider directory platform. 95% reduction in manual overhead. 48 hours saved per week.',
        signalLabel: 'Full-stack build',
        metric: '95% less manual overhead',
      },
      {
        label: 'The Launchpad',
        href: '/work/the-launchpad',
        result: 'Provider directory membership funnel with zero manual enrollment steps. 3× faster onboarding, fully CRM-connected.',
        signalLabel: 'Lifecycle workflow',
        metric: '0 manual enrollment steps',
      },
      {
        label: 'The Closer',
        href: '/work/the-closer',
        result: 'Quote-to-order payment automation that eliminated manual invoicing and reduced deals lost at the close to near zero.',
        signalLabel: 'Revenue automation',
        metric: '100% quote-to-order automated',
      },
    ],
    proofStats: [
      { value: '400+', label: 'automations built and deployed across production marketing and sales systems' },
      { value: '48 hrs/wk', label: 'saved at Graston Technique after the full automation stack was deployed' },
      { value: '0', label: 'manual enrollment steps remaining after The Launchpad membership workflow was built' },
    ],
    proofWorkSlugs: ['graston-technique', 'the-launchpad'],
    serviceIds: ['crm-automation', 'agentic-systems', 'lead-gen-workflows'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['time-saved', 'lead-gen', 'cost-reduction'],
    primaryCtaLabel: 'Start a systems conversation',
    secondaryCtaLabel: 'See systems proof',
    secondaryCtaHref: '/work',
    pricingSignal: '$4K–$30K+ · Scoped by stack size and integration depth',
    relatedServiceSlugs: ['systems', 'martech-audit', 'brand-web', 'strategy'],
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
    id: 'the-fortress',
    routePath: '/services/systems/the-fortress',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Infrastructure',
    title: 'The Fortress — Infrastructure Hardening & Resilience Architecture',
    tagline: 'Your platform is only as reliable as the infrastructure under it. Most stacks are more fragile than anyone admits.',
    summary:
      'The Fortress is a systems hardening engagement for businesses whose websites, applications, or marketing platforms are exposed, brittle, or quietly degrading under load. I audit the architecture, eliminate direct-origin exposure, reduce attack surface, clean up performance drag, and build the monitoring foundation that lets you know when something is wrong before your customers do. This is not generic web security. It is infrastructure designed with operational continuity and business risk in mind.',
    deliverables: [
      'Direct-origin exposure audit and elimination via proxy/CDN architecture',
      'Security-aware deployment pattern review and remediation',
      'Infrastructure hardening — dependency cleanup, stack-risk reduction, and attack surface reduction',
      'Performance and server load audit with targeted remediation',
      'Monitoring and alerting foundation — uptime, error rates, and anomaly detection',
      'Resilience planning for customer-facing systems and critical marketing infrastructure',
      'Architecture documentation and operational runbook for ongoing stability',
    ],
    proof: [
      {
        label: 'The Fortress',
        href: '/work/the-fortress',
        result: '100% direct origin exposure eliminated. 85k+ threats blocked per month. 40% reduction in server CPU load after architecture hardening.',
        signalLabel: 'Infrastructure hardening',
        metric: '85k+ threats blocked/month',
      },
      {
        label: 'The Compass',
        href: '/work/the-compass',
        result: 'Monitoring and alerting infrastructure that resolved 94% of issues before escalation. 99.98% uptime SLA maintained.',
        signalLabel: 'Visibility & monitoring',
        metric: '94% issues auto-resolved',
      },
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: 'Full-platform architecture across LMS, CRM, e-commerce, and provider directory — built to handle production load without single points of failure.',
        signalLabel: 'Production architecture',
        metric: '95% less manual overhead',
      },
    ],
    proofStats: [
      { value: '85k+', label: 'threats blocked per month after origin shielding and architecture hardening' },
      { value: '100%', label: 'direct origin exposure eliminated — zero direct server access post-deployment' },
      { value: '40%', label: 'reduction in server CPU load after infrastructure cleanup and CDN optimization' },
    ],
    proofWorkSlugs: ['the-fortress', 'the-compass'],
    serviceIds: ['the-fortress', 'web-development', 'martech-audit'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['cost-reduction', 'time-saved', 'revenue-attribution'],
    primaryCtaLabel: 'Request an infrastructure review',
    secondaryCtaLabel: 'See resilience proof',
    secondaryCtaHref: '/work',
    pricingSignal: '$3K–$12K · Scoped by platform complexity and remediation depth',
    relatedServiceSlugs: ['systems', 'martech-audit', 'agentic-marketing-systems', 'brand-web'],
  },
  {
    id: 'the-conductor',
    routePath: '/services/growth/the-conductor',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'Measurement & Attribution',
    title: 'The Conductor — Reporting, Attribution & Decision-Ready Analytics',
    tagline: 'Most businesses have marketing data. Very few have marketing clarity.',
    summary:
      'The Conductor is a measurement and attribution engagement for businesses that are generating activity — clicks, leads, traffic, campaigns — but cannot clearly see what is working, what is wasting budget, or what decision to make next. I build the reporting infrastructure, attribution logic, and KPI framework that turns disconnected data into a system your team can actually manage by. Not a dashboard for its own sake. A visibility layer tied to decisions.',
    deliverables: [
      'KPI framework design — revenue-connected metrics, not vanity counts',
      'Attribution model setup and lead-source visibility across marketing and CRM',
      'GA4 audit, cleanup, and event taxonomy rebuild where needed',
      'CRM and analytics alignment — connecting marketing activity to pipeline and revenue',
      'Executive and operational dashboard setup with decision-oriented structure',
      'Reporting cadence design — what to review weekly, monthly, and by campaign',
      'Channel and conversion performance interpretation with clear action framing',
    ],
    proof: [
      {
        label: 'The Compass',
        href: '/work/the-compass',
        result: '99.98% uptime SLA maintained. 94% of issues auto-resolved before escalation. Monitoring and alerting infrastructure that surfaced problems before they became outages.',
        signalLabel: 'Visibility infrastructure',
        metric: '94% issues auto-resolved',
      },
      {
        label: 'PrimaryCare Indy',
        href: '/work/primarycare-indy',
        result: '300% organic traffic growth and 210% ROI tracked through aligned analytics, attribution, and booking measurement.',
        signalLabel: 'Attribution + growth',
        metric: '210% ROI tracked',
      },
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: 'GA4 dashboards, lead attribution, and reporting infrastructure built across a multi-platform ecosystem — giving the marketing team real operational visibility for the first time.',
        signalLabel: 'Reporting architecture',
        metric: '+212% qualified leads attributed',
      },
    ],
    proofStats: [
      { value: '99.98%', label: 'uptime SLA maintained after monitoring infrastructure was built and deployed' },
      { value: '210%', label: 'ROI tracked at PrimaryCare Indy after attribution and analytics alignment' },
      { value: '94%', label: 'of issues auto-resolved before escalation with proper monitoring in place' },
    ],
    proofWorkSlugs: ['the-compass', 'primarycare-indy'],
    serviceIds: ['the-conductor', 'analytics-reporting', 'data-analytics'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b', 'local-service'],
    outcomeIds: ['revenue-attribution', 'lead-gen', 'conversion-lift'],
    primaryCtaLabel: 'Start a measurement conversation',
    secondaryCtaLabel: 'See measurement proof',
    secondaryCtaHref: '/work?service=analytics-reporting',
    pricingSignal: '$2K–$8K · Project-based audit and setup, optional retainer for ongoing reporting',
    relatedServiceSlugs: ['growth', 'martech-audit', 'systems', 'strategy'],
  },
  {
    id: 'brand-strategy',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Brand Strategy',
    title: 'Brand Strategy & Positioning',
    tagline: 'Websites, campaigns, and conversion funnels only work as well as the positioning underneath them.',
    summary:
      'Brand Strategy & Positioning is an upstream clarity engagement for businesses that have built the execution layer — website, ads, content, social — before getting the message right. I identify what your brand actually stands for, who it is for, how to say it clearly, and how that thinking needs to flow into your site structure, conversion logic, and campaign framing. The output is not a mood board. It is a positioning framework and messaging architecture you can build against.',
    deliverables: [
      'Brand positioning framework — market context, differentiation, and core value proposition',
      'Messaging architecture — headline hierarchy, audience-specific framing, and proof language',
      'Offer and audience clarification — who you are actually for and what makes you the right choice',
      'Trust and authority language direction — credentials, signals, and social proof structure',
      'Homepage and conversion-message hierarchy mapped to buyer intent stages',
      'Verbal-visual alignment guidance for identity, copy, and design direction',
      'Implementation brief for website, campaign, and content rollouts',
    ],
    proof: [
      {
        label: 'Hoosier Boy Barbershop',
        href: '/work/hoosier-boy-barbershop',
        result: 'A local-first identity so rooted in Indiana it could not be confused for anyone else. 90% more online bookings, #1 local search rankings, 200% social engagement growth.',
        signalLabel: 'Identity-to-conversion',
        metric: '90% more bookings',
      },
      {
        label: 'Tuohy Bailey & Moore',
        href: '/work/tuohy-bailey-moore',
        result: 'Brand strategy and rebuild for a firm with 200 years of combined experience — finally communicating like it. 60% more contact form submissions, 45% bounce rate reduction.',
        signalLabel: 'Trust-led redesign',
        metric: '60% more inquiries',
      },
      {
        label: 'Black Letter',
        href: '/work/black-letter',
        result: 'Premium legal advisory brand built from the meaning of the name itself — full identity system positioned for authority from day one.',
        signalLabel: 'Premium positioning',
        metric: 'Full identity system delivered',
      },
    ],
    proofStats: [
      { value: '90%', label: 'more online bookings at Hoosier Boy after brand identity and positioning work' },
      { value: '60%', label: 'more contact form submissions at Tuohy Bailey & Moore after the brand and site rebuild' },
      { value: '45%', label: 'bounce rate reduction — visitors stayed when the message matched what they needed' },
    ],
    proofWorkSlugs: ['hoosier-boy-barbershop', 'tuohy-bailey-moore'],
    serviceIds: ['brand-strategy', 'brand-identity', 'conversion-design'],
    industryIds: ['legal', 'hospitality', 'local-service', 'healthcare', 'b2b'],
    outcomeIds: ['conversion-lift', 'lead-gen', 'brand-awareness'],
    primaryCtaLabel: 'Start a brand strategy conversation',
    secondaryCtaLabel: 'See brand work',
    secondaryCtaHref: '/work',
    pricingSignal: '$3K–$8K · Standalone engagement or integrated into a website or campaign build',
    relatedServiceSlugs: ['brand-web', 'strategy', 'fractional-cmo', 'growth'],
  },
  // ── Batch 1 canonical child-service pages ──────────────────────────────────
  // These are the first-wave entries that the ServicesExperience clusters link to.
  // Copy and signsYouNeedIt/faqItems will be filled in the copywriting pass.
  // Proof assignments follow service-proof-matrix.md.

  {
    id: 'website-strategy',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Website Strategy',
    title: 'Website Strategy & Rebuilds',
    tagline: 'A site that looks fine but does not convert is still a problem.',
    summary:
      'Most underperforming websites are not ugly — they are structurally broken. Unclear hierarchy, weak trust signals, and messaging that does not match what the visitor needs to hear. I rebuild websites as business systems: positioning and page architecture first, then the conversion logic and UX layer that guides the right visitor to the right action.',
    deliverables: [
      'Website strategy and page hierarchy — which pages, in which order, serving which goal',
      'Conversion-focused UX architecture — how each page moves visitors toward a decision',
      'Homepage and service-page structure built around offer clarity and buyer intent',
      'Trust-signal and authority-layer design — credentials, proof, and visual confidence cues',
      'Booking, inquiry, quote, and contact flow optimization',
      'Mobile-first experience audit and implementation',
      'Messaging hierarchy mapped to visitor decision stages',
    ],
    proof: [
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: '45% patient growth over 3 years — brand architecture, digital infrastructure, and acquisition strategy rebuilt from scratch.',
        signalLabel: 'Healthcare rebuild',
        metric: '45% patient growth',
      },
      {
        label: 'Riley Bennett Egloff',
        href: '/work/riley-bennett-egloff',
        result: 'Seven-year embedded engagement spanning website, PR, and business development for a 29-attorney firm.',
        signalLabel: 'Long-term ownership',
        metric: '7+ year engagement',
      },
      {
        label: 'Tuohy Bailey & Moore',
        href: '/work/tuohy-bailey-moore',
        result: '60% more contact form submissions after a trust-led brand and website rebuild.',
        signalLabel: 'Trust-led redesign',
        metric: '60% more inquiries',
      },
    ],
    proofStats: [
      { value: '40%', label: 'average conversion lift delivered across website rebuild engagements' },
      { value: '75%', label: 'more online bookings at PrimaryCare Indy after the redesign and UX rebuild' },
      { value: '60%', label: 'more contact form submissions at Tuohy Bailey & Moore after brand and site rebuild' },
    ],
    proofWorkSlugs: ['pike-medical-consultants', 'riley-bennett-egloff', 'tuohy-bailey-moore'],
    serviceIds: ['web-development', 'conversion-design', 'brand-strategy'],
    industryIds: ['legal', 'healthcare', 'local-service', 'hospitality'],
    outcomeIds: ['conversion-lift', 'lead-gen', 'booking-growth'],
    primaryCtaLabel: 'Start a website strategy conversation',
    secondaryCtaLabel: 'See website work',
    secondaryCtaHref: '/work/pike-medical-consultants',
    pricingSignal: '$4K–$20K · Project-based, scoped by site size and complexity',
    relatedServiceSlugs: ['fractional-cmo', 'conversion-optimization', 'crm-architecture', 'local-seo'],
  },
  {
    id: 'crm-architecture',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'CRM Architecture',
    title: 'CRM Architecture & Marketing Systems',
    tagline: 'When leads, follow-up, and reporting live in disconnected tools, growth becomes manual and unreliable.',
    summary:
      'Most CRM problems are not software problems. They are architecture problems. The wrong structure means leads fall out, follow-up is inconsistent, and no one can trust the data. I design and build the CRM layer that connects marketing, sales, and operations — so the business actually runs the way it is supposed to.',
    deliverables: [
      'CRM architecture design and lifecycle automation mapping',
      'Lead routing, intake, nurture, and reactivation workflow builds',
      'Lead scoring and qualification logic design',
      'CRM-to-marketing and CRM-to-sales alignment — connecting activity to pipeline',
      'Membership, LMS, and e-commerce integrations with CRM sync',
      'Attribution and reporting alignment — connecting marketing inputs to revenue outputs',
      'Stack cleanup and deduplication — removing redundancy and repairing broken handoffs',
    ],
    proof: [
      {
        label: 'Graston Growth Engine',
        href: '/work/graston-growth-engine',
        result: 'Two-sided provider directory with real-time spatial search, AI-powered support, and per-provider analytics — zero manual enrollment.',
        signalLabel: 'Full-stack CRM build',
        metric: '0 manual enrollment steps',
      },
      {
        label: 'Barbershop Command Center',
        href: '/work/barbershop-command-center',
        result: 'Booking, client history, staff scheduling, and marketing automation unified into a single operational dashboard.',
        signalLabel: 'Operations integration',
        metric: 'Full operations unified',
      },
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result: '400+ automations across LMS, CRM, e-commerce, and provider directory. 95% reduction in manual overhead.',
        signalLabel: 'Automation engine',
        metric: '95% less manual overhead',
      },
    ],
    proofStats: [
      { value: '400+', label: 'automations built and deployed across production marketing and sales systems' },
      { value: '95%', label: 'reduction in manual overhead at Graston Technique after the full CRM and automation stack' },
      { value: '48 hrs/wk', label: 'saved at Graston Technique after the automation layer was deployed' },
    ],
    proofWorkSlugs: ['graston-growth-engine', 'graston-technique'],
    serviceIds: ['crm-automation', 'lead-gen-workflows', 'agentic-systems'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['time-saved', 'lead-gen', 'cost-reduction'],
    primaryCtaLabel: 'Start a CRM architecture conversation',
    secondaryCtaLabel: 'See the Graston build',
    secondaryCtaHref: '/work/graston-growth-engine',
    pricingSignal: '$4K–$30K+ · Scoped by stack size and integration depth',
    relatedServiceSlugs: ['fractional-cmo', 'website-strategy', 'local-seo', 'conversion-optimization'],
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
    id: 'local-seo',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'Local SEO',
    title: 'Local SEO & Search Visibility',
    tagline: 'The business should be found more often by the people who are already looking for it.',
    summary:
      'Most local businesses are invisible in search not because the competition is stronger, but because the structure is wrong. I fix the architecture — Google Business, schema, local signals, and content hierarchy — so the business earns the visibility it deserves and turns that traffic into action.',
    deliverables: [
      'Google Business Profile audit, optimization, and ongoing management strategy',
      'Local keyword architecture and landing-page structure for geo-targeted visibility',
      'Schema markup implementation — LocalBusiness, services, reviews, and FAQ',
      'Citation audit and cleanup — NAP consistency across directories and aggregators',
      'Review strategy and trust-signal architecture',
      'Content hierarchy and internal linking built for local search intent',
      'Analytics and reporting — tracking local visibility, clicks, and conversions',
    ],
    proof: [
      {
        label: 'Russell Painting',
        href: '/work/russell-painting',
        result: 'Heritage-led SEO and trust architecture turned the site into a lead engine. 4.9★ Google rating as primary conversion driver.',
        signalLabel: 'Trust + local search',
        metric: 'Lead engine rebuilt',
      },
      {
        label: 'Hoosier Boy Barbershop',
        href: '/work/hoosier-boy-barbershop',
        result: '#1 local search position and 200% social engagement growth after brand identity and local SEO build.',
        signalLabel: 'Local visibility',
        metric: '#1 local search',
      },
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: 'Multi-location local search presence built across five medical divisions over three years.',
        signalLabel: 'Multi-location SEO',
        metric: '45% patient growth',
      },
    ],
    proofStats: [
      { value: '300%', label: 'organic traffic growth at PrimaryCare Indy after local SEO and site architecture rebuild' },
      { value: '75%', label: 'more online bookings at PrimaryCare Indy driven by improved local search visibility' },
      { value: '#1', label: 'local search ranking achieved for Hoosier Boy Barbershop after brand and SEO build' },
    ],
    proofWorkSlugs: ['russell-painting', 'hoosier-boy-barbershop', 'primarycare-indy'],
    serviceIds: ['local-seo', 'seo-content', 'technical-seo'],
    industryIds: ['local-service', 'healthcare', 'hospitality', 'legal'],
    outcomeIds: ['traffic-growth', 'lead-gen', 'booking-growth'],
    primaryCtaLabel: 'Start a local SEO conversation',
    secondaryCtaLabel: 'See the Russell Painting build',
    secondaryCtaHref: '/work/russell-painting',
    pricingSignal: '$2K–$8K/month · Project or retainer depending on scope',
    relatedServiceSlugs: ['conversion-optimization', 'website-strategy', 'fractional-cmo'],
  },
  {
    id: 'conversion-optimization',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'Conversion Optimization',
    title: 'Conversion Optimization',
    tagline: 'Traffic exists. The gap is what happens to it.',
    summary:
      'Most conversion problems are not traffic problems. They are trust, clarity, and friction problems. The right visitors are arriving but leaving without acting — because the message is unclear, the path is wrong, or confidence breaks somewhere on the page. I find those breakpoints and fix them.',
    deliverables: [
      'Conversion audit — page-by-page review of hierarchy, trust signals, and friction points',
      'Funnel mapping — tracing the visitor path from entry to action across all key pages',
      'CTA architecture — which actions to push, where, and how to frame them',
      'Landing page and service-page restructuring for offer clarity and intent matching',
      'Booking, inquiry, and contact flow optimization — friction identified and removed',
      'Form and intake design that reduces drop-off without reducing lead quality',
      'A/B test planning and post-implementation measurement',
    ],
    proof: [
      {
        label: '317 BBQ',
        href: '/work/317-bbq',
        result: '40% lift in online order conversions and 2x catering inquiries after photography-first UX and purchase-intent restructuring.',
        signalLabel: 'Purchase-intent UX',
        metric: '40% conversion lift',
      },
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result: 'Online check-in, pricing transparency, and patient acquisition built into one experience — 60% of visits now via online check-in.',
        signalLabel: 'Healthcare conversion',
        metric: '60% visits via online check-in',
      },
      {
        label: 'Hoosier Boy Barbershop',
        href: '/work/hoosier-boy-barbershop',
        result: 'Booking flow rebuilt around the local identity — 90% more online bookings.',
        signalLabel: 'Booking flow rebuild',
        metric: '90% more bookings',
      },
    ],
    proofStats: [
      { value: '40%', label: 'average conversion lift delivered across website and funnel rebuild engagements' },
      { value: '90%', label: 'more online bookings at Hoosier Boy after the booking flow and identity rebuild' },
      { value: '2x', label: 'catering inquiry volume at 317 BBQ after the purchase-intent UX restructure' },
    ],
    proofWorkSlugs: ['317-bbq', 'hoosier-boy-barbershop', 'pike-medical-consultants'],
    serviceIds: ['conversion-design', 'web-development', 'seo-content'],
    industryIds: ['hospitality', 'healthcare', 'local-service', 'ecommerce'],
    outcomeIds: ['conversion-lift', 'lead-gen', 'booking-growth'],
    primaryCtaLabel: 'Start a conversion conversation',
    secondaryCtaLabel: 'See the 317 BBQ build',
    secondaryCtaHref: '/work/317-bbq',
    pricingSignal: '$2K–$8K · Audit or project-based depending on scope',
    relatedServiceSlugs: ['website-strategy', 'local-seo', 'fractional-cmo', 'crm-architecture'],
  },
  // ── End Batch 1 canonical entries ──────────────────────────────────────────

  {
    id: 'website-redesign-conversion-ux',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Website & Conversion',
    title: 'Website Redesign & Conversion UX',
    tagline: 'A website that does not move people to act is a liability, not an asset — no matter how good it looks.',
    summary:
      'Most underperforming websites are not ugly. They are structurally broken — unclear hierarchy, weak trust signals, friction in the booking or inquiry path, and messaging that does not match what the visitor actually needs to hear. I rebuild websites as business systems: positioning and message architecture first, then site structure, conversion logic, and the UX layer that guides the right visitor to the right action. The result is a site that earns confidence and produces measurable outcomes, not one that just checks a visual box.',
    deliverables: [
      'Website strategy and page hierarchy — which pages, in which order, serving which goal',
      'Conversion-focused UX architecture — how each page moves visitors toward a decision',
      'Homepage and service-page structure built around offer clarity and buyer intent',
      'Trust-signal and authority-layer design — credentials, proof, social signals, and visual confidence cues',
      'Booking, inquiry, quote, and contact flow optimization — friction mapped and removed',
      'Mobile-first experience audit and implementation — not a responsive afterthought',
      'Messaging hierarchy mapped to visitor decision stages',
      'Implementation brief or execution-ready build scope for development handoff or direct build',
    ],
    proof: [
      {
        label: '317 BBQ',
        href: '/work/317-bbq',
        result: 'Photography-first storytelling and purchase-intent UX produced a 40% lift in online order conversion and 2× catering inquiries.',
        signalLabel: 'Purchase-intent UX',
        metric: '40% conversion lift',
      },
      {
        label: 'Hoosier Boy Barbershop',
        href: '/work/hoosier-boy-barbershop',
        result: 'Booking flow rebuilt around the local identity — 90% more online bookings and #1 local search position.',
        signalLabel: 'Booking flow rebuild',
        metric: '90% more bookings',
      },
      {
        label: 'Tuohy Bailey & Moore',
        href: '/work/tuohy-bailey-moore',
        result: 'Trust-led brand and website rebuild for a firm with 200 years of combined experience — 60% more contact form submissions, 45% bounce rate reduction.',
        signalLabel: 'Trust-led redesign',
        metric: '60% more inquiries',
      },
      {
        label: 'PrimaryCare Indy',
        href: '/work/primarycare-indy',
        result: 'Independent clinic rebuilt to compete with health systems — 75% more online bookings and 300% organic traffic growth after the redesign.',
        signalLabel: 'Healthcare UX',
        metric: '75% more bookings',
      },
    ],
    proofStats: [
      { value: '40%', label: 'average conversion lift delivered across website rebuild engagements' },
      { value: '75%', label: 'more online bookings at PrimaryCare Indy after the redesign and UX rebuild' },
      { value: '60%', label: 'more contact form submissions at Tuohy Bailey & Moore after brand and site rebuild' },
    ],
    proofWorkSlugs: ['317-bbq', 'hoosier-boy-barbershop', 'tuohy-bailey-moore', 'primarycare-indy'],
    serviceIds: ['web-development', 'conversion-design', 'brand-strategy'],
    industryIds: ['legal', 'hospitality', 'local-service', 'healthcare', 'ecommerce'],
    outcomeIds: ['conversion-lift', 'booking-growth', 'lead-gen'],
    primaryCtaLabel: 'Start a website strategy conversation',
    secondaryCtaLabel: 'See website work',
    secondaryCtaHref: '/work',
    pricingSignal: '$4K–$20K · Project-based, scoped by site size, complexity, and whether copy and content are included',
    relatedServiceSlugs: ['brand-web', 'brand-strategy', 'martech-audit', 'growth'],
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
  // Exclude services that have a nested canonical route — those pages are
  // served by their own route files and flat-slug redirects are handled in
  // next.config.js before the dynamic route is ever reached.
  return allServicePages
    .filter((service) => !service.routePath || service.routePath === `/services/${service.id}`)
    .map((service) => ({ slug: service.id }))
}
