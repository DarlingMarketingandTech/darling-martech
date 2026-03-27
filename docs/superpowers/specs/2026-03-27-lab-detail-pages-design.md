# Lab Detail Pages + Modal — Design Spec
> Created: 2026-03-27 | Status: Approved

---

## Overview

Extend the existing `/lab` page with three additions:
1. **LabModal** — iframe popout that launches a Graston tool without leaving the site
2. **LabDetailPage** — full case-study-style detail page per tool
3. **Dynamic route `/lab/[slug]`** — server route that renders LabDetailPage from data

One surgical edit to `app/lab/page.tsx` wires the 4 Graston entries into the new system.

---

## Constraint: Do Not Touch

- `app/lab/Lab.module.css`
- `components/ui/gallery-hover-card.tsx`
- `lib/motion.ts`
- Any component outside `components/lab/` and `data/`
- The 18 non-Graston tool entries in `app/lab/page.tsx`

---

## File Map

```
NEW files:
  components/lab/LabModal.tsx
  components/lab/LabModal.module.css
  components/lab/LabDetailPage.tsx
  components/lab/LabDetailPage.module.css
  data/labs.ts
  app/lab/[slug]/page.tsx

MODIFIED files:
  app/lab/page.tsx  — Tool type extension + 4 Graston entries + ToolCard logic
```

Note: HTML tool files already exist at `/public/labs/[slug]/`. No file copies needed.
The `.gitkeep` files mentioned in the prompt are unnecessary — directories already have content.

---

## 1. `data/labs.ts`

Exports a single `Record<string, LabDetailProps>` named `LAB_DETAIL_DATA`.

### `LabDetailProps` interface

```ts
export interface LabDetailProps {
  slug: string
  name: string
  category: string            // e.g. "Developer" | "Marketing"
  year: string                // e.g. "2024"
  tagline: string             // Instrument Serif italic subhead
  metrics: { value: string; label: string }[]
  problemBody: string[]       // array of paragraph strings
  buildStack: { layer: string; choice: string; why: string }[]
  buildBody: string[]
  impactBody: string[]
  proofStatement: string      // blockquote — "what this proves"
  ctaLine: string
  toolSrc: string             // e.g. "/labs/clinical-compass/Graston Clinical Compass Tool.html"
  screenshots: { src: string; alt: string; caption: string }[]
}
```

### Slugs and `toolSrc` paths (exact filenames in `/public/labs/`)

| Slug | toolSrc |
|---|---|
| `clinical-compass` | `/labs/clinical-compass/Graston Clinical Compass Tool.html` |
| `smart-sales-pricing` | `/labs/smart-sales-pricing/graston Smart Sales and Pricing Tool.html` |
| `investment-roi-planner` | `/labs/investment-roi-planner/Investment ROI Planner Tool.html` |
| `license-requirements` | `/labs/license-requirements/Practitioner License Requirements Tool.html` |

All four entries use `screenshots: []` — the section conditionally hides when empty.

### Content per entry (condensed)

**clinical-compass**
- metrics: 400+ practitioners, 48 hrs/wk saved, 1 tool replacing a full support workflow
- problem: Protocol guidance lived in PDFs/email. Clinical team spent ~2 days/week answering same questions.
- stack: Vanilla HTML/CSS/JS (embeddable, no build step), Decision tree JSON, Progressive disclosure UX
- impact: Protocol support calls dropped significantly in first 90 days. 2-minute self-service answer.
- proof: "That I can build clinical-grade decision tools as a solo marketer — and that the best support tool is one that makes the support team unnecessary."

**smart-sales-pricing**
- metrics: +38% lead-to-demo conversion, <2 min quote time, 2 versions (v1 → v2)
- problem: Reps built quotes manually in spreadsheets, got them wrong, lost deals in follow-up gap.
- stack: Vanilla HTML/CSS/JS, JS calculation engine, Real-time calculator UX, v1→v2 rebuild cycle
- impact: 38% lead-to-demo improvement. Eliminated spreadsheet quoting. Same number for everyone.
- proof: "That shipping a fast v1 and iterating on real usage data is better than designing the perfect tool."

**investment-roi-planner**
- metrics: +212% qualified lead volume, self-serve ROI answer, 3 inputs to projection
- problem: Most common sales objection: "Will this pay off?" Reps spent call time doing ROI math.
- stack: Vanilla HTML/CSS/JS, JS financial model (session vol × fee × cert cost), Visual results panel, Inline CTA
- impact: 212% qualified lead increase. Prospects arrived already sold on economics.
- proof: "That the best lead qualification happens before the first sales conversation."

