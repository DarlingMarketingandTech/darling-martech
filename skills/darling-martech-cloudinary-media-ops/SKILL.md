---
name: darling-martech-cloudinary-media-ops
description: >
  Darling MarTech Cloudinary media operations for DarlingMarketingandTech/darling-martech.
  Governs how to inspect, plan, standardize, and safely update Cloudinary-backed media
  during post–Batch 2 refinement: proof/media cleanup, light polish, low-churn passes.
  Use whenever the user mentions Cloudinary, delivery URLs, image crops, work card
  thumbnails, work hero/support/UI proof images, asset audits, transformation constants,
  named transformations, media consistency on /work, /services, /studio, labs/work child
  pages, or visual proof cleanup without redesign. Also triggers on: "standardize cards",
  "too dark screenshot", "broken crop", "blank card image", "Cloudinary public ID",
  "f_auto q_auto", "proof visual", "media pass", or comparing candidate assets for a page.
  Do not use for broad redesigns, stock replacement of real proof, or speculative
  account-wide mutations unless explicitly requested.
---

# Darling MarTech — Cloudinary Media Ops

Operating manual for Cursor on **Cloudinary-backed media** for this repo. The goal is **consistency and proof quality** without redesigning the site or churning the account.

**Phase:** post–Batch 2 refinement. **Focus:** proof/media cleanup and light polish. Keep scope **narrow** and **reversible** where possible.

---

## 1. Title and purpose

This skill exists to:

- **Manage media operations** for Darling MarTech in alignment with repo reality.
- **Support Cloudinary-backed image consistency** (delivery, crops, formats, sizing patterns).
- **Improve proof presentation** on `/work`, `/services`, `/studio`, and **labs/work child** proof pages.
- **Reduce visual inconsistency** without changing the site’s visual system or information architecture.

If a request drifts toward a **new visual language** or **wide layout overhaul**, stop and treat that as out of scope unless the user explicitly approves a separate initiative.

---

## 2. Source of truth rules

| Layer | Source of truth |
| --- | --- |
| **Runtime behavior, routing, rendering** | **This GitHub repo** |
| **Binary media assets (files in Cloudinary)** | **Cloudinary account** |

### Hard rules

- **Do not invent architecture** that is not evidenced in the repo (no imaginary folders, data shapes, or pipelines).
- **Do not mutate Cloudinary casually.** Reads and recommendations are default; writes are exceptional and gated (see §6, §10).
- **Do not use Cloudinary work as a substitute for repo planning.** If the fix is “change which `public_id` the data references” or “adjust transformation in code,” prefer that over re-uploading or reshaping assets unless the user explicitly chooses asset-side change.

---

## 3. Project context

### Route roles (current intent)

- **`/work`** — **Canonical proof.** The primary place operational evidence should shine.
- **`/services`** — **Routing and conversion.** Proof here should be **subordinate** and credible, not a second portfolio grid.
- **`/tools`** — **Self-serve strategy layer.** Media, if any, supports clarity—not decorative gallery energy.

### Stack and delivery

- **Cloudinary** for media delivery (URLs, transforms, optional named transforms).

### Visual environment

- **Dark site theme.** Support and hero imagery often needs to read **brighter and more “productized”** so it does not disappear into the UI chrome.

### Proof philosophy

- **Real proof over decoration.**
- **One strong image beats several weak screenshots.**

### Recent and active proof surfaces (treat as proof, not decoration)

These should be handled as **proof surfaces**, not generic galleries:

- Hoosier Boy  
- Barbershop Command Center  
- License Requirements  
- Clinical Compass  
- Smart Sales & Pricing  
- Pike / PrimaryCare Indy / UrgentCare Indy  

When choosing or tuning media for these, ask: **does this help a buyer believe the claim on this page?** If not, it does not belong.

---

## 4. Operating principles

- **Keep passes narrow:** one route family or one page type per pass when possible.
- **Prefer audit before mutation:** know what is live before changing it.
- **Separate concerns:**
  - **Media cleanup** ≠ **repo refactors** (do not blend in one pass).
  - **Grid / card work** ≠ **detail-page work** (do not blend in one pass).
- **Preserve parent/child proof relationships** established in work data and templates (see `darling-martech-work` skill). Do not “fix” media in a way that breaks hierarchy or routing story.
- **Avoid mixing route families** in a single change set (e.g., don’t “also fix services” while standardizing `/work` cards unless explicitly scoped).
- **Favor reversible delivery-layer changes** (URL/transform/constants/data references) over **destructive asset operations** (overwrite, delete, moves).

---

## 5. Allowed actions

