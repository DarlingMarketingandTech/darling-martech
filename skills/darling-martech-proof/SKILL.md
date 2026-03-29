---
name: darling-martech-proof
description: >
  Proof assignment, proof copy, and case-study linking rules for Darling
  MarTech. Use whenever writing a proof block on any page, assigning proof
  to a service page, choosing which case study to reference, writing
  CTA-adjacent credibility lines, or verifying that proof links are correct.
  Also triggers when the user says "add proof", "which case study should I
  use here", "write a proof section", "add credibility to this page",
  "reference a case study", or asks which work page supports a specific
  service or claim.
---

# Darling MarTech — Proof Skill

## Primary rule

Proof earns its place by being the most specific evidence that a claim is true. One strong, operationally relevant proof item beats three decorative ones.

---

## Canonical proof hierarchy

These are the highest-leverage proof assets, in priority order:

1. **Graston Technique** — automation + systems + strategic leadership → `/work/graston-technique`
2. **Pike Medical Consultants** — healthcare growth + fractional CMO → `/work/pike-medical-consultants`
3. **Graston Growth Engine** — CRM + lead handling architecture → `/work/graston-growth-engine`
4. **Russell Painting** — local SEO + trust architecture → `/work/russell-painting`
5. **317 BBQ** — conversion optimization + hospitality → `/work/317-bbq`
6. **Hoosier Boy Barbershop** — local brand + booking + search → `/work/hoosier-boy-barbershop`

Use these first. Only reach further down the list when the service claim needs a different operational angle.

---

## Service-to-proof assignments

Read `docs/context/project/service-pages/service-proof-matrix.md` for the full matrix.

**Batch 1 quick reference:**

| Service | Primary proof | Supporting |
|---|---|---|
| Fractional CMO | Graston Technique | Pike Medical Consultants |
| Website Strategy | Pike Medical Consultants | Riley Bennett Egloff, Tuohy Bailey & Moore |
| CRM Architecture | Graston Growth Engine | Barbershop Command Center |
| Local SEO | Russell Painting | Hoosier Boy, Pike Medical |
| Conversion Optimization | 317 BBQ | Pike Medical, Hoosier Boy |

Do not swap primary proof without a deliberate reason.

---

## Canonical metrics — use these exact numbers

Never round, approximate, or paraphrase. Use verbatim:

| Client | Metric | Context |
|---|---|---|
| Graston Technique | +212% qualified leads | demand + qualification + follow-up rebuild |
| Graston Technique | 95% overhead reduction | replacing manual process with systems |
| Graston Technique | 48 hrs/week saved | redesigning how work moved through the business |
| Pike Medical Consultants | 45% patient growth over 3 years | multi-division healthcare fractional CMO |
| PrimaryCare Indy | 75% more bookings | under Pike Medical umbrella |
| PrimaryCare Indy | 300% organic traffic growth | under Pike Medical umbrella |
| UrgentCare Indy | +35% patient bookings | under Pike Medical umbrella |
| Hoosier Boy Barbershop | 90% more bookings | brand + booking + local search |
| 317 BBQ | 40% conversion lift | conversion path improvement |
| 317 BBQ | 120% time on site | photography-led storytelling |
| Tuohy Bailey & Moore | 45% bounce reduction | brand + web rebuild |
| Tuohy Bailey & Moore | 60% more form submissions | brand + web rebuild |
| Behr Pet Essentials | +28% average cart | content-first strategy |
| Behr Pet Essentials | 3x conversion | content-first strategy |

Do not write "over 200%", "nearly 50%", "~40%", or any softened version of these numbers.

---

## Proof block structure

When writing a proof block, use this format:

```
[Service-relevant framing label — connects to the page's claim]
[One sentence explaining why this proof is relevant to the service being sold]
[One dominant metric]
[One line linking to the canonical work page]
```