**license-requirements**
- metrics: 50 states indexed, <60 sec to answer, zero support calls for licensing questions
- problem: PT in TX ≠ PT in NY. Constant inbound: "Does this count for my CEU in Ohio?"
- stack: Vanilla HTML/CSS/JS, JSON state database (non-dev updatable), Two-step lookup UX
- impact: Licensing support questions dropped to zero. Credibility signal: Graston did the compliance work for practitioners.
- proof: "That self-serve tools built on structured data can eliminate entire support categories."

---

## 2. `components/lab/LabModal.tsx`

`"use client"` component.

### Props
```ts
interface LabModalProps {
  isOpen: boolean
  onClose: () => void
  toolSrc: string
  toolName: string
  toolSlug: string
}
```

### Behavior
- `AnimatePresence` wraps two `motion.div`s: scrim + modal panel
- Scrim: `position: fixed; inset: 0; z-index: 200` — fades in/out (`duration: 0.25`). Click closes.
- Modal panel: `z-index: 201`, centered via `top: 50%; left: 50%; transform: translate(-50%, -50%)`, `width: min(92vw, 1200px)`, `height: min(88vh, 860px)`. Animates `opacity: 0 → 1`, `scale: 0.96 → 1`, `y: 24 → 0` using `springCinematic` from `@/lib/motion`.
- Title bar: LAB TOOL label (accent color) + tool name (left), "Read the build" link + X close button (right). Uses `ArrowSquareOut` + `X` from `@phosphor-icons/react`.
- iframe: fills remaining height, `sandbox="allow-scripts allow-forms allow-same-origin"`, `loading="lazy"`.
- `useEffect`: add `keydown` listener (Escape → close), lock `document.body.style.overflow = 'hidden'`. Cleanup removes listener and restores scroll.
- Mobile (< 640px): modal goes full-screen (`width: 100vw; height: 100dvh; border-radius: 0; top: 0; left: 0; transform: none`).

---

## 3. `components/lab/LabDetailPage.tsx`

`"use client"` component. Manages `modalOpen` state with `useState`. Imports `LabModal`.

### Props
`LabDetailProps` (imported from `@/data/labs`)

### Section structure (in order)

| # | Section | Class | Key element |
|---|---|---|---|
| 1 | Back link | `.backWrap` | `<Link href="/lab">← All builds</Link>` with `ArrowLeft` icon |
| 2 | Hero | `motion.section` animate (not whileInView) | category + year, `<h1>`, tagline italic, metrics strip |
| 3 | Try It Now | `motion.section` whileInView | "TRY IT NOW" label, h2, body copy, Launch button → opens modal |
| 4 | The Problem | `motion.section` whileInView | "THE PROBLEM" label, `problemBody` paragraphs |
| 5 | Screen Captures | conditional `motion.section` | only if `screenshots.length > 0`, 2-col grid of `<figure>` |
| 6 | The Build | `motion.section` whileInView | "THE BUILD" label, `buildBody` paragraphs, stack table |
| 7 | The Impact | `motion.section` whileInView | "THE IMPACT" label, `impactBody` paragraphs |
| 8 | What This Proves | `motion.section` whileInView | "WHAT THIS PROVES" label, `<blockquote>` with left accent border |
| 9 | CTA | `motion.section` whileInView | `ctaLine` text, "Let's talk" → `/contact`, "← Back to all builds" → `/lab` |

All `whileInView` sections use: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={viewport}` (from `@/lib/motion`), `transition={springEntrance}` (from `@/lib/motion`).

Hero section uses `animate` (not `whileInView`) since it's above the fold: `initial={{ opacity: 0, y: 28 }}`, `animate={{ opacity: 1, y: 0 }}`.

### Stack table structure
3 columns: Layer | Choice | Why. Header row + one row per `buildStack` entry. All CSS — no external table library.

### Typography
- `h1`: Cabinet Grotesk 900, `clamp(2.4rem, 5.5vw, 5rem)`, tracking `-0.04em`
- tagline: Instrument Serif italic
- metric value: Cabinet Grotesk 900 ~2rem, `--color-accent`
- section labels: Cabinet Grotesk 700, 0.65rem, letter-spacing 0.18em, uppercase, `--color-muted`
- prose: Inter 0.975rem, line-height 1.7, `rgba(245,240,232,0.75)`
- blockquote: Instrument Serif italic, left border `3px solid var(--color-accent)`, padding-left 24px

---

## 4. `app/lab/[slug]/page.tsx`

Server component (no `"use client"`).

```ts
import { notFound } from 'next/navigation'
import LabDetailPage from '@/components/lab/LabDetailPage'
import { LAB_DETAIL_DATA } from '@/data/labs'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LabPage({ params }: Props) {
  const { slug } = await params
  const lab = LAB_DETAIL_DATA[slug]
  if (!lab) notFound()
  return <LabDetailPage {...lab} />
}

