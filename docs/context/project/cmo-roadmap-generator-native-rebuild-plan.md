# CMO Roadmap Generator Native Rebuild Plan

## Goal

Rebuild the CMO Roadmap Generator directly inside `darling-martech` so it becomes a first-class Darling tool instead of an iframe-launched sidecar app.

## Why this approach

The standalone app is not especially complex. The higher-risk move is not rebuilding the logic — it is dragging over a second styling system, page shell, and implementation pattern that does not match the repo.

A native rebuild keeps the tool aligned with:
- the current `/tools` IA
- existing CSS Modules styling
- current metadata and sitemap rules
- Darling CTA patterns
- native analytics and internal linking
- future tool-layer consistency

## Scope

### In scope
- native detail page
- native intake flow
- native results artifact
- native email/send route
- `/tools` index update
- sitemap and metadata coverage
- internal linking from tools/services/work where relevant

### Out of scope for first pass
- generic `/tools/[slug]` abstraction
- redesigning the full `/tools` index
- creating a shared framework engine for all tools
- CRM/webhook integrations beyond a stub logging hook
- server-side PDF generation

## Target route structure

- `/tools/cmo-roadmap-generator`
- `/tools/cmo-roadmap-generator/intake`
- `/tools/cmo-roadmap-generator/results`
- `/api/tools/cmo-roadmap-generator/send-roadmap`

## Build order

1. Native detail page
2. Native intake flow
3. Native results artifact
4. Native email/send route
5. `/tools` index update
6. Sitemap + internal linking pass
7. Related framework assets and scorecards layer

## Functional contract

### Intake
The intake should capture:
- business type
- business stage
- main goal
- bottleneck
- active channels
- stack maturity
- team capacity

### Output
The results artifact should include:
- executive summary
- business summary snapshot
- top 3 priorities
- three 30-day phases
- why this roadmap
- recommended service path
- engagement path
- watch-outs
- share URL
- print/PDF support
- send-by-email flow

## Architectural rules

- keep routes explicit and static
- use CSS Modules
- prefer typed utility modules under `lib/tools/cmo-roadmap-generator/`
- do not hardcode long content in component bodies if it belongs in a data/config file
- do not recreate the standalone repo's styling layer
- port the logic, not the shell

## Suggested folder map

```
app/tools/cmo-roadmap-generator/
app/api/tools/cmo-roadmap-generator/send-roadmap/
components/pages/
components/tools/cmo-roadmap-generator/
lib/tools/cmo-roadmap-generator/
docs/context/project/
```

## Validation

- `npm run lint`
- `npm run build`
- `npm run check:metadata`
- `npm run check:links`
- `npm run check:graph`
