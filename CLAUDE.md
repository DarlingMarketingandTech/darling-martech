# Darling MarTech — Project Brief for Claude Code

## About This File
This is the master project brief for the Darling MarTech website build.
Read this file in full before doing any work. Every decision about design,
copy, architecture, and tone should reference this document.
Canonical tools/skills routing reference: `docs/tools-and-skills-map.md`.

### How to Use This File
- Read in this order before touching code: `Master Context Policy` -> strategy/IA snapshots -> route/data architecture -> gotchas.
- Canonical truth order for conflicts: runtime code/data (`app/`, `components/`, `data/`, `lib/`) -> this file -> archived/context docs.
- Keep this file practical: remove stale migration notes once they stop affecting implementation choices.
- Update this file immediately when route behavior, tool inventory, nav structure, offer packaging, or CTA intent logic changes.

> **Skill files:** Extended design, redesign-audit, and copy instructions
> live in `skills/` (co-located in this repo) AND in the Claude OS:
> `C:\Users\hoosi\ClaudeOS\taste-skill-main\`
> - `skills/darling-martech-ui/SKILL.md` — Design system, component library, motion
> - `skills/darling-martech-redesign/SKILL.md` — Audit protocol for upgrading AI-looking code
> - `skills/darling-martech-copy/SKILL.md` — Voice, CTAs, error messages, microcopy
> - `skills/darling-martech-data/SKILL.md` — Data model patterns for services/work/labs/testimonials
> - `skills/darling-martech-labs/SKILL.md` — Lab lifecycle, integration, and linking rules
> - `skills/darling-martech-seo/SKILL.md` — SEO, metadata, schema, and search-oriented content guidance
> - `skills/darling-martech-services/SKILL.md` — Service page architecture, build order, layered writing rule, proof assignment (replaces old Enhanced Plan v2 three-tier skill)
> - `skills/darling-martech-homepage/SKILL.md` — Homepage section roles, hero rules, CTA routing, drift prevention
> - `skills/darling-martech-proof/SKILL.md` — Proof assignment, canonical metrics, slug list, proof block structure
>
> See `skills/README.md` for the full skill index and when to use each.

> **Claude Code support layer (repo-local):**
> - Subtree guidance for focused `/work` edits:
>   - `components/sections/WorkIndex/CLAUDE.md`
>   - `components/sections/WorkDetail/CLAUDE.md`
>   - `data/work/CLAUDE.md`
> - Preferred `/work` skill: `skills/darling-martech-work/SKILL.md`
> - Claude Code prompt templates: `docs/context/project/prompts/`
> - Lightweight reminders/hooks: `.claude/hooks/` (wired via `.claude/settings.json`)

---

## Master Context Policy (Single-File Workflow)
`CLAUDE.md` is the single master operating brief for Claude work in this repo.

The docs below are still kept for traceability and deep reference, but their
core directives are consolidated here:

- `docs/REPO-OPTIMIZATION-PLAN.md`
- `docs/context/README.md`
- `docs/context/project/*`
- `docs/context/strategy/*`
- `docs/context/repo/*`
- `docs/archive/outputs/marketing-strategy-service.md`

Conflict rule:
1. Runtime code and data (`app/`, `components/`, `data/`, `lib/`) win.
2. This `CLAUDE.md` file is the default instruction layer.
3. Archived/context docs are reference material unless this file explicitly
   elevates a rule from them.

### Consolidated Strategy Snapshot
- Positioning: **high strategic depth + high technical depth** for SMB buyers.
- Core commercial frame: strategy + implementation + measurement under one
  accountable owner.
- Priority buyer sequence:
  1. Burned Founder
  2. Scaling Operator
  3. Tech-Confused CMO
  4. Ambitious Newcomer
- Offer ladder: audit -> foundation/build-out -> retainer.
- Delivery model for strategy-led engagements (from archived strategy draft):
  - Phase 1: Audit and strategy (`4-8 weeks`)
  - Phase 2: Build and execution (ongoing)
- Pricing guardrails (outcome-based, never hourly):
  - Audit entry: `$1.5k-$5k` (MarTech Audit anchor: `$2k-$5k`)
  - Foundation/build projects: `$4k-$30k+` depending on scope
  - Retainers: `$3.5k-$12k/month` depending on engagement model
- Messaging hierarchy for commercial pages:
  1. Business problem
  2. Why alternatives failed
  3. What Darling MarTech does differently
  4. Proof
  5. Offer-specific CTA

### Consolidated IA / Page Strategy Snapshot
- Live core pages: `/`, `/services`, `/services/[slug]`, `/work`,
  `/work/[slug]`, `/tools`, `/tools/[slug]`, `/tools/cmo-simulator`, `/tools/attribution-snapshot`, `/about`,
  `/contact`, `/studio`, `/process`.
- `/lab` is legacy — permanent redirects to `/tools/*` are in place. `/lab` is
  not a public concept. Do not reference `/lab` routes in new work.
- `/tools` role: self-serve strategy layer. Four visitor utilities — CMO Simulator,
  GEO Readiness Auditor, CMO Roadmap Generator, Attribution Snapshot — that deliver immediate value and
  qualify prospects in the process. Not a portfolio. Not a build archive. Not proof.
  `/tools` is where a prospect runs their own strategy session and walks out with both
  an artifact and a reason to call.
- `/work` role: proof of capability — client builds with measurable outcomes.
  A prospect evaluates these; they do not use them. Curated, not exhaustive.
Work index layout: flagship studies first, supporting grid, connected-system strips
 under parents, then a restrained studio strip (horizontal track). Flagship block
 includes a short editorial intro label; both flagship and supporting cards use a
 compact layout (one primary metric) with tier/category badges and extra footer meta
 removed to keep the grid calmer and more proof-led. Studio carousel does not
 auto-advance; horizontal scroll is confined to the track (no document
 `scrollIntoView`) so smooth scroll (Lenis) is not hijacked.
- Phase 3D classification decisions (2026-03-28):
  - Core tools (permanent, primary): CMO Simulator, GEO Readiness Auditor,
    CMO Roadmap Generator, Attribution Snapshot. These are the current entries on `/tools`.
  - Removed from `/tools` index: Graston Growth Engine, Barbershop Command Center,
    Smart Sales & Pricing Tool, Investment ROI Planner, Clinical Compass,
    License Requirements Navigator. These are `/work` entries — client builds, not
    visitor utilities. Orphaned `/tools/[slug]` routes for these should redirect to
    their corresponding `/work/[slug]` pages.
  - Removed entirely: PRO DJ Studio, Strum AI. Personal builds with no client
    connection. Not surfaced on `/tools`. No work equivalent — these can 404 or
    redirect to `/tools`.
- Tool access model (Phase 3D):
  - CMO Simulator: dedicated route `/tools/cmo-simulator` with detail page + launch modal.
    This is the target pattern for any future tool requiring SEO or explanation.
  - GEO Readiness Auditor: dedicated route `/tools/geo-readiness-auditor` with detail page + direct audit flow.
  - CMO Roadmap Generator: modal/iframe launch from `/tools` index.
  - Attribution Snapshot: dedicated route `/tools/attribution-snapshot` with in-page client-side CSV analysis and model comparison. Phase 1 is intentionally directional — no GA4 auth or persisted attribution store yet.
    Static routes remain the preferred pattern while tool count is small and heterogeneous.
  - `app/tools/[slug]/` is intentionally not used today. Re-evaluate only if tool inventory
    grows enough to justify a shared schema and templated UX.
- Planned priority pages/routes:
  - child-service money pages under current service parents
  - `/industries/[slug]` after child service pages
  - `/pricing` later
- Batch 1 child-service execution (complete 2026-04-01): `fractional-cmo`, `website-strategy`,
  `crm-architecture`, `local-seo`, `conversion-optimization` — all shipped with copy + linking + proof alignment.
- Confirmed Batch 2 build order (post-consolidation audit 2026-04-01; Batch 1 lightweight visual support complete 2026-04-01) — **suggested trio shipped 2026-04-01**:
  1. `martech-audit`
  2. `agentic-marketing-systems`
  3. `geo-optimization` (nested `/services/growth/geo-optimization`; specialty relative to Batch 1 growth pages)
- **Post–Batch 2 refinement (complete 2026-04-01):** consolidation sanity + proof-link hygiene — `parent-child-linking-kit.json` now includes growth `geo-optimization` child + `children.geo-optimization`; legacy standalones **the-fortress**, **brand-strategy**, and **website-redesign-conversion-ux** use specific `secondaryCtaHref` targets (`/work/the-fortress`, `/work/hoosier-boy-barbershop`, `/work/317-bbq`) instead of generic `/work`; **`/tools/graston-growth-engine` → `/work/graston-growth-engine`** redirect in `next.config.js` so Growth Engine proof-tool internal links resolve (mirrors legacy `/lab/graston-growth-engine` behavior).
- **Next likely phase:** strategic site expansion when scoped — e.g. `/industries/[slug]`, `/pricing`, or other content — not another service batch unless explicitly chartered.
- Sub-service routes: plain-English slugs under `/services/[slug]`. See `service-route-and-slug-conventions.md`.
- Internal linking minimums:
  - Every service page: link to `/contact` + at least 2 relevant work pages.
  - Every work page: link to the service page it proves (Batch 1 flagship pairings use `primaryServicePageSlug` on `work-index` entries → one contextual link on the work detail hero from `WorkDetailContent`).
  - Work detail pages now apply proof-weight templates (flagship longform / supporting standard / system-child compact|expanded) and end with a single route-out set: one service link + up to 2 related proof links (prev/next + related grid de-emphasized/removed). Hero openings now follow problem → intervention → proof signal, with system-child pages leading with system role + outcome.
  - Every tools page: exactly 1 primary service link + 1 supporting work link.
- Homepage/services alignment rule:
  - Hero carries the core positioning load (problem + promise + model).
  - Services section frames problem clusters and routes to child pages — not a repeat of the hero.
  - `<AboutTeaser />` is removed from the homepage (`app/page.tsx`). Do not recreate it or its
    job in any other homepage section. The hero now carries the full positioning load.
  - Homepage flow (implemented): Hero → Services → FeaturedTool → CaseStudies → Testimonials → ContactCTA.
  - Hero primary CTA routes to `/work`. Secondary CTA routes to `/contact?intent=unsure`.
  - Services section headline and card summaries are problem-led (updated 2026-03-29).
  - Homepage proof polish: hero copy tightened for operator clarity; the case studies rail is now a selected-teaser format with a single dominant metric per card for faster scanning.
  - Consult `docs/context/project/service-pages/homepage-hero-and-services-alignment.md` before
    changing the hero or services section.

### Contact / Intake Flow Strategy (Phase 4E-2, 2026-03-29)
**Role of `/contact`:** Qualified consultation request screen. Not a general
inquiry form. Its job is to convert a pre-qualified visitor into a replied-to
conversation with enough context for Jacob to respond usefully within 24 hours.

**Intake model: Two-step progressive disclosure**
- Step 1 — Intent selector tiles (4 options, not a dropdown):
  1. "I know what I need" — from services, has a clear ask
  2. "I saw something in your work" — proof-driven visitor
  3. "I just ran a tool" — has a tool artifact, wants next steps
  4. "I'm not sure yet" — exploring, low-confidence
- Step 2 — Minimal form, fields adapted by selected tile

**Minimum fields (always):** name, email, primary challenge (free text)
**Optional always:** company / website
**Conditional:** service dropdown (only if tile = "I know what I need");
  short tool-output field (only if tile = "I just ran a tool")
**Never ask up front:** budget, timeline, project type

**Query param routing:** Accept `?intent=` to pre-select a tile on arrival.
Use these across the site:
  - `/tools` post-tool CTA → `/contact?intent=tool`
  - Service/audit CTAs → `/contact?intent=service`
  - `/work` detail CTAs → `/contact?intent=work`
  - General exploratory CTAs → `/contact?intent=unsure`

**Post-submit:** Stay on-page (swap form for success state). Success state
confirms the action and response promise, then offers one next-step link based
on intent:
  - service intent → `/work` ("See relevant work")
  - work intent → `/work` ("Explore all case studies")
  - tool intent → `/tools` ("Revisit the tools")
  - unsure intent → `/process` ("See how I run these conversations")

**Page structure:** Short positioning line → intent tiles → minimal form →
trust micro-copy under submit ("No pitch. Just a real conversation.") →
email escape valve at bottom. No full marketing hero or heavy 3D scene by default.
Contact page closes;
other pages sell.

**Implementation scope:** ✅ Fully implemented via `ContactForm.tsx` + `app/contact/page.tsx`
+ `/api/contact/route.ts`. API supports: `intent`, `service`, `toolOutput` fields.
No additional routes, data files, or API routes required.

### Service Page System (2026-04-01 — foundation pass complete)

> Canonical planning and implementation docs now live in `docs/context/project/service-pages/`.
> Consult that folder before any `/services` or child-service page work.

#### Batch 1 canonical child-service slugs (foundation normalized 2026-04-01)

These 5 slugs are now clean in `data/services.ts` and resolve via the dynamic route:

- `fractional-cmo` — Fractional CMO & Embedded Marketing Leadership
- `website-strategy` — Website Strategy & Rebuilds (**new** — canonical Batch 1 entry)
- `crm-architecture` — CRM Architecture & Marketing Systems (**new**)
- `local-seo` — Local SEO & Search Visibility (**new**)
- `conversion-optimization` — Conversion Optimization (**new**)

Additional standalone entries remain in `standaloneServicePages` with their own routes.
**Batch 2 (in order) — core trio complete 2026-04-01:** ✅ **`martech-audit`** — layered summary, 7 `signsYouNeedIt`, 6 deliverables, 5 `faqItems`, proof **Graston Technique → Graston Growth Engine → The Compass**, `secondaryCtaHref` `/work/graston-technique`, `relatedServiceSlugs` `crm-architecture`, `fractional-cmo`, `website-strategy`, CMO Simulator `proofTools`, `layer: strategy`, strategy parent `childServiceSlugs` `['martech-audit', 'fractional-cmo']`. ✅ **`agentic-marketing-systems`** — nested `/services/systems/agentic-marketing-systems`; title `Agentic Marketing Systems & Internal Workflow Leverage`, 7 `signsYouNeedIt`, 6 deliverables, 5 `faqItems`, proof **Graston Growth Engine** (primary) → **Barbershop Command Center** → **The Launchpad**, `proofWorkSlugs` those three; `secondaryCtaHref` `/work/graston-growth-engine`; `relatedServiceSlugs` `crm-architecture`, `custom-tools-workflow-products`, `martech-audit`; Graston Growth Engine `proofTools` retained; `layer: build` (systems parent). ✅ **`geo-optimization`** — nested `/services/growth/geo-optimization`; title `GEO & Discoverability Readiness`, layered summary (buyer discoverability shift → strategic clarity → GEO as working label), 7 `signsYouNeedIt`, 6 deliverables, 5 `faqItems`; **Related proof** grid is work-only: **Russell Painting** (primary) → **Pike Medical Consultants** (supporting); `proofWorkSlugs` `['russell-painting', 'pike-medical-consultants']`; `secondaryCtaHref` `/work/russell-painting`; `relatedServiceSlugs` `local-seo`, `website-strategy`, `martech-audit`; GEO Readiness Auditor remains optional `proofTools` (self-diagnostic; `internalCtaLabel` removed — no `/tools/[slug]` detail route for this tool). ✅ **`custom-tools-workflow-products`** — nested `/services/systems/custom-tools-workflow-products`; title `Custom Tools & Workflow Products`; layered summary; 7 `signsYouNeedIt`, 6 deliverables, 5 `faqItems`; proof **Graston Growth Engine** (primary) → **Barbershop Command Center** (supporting); `proofWorkSlugs` those two; `secondaryCtaHref` `/work/graston-growth-engine`; `relatedServiceSlugs` `crm-architecture`, `agentic-marketing-systems`, `martech-audit`; Growth Engine `proofTools`; `layer: build`; systems parent `childServiceSlugs` includes this slug after `agentic-marketing-systems`. **`crm-architecture`** `relatedServiceSlugs` (integration pass): `agentic-marketing-systems`, `custom-tools-workflow-products`, `fractional-cmo`. **Valid but de-emphasized in related-service surfacing (consolidation audit 2026-04-01):**
`website-redesign-conversion-ux` (conceptual overlap with `website-strategy` + `conversion-optimization`;
related links now point to those Batch 1 pages), `the-conductor` (legacy/internal naming; related links
now point to Batch 1 growth/measurement-adjacent pages), `brand-strategy` (real offer; related links
now favor Batch 1 siblings over parent-category filler). **`the-fortress`** stays a nested systems proof
page. These are not treated as conflicting with Batch 1 — routes stay live; emphasis is via linking and
cluster choices, not deletion.

#### Service data architecture (current)

- `serviceDetails` — 6 parent service entries (strategy, brand-web, systems, growth, commerce, specialized)
- `standaloneServicePages` — standalone entries including all 5 Batch 1 slugs plus Batch 2 `martech-audit`, `agentic-marketing-systems`, `geo-optimization`, and `custom-tools-workflow-products` (systems specialty; shipped 2026-04-02)
- `allServicePages` — combined array used by `getServicePageBySlug()` and `generateServiceStaticParams()`
- Optional **proof visual support** on any service page: `supportImagePublicId`, `supportImageAlt`, `supportImageCaption`, `supportImageWorkSlug` (Cloudinary-first, one image max; Batch 1 entries populated per `service-visual-support-map.json`)
- `generateServiceStaticParams()` excludes entries with a nested `routePath` — those 5 entries
  (`geo-optimization`, `agentic-marketing-systems`, `custom-tools-workflow-products`, `the-fortress`, `the-conductor`) use nested routes
  and are intentionally excluded from the flat `[slug]` dynamic route

#### ServiceDetailPage.tsx template sections (as of 2026-04-01)

The component now renders these sections in order when data is present:

1. Back nav + parent breadcrumb
2. Hero (eyebrow, H1, tagline, summary, CTA)
3. Pricing signal (optional)
4. **Proof visual support** (optional — one Cloudinary image + caption + link to `/work/[slug]` when `supportImagePublicId` + `supportImageAlt` are set; Batch 1 pages populated; subordinate to proof cards below)
5. Proof stats / audit snapshot (optional)
6. **Signs you need this** (optional — `signsYouNeedIt?: string[]`)
7. **What this usually includes** (deliverables list)
8. **Common questions** FAQ accordion (optional — `faqItems?: FaqItem[]`)
9. **Related proof** (proof grid linking to work pages)
10. Proof tool card (optional)
11. Related case studies (optional — from `proofWorkSlugs`)
12. Featured offers / child services (optional — parent pages only)
13. Related services (optional)
14. Tag row
15. CTA strip

The `signsYouNeedIt` and `faqItems` fields are new — they are optional and gracefully
absent for existing entries. Fill them in the copywriting pass for each Batch 1 page.

#### Stale references fixed (2026-04-01)

- `systems` parent proof card: `/lab` href → `/work/graston-growth-engine`
- `fractional-cmo` standalone: `externalCtaHref` `/lab/cmo-simulator` → `/tools/cmo-simulator`

#### Page-role logic

- **Homepage** — orient the right buyer fast; hero carries the core positioning load
- **Services index** — explain problem clusters and route users to the right child page
- **Sub-service pages** — explain one service clearly enough to convert the right buyer
- **Work pages** — prove capability
- **Tools** — immediate value / self-diagnosis
- **Contact** — qualified conversation request

#### Layered writing rule

Service pages must move through content in this order:

1. Plain-English buyer language (what is broken, what this fixes, why it matters)
2. Strategic translator language (how strategy, systems, execution, and growth connect)
3. Technical / specialist language (architecture, automation, CRM, SEO, tooling specifics)

Do not reverse this order. Do not ask visitors to choose a knowledge level. Translate complexity instead.

#### CTA rule

- Default child-service CTA: `/contact?intent=service`
- Supporting CTA: one relevant `/work` proof page
- Tool link: only when naturally relevant to the service — not forced

#### Proof assignment rule

Use `service-proof-matrix.md` first when assigning proof to a service page:

- One dominant proof item per service page
- Supporting proof only when it adds range or mechanism clarity
- Do not attach weak or visually similar but strategically irrelevant proof

#### Build sequence

- ✅ Foundation pass complete (2026-04-01) — data layer, route integrity, template structure
- ✅ `/services/fractional-cmo` copywriting pass complete (2026-04-01) — Batch 1, page 1
  - Summary rewritten following layered writing rule (plain-English buyer → strategic → operational)
  - 7 `signsYouNeedIt` bullets added (diagnostic, symptom-led)
  - 5 `faqItems` added (what is it, vs agency, implementation scope, small teams, engagement length)
  - Deliverables tightened — more specific and commercially legible
  - Proof reordered: **Graston Technique is primary** (strategy + systems), Pike Medical supporting (long-term CMO stewardship)
  - `proofWorkSlugs`: `['graston-technique', 'pike-medical-consultants']`
  - `secondaryCtaHref`: `/work/graston-technique`
  - CMO Simulator remains as `proofTools` — supporting tool, not primary CTA
  - `relatedServiceSlugs` (linking pass): `['website-strategy', 'crm-architecture']`
- ✅ `/services/website-strategy` copywriting pass complete (2026-04-01) — Batch 1, page 2
  - Summary rewritten following layered writing rule (buyer problem → strategic model → how it works)
  - 7 `signsYouNeedIt` bullets added (symptom-led, buyer-recognizable)
  - 5 `faqItems` added (rebuild vs refresh, platform compatibility, content/structure scope, measuring success, site size)
  - Deliverables tightened — 6 items focused on strategy, hierarchy, trust, and conversion path
  - Proof reordered: **Pike Medical Consultants is primary** (trust + healthcare rebuild), Tuohy Bailey & Moore supporting (trust-led redesign), Riley Bennett Egloff supporting (long-term stewardship)
  - `proofWorkSlugs`: `['pike-medical-consultants', 'tuohy-bailey-moore', 'riley-bennett-egloff']`
  - `secondaryCtaHref`: `/work/pike-medical-consultants`
  - `relatedServiceSlugs` (linking pass): `['conversion-optimization', 'fractional-cmo']`
- ✅ `/services/crm-architecture` copywriting pass complete (2026-04-01) — Batch 1, page 3
  - Summary rewritten following layered writing rule (CRM is live but not trusted → structure problem → systems model)
  - 7 `signsYouNeedIt` bullets added (symptom-led: trust, stages, manual follow-up, reporting, ownership, data quality, usability)
  - 5 `faqItems` added (what is CRM architecture, current platform, build vs recommend, CRM vs sales-process, team size)
  - Deliverables tightened — 6 items: audit, lifecycle/pipeline design, routing/handoff, field cleanup, automation logic, dashboard visibility
  - Tagline updated to be more buyer-direct ("Having a CRM is not the same as having a system you can actually run from.")
  - Proof hierarchy: **Graston Growth Engine is primary** (full-stack systems proof), Barbershop Command Center supporting (operational integration); redundant Graston Technique parent card removed in proof-alignment pass so the CRM story stays centered on the Growth Engine + ops proof.
  - `proofWorkSlugs` updated: `['graston-growth-engine', 'barbershop-command-center']`
  - `relatedServiceSlugs` (linking pass): `['fractional-cmo', 'conversion-optimization']`
  - `proofTools` retained (Graston Growth Engine live demo card)
- ✅ `/services/local-seo` copywriting pass complete (2026-04-01) — Batch 1, page 4
  - Summary rewritten following layered writing rule (local visibility underperforms → trust + structure problem → strategic model)
  - Tagline updated to be more specific ("easier to find — and easier to trust")
  - 7 `signsYouNeedIt` bullets added (symptom-led: competitor visibility, Google Business, weak action rate, thin pages, unclear priorities, offline/online gap, trust signals not working together)
  - 5 `faqItems` added (what local SEO includes, vs technical SEO, location pages, timeline, traffic already exists)
  - Deliverables tightened — 6 items: audit, page direction, Google Business/local signals, internal linking/content priorities, review/trust strategy, measurement
  - Proof hierarchy: **Russell Painting is primary** (trust + local search lead engine), Hoosier Boy Barbershop supporting (#1 local search), Pike Medical supporting (multi-location)
  - `proofWorkSlugs` updated: `['russell-painting', 'hoosier-boy-barbershop', 'pike-medical-consultants']`
  - `relatedServiceSlugs` (linking pass): `['website-strategy', 'conversion-optimization']`
- ✅ `/services/conversion-optimization` copywriting pass complete (2026-04-01) — Batch 1, page 5 (final)
  - Summary rewritten following layered writing rule (buyer gap → friction/trust/path diagnosis → structural operating model)
  - Tagline updated to be more buyer-direct ("The right people are already arriving. The question is why they are leaving without acting.")
  - 7 `signsYouNeedIt` bullets added (symptom-led: traffic/action gap, unclear next steps, clunky flows, mobile weakness, demand leakage, adding traffic before fixing path, unfocused pages)
  - 5 `faqItems` added (redesign vs optimization, improving without full rebuild, measuring success, not just ecommerce, what causes weak conversion)
  - Deliverables tightened — 6 items: conversion-path audit, action hierarchy review, form/flow review, trust/reassurance review, page-level priorities, implementation roadmap
  - Proof hierarchy: **317 BBQ is primary** (40% conversion lift — direct conversion-path proof), Pike Medical supporting (trust + patient acquisition), Hoosier Boy Barbershop supporting (booking flow rebuild)
  - `proofWorkSlugs`: `['317-bbq', 'hoosier-boy-barbershop', 'pike-medical-consultants']`
  - `secondaryCtaHref`: `/work/317-bbq`
  - `relatedServiceSlugs` (linking pass): `['website-strategy', 'local-seo', 'crm-architecture']`
- **Batch 1 child-service build is now complete.** All 5 pages have been implemented with full copywriting passes.
- ✅ **Batch 2 — `/services/martech-audit` (2026-04-01)** — Full copy pass: title `MarTech Audit & Stack Diagnostic`, layered summary, 7 signs, 6 deliverables, 5 FAQs, proof **Graston Technique** (primary) + **Graston Growth Engine** + **The Compass**, `proofWorkSlugs` trimmed to those three; `secondaryCtaHref` → `/work/graston-technique`; `layer` → `strategy`; strategy parent `childServiceSlugs` → `martech-audit` then `fractional-cmo`; related links `crm-architecture`, `fractional-cmo`, `website-strategy`; CMO Simulator `proofTools` (optional self-diagnostic). No `ServiceDetailPage` template changes.
- ✅ **Batch 2 — `/services/systems/agentic-marketing-systems` (2026-04-01)** — Full copy pass: applied workflow / internal-leverage framing (not hype-led); 7 signs, 6 deliverables, 5 FAQs; proof **Graston Growth Engine** (primary) + **Barbershop Command Center** + **The Launchpad**; `secondaryCtaHref` → `/work/graston-growth-engine`; related `crm-architecture`, `martech-audit`, `fractional-cmo`; live Growth Engine `proofTools` retained. No `ServiceDetailPage` template changes.
- ✅ **Batch 2 — `/services/growth/geo-optimization` (2026-04-01)** — Full copy pass: discoverability / future-facing search readiness without hype; 7 signs, 6 deliverables, 5 FAQs; proof grid **Russell Painting** (primary) + **Pike Medical Consultants** (supporting) only; `secondaryCtaHref` → `/work/russell-painting`; related `local-seo`, `website-strategy`, `martech-audit`; GEO Readiness Auditor `proofTools` (optional). No `ServiceDetailPage` template changes.
- ✅ **Parent/child linking pass complete (2026-04-01)** — `data/services.ts` + `ServicesExperience.tsx` + `ServiceDetailPage.tsx`
  - Parent `childServiceSlugs` now surface Batch 1 children per `parent-child-linking-kit.json` (`brand-web` → `website-strategy` + `conversion-optimization`; `systems` leads with `crm-architecture`; `growth` → `local-seo` + `conversion-optimization` + `geo-optimization`; `strategy` → `martech-audit` + `fractional-cmo` after Batch 2 page 1 — diagnostic entry before embedded leadership).
  - Batch 1 `relatedServiceSlugs` trimmed to 2–3 strategic siblings per kit (no parent-id noise in related lists).
  - Standalone breadcrumb parent: when a slug appears under more than one parent `childServiceSlugs`, the UI prefers the parent whose `layer` matches the page (`conversion-optimization` → `growth`, not `brand-web`).
  - `/services` cluster links: broken placeholder slugs now target real routes (`brand-strategy`, `martech-audit`, `geo-optimization`, `agentic-marketing-systems`).
- ✅ **Proof alignment + work→service backlinks (2026-04-01)** — `data/services.ts`, `data/work/work-index.ts`, `lib/work.ts`, `app/work/[slug]/page.tsx`, `WorkDetailContent.tsx`
  - Batch 1 service proof stacks checked against `service-proof-snippets.json`: **CRM Architecture** dropped a redundant third proof card (Graston Technique parent) so supporting proof stays subordinate to **Graston Growth Engine** + Barbershop Command Center; `secondaryCtaLabel` clarified for the Growth Engine URL.
  - Flagship work cards set `primaryServicePageSlug` for the strongest pairings: Graston Technique → `fractional-cmo`, Pike Medical → `website-strategy`, Graston Growth Engine → `crm-architecture`, Russell Painting → `local-seo`, 317 BBQ → `conversion-optimization`. Work detail renders a single “This build supports …” link to the resolved service route (respects `routePath` when present).
- ✅ **Post-Batch-1 service-system consolidation audit (2026-04-01)** — Confirmed next-tier Batch 2 order
  (`martech-audit` → `agentic-marketing-systems` → `geo-optimization`). Confirmed de-emphasis strategy for
  `website-redesign-conversion-ux`, `the-conductor`, and `brand-strategy` (narrow `relatedServiceSlugs`
  updates in `data/services.ts` only; no `/services` layout or Batch 1 copy changes). `/services` cluster
  links unchanged: `brand-strategy` still appears twice with different labels (positioning vs identity);
  legacy combo slug is not cluster-featured.
- ✅ **Batch 1 lightweight visual support (2026-04-01)** — `ServiceDetailPage` renders one optional proof-led image block when `supportImage*` fields are set; all five Batch 1 child pages populated (Cloudinary public IDs, captions from visual-support map, work slugs aligned with primary proof — no `proofWorkSlugs` changes).
- ✅ **Batch 2 suggested trio complete (2026-04-01)** — `martech-audit` + `agentic-marketing-systems` + `geo-optimization` — see Batch 2 bullet under “Additional standalone entries” above.
- ✅ **Post–Batch 2 refinement pass (2026-04-01)** — Linking kit synced to runtime growth children (includes `geo-optimization`); Batch 1/Batch 2 proof stacks unchanged; legacy secondary CTAs and Growth Engine tool internal link path corrected; see consolidated snapshot bullet above for details. Repo stable for next strategic slice (industries/pricing/scoped content).
- **Custom Tools & Workflow Products (shipped 2026-04-02; integration pass 2026-04-02):** Runtime specialty under **CRM, Automation & AI** — **`id` `custom-tools-workflow-products`**, canonical **`/services/systems/custom-tools-workflow-products`**, flat redirect in `next.config.js`. Proof: **`graston-growth-engine`** (primary) → **`barbershop-command-center`** (supporting). **Systems cluster** on `/services` now includes a fourth link (**Custom tools & workflow products**, nested URL). **`contactServiceOptions`** includes **Custom Tools & Workflow Products** (after the CRM parent line). **`crm-architecture`** / **`agentic-marketing-systems`** `relatedServiceSlugs` tightened to surface the custom-tools page alongside CRM / audit without exceeding three links each.

### Consolidated Proof / Taxonomy Snapshot
- Top reusable proof assets: Graston Technique, Pike Medical, PrimaryCare Indy,
  UrgentCare Indy, 317 BBQ, Hoosier Boy, Riley Bennett Egloff, Tuohy Bailey &
  Moore, Behr Pet, Russell Painting, Primary Colours.
- Highest-leverage proof metrics to reuse:
  - `+212% qualified leads`
  - `95% overhead reduction`
  - `48 hrs/week saved`
  - `45% patient growth over 3 years`
  - `300% organic traffic growth`
  - `75% more bookings`
  - `40% conversion lift`
- Proof routing rule: every `/work/[slug]` and `/tools/[slug]` should map to a
  primary parent service and explicit CTA destination.

### Consolidated Repo Hygiene Snapshot (2026-03-28)
- Canonical content/data lives in `data/` only. Do not recreate root-level
  mirrors like old `services.ts`, `labs.ts`, or `work-*.ts`.
- Generated artifacts stay untracked and local (`.next/`, `*.tsbuildinfo`,
  temporary exports).
- Root should stay lean: runtime/config entry points plus
  `README.md` and `CLAUDE.md`.
- Strategy and planning docs belong in `docs/context/` or `docs/archive/`,
  not repo root.

### Consolidated Ops / Sync Snapshot
- `docs/context/repo/2026-03-27-claude-os-audit-report.md` is an operations
  sync reference, not runtime product behavior guidance.
- Prioritized sync tiers from that report:
  - Tier 1: Revenue and client delivery artifacts
  - Tier 2: Website and brand assets
  - Tier 3: Job-search and operational docs
  - Tier 4: Knowledge base archives
- Maintenance cadence from that report:
  - Tier 1 daily/weekly
  - Tier 2 weekly/bi-weekly
  - Tier 3 weekly/monthly
  - Tier 4 monthly/as needed

### Operational Hardening Policy (Phase 4F)

#### 1) SEO trust-breaker closure
- **Default:** Close documented trust-breakers before new UX/features when they affect indexability, credibility, or conversion intent.
- **Allowed exception:** Defer only if there is an active production incident or dependency blocker with a dated follow-up owner.
- **Approval trigger:** Placeholder terms are removed, base URL is environment-driven, `robots.ts` + `sitemap.ts` generation is verified, AI crawler allow/deny intent is explicit, and CTA copy is specific (not generic filler).
- **Why this exists:** Small trust defects compound quickly and can undercut strong strategy, proof, and SEO performance.

#### 2) `/lab` vs `/tools` route authority
- **Default:** `/tools` is the canonical utility surface; `/lab` remains legacy redirects only.
- **Allowed exception:** Temporary dual-route behavior is allowed only during an active migration with a documented sunset.
- **Approval trigger:** Specs/docs/redirects all point to one canonical destination per tool, and no new planning docs target `/lab/*` as primary.
- **Why this exists:** Route ambiguity creates duplicate logic, redirect debt, and content-model drift.

#### 3) Governance automation in CI
- **Default:** Convert high-value repo rules into automated checks (lint/CI/scripts) rather than relying on manual compliance.
- **Allowed exception:** Temporary manual checks are acceptable for short-lived prototype branches that are not production-bound.
- **Approval trigger:** CI covers banned imports/patterns, required page metadata presence, unresolved service/work/tool references, placeholder text detection, and duplicate content mirrors outside `data/`.
- **Why this exists:** Written policy decays without automation; lightweight enforcement preserves quality at speed.

#### 4) Migration standardization for tools and side repos
- **Default:** Consolidate durable business logic into `darling-martech`, rebuild UI natively where possible, and minimize long-term iframe dependence.
- **Allowed exception:** Keep an iframe bridge only as a transitional step with explicit exit criteria and timeline.
- **Approval trigger:** Each migration uses a checklist covering source-of-truth, data ownership, route semantics, redirect plan, and post-migration cleanup.
- **Why this exists:** Standardized migrations prevent fragmentation and recurring multi-repo operational debt.

#### 5) Content graph integrity checks
- **Default:** Run a graph integrity validation whenever structured content relationships are changed.
- **Allowed exception:** Skip for docs-only changes with no `app/`, `data/`, `components/`, `lib/`, or redirect edits.
- **Approval trigger:** Validator confirms service slug existence, proof-work slug resolution, valid parent/child mappings, valid related-service references, and legacy route redirect coverage.
- **Why this exists:** This site depends on relationship-driven routing and proof mapping; broken graph links are functional defects.

#### 6) Documentation lifecycle discipline
- **Default:** Collapse overlapping guidance and retire stale migration notes as soon as they stop changing implementation decisions.
- **Allowed exception:** Temporary overlap is acceptable during active transitions when canonical precedence is explicit.
- **Approval trigger:** `CLAUDE.md` remains aligned with runtime behavior, stale route/model instructions are removed, and conflict-prone duplicate guidance is reduced.
- **Why this exists:** Excess semi-live documentation slows decisions and increases contradiction risk.

#### 7) Performance budget and boundary audit cadence
- **Default:** Treat client/server boundaries and animation/3D budgets as recurring quality checks, especially after major visual or tooling additions.
- **Allowed exception:** Defer full audits only when scope is truly content-only and no runtime behavior changed.
- **Approval trigger:** No obvious hydration regressions, heavy scenes stay lazily loaded, and measured hotspots are documented with next actions.
- **Why this exists:** Framer Motion + GSAP + Lenis + R3F + Three can stay high quality only with periodic, measured guardrails.

## Tools and Skills Map
Last updated: 2026-03-28

### Purpose
This section tells Claude how to use local context, connectors, and project
skills for Darling MarTech.

Goals:
- reduce unnecessary tool chaining
- reduce token waste
- keep work grounded in local repo and project docs
- use the most direct source of truth for each task

### Tool Use Hierarchy
Use tools and skills in this order:
1. Local project files
2. Project memory files (if present)
3. Project documentation in `docs/`
4. Project-specific skills
5. External connectors only when necessary
6. Live-site/browser verification only when explicitly requested

If the answer exists in repo files or docs, do not use external connectors.

### Primary Working Context

#### Filesystem
Use for:
- reading and editing repo files
- inspecting routes, components, content files, and docs
- understanding current implementation
- making precise changes with minimal exploration

#### Main Darling MarTech repo folder
Primary source of truth for:
- application routes
- page content
- service architecture
- work/tools structures
- shared UI components
- internal linking patterns
- local content/data sources

#### Memory files (if present in workspace)
Candidate memory files:
- `MEMORY.md`
- `project_darling_martech_site_state.md`
- `project_darling_martech_skills.md`

Use for:
- current project status
- known decisions
- active priorities
- continuity across sessions

Do not override these casually without a clear reason.

#### Project docs
Use these docs before inferring architecture from partial code reads:
- `CLAUDE.md`
- `docs/REPO-OPTIMIZATION-PLAN.md`
- `docs/context/README.md`
- `docs/context/project/project_darling_martech_repo_map.md`
- `docs/context/project/project_darling_martech_service_architecture.md`
- `docs/context/project/project_darling_martech_work_taxonomy.md`
- `docs/context/project/project_darling_martech_site_map.md`
- `docs/context/project/project_darling_martech_page_briefs.md`
- `docs/context/project/project_darling_martech_offers_and_packaging.md`
- `docs/context/project/project_darling_martech_voice_and_messaging.md`
- `docs/context/project/project_darling_martech_case_studies.md`
- `docs/context/strategy/2026-03-19-competitor-analysis.md`
- `docs/context/strategy/2026-03-19-value-proposition.md`
- `docs/context/repo/2026-03-27-claude-os-audit-report.md`
- `docs/context/project/service-pages/README.md`
- `docs/context/project/service-pages/service-page-template.md`
- `docs/context/project/service-pages/service-proof-matrix.md`
- `docs/context/project/service-pages/ai-builder-operating-rules.md`
- `docs/context/project/service-pages/*` — full service-page system (consult before any `/services` work)

### Connector Policy
External connectors are secondary. Use only when necessary for the task.

#### Vercel
Use for:
- deployment verification
- environment/project checks
- confirming live deployment status
- checking what is live when explicitly requested

Do not use for:
- reconstructing code that already exists locally
- inferring page structure when route files are available
- repeated recovery attempts if access fails

#### Claude in Chrome
Use for:
- explicit live-site verification
- checking rendered behavior
- validating published content/UI when requested
- confirming what users currently see on live site

Do not use for:
- reading code that exists locally
- reverse-engineering structure from browser when repo files are available
- repeated scraping attempts when local context is sufficient

#### Notion
Use for:
- project notes/documents that live only in Notion
- strategy references when requested
- planning material not present in repo

Do not use if same information exists locally.

#### Supabase
Use for:
- schema/table/database tasks
- data model review
- backend data checks tied to implementation

Do not use for general site structure/content work unless task is data-related.

#### Cloudinary
Use for:
- media/asset organization
- image delivery/reference workflows
- asset management tasks

Do not use unless task is specifically about media/assets.

#### Gmail
Use for email workflows only when explicitly requested.

#### Google Calendar
Use for scheduling only when explicitly requested.

#### Zapier
Use for automation/integration tasks only.
Do not use as a fallback research tool.

#### Desktop Commander
Use only for local system operations not covered by normal file context.

#### Windows-MCP
Use only for machine/system tasks when explicitly needed.

#### Three.js 3D Viewer
Use only when working on 3D assets/previews.

### Connector Restraint Rules
- Do not chain multiple connectors to reconstruct info that already exists locally.
- Do not escalate from one blocked connector to another unless external verification is truly required.
- If connector fails and local context is available, proceed from local context.
- Do not use live deployment/browser/API tools to infer code when local source files exist.
- Use the most direct tool available and stop once enough context is available.

### Project Skills
Use project skills when they directly match the task. Avoid overlapping skill sprawl.

Local repo skills:
- `darling-martech-seo` — service/page SEO, metadata, linking strategy, taxonomy, GEO/AI-search structure.
- `darling-martech-labs` — tools/work taxonomy, legacy redirect awareness, service-linking, tool-vs-proof mapping.
- `darling-martech-data` — analytics, attribution, reporting, KPI/measurement planning.
- `darling-martech-services` — service architecture, parent/child design, packaging, intent-led service pages.
- `darling-martech-copy` — messaging, headlines, CTAs, trust/conversion copy.
- `darling-martech-ui` — interface, layout, hierarchy, conversion-focused visual structure.
- `darling-martech-redesign` — audit and cleanup for AI-looking or inconsistent UI patterns.

Optional skills (use only if present in the active runtime):
- `darling-website-content`
- `workspace-organizer`
- `file-organizer`
- `industrial-brutalist-ui`
- `name-frontend-design`

### Default Behavior by Task Type
For code edits:
1. local repo files
2. relevant docs
3. relevant project skill if needed

Do not start with Vercel or Chrome.

For content strategy:
1. project docs
2. memory files (if present)
3. service/copy/content skills

For service architecture:
1. service docs
2. taxonomy docs
3. `darling-martech-services`
4. `darling-martech-seo` when needed

For `/work` and `/tools` mapping:
1. taxonomy docs
2. local content/data files
3. `darling-martech-labs`
4. `darling-martech-services`

For live verification:
- default to local validation first; use one bounded Vercel/Chrome verification pass when runtime behavior cannot be confidently validated from local context alone

### Operating Rule Summary
- Local repo first
- Docs and memory second
- Skills third
- Connectors only when necessary
- Live verification only when explicitly requested
- Smallest effective action
- No unnecessary retries
- No multi-tool reconstruction when local truth exists

---

## Project Overview
Official website for **Darling MarTech** — the consulting brand of Jacob
Darling (Marketing and Technology LLC). The site targets small businesses
and startups, builds confidence in Jacob as a senior-level expert, and
converts visitors into clients.

- **Brand:** Darling MarTech
- **Owner:** Jacob Darling
- **Entity:** Marketing and Technology LLC
- **Domain:** darlingmartech.com
- **Email:** jacob@jacobdarling.com
- **Portfolio reference:** bearcavemarketing.com
- **Production URL (canonical):** [www.darlingmartech.com](https://www.darlingmartech.com/)
- **Vercel project:** [darling-mar-tech/darling-martech](https://vercel.com/darling-mar-tech/darling-martech)
- **Preview/runtime URL (secondary):** [darling-martech.vercel.app](https://darling-martech.vercel.app/)

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16+ App Router | RSC default. `"use client"` only for interactive/animated/3D components |
| Styling | **CSS Modules + CSS custom properties first** | Brand-token visual styling stays in CSS Modules. Tailwind is allowed for layout plus specific structural/functional utilities only |
| 2D Animation | **Framer Motion 11** | All UI motion. Spring physics only — presets in `lib/motion.ts` |
| 3D / WebGL | **@react-three/fiber v9 + @react-three/drei v10 + Three.js 0.183** | Hero background, floating geometry, GPU-accelerated 3D |
| Scroll animation | **GSAP 3.14** | Timeline-based scroll sequences via `hooks/useScrollAnimation.ts` |
| Smooth scroll | **Lenis 1.3** | Inertia scrolling, wraps full app in `LenisProvider` |
| Interactivity | Custom hooks + motion components | Magnetic buttons, cursor spotlight, 3D card tilt |
| Components | shadcn/ui (customized) | Always adapted to brand — never default shadcn appearance |
| Icons | **@phosphor-icons/react** | `weight="light"` or `"regular"`. No Lucide. No Feather. No Heroicons. |
| Fonts | next/font localFont — Cabinet Grotesk, Inter | Instrument Serif via next/font Google |
| Contact form | React Hook Form + Zod + Resend API | |
| Images | next/image (always — never `<img>`) | `unoptimized: true` (current project setting) |
| Hosting | Vercel (GitHub auto-deploy) | |
| Media | Cloudinary Next.js SDK | Cloud: `djhqowk67` |
| Physics | @dimforge/rapier3d-compat | Available in node_modules |
| Geolocation | @mediapipe/tasks-vision | Available in node_modules |
| Analytics | Custom via `components/providers/Analytics.tsx` | |
| Cookie consent | `components/ui/CookieConsent.tsx` | |
| SEO | `app/robots.ts` + `app/sitemap.ts` + `components/JsonLd.tsx` | |

### Styling rule — CSS Modules for brand visuals, Tailwind for structure only
Use CSS Modules + CSS custom properties for all brand-defining visual decisions.
Tailwind can be used where it improves structure or accessibility semantics,
but not to encode the visual identity of the site.

```
✅ Allowed (layout/structure):
  grid  flex  col-span-*  container  mx-auto  w-*  h-*  min-h-*  max-w-*  aspect-*

✅ Allowed (functional/utility):
  truncate  line-clamp-*  sr-only  not-sr-only  pointer-events-none  select-none
  whitespace-nowrap  break-words

❌ Never use for brand visuals:
  bg-*  text-{color}  border-{color}  shadow-*  rounded-*  font-*  tracking-*
  transition-*  animate-*  ring-*  backdrop-*
```

> **Gotcha:** `tailwind.config.ts` remains for shadcn token infrastructure. Rule:
> Tailwind is still valid for layout and structural/functional helpers. Brand tokens
> (color, typography, shadow language, surface treatment, motion feel) remain in
> CSS Modules and project variables.

### 3D components rule

All Three.js/R3F components MUST:

- Be lazy-loaded with `dynamic(..., { ssr: false })` — Three.js is browser-only
- Use `React.memo` or minimal re-render patterns
- Accept mouse position via `ref` (not state) to avoid React re-renders
- Target 60fps — never run heavy geometry inside `useFrame` without memoization

### Motion hierarchy

1. **Framer Motion** — React component animations, hover, entrance, spring physics
2. **GSAP ScrollTrigger** — scroll-sequenced timelines via `useScrollAnimation` hook
3. **Three.js `useFrame`** — per-frame 3D transforms (rotation, drift, camera rig)
4. **CSS** — only `transition: border-color` for hover state color changes

---

## Brand Identity

### CSS Custom Properties (copy these into globals.css)
```css
:root {
  --color-base:           #0A0A0A;  /* Primary background */
  --color-surface:        #141414;  /* Elevated cards, drawers */
  --color-surface-raised: #1A1A1A;  /* Modals, tooltips */
  --color-accent:         #FF4D00;  /* Electric Orange — use sparingly */
  --color-text:           #F5F0E8;  /* Warm Off-White — primary text */
  --color-muted:          #888888;  /* Secondary/body text */
  --color-border:         rgba(245, 240, 232, 0.08);  /* Hairline borders */
  --color-border-accent:  rgba(255, 77, 0, 0.3);      /* Hover accent borders */

  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-accent:  'Instrument Serif', serif;

  /* Spring physics presets for Framer Motion */
  --spring-standard:  /* stiffness: 120, damping: 20 */
  --spring-entrance:  /* stiffness: 80,  damping: 18 */
  --spring-cinematic: /* stiffness: 55,  damping: 16 */
}
```

### Color System
| Name | Hex | Role |
|---|---|---|
| Obsidian | #0A0A0A | Primary background — true near-black |
| Electric Orange | #FF4D00 | Brand accent — used sparingly (1–2× per section max) |
| Warm Off-White | #F5F0E8 | Text on dark, light backgrounds |
| Mid Gray | #888888 | Supporting/secondary text |
| Surface | #141414 | Cards, elevated sections |

### Typography
- **Display/Headlines:** Cabinet Grotesk — weight 700–900, tracking
  -0.02em to -0.04em, tight line-height ~0.95–1.1
- **Body:** Inter — weight 400, line-height 1.6–1.7, color #888888 on dark bg,
  `max-width: 65ch`
- **Accent:** Instrument Serif — italic only, emotional moments only
  (never in nav, UI, or data contexts)
- **Data/numbers:** `font-variant-numeric: tabular-nums`
- **Headings:** `text-wrap: balance` to prevent widows

### Logo
- Wordmark: "Darling" in #F5F0E8 + "MarTech" in #FF4D00 — Cabinet
  Grotesk Bold
- Monogram: "DM" mark for favicon, social avatars, compact use
- SVG files: `/public/images/logo/`

### Brand Photo
- Primary: `jacob-bio-photo-splash.jpg` — artistic watercolor treatment
- Location: `/public/images/`

---

## Framer Motion — Required Patterns

### Spring presets (define these once, import everywhere)
```ts
// lib/motion.ts
export const springStandard  = { type: "spring", stiffness: 120, damping: 20 }
export const springEntrance  = { type: "spring", stiffness: 80,  damping: 18 }
export const springCinematic = { type: "spring", stiffness: 55,  damping: 16 }

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
}

