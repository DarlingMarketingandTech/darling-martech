# Lightweight Visual Support Phase Plan

Use this plan after Batch 1 service pages, service linking, and proof alignment are complete.

## Goal
Reduce text density and make service pages feel more tangible **without redesigning the site**.

## Core strategy
- **Cloudinary first** for real proof, real screens, real client work, and real deliverables.
- **Pexels/stock second** only for light atmospheric support where no real proof image exists.
- Add **one strong visual moment per Batch 1 service page** before attempting anything broader.

## What to build

### Step 1 — Add small data fields
Prefer adding compact optional fields in `data/services.ts`, such as:
- `supportImagePublicId?: string`
- `supportImageAlt?: string`
- `supportImageCaption?: string`
- `supportImageWorkSlug?: string`

These should support one image-led proof panel on a service page.

### Step 2 — Add one reusable visual-support block to `ServiceDetailPage`
The block should:
- sit near the proof area or between summary and proof stats
- support one primary image
- allow one short caption
- optionally link to the canonical `/work/[slug]`
- stay subordinate to the page architecture

Do **not** add a carousel, slider, or multiple competing media regions.

### Step 3 — Populate Batch 1 pages
Use `service-visual-support-map.json` and `service-proof-snippets.json` to choose the best media per page.

Priority order:
1. `website-strategy`
2. `crm-architecture`
3. `conversion-optimization`
4. `local-seo`
5. `fractional-cmo`

## Best asset types by page

### `website-strategy`
Best visual: real site screen from Pike Medical.

### `crm-architecture`
Best visual: dashboard/workflow/system screen from Graston Growth Engine.

### `conversion-optimization`
Best visual: ordering/booking/action-flow screen from 317 BBQ.

### `local-seo`
Best visual: local service-page / trust-signal / local-presence screen from Russell Painting.

### `fractional-cmo`
Best visual: real system/dashboard/operating view from Graston or a related strategy artifact.

## Cloudinary guidance
Use Cloudinary for:
- site screens
- dashboard screens
- device-framed proofs
- derived crops of real work
- higher-resolution replacement logos and brand assets

Avoid using low-resolution raster logos as the main proof media.

## Pexels guidance
Use Pexels only for:
- subtle process atmosphere
- editorial breathing room
- restrained support image zones where no real proof image is available

Do **not** use Pexels for:
- case-study proof
- dashboard proof
- fake screenshots
- service page primary evidence

## Anti-patterns
- turning service pages into galleries
- replacing real proof with generic stock
- using more than one primary visual block per service page
- adding autoplay motion or carousels
- introducing a new visual system before testing the first reusable block

## Suggested implementation order
1. Add data fields
2. Add one reusable proof-image/support block in `ServiceDetailPage`
3. Implement `website-strategy`
4. Implement `crm-architecture`
5. Implement `conversion-optimization`
6. Implement `local-seo`
7. Implement `fractional-cmo`
8. Reassess whether more visual support is even needed

## Validation rule
After each service visual implementation:
- confirm image quality is acceptable on desktop and mobile
- confirm page still reads clearly without the image
- confirm proof hierarchy is not weakened
- confirm build passes

## Prompting rule
For future Cursor/Claude passes, prefer reading:
1. `CLAUDE.md`
2. `service-visual-support-map.json`
3. `service-proof-snippets.json`
4. the target runtime files

Only fall back to broader docs if needed.
