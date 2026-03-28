---
name: darling-martech-data
description: >
  Data layer skill for darlingmartech.com. Knows every TypeScript content
  file in /data/ — the exact schemas for labs, services, work index, work
  detail, and testimonials. Use this skill any time you need to: add a new
  case study to /work, add a new lab tool to /lab, add or update a service,
  update metrics or proof points, wire up a new slug to dynamic routes, or
  understand the data shape before writing a component. Also triggers on:
  "add a case study", "add a new lab", "update the work data", "add a service
  proof point", "what's the schema for work-data.ts", "add a testimonial",
  "wire up the new slug", "update the metrics on the Graston page", "add
  the new client to the work index", or any request touching /data/ files.
  Use this skill proactively whenever a new page, component, or feature
  needs to pull from the data layer — check schema first, build second.
---

# Darling MarTech — Data Layer Skill

You are editing the typed TypeScript content layer for darlingmartech.com.
All site content — case studies, lab tools, services, testimonials — flows
from `/data/`. Components read from here. Nothing is hardcoded in page files.

Before touching any component, understand the data shape. Before adding
new content, confirm the slug is unique and the required fields are present.

---

## 1. File Map

```
/data/
  labs.ts              — 9 lab tool entries (LAB_DETAIL_DATA)
  services.ts          — All service page content (6 categories + meta)
  testimonials.ts      — 4 verbatim testimonials
  work/
    work-index.ts      — 20 work card entries (workIndex[])
    work-data.ts       — Full case study objects (detailed content)
```

---

## 2. Work Index Schema (`data/work/work-index.ts`)

Every entry in `workIndex: WorkCard[]` needs these fields. Types from `@/lib/work`.

### Required fields
```ts
{
  slug: string           // URL slug — must be kebab-case, unique, matches work-data.ts key
  label: string          // "Industry · Category · Tags" — 2–4 tags, "·" separator
  client: string         // Display name (e.g., "Graston Technique®")
  headline: string       // One punchy sentence — outcome-first, Jacob's voice
  metrics: string[]      // Array of 2–4 metric strings ("+212% qualified leads")
  category: string       // One of: 'Automation & Systems' | 'Healthcare' |
                         //         'Legal & Professional' | 'Hospitality & Local' |
                         //         'E-Commerce' | 'Brand Identity' | 'Non-Profit'
}
```

### Optional fields
```ts
{
  logoPublicId?: string          // Cloudinary public ID for logo
  heroPublicId?: string          // Cloudinary public ID for hero image
  cardPublicId?: string          // Cloudinary public ID for card preview image
  cardPreviewPublicId?: string   // Cloudinary public ID for video card preview
  cardPreviewType?: 'video'      // Use 'video' if cardPreviewPublicId is a video
  featured?: boolean             // true = appears in homepage featured section
  dashboardTier?: 'flagship' | 'system'  // 'flagship' = large featured, 'system' = child project
  parentProjectSlug?: string     // Links system-tier project to its flagship parent
  relatedProjectSlugs?: string[] // Slugs of related/child projects to cross-link
  visualMode?: 'mesh' | 'signal' | 'beacon' | 'orbit'  // 3D ambient scene mode
  theme?: {
    layout: 'editorial' | 'split'
    metricStyle: 'ticker' | 'panel' | 'pill'
    mediaStyle: 'landscape' | 'portrait' | 'stack'
    density: 'kinetic' | 'balanced' | 'calm'
  }
}
```

### Category reference
Use exactly these strings (case-sensitive):
- `'Automation & Systems'`
- `'Healthcare'`
- `'Legal & Professional'`
- `'Hospitality & Local'`
- `'E-Commerce'`
- `'Brand Identity'`
- `'Non-Profit'`

### Dashboard tier rules
- `dashboardTier: 'flagship'` — 4 current flagships: graston-technique, pike-medical-consultants, 317-bbq, hoosier-boy-barbershop
- `dashboardTier: 'system'` — Child projects that roll up to a flagship parent
- No tier — standard case study (appears in grid but not featured dashboard)
- `featured: true` — Appears in homepage CaseStudies teaser section

### Adding a new case study to work-index.ts
```ts
// Add to the appropriate category section, maintaining the category grouping order:
// 1. Automation & Systems
// 2. Healthcare
// 3. Legal & Professional
// 4. Hospitality & Local
// 5. E-Commerce
// 6. Brand Identity
// 7. Non-Profit

{
  slug: 'new-client-slug',
  label: 'Industry · Service Type · Key Capability',
  client: 'Client Name',
  headline: 'One sentence. Outcome-first. Past tense or present continuous.',
  metrics: ['+X% result', 'Secondary metric', 'Third metric'],
  category: 'Brand Identity',  // pick from list above
  // Optional: add logoPublicId, heroPublicId if Cloudinary assets exist
  // Optional: set featured: true and add to homepage if flagship-tier work
}
```