export const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springEntrance }
}
```

### Rules
- All sections use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Every `motion.*` component that animates must be a `"use client"` component
- Avoid `transition: all 0.3s ease`; prefer Framer Motion for brand-significant interactions and section choreography
- Stagger delay: 60–100ms (tighter feels mechanical)
- Only animate `transform` and `opacity` — never layout properties
- Hover: `whileHover={{ scale: 1.02 }}` on cards; `whileTap={{ scale: 0.98 }}` on buttons

---

## 21st.dev Component Library

These are pre-vetted drop-in components from 21st.dev. Install via shadcn CLI.
**All require brand adaptation** — see adaptation rules below.

| Component | Purpose | Install URL |
|---|---|---|
| Hero ASCII (reapollo) | Left-aligned dark hero + geometric illustration right | `https://21st.dev/community/components/reapollo/hero-ascii/default` |
| Background Paths (kokonutd) | Animated wire path background at 15–20% opacity | `https://21st.dev/community/components/kokonutd/background-paths/default` |
| Grid Card (efferd) | Dark surface + animated grid pattern + gradient hover | `https://21st.dev/community/components/efferd/grid-card/default` |
| Button Colorful (kokonutd) | Directional hover fill from left + arrow icon | `https://21st.dev/community/components/kokonutd/button-colorful/default` |
| Underline Animation (danielpetho) | 3 Framer-powered variants for nav/footer links | `https://21st.dev/community/components/danielpetho/underline-animation/default` |

