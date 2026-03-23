# /work Implementation Spec — darlingmartech.com
> For Claude Code · Phase 2 build · Last updated: 2026-03-23

This file is a complete implementation brief for building the `/work` case study section of darlingmartech.com. Read it fully before writing any code. Follow the existing repo conventions exactly — CSS Modules, no Tailwind for visual styling, CSS custom properties for all tokens, `next-cloudinary` for images, Framer Motion for animation.

---

## Overview

Build two new routes:
1. `/work` — Case study index page (grid of project cards)
2. `/work/[slug]` — Individual case study detail pages

There are **19 case studies** total. The content for all of them lives in the `/case-studies/` folder in the repo root (see file list below). Each `.md` file contains the full page content — metadata, hero, all sections, and Cloudinary asset references.

---

## File Structure to Create

```text
/app
  /work
    /page.tsx                   — Work index page
    /[slug]
      /page.tsx                 — Case study detail page

/components
  /sections
    /WorkIndex                  — Index page sections
      WorkHero.tsx
      WorkGrid.tsx
      WorkCard.tsx
      WorkIndex.module.css
    /WorkDetail                 — Detail page sections
      WorkDetailHero.tsx
      WorkChallenge.tsx
      WorkApproach.tsx
      WorkDeliverables.tsx
      WorkOutcome.tsx
      WorkCTA.tsx
      WorkDetail.module.css

/lib
  /work.ts                      — Data helpers (load + parse all case study data)

/data
  /work
    /work-index.ts              — Array of all 19 WorkCard entries (typed)
    /[slug].ts OR work-data.ts  — Full case study content objects
```

---

## Data Architecture

### Option A (Recommended): Static TypeScript data files
Since the content is already fully written and won't change frequently, define all case study data as typed TypeScript objects in `/data/work/`. No MDX parser needed. This is the simplest, most performant approach and keeps everything in the existing pattern.

### WorkCard type (for index page cards)
```typescript
// /lib/work.ts

export type WorkCard = {
  slug: string;
  label: string;           // e.g. "Hospitality · Brand Identity & Web"
  client: string;          // Display name
  headline: string;        // One-line hook
  metrics: string[];       // 2–3 stat strings
  category: WorkCategory;
  logoPublicId?: string;   // Cloudinary public_id for logo/anchor image
  heroPublicId?: string;   // Optional hero image public_id
  featured?: boolean;      // Pinned to top of grid
};

export type WorkCategory =
  | 'Automation & Systems'
  | 'Healthcare'
  | 'Legal & Professional'
  | 'Hospitality & Local'
  | 'E-Commerce'
  | 'Brand Identity'
  | 'Non-Profit';
```

### CaseStudy type (for detail pages)
```typescript
export type CaseStudy = WorkCard & {
  titleTag: string;
  metaDescription: string;
  subhead: string;
  challenge: string;         // Full HTML-safe markdown string, or split into paragraphs[]
  approach: string;
  deliverables: Deliverable[];
  outcome: string;
  process?: ProcessPhase[];
  whatThisMeansForYou: string;
  ctaLine: string;           // "Ready to [X]?"
  cloudinaryAssets?: CloudinaryAsset[];
};

export type Deliverable = {
  title: string;
  description: string;
};

export type ProcessPhase = {
  label: string;
  description: string;
};

export type CloudinaryAsset = {
  publicId: string;
  label: string;
  folder: string;
};
```

---

## All 19 Case Studies — Data Reference

Use this table to build `/data/work/work-index.ts`. Slugs must match exactly.

