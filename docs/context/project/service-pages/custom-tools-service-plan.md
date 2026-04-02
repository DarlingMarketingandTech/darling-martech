# Custom tools / workflow products — service expansion plan

Companion to `custom-tools-service-priority-map.json` and `custom-tools-proof-candidates.json`.  
**Status (2026-04-02):** definition approved; **runtime shipped** — nested URL, flat redirect, `data/services.ts` entry, helpers synced. **Integration pass:** fourth link on `/services` systems cluster; `contactServiceOptions` entry; `crm-architecture` / `agentic-marketing-systems` related links + linking kit aligned.

## Implementation plan (runtime shape — planning only)

| Field | Decision |
|-------|-----------|
| **Slug (`id`)** | `custom-tools-workflow-products` |
| **Canonical URL** | `/services/systems/custom-tools-workflow-products` |
| **Redirect** | `/services/custom-tools-workflow-products` → nested (permanent), same pattern as `agentic-marketing-systems` |
| **Implement now?** | **No** — remain deferred until a chartered build pass; this doc only fixes the shape. |
| **Proof blocking ship?** | **No** — `graston-growth-engine` + `barbershop-command-center` are enough for v1 proof. |
| **`/services` cluster link** | **Only after** the runtime page exists and copy is approved; do not add a fourth systems link early. |

**Future file touch list (minimal):** see `implementationPlan.futureFilesToTouchMinimal` in `custom-tools-service-priority-map.json`.

## Service-expansion questions (answered for this pass)

1. **Is this a distinct purchase from website strategy?**  
   Yes when the buyer’s gap is a *specific tool or product surface* (rules + data + UX + integrations), not primarily trust, hierarchy, or site-wide conversion structure.

2. **Is this distinct from CRM architecture?**  
   Yes when the value story is the *shipped interface and workflow product*, not lifecycle stages, pipeline truth, or CRM-as-system-of-record design. (In practice, engagements often overlap — cross-link heavily.)

3. **Is this distinct from agentic marketing systems?**  
   Yes when the centerpiece is a *durable tool or app-like surface* customers or staff use repeatedly; agentic systems stay the “orchestration / leverage / internal drag” frame. Many builds touch both; the page should not duplicate the full agentic FAQ.

4. **Does this strengthen the service system?**  
   Yes if framed as **demand-gen and ops outcomes** (faster qualification, fewer errors, clearer handoffs, monetizable or scalable interactions), **not** as a portfolio of “apps we built.”

## Anti-patterns

- “Full-service app development” / technology-first positioning.
- Leading with stacks (React, Next.js) instead of business jobs-to-be-done.
- Surfacing every Graston sub-tool as its own proof card for this offer — they belong under flagship work narratives unless a case study stands alone.
- Adding `/work` entries or categories for this pass — **out of scope**.

## Buyer snapshot

| Dimension | Direction |
|-----------|-----------|
| Who hires | Scaling operators and marketing leaders who hit limits of site + CRM + spreadsheets; founders who need one accountable senior owner for **tool + system** outcomes. |
| Problem | A concrete workflow or customer interaction is unsupported: configurators, eligibility/quoting, staff dashboards, partner-facing surfaces, etc. Off-the-shelf tools force the wrong model or create integration debt. |
| When not website / not SaaS | Website work when the issue is narrative, trust, and path; SaaS when a category product fits. **This** when the bottleneck is **custom logic, data, roles, and integrations** in a focused surface. |
| Connection to strengths | Extends **systems** parent proof (Growth Engine, internal tools card) into a **named, buyable line** aligned with audits, CRM architecture, and agentic systems. |

## Sequence (after this definition pass)

1. Draft child-service copy using layered writing rule (buyer → strategic → technical).  
2. Add `standaloneServicePages` data + nested route under `app/services/systems/`.  
3. Sync `parent-child-linking-kit.json` and related service links (2–3 siblings max).  
4. Proof grid: one dominant + one supporting work slug from `custom-tools-proof-candidates.json`.  
5. **Do not** change `/services` cluster layout unless explicitly chartered.

## Best cluster guidance

- **Primary:** CRM, Automation & AI (`systems`).  
- **Do not** create a new top-level cluster or move this to “portfolio” or `/tools`.
