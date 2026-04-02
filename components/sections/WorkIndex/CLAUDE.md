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
- One dominant metric per card in the grid is the default; extra footer meta is usually noise.
- Favor whitespace and consistent rhythm; do not “pack” cards to show breadth.

### Proof-led vs dashboard-like behavior
- This page is not a reporting interface. Avoid filters/controls that feel like an analytics product.
- Any segmentation should remain **minimal** and should not cause system-children to leak into the supporting grid.

### Ordering rules (prefer data-layer logic)
- Ordering should be controlled by the data layer (tiers + stable ranking), not component-local heuristics.
- **Flagship first**, then supporting. System-children are excluded from the main supporting grid and only appear via the connected strip under their parent.
- Within the flagship tier, use `editorialRank` on `WorkCard` entries in `work-index.ts` to lock the editorial display order (lower number = higher position). Current ranks: Graston Technique (1), 317 BBQ (2), Pike Medical (3), Hoosier Boy (4). Unranked flagships fall after all ranked ones.
- **Do not re-order flagships in the component** — set `editorialRank` in the data instead.

### Connected-system strip — label rules
- Strip label varies by parent category: `Healthcare` parents → "Divisions inside this engagement"; all others → "Systems built inside this engagement".
- Each child pill shows one compact proof signal (the child's first metric) as a secondary label beside the client name.
- Keep pills single-line where possible. Avoid adding more than one metric per pill.

### Anti-patterns to avoid
- Promoting system-child entries into the primary grid “to fill space”
- Adding heavy UI chrome (badges, progress, density metrics) that competes with proof
- Duplicating the same proof item in multiple visual forms (grid + strip + repeated sections)
- Reordering in the UI without updating the data model (creates drift and makes curation hard)

