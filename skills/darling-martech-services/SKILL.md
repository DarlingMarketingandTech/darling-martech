---
name: darling-martech-services
description: >
  Services architecture skill for darlingmartech.com. Governs the three-tier URL
  architecture (Services / Solutions / Industries), shared taxonomy system, service
  page data structure, and child service page builds from the Enhanced Plan v2
  (March 2026). Use this skill whenever: building a new service page, adding a
  service to data/services.ts, creating /solutions/[problem] or /industries/[vertical]
  routes, working on the shared taxonomy (data/taxonomy.ts), connecting Work case
  studies to service pages, adding net-new child services (MarTech Stack Rationalization,
  Lead Intake & Speed-to-Lead, GA4 & Server-Side Tracking, CRO Testing, Fractional CMO),
  or designing the contact form multi-step intake upgrade. Also triggers on: "add a
  service page", "build the solutions pages", "create the industries routes", "add taxonomy
  to work data", "build the martech audit page", "agentic marketing systems page",
  "build the fractional CMO service", or anything about /services/, /solutions/, /industries/.
---

# Darling MarTech — Services Architecture Skill

The services section is the primary commercial layer of the site. Every decision here
is about converting the right buyer at the right level of intent. The architecture has
three tiers because buyers search in three different ways.

---

## 1. The Three-Tier URL Architecture

```
Tier 1: /services/[slug]          — "What can this person do for me?"
Tier 2: /solutions/[problem]      — "I have this problem — who fixes it?"
Tier 3: /industries/[vertical]    — "Do they understand my world?"
```

Build these in order. Sprint 1 = service detail pages. Sprint 3 = GEO + technical SEO
service pages. Sprint 4 = solutions + industry pages.

