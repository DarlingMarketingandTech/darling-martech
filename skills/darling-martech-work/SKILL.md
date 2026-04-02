---
name: darling-martech-work
description: >
  Work (/work) taxonomy and decision rules for Darling MarTech. Use when
  editing or evaluating the work index or work detail pages, changing the
  work data model, adding/removing a case study, adjusting flagship/supporting/system-child
  hierarchy, connected-system strip behavior, template weights, route-out rules,
  or any work↔service proof mapping. Triggers on: "work index", "case study grid",
  "work detail template", "system child", "connected strip", "proof ordering",
  "Pike Medical", "Graston", or "work to service mapping".
---

# Darling MarTech — Work Skill

## Primary rule
`/work` is the proof surface. It should feel curated, editorial, and outcome-led — not like a portfolio dump or a dashboard UI.

---

## Work page roles

### `/work` (index)
- **Job:** fast scanning + trust + routing into a small set of high-signal builds.
- **Tone:** proof-led, calm density, minimal controls.
- **Curation:** curated, not exhaustive. Favor clarity over coverage.

### `/work/[slug]` (detail)
- **Job:** explain what changed (problem → intervention → outcome) and then close with disciplined route-out links.
- **Tone:** editorial, not CMS-like.

---

## Hierarchy (flagship / supporting / system-child)

### Flagship
- Leads the index. Carries the most trust and context.
- Can have connected system-children beneath it (strip).

### Supporting
- Normal case studies that broaden range without competing with the flagship layer.
- Lives in the supporting grid after flagship.

### System-child
- A sub-project inside a parent engagement (e.g., Graston systems, Pike divisions).
- **Rule:** never compete with the main grid. Route via a connected strip under the parent.

---

## Connected-system strip behavior
- **Under-parent only:** render system-children as a compact linked strip beneath the parent engagement.
- **Not a second grid:** no thumbnails, no multi-metric blocks, no “dashboard” density.
- **Purpose:** navigation + mechanism proof routing, not breadth flexing.

---

## Work detail template weights

Use the smallest template that communicates the proof.

- **Flagship longform:** the anchor stories. More narrative + context (still proof-first).
- **Supporting standard:** tight, straightforward case studies.
- **System compact:** default for system-children. Lead with system role + outcome; keep scope tight.
- **System expanded:** only when mechanism clarity is necessary; still avoid feature-tour bloat.

---

## Parent/child proof logic
- Parent engagement is the flagship story; children are slices of operational/system proof.
- A system-child should clearly read as “inside X engagement” and should route back to the parent context.
- Do not elevate a child into a standalone flagship just because it’s visually impressive.

**System-parent archetypes**
- **Graston Technique**: flagship parent with a large system catalog beneath it.
- **Pike Medical Consultants**: flagship parent with division-level children (PrimaryCare Indy, UrgentCare Indy, etc.).

---

## Route-out rules (end the page cleanly)
- Provide **one** service backlink when available (“This build supports …”).
- Provide **up to 2** related proof links (curated).
- Avoid “related sprawl” (prev/next + multiple grids + rails). The page should close and route out once.

---

## Proof ordering / priority
- Prefer one dominant proof signal over multiple competing metrics.
- Flagship-first ordering should be driven by the **data layer** (tier ranking + stable curation), not component-local one-offs.

---

## Service-proof interaction rules
- Work pages are the canonical proof surface.
- Service pages contextualize proof; they do not duplicate/replace work pages.
- Work → service mapping should remain a single clean link, not a directory.

---

## Anti-patterns (purge on sight)
- Flattening hierarchy (system-children mixed into the supporting grid)
- “Dashboard UI” behavior on `/work` (heavy controls, dense meta, product-like chrome)
- System-child pages that read like full standalone case studies (too much narrative, too many sections, too many links)
- Route-out sprawl (multiple competing “related” systems)
- UI-side reordering that isn’t reflected in `data/work/*` (drift + curation confusion)

