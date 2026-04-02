# Post–Batch 2 refinement — Cursor brief

Use this helper pack for the next Darling MarTech refinement passes.

## Read first
1. `CLAUDE.md`
2. `docs/context/project/work-pages/work-index-refinement-map.json`
3. `docs/context/project/work-pages/work-proof-priority-map.json`
4. `docs/context/project/work-pages/work-detail-page-template.md`
5. `docs/context/project/homepage/homepage-proof-polish-map.json`

Then read only the target runtime files for the pass you are running.

---

## What this phase is
A narrow refinement phase focused on:
- `/work`
- `/work/[slug]`
- light homepage proof/trust polish

## What this phase is not
- not a homepage redesign
- not a new site architecture
- not a service-system rewrite
- not a broad copy rewrite
- not a new taxonomy build

## Working rule
Run **one pass at a time**.
Do not combine all three passes unless explicitly asked.

---

# Pass A — `/work` index clarity and simplification

## Read next
- `app/work/page.tsx`
- `components/sections/WorkIndex/*`
- `data/work/work-index.ts`
- related CSS Modules only if needed

## Goal
Make `/work` feel calmer, more hierarchical, and more proof-led.

## Direction
- reduce dashboard-like clutter
- make flagship proof more dominant
- keep supporting proof compact
- keep system-child work clearly subordinate to parent engagements
- preserve one calm browsing surface only
- keep studio support lower and lighter

## Constraints
- no redesign
- no new filter system
- no new architecture
- no homepage or services edits in this pass
- prefer component/CSS cleanup over data churn

## Deliverables
- minimal code changes
- validation if possible (`npm run build`)
- report files changed, what changed, why, what was not changed

---

# Pass B — `/work/[slug]` detail-page alignment

## Read next
- `app/work/[slug]/page.tsx`
- `components/sections/WorkDetail/*`
- `data/work/work-data.ts`
- `lib/work.ts`
- related CSS Modules only if needed

## Goal
Make work detail pages read more like business case studies and less like mixed-format portfolio entries.

## Direction
- use the right template weight for the right slug
- keep flagship pages on the full business-story template
- keep narrower system-child pages compact and clearly tied to parent context
- strengthen service routing and related-proof discipline
- keep proof media tied to the narrative role

## Constraints
- no mass rewrite of all case studies in one pass
- do not force every slug into the same section architecture
- do not add heavy new UI regions
- do not change canonical slug structure

## Deliverables
- narrow template/content/section adjustments
- validation if possible
- report files changed, why, and what stayed out of scope

---

# Pass C — light homepage proof/trust polish

## Read next
- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/Services.tsx`
- `components/sections/CaseStudies.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/ContactCTA.tsx`
- related CSS Modules only if needed

## Goal
Make the homepage more decisive without changing its core section order.

## Direction
- sharpen hero clarity
- strengthen trust through tighter proof framing, not more modules
- make the case-studies teaser feel more selected and less mechanical
- preserve the current homepage flow

## Constraints
- no redesign
- no new major sections
- do not recreate AboutTeaser on the homepage
- do not change primary CTA logic unless explicitly asked

## Deliverables
- minimal polish pass
- validation if possible
- report files changed, why, and what was intentionally not changed

---

## Best sequence
1. Pass A — `/work` index
2. Pass B — `/work/[slug]`
3. Pass C — homepage

That order preserves the site hierarchy:
- first improve the main proof surface
- then tighten the proof detail pages
- then polish how the homepage hands visitors into that proof