**Current live routes:** `/services/[slug]` (6 parent pages) — already built.
**To build:** child service pages, /solutions/*, /industries/*.

---

## 2. Shared Taxonomy (Build This First — data/taxonomy.ts)

Before building new service pages, create the shared tag system. This is what makes
Work case studies auto-prove service pages.

```ts
// data/taxonomy.ts
export const SERVICE_TAGS = {
  'crm-automation':     'CRM & Automation',
  'technical-seo':      'Technical SEO',
  'geo-optimization':   'GEO Optimization',
  'conversion-design':  'Conversion Design',
  'brand-strategy':     'Brand Strategy',
  'data-analytics':     'Data & Analytics',
  'agentic-systems':    'Agentic Systems',
  'martech-audit':      'MarTech Audit',
  'the-fortress':       'The Fortress (Security)',
  'the-conductor':      'The Conductor (Data)',
  'lead-gen-workflows': 'Lead Gen Workflows',
  'email-marketing':    'Email Marketing',
  'paid-acquisition':   'Paid Acquisition',
  'seo-content':        'SEO & Content',
  'web-development':    'Web Development',
  'ecommerce':          'E-Commerce',
  'fractional-cmo':     'Fractional CMO',
} as const

export const INDUSTRY_TAGS = {
  'healthcare':   'Healthcare',
  'legal':        'Legal',
  'ecommerce':    'E-Commerce',
  'saas':         'SaaS',
  'hospitality':  'Hospitality',
  'nonprofit':    'Nonprofit',
  'local-service':'Local Service',
  'finance':      'Finance',
} as const

export const OUTCOME_TAGS = {
  'lead-gen':           'Lead Generation',
  'conversion-lift':    'Conversion Lift',
  'time-saved':         'Time Saved',
  'revenue-attribution':'Revenue Attribution',
  'retention':          'Retention',
  'brand-awareness':    'Brand Awareness',
  'cost-reduction':     'Cost Reduction',
} as const

export type ServiceTag  = keyof typeof SERVICE_TAGS
export type IndustryTag = keyof typeof INDUSTRY_TAGS
export type OutcomeTag  = keyof typeof OUTCOME_TAGS
```

**After creating taxonomy.ts:** add `serviceIds`, `industryIds`, `outcomeIds` arrays to:
- `WorkItem` in `data/work/work-index.ts` — top 5 flagships first
- `LabItem` in `data/labs.ts`

---

## 3. Net-New Child Services to Build (Sprint 1 Priority)

These are high-revenue, low-competition services identified in the research. Build as
child pages under existing parent routes.

### `/services/martech-audit` (standalone — highest revenue priority)
- **Angle:** Audit firms identify problems but don't fix them. You audit, consolidate, and rebuild in one engagement.
- **Proof language:** "I've seen stacks where 40% of tools are redundant, overlapping, or actively breaking attribution."
- **Entry offer:** $2K audit → $10K rationalization build
- **Proof tool:** Lab 03 (MarTech Stack Auditor)
- **serviceIds:** `['martech-audit', 'crm-automation']`

### `/services/automation-crm/agentic-marketing-systems`
- **Angle:** Zero national competitors own this category. First-mover advantage.
- **Proof language:** "AI agents that monitor your campaigns and tell you what to do next — without hiring an analyst."
- **Proof tool:** Lab 05 (Agentic Marketing Monitor)
- **serviceIds:** `['agentic-systems', 'crm-automation']`

### `/services/automation-crm/lead-intake-speed-to-lead`
- **Angle:** 5-minute response window is the difference between 40% and 70% close rates.
- **Proof:** Graston lead-to-demo conversion +38%
- **serviceIds:** `['lead-gen-workflows', 'crm-automation']`

### `/services/data-analytics/ga4-server-side-tracking`
- **Angle:** 68.6% of orgs have deployed AI tools but lack data infrastructure to use them.
- **Proof language:** "I've audited stacks where 40% of conversion events were misfiring."
- **serviceIds:** `['data-analytics', 'technical-seo']`

### `/services/website-ux/conversion-rate-optimization`
- **Angle:** Fastest "prove value" engagement. 30-day CRO Sprint.
- **Proof:** +40% checkout conversions (Behr Pet)
- **Entry offer:** "CRO Sprint — 30 days, guaranteed finding or refund"
- **serviceIds:** `['conversion-design', 'data-analytics']`

### `/services/growth-strategy/fractional-cmo`
- **Angle:** Fractional CMOs usually don't get technical. Jacob does both.
- **Proof:** Graston (48hrs/week saved, +212% leads) — that's fractional-level embedded work.
- **serviceIds:** `['fractional-cmo', 'crm-automation', 'agentic-systems']`

### `/services/systems-infrastructure/the-fortress`
- **Angle:** Named proprietary framework with measurable proof.
- **Proof tool:** Lab 07 (Fortress Security Scanner)
- **serviceIds:** `['the-fortress', 'martech-audit']`

### `/services/data-analytics/the-conductor`
- **Angle:** "Decision-grade data" — the standard every engagement delivers.
- **Proof tool:** Lab 08 (ROI Dashboard), Lab 02 (Attribution Engine)
- **serviceIds:** `['the-conductor', 'data-analytics', 'revenue-attribution']`

---

## 4. Service Page Data Structure (data/services.ts additions)

When adding a new child service, the data shape is:

```ts
interface ServiceDetail {
  id: string                    // kebab-case slug
  title: string
  parentId: string              // references parent service category
  layer: 'strategy' | 'build' | 'growth'
  tagline: string               // Instrument Serif italic moment on the page
  description: string           // Lead with outcome, not tool
  deliverables: string[]        // 4-6 concrete items
  proofStats: {                 // Real numbers from case studies
    value: string               // "40%" or "212%" — the number in Electric Orange
    label: string               // "avg conversion lift"
  }[]
  proofWork: string[]           // slugs from work-index.ts with serviceIds match
  proofTools?: {                // Lab tools that demonstrate this service
    name: string
    description: string
    url: string
    labSlug: string
  }[]
  cta: {
    primary: string             // "Book a MarTech Audit"
    secondary?: string          // "See the Work →"
  }
  sceneTarget?: string          // for ServicesAmbient 3D scene
  serviceIds: ServiceTag[]      // for taxonomy cross-referencing
  industryIds?: IndustryTag[]   // which industries this serves
}
```

---

## 5. Solutions Pages (/solutions/[problem])

Build these in Sprint 4. They capture pain-language search intent.

```ts
// data/solutions.ts
const SOLUTIONS = [
  {
    slug: 'leads-not-converting',
    headline: 'Leads are coming in. None of them are turning into clients.',
    services: ['conversion-design', 'crm-automation', 'martech-audit'],
    caseStudy: 'graston-technique',
  },
  {
    slug: 'crm-is-a-mess',
    headline: 'Your CRM is a graveyard. Data in, insights never out.',
    services: ['crm-automation', 'martech-audit'],
    caseStudy: 'graston-technique',
  },
  {
    slug: 'marketing-attribution-broken',
    headline: 'You're spending money on ads but can't prove what's working.',
    services: ['data-analytics', 'the-conductor'],
    caseStudy: 'primarycare-indy',
  },
  {
    slug: 'website-not-ranking',
    headline: 'Your site exists but Google — and now AI — can't find it.',
    services: ['technical-seo', 'geo-optimization'],
    caseStudy: 'hoosier-boy-barbershop',
  },
  {
    slug: 'no-time-to-market',
    headline: 'You're the marketer. You're also the CEO, sales rep, and accountant.',
    services: ['agentic-systems', 'crm-automation', 'fractional-cmo'],
    caseStudy: 'pike-medical-consultants',
  },
  {
    slug: 'agency-burned-us',
    headline: 'Six months and $40k later, you have a new logo and zero new clients.',
    services: ['martech-audit', 'fractional-cmo'],
    caseStudy: 'riley-bennett-egloff',
  },
]
```

Solution page layout:
1. **Big headline** — Jacob's voice, direct ("You're not alone. This is the most common thing I see.")
2. **The real cause** — 2-3 sentences diagnosing the pattern
3. **The fix** — which services address it, linked
4. **Proof** — one case study result that directly answers this problem
5. **CTA** — "I've fixed this before. Let's talk."

---

## 6. Industry Pages (/industries/[vertical])

Build these in Sprint 4. Priority order: healthcare → ecommerce → legal → hospitality → saas.

```ts
// data/industries.ts
const INDUSTRIES = [
  {
    slug: 'healthcare',
    headline: 'Healthcare marketing that navigates HIPAA — and actually drives patients.',
    proofWork: ['graston-technique', 'pike-medical-consultants', 'primarycare-indy', 'urgentcare-indy'],
    keyStats: [
      { value: '212%', label: 'qualified leads (Graston Technique)' },
      { value: '45%', label: 'patient growth (Pike Medical, 3 years)' },
    ],
    positioningNote: 'HIPAA-aware stack positioning. No guesswork on compliance.',
  },
  {
    slug: 'legal',
    headline: 'Law firm marketing built around intake speed and referral tracking.',
    proofWork: ['riley-bennett-egloff', 'tuohy-bailey-moore', 'black-letter'],
    keyStats: [
      { value: '7+', label: 'year engagement (Riley Bennett Egloff)' },
      { value: '60%', label: 'more form submissions (Tuohy Bailey & Moore)' },
    ],
  },
  {
    slug: 'ecommerce',
    headline: 'E-commerce systems that recover revenue, reduce support, and convert.',
    proofWork: ['behr-pet-essentials', 'hoosier-boy-barbershop', 'circle-city-kicks'],
    keyStats: [
      { value: '3×', label: 'conversion rate (Behr Pet Essentials)' },
      { value: '90%', label: 'more bookings (Hoosier Boy Barbershop)' },
    ],
  },
  // ... hospitality, saas, etc.
]
```

Industry page layout:
1. **Headline + proof stat strip** — the numbers that matter for this vertical
2. **What makes this vertical different** — 2 sentences on the specific constraints
3. **Services most relevant** — linked service cards filtered by industryId
4. **Case studies from this vertical** — pulled automatically via industryIds tag match
5. **CTA** — "I've built systems in this space. Let's talk about yours."

---

## 7. Homepage CTA Fix (Week 1 — Do First)

The research flags the current "Let's talk" CTA as low-conversion. Change to a specific,
actionable CTA that names the thing the buyer gets:

```
Current: "Let's talk"
Fix:     "Request a MarTech Audit"
```

Alternative options (by section context):
- Hero CTA: "Request a MarTech Audit" or "Book a Systems Map Call"
- Services section: "Talk Strategy"
- Work section: "See the Work"
- Contact page: "Send It" (form submit — keep this one)

---

## 8. Contact Form Upgrade (Sprint 2)

Current form is a single text box — low conversion for high-intent buyers. Upgrade to
multi-step guided intake:

**Step 1:** What do you need?
- [ ] MarTech Audit & Cleanup
- [ ] Website / Landing Page
- [ ] CRM Setup or Automation
- [ ] SEO / GEO Optimization
- [ ] Data & Analytics
- [ ] Something else

**Step 2:** What's your timeline?
- [ ] ASAP (next 2-4 weeks)
- [ ] Planning ahead (1-3 months)
- [ ] Just exploring

**Step 3:** Rough budget range?
- [ ] Under $5,000
- [ ] $5,000–$15,000
- [ ] $15,000+
- [ ] Prefer to discuss

**Step 4:** Tell Jacob about your situation (open text)

**Step 5:** Confirmation + next steps ("Jacob will follow up within 1 business day.")

This step data should be tagged in Resend (and eventually CRM). Each form submission
email to Jacob includes the service category + timeline + budget tags.

---

## 9. Work Grid: Filter by Service (Sprint 2)

Add `serviceIds` to `workIndex` entries (top 5 flagship case studies first):

```ts
// data/work/work-index.ts additions
{
  slug: 'graston-technique',
  // ...existing fields...
  serviceIds: ['crm-automation', 'agentic-systems', 'data-analytics', 'the-conductor'] as ServiceTag[],
  industryIds: ['healthcare', 'saas'] as IndustryTag[],
  outcomeIds: ['lead-gen', 'time-saved', 'conversion-lift'] as OutcomeTag[],
}
```

Then add "Filter by service" mode to `/work` index — a horizontal filter strip above the
grid. Clicking a service tag filters visible case studies. This makes the `/work` page
a conversion tool for each service, not just a portfolio.

---

## 10. Canonical Service URL Map

```
/services/strategy              — Fractional Marketing Leadership & Growth Strategy
/services/strategy/fractional-cmo         — Fractional CMO (new)
/services/brand-web             — Brand Identity, Websites & Conversion Design
/services/brand-web/conversion-rate-optimization — CRO Testing (new)
/services/systems               — CRM Architecture, Automation, Integrations & AI Tools
/services/systems/agentic-marketing-systems — Agentic Marketing (new)
/services/systems/lead-intake-speed-to-lead — Lead Intake (new)
/services/systems/the-fortress  — The Fortress Security (new)
/services/growth                — SEO, Content Systems, Paid Acquisition & Analytics
/services/growth/geo-optimization — GEO Optimization (new)
/services/growth/technical-seo  — Technical SEO (new)
/services/growth/ga4-server-side-tracking — GA4 & Server-Side (new)
/services/commerce              — E-Commerce, Checkout Flows & Revenue Operations
/services/specialized           — Industry-Specific Engagements
/services/martech-audit         — MarTech Audit (standalone — no parent, high-priority)
/services/data-analytics/the-conductor — The Conductor (new)
```
