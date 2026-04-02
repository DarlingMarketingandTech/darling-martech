## Runtime → doc sync checklist (brief)

Use this when you change runtime behavior or data that affects how the repo should be operated on (especially for `/work`, proof, and service mapping).

### Docs **must** be updated when…
- **Hierarchy/behavior changes**: flagship/supporting/system-child rules, connected-system strip behavior, work detail template weights, or route-out logic changes.
- **Slug/route changes**: any `/work/[slug]` or `/services/*` slug changes, redirects, or nested route path changes.
- **Proof mapping changes**: work↔service backlink rules, `primaryServicePageSlug` usage, or service proof assignments change.
- **Data contract changes**: fields in `data/work/*`, `data/services.ts`, or `lib/work.ts` are added/removed/renamed in a way that changes how pages behave.

### Helper docs to consider syncing
- **Root brief**: `CLAUDE.md` (only when the change affects the repo’s canonical rules or operating model)
- **Subtree guidance**:
  - `components/sections/WorkIndex/CLAUDE.md`
  - `components/sections/WorkDetail/CLAUDE.md`
  - `data/work/CLAUDE.md`
- **Skills**:
  - `skills/darling-martech-work/SKILL.md` (work taxonomy + anti-patterns)
  - `skills/darling-martech-proof/SKILL.md` (metrics/slugs/proof rules)
- **Claude Code prompts** (only if workflow guidance changed):
  - `docs/context/project/prompts/claude-code-work-refinement.md`
  - `docs/context/project/prompts/claude-code-service-proof-pass.md`

### Docs likely **do not** need updates when…
- You only adjust styling inside existing components without changing behavior, hierarchy, or routing rules.
- You correct a typo in copy that doesn’t change page role, proof claims, or mapping decisions.
- You refactor internals (rename local variables, extract helpers) without changing exported behavior or data contracts.

### Special reminders (high-drift zones)
- **`data/work/*`**
  - If you change tiers (`dashboardTier`), parent/child wiring (`parentProjectSlug`, `relatedProjectSlugs`), or `primaryServicePageSlug`, sync the subtree docs and the `/work` skill.
  - If you rename slugs, ensure redirects + all references are updated (work index, service links, internal CTAs).
- **`components/sections/WorkIndex/*`**
  - If the index ordering/segmentation changes, ensure it still prefers data-layer logic and preserves system-child exclusion from the supporting grid.
  - If the connected-system strip changes, keep it compact and under-parent only.
- **`components/sections/WorkDetail/*`**
  - If template weights change, update the WorkDetail subtree doc + `/work` skill.
  - If route-out logic changes, keep the page closure disciplined (service backlink + up to 2 proof links).
- **`data/services.ts`**
  - If service routes or slugs change, re-check any work→service backlink resolution.
- **Work ↔ service proof mapping**
  - If a work entry’s `primaryServicePageSlug` changes, verify the runtime backlink resolves to the canonical route (including nested service `routePath` cases).

