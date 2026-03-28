---
name: darling-martech-labs
description: >
  Lab project planning and build skill for darlingmartech.com. Governs all new Lab
  tool development — the 8 planned GitHub repos + Vercel deployments from the
  Enhanced Services & Labs Plan v2 (March 2026). Use this skill whenever: building
  a new Lab project, adding a lab entry to data/labs.ts, connecting a lab to a
  service page, designing the lab detail page on the main site, scaffolding a new
  GitHub repo for a lab tool, or working on any of the 8 planned labs (GEO Auditor,
  SMB Attribution Engine, MarTech Stack Auditor, Lead Scorer, Agentic Marketing Monitor,
  CMO Roadmap Generator, Fortress Scanner, Marketing ROI Dashboard). Also triggers on:
  "build the lab tool", "add a new lab", "create the geo auditor", "scaffold the
  attribution engine", "link the lab to the service page", or any request about
  standalone demo tools for darlingmartech.com.
---

# Darling MarTech — Lab Build Skill

Each Lab is a **standalone GitHub repo + Vercel deployment** that serves two purposes:
(1) a free tool for potential clients, and (2) live proof for a service page that has
no case study yet. Every lab must have a clear lead-capture moment and a direct CTA to
the relevant service page.

---

## 1. The 8 Planned Labs (Priority Order)

| # | Name | Subdomain | Priority | Services It Proves |
|---|------|-----------|----------|--------------------|
| 01 | GEO Readiness Auditor | geo.darlingmartech.com | P1 | GEO Optimization, Technical SEO |
| 02 | SMB Attribution Engine | attribution.darlingmartech.com | P1 | Data & Analytics, The Conductor |
| 03 | MarTech Stack Auditor | stackaudit.darlingmartech.com | P2 | MarTech Audit, Systems & Infrastructure |
| 04 | No-Code Lead Scorer | leads.darlingmartech.com | P2 | Automation & CRM, Lead Gen Workflows |
| 05 | Agentic Marketing Monitor | agent.darlingmartech.com | P1 | Agentic Marketing Systems, CRM Automation |
| 06 | CMO Roadmap Generator | roadmap.darlingmartech.com | P2 | Fractional CMO, Growth Strategy |
| 07 | Fortress Security Scanner | fortress.darlingmartech.com | P3 | The Fortress, Systems & Infrastructure |
| 08 | Marketing ROI Dashboard | roi.darlingmartech.com | P3 | Data & Analytics, The Conductor |

---

## 2. Standard Lab Repo Structure

Every lab repo follows this pattern:

```
[lab-slug]/
├── app/
│   ├── page.tsx              # Landing: hero + input form
│   ├── api/
│   │   ├── [action]/route.ts # Main logic endpoint
│   │   └── capture/route.ts  # Email gate — Resend delivery
│   ├── results/page.tsx      # Score/output display
│   └── layout.tsx
├── lib/
│   ├── [core-logic].ts       # All processing logic here
│   └── scoring.ts            # Weighted scoring (if applicable)
├── components/
│   ├── InputForm.tsx
│   ├── ResultDisplay.tsx
│   └── EmailGate.tsx         # Email gate before full report
├── data/                     # Static data (tool lists, rules, etc.)
└── package.json
```

---

## 3. Lead Capture Pattern (Required on Every Lab)

Every lab MUST gate the full report behind email capture:

```
Free: Show summary score / teaser results (3-4 items)
Gate: EmailGate component — name + email via Resend
Full: Unlock detailed report + prioritized fix roadmap
CTA:  "Want us to fix this?" → /services/[relevant-slug]
```

The CTA copy must be specific to the service, not generic. Examples:
- GEO Auditor → "I'll build your GEO roadmap. Start with a free audit call."
- MarTech Auditor → "I've cleaned up stacks like this. Book a MarTech Audit."
- Lead Scorer → "Ready to put this in your actual CRM? Let's map it."

---