| slug | client | category | logo publicId |
|---|---|---|---|
| `317-bbq` | 317 BBQ | Hospitality & Local | `GC_Photography_317-81_1` |
| `black-letter` | Black Letter | Brand Identity | `Black_Letter_-_Full_Logo` |
| `circle-city-kicks` | Circle City Kicks | Brand Identity | `cck-logo-anchor` |
| `clean-aesthetic` | Clean Aesthetic | Brand Identity | `clean-aesthetics-logo-anchor` |
| `graston-technique` | Graston Technique® | Automation & Systems | `graston_technique_logo` |
| `hoosier-boy-barbershop` | Hoosier Boy Barbershop | Hospitality & Local | `hoosierboy-logo-anchor` |
| `perpetual-movement-fitness` | Perpetual Movement Fitness | Brand Identity | `pmf-logo-anchor` |
| `pike-medical-consultants` | Pike Medical Consultants | Healthcare | *(no dedicated logo anchor — use text)* |
| `primarycare-indy` | PrimaryCare Indy | Healthcare | `primarycare-logo-anchor` |
| `riley-bennett-egloff` | Riley Bennett Egloff LLP | Legal & Professional | `rbe-logo-anchor` |
| `the-closer` | The Closer | Automation & Systems | *(no logo — use label + headline)* |
| `the-compass` | The Compass | Automation & Systems | *(no logo — use label + headline)* |
| `the-fortress` | The Fortress | Automation & Systems | *(no logo — use label + headline)* |
| `the-launchpad` | The Launchpad | Automation & Systems | *(no logo — use label + headline)* |
| `tuohy-bailey-moore` | Tuohy Bailey & Moore LLP | Legal & Professional | `tbm-logo-anchor` |
| `urgentcare-indy` | UrgentCare Indy | Healthcare | `urgentcare-logo-anchor` |
| `behr-pet-essentials` | Behr Pet Essentials | E-Commerce | `behr-pet-logo-anchor` |
| `primary-colours` | Primary Colours | Non-Profit | `primary-colours-logo-anchor` |
| `russell-painting` | Russell Painting Co. | Hospitality & Local | `russell-painting-logo` |

