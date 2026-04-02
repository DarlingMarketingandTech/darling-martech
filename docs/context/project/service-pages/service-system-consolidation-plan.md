# Service System Consolidation Plan

Use this plan after Batch 1 implementation, linking cleanup, and proof alignment are complete.

## Goal
Make the service system cleaner and easier to understand **before** investing further in Batch 2 page builds.

This phase exists to answer:
- which remaining service pages are truly strategic next builds
- which older standalone pages are still valid but should be de-emphasized
- which legacy pages overlap too much with the new Batch 1 system
- what the real Batch 2 order should be

## What this phase is not
- not a homepage redesign
- not a `/services` layout redesign
- not another Batch 1 copy pass
- not a broad proof rewrite
- not a visual-first phase

## Inputs to use first
Prefer these compact files before rereading broader docs:
- `batch-1-service-status.json`
- `batch-2-service-priority-map.json`
- `parent-child-linking-kit.json`
- `service-proof-snippets.json`

Use `CLAUDE.md` only to confirm current runtime truth.

## Main questions to resolve

### 1. What should remain visibly emphasized now?
Check the current parent service surfaces and `/services` index.

The only service pages that should feel strongly foregrounded right now are:
- Batch 1 pages
- the clearest next-tier pages that do not overlap with Batch 1

### 2. Which pages are still valid but should be less prominent?
Examples likely to review:
- `brand-strategy`
- `the-conductor`
- other legacy/older architecture pages still present in data/runtime

### 3. Which pages should effectively merge into stronger current pages?
Most likely overlap candidates:
- `website-redesign-conversion-ux`
- any page whose job is already now covered by `website-strategy` or `conversion-optimization`

### 4. What is the true Batch 2 order?
Default recommendation:
1. `martech-audit`
2. `agentic-marketing-systems`
3. `geo-optimization`

But this phase should confirm whether that still fits the runtime system.

## Recommended output of the consolidation pass
The next implementation pass should ideally produce:
- a cleaner understanding of featured vs de-emphasized service pages
- tightened parent/child service surfaces if needed
- updated docs/status guidance for Batch 2
- no broad copy rewrites unless absolutely necessary

## Practical rules
- Prefer de-emphasizing over deleting.
- Prefer merging conceptually over keeping overlapping pages equally surfaced.
- Prefer buyer-readable slugs and labels over branded/internal naming.
- Prefer pages that map cleanly to the four current service clusters.

## Anti-patterns
- reviving legacy pages just because they already exist
- keeping overlapping pages equally prominent
- making Batch 2 larger before the service system is visually and structurally clear
- using specialty pages as primary front doors before the core service stack is stabilized

## Best follow-up sequence after this phase
1. service-system consolidation
2. lightweight visual support
3. Batch 2 page build(s)
4. optional `/services` polish if needed after visual support

## Prompting note
For a cheap Cursor or Claude pass, prefer reading:
1. `CLAUDE.md`
2. `batch-1-service-status.json`
3. `batch-2-service-priority-map.json`
4. target runtime files under `data/services.ts`, `app/services/**`, and `ServiceDetail/**`

Only fall back to longer planning docs if something essential is missing.
