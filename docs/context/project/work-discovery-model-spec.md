# /work Discovery Model — Strategy & Spec
**Date:** 2026-04-11
**Status:** Approved — implementation-ready reference for future `/work` passes

---

## 1. What /work is for

`/work` is a **proof surface**, not a portfolio archive.

Its one job: give a prospect enough credibility signal, fast, to believe Jacob
can solve their specific problem — and then route them somewhere meaningful.

Three constraints follow from that:

| Constraint | Why |
|---|---|
| **Scan-first** | Prospects don't study work pages; they scan to see if the work matches their problem |
| **Curated, not exhaustive** | Showing everything signals insecurity; curation signals judgment |
| **Editorial, not dashboard** | Heavy filters and controls feel like SaaS reporting, not professional proof |

These constraints are not preferences — they are the design target. Every future
discovery improvement must pass the scan-first test before shipping.

---

## 2. What visitors should be able to discover

### 2a. Flagship proof (already working)
The four strongest anchor cases:
- **Graston Technique** — automation + systems + strategic leadership
- **Pike Medical Consultants** — healthcare growth + fractional CMO
- **317 BBQ** — conversion optimization + hospitality
- **Hoosier Boy Barbershop** — local brand + booking + local search

These lead the page. Their current placement and framing is correct.

### 2b. Supporting proof
All non-flagship, non-system-child entries. Currently: Legal, Hospitality/Local
supplementary, E-Commerce, Brand Identity, Non-Profit.

Discovery gaps today:
- No signal for **what kind of problem** the supporting proof solved
- No signal for **industry/business type** beyond category eyebrow
- No path from a supporting card into a relevant service page

### 2c. System-child proof (biggest current gap)
System-children (The Launchpad, The Compass, The Fortress, Graston Growth Engine,
PrimaryCare Indy, UrgentCare Indy, Barbershop Command Center, etc.) are currently
**reachable only via the connected-system strip under their parent flagship**.

This is correct architecture. The gap is visibility density:
- The strip exists but is easy to miss on mobile
- No path to individual system-child work from within a filtered segment
- System-children have strong proof metrics but no way to surface them for
  a visitor who arrives with a specific problem ("I need a booking system")

### 2d. Service-connected proof
Currently delivered via `?service=` query param (passive, URL-only).
Not surfaced as a visitor-facing control.

### 2e. Industry/business-type proof
Currently implied by category label (Healthcare, Legal, etc.).
No dedicated industry filter. Would be useful for visitors who think
"I'm in healthcare — what has Jacob done for healthcare businesses?"

---

## 3. Permitted discovery controls

The following are approved for future implementation, in priority order:

### Approved
| Control | When to use |
|---|---|
| **Segment chips** (current) | Top-level coarse filtering — All / Client Work / Systems / Brand |
| **Visible category groups** (current) | Group supporting proof by client type inside the All view |
| **Connected-system strip under parent** (current) | Surface system-children without polluting the main grid |
| **System-child visibility improvement** | Allow system-children to appear in the Systems segment explicitly, not just via the parent strip |
| **Industry/problem chips** (future) | Lightweight second row: Healthcare / Local Service / Legal / E-Commerce / Brand / Systems |
| **Service-cue link on cards** (future) | Single service label on supporting card that routes to `/services/[slug]` |

### Conditionally approved
| Control | Condition |
|---|---|
| **"Systems" segment showing system-children** | Only when the system-child strip under the parent remains — the segment view shows depth, the strip shows connection |
| **Industry filter** | Only as a chip/pill row; not a dropdown, not a sidebar |

---

## 4. What is NOT allowed (current guardrails)

These patterns are ruled out for the current scale and proof-surface character
of `/work`. Most are hard — a few are strong guardrails that could be revisited
if the proof catalog grows significantly or visitor behavior data shows a clear gap.
Each entry notes which category it falls into.

| Pattern | Status | Reason |
| --- | --- | --- |
| Dropdown filter UI | Hard ban | Feels like SaaS reporting, not editorial proof |
| Sidebar filter panel | Hard ban | Breaks editorial layout, competes with proof density |
| Hidden accordion/disclosure as primary discovery | Hard ban | Forces active assembly rather than passive scanning |
| Deep conditional filter logic in the UI | Hard ban | If the UI needs IF/THEN parent/child conditions, the taxonomy model is wrong |
| System-children surfaced as main-grid peers | Hard ban | Violates proof hierarchy — always subordinate to their parent |
| Related proof sprawl at page end | Hard ban | Not a discovery mechanism; governed separately by work detail route-out rules |
| Dense metadata on cards | Hard ban | Metric + label + category + badge + service tag = noise, not proof |
| Multi-select taxonomy filter | Strong current guardrail | Too much cognitive load at the current scale. Revisit only if the catalog grows substantially and a single-select chip model demonstrably fails real visitor behavior. Do not relax without a clear use-case argument. |

