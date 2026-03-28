---
name: darling-martech-seo
description: >
  SEO, GEO optimization, and technical site health skill for darlingmartech.com.
  Covers Generative Engine Optimization (GEO), technical SEO implementation, schema
  markup, E-E-A-T signals, environment-driven canonical URLs, sitemap extension,
  and all immediate site fixes from the Enhanced Plan v2 (March 2026). Use this
  skill whenever: fixing SEO issues, adding schema markup, extending the sitemap,
  fixing the canonical base URL, adding FAQ schema to service pages, working on
  GEO positioning, fixing trust-breaking issues (placeholder testimonials, typos in
  datasets), implementing the env-driven site URL config, or building the GEO
  Optimization or Technical SEO service pages. Also triggers on: "fix the sitemap",
  "add schema markup", "fix the canonical URL", "add FAQ schema", "GEO optimization",
  "AI visibility", "fix the testimonial placeholder", "make the base URL
  environment-driven", "add robots.txt AI bot permissions", or any request about
  the site's search visibility, E-E-A-T, or AI discoverability.
---

# Darling MarTech — SEO & GEO Skill

GEO (Generative Engine Optimization) is a first-mover positioning opportunity — zero
Indianapolis consultants own it, and very few nationally position around it for SMBs.
This skill covers both the service positioning AND the technical implementation on
darlingmartech.com itself.

---

## 1. Immediate Fixes (Week 1 — Do Before Anything Else)

These are trust-breaking issues identified in the research. Fix before launching any
new service pages. Each one takes < 2 hours.

### Fix 1: Testimonial {buzz_word} Placeholder
**File:** `data/testimonials.ts`
**Issue:** A literal `{buzz_word}` placeholder is visible on the homepage — this kills
E-E-A-T signals and immediately undermines trust.
**Fix:** Remove the placeholder entirely, or replace with the actual word. Review all
4 testimonials for any other unresolved template variables or typos.

### Fix 2: Homepage Primary CTA
**File:** `components/sections/ContactCTA.tsx` (or wherever the primary homepage CTA lives)
**Current:** "Let's talk" (generic, low-conversion)
**Fix:** "Request a MarTech Audit" — specific, names what the buyer gets, creates a
clear expectation of what happens next.

### Fix 3: Environment-Driven Base URL
**Current:** Canonical URL is hardcoded as `darlingmartech.com` — risky on Vercel
previews, which would then be indexed with wrong canonical tags.

**Create `lib/config.ts`:**
```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
```

**Add to `.env.production`:**
```
NEXT_PUBLIC_SITE_URL=https://darlingmartech.com
```

**Update `app/layout.tsx`:**
```ts
import { SITE_URL } from '@/lib/config'
export const metadata = {
  metadataBase: new URL(SITE_URL),
  // ...
}
```

**Update `app/sitemap.ts`** and **`app/robots.ts`** to use `SITE_URL` instead of any
hardcoded domain string.

### Fix 4: Lab URLs with Spaces
Check `/public/labs/` — any static HTML tool filenames with spaces must be renamed to
kebab-case. Verify all `/lab/[slug]` routes use kebab-case slugs (they should already
based on `data/labs.ts`).

---

## 2. Sprint 1: Extend Sitemap to Cover All Routes

**File:** `app/sitemap.ts`

Currently likely only covers `/`, `/about`, `/contact`, `/work`, `/lab`, `/services`,
`/studio`. Extend to dynamically include all dynamic routes:

