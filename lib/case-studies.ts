export type CaseStudy = {
  slug: string
  client: string
  industry: string
  metric: string
  metricLabel: string
  tagline: string
  description: string
  status: 'ready' | 'content-needed' | 'in-progress'
  cloudinaryFolder?: string  // studio/projects/{slug} — populated when folder exists
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
    cloudinaryFolder: 'studio/projects/hoosierboy-barber-shop',
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
    cloudinaryFolder: 'studio/projects/behr-pet-essentials',
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
    cloudinaryFolder: 'studio/projects/primary-colours',
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
  // CTO / Infrastructure case studies — ported from bearcave
  {
    slug: 'the-fortress',
    client: 'The Fortress',
    industry: 'Infrastructure & Security',
    metric: '85k+',
    metricLabel: 'Threats Blocked/Mo',
    tagline: 'Hardening the edge: 85k+ threats blocked monthly, zero downtime.',
    description:
      'Cloudflare WAF deployment, DNSSEC enforcement, and Authenticated Origin Pulls that eliminated direct origin exposure and cut server CPU load by 40%.',
    status: 'ready',
    services: ['Security Architecture', 'Cloudflare WAF', 'Infrastructure', 'DevOps'],
    hero: {
      challenge:
        'A critical origin server was fully exposed to the public internet — no WAF, no DNSSEC, no authenticated origin pulls. Bot traffic consumed 60% of total request volume, degrading performance for legitimate users and creating unacceptable security risk.',
      solution:
        'Deployed Cloudflare WAF with strict rule sets calibrated to the client\'s traffic profile. Enforced DNSSEC at the registrar level. Implemented Authenticated Origin Pulls — TLS certificate pinned to Cloudflare CA so the origin refuses all non-Cloudflare traffic. Origin IP fully obscured.',
      results: [
        { value: '85k+', label: 'Malicious threats blocked per month' },
        { value: '−40%', label: 'Server CPU overhead reduction' },
        { value: '0', label: 'Downtime events post-deployment' },
        { value: '0%', label: 'Direct origin exposure remaining' },
      ],
    },
    body: {
      context:
        'The client\'s infrastructure had grown without a security layer — fast to build, but dangerously exposed. Bot traffic was spiking server costs and degrading real user experience. A single origin IP scan away from a targeted attack.',
      approach: [
        'Full infrastructure audit revealing direct origin exposure — mapped attack surface and quantified bot traffic load at 60% of total requests',
        'Deployed Cloudflare WAF with custom rule sets tuned to client\'s traffic signature, blocking volumetric and application-layer attacks at the edge',
        'Enforced DNSSEC at registrar level to eliminate DNS spoofing vectors',
        'Configured Authenticated Origin Pulls: Cloudflare CA certificate pinned to origin server, all non-proxied traffic rejected at the TCP level',
        'Set up real-time threat telemetry and automated alerts on rule trigger spikes with monthly ruleset review cadence',
      ],
      outcome:
        'Post-deployment: 85,000+ threats blocked monthly, zero downtime, and a 40% reduction in CPU overhead as bot traffic was eliminated before reaching the origin. The origin IP is now fully hidden behind Cloudflare\'s network.',
    },
  },
  {
    slug: 'the-compass',
    client: 'The Compass',
    industry: 'Infrastructure & Observability',
    metric: '99.98%',
    metricLabel: 'Uptime SLA',
    tagline: '99.98% uptime SLA across 6 brands — one pane of glass.',
    description:
      'Centralized observability stack (Datadog + AWS CloudWatch) across a multi-brand platform, with a custom anomaly scoring model that auto-resolves 94% of issues before alerts fire.',
    status: 'ready',
    services: ['Observability', 'Infrastructure', 'Automation', 'SLA Management'],
    hero: {
      challenge:
        'A multi-brand operator running six digital properties had no unified observability — no cross-service alerting, no shared SLA framework, and no predictive capacity model. Individual teams operated in silos, creating blind spots that threatened the group\'s enterprise SLA commitments.',
      solution:
        'Deployed a centralized Datadog + AWS CloudWatch observability stack across all six properties with a shared SLA dashboard. Kubernetes autoscaling rules calibrated to historical traffic patterns. A custom anomaly scoring model built to surface and resolve degradation before thresholds breach.',
      results: [
        { value: '99.98%', label: 'Uptime SLA maintained across 6 brands' },
        { value: '−62%', label: 'P95 latency reduction' },
        { value: '94%', label: 'Anomalies auto-resolved before alerts fire' },
        { value: '6', label: 'Brand properties under unified observability' },
      ],
    },
    body: {
      context:
        'Six brands, six teams, zero shared visibility. When something degraded it was discovered by users, not by ops. The architecture worked — until it didn\'t, and recovery was slow and expensive.',
      approach: [
        'Mapped monitoring blind spots across all six properties — identified three critical alert gaps responsible for untracked degradation windows',
        'Deployed Datadog agents across full infrastructure with unified tagging taxonomy; configured AWS CloudWatch cross-account dashboards',
        'Set P95 latency and error-rate SLA thresholds per brand — gave leadership a single-pane-of-glass executive dashboard',
        'Built a custom anomaly scoring model trained on 18 months of historical traffic data — predicts degradation before thresholds are breached',
        'Calibrated Kubernetes HPA rules to handle 3× traffic spikes without manual intervention',
      ],
      outcome:
        '99.98% uptime SLA achieved and maintained across all six brands. P95 latency reduced 62%. The anomaly model now predicts and auto-resolves 94% of issues before a single alert fires.',
    },
  },
  {
    slug: 'the-launchpad',
    client: 'The Launchpad',
    industry: 'Marketing Automation',
    metric: '95%',
    metricLabel: 'Overhead Reduction',
    tagline: '40+ manual hours per week → under 2. Zero-touch member lifecycle.',
    description:
      'Headless directory architecture with a LearnDash-to-FluentCRM webhook bridge that automated the full member lifecycle — enrollment, access, and CRM sequences with zero manual steps.',
    status: 'ready',
    services: ['Marketing Automation', 'Web Development', 'CRM Integration', 'Workflow Design'],
    hero: {
      challenge:
        'A growing membership platform consumed 40+ hours per week on manual directory administration — listing updates, member onboarding, and course enrollment managed entirely by hand. The operational drag was directly suppressing growth and conversion velocity.',
      solution:
        'Architected a headless directory decoupled from the CMS, with a LearnDash-to-FluentCRM webhook bridge automating the full member lifecycle. Enrollment triggers course access. Course completion triggers CRM sequences. Zero manual steps in the critical path.',
      results: [
        { value: '95%', label: 'Reduction in manual overhead' },
        { value: '2 hrs', label: 'Weekly admin time (down from 40+)' },
        { value: '+40%', label: 'Conversion lift from friction elimination' },
        { value: 'Sub-200ms', label: 'API response latency' },
      ],
    },
    body: {
      context:
        'The platform was growing but operations couldn\'t scale with it. Every new member meant manual work. Every course enrollment was a hand-off. The team was doing the work of a system.',
      approach: [
        'Mapped every manual touchpoint in the directory and enrollment workflow — identified 23 discrete manual steps consuming 40+ hours weekly',
        'Designed a headless directory with API-first data layer, completely decoupled from WordPress CMS for performance and portability',
        'Architected LearnDash → FluentCRM webhook bridge: enrollment triggers course access grant; completion triggers CRM lifecycle sequence',
        'Built idempotency keys and failure retry logic into all webhook handlers — zero data loss on network failures',
        'End-to-end automation tested across 200+ member scenarios before production launch',
      ],
      outcome:
        '95% reduction in manual overhead — from 40+ hours per week to under 2. The automated pipeline delivered a +40% conversion lift by eliminating enrollment-to-engagement friction and delay.',
    },
  },
  {
    slug: 'the-closer',
    client: 'The Closer',
    industry: 'Revenue Systems',
    metric: '0',
    metricLabel: 'Manual Invoices',
    tagline: 'Zero manual invoices. Automated payment plans. More deals closed.',
    description:
      'A Gravity Forms → WooCommerce → Stripe quote-to-order engine with ACF-driven 3–18 month payment plans that eliminated the invoicing bottleneck killing high-ticket closes.',
    status: 'ready',
    services: ['Revenue Operations', 'Stripe Integration', 'WooCommerce', 'Sales Automation'],
    hero: {
      challenge:
        'High-ticket training bundles ($2,000+) were stalling at close. Sales reps spent 30 minutes manually creating each invoice — by the time the customer received it, momentum had evaporated. No flexible payment options meant qualified buyers with budget constraints walked.',
      solution:
        'Architected a Quote-to-Order engine: Gravity Forms → WooCommerce → Stripe API → ACF custom fields. Automatic quote expiration, timed reminder emails, FluentCRM sync for pipeline visibility. ACF-driven payment plans (3–18 months) wired to automated Stripe recurring subscriptions with failure-retry logic.',
      results: [
        { value: '0', label: 'Manual invoices — fully automated' },
        { value: '3–18 mo', label: 'Flexible payment plans via Stripe' },
        { value: 'Eliminated', label: '"I\'ll think about it" closing window' },
        { value: 'Increased', label: 'Close rate on high-ticket bundles' },
      ],
    },
    body: {
      context:
        'The sales team was good. The product was good. The close rate was not. A 30-minute manual invoicing process was inserting a cooling-off window into every deal at the worst possible moment.',
      approach: [
        'Mapped the sales-to-revenue workflow and quantified the exact cost of invoice delay — confirmed the 30-minute gap was the primary close killer',
        'Architected the Quote-to-Order engine: Gravity Forms captures quote → WooCommerce auto-creates order → Stripe processes payment or sets up subscription',
        'Built ACF-driven payment plan configuration: 3, 6, 12, and 18-month terms, each wired to Stripe recurring subscription with built-in failure-retry logic',
        'Pay-by-Link email dispatched instantly at quote creation — customer chooses payment method from their inbox within minutes of the call',
        'FluentCRM sync gives sales team real-time pipeline visibility; automated reminders re-engage prospects before quote expiration',
      ],
      outcome:
        'Manual invoicing eliminated entirely. The Pay-by-Link system destroyed the cooling-off window. Automated payment plans expanded the addressable market by making $2,000+ bundles accessible through financing — close rates increased significantly.',
    },
  },
  // Content session needed — stub entries
  {
    slug: 'urgentcare-indy',
    client: 'Urgent Care Indy',
    industry: 'Healthcare',
    metric: '+35%',
    metricLabel: 'Booking Increase',
    tagline: 'Digital integration and patient growth strategy.',
    cloudinaryFolder: 'studio/projects/urgentcare-indy',
    description:
      'Ongoing fractional CMO engagement across the Pike Medical Consultants umbrella — website, digital marketing, and patient acquisition strategy.',
    status: 'content-needed',
    services: ['Fractional CMO', 'Web Development', 'Google Ads', 'Healthcare Marketing'],
  },
  {
    slug: 'primarycare-indy',
    client: 'Primary Care Indy',
    industry: 'Healthcare',
    metric: '210%',
    metricLabel: 'ROI',
    tagline: 'Unified brand system across 3+ locations.',
    cloudinaryFolder: 'studio/projects/primarycare-indy',
    description:
      'Merged PMC identity into Primary Care Indy. Digital-first patient intake strategy with Google, Healthgrades, and Zocdoc synchronization.',
    status: 'content-needed',
    services: ['Fractional CMO', 'Brand Strategy', 'Web Development', 'Healthcare Marketing'],
  },
  {
    slug: 'riley-bennett-egloff',
    client: 'Riley Bennett Egloff LLP',
    industry: 'Legal',
    metric: '7+ years',
    metricLabel: 'Engagement',
    tagline: 'Full marketing ownership for an Indianapolis law firm.',
    cloudinaryFolder: 'studio/projects/riley-bennett-egloff',
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
    cloudinaryFolder: 'studio/projects/clean-aesthetics',
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

export function getAdjacentCaseStudies(slug: string) {
  const ready = getReadyCaseStudies()
  const index = ready.findIndex((cs) => cs.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? ready[index - 1] : null,
    next: index < ready.length - 1 ? ready[index + 1] : null,
  }
}