---

## 5. Taxonomy model for future implementation

### Current state
The data model has:
- `dashboardTier`: `'flagship' | 'system' | 'standard'` — proof hierarchy
- `category`: string — coarse editorial group (e.g. `'Healthcare'`, `'Brand Identity'`)
- `serviceIds`: `string[]` — service tags (populated inconsistently)
- `industryIds`: `string[]` — industry tags (populated on some entries)
- `outcomeIds`: `string[]` — outcome tags (populated on some entries)
- `relatedProjectSlugs` / `parentProjectSlug` — parent/child wiring

### Problem
These fields exist but are not used by the UI for visitor-facing discovery
(only `category` and `dashboardTier` drive current filtering). The rest is
structural data that Claude uses for proof assignment — not visible to visitors.

### Recommended model: flat multi-dimensional tags

Introduce a `discoveryTags` field as a small, flat optional extension. **Do not
replace existing fields** — this is additive.

```ts
// Proposed addition to WorkCard in lib/work.ts or data/work/work-index.ts

type WorkDiscoveryTags = {
  /**
   * Which service cluster(s) this proof supports.
   * Maps to the /services cluster labels (not child-service slugs).
   * Use 1–2 maximum. Single-dimension preferred.
   * Valid values: 'strategy' | 'website-ux-brand' | 'crm-automation-ai' | 'growth-seo-demand'
   */
  serviceTypes?: Array<'strategy' | 'website-ux-brand' | 'crm-automation-ai' | 'growth-seo-demand'>

  /**
   * Business type — how the client describes themselves.
   * Use 1–2 maximum. Prefer client-vocabulary terms.
   * Valid values: 'local-service' | 'healthcare' | 'legal-professional' | 'ecommerce' | 'saas-tech' | 'nonprofit' | 'brand-identity'
   */
  businessTypes?: Array<'local-service' | 'healthcare' | 'legal-professional' | 'ecommerce' | 'saas-tech' | 'nonprofit' | 'brand-identity'>

  /**
   * Proof role — internal use for display logic only.
   * Controls tier rendering, filter exclusion, system-strip inclusion.
   * Do not expose proofRole as a visitor-facing filter label.
   */
  proofRole?: 'flagship' | 'supporting' | 'system-child'
}
```

**Note on `proofRole`:** This field formalizes what `dashboardTier` already implies.
It is useful because `dashboardTier` has `'standard'` instead of `'supporting'` — a
naming inconsistency that `proofRole` corrects cleanly. Either normalize `dashboardTier`
or add `proofRole` as a mapping alias. Do not use both in the same UI logic.

### Why flat, not hierarchical?

A hierarchical taxonomy (Industry → Service → Outcome) creates the following problems:
1. Conditional filter logic in the UI: "show only healthcare entries that also match CRM"
2. Category/child mismatch: many entries span categories (e.g. Barbershop Command Center is
   local service + CRM + booking system)
3. Parent/child proof entries share taxonomic tags (Graston Technique and The Launchpad
   both map to CRM Automation) — a parent/child filter would need extra deduplication

A flat model with `serviceTypes` and `businessTypes` as 1–2 value arrays means:
- Each entry tags itself honestly
- The UI can filter by either dimension independently
- No conditional logic required in the component
- System-children are excluded by the existing `proofRole: 'system-child'` check,
  not by tag logic

### Canonical tag values (do not invent new ones without updating this spec)

**serviceTypes:**
| Value | Maps to /services cluster |
|---|---|
| `strategy` | Strategy & Leadership |
| `website-ux-brand` | Websites, UX & Brand |
| `crm-automation-ai` | CRM, Automation & AI |
| `growth-seo-demand` | Growth, SEO & Demand |

**businessTypes:**
| Value | Plain-English label for UI |
|---|---|
| `local-service` | Local service business |
| `healthcare` | Healthcare |
| `legal-professional` | Legal & professional |
| `ecommerce` | E-commerce |
| `saas-tech` | SaaS / tech |
| `nonprofit` | Nonprofit |
| `brand-identity` | Brand identity work |