**Cloudinary cloud name:** `djhqowk67` (already in env as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`)

---

## Key Metrics per Card

Build these into the data. Use exactly as written — these are the proof points.

```
317-bbq:                  ["120% time on site", "40% order lift", "2× catering inquiries"]
black-letter:             ["Full brand system", "Scales digital to print", "Premium positioning from day one"]
circle-city-kicks:        ["Full brand system", "Local identity in the core mark logic", "Built for merch, social & packaging"]
clean-aesthetic:          ["0 → full brand system", "Concierge pricing from day one", "Complete identity delivered at launch"]
graston-technique:        ["+212% qualified leads", "95% overhead reduction", "48 hrs/wk saved"]
hoosier-boy-barbershop:   ["90% more online bookings", "200% social engagement", "#1 local search"]
perpetual-movement-fitness: ["Kinetic mark built on one concept", "Coaching positioning vs gym brand", "Social-to-signage scalable"]
pike-medical-consultants: ["45% patient growth", "3 years", "5 divisions unified"]
primarycare-indy:         ["75% more bookings", "300% organic traffic", "210% ROI"]
riley-bennett-egloff:     ["7+ year engagement", "80%+ bounce rate reduced", "Platform blueprint for 2026 rebuild"]
the-closer:               ["0 manual invoices", "100% quote-to-order automated", "Deals lost at payment: near zero"]
the-compass:              ["99.98% uptime SLA", "94% issues auto-resolved", "40% faster MTTR"]
the-fortress:             ["85k+ threats blocked/month", "40% CPU load reduction", "100% direct origin exposure eliminated"]
the-launchpad:            ["95% manual overhead cut", "0 manual enrollment steps", "3× faster onboarding"]
tuohy-bailey-moore:       ["45% bounce rate reduction", "60% more contact form submissions", "40% more inbound inquiries"]
urgentcare-indy:          ["+35% patient bookings", "Dominant local search presence", "Patient education driving walk-ins"]
behr-pet-essentials:      ["+28% cart value", "−40% support tickets", "3× info-to-purchase conversion"]
primary-colours:          ["$46k+ revenue", "10,000+ audience", "200+ artists supported"]
russell-painting:         ["4.9★ Google rating", "Heritage as #1 conversion driver", "Top Indianapolis painting keywords"]
```

---

## /work Index Page

### Route: `/app/work/page.tsx`

**Page-level metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Work — Darling MarTech | Case Studies & Client Projects',
  description: 'Real work. Real results. Case studies across brand identity, marketing strategy, automation, web development, and digital infrastructure — for businesses that needed more than a vendor.',
};
```

### Layout

```
[WorkHero]
  — Label: "Selected Work"
  — Headline: "Proof, not promises."
  — Subhead: "15+ years. 30,000+ users served. 40% average conversion lift.
               Real projects. Real outcomes."

[CategoryFilter]  (optional — implement if time allows)
  — "All" | "Automation" | "Brand Identity" | "Healthcare" | "Legal" | "Web & SEO" | "Strategy"
  — Framer Motion layout animation on filter change

[WorkGrid]
  — 3-column grid on desktop, 2-col tablet, 1-col mobile
  — Maps over all 19 WorkCard entries
  — Each renders a <WorkCard />

[BottomCTA]
  — "Every project started with a conversation."
  — [Start one →](/contact)
```

### WorkCard component

Each card should display:
- Cloudinary logo image (use `next-cloudinary` `CldImage` component, 120×40px max, `object-contain`)
- **Label** — small eyebrow text (muted color, uppercase, letter-spaced)
- **Client name** — large display type (Cabinet Grotesk)
- **Headline** — medium weight, 1 line ideally
- **Metrics** — 2–3 stats as horizontal pill-style callouts or small stat blocks
- Hover state: subtle border accent (`--color-border-accent`), slight translateY(-4px) with Framer Motion

Cards with no logo (The Closer, The Compass, The Fortress, The Launchpad) should display the category label as a styled text badge instead.

Full card links to `/work/[slug]`.

**CSS:** Use `--color-surface` (#141414) as card background, `--color-border` for default border, `--color-accent` (#FF4D00) for metric accent color. No Tailwind visual properties.

---

## /work/[slug] Detail Pages

### Route: `/app/work/[slug]/page.tsx`

**Static generation:**
```typescript
export async function generateStaticParams() {
  return workData.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const cs = getWorkBySlug(params.slug);
  return {
    title: cs.titleTag,
    description: cs.metaDescription,
  };
}
```

### Section order (match the case study files exactly):

```
1. WorkDetailHero
   — Eyebrow label (industry · service)
   — Client name (display headline)
   — Headline (the hook line)
   — Subhead (2 sentences)
   — Key Metrics: 3–4 stat callout blocks
   — Optional: Cloudinary logo image

2. WorkChallenge
   — Section header: "The Challenge"
   — 2–3 paragraphs

3. WorkApproach
   — Section header: "The Approach"
   — 2–3 paragraphs

4. WorkDeliverables
   — Section header: "The Work"
   — Deliverable list: bold title + 2–3 sentence description per item
   — Render as a vertical stack or 2-col grid

5. [Optional] WorkProcess (render only if processPhases exist)
   — Section header: "The Process"
   — Phase list with label + description

6. WorkOutcome
   — Section header: "The Outcome"
   — 2–3 paragraphs
   — Lead with the most dramatic stat

7. WorkWhatThisMeansForYou
   — Section header: "What This Means For You"
   — 1–2 paragraphs
   — Ends with "That's what I build."

8. WorkCTA
   — "Ready to [ctaLine]?"
   — [Let's talk →](/contact) — use existing CTA button component/style
```

### Sub-project note (Graston)
The Graston case study includes references to 4 sub-projects: The Closer, The Compass, The Fortress, and The Launchpad. On the Graston detail page, add a **"Systems Built" section** after WorkDeliverables that links to each sub-project page. On the sub-project pages (the-closer, the-compass, the-fortress, the-launchpad), add a small **"Part of the Graston Technique® engagement"** back-link badge near the hero.

---

## Cloudinary Image Usage

Use `next-cloudinary`'s `CldImage` component. It's already installed (`next-cloudinary ^6.17.5`).

```typescript
import { CldImage } from 'next-cloudinary';

// Logo on index card
<CldImage
  src={card.logoPublicId}
  alt={`${card.client} logo`}
  width={120}
  height={40}
  crop="fit"
  style={{ objectFit: 'contain' }}
/>

// Hero image on detail page (if heroPublicId exists)
<CldImage
  src={cs.heroPublicId}
  alt={cs.client}
  width={1200}
  height={600}
  crop="fill"
  gravity="auto"
  priority
/>
```

**All public IDs and their folders are listed in each case study .md file** under the `Cloudinary Assets:` section. The cloud name is already in env: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67`.

---

## Animation Guidelines

Follow the existing `/lib/motion.ts` spring presets and shared variants. Do not introduce new spring configs — use the existing ones.

- **Cards:** Stagger fade-up on mount (use existing `containerVariants` / `itemVariants` pattern if it exists, otherwise `staggerChildren: 0.07`)
- **Detail page sections:** Fade-up on scroll with `whileInView`, `once: true`, `margin: "-10%"`
- **Card hover:** `whileHover={{ y: -4, borderColor: 'var(--color-border-accent)' }}`
- **Metrics callouts in hero:** Scale-in with slight delay stagger

---

## CSS Module Conventions

Match existing component module patterns exactly:

```css
/* WorkCard.module.css example structure */
.card { }
.card:hover { }
.logo { }
.eyebrow { }
.client { }
.headline { }
.metrics { }
.metric { }
.metricValue { }
.metricLabel { }
.arrow { }
```

Use CSS custom properties from `globals.css` — no hardcoded hex values anywhere except in `globals.css` itself.

Typography scale — use existing site conventions:
- Eyebrow/label: `--font-body`, small, uppercase, muted
- Client name / headline: `--font-display` (Cabinet Grotesk)
- Body / descriptions: `--font-body` (Inter)
- Pull quotes / italic accents: `--font-accent` (Instrument Serif, italic)

---

## SEO & Metadata

Every detail page needs:
- `title` and `description` from the case study's `titleTag` and `metaDescription` fields
- `og:title`, `og:description`, `og:image` (use Cloudinary logo/hero image)
- Structured data (JSON-LD `WebPage` or `Article`) — optional but recommended

---

## Content Source Files

All content is in the `/case-studies/` folder in the repo root. Each file is named `YYYY-MM-DD-[slug].md`. The full content (challenge, approach, deliverables, outcome, CTA) is in those files — **do not rewrite the copy**. Transcribe it faithfully into the TypeScript data objects.

File → slug mapping:
```
2026-03-23-317-bbq.md                 → /work/317-bbq
2026-03-23-black-letter.md            → /work/black-letter
2026-03-23-circle-city-kicks.md       → /work/circle-city-kicks
2026-03-23-clean-aesthetic-full.md    → /work/clean-aesthetic
2026-03-23-graston-technique.md       → /work/graston-technique
2026-03-23-hoosier-boy-full.md        → /work/hoosier-boy-barbershop
2026-03-23-perpetual-movement-fitness.md → /work/perpetual-movement-fitness
2026-03-23-pike-medical-consultants.md   → /work/pike-medical-consultants
2026-03-23-primarycare-indy.md        → /work/primarycare-indy
2026-03-23-riley-bennett-egloff-full.md  → /work/riley-bennett-egloff
2026-03-23-the-closer.md              → /work/the-closer
2026-03-23-the-compass.md             → /work/the-compass
2026-03-23-the-fortress.md            → /work/the-fortress
2026-03-23-the-launchpad.md           → /work/the-launchpad
2026-03-23-tuohy-bailey-moore.md      → /work/tuohy-bailey-moore
2026-03-23-urgentcare-indy.md         → /work/urgentcare-indy
2026-03-19-behr-pet.md                → /work/behr-pet-essentials
2026-03-19-primary-colours.md         → /work/primary-colours
2026-03-19-russell-painting.md        → /work/russell-painting
```

---

## Implementation Order (Suggested)

1. **Data layer first** — Create `/lib/work.ts` types and `/data/work/work-index.ts` with all 19 cards. Validate types compile.
2. **Detail data** — Create the full `CaseStudy` objects, starting with 3–4 to validate the schema, then complete all 19.
3. **Index page** — Build `/work/page.tsx`, `WorkGrid.tsx`, `WorkCard.tsx`, and CSS. Verify 19 cards render correctly.
4. **Detail page** — Build `/work/[slug]/page.tsx` and all section components. Verify `generateStaticParams` produces 19 routes.
5. **Graston sub-project links** — Add "Systems Built" section to Graston and back-link badges to the 4 sub-project pages.
6. **Cloudinary images** — Wire up `CldImage` in `WorkCard` and `WorkDetailHero`. Confirm images load.
7. **Animations** — Add Framer Motion stagger/fade-up. Match existing motion patterns.
8. **SEO** — Add `generateMetadata` to all detail pages. Add `og:image` references.
9. **Build check** — Run `npm run build`. Resolve any TypeScript or static gen errors.

---

## Definition of Done

- [ ] `npm run build` completes with 0 errors
- [ ] All 19 `/work/[slug]` routes exist and render content
- [ ] `/work` index displays all 19 cards, correctly filtered by category
- [ ] Cloudinary images load on cards and detail pages where `publicId` exists
- [ ] No Tailwind visual utilities in CSS (layout utilities only)
- [ ] No hardcoded color hex values outside `globals.css`
- [ ] All `CldImage` usages use `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` from env
- [ ] Each detail page has `title` + `description` metadata from the case study data
- [ ] Framer Motion animations match the spring/stagger patterns from `/lib/motion.ts`
- [ ] Graston sub-project cross-links are present and functional

---

*This spec was generated from the case study content in `/case-studies/`. Content was written by Darling MarTech brand voice — do not rewrite or paraphrase any copy when transcribing into data objects.*