```ts
import { SITE_URL } from '@/lib/config'
import { LAB_DETAIL_DATA } from '@/data/labs'
import { workIndex } from '@/data/work/work-index'
import { serviceDetails } from '@/data/services'

export default function sitemap() {
  const staticRoutes = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/lab`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/studio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const workRoutes = workIndex.map(item => ({
    url: `${SITE_URL}/work/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const labRoutes = LAB_DETAIL_DATA.map(item => ({
    url: `${SITE_URL}/lab/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceRoutes = serviceDetails.map(service => ({
    url: `${SITE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [...staticRoutes, ...workRoutes, ...labRoutes, ...serviceRoutes]
}
```

As new routes are added (/solutions/*, /industries/*), add them dynamically the same way.

---

## 3. GEO Optimization — What It Is & How to Position It

**GEO (Generative Engine Optimization)** = making content visible and citable by AI
systems (ChatGPT, Claude, Gemini, Perplexity). Different from traditional SEO in
structure, not principle.

### The 5 GEO Checks (same logic as Lab 01)

| Check | What AI Models Need | How to Fix |
|-------|--------------------|----|
| Schema markup | JSON-LD structured data (LocalBusiness, Service, FAQ) | Add to every service page |
| AI bot permissions | robots.txt must allow GPTBot, ClaudeBot, PerplexityBot | Default allow unless paid content |
| Heading hierarchy | Single H1, logical H2/H3 structure | One H1 per page |
| FAQ content | Q&A format — AI models love extractable answers | 3-5 Q&A pairs per service page |
| E-E-A-T signals | Author pages, about page, citations, real credentials | Jacob's bio + case study stats |

### robots.txt for GEO (darlingmartech.com)

```
User-agent: *
Allow: /

# Allow AI training bots (good for brand visibility in AI responses)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

Sitemap: https://darlingmartech.com/sitemap.xml
```

**Note:** The current `app/robots.ts` should be updated to use `SITE_URL` for the
sitemap URL and to explicitly allow AI bots.

---

## 4. Schema Markup — Add to Every Service Page

### Minimum schema per service page

```tsx
// components/JsonLd.tsx already exists — extend it with Service schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': service.title,
  'description': service.description,
  'provider': {
    '@type': 'Person',
    'name': 'Jacob Darling',
    'url': 'https://darlingmartech.com/about',
    'jobTitle': 'Marketing Strategist & Systems Architect',
  },
  'areaServed': {
    '@type': 'City',
    'name': 'Indianapolis',
  },
  'serviceType': service.title,
}
```

### FAQ schema — add to every service page (Sprint 3)
Each service page needs 3-5 Q&A pairs. These directly feed AI citation:

```tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': service.faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
}
```

Add `faqs: { question: string; answer: string }[]` to the service data type, then
render both the visible FAQ section AND the JSON-LD schema block.

---

## 5. E-E-A-T Signals (Expertise, Experience, Authoritativeness, Trustworthiness)

What Google (and AI models) look for to validate Jacob as a legitimate authority:

| Signal | Status | Where |
|--------|--------|-------|
| Real credentials | ✅ | CLAUDE.md: Indiana University, 15+ years, 400+ automations |
| Named author on all content | 🔧 | Add `author: { name: "Jacob Darling", url: "/about" }` to all page metadata |
| Case study stats | ✅ | Live on /work pages |
| Testimonials (real, verbatim) | 🔧 | Fix {buzz_word} placeholder — see Fix 1 above |
| About page with credentials | ✅ | /about page exists |
| Contact page with real response time | ✅ | "Jacob responds within 1 business day" |
| Portfolio / work examples | ✅ | /work with 20 case studies |

**Most impactful quick win:** Add `alternates.canonical` to every page's metadata using
`SITE_URL` so Google always knows the authoritative URL.

---

## 6. Service Page FAQ Copy (GEO + Technical SEO pages)

### /services/website-ux/geo-optimization — FAQ examples

```
Q: What is GEO and how is it different from SEO?
A: SEO optimizes your site for Google's ranking algorithm. GEO (Generative Engine
Optimization) optimizes your content for AI systems like ChatGPT, Claude, and Perplexity
— so when someone asks an AI "who does CRM automation in Indianapolis?", your business
appears in the answer. The technical requirements overlap (clean structure, schema markup,
fast load times) but GEO prioritizes machine-readable Q&A content, FAQ schema, and
E-E-A-T signals that AI models use to verify authority.

Q: How do I know if my site is visible to AI?
A: Check whether AI tools like ChatGPT or Perplexity mention your business when asked
about your services in your area. A GEO audit also checks: whether your robots.txt
allows AI crawler bots, whether your content uses structured FAQ format, whether you
have proper Schema.org markup, and whether your heading hierarchy is machine-readable.
I built a free GEO Readiness Auditor at geo.darlingmartech.com that runs these checks
in 60 seconds.

Q: Who needs GEO optimization right now?
A: Any business that depends on organic search to find clients. The shift is already
happening — AI answer engines are replacing the "10 blue links" for an increasing
share of queries. Healthcare practices, law firms, and local service businesses are
most exposed because buyers use conversational AI to find these services by name.
```

---

## 7. Technical SEO Checklist for darlingmartech.com

Run these checks periodically and before launching new pages:

```
Core
[ ] All pages have unique <title> and <meta description>
[ ] metadataBase uses SITE_URL (not hardcoded)
[ ] Canonical tags on every page
[ ] sitemap.xml includes all /work/[slug], /lab/[slug], /services/[slug] routes
[ ] robots.txt allows AI bots (GPTBot, ClaudeBot, PerplexityBot)

Schema
[ ] JsonLd.tsx renders Service schema on service pages
[ ] FAQ schema on all service pages (3+ Q&A pairs each)
[ ] LocalBusiness schema on homepage
[ ] Person schema for Jacob on /about

Performance (Lighthouse)
[ ] next/image used for all images (never bare <img>)
[ ] next/font for Cabinet Grotesk + Inter
[ ] No render-blocking resources
[ ] Target: 95+ on all Lighthouse metrics

Content
[ ] No {placeholder} text anywhere in rendered HTML
[ ] All H1s are unique per page
[ ] No orphan pages (every page linked from somewhere)
[ ] Case study pages have breadcrumb schema (Work > Client Name)
```

---

## 8. GEO Positioning — Service Page Copy Direction

The GEO Optimization service page should establish Jacob as the go-to person for this
in the Indianapolis market. Key copy angles (per darling-martech-copy skill voice rules):

**Headline options:**
- "Your site is invisible to AI. Here's how to fix it." (direct, specific problem)
- "GEO Optimization for businesses that can't afford to be missing from AI answers." (outcome-first)

**Body opening (Jacob's voice):**
> "When someone asks ChatGPT 'who does the best CRM automation in Indianapolis,' your
> name should come up. Right now, it probably doesn't — not because you're not good,
> but because your site isn't structured for how AI models extract and cite information.
> That's a GEO problem. I fix it."

**Proof point:**
> "I built the GEO Readiness Auditor to show exactly how I audit client sites before
> starting this work. Run your domain through it — you'll see your score in 60 seconds."
> [Link to Lab 01]

**Service offering structure:**
1. GEO Audit ($2,500 one-time) — 60-point audit, full report, prioritized roadmap
2. GEO Implementation ($3,500–$7,500) — schema markup, content restructuring, FAQ architecture, robots.txt
3. GEO Retainer ($1,500/mo) — ongoing monitoring, new content optimization, AI mention tracking

---

## 9. Competitor GEO Positioning Gap

From the research: **zero Indianapolis consultants position as "GEO specialists."**
The national GEO agencies (Directive Consulting, CSP Agency, First Page Sage) are
enterprise-priced ($10K+/mo) and don't touch CRM or automation stacks.

Jacob's differentiation: he's the only person in the market who offers GEO + MarTech
integration — optimizing AI visibility AND connecting it to the lead system that
captures the traffic GEO generates. That's the unbundled gap.

**Tagline option:** "GEO optimization that connects directly to your CRM — so when AI
sends you a lead, your system is ready."
