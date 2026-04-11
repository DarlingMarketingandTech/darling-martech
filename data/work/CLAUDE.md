## Work data (`data/work/*`) — Local Guidance

**Canonical ownership**
- `data/work/work-index.ts`: index-level curation (tiers, ordering inputs, parent/child wiring).
- `data/work/work-data.ts`: full case study content.
- `lib/work.ts`: typed helpers + retrieval + template selection for `/work` runtime.

### Slug stability
- Slugs are public URLs. Treat them as stable identifiers.
- Do not rename a slug without updating redirects + internal links + any proof/service mapping that references it.

### Proof-priority expectations
- The index exists to show **high-signal proof fast**.
- Prefer one dominant metric / outcome signal per entry over lots of competing numbers.

### Parent/child proof relationships
- Parent (flagship) entries may declare `relatedProjectSlugs` that point to system-children.
- System-children should declare `parentProjectSlug` and should not be curated as peers of flagships.
- Parent-child wiring is the source of truth for connected-system strips and “part of engagement” framing.

### discoveryTags (additive — do not remove)

Every entry in `work-index.ts` now carries a `discoveryTags` field defined in `lib/work.ts`
(`WorkDiscoveryTags`). Fields: `serviceTypes`, `businessTypes`, `proofRole`.
- `proofRole` mirrors `dashboardTier` with stable UI-friendly naming (`flagship` / `supporting` / `system-child`).
- Use 1–2 values for `serviceTypes` and `businessTypes`.
- Do not remove or replace existing fields (`dashboardTier`, `serviceIds`, etc.) — this is additive.
- Canonical allowed values are in `docs/context/project/work-discovery-model-spec.md` section 5.
- UI components do not consume `discoveryTags` yet — this is data-layer prep only.

### Service-link rules
- When present, `primaryServicePageSlug` on a work entry should map to a real service page route.
- Work → service backlinks must stay **one clean link**, not a mini directory.

### Doc-sync reminder
Meaningful runtime behavior changes tied to `/work` hierarchy, templates, proof ordering, or work↔service mapping require a doc sync pass:
- subtree `CLAUDE.md` guidance (`components/sections/WorkIndex`, `components/sections/WorkDetail`, `data/work`)
- any relevant helper docs under `docs/context/project/`