Install command pattern:
```bash
npx shadcn@latest add "https://21st.dev/r/[component-url]"
```

### Brand adaptation rules (apply to EVERY 21st.dev component after install)
1. **Colors** — Replace all purple/blue/gradient with `var(--color-accent)`,
   `var(--color-base)`, `var(--color-text)`, `var(--color-muted)`
2. **Icons** — Swap `lucide-react` → `@phosphor-icons/react` with `weight="light"`
3. **Fonts** — Replace any font-family with `var(--font-display)` for headings,
   `var(--font-body)` for paragraphs
4. **Tailwind visual tokens** — Move brand-defining color/typography/surface styles to CSS Modules; Tailwind can remain for layout + structural/functional utilities
5. **Motion** — If component uses CSS transitions, upgrade to Framer Motion
   spring physics using the presets in `lib/motion.ts`

---

## Design Principles

### The standard
The site should look like it was built by a senior human designer who spent
time on it — not generated from a template or AI prompt. Every layout
decision should have a visible reason. No pattern should appear just because
it's the default.

### Layout rules
- Dark background (#0A0A0A) always — never light gray or navy as base
- One accent color (Electric Orange) — intentional and sparingly placed
- Strong typographic scale — huge display text + small refined body text
- **Asymmetric layouts** — break the grid deliberately; never equal columns
  as the primary feature layout
- Hero is left-aligned (or split-screen) by default; centered hero treatments are
  allowed when a single-message campaign narrative is stronger and proof remains prominent
- Generous whitespace — let content breathe
- `min-height: 100dvh` on full-height sections — never `height: 100vh`
- `max-width: 1400px` container on all pages
- Complex layouts use CSS Grid — not flexbox percentage math
- Below 768px: all asymmetric layouts collapse to single column, no
  horizontal scroll

### Motion rules
- Scroll-triggered via `whileInView` — purposeful, not decorative
- Subtle hover micro-interactions on all interactive elements
- No instant state changes — all transitions spring-interpolated
- No animations on layout properties (width, height, top, left)

### Strictly avoid (hard bans)
- Purple-to-blue gradients on any element
- Glowing orbs or blob background shapes
- Glassmorphism / frosted blur cards
- Floating particle or confetti animations
- Generic symmetrical 3-column card grids as primary feature layout
- Overly rounded "bubbly" UI (`border-radius` max 16px for cards)
- `text-gradient` CSS on headings
- Generic white card + gray border + drop shadow pattern
- Any aesthetic that reads as AI-generated or template-built

### Creativity policy refactor (guardrails, not hard bans)

#### 1) Hero composition flexibility
- **Default:** Use left-aligned or split-screen hero composition.
- **Allowed exception:** Use centered hero composition for focused campaign moments where one message and one CTA carry the section.
- **Approval trigger:** The section still preserves proof visibility and does not regress into generic centered-template design.
- **Why this exists:** Maintains brand differentiation while allowing intentional narrative variety.

#### 2) Visual-pattern flexibility
- **Default:** Follow hard bans in the "Strictly avoid" list and core card/layout patterns.
- **Allowed exception:** Introduce atypical treatments only when they have a clear strategic reason and still map to brand tokens.
- **Approval trigger:** The treatment avoids known AI-template signatures and can be defended in one sentence by conversion or clarity benefit.
- **Why this exists:** Encourages originality without sacrificing brand coherence.

#### 3) Motion implementation flexibility
- **Default:** Framer Motion handles brand-significant motion; animate transform/opacity, not layout properties.
- **Allowed exception:** Use lightweight CSS transitions for utility-state changes when Framer Motion adds unnecessary complexity.
- **Approval trigger:** No `transition: all`, no layout-property animation, and no mismatch with the established spring feel.
- **Why this exists:** Preserves interaction quality while reducing implementation overhead in non-critical UI states.

#### 4) Theme-mode flexibility
- **Default:** Dark mode is the primary runtime theme and design baseline.
- **Allowed exception:** Add scoped light variants for specific editorial or campaign contexts when they improve readability or trust.
- **Approval trigger:** The variant is page-scoped, token-driven, and justified by content or conversion intent.
- **Why this exists:** Expands creative range without fragmenting the core visual system.

#### 5) Tool CTA flexibility
- **Default:** Use one relevant tool CTA per page section.
- **Allowed exception:** Add a second tool CTA only when it serves a distinct user intent and does not compete with the primary conversion path.
- **Approval trigger:** CTA hierarchy remains clear (one primary action), and both CTAs map to different outcomes.
- **Why this exists:** Supports utility-led journeys without introducing CTA sprawl.

#### 6) Tool routing model flexibility
- **Default:** Use static/specific tool routes and modal launches for the current small tool set.
- **Allowed exception:** Introduce a dynamic tool route model when tool count and schema uniformity justify templating.
- **Approval trigger:** At least several tools share a stable data model, template sections, and SEO needs.
- **Why this exists:** Avoids premature abstraction while keeping future scale paths open.

#### 7) Contact page presentation flexibility
- **Default:** Keep `/contact` focused, minimal, and conversion-oriented.
- **Allowed exception:** Add a lightweight contextual intro treatment for intent-specific entries when it reduces ambiguity.
- **Approval trigger:** No heavy hero choreography, no decorative 3D scene, and no dilution of form completion focus.
- **Why this exists:** Improves contextual clarity while preserving the page's closing role.

#### 8) Connector verification flexibility
- **Default:** Local repo and docs are the first source of truth; connectors remain secondary.
- **Allowed exception:** Run a bounded live verification pass for rendering, redirects, or runtime behavior that local context cannot fully validate.
- **Approval trigger:** One focused pass, clear validation objective, and no connector-chaining to reconstruct local code truth.
- **Why this exists:** Prevents overreach while enabling pragmatic end-to-end confidence checks.

### Card pattern (required)
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}
.card:hover {
  border-color: var(--color-border-accent);
}
```

---

## Brand Voice & Tone
**We are:** Confident and direct. Strategic and outcomes-focused.
Tech-fluent and clear. Personal and approachable.

**We are not:** Corporate or stiff. Salesy or pushy. Vague or full of
buzzwords. Overly trendy. Generic.

Every word should sound like Jacob speaking directly to a potential
client — not like an agency website. "I", not "we". Present tense.
Outcome-first (what did it unlock?) not tool-first.

### Copy anti-patterns (purge on sight)
| Found | Replace with |
|---|---|
| "Elevate your..." | Direct verb: "Build your...", "Grow your..." |
| "Seamless experience" | Describe what actually happens |
| "Unleash the power of" | Delete. State the outcome. |
| "Next-generation" | Specific technology name |
| "Game-changer" | Specific result stat |
| "Our team of experts" | "Me. Directly. No hand-offs." |
| Round numbers (50%, $100) | Real numbers from this brief |
| Exclamation marks | Confident, calm confirmation instead |

---

## Jacob Darling — Professional Profile

### Summary
Marketing strategist and systems architect with 15+ years of experience
building revenue-driving marketing infrastructure. Bridges creative
marketing vision and technical implementation. Works across agency and
brand sides equally.

### Key Stats (use these exact numbers — never round differently)
- 15+ years experience
- 400+ automation workflows built
- 30,000+ users served through platforms and systems
- 40% average conversion lift delivered
- Indiana University — B.S. Business Management, 2008
- Gold Key Photography Award — Scholastic Art & Writing Awards, 2008

### Industries
Healthcare, Legal, Finance, SaaS/Tech, Retail/E-commerce,
Media/Entertainment, Nonprofit, B2B, B2C, Local Service Businesses

### Career History
- **Marketing Director** — Graston Technique LLC (Aug 2023–Dec 2025)
  Built full MarTech ecosystem: LearnDash LMS, WooCommerce, WP Fusion,
  FluentCRM. Deployed GPT-powered AI assistant via REST APIs. Built 400+
  automations. Created GA4 analytics dashboards. Cloudflare CDN & security
  optimization. Managed cross-functional sprints.
- **Interim Director of Marketing** — Ultimate Technologies Group
  (Mar–Jul 2023)
  Led marketing strategy during transition. Google Ads optimization,
  marketing automation, CRM integration, branding updates.
- **Marketing Manager** — Riley Bennett Egloff LLP (Jul 2022–Mar 2023)
  Full marketing ownership for law firm. Website, SEO, PR, email, social,
  business development plans, RFP responses, award nominations.
- **Marketing Administrator** — Riley Bennett Egloff LLP (Jun 2015–Nov 2022)
  Content marketing, website, social media, graphic design, brand
  development, strategic marketing plan execution.
- **Marketing Coordinator** — Deerfield Financial Advisors (Jun 2013–Jun 2015)
  Events, content, tech platforms, FINRA/SEC compliance review.
- **Marketing Coordinator** — Pike Medical Consultants (Sep 2009–Jun 2013)
  Drove 45% increase in patient visits over 3 years. Full marketing
  ownership reporting directly to company president.
- **Marketing Intern** — OrthoIndy (2006–2007)

### Technical Skills
CRM Architecture (HubSpot, FluentCRM, Salesforce), Marketing Automation,
Email Marketing, Revenue Operations, GA4, GTM, Conversion Rate
Optimization, Full-Stack Web Development (WordPress, JavaScript, React,
Next.js), Cloudflare Workers, API Development, System Integration,
Serverless Development, WordPress, Figma, Adobe Creative Suite

---

## Current Site Architecture

### Pages live on darlingmartech.com (canonical production)

- `/` — Home (all core sections, 3D hero, stats, services, case studies, testimonials, CTA)
- `/about` — Full about page with career timeline
- `/contact` — Contact form page (React Hook Form + Zod + Resend)
- `/work` — Case studies index (masonry/staggered grid — Live)
- `/work/[slug]` — Individual case study pages (data-driven from `data/work/`)
- `/tools` — Tools index (4 live utilities — CMO Simulator, GEO Readiness Auditor, CMO Roadmap Generator, Attribution Snapshot)
- `/tools/cmo-simulator` — Special: gated access via `CmoAccessModal`
- `/tools/attribution-snapshot` — Lightweight attribution model comparison tool (client-side CSV analysis) ✅

> Note: `/lab` is legacy-only redirect surface. Do not design new UX/content around `/lab`; use `/tools` and `/work`.

- `/services` — Services page with 6 service categories (Live)
- `/services/[slug]` — Individual service detail pages (Live)
- `/studio` — Cloudinary masonry gallery (Live)
- `/studio/[slug]` — Studio gallery items
- `/api/contact` — Contact form API route
- `/api/cmo-simulator-access` — CMO Simulator gate API
- `/api/studio` — Studio Cloudinary API

### Planned routes (when prioritized)
- `/pricing` — Pricing page (content session needed)
- `/blog` — Thought leadership (MDX-powered)
- `/blog/[slug]` — Individual posts

---

## Data Layer — Source of Truth

**All content lives in `/data/` as typed TypeScript files. Never hardcode content in components.**

### `/data/labs.ts` — 4 tool entries in `LAB_DETAIL_DATA` (internal source)
> Note: public interaction is now on `/tools` with four primary utilities; `/lab` routes redirect to `/tools` or `/work` as appropriate.
| Slug | Name | Category | Live URL |
|---|---|---|---|
| `cmo-simulator` | CMO Simulator | Marketing | (gated — email access) |
| `geo-readiness-auditor` | GEO Readiness Auditor | Marketing | /tools/geo-readiness-auditor |
| `cmo-roadmap-generator` | CMO Roadmap Generator | Marketing | https://cmo-roadmap-generator.vercel.app/intake |
| `attribution-snapshot` | Attribution Snapshot | Marketing | /tools/attribution-snapshot |

### `/data/services.ts` — 6 service categories in `serviceDetails`
| ID | Title | Layer |
|---|---|---|
| `strategy` | Fractional Marketing Leadership & Growth Strategy | strategy |
| `brand-web` | Brand Identity, Websites & Conversion Design | build |
| `systems` | CRM Architecture, Automation, Integrations & AI Tools | build |
| `growth` | SEO, Content Systems, Paid Acquisition & Analytics | growth |
| `commerce` | E-Commerce, Checkout Flows & Revenue Operations | build |
| `specialized` | Industry-Specific Systems & Specialty Engagements | build |

Also exports: `serviceOverview` (4 summary cards), `specializedServices` (8 items),
`engagementModels` (3: audit/project/embedded), `contactServiceOptions`, `serviceLayerMeta`

### `/data/work/work-index.ts` — Case study card grid (26 entries)

**Flagship featured (dashboardTier: 'flagship'):**
- `graston-technique` — Automation & Systems (+212% qualified leads, 95% overhead reduction, 48hrs/wk saved)
- `pike-medical-consultants` — Healthcare (45% patient growth, multi-division CMO)
- `317-bbq` — Hospitality (120% time on site, 40% conversion lift, 2x catering)
- `hoosier-boy-barbershop` — Hospitality (90% more bookings, 200% social, #1 local search)

**System tier (dashboardTier: 'system') — child projects:**
- Under `graston-technique`: `the-launchpad`, `the-closer`, `the-compass`, `the-fortress`, `graston-growth-engine`, `smart-sales-pricing`, `investment-roi-planner`, `clinical-compass`, `license-requirements`, plus `barbershop-command-center` under `hoosier-boy-barbershop`
- `primarycare-indy`, `urgentcare-indy` (under pike-medical-consultants)

**All case study slugs (canonical):**
`graston-technique`, `the-launchpad`, `the-closer`, `the-compass`, `the-fortress`,
`graston-growth-engine`, `smart-sales-pricing`, `investment-roi-planner`, `clinical-compass`, `license-requirements`,
`pike-medical-consultants`, `primarycare-indy`, `urgentcare-indy`,
`riley-bennett-egloff`, `tuohy-bailey-moore`,
`317-bbq`, `hoosier-boy-barbershop`, `barbershop-command-center`, `russell-painting`,
`behr-pet-essentials`, `circle-city-kicks`,
`black-letter`, `clean-aesthetic`, `perpetual-movement-fitness`,
`primary-colours`

### `/data/work/work-data.ts` — Full case study content
Full case study objects with: hero, overview, results, services, timeline, media, etc.

### `/data/testimonials.ts` — Testimonial data
Verbatim quotes. Display order: Jesse Wey → Andrew Bastnagel → Kevin Martin See → Ben Worrell

---

## Case Studies — Content Status

| Slug | Client | Status |
|---|---|---|
| `graston-technique` | Graston Technique® | ✅ Content built |
| `the-launchpad` | The Launchpad | ✅ System sub-project |
| `the-closer` | The Closer | ✅ System sub-project |
| `the-compass` | The Compass | ✅ System sub-project |
| `the-fortress` | The Fortress | ✅ System sub-project |
| `graston-growth-engine` | Graston Growth Engine | ✅ System sub-project |
| `smart-sales-pricing` | Smart Sales & Pricing Tool | ✅ System sub-project |
| `investment-roi-planner` | Investment ROI Planner | ✅ System sub-project |
| `clinical-compass` | Clinical Compass | ✅ System sub-project |
| `license-requirements` | License Requirements Navigator | ✅ System sub-project |
| `barbershop-command-center` | Hoosier Boy Barbershop | ✅ System sub-project |
| `pike-medical-consultants` | Pike Medical Consultants | ✅ Parent page built |
| `primarycare-indy` | PrimaryCare Indy | ✅ Built |
| `urgentcare-indy` | UrgentCare Indy | ✅ Built |
| `riley-bennett-egloff` | Riley Bennett Egloff LLP | ✅ Built |
| `tuohy-bailey-moore` | Tuohy Bailey & Moore LLP | ✅ Built |
| `317-bbq` | 317 BBQ | ✅ Built |
| `hoosier-boy-barbershop` | Hoosier Boy Barbershop | ✅ Built |
| `russell-painting` | Russell Painting Co. | ✅ Built |
| `behr-pet-essentials` | Behr Pet Essentials | ✅ Built |
| `circle-city-kicks` | Circle City Kicks | ✅ Built |
| `black-letter` | Black Letter | ✅ Built |
| `clean-aesthetic` | Clean Aesthetic | ✅ Built |
| `perpetual-movement-fitness` | Perpetual Movement Fitness | ✅ Built |
| `primary-colours` | Primary Colours | ✅ Built |
| `direct-care-indy` | Direct Care Indy | 🚧 In progress — do not publish |

**Pike Medical note:** Urgent Care Indy, Primary Care Indy, and Direct Care Indy
are all under the Pike Medical Consultants umbrella. Jacob serves as fractional
CMO across all three. Scope: website design/dev, Mailchimp, Google Ads, graphic
design, GA4, Google Search Console, Google My Business.

---

## Tools — Detailed Reference

### Access-gated tool: CMO Simulator
- Canonical route: `/tools/cmo-simulator`
- Access gate: `CmoAccessModal` component — requires name + email via Resend
- Session bypass: `sessionStorage` key for returning visitors
- API: `/api/cmo-simulator-access`
- Deployed: gated locally — no external URL needed

### Local HTML lab tools (legacy)
These are legacy standalone files that are now surfaced through work case studies and redirects, not the current `/tools` primary utility surface:
- `/public/labs/clinical-compass/` — Graston Clinical Compass Tool.html
- `/public/labs/investment-roi-planner/` — Investment ROI Planner Tool.html
- `/public/labs/smart-sales-pricing/` — Graston Smart Sales and Pricing Tool.html
- `/public/labs/license-requirements/` — Practitioner License Requirements Tool.html

### Lab card visual modes (per entry in `data/labs.ts`)
Each lab entry includes `screenshots[]` with Cloudinary URLs for the detail page.

### Current lab launch pattern for lead-gen tools
Same-tab modal launch from `/tools` where strategically appropriate; dedicated static tool pages are used only when they improve explanation, SEO, or onboarding.

### CTA-discipline note for tool placement
Do not overuse tool CTAs; one relevant tool CTA per page by default; a second is acceptable only when it serves a distinct intent and preserves clear primary CTA hierarchy.

---

## Services — Architecture Detail

### `/services` runtime model (updated 2026-03-29)
`/services` is organized around **4 buyer-problem clusters**. The old "Strategy / Build / Growth" three-layer framing is **no longer the runtime model**.

Runtime structure of `ServicesExperience.tsx`:
1. **Hero** — problem-led intro ("The work usually starts in one of four places.") + dual CTA
2. **4 cluster sections** — each with icon, label, problem statement, body copy, child-service links, and one proof anchor
3. **Final CTA** — `/contact?intent=service`

The old layer-selector cards (`serviceLayerMeta`), "Productized offers" section (`standaloneServicePages`), and flat proof strip have been removed. `ServicesExperience.tsx` no longer imports `serviceLayerMeta` or `standaloneServicePages`.

**4 runtime clusters:**
- Strategy & Leadership — routes to: `fractional-cmo`, `brand-strategy` (positioning/messaging), `martech-audit` (audit & roadmap)
- Websites, UX & Brand — routes to: `website-strategy`, `conversion-optimization`, `brand-strategy` (brand identity systems)
- CRM, Automation & AI — routes to: `crm-architecture`, `agentic-marketing-systems`, `custom-tools-workflow-products` (nested `/services/systems/…`), `martech-audit`
- Growth, SEO & Demand — routes to: `local-seo`, `conversion-optimization`, `geo-optimization` (canonical service slug; resolves to nested `/services/growth/geo-optimization`)

**`/services` page role:** explains problem clusters, routes users to child-service pages, supports each cluster with one proof anchor. It does not sell every sub-service in depth — that is child-service pages' job.

**`/services` child links:** In each cluster card, child-service destinations are **secondary pill links** (clear affordance and focus ring, not loud CTAs) so visitors read them as navigation to dedicated pages, not body copy bullets.

**Data exports still in `data/services.ts` (not all are used by the index page):**
- `serviceOverview` — 4 summary cards (used by homepage `Services` component)
- `serviceDetails` — 6 full service entries with deliverables + proof (used by `/services/[slug]`)
- `serviceLayerMeta` — three-layer meta (not used by `/services` runtime; kept for slug page use)
- `specializedServices` — 8 specialty service items
- `engagementModels` — 3 engagement types
- `contactServiceOptions` — 8 labeled options (+ empty placeholder) for the contact form select, including **Custom Tools & Workflow Products**
- `standaloneServicePages` — standalone offer pages (not used by `/services` runtime)

**3D scene targets** in `serviceDetails` (`sceneTarget` field):
`strategy-core`, `build-brand-web`, `build-systems`, `growth-core`, `build-commerce`, `build-specialized`
These tie to the `ServicesAmbient` 3D scene component on individual service detail pages.

**Layered writing rule** still governs all service work:
1. Plain-English buyer language first
2. Strategic translator language second
3. Technical/specialist language third (lower on child pages, not at index level)

> **Service-page docs:** Full planning set in `docs/context/project/service-pages/` — tracker,
> slug conventions, proof matrix, copy decks, page template, and briefs. Consult before
> any `/services` or child-page work.

---

## Component Architecture — Key Components

### 3D Components (`components/3d/`)
- `HeroBackground.tsx` — Three.js hero scene (lazy-loaded, SSR disabled)
- `LabTelemetryScene.tsx` — Lab page 3D scene
- `ServicesAmbient.tsx` — Services page ambient 3D
- `WorkAmbient.tsx` — Work page ambient 3D
- `FloatingCard.tsx` — 3D card tilt effect
- `system/` — System/reusable 3D utilities
- `scene-types.ts` — Shared scene type definitions

### Interactive Components (`components/interactive/`)
- `CursorSpotlight.tsx` — Cursor-following spotlight effect
- `MagneticButton.tsx` — Magnetic hover effect on CTAs

### Motion Components (`components/motion/`)
- `KineticHeadline.tsx` — Animated headline component
- `ClientTicker.tsx` — Client logo ticker/marquee
- `StatCounter.tsx` — Animated number counter
- `index.ts` — Re-exports

### Layout Components (`components/layout/`)
- `Nav.tsx` + `Nav.module.css` — Floating pill nav
- `Footer.tsx` + `Footer.module.css`

### Section Components (`components/sections/`)
- `Hero.tsx` — Homepage hero
- `Services.tsx` — Services overview section
- `CaseStudies.tsx` — Homepage proof teaser: horizontal rail of a fixed showcase
  list, minimal prev/next + link to `/work` (no signal bar or progress UI; rail
  scroll uses the track only, aligned with the work index editorial pattern).
  Accessibility: `aria-live` announces the active slide; the rail is a focusable
  `region` with Arrow Left/Right and Home/End to change slides; prev/next icons
  are `aria-hidden` (labels on buttons).
- Work index `WorkStudioCarousel`: studio filter uses tab ids + `tabpanel` wiring,
  arrow keys move between tabs; lightbox is `role="dialog"` with initial focus
  on close, `Escape` and overlay click dismiss, body scroll locked while open,
  focus returns to the thumb that opened it; close control has a visible
  `:focus-visible` ring.
- Work index `WorkGrid` / `WorkSubNav`: same tablist pattern as the studio strip —
  stable tab `id`s, `aria-controls` on each tab pointing at the filtered results
  `tabpanel`, roving `tabIndex`, Arrow Left/Right to change segment; panel uses
  `aria-labelledby` for the active tab.
- `CmoAccessModal`: on open, focus moves to the name field when the form phase is
  shown; on close, focus returns to the element that had focus before open.
- `CaseStudyContent.tsx` / `CaseStudyImages.tsx` — Work detail sections
- `AboutTeaser.tsx` — About teaser component (not rendered on homepage as of 2026-03-29; available for `/about` or other future use)
- `Testimonials.tsx` — Testimonials section
- `ContactCTA.tsx` — Contact CTA section
- `ContactForm.tsx` — Contact form (React Hook Form + Zod)
- `FeaturedTool.tsx` / `FeaturedToolInner.tsx` — Lab featured tool
- `StudioGallery.tsx` — Cloudinary gallery
- `CareerTimeline/` — About page career timeline
- `WorkDetail/` — Work detail page components
- `WorkIndex/` — Work index page components

### Lab Components (`components/lab/`)
- `LabDetailPage.tsx` — Lab tool detail layout
- `LabModal.tsx` — Lab tool iframe modal: on open, focus moves to the close
  control; on close, focus restores to the prior active element; `Escape` and
  overlay click still close; body scroll locked while open; close button has a
  visible `:focus-visible` ring.
- `CmoAccessModal.tsx` — CMO Simulator access gate

### UI Components (`components/ui/`)
- `background-paths.tsx` — 21st.dev background paths (adapted)
- `button-colorful.tsx` — 21st.dev button colorful (adapted)
- `grid-card.tsx` — 21st.dev grid card (adapted)
- `underline-animation.tsx` — 21st.dev underline animation (adapted)
- `gallery-hover-card.tsx` — Studio gallery hover card
- `masonry-grid.tsx` — Masonry layout grid
- `ScrollProgress.tsx` — Scroll progress indicator
- `CookieConsent.tsx` — Cookie consent banner
- `BackToTop.tsx` — Back to top button

### Provider Components (`components/providers/`)
- `LenisProvider.tsx` — Smooth scroll provider
- `Analytics.tsx` — Analytics tracking

### Custom Hooks (`hooks/`)
- `useCursorFollow.ts` — Cursor position tracking
- `useFinePointer.ts` — Fine pointer detection
- `useMagneticEffect.ts` — Magnetic button effect
- `useReducedMotion.ts` — Reduced motion preference
- `useScrollAnimation.ts` — GSAP scroll animation
- `useScrollDirection.ts` — Scroll direction detection
- `useTypingEffect.ts` — Typing animation

---

## Canonical Slug Rules

Several case study slugs were renamed. These are the canonical slugs:
- `riley-bennett-egloff` (not rbe-law)
- `primarycare-indy` (not primary-care-indy)
- `urgentcare-indy` (not urgent-care-indy)
- `317-bbq` (not three-seventeen-bbq)

Redirects live in `next.config.js`.

---

## Asset Infrastructure

### Cloudinary
- Cloud name: `djhqowk67`
- Use Cloudinary Next.js SDK for all project/studio images
- Reference images by public ID, not local path
- Studio gallery pulls from Cloudinary folders:
  `/studio/photography/`
  `/studio/graphic-design/`
  `/studio/proof/`

### Cloudinary image reference pattern
```ts
// Use public ID, not full URL, in data files
logoPublicId: 'graston_technique_logo'
heroPublicId: 'PMC-Dr.-Pike-Xray'
cardPublicId: 'primary-care-indy-website'

