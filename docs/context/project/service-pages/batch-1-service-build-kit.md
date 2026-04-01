# Batch 1 Service Build Kit

Use this file with `batch-1-service-build-kit.json` to reduce repeated planning/context reads during Batch 1 service-page implementation.

## Why this exists
The full service-page docs are still the source of truth, but they are expensive to reread on every focused page build.

This kit exists to make repeated Claude Code passes cheaper and more consistent by storing:
- canonical Batch 1 page order
- proof hierarchy
- signs-you-need-it seeds
- deliverable seeds
- FAQ seeds
- sibling-link suggestions
- page-intent and summary direction

## Files in this mini-kit
- `batch-1-service-build-kit.json`
- this file

## What this kit is for
Use it when building or refining:
- `/services/website-strategy`
- `/services/crm-architecture`
- `/services/local-seo`
- `/services/conversion-optimization`

It can also be used as a pattern reference after `fractional-cmo` is live.

## What this kit is not for
Do not use it to replace:
- `CLAUDE.md`
- `service-page-template.md`
- `service-proof-matrix.md`
- `ai-builder-operating-rules.md`

If a conflict exists, those files win.

## Minimal-read workflow for Claude Code
For a focused Batch 1 service-page pass, Claude Code should read:
1. `CLAUDE.md`
2. `docs/context/project/service-pages/service-page-template.md`
3. `docs/context/project/service-pages/service-proof-matrix.md`
4. `docs/context/project/service-pages/batch-1-service-build-kit.json`
5. the target runtime files (`data/services.ts`, `app/services/[slug]/page.tsx`, and `ServiceDetailPage` files if needed)

That is usually enough for a focused copy/data-layer pass.

## Recommended use pattern
For each Batch 1 page:
- use the JSON seed for summary direction, signs, deliverables, FAQ, proof, and siblings
- only edit the target service entry unless a tiny consistency fix is required
- keep proof canonical to `/work`
- keep CTA routing to `/contact?intent=service`
- keep changes narrow and page-specific

## Batch 1 order
1. `fractional-cmo` — implemented reference pattern
2. `website-strategy`
3. `crm-architecture`
4. `local-seo`
5. `conversion-optimization`

## Suggested follow-up after Batch 1
After all Batch 1 pages are implemented:
- run a parent/child service linking pass
- run a proof alignment pass
- run a lightweight visual-support pass
- then move to Batch 2 pages

## Prompt shortcut note
When using this kit, prompt Claude Code to:
- read only the minimal core docs plus the build-kit JSON
- avoid rereading all service-page planning docs unless the target page requires it
- treat the JSON as structured seeds, not final copy

## Maintenance rule
If a Batch 1 page is materially changed in strategy, update the JSON kit so future page passes keep using the latest version.