### Read and analyze (default)

- Search and inspect Cloudinary assets (when tooling is available).
- Inspect **dimensions, aspect ratios, formats, filenames, folders/tags** (as visible).
- **Recommend** transformations and delivery patterns.
- **Generate safe delivery URLs** (valid transform chains, `f_auto` / `q_auto` where appropriate).
- **Propose** tag/folder cleanup plans (as text) without executing them unless asked.
- **Compare** candidate assets for a specific page or card.
- **Classify** imagery for role: **card / hero / support / UI proof**.
- **Critique** current assets: too dark, over-cropped, too “raw screenshot,” too weak, competing focal points.

### Repo-side planning (preferred default for “implementation”)

- Produce **small, file-targeted plans** for updating image references, helpers, or shared transform constants.
- Keep component churn low: **data and delivery first**.

### Cloudinary account writes (explicit, narrow scope only)

- Perform **uploads, renames, moves, deletes, metadata edits, named transformation changes** only when the user **explicitly requests** them **and** the scope is **narrow** (single asset, explicit list, or defined folder with written confirmation).

---

## 6. Forbidden actions

### Scope gate

Unless the user explicitly requests the exact operation with clear scope:

- **Renaming** assets or public IDs  
- **Moving** folders or assets  
- **Deleting** assets  
- **Overwriting** existing public IDs  
- **Broad batch mutations** (account-wide retag, bulk replace, “fix everything”)  
- **Rewriting many pages** in one pass  
- **Mixing** repo UI refactors with Cloudinary cleanup in the same pass  
- **Creating a new visual system** (new grids, new art direction, new illustration language) without approval  
- **Speculative transformation experiments** sprayed across the whole site  
- **Forcing motion/video** into **image-only** templates or pages without an approved pattern  
- **Replacing stronger real proof** with **stock** or generic marketing visuals  

If tempted to “do a quick bulk fix,” **stop** and return to audit + recommendation.

---

## 7. Transformation governance

**Goal:** **standardized, minimal** transformation logic—readable in code review, safe at delivery time.

### Recommended transform families (code-first)

Define and reuse a **small vocabulary** of logical roles (implement as constants/helpers in the repo when possible):

| Role | Typical intent |
| --- | --- |
| **WORK_CARD** | Index/grid thumbnail: fast scan, consistent crop, readable at small size |
| **WORK_HERO** | Detail lead visual: one strong moment, stable aspect |
| **WORK_SUPPORT** | Secondary in-page proof: subordinate to hero, still legible |
| **WORK_UI** | UI-heavy proof: prioritize readability of interface text (watch mobile) |
| **SERVICE_SUPPORT** *(optional later)* | Single subordinate proof visual on service pages |

### Transformation rules

- Use **valid Cloudinary crop/size/quality/format** parameters only. Prefer **`f_auto`**, **`q_auto`**, and purposeful **`c_*`** / **`g_*`**—not stacks of decorative effects.
- **Avoid effect-heavy or decorative transforms** unless there is an explicit brand-approved reason.
- **Prefer delivery-layer normalization** (URL/transform/code) over **mutating the underlying asset**.
- **Named transformations** in the Cloudinary account are **high leverage and high risk**. Treat them as **shared contracts**:
  - Recommend **code-level constants** and **explicit URL transforms** first.
  - Propose account-level named transforms only when there is a **clear reuse story** and **approval**.

---

## 8. Visual / media principles

- **Real proof over logos** when the page is making an operational claim.
- Prefer **dashboards, product screens, booking flows, and UI evidence** over generic imagery.
- On a **dark** site, bias toward **brighter, productized** renders so proof does not look muddy.
- Avoid **raw screenshot energy** when a **cleaner product frame** exists (same build, better crop/lighting/export).
- **One primary visual moment per page** is usually enough; additional images should **support**, not compete.
- Proof should **support the page’s story**, not become the story.
- Keep imagery **lightweight** (performance-conscious) and **commercially useful** (helps evaluation, not vanity).

---

## 9. Page-type guidance

### `/work` grid cards

- **Should:** scan quickly with **consistent framing**; read as **credible operational proof** at a glance.
- **Should not:** each card a different aspect “vibe”; heavy UI illegible at card size; decorative gallery thumbnails.

### `/work/[slug]` detail pages

- **Should:** **one strong hero or primary support visual** plus **limited** additional proof; clear focal hierarchy.
- **Should not:** competing heroes; long screenshot strips; proof that duplicates the entire case study in pictures.

### Service pages (`/services`)