## 4. Tech Stack Defaults (All Labs)

```
Next.js 15 (App Router, TypeScript)
Zod — all input validation
Resend — email gate delivery
Vercel Edge Functions — fast execution, no cold starts
```

Additional per lab type:
- **Audit tools** (GEO, Fortress, Stack): `cheerio` for HTML parsing, `fetch` for header inspection
- **Data tools** (Attribution, ROI): `recharts` for charts, `papaparse` for CSV import
- **AI tools** (Agentic Monitor, CMO Roadmap): Anthropic SDK via AI Gateway (`anthropic/claude-sonnet-4-6`)
- **Scoring tools** (Lead Scorer, Stack Auditor): `papaparse`, `recharts`

**Important:** Lab 05 (Agentic Monitor) and Lab 06 (CMO Roadmap) use the Vercel AI Gateway pattern — `model: 'anthropic/claude-sonnet-4-6'` — not direct `ANTHROPIC_API_KEY`. Run `vercel link` + `vercel env pull` before local dev.

---

## 5. Adding a Lab to the Main Site (data/labs.ts)

When a lab is live, add an entry to `LAB_DETAIL_DATA` in `data/labs.ts`:

```ts
{
  slug: 'geo-auditor',
  name: 'GEO Readiness Auditor',
  category: 'Developer',        // Marketing | Developer | Technologist
  tagline: 'Is your site visible to AI? Find out in 60 seconds.',
  description: 'Full paragraph description for the lab detail page...',
  buildStack: ['Next.js 15', 'TypeScript', 'Cheerio', 'Zod', 'Resend'],
  liveUrl: 'https://geo.darlingmartech.com',
  repoUrl: 'https://github.com/darling-martech/geo-auditor',
  serviceIds: ['technical-seo', 'geo-optimization'],  // from data/taxonomy.ts
  screenshots: [
    { src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/[public-id].png', alt: '...' }
  ],
  // ... other existing LAB_DETAIL_DATA fields
}
```

---

## 6. Lab → Service Page Connection (Required)

After a lab is live, it must appear on the relevant service detail page. In the service
data (`data/services.ts`), add a `proofTools` array:

```ts
{
  id: 'geo-optimization',
  title: 'GEO Optimization',
  // ...existing fields...
  proofTools: [{
    name: 'GEO Readiness Auditor',
    description: 'Free audit tool — checks your site\'s AI visibility score.',
    url: 'https://geo.darlingmartech.com',
    labSlug: 'geo-auditor',
  }]
}
```

The service detail page component then renders a "See It Live" section linking to the lab.
Copy for this section: "I built this tool to demonstrate exactly how I audit client sites
before starting [service] work."

---

## 7. Lab Detail Page on darlingmartech.com/lab/[slug]

The existing `LabDetailPage.tsx` component handles the layout. Key sections to populate
in the data entry:

1. **Hero** — tool name + tagline + live tool embed or screenshot
2. **The Problem** — what this tool solves, who it's for
3. **Build Stack** — tech pills (from `buildStack` array)
4. **Live Screenshots** — Cloudinary images (upload after build)
5. **CTA** — links to live tool + relevant service page

For labs that embed in-page (like CMO Simulator), use `LabModal.tsx`. For external
tools, link directly to the subdomain.

---

## 8. Per-Lab Core Logic Reference

### Lab 01 — GEO Readiness Auditor
Core checks in `lib/auditor.ts`: robots.txt AI bot permissions (GPTBot, ClaudeBot, PerplexityBot),
schema.org structured data count, H1 hierarchy (exactly 1), FAQ/Q&A content detection,
E-E-A-T signals (author pages, about pages). Weighted score 0–100.

### Lab 02 — SMB Attribution Engine
Three models in `lib/attribution-models.ts`: `lastTouch()`, `linear()`, `timeDecay()` (7-day half-life).
Input: touchpoint CSV with channel, timestamp, sessionId, converted, revenue. Output: side-by-side model comparison.

