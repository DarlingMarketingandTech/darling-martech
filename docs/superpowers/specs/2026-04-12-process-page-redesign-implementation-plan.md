# Process Page (`/process`) — Implementation Plan
**Date:** 2026-04-12  
**Design spec:** [2026-04-12-process-page-redesign-design.md](./2026-04-12-process-page-redesign-design.md)  
**Status:** Ready for execution

---

## Summary

Implement the approved `/process` redesign: **problem → outcome → next step** cards, **operating model** and **not cookie-cutter** copy, **shortened phase schematic**, **engagement models** from `engagementModels`, **proof bridge** to `/work`, **tools philosophy** beat, aligned CTAs. Remove persona-primary `BUYER_PATHS`. De-duplicate long-form process narrative on sibling surfaces per spec.

---

## Task breakdown

### Phase 1 — Data layer
| # | Task | Done when |
|---|------|-----------|
| 1.1 | Add typed **process problem cards** (5–7 items): `id`, `problem`, `outcome`, `primaryHref`, optional `secondaryHref`, optional `workSlug` for analytics or future use | Type + array in `data/process.ts` (recommended) or exported block in `data/services.ts` |
| 1.2 | Add typed **proof bridge** entries (3–4): `slug`, `label` (short), optional `context` line | Same file or `data/process.ts` |
| 1.3 | Add **phase schematic** copy as data (optional): same labels as today but shorter descriptions + intro line “shape varies” | Keeps `ProcessExperience.tsx` mostly layout |
| 1.4 | Review `engagementModels` in `data/services.ts` — adjust **title/summary/bestFor** only if still duplicating other pages verbatim after `/process` rewrite | Single source of truth unchanged structurally |

### Phase 2 — `/process` UI
| # | Task | Done when |
|---|------|-----------|
| 2.1 | Replace hero + lead with **promise + who it’s for** (spec §Page Section Order §1) | Copy in component or data |
| 2.2 | Implement **problem / outcome cards** grid; each card links to `primaryHref` (and secondary if set) | Remove `BUYER_PATHS` |
| 2.3 | Add **How work runs**: cadence, comms, decisions, solo vs contractors | New section + styles |
| 2.4 | Add **Not cookie-cutter** tight section | 1 headline + 1–2 short paragraphs max |
| 2.5 | Refactor **four phases**: shorter cards + framing paragraph that engagements **vary** | Replace or trim `STEPS` body copy |
| 2.6 | Keep **engagement models** section; tweak headings (“Three ways…” → e.g. “Engagement shapes” if less clichéd); ensure cards still map `engagementModels` | A11y: headings hierarchy |
| 2.7 | Add **proof bridge**: 3–4 links to `/work/[slug]` | No thumbnails required if existing patterns lack them |
| 2.8 | Add **tools philosophy** (2–3 sentences) + link to `/tools` | Per spec |
| 2.9 | Reconcile **ToolPathRail** placement (after hero vs after problem cards) — keep unless it feels redundant with new spine | Stakeholder pass in browser |
| 2.10 | Update **final CTA** + any inline links to use `/contact?intent=service` where primary service conversation | Match `ServiceDetailPage` pattern |
| 2.11 | Trim or merge **“What to expect”** (`expectSection`) into “How work runs” if overlap — avoid two numbered first-weeks stories | Single coherent story |

### Phase 3 — Metadata & polish
| # | Task | Done when |
|---|------|-----------|
| 3.1 | Update `app/process/page.tsx` `metadata.description` to match new hero promise | SEO aligned with body |
| 3.2 | `ProcessPage.module.css` — new block classes for problem grid, proof bridge, operating model | Responsive + existing tokens |
| 3.3 | Motion: reuse `containerVariants` / `itemVariants` for new sections | No new animation deps |

### Phase 4 — Site-wide de-duplication (minimal)
| # | Task | Done when |
|---|------|-----------|
| 4.1 | Grep for **“Four phases”**, **“Three ways”**, long duplicate **Diagnose/Design/Build** blocks outside `/process` | Document hits in PR |
| 4.2 | **Services index** (`ServicesExperience.tsx`): optional 1–2 sentence line + text link “How I work → `/process`” near hero or final CTA — only if a human still confuses clusters with engagement mechanics | YAGNI if already clear |
| 4.3 | **Service detail** (`ServiceDetailPage.tsx`): if any full engagement/process essay exists, replace with summary + `/process` link | Likely N/A today — confirm |
| 4.4 | **Homepage** (`app/page.tsx` / hero components): same check | Likely N/A |

### Phase 5 — QA
| # | Task | Done when |
|---|------|-----------|
| 5.1 | All `href`s and `/work/` slugs resolve (no typos) | `pnpm build` or link check |
| 5.2 | Lighthouse spot check `/process` (accessibility headings order) | No regressions |
| 5.3 | Mobile layout for new grids | Visual pass |

---

## Files checklist

