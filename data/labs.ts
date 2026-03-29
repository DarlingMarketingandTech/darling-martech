import type { IndustryTag, OutcomeTag, ServiceTag } from './taxonomy'

export interface LabDetailProps {
  slug: string
  name: string
  category: string
  year: string
  tagline: string
  metrics: { value: string; label: string }[]
  problemBody: string[]
  buildStack: { layer: string; choice: string; why: string }[]
  buildBody: string[]
  impactBody: string[]
  proofStatement: string
  ctaLine: string
  toolSrc: string
  screenshots: { src: string; alt: string; caption: string }[]
  serviceIds?: ServiceTag[]
  industryIds?: IndustryTag[]
  outcomeIds?: OutcomeTag[]
}

export const LAB_DETAIL_DATA: Record<string, LabDetailProps> = {
  'cmo-simulator': {
    slug: 'cmo-simulator',
    name: 'CMO Simulator',
    category: 'Marketing',
    year: '2025',
    tagline: 'A 10-minute interactive framework that walks you through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. The same logic I use with clients.',
    metrics: [
      { value: '~10 min', label: 'Average session time' },
      { value: 'Free', label: 'No cost, no catch' },
      { value: '15+ yrs', label: 'Of real client frameworks distilled' },
    ],
    problemBody: [
      'Most marketing conversations start in the wrong place. Teams jump straight to tactics — which channels, which ads, which content — before establishing the strategic logic that should be driving those decisions. The result is fragmented execution, wasted budget, and no clear story for what\'s working and why.',
      'CMO-level thinking is a specific skill. It\'s the ability to see budget allocation, channel strategy, KPI selection, and execution priority as an integrated system — where each decision informs the others. Most marketers never get exposure to that kind of structured decision-making unless they\'ve worked directly with a senior strategist.',
      'I built the CMO Simulator to make that framework self-serve. The same logic I use when I onboard a new client — the questions I ask, the tradeoffs I surface, the prioritization decisions — packaged as an interactive tool you can run yourself in about 10 minutes.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js App Router', why: 'Full React component control with server-side rendering for fast initial load and good SEO on the access page' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Instant deployment, preview URLs for iteration, global CDN for fast load regardless of where the user is' },
      { layer: 'State Management', choice: 'React useState + session flow', why: 'Multi-step wizard with conditional branching based on responses — React state handles the decision tree cleanly' },
      { layer: 'Access Gate', choice: 'Name + email form with Resend', why: 'Light-touch gating — not a paywall, just context capture. Resend handles email notification on each new access' },
      { layer: 'Session Persistence', choice: 'sessionStorage bypass', why: 'Returning visitors skip the gate — the tool should be frictionless after the first visit' },
    ],
    buildBody: [
      'The CMO Simulator is structured as a guided decision-making session. The user moves through a series of framing questions — about their organization\'s goals, their current marketing reality, their budget constraints, and their execution capacity — and at each step, the tool responds with the strategic logic that a CMO would apply.',
      'The experience is less "quiz" and more "thinking partner." The goal isn\'t to give you a score. It\'s to walk you through the exact sequence of questions a senior marketer asks before touching tactics. Budget before channels. Channels before content. Measurement before execution.',
      'The access gate is intentionally light. Name and email — that\'s it. No sales sequence follows. I use the data to understand who\'s engaging with the tool and to reach out personally if someone\'s situation looks like a fit for working together. The simulator does the qualifying; I do the conversation.',
    ],
    impactBody: [
      'The CMO Simulator serves two purposes. For potential clients, it demonstrates the kind of thinking they\'d get working with me — before they have to commit to a conversation. It builds credibility in a way a case study can\'t: you experience the framework instead of reading about it.',
      'For me, it\'s a qualification mechanism. Someone who takes 10 minutes to work through a CMO-level decision framework has already demonstrated the kind of strategic mindset that makes for a good client engagement. By the time they reach out, we\'re already aligned on how to think about marketing problems.',
    ],
    proofStatement: 'That the best sales tool is a demonstration of how you think — and that a free interactive framework can qualify clients better than any discovery call script.',
    ctaLine: 'Ready to think through your marketing strategy with someone who\'s done this for 15 years?',
    toolSrc: '',
    serviceIds: ['fractional-cmo', 'brand-strategy'],
    industryIds: ['b2b', 'saas'],
    outcomeIds: ['lead-gen', 'brand-awareness'],
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_Q1.png',
        alt: 'CMO Simulator — question one walkthrough',
        caption: 'The simulator walks through one decision at a time — no overwhelm, just structure.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_build_your_own_company.png',
        alt: 'CMO Simulator — build your own company step',
        caption: 'Each step builds the strategic foundation before moving to the next decision layer.',
      },
    ],
  },

  'geo-readiness-auditor': {
    slug: 'geo-readiness-auditor',
    name: 'GEO Readiness Auditor',
    category: 'Marketing',
    year: '2026',
    tagline: 'A free SMB-focused GEO audit tool that scores your site\'s AI visibility in under a minute and returns a prioritized fix roadmap you can actually execute.',
    metrics: [
      { value: '0-100', label: 'GEO readiness score' },
      { value: '60 sec', label: 'Initial audit time' },
      { value: '6 checks', label: 'AI visibility signals analyzed' },
    ],
    problemBody: [
      'Most SMB sites are still optimized for traditional search only. As AI assistants become a discovery channel, visibility depends on machine-readable structure, bot access rules, and trust signals that many teams never audit.',
      'The tooling gap is real: most GEO platforms are priced for enterprise teams, not founder-led companies. SMB operators need an answer they can run immediately without a contract, a demo call, or a monthly tool budget.',
      'I built GEO Readiness Auditor to close that gap. Enter a domain, get a score, and see exactly where AI discoverability is breaking down before those blind spots become lost pipeline.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js 15 App Router', why: 'Fast SSR/edge-friendly architecture for a public audit tool with immediate result rendering' },
      { layer: 'Language', choice: 'TypeScript', why: 'Strong types across checks, scoring, and API payloads keeps audit logic predictable as checks evolve' },
      { layer: 'Parser', choice: 'Cheerio', why: 'Reliable server-side HTML parsing for schema detection, heading hierarchy checks, and content signal extraction' },
      { layer: 'Validation', choice: 'Zod', why: 'Input and payload validation at the edge prevents malformed domain submissions from breaking the pipeline' },
      { layer: 'Email Gate', choice: 'Resend', why: 'Delivers full report capture flow and routes high-intent leads into follow-up without adding heavy CRM overhead' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Quick deploys, stable previews, and low-latency edge execution for fast audit feedback loops' },
    ],
    buildBody: [
      'The core flow is intentionally simple: submit domain, fetch and analyze page structure, score each weighted check, then return a clear pass/warn/fail breakdown with prioritized fixes. The user gets immediate value before any form gate appears.',
      'Checks are tuned for AI visibility signals that matter now: bot permissioning in robots.txt, schema coverage, heading hierarchy, FAQ/Q&A patterns, E-E-A-T trust markers, and metadata completeness. Each failed check includes an explicit remediation step, not just a red badge.',
      'The full report handoff uses an email unlock pattern. Summary results stay free to maximize usage, while the detailed roadmap capture creates a high-intent conversion point that ties directly to GEO optimization service conversations.',
    ],
    impactBody: [
      'GEO Readiness Auditor creates a direct bridge from awareness to action. A founder can diagnose AI discoverability risk in under a minute, then decide whether to execute fixes internally or engage for implementation.',
      'From a business perspective, it is a productized proof asset: the tool demonstrates technical depth in public, qualifies leads based on real site conditions, and creates a clean pathway into GEO audit and optimization engagements.',
    ],
    proofStatement: 'That AI visibility can be audited, scored, and operationalized for SMBs without enterprise tooling overhead - and that useful diagnostics are the most credible form of marketing.',
    ctaLine: 'Want the full GEO fix roadmap in your inbox and help prioritizing what to do next?',
    toolSrc: 'https://darling-martech-geo-audit-tool.vercel.app/',
    serviceIds: ['geo-optimization', 'technical-seo', 'web-development'],
    industryIds: ['b2b', 'local-service', 'saas'],
    outcomeIds: ['traffic-growth', 'lead-gen', 'conversion-lift'],
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/v1774692217/GEO_Readiness_Auditor.png',
        alt: 'GEO Readiness Auditor report preview',
        caption: 'Run a fast AI visibility audit and get a weighted GEO score with prioritized technical fixes.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/v1774692651/GEO_Readiness_Auditor_logo.png',
        alt: 'GEO Readiness Auditor branded visual',
        caption: 'Branded report surface used across the tool, lab card, and service CTA touchpoints.',
      },
    ],
  },

  'cmo-roadmap-generator': {
    slug: 'cmo-roadmap-generator',
    name: 'CMO Roadmap Generator',
    category: 'Marketing',
    year: '2026',
    tagline:
      'A guided intake that captures your goals, constraints, and budget reality — then produces a prioritized marketing roadmap you can execute or hand to a team.',
    metrics: [
      { value: 'Guided', label: 'Intake flow' },
      { value: 'Prioritized', label: 'Roadmap output' },
      { value: 'Free', label: 'Self-serve entry' },
    ],
    problemBody: [
      'Most SMB leaders know they need a clearer marketing plan, but turning goals into an ordered sequence of work is hard when you are inside the business every day.',
      'I built CMO Roadmap Generator as a structured intake: answer the same framing questions I use with clients, then walk away with a roadmap shaped around your reality — not a generic template.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js App Router', why: 'Fast, deployable lead-gen surface with a focused multi-step flow' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Global CDN and simple iteration on the intake experience' },
    ],
    buildBody: [
      'The tool walks through goals, audience, channels, constraints, and timing — then synthesizes a prioritized roadmap. It is a lightweight companion to deeper strategy work: enough to act on, and a clear path if you want help executing.',
      'Repository: github.com/DarlingMarketingandTech/CMO-Roadmap-Generator.',
    ],
    impactBody: [
      'Operators get a tangible artifact from a short session — useful for internal alignment and for deciding what to tackle first without committing to a full engagement upfront.',
    ],
    proofStatement: 'That a disciplined intake can produce a credible roadmap without a months-long strategy project.',
    ctaLine: 'Want help turning the roadmap into executed work?',
    toolSrc: 'https://cmo-roadmap-generator.vercel.app/intake',
    serviceIds: ['fractional-cmo', 'brand-strategy'],
    industryIds: ['b2b', 'saas', 'local-service'],
    outcomeIds: ['lead-gen', 'brand-awareness'],
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/v1774736805/cmo-roadmap-generator-home.png',
        alt: 'CMO Roadmap Generator — intake home',
        caption: 'Guided intake captures goals and constraints before synthesizing the roadmap.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/v1774736805/cmo-roadmap-generator-results.png',
        alt: 'CMO Roadmap Generator — roadmap results',
        caption: 'Prioritized roadmap output ready to execute or discuss with your team.',
      },
    ],
  },
};
