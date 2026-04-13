/**
 * Content for `/process` — problem/outcome spine, proof bridge, phase schematic.
 * See docs/superpowers/specs/2026-04-12-process-page-redesign-design.md
 */

export type ProcessProblemCard = {
  id: string
  problem: string
  outcome: string
  primaryHref: string
  primaryLabel: string
  proofHref?: string
  proofLabel?: string
}

export type ProcessProofLink = {
  slug: string
  label: string
  context?: string
}

export type ProcessPhaseStep = {
  number: string
  label: string
  description: string
}

export const processHero = {
  eyebrow: 'How I Work',
  headline: 'Systems, measurement, and execution — one accountable owner.',
  lead:
    'I work with teams where marketing, data, and technology have to line up: CRM and automation, ' +
    'the website, paid and organic demand, and the reporting that proves what worked. ' +
    'Healthcare, SaaS, legal, and financial services are all in bounds when the problem is real and the stakeholders are serious.',
}

export const processProblemCards: ProcessProblemCard[] = [
  {
    id: 'disconnected-stack',
    problem:
      'Your CRM, automations, and site do not talk to each other — follow-up is manual and reporting does not match reality.',
    outcome:
      'One coherent system: triggers, ownership, and metrics line up with how you actually acquire and retain customers.',
    primaryHref: '/services/agentic-marketing-systems',
    primaryLabel: 'CRM, automation & AI systems',
    proofHref: '/work/graston-technique',
    proofLabel: 'Proof: Graston Technique®',
  },
  {
    id: 'measurement-gap',
    problem:
      'Leadership cannot defend which channels, campaigns, or pages are working — attribution is fuzzy or politically unsafe.',
    outcome:
      'Decision-ready measurement: events you trust, definitions people agree on, and dashboards that survive a leadership review.',
    primaryHref: '/services/martech-audit',
    primaryLabel: 'MarTech audit & stack review',
    proofHref: '/work/the-compass',
    proofLabel: 'Proof: The Compass',
  },
  {
    id: 'site-risk',
    problem:
      'The site is slow, brittle, or scary to change — so marketing and SEO cannot move at the speed of the business.',
    outcome:
      'Performance and governance that make campaigns, content, and technical change safe to ship.',
    primaryHref: '/services/website-strategy',
    primaryLabel: 'Website strategy & rebuilds',
    proofHref: '/work/graston-technique',
    proofLabel: 'Proof: platform work',
  },
  {
    id: 'strategy-plus-build',
    problem:
      'You need senior strategy and hands-on implementation — not a deck and a hand-off to a junior bench.',
    outcome:
      'One person translating goals into scoped, buildable work — and executing the critical path directly.',
    primaryHref: '/services/fractional-cmo',
    primaryLabel: 'Fractional CMO / strategic leadership',
    proofHref: '/work/pike-medical-consultants',
    proofLabel: 'Proof: Pike Medical Consultants',
  },
  {
    id: 'regulated-trust',
    problem:
      'You operate in a regulated or high-trust industry — marketing has to pass internal review, not just look good.',
    outcome:
      'Execution that respects compliance culture: clear drafts, traceable claims, and patient collaboration with legal or clinical voices.',
    primaryHref: '/services/brand-strategy',
    primaryLabel: 'Positioning & messaging strategy',
    proofHref: '/work/riley-bennett-egloff',
    proofLabel: 'Proof: Riley Bennett Egloff LLP',
  },
  {
    id: 'ai-automation-reality',
    problem:
      '“AI” or automation is either slideware or a fragile maze of zaps that breaks when real customers show up.',
    outcome:
      'Production-grade integrations tied to real customer data, escalation paths, and operational ownership.',
    primaryHref: '/services/agentic-marketing-systems',
    primaryLabel: 'Workflow automation & AI systems',
    proofHref: '/work/graston-technique',
    proofLabel: 'Proof: automation at scale',
  },
]

export const processProofBridge: ProcessProofLink[] = [
  {
    slug: 'graston-technique',
    label: 'Graston Technique®',
    context: 'Training platform, 400+ automations, AI assistant, dashboards, performance hardening.',
  },
  {
    slug: 'pike-medical-consultants',
    label: 'Pike Medical Consultants',
    context: 'Multi-division healthcare — strategy, web, and demand under one accountable thread.',
  },
  {
    slug: '317-bbq',
    label: '317 BBQ',
    context: 'Brand, web, and conversion when the product has to sell through the screen.',
  },
  {
    slug: 'riley-bennett-egloff',
    label: 'Riley Bennett Egloff LLP',
    context: 'Seven years embedded in a complex legal marketing environment.',
  },
]

export const processPhaseIntro =
  'Every engagement still moves through these ideas — but the duration, depth, and order change with your stack, risk, and stakeholders. This is a lens, not a script.'

export const processPhaseSteps: ProcessPhaseStep[] = [
  {
    number: '01',
    label: 'Diagnose',
    description:
      'Map what is actually happening: stack, strategy, data gaps, and constraints — before anyone commits to a build.',
  },
  {
    number: '02',
    label: 'Design',
    description:
      'Define scope and sequence: positioning, architecture, funnel, or roadmap — whatever matches the diagnosis.',
  },
  {
    number: '03',
    label: 'Build',
    description:
      'Ship the scoped work directly: site, automation, CRM, analytics, content systems — without disappearing behind layers.',
  },
  {
    number: '04',
    label: 'Optimize',
    description:
      'Measure, iterate, and compound — often where embedded or retainer work creates the most leverage.',
  },
]

export const processHowWorkRuns = {
  eyebrow: 'How we actually run the work',
  headline: 'Cadence, clarity, and one throat to choke.',
  intro:
    'Most relationships start with a MarTech audit or a focused strategy conversation. From there, scope is explicit, milestones are dated, and you always know what “done” means for the current slice.',
  bullets: [
    {
      title: 'Intake and scoping call',
      body: 'A 30–45 minute call on the business, stack, and what is broken. No pitch — alignment on reality first.',
    },
    {
      title: 'Written findings or plan',
      body: 'You get prioritized recommendations and a roadmap you can implement internally, hand off, or continue with me.',
    },
    {
      title: 'Execution and checkpoints',
      body: 'If we build together, work ships against agreed milestones. Communication is async-first with scheduled deep-dives when decisions stack up.',
    },
  ],
  soloNote:
    'I lead every engagement end-to-end. When design, extra engineering capacity, or specialized help is needed, I bring in trusted contractors for defined slices — and I still own integration, quality, and continuity with your team.',
}

export const processNotCookieCutter = {
  eyebrow: 'Same discipline, different shape',
  headline: 'No two roadmaps are identical.',
  body:
    'Some clients need a six-week technical rescue. Others need a year of fractional leadership across channels. The process stays honest about sequencing and risk; the timeline and deliverable list are always negotiated from your reality — not a template.',
}

export const processToolsPhilosophy = {
  eyebrow: 'Try the thinking (optional)',
  headline: 'Tools sample how I prioritize; they are not the whole practice.',
  body:
    'The simulators and auditors on this site are lightweight ways to stress-test assumptions before you buy scope. Serious work still lives in services, scoping, and the case studies — not in a single interactive.',
  ctaHref: '/tools',
  ctaLabel: 'Browse tools',
}
