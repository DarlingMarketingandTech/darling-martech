# Darling MarTech Custom Skills

This folder contains repo-native skills for future Claude Code sessions.

These skills do not replace `CLAUDE.md` or the docs in `docs/context/project/service-pages/`.
They exist to:
- reduce strategic drift
- enforce page-role logic
- keep proof assignment and CTA behavior consistent
- speed up future homepage, services, and proof work

## Skills

### `darling-martech-homepage`
Use when working on:
- `app/page.tsx`
- homepage section components
- homepage copy
- hero / services intro / homepage CTA structure

Main job:
- keep the homepage lean
- enforce homepage section roles
- prevent the removed About teaser logic from reappearing

### `darling-martech-services`
Use when working on:
- `/services`
- child-service pages
- service routes and slugs
- service-page build order
- service CTA logic

Main job:
- enforce the 4-cluster services system
- enforce the layered writing rule
- keep service pages problem-led, not jargon-led

### `darling-martech-proof`
Use when working on:
- `/work`
- service-page proof blocks
- proof snippets
- linking between work, services, tools, and contact

Main job:
- keep proof canonical at `/work`
- assign proof to services correctly
- prevent weak or irrelevant proof usage

## Source of truth

Always consult these first:
- `CLAUDE.md`
- `docs/context/project/service-pages/README.md`
- the relevant service-page docs in `docs/context/project/service-pages/`

The skills are an operating layer, not the only source of truth.