---

## 3. Work Data Schema (`data/work/work-data.ts`)

The full case study content. Key export is a `Record<string, WorkDetail>` where
keys are slugs matching `work-index.ts`.

### When adding a new case study
1. Add to `work-index.ts` first (card data)
2. Add corresponding entry to `work-data.ts` (full content)
3. The slug **must match exactly** between both files

### What work-data.ts contains per entry
- Hero section: headline, subheadline, client name, industry
- Overview: brief summary paragraph
- Results: structured metric blocks with labels and values
- Services used: which of Jacob's services were applied
- Timeline: engagement duration and phases
- Challenge / Approach / Impact: the narrative
- Media: Cloudinary public IDs for images
- Related case studies: cross-links to related slugs

### Case study raw research files
Raw notes and research live in `/case-studies/` as markdown:
- `behr-pet-case-study.md`
- `russell-painting/russell-painting-case-study.md`

These are for reference only — the app reads from `data/work/work-data.ts`.

---

## 4. Labs Schema (`data/labs.ts`)

Export: `LAB_DETAIL_DATA: Record<string, LabDetailProps>`

### Full LabDetailProps schema
```ts
interface LabDetailProps {
  slug: string           // URL slug — matches /lab/[slug] route
  name: string           // Display name (e.g., "CMO Simulator")
  category: string       // 'Marketing' | 'Developer' | 'Technologist'
  year: string           // '2024' | '2025' etc.
  tagline: string        // 1–2 sentence summary — direct, specific
  metrics: {
    value: string        // The stat/number (e.g., "~10 min", "+212%")
    label: string        // What it means (e.g., "Average session time")
  }[]
  problemBody: string[]  // Array of paragraphs: the problem this tool solves
  buildStack: {
    layer: string        // Tech layer (e.g., "Framework", "Database")
    choice: string       // What was chosen (e.g., "Next.js App Router")
    why: string          // Why this choice was made
  }[]
  buildBody: string[]    // Array of paragraphs: how it was built
  impactBody: string[]   // Array of paragraphs: results and portfolio value
  proofStatement: string // One sentence: what this proves about Jacob's capabilities
  ctaLine: string        // CTA to Jacob — ties the tool to a client conversation
  toolSrc: string        // Live URL or local path. Empty string if not deployed.
  screenshots: {
    src: string          // Full Cloudinary URL (w_1400,f_auto,q_auto format)
    alt: string          // Descriptive alt text
    caption: string      // Caption shown under screenshot
  }[]
}
```

### Lab categories
- `'Marketing'` — CMO Simulator, Graston Growth Engine, Investment ROI Planner
- `'Developer'` — Barbershop Command Center, Clinical Compass, Smart Sales & Pricing, License Requirements
- `'Technologist'` — PRO DJ Studio, Strum AI

### Cloudinary URL pattern for lab screenshots
```
https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/[public-id].png
```

### Lab tool URL patterns
- External Vercel deploy: use full URL (e.g., `'https://pro-dj-mixer.vercel.app/'`)
- Local HTML in /public/labs/: use path (e.g., `'/labs/clinical-compass/Graston Clinical Compass Tool.html'`)
- Gated/no external URL: use empty string `''`

### Adding a new lab tool
1. Add the full `LabDetailProps` object to `LAB_DETAIL_DATA`
2. The `slug` becomes the `/lab/[slug]` URL automatically (dynamic route exists)
3. If the tool has a live URL, set `toolSrc` to the full URL
4. If local HTML tool, place the file in `/public/labs/[slug]/` and set `toolSrc` to the path
5. Add at least 1 screenshot with a Cloudinary URL

---

## 5. Services Schema (`data/services.ts`)

### Exports
| Export | Type | Purpose |
|---|---|---|
| `serviceLayerMeta` | Array | 3 strategy layers: strategy/build/growth |
| `serviceOverview` | `ServiceOverviewItem[]` | 4 summary cards for overview section |
| `serviceDetails` | `ServiceDetail[]` | 6 full service categories |
| `specializedServices` | `SpecializedService[]` | 8 specialty service chips |
| `engagementModels` | `EngagementModel[]` | 3 engagement types |
| `contactServiceOptions` | Array | Options for contact form select |

