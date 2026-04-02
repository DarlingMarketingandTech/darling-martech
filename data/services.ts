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
  /** Optional single proof-led image (Cloudinary public ID) — Batch 1 visual support; subordinate to proof cards */
  supportImagePublicId?: string
  supportImageAlt?: string
  supportImageCaption?: string
  /** Canonical `/work/[slug]` for the optional case-study link under the support image */
  supportImageWorkSlug?: string
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
    childServiceSlugs: ['martech-audit', 'fractional-cmo'],
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
    secondaryCtaHref: '/work/317-bbq',
    relatedServiceSlugs: ['strategy', 'growth', 'commerce', 'martech-audit'],
    childServiceSlugs: ['website-strategy', 'conversion-optimization'],
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
    childServiceSlugs: [
      'crm-architecture',
      'agentic-marketing-systems',
      'custom-tools-workflow-products',
      'the-fortress',
    ],
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
    secondaryCtaHref: '/work/russell-painting',
    relatedServiceSlugs: ['brand-web', 'systems', 'strategy', 'martech-audit'],
    childServiceSlugs: ['local-seo', 'conversion-optimization', 'geo-optimization'],
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
    secondaryCtaHref: '/work/the-closer',
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
    layer: 'strategy',
    eyebrow: 'MarTech Audit',
    title: 'MarTech Audit & Stack Diagnostic',
    tagline: 'Clarity on what is actually broken, redundant, or misaligned — before you fund another rebuild or campaign.',
    summary:
      'If marketing and sales systems feel noisy, expensive, or hard to trust, the problem is rarely “one broken tool.” It is usually overlap, weak handoffs, unclear ownership, and reporting that does not tie back to decisions.\n\nThe MarTech Audit is a focused diagnostic engagement: map what you are actually running, find the real bottlenecks, and separate what deserves investment from what should be cut or consolidated. The output is not a generic PDF. It is a prioritized view of the stack, the friction points in lifecycle and attribution, and a practical roadmap for what to fix first — whether that becomes an implementation project, a CRM architecture pass, or a longer leadership engagement.',
    deliverables: [
      'Stack and workflow inventory — CRM, automation, analytics, forms, ads, and key integrations mapped as they behave in practice, not as the org chart says they should',
      'Bottleneck diagnosis — where leads stall, data breaks, handoffs fail, or teams work around the software instead of with it',
      'Overlap and spend-risk review — redundant tools, shadow processes, and conflicts that inflate cost and erode trust in reporting',
      'Lifecycle, attribution, and measurement check — whether stages, sources, and dashboards support real decisions or only activity',
      'Priority map — sequenced recommendations: stop, simplify, consolidate, or rebuild — with rationale tied to business risk and leverage',
      'Action roadmap and engagement bridge — clear suggested next step (implementation scope, CRM architecture, fractional leadership, or a narrower follow-on audit) so the audit lands in a decision, not a shelf',
    ],
    signsYouNeedIt: [
      'You have plenty of tools and dashboards, but leadership still cannot answer what is working or what to do next.',
      'Marketing, sales, and ops all use different versions of the truth — and no one fully trusts the CRM as the source of record.',
      'Vendors and channels are active, but the system still feels disconnected: leads, follow-up, and reporting do not line up.',
      'Priorities keep shifting because there is no shared diagnosis — only opinions and urgent fires.',
      'You are considering a big website, CRM, or automation project, but you are not sure what is actually holding you back.',
      'Manual workarounds, spreadsheets, and “someone just handles it” have become normal — and everyone knows that is fragile.',
      'You want a senior outside read on the whole picture before you commit serious budget or timeline.',
    ],
    faqItems: [
      {
        q: 'What does the MarTech Audit actually cover?',
        a: 'It covers how your marketing and sales systems work together in the real world: CRM and pipeline reality, automation and handoffs, forms and integrations, analytics and attribution, and where friction shows up for the team. It is structured as a diagnostic, not a channel checklist or a tool-by-tool brochure review.',
      },
      {
        q: 'How is this different from ongoing consulting or implementation?',
        a: 'The audit is a time-boxed engagement with a clear output: findings, priorities, and a roadmap. Ongoing consulting or implementation is what comes after — when you want someone to lead or build the fixes. Many clients use the audit to scope that next phase with confidence.',
      },
      {
        q: 'Is this the right step before a redesign, CRM rebuild, or growth push?',
        a: 'Often yes. Those projects go wrong when the business treats a symptom as the root cause. The audit helps you see whether the constraint is tooling, process, data, ownership, or messaging — so the next investment targets the real bottleneck.',
      },
      {
        q: 'What do I walk away with at the end?',
        a: 'A clear written picture of the current stack and workflows, prioritized issues with business-level framing, and a practical sequence for what to address first — including how I would recommend scoping follow-on work if you want help executing.',
      },
      {
        q: 'Can the audit lead into implementation work with you?',
        a: 'Yes. The roadmap is written to connect directly to the way I work on CRM architecture, automation, websites, and fractional leadership. There is no obligation — but there is a straight line from diagnosis to scoped build if you want it.',
      },
    ],
    proof: [
      {
        label: 'Graston Technique',
        href: '/work/graston-technique',
        result:
          'A fragmented education and membership stack became a coherent operating system — qualified demand up sharply and manual overhead driven down once the real constraints were addressed.',
        signalLabel: 'Full-stack diagnosis → rebuild',
        metric: '+212% qualified leads',
      },
      {
        label: 'Graston Growth Engine',
        href: '/work/graston-growth-engine',
        result:
          'A two-sided provider product with spatial search, admin visibility, and AI-assisted support — the kind of systems clarity that only happens when architecture is intentional, not accidental.',
        signalLabel: 'Systems depth',
        metric: '$27k+ projected provider revenue',
      },
      {
        label: 'The Compass',
        href: '/work/the-compass',
        result:
          'Measurement and monitoring designed so issues surface before they become outages — the visibility layer audits exist to protect.',
        signalLabel: 'Decision-ready visibility',
        metric: '94% issues auto-resolved',
      },
    ],
    proofStats: [
      { value: '2–4 wks', label: 'typical audit window from kickoff to prioritized roadmap delivery' },
      { value: '$2K–$5K', label: 'typical range — scoped by stack size, integrations, and stakeholder complexity' },
      { value: '1 view', label: 'one integrated picture of tools, handoffs, and reporting — not a slide deck per tool' },
    ],
    proofWorkSlugs: ['graston-technique', 'graston-growth-engine', 'the-compass'],
    serviceIds: ['martech-audit', 'crm-automation', 'analytics-reporting'],
    industryIds: ['healthcare', 'saas', 'b2b', 'ecommerce'],
    outcomeIds: ['cost-reduction', 'revenue-attribution', 'time-saved'],
    primaryCtaLabel: 'Request a MarTech Audit',
    secondaryCtaLabel: 'See the Graston stack rebuild',
    secondaryCtaHref: '/work/graston-technique',
    pricingSignal: '$2K–$5K · 2–4 week engagement, deliverable-backed',
    relatedServiceSlugs: ['crm-architecture', 'fractional-cmo', 'website-strategy'],
    proofTools: [
      {
        labSlug: 'cmo-simulator',
        eyebrow: 'Self-diagnostic',
        title: 'Run the CMO Simulator first.',
        body: 'A short guided pass on budget, channels, and priorities — useful context before we map your real stack and bottlenecks together.',
        externalCtaLabel: 'Run the simulator',
        externalCtaHref: '/tools/cmo-simulator',
        internalCtaLabel: 'See how it was built',
        imagePublicId: 'CMO_Sim-_Q1',
        imageAlt: 'CMO Simulator — strategy and priority walkthrough',
      },
    ],
  },
  {
    id: 'geo-optimization',
    routePath: '/services/growth/geo-optimization',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'Discoverability',
    title: 'GEO & Discoverability Readiness',
    tagline:
      'Stay findable and trustworthy as search behavior shifts — with structure and clarity, not trend-chasing.',
    summary:
      'More people find answers through summaries, overviews, and recommendations — not only a list of blue links. If your business depends on being discovered, the risk is not “AI replacing search” overnight. The risk is that your site and content are harder to interpret, connect, and trust when machines summarize what you do.\n\nThis work treats that as a discoverability and trust problem first. I help you see where your offers, proof, and entity-level signals are unclear or fragmented — and where the structure of the site and content either supports or undermines how you show up in newer search surfaces. The goal is practical readiness: a prioritized roadmap you can implement without building your marketing around hype.\n\nGEO (generative engine optimization) is simply the working name for that readiness work: clearer hierarchy, machine-legible structure where it matters, stronger alignment of authority signals, and content organized so the right story can surface when someone asks a real question — alongside, not instead of, solid SEO fundamentals.',
    deliverables: [
      'Discoverability / GEO audit — how your site, key pages, and trust signals read today across traditional search and newer answer-style surfaces',
      'Content and entity clarity review — what you offer, who it is for, and how consistently that story is stated (and linked) across the site',
      'Trust and authority signal alignment — credentials, proof, policies, and “about” layers that support credible answers, not keyword stuffing',
      'Structural and site-content recommendations — headings, internal linking, schema, and page roles framed as business-readable priorities',
      'Search-surface readiness priorities — sequenced fixes by impact and effort, including what belongs in a broader SEO or site roadmap',
      'Implementation roadmap — owner-ready next steps, optional build support, and how this connects to local SEO, site strategy, or a MarTech audit when relevant',
    ],
    signsYouNeedIt: [
      'Search and discovery behavior is clearly shifting for your buyers, but your plan still assumes “rankings only.”',
      'The site has content, but pages do not clearly answer who you are, what you do, and why you are credible — for humans or for structured interpretation.',
      'Authority and trust signals (proof, credentials, about, reviews) live in different places and do not reinforce each other.',
      'You depend on being found or recommended, but no one owns a practical discoverability roadmap beyond classic SEO tasks.',
      'Teams are hearing about AI and answer engines internally, but there is no calm, scoped way to respond.',
      'You want to be cited and chosen, not only to win a keyword — and you are not sure what to tighten first.',
      'Local SEO or core SEO work exists, but future-facing visibility (summaries, overviews, entity-style answers) still feels weak or undefined.',
    ],
    faqItems: [
      {
        q: 'What does GEO mean here — in plain English?',
        a: 'It is readiness for how people discover businesses when answers are summarized or assembled from many sources — not only when someone clicks through ten blue links. Practically, that means clearer structure, consistent entity-level messaging, trustworthy proof surfaces, and priorities that keep you legible as discovery formats evolve.',
      },
      {
        q: 'How is this different from traditional SEO or local SEO?',
        a: 'Traditional and local SEO still matter for demand. This layer asks a different question: when your business is summarized or recommended, is the underlying site and content structured so the right story can surface? Local SEO focuses on maps, local intent, and nearby trust signals; GEO readiness focuses on cross-cutting clarity and machine-legible structure — complementary, not competing.',
      },
      {
        q: 'Is this urgent today, or still early?',
        a: 'If you already rely on organic discovery, the behavior shift is visible now — not as a gimmick, but as slower, messier query paths. The work is grounded in durable structure and trust, so it still pays off even as individual products change. If you barely use organic demand today, we usually anchor this inside a broader growth or site strategy instead of treating it as a standalone obsession.',
      },
      {
        q: 'What kinds of businesses get the most from this?',
        a: 'Businesses where credibility and specificity matter — professional services, healthcare-adjacent offers, B2B with a considered purchase, and local brands that win on trust — especially when content is deep but unevenly organized. It also helps when you operate multiple brands, locations, or service lines and need a clearer entity story.',
      },
      {
        q: 'Can this tie into a wider SEO or site project?',
        a: 'Yes. The roadmap is written to connect to local SEO, website strategy, conversion work, and stack diagnostics when those are the real bottlenecks. GEO readiness rarely replaces those efforts; it tightens how your digital footprint reads as a whole.',
      },
    ],
    proof: [
      {
        label: 'Russell Painting',
        href: '/work/russell-painting',
        result:
          'Trust-led structure and local visibility work that made the business easier to find and easier to believe — the same clarity layer discoverability builds on.',
        signalLabel: 'Trust + structure',
        metric: 'Lead engine rebuilt',
      },
      {
        label: 'Pike Medical Consultants',
        href: '/work/pike-medical-consultants',
        result:
          'Multi-division healthcare growth with consistent digital infrastructure — a strong example of entity clarity, authority signals, and organized content working together.',
        signalLabel: 'Entity + growth',
        metric: '45% patient growth',
      },
    ],
    proofStats: [
      { value: '2–3 wks', label: 'typical audit-to-roadmap window, scoped by site size and stakeholder depth' },
      { value: '$1.5K–$4K', label: 'typical project range — implementation billed separately when you want hands-on build' },
      { value: '1 roadmap', label: 'prioritized discoverability fixes tied to business outcomes, not tool scores alone' },
    ],
    proofWorkSlugs: ['russell-painting', 'pike-medical-consultants'],
    serviceIds: ['geo-optimization', 'technical-seo', 'seo-content'],
    industryIds: ['healthcare', 'local-service', 'b2b', 'saas'],
    outcomeIds: ['traffic-growth', 'lead-gen', 'conversion-lift'],
    primaryCtaLabel: 'Talk through discoverability readiness',
    secondaryCtaLabel: 'See the Russell Painting build',
    secondaryCtaHref: '/work/russell-painting',
    pricingSignal: '$1.5K–$4K · Audit and roadmap; implementation scoped separately',
    relatedServiceSlugs: ['local-seo', 'website-strategy', 'martech-audit'],
    proofTools: [
      {
        labSlug: 'geo-readiness-auditor',
        eyebrow: 'Self-diagnostic',
        title: 'Run the GEO Readiness Auditor if you want a quick baseline.',
        body: 'A short, free pass on visibility-oriented checks — useful context before we prioritize what actually deserves implementation on your site.',
        externalCtaLabel: 'Open the auditor',
        externalCtaHref: 'https://darling-martech-geo-audit-tool.vercel.app/',
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
    supportImagePublicId: 'graston-website',
    supportImageAlt: 'Graston Technique marketing website showing training and shop paths',
    supportImageCaption:
      'Strategic leadership is visible in how the whole system is structured, not just in one campaign output.',
    supportImageWorkSlug: 'graston-technique',
    relatedServiceSlugs: ['website-strategy', 'crm-architecture'],
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
    eyebrow: 'Applied systems',
    title: 'Agentic Marketing Systems & Internal Workflow Leverage',
    tagline: 'Less manual drag in the places work actually happens — routing, follow-up, internal tools, and the handoffs between them.',
    summary:
      'When the same questions, approvals, and follow-ups keep landing on people because nothing in the stack closes the loop, velocity suffers and mistakes become normal. That is usually not a “motivation” problem. It is a workflow and systems problem.\n\nThis work is about applied leverage: mapping where time leaks, where handoffs break, and where a combination of automation, internal tooling, and structured AI assistance can replace brittle manual habit with something the team can actually run. It sits next to CRM architecture — CRM is the spine; this is the orchestration layer, internal surfaces, and operational logic that make marketing and sales operations easier to execute day to day. It is not a slide deck about the future of AI. It is build-ready thinking that connects to real tools, APIs, and processes already in your business.',
    deliverables: [
      'Internal workflow and friction audit — where work is repeated, where follow-up depends on memory, and where routing or reporting still lives in spreadsheets or side channels',
      'High-leverage process prioritization — which sequences to systemize first based on volume, risk, and revenue impact (not “automate everything”)',
      'Workflow and handoff logic design — triggers, ownership, exceptions, and how data should move between CRM, ops tools, and customer-facing surfaces',
      'Applied AI and internal tool direction — where assisted support, classification, drafting, or retrieval actually reduces load without creating a parallel mess of ad hoc prompts',
      'Automation and integration blueprint — what to build natively in the stack vs. what needs custom glue, webhooks, or lightweight internal apps',
      'Rollout and adoption roadmap — phased delivery, testing, training hooks, and how this connects to a MarTech audit finding or a CRM architecture pass when those came first',
    ],
    signsYouNeedIt: [
      'The same operational tasks keep eating hours — routing leads, updating records, chasing status, pulling numbers for meetings — and everyone knows it should not be that manual.',
      'Handoffs between marketing, sales, and ops depend on people remembering the next step instead of the system enforcing it.',
      'You have tools, but the workflow between them is weak: data does not arrive where the next person needs it, when they need it.',
      'Teams are experimenting with AI in the open, but there is no shared structure — outputs, safety, and ownership are inconsistent.',
      'Reporting and follow-up feel like a separate job instead of a byproduct of how the work is already done.',
      'You have already cleaned up CRM stages or run an audit, but execution still feels heavy — the “last mile” of daily work never got systemized.',
      'You want practical internal leverage — not a transformation program — and you are ready to tie it to specific processes and outcomes.',
    ],
    faqItems: [
      {
        q: 'What does “agentic marketing systems” mean in plain language?',
        a: 'It means designing and building the workflow layer — automations, internal tools, and structured AI assistance — so marketing and sales operations run with less manual repetition and clearer handoffs. The emphasis is on what the team does every week, not on buzzwords.',
      },
      {
        q: 'How is this different from CRM architecture?',
        a: 'CRM architecture is about stages, fields, lifecycle design, and trust in the system of record. Agentic systems work is about what happens around and through that spine: orchestration, internal surfaces, support automation, and the logic that removes drag from daily execution. They are complementary; many engagements touch both, but the focus here is leverage in operations, not only CRM hygiene.',
      },
      {
        q: 'Is this custom software, automation, or both?',
        a: 'Usually both over time. The engagement often starts with architecture and workflow logic inside tools you already use, then adds integrations, automations, or lightweight internal tools where the stack cannot do the job alone. Scope is driven by where the friction actually is.',
      },
      {
        q: 'Is this realistic for a small team?',
        a: 'Yes. Small teams feel this pain fastest because there is no extra bandwidth to absorb manual work. The goal is fewer fragile habits and clearer automation — not a large internal engineering org.',
      },
      {
        q: 'Can this follow a MarTech audit or CRM cleanup?',
        a: 'Often yes. Audits and CRM architecture passes surface what is broken or misaligned; this work is a natural execution path when the constraint is operational drag, internal tooling, or workflow orchestration rather than only configuration.',
      },
    ],
    proof: [
      {
        label: 'Graston Growth Engine',
        href: '/work/graston-growth-engine',
        result:
          'A production two-sided product — map-synced search, provider and admin surfaces, and AI-accelerated support — built where internal workflow and customer experience had to stay in sync.',
        signalLabel: 'Applied systems + AI support',
        metric: '$27k+ projected provider revenue',
      },
      {
        label: 'Barbershop Command Center',
        href: '/work/barbershop-command-center',
        result:
          'Owner and client sides of the business unified — booking, rules, deposits, and operational visibility in one place instead of scattered tools and memory.',
        signalLabel: 'Operations workflow',
        metric: 'Dual-sided booking OS',
      },
      {
        label: 'The Launchpad',
        href: '/work/the-launchpad',
        result:
          'Membership intake and CRM-connected lifecycle flow with zero manual enrollment steps — an example of replacing repetitive ops with a system the business can run.',
        signalLabel: 'Lifecycle automation',
        metric: '0 manual enrollment steps',
      },
    ],
    proofStats: [
      { value: '400+', label: 'production automations shipped in a single flagship stack where workflow and integrations were unified end to end' },
      { value: '48 hrs/wk', label: 'manual time reclaimed in that environment once repetitive operational load moved into systems' },
      { value: 'Production', label: 'internal tools and workflows built to run — not proofs-of-concept or one-off demos' },
    ],
    proofWorkSlugs: ['graston-growth-engine', 'barbershop-command-center', 'the-launchpad'],
    serviceIds: ['crm-automation', 'agentic-systems', 'lead-gen-workflows'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['time-saved', 'lead-gen', 'cost-reduction'],
    primaryCtaLabel: 'Start an agentic systems conversation',
    secondaryCtaLabel: 'See the Graston Growth Engine build',
    secondaryCtaHref: '/work/graston-growth-engine',
    pricingSignal: '$4K–$30K+ · Scoped by workflow depth, integration count, and build surface',
    relatedServiceSlugs: ['crm-architecture', 'custom-tools-workflow-products', 'martech-audit'],
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
    id: 'custom-tools-workflow-products',
    routePath: '/services/systems/custom-tools-workflow-products',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'Workflow products',
    title: 'Custom Tools & Workflow Products',
    tagline:
      'When the gap is a real surface — not another page in the CMS — custom tools turn messy workflows into something your team and customers can actually run.',
    summary:
      'Sometimes the business does not need more content. It needs a thing that works: a customer-facing configurator, a staff dashboard, a quoting or eligibility flow, a partner portal, or an internal app that closes the loop between marketing, sales, and operations.\n\nOff-the-shelf products force you into their model. Spreadsheets and one-off forms break under volume. A custom workflow product is scoped to your rules, your data, and how you already sell — then wired into the CRM, the site, and measurement so it is not a science project on the side.\n\nThis sits next to CRM architecture and agentic systems work: CRM is the spine, automation removes drag, and this offer is the durable interface layer — the product-shaped build buyers and staff touch every week. It is not generic app development. It is demand capture and operational clarity in a focused build.',
    deliverables: [
      'Jobs-to-be-done and scope framing — what the tool must do for customers or staff, what it must never pretend to be, and how it connects to revenue or throughput',
      'UX and data-flow design — roles, states, handoffs, and what has to sync to CRM, commerce, or ops tools',
      'Build or integration blueprint — what ships as custom surface vs what stays in the existing stack (and how they talk)',
      'Implementation direction or hands-on build — production-minded delivery, not a throwaway prototype',
      'Rollout, ownership, and training hooks — who runs it day to day and how it survives the first busy quarter',
      'Measurement and iteration tie-in — how you will know it is working and what to tighten next',
    ],
    signsYouNeedIt: [
      'You keep duct-taping the same workflow with forms, spreadsheets, and email because nothing off-the-shelf fits how you actually sell or deliver.',
      'Customers or partners need a guided flow — quote, configure, qualify, book — that a static site page cannot carry.',
      'Staff live in scattered tabs; the “source of truth” is still partly in someone’s head.',
      'You are about to buy another SaaS seat hoping it fixes a problem that is really your rules and data model.',
      'Marketing and ops agree the website is not enough, but they cannot describe the product-shaped build they need in one sentence — yet.',
      'You already improved CRM or automation, but the **visible layer** people use daily never got built.',
      'You want one accountable owner for strategy and implementation — not a dev shop that disappears after handoff.',
    ],
    faqItems: [
      {
        q: 'How is this different from a website or landing page project?',
        a: 'Websites organize trust, story, and conversion paths across many pages. A workflow product is usually narrower and deeper: specific logic, roles, and data — something people use as a tool, not just read. Many clients need both; this engagement is for when the bottleneck is the tool-shaped build.',
      },
      {
        q: 'How is this different from CRM architecture?',
        a: 'CRM architecture is about stages, fields, lifecycle design, and trust in the system of record. Custom tools often sit on top of or beside that: the screens and flows where people actually complete work or where customers self-serve. They connect tightly, but the primary value here is the shipped product surface.',
      },
      {
        q: 'How is this different from agentic marketing systems?',
        a: 'Agentic systems work emphasizes operational leverage — routing, follow-up, internal drag, structured AI assistance across processes. Custom tools can include those ideas, but the hero of this offer is a durable app-like surface (customer- or staff-facing) with clear jobs-to-be-done. If the centerpiece is mostly automation orchestration, agentic systems may be the better front door.',
      },
      {
        q: 'Do you only build in one stack?',
        a: 'No. The stack follows the business constraint: what you already run, what must integrate, and what will actually be maintained. The through-line is production discipline and marketing accountability — not a single framework fetish.',
      },
      {
        q: 'Is this only for large teams?',
        a: 'No. Small teams often feel this pain first — there is no extra bandwidth to babysit manual workarounds. A focused tool can replace fragile habit with something repeatable.',
      },
    ],
    proof: [
      {
        label: 'Graston Growth Engine',
        href: '/work/graston-growth-engine',
        result:
          'A production two-sided product — map-synced search, provider and admin surfaces, AI-accelerated support, and per-provider analytics — the kind of workflow product that only works when UX, data, and integrations are designed together.',
        signalLabel: 'Two-sided workflow product',
        metric: '$27k+ projected provider revenue',
      },
      {
        label: 'Barbershop Command Center',
        href: '/work/barbershop-command-center',
        result:
          'Owner and client sides unified — booking, rules, deposits, and operational visibility in one place instead of scattered tools and memory.',
        signalLabel: 'Operational product surface',
        metric: 'Dual-sided booking OS',
      },
    ],
    proofStats: [
      { value: 'Production', label: 'client tools and surfaces built to run — not demos parked on the side' },
      { value: 'Two-sided', label: 'customer- and operator-facing flows kept in sync where the business requires it' },
      { value: 'Stack-aware', label: 'integrations and CRM/site context treated as part of the product, not an afterthought' },
    ],
    proofWorkSlugs: ['graston-growth-engine', 'barbershop-command-center'],
    serviceIds: ['crm-automation', 'web-development', 'lead-gen-workflows'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b', 'local-service'],
    outcomeIds: ['time-saved', 'lead-gen', 'conversion-lift'],
    primaryCtaLabel: 'Start a custom tools conversation',
    secondaryCtaLabel: 'See the Graston Growth Engine build',
    secondaryCtaHref: '/work/graston-growth-engine',
    pricingSignal: '$4K–$30K+ · Scoped by surface complexity, integrations, and rollout depth',
    relatedServiceSlugs: ['crm-architecture', 'agentic-marketing-systems', 'martech-audit'],
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
    secondaryCtaLabel: 'See The Fortress case study',
    secondaryCtaHref: '/work/the-fortress',
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
    secondaryCtaHref: '/work/the-compass',
    pricingSignal: '$2K–$8K · Project-based audit and setup, optional retainer for ongoing reporting',
    relatedServiceSlugs: ['conversion-optimization', 'local-seo', 'martech-audit'],
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
    secondaryCtaLabel: 'See the Hoosier Boy build',
    secondaryCtaHref: '/work/hoosier-boy-barbershop',
    pricingSignal: '$3K–$8K · Standalone engagement or integrated into a website or campaign build',
    relatedServiceSlugs: ['website-strategy', 'fractional-cmo', 'conversion-optimization'],
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
      'Most underperforming websites are not ugly — they are structurally broken. Visitors do not understand what the business does quickly enough. Trust is weaker than it should be. The homepage and service pages feel generic or interchangeable. The problem is usually structure, message hierarchy, and conversion flow — not just visuals.\n\nI approach website projects as business-system problems: page architecture, content hierarchy, trust signals, and conversion paths all need to work together. That means diagnosing what is actually broken before recommending a refresh or a full rebuild — and making sure the resulting site is meaningfully more useful to the right visitor, not just more polished.',
    signsYouNeedIt: [
      'Your site looks fine, but it is not producing enough qualified inquiries.',
      'Visitors do not understand what you do quickly enough.',
      'Trust is weaker than it should be once people land on the site.',
      'The homepage and service pages feel generic or interchangeable.',
      'You are unsure whether the site needs a full rebuild or just a strategic refresh.',
      'The site is not supporting search, conversion, and credibility together.',
      'The business has matured, but the site still reflects an older version of it.',
    ],
    deliverables: [
      'Website strategy and page hierarchy — define what pages are needed, in what order, and what each page must do.',
      'Homepage and service-page message architecture — make the offer clearer and easier to trust.',
      'Conversion-path planning — reduce friction in inquiry, booking, quote, or purchase flows.',
      'Trust-signal design direction — structure proof, credibility, and authority where they matter most.',
      'Content and UX priorities — identify what to rewrite, remove, or simplify before design or development starts.',
      'Rebuild scope and implementation roadmap — translate strategy into a clear execution plan.',
    ],
    faqItems: [
      {
        q: 'Do I need a full rebuild or just a strategic refresh?',
        a: 'That depends on whether the issue is mostly messaging and structure or whether the site platform, layout, and user flow are all holding you back. The first step is figuring out which kind of problem you actually have.',
      },
      {
        q: 'Can this work on my current platform?',
        a: 'Sometimes yes. If the platform can still support the structure, speed, and flexibility the business needs, a strategic refresh can be enough. If not, the recommendation may be a rebuild instead.',
      },
      {
        q: 'Do you handle content and structure too, or just design direction?',
        a: 'Yes. The point of this service is to fix the structure underneath the site, not just the visuals on top of it. That usually includes messaging, hierarchy, and conversion flow — not only design opinions.',
      },
      {
        q: 'How do you measure whether a rebuild worked?',
        a: 'By looking at clearer trust, stronger action paths, and better business outcomes — more qualified inquiries, better bookings, better conversion behavior, and better clarity for the right visitor.',
      },
      {
        q: 'Is this only for large websites?',
        a: 'No. Smaller sites often have the same structural problems as bigger ones — they are just compressed into fewer pages.',
      },
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
        label: 'Tuohy Bailey & Moore',
        href: '/work/tuohy-bailey-moore',
        result: '60% more contact form submissions after a trust-led brand and website rebuild.',
        signalLabel: 'Trust-led redesign',
        metric: '60% more inquiries',
      },
      {
        label: 'Riley Bennett Egloff',
        href: '/work/riley-bennett-egloff',
        result: 'Seven-year embedded engagement spanning website, PR, and business development for a 29-attorney firm.',
        signalLabel: 'Long-term stewardship',
        metric: '7+ year engagement',
      },
    ],
    proofStats: [
      { value: '45%', label: 'patient growth at Pike Medical over 3 years — full brand architecture and digital rebuild' },
      { value: '60%', label: 'more contact form submissions at Tuohy Bailey & Moore after a trust-led redesign' },
      { value: '75%', label: 'more online bookings at PrimaryCare Indy after the redesign and UX rebuild' },
    ],
    proofWorkSlugs: ['pike-medical-consultants', 'tuohy-bailey-moore', 'riley-bennett-egloff'],
    serviceIds: ['web-development', 'conversion-design', 'brand-strategy'],
    industryIds: ['legal', 'healthcare', 'local-service', 'hospitality'],
    outcomeIds: ['conversion-lift', 'lead-gen', 'booking-growth'],
    primaryCtaLabel: 'Start a website strategy conversation',
    secondaryCtaLabel: 'See the Pike Medical rebuild',
    secondaryCtaHref: '/work/pike-medical-consultants',
    pricingSignal: '$4K–$20K · Project-based, scoped by site size and complexity',
    supportImagePublicId: 'primary-care-indy-website',
    supportImageAlt: 'PrimaryCare Indy website after rebuild — clear hierarchy and patient-focused homepage',
    supportImageCaption:
      'The issue is not only how the site looks, but how clearly it earns trust and moves the right visitor forward.',
    supportImageWorkSlug: 'pike-medical-consultants',
    relatedServiceSlugs: ['conversion-optimization', 'fractional-cmo'],
  },
  {
    id: 'crm-architecture',
    kind: 'standalone',
    layer: 'build',
    eyebrow: 'CRM Architecture',
    title: 'CRM Architecture & Marketing Systems',
    tagline: 'Having a CRM is not the same as having a system you can actually run from.',
    summary:
      'Most CRM problems are not software problems. They are architecture problems. The CRM is live, but no one fully trusts it. Pipeline stages mean different things to different people. Follow-up is too manual, reporting is hard to act on, and ownership between marketing and sales is unclear.\n\nThe underlying issue is usually structure — lifecycle design, routing logic, ownership rules, and visibility — not which platform the business is using. I design the CRM layer that connects marketing, sales, and operations so leads move reliably, follow-up happens consistently, and the business can actually see what is working.',
    signsYouNeedIt: [
      'No one fully trusts the CRM as the source of truth.',
      'Pipeline stages are inconsistent or mean different things to different people.',
      'Leads are being followed up manually or falling through the cracks.',
      'Reporting exists, but it is hard to turn it into decisions.',
      'Ownership and handoff between marketing and sales feel messy.',
      'Duplicate records, missing data, or workarounds are becoming normal.',
      'The CRM feels like software you have, not a system you can run from.',
    ],
    deliverables: [
      'CRM architecture audit — identify where the current setup breaks trust, speed, or visibility.',
      'Lifecycle and pipeline design — define stages, ownership, and movement clearly.',
      'Lead-routing and handoff rules — make follow-up more consistent and easier to run.',
      'Field and property cleanup — simplify data structure so reporting and automation become more usable.',
      'Automation logic direction — identify what should happen automatically and what still needs human judgment.',
      'Dashboard and visibility guidance — make the CRM easier to manage by, not just store data in.',
    ],
    faqItems: [
      {
        q: 'What is CRM architecture, exactly?',
        a: 'It is the structure underneath how the CRM works day to day — stages, ownership, lifecycle logic, routing, automation, and visibility. It is broader than a setup task and more practical than a generic CRM audit.',
      },
      {
        q: 'Can you work inside our current CRM?',
        a: 'Usually yes. The first question is not which CRM you use. It is whether the structure inside it is helping or hurting the business.',
      },
      {
        q: 'Do you build the workflows too, or only recommend them?',
        a: 'Both. The work can include strategy, cleanup, and implementation direction, and in many cases the workflow logic itself can be built and tested as part of the engagement.',
      },
      {
        q: 'How do I know whether this is a CRM issue or a sales-process issue?',
        a: 'Often it is both. The CRM exposes where the process is muddy, and the process exposes where the CRM structure is failing. This work is meant to fix that connection.',
      },
      {
        q: 'Is this only for large teams?',
        a: 'No. Small teams often feel the pain faster because they do not have enough people to absorb manual workarounds.',
      },
    ],
    proof: [
      {
        label: 'Graston Growth Engine',
        href: '/work/graston-growth-engine',
        result: 'Two-sided provider directory with real-time spatial search, AI-powered support, and per-provider analytics — zero manual enrollment.',
        signalLabel: 'Full-stack systems build',
        metric: '95% less manual overhead',
      },
      {
        label: 'Barbershop Command Center',
        href: '/work/barbershop-command-center',
        result: 'Booking, client history, staff scheduling, and marketing automation unified into a single operational dashboard.',
        signalLabel: 'Operations integration',
        metric: '90% more bookings',
      },
    ],
    proofStats: [
      { value: '95%', label: 'reduction in manual overhead at Graston Technique after the full CRM and automation stack' },
      { value: '400+', label: 'automations built and deployed across production marketing and sales systems' },
      { value: '48 hrs/wk', label: 'saved at Graston Technique after the automation layer was deployed' },
    ],
    proofWorkSlugs: ['graston-growth-engine', 'barbershop-command-center'],
    serviceIds: ['crm-automation', 'lead-gen-workflows', 'agentic-systems'],
    industryIds: ['healthcare', 'saas', 'ecommerce', 'b2b'],
    outcomeIds: ['time-saved', 'lead-gen', 'cost-reduction'],
    primaryCtaLabel: 'Start a CRM architecture conversation',
    secondaryCtaLabel: 'See the Graston Growth Engine build',
    secondaryCtaHref: '/work/graston-growth-engine',
    pricingSignal: '$4K–$30K+ · Scoped by stack size and integration depth',
    supportImagePublicId: 'graston-growth-engine_-_for_providers',
    supportImageAlt: 'Graston Growth Engine provider hub — map-synced search and operational structure',
    supportImageCaption: 'A CRM should be a system you can run from, not just software you happen to have.',
    supportImageWorkSlug: 'graston-growth-engine',
    relatedServiceSlugs: ['agentic-marketing-systems', 'custom-tools-workflow-products', 'fractional-cmo'],
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
    tagline: 'The business should be easier to find — and easier to trust — than it currently is.',
    summary:
      'Most local businesses are harder to find online than they should be. Not because competitors are stronger, but because the right signals are missing or the pages are too weak to earn trust once someone arrives. Rankings alone are not the goal. Visibility that produces inquiries, bookings, and credibility is.\n\nI approach local SEO as a trust and structure problem, not just a keyword problem. That means fixing the page hierarchy, the Google Business presence, the trust signals, and the conversion path — so that when the right person finds the business, they actually act.',
    signsYouNeedIt: [
      'Competitors appear more often in the searches that should be yours.',
      'Your Google Business presence is not pulling its weight.',
      'You have some visibility or traffic, but too little action from it.',
      'Service or location pages are thin, generic, or hard to trust.',
      "You are not sure which local SEO work actually matters versus what is just busywork.",
      'The business is stronger offline than it looks online.',
      'Reviews, authority signals, and page structure are not working together.',
    ],
    deliverables: [
      'Local SEO audit — identify visibility gaps, trust gaps, and page-structure issues.',
      'Service and location page direction — strengthen page clarity, local relevance, and action paths.',
      'Google Business and local-signal guidance — improve how the business is represented and trusted locally.',
      'Internal-linking and content-priority plan — support the pages that matter most first.',
      'Review and trust-signal strategy — improve the credibility layer that local buyers actually use.',
      'Measurement guidance — focus on visibility that leads to real business outcomes, not vanity rankings.',
    ],
    faqItems: [
      {
        q: 'What does local SEO actually include?',
        a: 'It usually includes Google Business visibility, service and location page structure, local trust signals, internal linking, and the content and conversion issues that stop visibility from turning into inquiries.',
      },
      {
        q: 'Is this different from technical SEO?',
        a: 'Yes. Technical SEO can be part of the work, but local SEO is more focused on how the business shows up, gets trusted, and gets chosen in the local searches that matter.',
      },
      {
        q: 'Do I need dedicated location pages?',
        a: 'Sometimes. The answer depends on how the business is structured, how the market is searched, and whether those pages would genuinely help the user — not just exist for SEO.',
      },
      {
        q: 'How long does local SEO take to improve?',
        a: 'Some trust and structure improvements can help quickly, but stronger local search performance usually builds over time as the right pages, signals, and authority reinforce each other.',
      },
      {
        q: 'Will this help if my site already gets traffic?',
        a: 'Yes, if the issue is that local visibility is underperforming or traffic is not converting well once people arrive.',
      },
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
    proofWorkSlugs: ['russell-painting', 'hoosier-boy-barbershop', 'pike-medical-consultants'],
    serviceIds: ['local-seo', 'seo-content', 'technical-seo'],
    industryIds: ['local-service', 'healthcare', 'hospitality', 'legal'],
    outcomeIds: ['traffic-growth', 'lead-gen', 'booking-growth'],
    primaryCtaLabel: 'Start a local SEO conversation',
    secondaryCtaLabel: 'See the Russell Painting build',
    secondaryCtaHref: '/work/russell-painting',
    pricingSignal: '$2K–$8K/month · Project or retainer depending on scope',
    supportImagePublicId: 'russell-painting-website-services',
    supportImageAlt: 'Russell Painting website services page — local trust and clear service structure',
    supportImageCaption: 'Local visibility only matters when it leads to trust and action, not just rankings.',
    supportImageWorkSlug: 'russell-painting',
    relatedServiceSlugs: ['website-strategy', 'conversion-optimization'],
  },
  {
    id: 'conversion-optimization',
    kind: 'standalone',
    layer: 'growth',
    eyebrow: 'Conversion Optimization',
    title: 'Conversion Optimization',
    tagline: 'The right people are already arriving. The question is why they are leaving without acting.',
    summary:
      'Most conversion problems are not traffic problems. The visits are there — but the inquiries, bookings, orders, or quote requests are not. That gap is usually friction, unclear action hierarchy, weak trust signals, or a path that asks for commitment before the visitor is ready.\n\nThe instinct is to add more traffic. The better move is to understand where the existing path is breaking, and fix that first.\n\nThis work starts with a conversion-path audit: where do visitors stall, hesitate, or disengage? From there, the focus moves to action hierarchy, form and flow design, trust architecture, and page-level priorities — the structural layer underneath whether a visitor becomes a lead, a booking, or a sale.\n\nThis is not button-color testing or experimentation theater. It is a structured look at how well the business captures the demand it already has.',
    signsYouNeedIt: [
      'Traffic is decent, but inquiries, bookings, or orders are weaker than they should be.',
      'Key pages do not make the next step obvious enough.',
      'Forms, booking flows, or checkout paths feel clunky or create unnecessary friction.',
      'Mobile conversion is noticeably weaker than desktop.',
      'You suspect the site is leaking demand after people arrive — not before.',
      'The business keeps adding more traffic before fixing the path people already use.',
      'Important pages feel busy, generic, or unfocused when they should guide action clearly.',
    ],
    deliverables: [
      'Conversion-path audit — identify where visitors stall, hesitate, or drop before acting.',
      'Action hierarchy review — clarify what each key page should persuade the visitor to do next.',
      'Form, booking, quote, or order-flow review — reduce unnecessary friction in the path to action.',
      'Trust and reassurance review — strengthen the proof and confidence signals around key decisions.',
      'Page-level priority recommendations — focus effort on the highest-leverage pages first.',
      'Implementation roadmap — turn conversion findings into specific, actionable changes.',
    ],
    faqItems: [
      {
        q: 'Do I need conversion optimization or a full redesign?',
        a: 'Sometimes you need a redesign, but often the higher-value first step is understanding where the path is breaking. This work helps separate a structural problem from a cosmetic one — so you are not rebuilding something that did not need it.',
      },
      {
        q: 'Can conversion improve without changing the whole site?',
        a: 'Yes. Many meaningful gains come from clarifying action paths, tightening trust signals, improving forms, and adjusting page hierarchy — not from rebuilding everything at once.',
      },
      {
        q: 'How do you measure whether conversion work helped?',
        a: 'By the actions that matter: better inquiry rates, bookings, orders, quote submissions, or movement through the next step. Not just surface engagement metrics like time on page.',
      },
      {
        q: 'Is this only for ecommerce?',
        a: 'No. It applies wherever the business depends on users taking a next step — lead generation, booking flows, quote requests, contact paths, and ecommerce alike.',
      },
      {
        q: 'What usually causes weak conversion?',
        a: 'Usually some combination of unclear messaging, weak trust, too much friction, poor action hierarchy, or a path that asks for commitment before the visitor is ready. It is rarely just one thing.',
      },
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
    supportImagePublicId: 'DSC_8684',
    supportImageAlt:
      '317 BBQ — photography-led digital experience with food and ordering paths surfaced up front',
    supportImageCaption: 'The goal is not more activity on the page — it is a clearer path to action.',
    supportImageWorkSlug: '317-bbq',
    relatedServiceSlugs: ['website-strategy', 'local-seo', 'crm-architecture'],
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
    secondaryCtaLabel: 'See the 317 BBQ build',
    secondaryCtaHref: '/work/317-bbq',
    pricingSignal: '$4K–$20K · Project-based, scoped by site size, complexity, and whether copy and content are included',
    relatedServiceSlugs: ['website-strategy', 'conversion-optimization', 'martech-audit'],
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
  {
    value: 'Custom Tools & Workflow Products',
    label: 'Custom Tools & Workflow Products',
  },
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