// Cloudinary URL pattern for screenshots in data/labs.ts:
src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/[public-id].png'
```

### Fonts
- Cabinet Grotesk: already in `/public/fonts/cabinet-grotesk/` (woff2 files)
- Loaded via `next/font` `localFont` in `app/layout.tsx`

### Environment Variables
- `RESEND_API_KEY` — contact form email delivery (configured in .env.local + Vercel)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67`

---

## Notable Work / Case Studies — Key Metrics

| Client | Industry | Key Metric | Notes |
|---|---|---|---|
| Graston Technique | SaaS/Healthcare Training | +212% qualified leads, 95% overhead reduction, 48hrs/wk saved | Flagship — automation platform |
| Pike Medical Consultants | Healthcare | 45% patient growth over 3 years | Fractional CMO, 5 divisions |
| PrimaryCare Indy | Healthcare | 75% more bookings, 300% organic traffic, 210% ROI | Under Pike Medical umbrella |
| UrgentCare Indy | Healthcare | +35% patient bookings, top-3 local rankings, 60% visits via online check-in | Under Pike Medical umbrella |
| Riley Bennett Egloff | Legal | 7+ year engagement, 29-attorney firm | Embedded marketing |
| Tuohy Bailey & Moore | Legal | 45% bounce reduction, 60% more form submissions | Brand + web rebuild |
| 317 BBQ | Hospitality | 120% time on site, 40% order conversion, 2x catering | Photography-led storytelling |
| Hoosier Boy Barbershop | Local Retail | 90% more bookings, 200% social, #1 local search | Brand identity + booking |
| Russell Painting | Local Service | 4.9★ Google, heritage narrative as #1 conversion driver | SEO + trust architecture |
| Behr Pet Essentials | E-Commerce | +28% avg cart, -40% support tickets, 3x conversion | Content-first strategy |
| Circle City Kicks | Local Retail | Full brand system, local identity mark | Streetwear branding |
| Black Letter | Legal Advisory | Full identity system, premium positioning from day one | Brand identity |
| Clean Aesthetic | Medical Aesthetics | 0 to full brand in one engagement, concierge pricing launch | Brand identity |
| Primary Colours | Non-Profit | $46k+ revenue, 10,000+ audience, 200+ artists | Event + sponsorship |

