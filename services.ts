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
  sceneTarget: string
}

export type ServiceDetail = {
  id: string
  layer: ServiceLayer
  sceneTarget: string
  eyebrow: string
  title: string
  summary: string
  deliverables: string[]
  proof: ServiceProof[]
}

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

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'strategy',
    layer: 'strategy',
    sceneTarget: 'strategy-core',
    eyebrow: 'Strategy',
    title: 'Fractional Marketing Leadership & Growth Strategy',
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
  },
  {
    id: 'brand-web',
    layer: 'build',
    sceneTarget: 'build-brand-web',
    eyebrow: 'Brand & Experience',
    title: 'Brand Identity, Websites & Conversion Design',
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
  },
  {
    id: 'systems',
    layer: 'build',
    sceneTarget: 'build-systems',
    eyebrow: 'Systems',
    title: 'CRM Architecture, Automation, Integrations & AI Tools',
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
  },
  {
    id: 'growth',
    layer: 'growth',
    sceneTarget: 'growth-core',
    eyebrow: 'Demand Generation',
    title: 'SEO, Content Systems, Paid Acquisition & Analytics',
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
  },
  {
    id: 'commerce',
    layer: 'build',
    sceneTarget: 'build-commerce',
    eyebrow: 'Revenue Systems',
    title: 'E-Commerce, Checkout Flows & Revenue Operations',
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
  },
  {
    id: 'specialized',
    layer: 'build',
    sceneTarget: 'build-specialized',
    eyebrow: 'Specialized Builds',
    title: 'Industry-Specific Systems & Specialty Engagements',
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
  },
]

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
  { value: 'Fractional Marketing Leadership & Strategy', label: 'Fractional Marketing Leadership & Strategy' },
  { value: 'Brand Identity, Website & Conversion Design', label: 'Brand Identity, Website & Conversion Design' },
  { value: 'CRM, Automation, Integrations & AI Tools', label: 'CRM, Automation, Integrations & AI Tools' },
  { value: 'SEO, Content, Paid Acquisition & Analytics', label: 'SEO, Content, Paid Acquisition & Analytics' },
  { value: 'E-Commerce & Revenue Systems', label: 'E-Commerce & Revenue Systems' },
  { value: 'Specialized or Industry-Specific Engagement', label: 'Specialized or Industry-Specific Engagement' },
  { value: "Not sure yet — let's talk", label: "Not sure yet — let's talk" },
]
