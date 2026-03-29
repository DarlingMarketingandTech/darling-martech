# Skills — Darling MarTech

Custom Claude Code skills for the Darling MarTech repo.
These skills extend `CLAUDE.md` with focused, task-specific operating briefs.

## When to use skills vs CLAUDE.md

`CLAUDE.md` is the master project brief — always in context.
Skills activate for specific task types and provide deeper decision rules for that domain.

---

## Skill index

### `darling-martech-homepage`
**Use when:** editing `app/page.tsx`, any homepage section component, writing homepage copy, or deciding whether to add/remove a homepage section.
**Governs:** section roles, hero rules, services section framing, CTA intent routing, drift prevention (AboutTeaser).

### `darling-martech-services`
**Use when:** building any child-service page, rewriting the services index, choosing what to build next, assigning proof to a service, creating any new `/services` route.
**Governs:** build order (batch sequence), page structure (9-section template), layered writing rule, services index structure, CTA rules, route/slug conventions.

### `darling-martech-proof`
**Use when:** writing any proof block, assigning proof to a page, choosing which case study to reference, writing CTA-adjacent credibility lines, verifying proof links.
**Governs:** service-to-proof matrix, canonical metrics (verbatim), canonical slug list, proof block structure, proof anti-patterns.

### `darling-martech-copy`
**Use when:** writing or reviewing any copy on the site — headlines, CTAs, body copy, microcopy, error states.
**Governs:** Jacob's voice, tone rules, copy anti-patterns.

### `darling-martech-ui`
**Use when:** building or editing any visual component, layout, or design decision.
**Governs:** design system, component library, motion patterns, CSS Modules rules.

### `darling-martech-redesign`
**Use when:** auditing or cleaning up existing UI for AI-looking or inconsistent patterns.
**Governs:** redesign audit protocol, pattern replacement rules.

### `darling-martech-seo`
**Use when:** working on SEO, metadata, schema, internal linking, GEO/AI-search structure.
**Governs:** SEO implementation, schema markup, GEO optimization, E-E-A-T signals.

### `darling-martech-labs`
**Use when:** working on `/tools` or `/lab` routes, tool data, lab-to-work mapping.
**Governs:** tool lifecycle, tool-to-service linking, lab vs work classification.

### `darling-martech-data`
**Use when:** working on analytics, attribution, reporting, KPI planning, or data model patterns.
**Governs:** data patterns for services, work, tools, and testimonials.

---

## How these skills relate to each other

Homepage, services, and proof form a connected decision stack:

```
darling-martech-homepage
  → governs what goes on the homepage vs what gets pushed to services
  → defers proof copy to darling-martech-proof

darling-martech-services
  → governs what goes on service pages and in what order to build them
  → defers proof assignment to darling-martech-proof

darling-martech-proof
  → governs proof assignment, metrics, and linking across all pages
  → page-agnostic; used by both homepage and services work
```

They almost never conflict. Homepage + proof fire together for homepage proof copy. Services + proof fire together when building child-service pages.
