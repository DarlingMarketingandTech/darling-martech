# AI Builder Operating Rules — Service Page System

This file is the compact operating layer for using the new service-page docs correctly.

Use it when an AI builder, Claude Code, Cursor, or another implementation agent is:
- rewriting `/services`
- building child service pages
- deciding which proof to attach to an offer
- deciding what content belongs on homepage vs services vs service detail pages
- translating strategy docs into runtime routes and content

## Primary rule

Do not invent a new service system.
Use the existing structure already defined in this folder.

The order of truth is:
1. runtime code and data in the repo
2. `CLAUDE.md`
3. docs in `docs/context/project/service-pages/`
4. supporting strategy docs elsewhere in `docs/`

## Decision rules

### 1. Homepage vs Services vs Sub-service page
Use this test:

- **Homepage** = orient the buyer, explain the model, show proof, point to the right next step
- **Services index** = explain the problem clusters and route users to the right child page
- **Sub-service page** = explain one service clearly enough to convert the right buyer
- **Work page** = prove capability
- **Tool page** = provide immediate value / self-diagnosis

If content tries to explain full service scope on the homepage, move it down.
If content tries to explain the whole business on a sub-service page, trim it.

### 2. Problem-led first
Every service page and service section must lead with:
- business problem
- why it matters
- what changes after it is fixed

Do not lead with:
- tooling lists
- internal category labels
- technical architecture jargon
- generic capability statements

### 3. Layered writing rule
Every service page should move through:
1. plain-English buyer language
2. strategic translator language
3. technical / specialist language

Do not reverse this order.
Do not ask users to choose a knowledge level.
Translate complexity instead.

### 4. One dominant claim per page
Each child service page should have:
- one main job
- one main buyer problem
- one dominant proof item
- one primary CTA

Do not make a page sell 3 services at once.

### 5. CTA logic
Default CTA for child service pages:
- `/contact?intent=service`

Secondary CTA:
- one relevant `/work` proof link
- a tool only if the tool naturally supports the service

Do not overload pages with multiple competing CTA directions.

### 6. Proof assignment rule
Use `service-proof-matrix.md` first.

When choosing proof:
- prefer the clearest operational or commercial proof, not the prettiest visual proof
- use one primary proof item per page
- use supporting proof only to add range or mechanism clarity
- do not attach unrelated or weakly relevant proof just to fill space

### 7. Services index rule
The `/services` page should not be a long flat list.
It should:
- define the 4 service clusters
- explain them in buyer language
- route to child pages
- support each cluster with a short proof anchor when useful

Use `services-index-reframe-notes.md` before changing `/services`.

### 8. Homepage rule
The homepage should not repeat the founder-positioning story in multiple sections.
The hero should carry the core positioning load.
Do not recreate the removed homepage About teaser in another section.

### 9. Route and slug rule
Child service routes should be:
- short
- plain-English when possible
- consistent with the current `/services/[slug]` architecture
- easy to understand in nav, breadcrumbs, and internal links

Do not create needlessly clever or highly abstract slugs.

### 10. Documentation sync rule
If a new content or architecture decision becomes real in code, update:
- `CLAUDE.md` if it affects the main project brain
- the relevant doc in `docs/context/project/service-pages/` if it changes how the service system works

Do not leave docs behind after runtime changes.

## Build sequence rule
When implementing the service system, build in this order:
1. top-priority child pages
2. `/services` index reframe
3. homepage/service alignment changes
4. secondary and specialty child pages

Do not build low-priority pages first just because they are interesting.

## Files to consult first
- `README.md`
- `service-page-template.md`
- `service-proof-matrix.md`
- `service-page-implementation-tracker.md`
- `services-index-reframe-notes.md`
- the relevant individual page brief

## Anti-patterns
Avoid these patterns in future work:
- homepage content repeating service-page detail
- service pages that read like jargon dictionaries
- multiple CTAs stacked in the same block
- proof used without explaining why it is relevant
- creating a new service category without retiring or restructuring an old one
- adding "cool" UI patterns that weaken readability

## Use case
If an AI agent is unsure how to structure a page:
- use the service-page template
- use the proof matrix
- prefer plain language first
- keep one service page to one clear job
- update `CLAUDE.md` if the decision changes project-wide behavior