Example:
```
Healthcare website rebuild and trust architecture
Clearer structure, stronger trust, and a better path from discovery to action.
45% patient growth over 3 years.
→ From the Pike Medical Consultants case study.  [/work/pike-medical-consultants]
```

Do not write a proof block that is just a client name and a metric with no service context.

---

## Canonical slug list

When linking proof, always use these exact slugs. Do not paraphrase, rename, or create aliases:

| Client | Canonical slug |
|---|---|
| Graston Technique | `/work/graston-technique` |
| Pike Medical Consultants | `/work/pike-medical-consultants` |
| Graston Growth Engine | `/work/graston-growth-engine` |
| Russell Painting | `/work/russell-painting` |
| 317 BBQ | `/work/317-bbq` |
| Hoosier Boy Barbershop | `/work/hoosier-boy-barbershop` |
| Riley Bennett Egloff | `/work/riley-bennett-egloff` |
| Tuohy Bailey & Moore | `/work/tuohy-bailey-moore` |
| PrimaryCare Indy | `/work/primarycare-indy` |
| UrgentCare Indy | `/work/urgentcare-indy` |
| Behr Pet Essentials | `/work/behr-pet-essentials` |
| Barbershop Command Center | `/work/barbershop-command-center` |
| Smart Sales & Pricing Tool | `/work/smart-sales-pricing` |
| Investment ROI Planner | `/work/investment-roi-planner` |
| Clinical Compass | `/work/clinical-compass` |

Verify any slug not on this list against `data/work/work-index.ts` before using it.

---

## Short proof-anchor lines

For CTA-adjacent credibility lines, prefer language from `docs/context/project/service-pages/proof-snippet-library.md` rather than writing new copy.

Reliable short anchors:
- "Proof, not promises."
- "Strategy with systems underneath it."
- "Better visibility. Cleaner follow-up. Higher trust."
- "The result usually improves because the structure improves first."
- "What changed was not just the campaign — it was the system."

---

## Proof on the homepage

The proof section should show 4–5 curated case studies representing:
- different industries
- different service clusters
- different result types

Recommended set: Graston Technique + Pike Medical + 317 BBQ + Hoosier Boy or Russell Painting.

Use short snippets from `proof-snippet-library.md` — do not write new proof copy from scratch.

## Proof on the services index

Each cluster on `/services` gets one short proof anchor — not a full case study block. Format: one sentence + one metric + one link. Keep it subordinate to the cluster routing, not the focus.

## Proof on child-service pages

One primary proof block plus optional 1–2 supporting snippets. The proof block should explain why the case study is relevant to this specific service — not just state that a result occurred.

---

## Hard rules

1. Never rename a canonical case study. Use the name and slug exactly as they appear in `data/work/work-index.ts`.
2. The service-proof matrix determines primary proof. Follow it.
3. Metrics are verbatim. No rounding, no approximation.
4. Every proof reference links to `/work/[slug]`.
5. Work pages are the canonical proof surface. Service pages contextualize proof — they do not replace or duplicate the work page.
6. One dominant proof item per service page. Supporting proof only when it adds range.
7. Do not reference case studies not in the canonical work index.

---

## Anti-patterns

- Attaching the most visually impressive case study when a more operationally relevant one exists
- Using generic language — "several client projects" or "various case studies"
- Stacking 4+ proof snippets where 1–2 would be stronger
- Creating "mini case study" blocks that compete with the work pages
- Writing new metrics that differ from the canonical numbers
- Linking to a non-canonical slug or a work page that does not exist

---

## Source docs

- `docs/context/project/service-pages/service-proof-matrix.md` — proof assignments per service
- `docs/context/project/service-pages/proof-snippet-library.md` — reusable proof copy
- `docs/context/project/service-pages/internal-linking-map.md` — proof link routing
- `CLAUDE.md` — canonical metrics, case study slugs, proof hierarchy
- `data/work/work-index.ts` — canonical slug list and work entry data