---

## 6. How system-child projects become more visible

### Current pattern (correct, keep)
System-children render in a compact linked strip under their parent flagship card.
The strip label is contextual:
- `'Systems built inside this engagement'` for Graston system-children
- `'Divisions inside this engagement'` for Pike Medical divisions

### The gap
When a visitor filters to `Systems` segment or arrives from a service page link,
they see no system-children. They only see flagships that have a `Systems` category
(Graston Technique is `Automation & Systems`; the individual system entries do not
appear in the supporting grid).

### Recommended pattern: conditional inclusion in the Systems segment

When `activeSegment === 'Systems'`, include `system` tier entries in the visible
set alongside their parent. Group them under the parent card — not as peers in the
main supporting grid.

Rendering rule:
1. Parent flagship renders normally (full flagship card)
2. System-children render as an **expanded strip** below the parent card when the
   Systems segment is active — same compact item format, but with the first metric
   visible and a slightly looser layout than the All-view strip
3. In the All view, the strip remains compact (no change to current behavior)

**What this avoids:**
- System-children never appear as grid peers to flagships or supporting entries
- No new visual format needed — the strip expands, it does not become a grid
- The parent/child relationship remains visually clear

### Rejected patterns
| Pattern | Why rejected |
|---|---|
| System-children in the main supporting grid | Violates hierarchy; makes the grid feel like a parts catalog |
| Separate "Systems depth" section at page bottom | Adds scroll cost; visitors who want systems proof have already left |
| Disclosure accordion for system-children | Primary discovery should not require active disclosure |
| System-child standalone pages in the supporting grid | Creates confusion about whether these are standalone engagements |

---

## 7. Future implementation sequence

### Pass 1 — Tag data layer (lowest risk, no UI change)
Add `discoveryTags` to `WorkCard` type in `lib/work.ts`.
Populate `serviceTypes` and `businessTypes` on all non-system-child entries.
Populate `proofRole` on all entries as a direct map of `dashboardTier`.
**No UI change in this pass.**

Validation: confirm all entries have at least `serviceTypes[0]`; confirm system-children
have `proofRole: 'system-child'`; confirm existing behavior is unchanged.

Effort: low. Risk: near-zero.

### Pass 2 — Systems segment expansion
In `WorkGrid.tsx`, update the `Systems` segment to:
1. Include system-tier entries when `activeSegment === 'Systems'`
2. Group them under their parent flagship using the existing `SubProjectStrip`
   with a slightly expanded layout (show first metric inline)
3. Keep the All-view strip unchanged

This is the highest-value visibility improvement and the safest to implement
because the data relationships already exist.

Validation: confirm system-children do not appear in Client Work or Brand segments;
confirm All-view strip is unchanged; confirm mobile layout is not broken.

Effort: medium. Risk: low (data relationships already wired).

### Pass 3 — Industry/problem chips (optional, add only if needed)
If the service-connected proof discovery gap proves real (i.e., visitors arrive
from specific service pages and do not find relevant proof), add a second chip row:

**Business type chips:** `Healthcare` · `Local service` · `Legal` · `E-commerce` · `Brand`

Rules for this pass:
- Chips are additive to the current segment filter (not a replacement)
- Chips filter within the active segment — they do not override it
- A selected chip should light up clearly (active state with accent color)
- Maximum 5–6 chips; do not expose all `businessTypes` values if some have fewer
  than 3 entries (showing a chip with 1 result is misleading)
- No multi-select — one chip active at a time, plus the option to clear

If Pass 3 is implemented, add a `minEntriesForChip: 3` guard so low-density
business types do not get a chip in the UI.

Effort: medium. Risk: medium (adds new filter dimension — test that it does not
fragment the page into empty states).

---

## 8. Spec maintenance rules

- This spec owns the `/work` discovery model.
- `components/sections/WorkIndex/CLAUDE.md` governs component-level guidance.
- `data/work/CLAUDE.md` governs data-layer guidance.
- `skills/darling-martech-work/SKILL.md` governs proof-hierarchy and routing rules.
- If a future pass changes the segment model, update this spec first.
- If a future pass adds new `discoveryTags` values, update the canonical tag table in
  section 5 of this spec before implementing.
- Do not implement filter behavior that is not listed in section 3 of this spec
  without updating the spec first.