---

## Testimonials (use verbatim — full quotes)
- "Jacob has a great balance of strategic thinking and hands-on
  execution... I'd recommend him to anyone looking for a marketing
  professional who's both forward-thinking and results-oriented."
  — Jesse Wey, 2025
- "Jacob is the kind of marketer who makes an immediate impact...
  figuring out how to put new technologies to work in practical ways."
  — Andrew Bastnagel, 2025
- "Exuberance and moxie are unparalleled... ability to implement
  strategies that produce a positive ROI." — Kevin Martin See
- "Energy and ingenuity are extremely valuable assets... expanded
  our vision." — Ben Worrell

Display order: Jesse Wey → Andrew Bastnagel → Kevin Martin See → Ben Worrell

---

## Technical Requirements
- Use `next/font` localFont for Cabinet Grotesk, `next/font/google` for Inter
- shadcn/ui base components customized to brand palette — never default
- Framer Motion spring-physics for all animation (see presets above)
- Contact form: React Hook Form + Zod + Resend API
- All images via `next/image` with descriptive alt text (never `<img>`)
- **`next/image` is `unoptimized: true`** — this is the current project setting in `next.config.js`.
  Don't assume server-side Next image transforms are active.
- Full mobile responsiveness — mobile-first approach
- Dark mode is the default runtime mode; scoped light variants are allowed when strategically justified and token-driven
- Target Lighthouse score: 95+ all metrics
- Vercel deployment via GitHub auto-deploy
- `robots.ts` and `sitemap.ts` auto-generated
- Open Graph meta tags on every page
- Structured data (JSON-LD) via `components/JsonLd.tsx`
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- No `z-[9999]` — z-index is systematic and documented
- No commented-out dead code
- `metadata` export in every `page.tsx`
- `lucide-react` still in package.json but not imported — use `@phosphor-icons/react` only