### ServiceDetail schema (the main 6 categories)
```ts
{
  id: string              // 'strategy' | 'brand-web' | 'systems' | 'growth' | 'commerce' | 'specialized'
  layer: ServiceLayer     // 'strategy' | 'build' | 'growth'
  sceneTarget: string     // 3D scene target ID (ties to ServicesAmbient component)
  eyebrow: string         // Small label above headline
  title: string           // Service page headline
  summary: string         // 2–3 sentence summary
  deliverables: string[]  // 4–6 bullet deliverables
  proof: ServiceProof[]   // 2–3 case study proof points
}
```

### ServiceProof schema
```ts
{
  label: string        // Client name (links to /work/[slug])
  href: string         // '/work/[slug]'
  result: string       // What was achieved (1 sentence)
  signalLabel: string  // Short tag (e.g., 'Embedded leadership')
  metric: string       // Key metric stat (e.g., '45% patient growth')
  sceneTarget: string  // 3D scene sub-target
}
```

### Scene targets reference
These must match the `ServicesAmbient.tsx` component's known targets:
- `strategy-core`, `strategy-pike`, `strategy-rbe`, `strategy-primary-colours`
- `build-brand-web`, `build-317bbq`, `build-hoosier-boy`, `build-tbm`
- `build-systems`, `build-graston`, `build-launchpad`, `build-lab`
- `growth-core`, `growth-primarycare`, `growth-urgentcare`, `growth-russell`
- `build-commerce`, `build-closer`, `build-behr`, `build-317bbq-orders`
- `build-specialized`, `build-urgentcare-flow`, `build-black-letter`, `build-primary-colours-exhibit`

### Adding a proof point to a service
```ts
// In serviceDetails, find the relevant service by id, add to proof[]:
{
  label: 'New Client Name',
  href: '/work/new-client-slug',  // must exist in work-index.ts
  result: 'What was achieved in one sentence.',
  signalLabel: 'Short tag',
  metric: '+X% result stat',
  sceneTarget: 'build-new-client',  // check ServicesAmbient.tsx for valid targets
}
```

---

## 6. Testimonials Schema (`data/testimonials.ts`)

Four verbatim testimonials. Display order is fixed.

### Adding a new testimonial
```ts
{
  quote: string    // Full verbatim quote — no truncation
  name: string     // "First Last"
  role?: string    // Job title if available
  year?: string    // Year of testimonial
}
```

Current order (do not change): Jesse Wey → Andrew Bastnagel → Kevin Martin See → Ben Worrell

---

## 7. Routing — Dynamic Routes

### How slugs become pages
- `/work/[slug]` — reads from `work-index.ts` (card) + `work-data.ts` (content)
- `/lab/[slug]` — reads from `data/labs.ts` (LAB_DETAIL_DATA)
- `/services/[slug]` — reads from `data/services.ts` (serviceDetails)

### Static params generation
Each dynamic route uses `generateStaticParams()`. When you add a new entry
to a data file, the route is automatically included at build time. No
route config needed.

### Canonical slug rules
These slugs were renamed — redirects live in `next.config.js`. Use canonical:
- `riley-bennett-egloff` (not rbe-law)
- `primarycare-indy` (not primary-care-indy)
- `urgentcare-indy` (not urgent-care-indy)

---

## 8. Cloudinary Public ID Reference

When adding new work or lab entries, you'll need Cloudinary public IDs.
Cloud name: `djhqowk67`

### Known public ID patterns
- Logos: `[client-slug]-logo-anchor` (e.g., `behr-pet-logo-anchor`, `rbe-logo-anchor`)
- Hero images: descriptive name matching the image (e.g., `PMC-Dr.-Pike-Xray`)
- Card previews: `[client-descriptor]-website` (e.g., `primary-care-indy-website`)
- Lab screenshots: Descriptive names (e.g., `CMO_Sim-_Q1.png`)
- Studio folders: `studio/photography/`, `studio/graphic-design/`, `studio/proof/`

### Finding public IDs
Use the Cloudinary MCP or the Cloudinary console at cloudinary.com/console.
Never guess a public ID — verify it exists before adding to data files.

---

## 9. Pre-Flight Checklist for Data Changes

Before shipping any data layer change:

- [ ] Slug is unique across all entries in the same data file
- [ ] Slug matches between `work-index.ts` and `work-data.ts` (for work entries)
- [ ] All Cloudinary public IDs verified to exist
- [ ] `toolSrc` URL is reachable (for lab entries with external deploys)
- [ ] Category string matches exactly (case-sensitive)
- [ ] `href` in proof points points to an existing slug in `work-index.ts`
- [ ] `sceneTarget` in services matches a known target in `ServicesAmbient.tsx`
- [ ] New lab tool's `slug` matches the directory name in `/public/labs/` (if local HTML)
- [ ] `generateStaticParams()` will pick up the new entry (it will — this is automatic)
