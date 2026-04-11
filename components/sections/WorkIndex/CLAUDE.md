## Work Index (`/work`) — Local Guidance

**Role:** the proof library entry point. A prospect should be able to scan fast, trust what they see, and click into a small set of high-signal builds. Curated, not exhaustive.

### Hierarchy (never flatten this)
- **Flagship**: the primary case studies. These lead the page and carry the strongest “why trust me” payload.
- **Supporting**: everything that isn’t flagship and isn’t a system-child.
- **System-child**: sub-projects that live *under* a parent engagement. They should not compete with the main grid.

### Connected-system strip rules
- **Only under the parent**: system-children render as a compact linked strip beneath their parent case study.
- **Label is stable**: treat it as “Systems behind this work” / “Systems built” territory — not a second grid.
- **Density discipline**: no thumbnails, no multi-metric payloads, no “dashboard UI” flourishes. It’s a routing aid.

### Card spacing + density principles
- Prefer **calm, proof-led scanning** over “more info per card.”
- One dominant metric per card in the grid is the default.
- Favor whitespace and consistent rhythm; do not pack cards to show breadth.

### Supporting-card simplification (2026-04 refinement)
- Supporting cards should use a **single category eyebrow** (not long compound labels).
- Show **one dominant metric early** (before summary where possible).
- Avoid footer/CTA chrome on supporting cards — they should feel editorial, not interactive-heavy.

### Proof-led vs dashboard-like behavior
- This page is not a reporting interface. Avoid filters/controls that feel like an analytics product.
- Any segmentation should remain **minimal** and should not cause system-children to leak into the supporting grid.

### Ordering rules (prefer data-layer logic)
- Ordering should be controlled by the data layer (tiers + stable ranking), not component-local heuristics.
- **Flagship first**, then supporting. System-children are excluded from the main supporting grid.

### Anti-patterns to avoid
- Promoting system-child entries into the primary grid “to fill space”
- Adding heavy UI chrome (badges, progress, density metrics) that competes with proof
- Duplicating the same proof item in multiple visual forms
- Reordering in the UI without updating the data model

### Discovery model reference

Before adding any filter, chip, segment, or taxonomy change to this component,
read `docs/context/project/work-discovery-model-spec.md`.

Approved future change (not yet implemented): when `activeSegment === 'Systems'`,
include system-tier entries grouped under their parent flagship using an expanded
`SubProjectStrip`. In the All view, the strip stays compact — no change to current
behavior. This is Pass 2 in the spec's implementation sequence.