---

## Folder Structure
```
/app
  /page.tsx              — Home
  /about/page.tsx        — About
  /contact/page.tsx      — Contact
  /work/page.tsx         — Case studies index ✅
  /work/[slug]/page.tsx  — Case study detail ✅
  /lab/page.tsx          — legacy redirect to /tools ✅
  /lab/[slug]/page.tsx   — legacy redirect to /tools or /work/[slug] ✅
  /tools/cmo-simulator/  — CMO Simulator (gated) ✅
  /services/page.tsx     — Services index ✅
  /services/[slug]/page.tsx — Service pages ✅
  /studio/page.tsx       — Studio gallery ✅
  /api/contact/          — Contact form API ✅
  /api/cmo-simulator-access/ — CMO gate API ✅
  /api/studio/           — Studio API ✅
  /robots.ts             — SEO ✅
  /sitemap.ts            — SEO ✅
/components
  /ui                    — shadcn base components (brand-customized) + 21st.dev
  /sections              — Page sections (Hero, Services, About, etc.)
  /layout                — Nav, Footer
  /motion                — "use client" Framer Motion wrapper components
  /3d                    — Three.js / R3F scenes (SSR-disabled)
  /interactive           — CursorSpotlight, MagneticButton
  /lab                   — Lab-specific components
  /providers             — LenisProvider, Analytics
/data
  /labs.ts               — 3 lab entries (LAB_DETAIL_DATA)
  /services.ts           — All service page content
  /testimonials.ts       — Testimonial data
  /work/work-index.ts    — 20 work card grid entries
  /work/work-data.ts     — Full case study content
/hooks
  useCursorFollow, useFinePointer, useMagneticEffect,
  useReducedMotion, useScrollAnimation, useScrollDirection, useTypingEffect
/lib
  /motion.ts             — Spring presets + shared animation variants
  /case-studies.ts       — Case study helpers
  /cloudinary.ts         — Cloudinary utilities
  /utils.ts              — General utilities
  /work.ts               — Work data helpers
/app
  /globals.css           — CSS custom properties + resets
/components + /app
  /[Component].module.css — Per-component CSS Modules
/public
  /fonts/cabinet-grotesk/  — .woff2 files ✅
  /labs/                   — Local HTML tool files
    clinical-compass/
    investment-roi-planner/
    smart-sales-pricing/
    license-requirements/
/skills                  — Claude Code skill files (co-located in repo)
  /darling-martech-ui/SKILL.md
  /darling-martech-redesign/SKILL.md
  /darling-martech-copy/SKILL.md
/case-studies            — Raw case study research markdown
  behr-pet-case-study.md
  russell-painting/russell-painting-case-study.md
/docs/superpowers/       — Implementation specs and plans
  /plans/
  /specs/
/docs/context/           — Consolidated strategy, architecture, messaging, repo maps
  /project/
    /service-pages/      — Service-page system docs (template, proof matrix, briefs, tracker)
  /strategy/
  /repo/
/docs/archive/           — Archived plans and research artifacts
  /plans/
  /outputs/
/docs/REPO-OPTIMIZATION-PLAN.md — Repo cleanup governance + hygiene checklist
```