- **Should:** **one subordinate proof-led visual** aligned to the service claim; routes attention toward `/work` for depth.
- **Should not:** service page as a second `/work` grid; multiple unrelated proofs; stock mood imagery replacing real builds.

### Studio (`/studio`)

- **Should:** slightly more exploratory **if the page’s job is exploration**—still disciplined focal points.
- **Should not:** cluttered collages; unrelated eye-candy; slowing conversion pages with ornament.

### Labs / tool proof surfaces

- **Should:** evidence that clarifies **what the tool does** and **who it’s for**; UI legibility on mobile.
- **Should not:** experimental visuals that imply a new brand system; motion where the template is still image-first (unless approved).

---

## 10. Workflow order

Always follow this sequence unless the user explicitly stops at an earlier stage:

1. **Audit** — what assets URLs/public IDs/transforms are live for this slice?
2. **Diagnose** — what is wrong (crop, darkness, role confusion, inconsistency, wrong asset for claim)?
3. **Recommend** — smallest fix path (data vs code vs Cloudinary).
4. **Wait for approval** — if **any Cloudinary mutation** or **multi-file repo blast radius** is required.
5. **Implement narrow pass** — only what was approved.
6. **Validate** — visually + technically (§12).

### Non-negotiables

**Audit first**, **mutation second**, **review after every narrow pass**.

---

## 11. Repo coordination rules

- Prefer **minimal runtime file changes** per pass.
- Prefer updating **data references** (work JSON/TS content, image fields) or **shared helpers** over **redesigning components**.
- **Do not change multiple systems at once** (e.g., layout primitives + Cloudinary URLs + copy tone in one PR).
- **Do not mix** card rendering fixes with detail-page structural changes in one pass.
- If an issue can be solved by **repo delivery logic** alone, **do that first** before proposing asset surgery.

---

## 12. Validation checklist

After any pass that touches delivery or assets:

- [ ] **Assets still render** (no 404/blank transforms).
- [ ] **No broken crops** (faces/UI text clipped unintentionally; odd `g_*` behavior).
- [ ] **No blank cards** on `/work` or other grids.
- [ ] **No visual regression** on pages outside the approved slice.
- [ ] **Mobile readability** for UI-heavy proof (text still legible; not over-shrunk).
- [ ] If repo files changed: run **`npm run lint`** and **`npm run check:links`** (or the project’s current equivalents).
- [ ] **Preview** the affected routes locally (or deployment preview) before recommending merge.

Document what you checked and what you did **not** check if scope was intentionally narrow.

---

## 13. Prompting style rules (how Cursor should respond)

When answering under this skill, structure responses as:

1. **Diagnosis first** (what is wrong and why it matters for this site/page type).  
2. **Files / assets affected** (repo paths, public IDs, roles).  
3. **Smallest effective fix** (prefer data/delivery).  
4. **What was intentionally not changed** (guardrails).  
5. **Validation** (what to verify; commands run).  
6. **Next step recommendation** (single narrow follow-up).

### Communication guardrails

- Do **not** over-explain generic Cloudinary concepts unless the user asks.  
- Stay grounded in **this repo’s actual structure** and data locations.  
- Do **not** produce **speculative cleanup plans** unless the user asks for exploration.  
- Do **not assume** permission to mutate Cloudinary: **reads and plans are default; writes are explicit.**

---

## 14. Recommended first-use patterns

### Read-only asset audit

- User: “Audit Cloudinary usage for `/work` cards only.”  
- Do: inventory current references + transforms; flag outliers; no mutations.

### Choosing assets for a work child page

- User: “Which asset should lead Clinical Compass?”  
- Do: compare 2–3 candidates against **WORK_HERO** / **WORK_SUPPORT** roles and dark-theme legibility; recommend one primary.

### Planning a card standardization pass

- User: “Make work cards consistent without redesign.”  
- Do: define **WORK_CARD** transform constants; list offending entries; single-pass PR scope.

### Motion or video later (decision-only)

- User: “Should this detail page get video?”  
- Do: answer **whether motion adds proof** vs. weight; flag template constraints; **do not** implement video unless approved and supported.

### Real proof vs generated “product” visuals

- User: “Use a polished generated UI vs screenshot?”  
- Do: default to **real build evidence**; allow stylized **only** if it remains **truthful** to the product and **does not weaken credibility**.

---

## 15. Tone

Keep communication:

- **Calm**, **senior**, **practical**  
- **Low-risk** and **commercially clear**  
- **Specific to Darling MarTech**—avoid generic “marketing site” advice  
- **No hype**, no **hero narratives** about tooling  

When in doubt, choose the path that **preserves trust** and **minimizes blast radius**.
