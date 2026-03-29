# Implementation Phase Roadmap

This file turns the current layered content strategy into a practical build sequence.

Use it to decide what to build next, in what order, and why.

## Primary rule
Build the runtime site in the same order the information architecture is supposed to work.

That means:
1. homepage orientation
2. services routing layer
3. priority child-service pages
4. proof/linking alignment
5. secondary/specialty pages

Do not start with lower-priority specialty pages just because they are interesting.

## Phase 1 — Homepage tightening
### Goal
Make the homepage align with the new layered content strategy.

### Work
- remove or keep removed the redundant homepage About teaser
- strengthen the hero so it carries the positioning load
- make the hero more problem-led and buyer-readable
- reframe the services intro around bottlenecks and problem clusters
- keep homepage section roles distinct

### Success criteria
- homepage is less repetitive
- hero explains who / what / why clearly
- services intro does not repeat the hero
- homepage routes users more cleanly into `/services`, `/work`, `/tools`, or `/contact`

## Phase 2 — Services index reframe
### Goal
Make `/services` reflect the new cluster system and route users to the right child pages.

### Work
- rewrite services intro using `services-index-copy-deck.md`
- frame the 4 clusters around buyer problems first
- add child-page route blocks per cluster
- attach one supporting proof anchor per cluster where useful
- keep CTA path coherent

### Success criteria
- `/services` explains problem clusters clearly
- users can see which cluster fits them
- page routes to child pages without overload

## Phase 3 — Top 5 child-service pages
### Goal
Build the highest-value child-service pages first.

### Build order
1. Fractional CMO / Strategic Leadership
2. Website Strategy & Rebuilds
3. CRM Architecture
4. Local SEO
5. Conversion Optimization

### Success criteria
Each page includes:
- clear H1
- plain-English opener
- why it matters
- signs you need it
- what it usually includes
- technical scope
- proof block
- FAQ
- `/contact?intent=service` CTA

## Phase 4 — Linking + proof pass
### Goal
Make the service, work, tool, and contact system reinforce itself.

### Work
- add service-to-work links intentionally
- add proof blocks using the proof snippet library
- align CTA intent routing
- use `internal-linking-map.md`

### Success criteria
- every top child-service page has one primary proof link
- relevant work pages link back to the service they prove
- tool pages only link to relevant services

## Phase 5 — SEO + metadata pass
### Goal
Make the new pages durable for search and easier to understand.

### Work
- title + description
- FAQ cleanup
- clearer H2 structure
- internal linking audit
- search-intent support language

### Success criteria
- pages are structurally sound for SEO
- headings match page purpose
- FAQ blocks support search intent and objections

## Phase 6 — Batch 2 service pages
### Build order
6. Workflow Automation
7. Marketing Audit & Growth Roadmap
8. Lead Generation Systems
9. Positioning & Messaging Strategy
10. Sales Enablement Systems

## Phase 7 — Contact page trust polish
### Goal
Improve the commitment moment around the already-strong intake flow.

### Work
- trust anchors on left column
- better visual balance
- refine success-state presentation
- clarify what happens next

## Phase 8 — Secondary / specialty pages
Build:
- Website Ownership & Optimization
- Brand Identity Systems
- Internal Tools & AI Workflows
- GEO / AI Search Readiness
- Content & Demand Systems
- Go-to-Market / Launch Strategy
- Reporting & Decision Systems

## Docs to use in each phase

### Homepage work
- `homepage-copy-deck.md`
- `homepage-hero-and-services-alignment.md`

### Services index work
- `services-index-copy-deck.md`
- `services-index-reframe-notes.md`

### Child-service page work
- individual page briefs
- `priority-service-page-copy-deck.md`
- `service-page-template.md`
- `service-proof-matrix.md`
- `proof-snippet-library.md`
- `internal-linking-map.md`

### Implementation sequencing
- `service-page-implementation-tracker.md`
- `ai-builder-operating-rules.md`

## Use case
Use this file before starting the next implementation PR so the work moves in the right order and stays aligned with the broader system.