---

## Current State and Priorities

### Current state
- Core production surface is live on `darlingmartech.com`: `/`, `/services`, `/services/[slug]`, `/work`, `/work/[slug]`, `/tools`, `/tools/cmo-simulator`, `/tools/attribution-snapshot`, `/about`, `/contact`, `/studio`.
- Tools surface is intentionally constrained to four visitor utilities: CMO Simulator, GEO Readiness Auditor, CMO Roadmap Generator, Attribution Snapshot.
- `/lab` remains legacy redirect behavior only; it is not a user-facing IA concept.
- Service architecture is parent/child and problem-cluster driven with proof routing and intent-aware CTAs.
- Content/data source-of-truth remains typed files in `data/`; avoid hardcoding narrative content in components.

### Next priorities
1. `/pricing` (after pricing/content session).
2. Blog infrastructure + `/blog/[slug]` (when thought-leadership workflow is scoped).
3. Continue tightening service child-page depth and proof-link quality when new offers ship.

---

## Content Sessions Still Needed
1. Pricing — define service tiers before building page
2. Services — expand each service page with process steps if needed

---

## Do Not Regress
- Do not reintroduce `/lab` as a primary UX/content surface; keep it as redirects only.
- Keep route semantics strict: `/tools` for visitor utilities, `/work` for proof/case studies, `/services` for offer architecture.
- Preserve CTA intent params where required (`/contact?intent=service|work|tool|unsure`).
- Keep one primary conversion path per page section; avoid CTA sprawl.
- Do not let preview-domain wording replace production-domain wording in strategy/architecture guidance.

