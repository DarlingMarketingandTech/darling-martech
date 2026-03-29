---
name: darling-martech-services
description: >
  Service page architecture, build order, content rules, and proof-assignment
  logic for Darling MarTech. Use when building any child-service page under
  /services/[slug], rewriting the services index, choosing which service page
  to build next, assigning proof to a service page, or creating any new
  /services route. Also use when the user says "build the fractional CMO page",
  "add a service page", "rewrite services", "what should I work on next",
  or asks anything about the service system, service copy, or service structure.
  This skill replaces the old Enhanced Plan v2 three-tier architecture — do not
  use /solutions/ or /industries/ routes until explicitly approved.
---

# Darling MarTech — Services Skill

## Read these docs first

Before any service work, read the relevant docs from `docs/context/project/service-pages/`:

| Task | Read first |
|---|---|
| Building a child-service page | `service-page-implementation-tracker.md`, `service-proof-matrix.md`, the individual page brief |
| Rewriting `/services` | `services-index-copy-deck.md`, `services-index-reframe-notes.md` |
| Choosing what to build next | `service-page-implementation-tracker.md`, `implementation-phase-roadmap.md` |
| Assigning proof | `service-proof-matrix.md` |
| Creating a new route | `service-route-and-slug-conventions.md` |

---

## Page role map

Every page has exactly one job. Keep these distinct — do not let a higher-level page do a lower-level page's job.

| Page | Job |
|---|---|
| Homepage | Orient the buyer; explain the model |
| `/services` | Frame 4 problem clusters; route to child pages |
| `/services/[slug]` | Explain one service clearly; convert the right buyer |
| `/work/[slug]` | Prove capability |
| `/tools` | Give immediate self-serve value |
| `/contact` | Close the loop — qualified intake |

If content belongs one level down, push it down. The services index should not explain what child pages explain.

---

## Build order — follow this sequence

```
Phase 1: Homepage tightening
Phase 2: Services index reframe
Phase 3: Top 5 child-service pages (Batch 1)
Phase 4: Linking and proof pass
Phase 5: SEO and metadata pass
Phase 6: Batch 2 service pages
Phase 7: Contact polish
Phase 8: Batch 3 specialty pages
```

### Batch 1 — build first
1. Fractional CMO / Strategic Leadership → `/services/fractional-cmo`
2. Website Strategy & Rebuilds → `/services/website-strategy`
3. CRM Architecture → `/services/crm-architecture`
4. Local SEO → `/services/local-seo`
5. Conversion Optimization → `/services/conversion-optimization`

### Batch 2 — build after Batch 1
6. Workflow Automation
7. Marketing Audit & Growth Roadmap
8. Lead Generation Systems
9. Positioning & Messaging Strategy
10. Sales Enablement Systems

### Batch 3 — specialty pages
Build only after Batch 1 + services index are live.

**Do not build lower-priority pages because they seem interesting. Follow the batch sequence.**

---

## Child-service page structure

Every child-service page must include these sections in order:

1. **Hero** — plain-English H1, one-sentence subhead, one micro-proof stat, CTA
2. **What this is** — Layer 1 → Layer 2 → Layer 3 (in that order, never reversed)
3. **Why it matters** — business impact, not deliverables
4. **Signs you need this** — practical symptom bullets, not fluffy descriptions
5. **What it usually includes** — concrete bullets
6. **Technical scope** — specialist language goes here, not higher up the page
7. **Related proof** — 1 primary + 1–2 supporting; explain why relevant
8. **FAQ** — 4–6 objections/questions that support search intent
9. **CTA block** — one reassurance line + one button to `/contact?intent=service`

**Minimum viable for launch:** H1 + subhead + intro paragraph + signs bullets + includes bullets + one technical scope section + one proof block + 4 FAQ items + one CTA.

---

## Layered writing rule — non-negotiable

Every service page moves through three layers in this order:

**Layer 1 — Buyer language (lead with this)**
Plain problem framing. The opener a founder understands without context:
- "your website is not pulling its weight"
- "leads are slipping through the cracks"
- "no one is truly steering the whole system"

**Layer 2 — Translator language (bridge)**
Connect the problem to operational outcome:
- "this work connects strategy, CRM, automation, and reporting"
- "the goal is to make growth easier to run and easier to measure"