| File | Action |
|------|--------|
| `data/process.ts` | **Create** — `ProcessProblemCard`, `ProcessProofLink`, `processProblemCards`, `processProofBridge`, optional `processPhaseSchematic` |
| `app/process/ProcessExperience.tsx` | **Major edit** — new sections; remove `BUYER_PATHS`; wire data imports |
| `app/process/ProcessPage.module.css` | **Edit** — new section classes |
| `app/process/page.tsx` | **Edit** — `metadata.description` |
| `data/services.ts` | **Optional edit** — `engagementModels` copy polish only |
| `app/services/ServicesExperience.tsx` | **Optional** — one link to `/process` |
| `components/sections/ServiceDetail/ServiceDetailPage.tsx` | **Optional** — trim duplicate process copy if found |

---

## Contact intent values (use as-is)

| Intent | Use on `/process` |
|--------|-------------------|
| `service` | Primary “Start a conversation” / service-led CTAs |
| `tool` | Only if CTA explicitly follows a tool (usually N/A on `/process`) |
| `work` | Only if CTA is proof-led (prefer `/work` links without forcing intent change) |
| `unsure` | Footer/contact helper already links to `/process` from `ContactForm` |

---

## Copy / data checklist

### A. Problem / outcome cards (draft v1 — refine in implementation)

Target **6 cards** (within 5–7). Each row: **problem** (buyer) | **outcome** (“good looks like”) | **primary link** | **optional work proof**.

| # | Problem (draft) | Outcome (draft) | Primary `href` | Optional proof slug |
|---|-----------------|-----------------|----------------|----------------------|
| 1 | Your CRM, automations, and site don’t talk — work is manual and leaky | A single coherent system: triggers, ownership, and reporting match how you actually sell | `/services/crm-architecture` or `/services/agentic-marketing-systems` | `graston-technique` / `graston-growth-engine` |
| 2 | Leadership can’t tell which channels and campaigns actually work | Decision-ready measurement: clean events, attribution you can defend, dashboards people use | `/services/martech-audit` | `the-compass` |
| 3 | The site is slow, fragile, or scary to change — marketing can’t move fast | Performance and governance that make campaigns and SEO trustworthy | `/services/website-strategy` or `/services/martech-audit` | `graston-technique` |
| 4 | You need senior strategy **and** implementation without agency layers | One accountable owner translating goals into buildable scope | `/services/fractional-cmo` | `pike-medical-consultants` |
| 5 | Regulated or high-trust industry — marketing has to respect compliance culture | Clear, review-friendly execution (legal/financial/healthcare experience) | `/services/brand-strategy` or `/contact?intent=service` | `riley-bennett-egloff` |
| 6 | AI or “automation” is either slideware or a fragile zap maze | Production integrations tied to real customer data and escalation paths | `/services/agentic-marketing-systems` | `graston-technique` |

**Note:** Final URLs must match real child routes in `data/services.ts` / `next.config` redirects. Prefer **one** primary link per card to reduce choice paralysis.

### B. Proof bridge (draft v1)

Pick **3–4** from featured / strong narrative fit:

- `graston-technique` — flagship systems + automation story  
- `pike-medical-consultants` — fractional / multi-division  
- `317-bbq` or `russell-painting` — conversion + local demand  
- `riley-bennett-egloff` — legal / long engagement  

### C. Section headlines (draft — align to voice)

- Problem grid eyebrow: e.g. “Where teams get stuck”  
- Operating model: e.g. “How we actually run the work”  
- Not cookie-cutter: e.g. “Same discipline, different shape”  
- Phases: e.g. “A schematic — not a script”  
- Engagement: e.g. “Engagement shapes”  
- Proof: e.g. “Receipts, not claims”  
- Tools: e.g. “Try the thinking (optional)”  

### D. Solo + contractors (must ship)

One short honest block: you **lead** every engagement; **specialists** appear for defined slices (e.g. design, extra engineering capacity) with you owning integration and quality.

### E. `engagementModels` copy pass

Read `summary` + `bestFor` next to new `/process` sections; remove repeated sentences that also appear in service pages if any.

---

## Suggested PR order

1. **PR 1:** `data/process.ts` + `/process` UI + CSS + metadata (full vertical slice).  
2. **PR 2 (optional):** Services index link + any sibling trim found in Phase 4.

---

## Definition of done

- [ ] No `BUYER_PATHS` persona grid as primary entry  
- [ ] Problem/outcome cards live in data, 5–7 max  
- [ ] Phase section explicitly states variation; shorter than current `STEPS` body  
- [ ] Proof bridge only uses real `work-index` slugs  
- [ ] Primary service CTAs use `/contact?intent=service` where appropriate  
- [ ] Build passes; `/process` readable on mobile  
- [ ] Design spec success criteria satisfied  

---

## References

- Design: [2026-04-12-process-page-redesign-design.md](./2026-04-12-process-page-redesign-design.md)  
- Work slugs: `data/work/work-index.ts`  
- Services: `data/services.ts`  
- Service-system: `.cursor/rules/service-system.mdc`  