---

## Freshness Protocol

### Update triggers (mandatory)
Update `CLAUDE.md` within the same working session whenever any of these change:
- Route inventory or redirect behavior.
- Navigation labels/IA framing.
- Tool inventory or tool launch model.
- Service packaging, child slugs, or proof-linking logic.
- Contact intent model or CTA routing conventions.

### Monthly sanity check (lightweight)
1. Validate production page-role alignment (`/services`, `/work`, `/tools`, `/contact`).
2. Scan for stale legacy language (`/lab` operational wording, old phase logs, obsolete routes).
3. Confirm canonical URLs and offer language match production copy.
4. Remove migration/history notes that no longer alter implementation decisions.
5. Verify “Do Not Regress” rules still match runtime behavior.

---

## Quick Start

```bash
npm run dev    # Development server on localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

**Build gotcha:** If `npm run build` fails with "generate is not a function",
a conflicting shell env var is set from another Next.js project:

```bash
__NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
```

---

## Gotchas & Known Issues

- **Tailwind policy is constrained, not banned** — `tailwind.config.ts` remains for shadcn token infrastructure. Keep brand visuals in CSS Modules; use Tailwind for layout and approved structural/functional utilities.
- **`next/image` is `unoptimized: true`** — current project setting; do not assume Next.js image optimization is enabled.
- **Slug renames** — Canonical slugs: `riley-bennett-egloff`, `primarycare-indy`, `urgentcare-indy`. Redirects in `next.config.js`.
- **`lucide-react` in package.json** — Still listed but unused. Use `@phosphor-icons/react` only.
- **Lab content in `data/labs.ts`** — The three active tool entries are data-driven from `LAB_DETAIL_DATA`; legacy lab pages are now handled by redirects and work-case-study routes.
- **CMO Simulator access** — Gated via `CmoAccessModal` + `/api/cmo-simulator-access`. SessionStorage bypass for returning visitors.
- **WorkAmbient + ServicesAmbient** — Both use `dynamic(..., { ssr: false })`. If adding new 3D scenes, follow same pattern.
- **`case-studies/` directory** — Contains raw markdown research files, NOT used by the app. App reads from `data/work/work-data.ts`.
- **`.worktrees/`** — Keep this directory out of the repo root unless an active local worktree is intentionally being used.
- **`docs/archive/outputs/marketing-strategy-service.md`** — Archived research artifact. Not used by app.
