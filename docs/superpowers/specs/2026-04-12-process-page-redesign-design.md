# Process Page (`/process`) — Redesign
**Date:** 2026-04-12  
**Status:** Approved (design); pending implementation

---

## Goal

Rework `/process` so it:

- **Stops duplicating** the same four-phase operating model and “three ways to engage” narrative that appears (or can appear) elsewhere on the site.
- **Replaces narrow persona-style entry points** with **problem → outcome → next step** routing that includes more buyers without forcing a “type” fit.
- **States honestly** that engagements are **shaped per context** (stack, risk, stakeholders, timeline)—not one identical conveyor belt—while still offering **light structure** (a schematic) where helpful.
- Keeps **Darling MarTech routing intact**: homepage = orientation; `/services` = routing + conversion; `/work/[slug]` = **canonical proof**; `/tools` = self-serve strategy samples (not a full capability portrait).
- Positions **process + services** as primary “how you help”; **`/work`** as verification; tools framed as **taste tests**, not the full breadth of practice.

---

## Background & Evidence

- **Current implementation** (`app/process/ProcessExperience.tsx`): hero; `ToolPathRail`; four steps (`STEPS`: Diagnose / Design / Build / Optimize); `engagementModels` from `data/services.ts`; four `BUYER_PATHS` cards; “What to expect” numbered list; CTAs to audit and contact.
- **Approved content spine:** hybrid **A + B** — **problems we solve** + **outcomes** (“what good looks like”) on the same cards, **evidence-led** from existing services, `/work`, and founder resume themes (systems/automation, measurement, performance & reliability, regulated contexts, LMS/commerce/training, strategy-to-spec delivery).
- **Operating truth:** solo-led practice; contractors **when** and **for what**—described plainly so breadth reads as **governance**, not faux agency scale.
- **Demos / side builds** (e.g. Vercel/Workers experiments): **not** listed on `/process`; canonical proof remains **`/work`**; portfolio or lab can carry exploratory URLs.
- **Market reference (patterns only):** problem-first ([Velocity Partners](https://velocitypartners.com/)), goal lattice ([Twogether](https://www.wearetwogether.com/)), sector + proof ([Cremarc](https://www.cremarc.com/)), operational transparency ([New North](https://newnorth.com/)), integrated breadth story ([Ninja Promo](https://ninjapromo.io/)). No requirement to match agency site surface area.

---

## Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| Canonical home for engagement + fit copy | **`/process`** | Removes “same paragraph twice” confusion; other pages summarize and link here. |
| Primary IA spine | **Problem / outcome cards** (5–7 max) + **next step** links | Matches buyer mental model; inclusive vs persona-only gates. |
| Persona cards (`BUYER_PATHS`) | **Remove or demote** | Replace with problem/outcome entry; optional light “you might be…” micro-copy only if it aids scan, not as primary nav. |
| Four phases (`STEPS`) | **Retain only as shortened schematic** | Reframe copy so phases are a **lens**, not a promise of identical engagements; avoid verbatim duplication on other routes. |
| Three engagement models | **Keep data in `data/services.ts`**; **surface on `/process` without duplicating long blocks elsewhere** | Single source of truth; `/process` can show **renamed/shaped** “commercial shapes” with link to detail if needed. |
| Tool path rail | **Keep** unless implementation plan finds redundancy | Still helps “not sure yet” visitors without claiming full capability. |
| Demo URLs | **Off `/process`** | Avoid second portfolio; protect proof hierarchy. |
| Primary CTA alignment | **`/contact?intent=service`** (or existing intent pattern) per service-system rules | Consistent with project conventions; exact `intent` values to match codebase at implementation time. |

---

## Page Section Order (Target)

1. **Promise + who it’s for** — Short: systems + measurement + execution; complex/regulated contexts welcome.
2. **Problem / outcome cards** — Buyer language; each card: problem, “what good looks like,” primary link to relevant `/services/...` and/or contact intent.
3. **How work runs** — Cadence, communication, decision-making, solo vs contractor roles (plain language).
4. **Not cookie-cutter** — One tight section: how scoping, sequencing, and pivots work in practice.
5. **Light schematic** — Optional condensed phases (Diagnose → Design → Build → Optimize) with explicit “shape varies by engagement” framing.
6. **Engagement shapes** — The three models from `engagementModels`, rewritten if needed so titles/summaries don’t repeat other pages word-for-word; link to `/process` from elsewhere as “full detail.”
7. **Proof bridge** — Small set of links into **`/work/[slug]`** (not a gallery dump).
8. **Tools philosophy** — One short beat: tools sample thinking; services = commitments; work = receipts (or pointer to `/tools` index philosophy if owned there).
9. **Final CTA** — Audit and/or contact, aligned with service-system primary CTA guidance.

---

## De-duplication Rules (Site-Wide, This Initiative)

- **`/process`** holds the **full** narrative for: operating model honesty, engagement shapes explanation, fit framing, and “how the first weeks work” if not better owned on a single service page.
- **Other pages** (e.g. `/services` index, service detail templates, about): **at most** a **short** summary (1–3 sentences) + **“How I work” → `/process`** link for readers who want depth.
- **Implementation step:** grep for repeated headings/copy (“Four phases,” “Three ways,” identical step labels) and consolidate per above.

---

## Data & Code Touchpoints (For Implementation Planning)

- **`app/process/ProcessExperience.tsx`** — Restructure sections; replace `BUYER_PATHS` with problem/outcome data structure.
- **`app/process/ProcessPage.module.css`** — Layout/styles for new grids/cards as needed.
- **`app/process/page.tsx`** — Update `metadata` description if hero promise changes materially.
- **`data/services.ts`** (or new `data/process.ts` if cleaner) — Centralize problem/outcome card copy and links; keep `engagementModels` as source for engagement section.
- **Possibly** `app/services/ServicesExperience.tsx`, `components/sections/ServiceDetail/ServiceDetailPage.tsx`, or about content — only to **trim** duplicate long-form process and add link to `/process`.

---

## Non-Goals

- New top-level routes or page types outside existing Darling MarTech map.
- Replacing **`/work`** with `/process` as proof surface.
- Listing every side project or demo URL on `/process`.
- Large unrelated refactors of `/services` clusters or homepage.

---

## Success Criteria

- A visitor can answer **“Is my situation in scope?”** and **“How does Jacob actually work?”** without reading duplicate long copy on another page.
- **Persona-only** framing is no longer the primary entry; **problem/outcome** is.
- **`/work`** remains the **canonical** proof destination; CTAs respect service-system intent patterns.
- Page remains **minimal, high-signal** (no dashboard bloat, no resume dump).

---

## Open Items for Implementation Plan

- Final list of **5–7 problem/outcome cards** with exact copy and target `href`s (derive from `data/services.ts` + `/work` slugs).
- Exact **`contact` intent** query values already used in the repo for service-led CTAs.
- Which sibling pages get **trim + link** in the same PR vs follow-up.

---

## References

- Service-system rule: `.cursor/rules/service-system.mdc`
- Current process UI: `app/process/ProcessExperience.tsx`
- Engagement models data: `data/services.ts` (`engagementModels`)