export async function generateStaticParams() {
  return Object.keys(LAB_DETAIL_DATA).map((slug) => ({ slug }))
}
```

`params` is a `Promise` in Next.js 15+ — must `await` before destructuring.

---

## 5. Edits to `app/lab/page.tsx`

### Tool type extension
Add optional `detailHref` field:
```ts
type Tool = {
  // ...existing fields...
  url?: string
  detailHref?: string   // internal detail page route
}
```

### 4 Graston entries to update

Replace existing `Clinical Compass`, `License Hub`, `GT9 Pricing Tool` entries, and add `Investment ROI Planner`:

| Current name | New name | detailHref |
|---|---|---|
| Clinical Compass | Clinical Compass | `/lab/clinical-compass` |
| License Hub | License Requirements Navigator | `/lab/license-requirements` |
| GT9 Pricing Tool | Smart Sales & Pricing Tool | `/lab/smart-sales-pricing` |
| *(new)* | Investment ROI Planner | `/lab/investment-roi-planner` |

Remove `url` from these 4 entries entirely (no external fallback).
Remove `Graston Growth Engine` entry (replaced by the 4 specific tools).
`Investment ROI Planner` goes in `Marketing` category.

Updated descriptions match the data in `data/labs.ts`:
- Clinical Compass: "Decision-support tool helping Graston practitioners navigate clinical protocols and treatment pathways without calling the home office."
- License Requirements Navigator: "State-by-state licensing lookup for healthcare practitioners — which credentials they need, which Graston certs count toward them."
- Smart Sales & Pricing Tool: "Real-time pricing calculator for Graston certification bundles, equipment configurations, and institutional accounts."
- Investment ROI Planner: "Self-serve financial planning tool that helps practitioners calculate ROI on Graston certification before talking to sales."

### ToolCard logic update
```
if (tool.detailHref)  → href={tool.detailHref}, external={false}, ctaLabel="Read the build", footer="Explore build details"
else if (tool.url)    → existing behavior (external=true, ctaLabel="Launch app", footer="Open deployed tool")
else                  → existing behavior (no href, footer="Rebuilding — check back soon")
```

`ToolCard` needs `useState` + `LabModal` import for tools with `detailHref`? **No** — the "Read the build" CTA navigates to the detail page. The modal launch is on the detail page, not the index card. Keeps `ToolCard` stateless.

---

## CSS Notes

Both CSS modules follow the existing `Lab.module.css` conventions:
- All colors via CSS custom properties (`--color-base`, `--color-surface`, `--color-accent`, `--color-text`, `--color-muted`, `--color-border`)
- Font families via CSS variables (`--font-display`, `--font-body`, `--font-instrument-serif`)
- No Tailwind color/typography classes
- Borders: `1px solid var(--color-border)` for dividers, `1px solid rgba(245,240,232,0.08)` for cards
- Border-radius max 16px for cards
- Mobile breakpoint: `768px` for layout changes, `640px` for modal full-screen

---

## Quality Checklist (verify before done)

- [ ] `npm run build` passes with no TypeScript errors
- [ ] `/lab` page renders correctly with updated tool entries (count changes: -2 net: Graston Growth Engine removed, ROI Planner added)
- [ ] `/lab/clinical-compass` renders detail page
- [ ] `/lab/smart-sales-pricing` renders detail page
- [ ] `/lab/investment-roi-planner` renders detail page
- [ ] `/lab/license-requirements` renders detail page
- [ ] "Read the build" on index cards navigates to detail pages (not external)
- [ ] Launch button on detail page opens LabModal with iframe
- [ ] Escape key closes modal
- [ ] Click on scrim closes modal
- [ ] Body scroll locked while modal open
- [ ] Mobile: modal full-screen, detail page single column
- [ ] `generateStaticParams` covers all 4 slugs