### Lab 03 — MarTech Stack Auditor
200+ tools in `data/martech-tools.ts` with category, avgMonthlyCost, alternatives[].
`detectOverlaps()` finds redundant tools. Output: Stack Score + estimated monthly waste.

### Lab 04 — No-Code Lead Scorer
`ScoringModel` + `ScoringRule[]` in `lib/lead-scorer.ts`. Default model seeded from
3-question intake. `scoreLeads()` processes CSV rows → sorted scored list with tier labels.

### Lab 05 — Agentic Marketing Monitor
`generateAgentReport(current, previous)` in `lib/agent.ts` via Anthropic SDK.
Vercel Cron Job (`/api/cron/weekly-report`) runs Monday 8am. Users stored in Vercel KV.
Output: structured weekly digest — finding, 2 campaigns to investigate, 1 budget recommendation, 1 priority action.

### Lab 06 — CMO Roadmap Generator
7-question intake → Claude generates phased 90-day roadmap (Days 1-30 Foundation,
31-60 Systems, 61-90 Optimization). Ends with booking CTA. PDF export via `jsPDF`.

### Lab 07 — Fortress Security Scanner
Header inspection in `lib/fortress-scanner.ts`: HTTPS, HSTS, X-Frame-Options, CSP,
server version disclosure, Cloudflare detection. Returns severity-rated report: Critical / Warning / Pass.

### Lab 08 — Marketing ROI Dashboard
CSV import (ad spend + revenue by channel). Calculates ROAS, CPA, ROI per channel.
Recharts bar chart + side-by-side comparison. Budget shift recommendation. Shareable URL via `nanoid`.

---

## 9. Sprint Build Order

**Sprint 2 (first labs to build):**
1. Lab 01: GEO Auditor — 2 weeks
2. Lab 05: Agentic Monitor — 3 weeks
3. Lab 02: Attribution Engine — 2 weeks
4. Lab 03: Stack Auditor — 1 week

**Sprint 4 (remaining labs):**
5. Lab 04: Lead Scorer
6. Lab 06: CMO Roadmap Generator
7. Lab 07: Fortress Scanner
8. Lab 08: ROI Dashboard

---

## 10. Visual Design for Lab Tools (standalone repos)

These are standalone Next.js apps, not on the main site — but they should feel like
siblings. Use the brand palette:

```css
--color-base: #0A0A0A
--color-accent: #FF4D00
--color-text: #F5F0E8
--color-muted: #888888
--color-surface: #141414
--color-border: rgba(245, 240, 232, 0.08)
```

Typography: Inter for body (Google Font, not Cabinet Grotesk — simpler install for
standalone repos). Geist Mono for code/scores/data values.

No Framer Motion required for standalone labs — CSS transitions are fine. Keep it fast.
No 3D. Focus on function and clarity.

---

## 11. Monetization Path Per Lab

Each lab has a clear entry → service conversion path:

| Lab | Entry CTA | Service | Price Signal |
|-----|-----------|---------|-------------|
| GEO Auditor | "Book a GEO Audit Call" | /services/website-ux/geo-optimization | $2,500 audit → $1,500/mo |
| Attribution | "Set Up Attribution" | /services/data-analytics | $3,500 setup → retainer |
| Stack Auditor | "Book a MarTech Audit" | /services/martech-audit | $2K–$5K audit |
| Lead Scorer | "Put This In Your CRM" | /services/automation-crm | $3,500 setup |
| Agentic Monitor | "Get Weekly Reports" | /services/automation-crm/agentic-systems | Retainer |
| CMO Roadmap | "Build This With Me" | /services/growth-strategy | 90-day engagement |
| Fortress | "Book a Fortress Assessment" | /services/systems-infrastructure/the-fortress | $2,000+ |
| ROI Dashboard | "Get Decision-Grade Data" | /services/data-analytics/the-conductor | $8,000+ |
