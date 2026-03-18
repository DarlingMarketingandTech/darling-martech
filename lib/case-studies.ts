export type CaseStudy = {
  slug: string
  client: string
  industry: string
  metric: string
  metricLabel: string
  tagline: string
  description: string
  status: 'ready' | 'content-needed' | 'in-progress'
  // Full case study content (for ready ones)
  hero?: {
    challenge: string
    solution: string
    results: { label: string; value: string }[]
  }
  body?: {
    context: string
    approach: string[]
    outcome: string
  }
  services?: string[]
  url?: string // live site URL if applicable
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hoosier-boy-barbershop',
    client: 'Hoosier Boy Barbershop',
    industry: 'Local Retail',
    metric: '4.1×',
    metricLabel: 'Booking Lift',
    tagline: '100% local brand recall. Zero paid media at launch.',
    description:
      'Full brand identity system, Americana iconography, and environmental design for an Indianapolis barbershop — built to own the neighborhood before spending a dollar on ads.',
    status: 'ready',
    services: ['Brand Identity', 'Marketing Strategy', 'Environmental Design', 'Digital Marketing'],
    url: 'https://hoosierboybarbershop.com',
    hero: {
      challenge:
        'A new barbershop entering a crowded local market with no brand recognition, no marketing budget, and no existing customer base. The goal: build something locals would remember, recommend, and return to.',
      solution:
        'Built a complete brand identity rooted in Indiana heritage — Americana iconography, hand-lettered wordmarks, a color system that felt timeless, and environmental design that made the shop itself a destination. Everything rolled out organically through local community channels before a dollar was spent on advertising.',
      results: [
        { value: '4.1×', label: 'Booking lift within first 90 days' },
        { value: '100%', label: 'Unaided local brand recall in target area' },
        { value: '$0', label: 'Paid media spend at launch' },
        { value: '5★', label: 'Average review rating at 6 months' },
      ],
    },
    body: {
      context:
        'Hoosier Boy Barbershop opened in Indianapolis with a clear vision: be the neighborhood barbershop people are proud to call their own. What they needed was a brand that matched that ambition — something built to last, not just to launch.',
      approach: [
        'Developed full visual identity: logotype, secondary marks, color palette, and typography system rooted in classic Americana craftsmanship',
        'Designed environmental graphics — window signage, interior wall treatments, and merchandising elements — that made the physical space reinforce the brand',
        'Built a lean digital presence: Google Business profile, social templates, and a booking funnel designed for zero-friction conversion',
        'Established community-first marketing strategy: local partnerships, neighborhood outreach, and word-of-mouth systems before any paid activation',
        'Created a brand standards guide so the team could maintain consistency independently',
      ],
      outcome:
        'Within the first 90 days, bookings increased 4.1× over initial projections — with no paid media. The shop became a local landmark, with customers actively recommending it by name. The brand identity system remains in use today, unchanged from the original design.',
    },
  },
  {
    slug: 'behr-pet-essentials',
    client: 'Behr Pet Essentials',
    industry: 'E-Commerce',
    metric: '+28%',
    metricLabel: 'Avg Cart Value',
    tagline: '3× info-to-purchase conversion. 40% fewer support tickets.',
    description:
      'Infographic-first content architecture and a direct-response campaign system that turned a cluttered product catalog into a clean, conversion-optimized buying experience.',
    status: 'ready',
    services: ['Content Strategy', 'Conversion Optimization', 'Campaign Design', 'E-Commerce'],
    hero: {
      challenge:
        'An established e-commerce pet brand with strong product quality but a content problem: confusing product pages, high support volume driven by pre-purchase questions, and a customer journey that was leaking conversions at every step.',
      solution:
        'Redesigned the content architecture around infographics and visual decision-making tools — letting the product answer customer questions before they needed to ask. Paired with a direct-response campaign system that matched message to intent at each funnel stage.',
      results: [
        { value: '+28%', label: 'Average cart value' },
        { value: '−40%', label: 'Support ticket volume' },
        { value: '3×', label: 'Info-to-purchase conversion rate' },
        { value: '+22%', label: 'Email campaign click-through rate' },
      ],
    },
    body: {
      context:
        'Behr Pet Essentials had a loyal customer base and genuinely good products. The issue wasn\'t quality — it was clarity. Customers were abandoning carts because they couldn\'t find the answers they needed fast enough. Support was fielding the same questions repeatedly. The brand was leaving revenue on the table.',
      approach: [
        'Audited the full customer journey — from ad click to post-purchase — and mapped every friction point and question customers were asking support',
        'Rebuilt product page content around infographic-first architecture: size charts, ingredient breakdowns, comparison guides, and visual FAQs embedded directly in the buying flow',
        'Developed a direct-response email campaign system segmented by purchase history and browsing behavior, with messaging matched to where each customer was in their decision',
        'Created a content library of evergreen educational assets that reduced pre-purchase confusion and positioned the brand as a trusted authority',
        'Implemented tracking and reporting dashboards to measure content performance at the SKU level',
      ],
      outcome:
        'Average cart value increased 28%, driven by higher-confidence purchasing decisions and more effective cross-sell placement. Support ticket volume dropped 40% as content answered questions before customers needed to ask. The info-to-purchase conversion rate tripled.',
    },
  },
  {
    slug: 'primary-colours',
    client: 'Primary Colours',
    industry: 'Nonprofit',
    metric: '$46k+',
    metricLabel: 'Revenue Generated',
    tagline: 'Arts nonprofit fundraising through strategic event marketing.',
    description:
      'Event marketing strategy, corporate sponsorship development, and community fundraising for an arts nonprofit — turning a single annual event into a $46k+ revenue driver.',
    status: 'ready',
    services: ['Event Marketing', 'Sponsorship Development', 'Nonprofit Strategy', 'Brand'],
    hero: {
      challenge:
        'A small arts nonprofit with an important community mission and a tight budget. The annual fundraising event was underperforming — low sponsorship revenue, limited reach, and an audience that wasn\'t growing. They needed a strategy that punched well above their weight class.',
      solution:
        'Restructured the event marketing from the ground up: corporate sponsorship tiers, community outreach strategy, digital promotion, and an event experience designed to convert first-time attendees into long-term supporters.',
      results: [
        { value: '$46k+', label: 'Revenue generated from single event cycle' },
        { value: '3×', label: 'Corporate sponsorship growth' },
        { value: '60%', label: 'Increase in event attendance' },
        { value: '85%', label: 'Sponsor renewal rate year-over-year' },
      ],
    },
    body: {
      context:
        'Primary Colours is an Indianapolis arts nonprofit that believes creative education changes lives. Their annual event is their primary fundraising vehicle — but it wasn\'t working hard enough. Sponsorships were transactional, attendance was flat, and the event wasn\'t building the kind of community relationships that drive year-over-year growth.',
      approach: [
        'Developed a tiered corporate sponsorship program with clear value propositions, recognition levels, and year-round engagement opportunities that made sponsorship feel like a partnership, not a donation',
        'Built a multi-channel event promotion strategy: email sequences, social content calendar, community partnerships, and local media outreach',
        'Redesigned the event experience to create shareable, memorable moments — increasing organic social reach and word-of-mouth',
        'Created sponsor stewardship materials: impact reports, recognition assets, and renewal communications that made renewal a natural next step',
        'Established a donor CRM workflow to track relationships, follow up post-event, and build year-round engagement',
      ],
      outcome:
        'The event generated $46k+ in total revenue — a significant increase over prior years. Corporate sponsorships tripled, with an 85% renewal rate the following cycle. Attendance grew 60%. The framework built during this engagement continues to drive the organization\'s annual fundraising strategy.',
    },
  },
  {
    slug: 'russell-painting',
    client: 'Russell Painting Co.',
    industry: 'Local Service',
    metric: '4.9★',
    metricLabel: 'Review Sentiment',
    tagline: 'Heritage brand strategy and local SEO for a legacy painting company.',
    description:
      'Local SEO, lead generation systems, and a brand refresh that honored a decades-long legacy while building the digital infrastructure to compete in a modern market.',
    status: 'ready',
    services: ['Local SEO', 'Brand Strategy', 'Lead Generation', 'Digital Marketing'],
    url: 'https://russellpaintingcompany.com',
    hero: {
      challenge:
        'A family-owned painting company with decades of quality work and a strong local reputation — but almost no digital presence. New competitors with aggressive SEO and online review strategies were winning jobs that should have been Russell\'s.',
      solution:
        'Built the digital infrastructure from the ground up: Google Business optimization, local SEO strategy, a lead generation system, and a brand refresh that translated their heritage reputation into something that worked online.',
      results: [
        { value: '4.9★', label: 'Average Google review rating' },
        { value: 'Top 3', label: 'Local pack ranking for primary keywords' },
        { value: '+65%', label: 'Qualified lead volume year-over-year' },
        { value: '40+', label: 'New verified Google reviews in 90 days' },
      ],
    },
    body: {
      context:
        'Russell Painting Co. had built their reputation the old way — exceptional work, word of mouth, and repeat customers. That foundation was real. But in a market where homeowners Google before they call, an absent digital presence meant losing jobs to competitors who were often less qualified.',
      approach: [
        'Audited and rebuilt the Google Business profile — photos, service categories, Q&A, and a review generation system that made it easy for satisfied customers to leave feedback',
        'Developed a local SEO strategy targeting high-intent keywords by neighborhood and service type, with optimized landing pages for each service area',
        'Built a simple lead generation system: contact form with job-type qualification, automated follow-up sequence, and quote request workflow',
        'Refreshed brand materials — logo, truck signage, yard sign templates, and digital assets — that made the company look as professional as their work',
        'Created a reputation management workflow: post-job review request process and response templates for maintaining a 5-star presence',
      ],
      outcome:
        'Within 90 days, Russell Painting generated 40+ new Google reviews with a 4.9★ average — making them the top-rated painting company in their service area. Qualified lead volume increased 65% year-over-year. They now rank in the local pack for their primary service keywords.',
    },
  },
  // Content session needed — stub entries
  {
    slug: 'urgent-care-indy',
    client: 'Urgent Care Indy',
    industry: 'Healthcare',
    metric: '+35%',
    metricLabel: 'Booking Increase',
    tagline: 'Digital integration and patient growth strategy.',
    description:
      'Ongoing fractional CMO engagement across the Pike Medical Consultants umbrella — website, digital marketing, and patient acquisition strategy.',
    status: 'content-needed',
    services: ['Fractional CMO', 'Web Development', 'Google Ads', 'Healthcare Marketing'],
  },
  {
    slug: 'primary-care-indy',
    client: 'Primary Care Indy',
    industry: 'Healthcare',
    metric: '210%',
    metricLabel: 'ROI',
    tagline: 'Unified brand system across 3+ locations.',
    description:
      'Merged PMC identity into Primary Care Indy. Digital-first patient intake strategy with Google, Healthgrades, and Zocdoc synchronization.',
    status: 'content-needed',
    services: ['Fractional CMO', 'Brand Strategy', 'Web Development', 'Healthcare Marketing'],
  },
  {
    slug: 'rbe-law',
    client: 'Riley Bennett Egloff LLP',
    industry: 'Legal',
    metric: '7+ years',
    metricLabel: 'Engagement',
    tagline: 'Full marketing ownership for an Indianapolis law firm.',
    description:
      'Comprehensive marketing strategy for one of Indianapolis\'s established law firms — website, SEO, PR, email, social, business development.',
    status: 'content-needed',
    services: ['Marketing Strategy', 'Web Development', 'SEO', 'PR & Communications'],
    url: 'https://rbelaw.com',
  },
  {
    slug: 'clean-aesthetic',
    client: 'Clean Aesthetic',
    industry: 'Medical Aesthetics',
    metric: '4 weeks',
    metricLabel: 'Brand Launch',
    tagline: 'Concierge luxury brand identity and launch strategy.',
    description:
      'Full brand identity and go-to-market strategy for a medical aesthetics practice — from naming and visual identity through digital launch.',
    status: 'content-needed',
    services: ['Brand Identity', 'Launch Strategy', 'Digital Marketing', 'Content'],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getReadyCaseStudies() {
  return caseStudies.filter((cs) => cs.status === 'ready')
}

export function getAllCaseStudies() {
  return caseStudies
}