**Layer 3 — Specialist language (lower on the page)**
Implementation detail for advanced buyers:
- CRM architecture, lifecycle automation, attribution cleanup, schema direction, dashboard architecture

**Do not reverse this order. Do not ask visitors to choose a knowledge level. Translate complexity instead.**

---

## Services index rules

`/services` is a routing page, not a capability list. It should:
- explain the 4 problem clusters in buyer language
- help visitors recognize which cluster matches their situation
- route to child pages
- include one short proof anchor per cluster
- end with `/contact?intent=service`

**Cluster framing:**

| Cluster | Problem framing |
|---|---|
| Strategy & Leadership | No senior owner steering the whole system |
| Websites, UX & Brand | The site underperforms or trust is weak |
| CRM, Automation & AI | Systems are disconnected; follow-up is manual |
| Growth, SEO & Demand | Visibility and conversion are weaker than they should be |

For rewrite copy, use `docs/context/project/service-pages/services-index-copy-deck.md`.

---

## Proof assignment

Read `docs/context/project/service-pages/service-proof-matrix.md` before assigning proof to any page. Do not invent pairings.

**Batch 1 quick reference:**

| Service | Primary proof | Supporting proof |
|---|---|---|
| Fractional CMO | Graston Technique | Pike Medical Consultants |
| Website Strategy | Pike Medical Consultants | Riley Bennett Egloff, Tuohy Bailey & Moore |
| CRM Architecture | Graston Growth Engine | Barbershop Command Center |
| Local SEO | Russell Painting | Hoosier Boy, Pike Medical |
| Conversion Optimization | 317 BBQ | Pike Medical, Hoosier Boy |

Rules:
- One dominant proof item per page
- Supporting proof adds range or mechanism clarity — not filler
- Operationally relevant proof beats visually impressive proof

For proof copy language, use `docs/context/project/service-pages/proof-snippet-library.md`.

---

## Route and slug rules

Slugs live under `/services/[slug]`. Keep them plain-English and buyer-readable.

**Canonical Batch 1 slugs:**
- `fractional-cmo`
- `website-strategy`
- `crm-architecture`
- `local-seo`
- `conversion-optimization`

Full reference: `docs/context/project/service-pages/service-route-and-slug-conventions.md`.

Every new route needs a `metadata` export with `title` and `description`.

---

## CTA rules

| Page | Primary CTA | Secondary CTA |
|---|---|---|
| Child-service page | `/contact?intent=service` | One relevant `/work` proof link |
| Services index | `/contact?intent=service` | Child-page links per cluster |

Do not stack two contact CTAs in the same section. Add a tool link only when it naturally supports the service — not as a default.

---

## Page build checklist

Before committing any new child-service page:
- [ ] Route exists under `/services/[slug]`
- [ ] H1 is plain-English and specific
- [ ] Page opens with Layer 1 language
- [ ] Signs You Need This section is present
- [ ] What It Usually Includes section is present
- [ ] Technical scope is lower on the page
- [ ] Proof block includes one primary proof item
- [ ] CTA points to `/contact?intent=service`
- [ ] Internal links include one proof page + one related sibling if natural
- [ ] `metadata` export has `title` and `description`

---

## Language anti-patterns

Never lead with these without immediate plain-English translation:
- RevOps, omnichannel, martech stack, entity optimization, orchestration layer, demand capture architecture

Prefer:
- "cleaner sales and marketing handoff" over "revops alignment"
- "automated follow-up" over "lifecycle automation"
- "better paths from visit to inquiry" over "funnel optimization"

Full glossary: `docs/context/project/service-pages/service-language-and-glossary.md`.

---

## Hard rules

1. Build order follows the batch sequence. Do not skip ahead.
2. Every child-service page has one dominant claim, one dominant proof, one primary CTA.
3. Layer 1 → Layer 2 → Layer 3. Never reversed.
4. Primary CTA on every child-service page is `/contact?intent=service`.
5. Proof follows the matrix. Do not invent pairings.
6. Slugs are plain-English and buyer-readable.
7. Every new route needs a `metadata` export.
8. The services index routes — it does not explain everything.
9. The old three-tier architecture (`/solutions/`, `/industries/`) is not active. Do not build those routes.
