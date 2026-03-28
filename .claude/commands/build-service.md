# Build Child Service Page — Darling MarTech

Build a new child service page using the existing Darling MarTech service architecture.

## Start
1. Run `context-prime` first.
2. Read the user request and identify:
   - requested service/page
   - intended parent service
   - commercial goal of the page

## Load Only What You Need
- `CLAUDE.md`
- `data/services.ts`
- relevant proof in `data/work/work-index.ts`
- current route pattern under `app/services/`
- `components/sections/ServiceDetail/ServiceDetailPage.tsx`

## Implementation Rules
- Follow the existing standalone child-service pattern already used in this repo.
- Preserve `ServiceDetailPage` architecture. Do not invent a new page system.
- Use the smallest effective implementation. Avoid broad refactors.
- Keep copy aligned to the Darling MarTech voice and commercial messaging order:
  1. business problem
  2. why alternatives failed
  3. what Darling MarTech does differently
  4. proof
  5. offer-specific CTA

## Build Checklist
- Add or update the child service entry in `data/services.ts`.
- Set the page as the correct standalone child service.
- Wire the child page to the correct parent via `childServiceSlugs`.
- Ensure `relatedServiceSlugs` are commercially logical, not arbitrary.
- Include `proofWorkSlugs` when strong proof exists.
- Include `proofTools` when there is a relevant lab/tool connection.
- Create the route using the current child-service folder pattern under the parent service.
- Reuse existing service data and rendering architecture instead of custom page logic.

## Validation Before Finish
- route works
- parent/child linkage works
- CTA is specific to the offer
- related proof is present
- no unrelated files were changed

## Git Workflow
1. Create a feature branch.
2. Commit the work.
3. Push the branch.
4. Open a PR.

## Guardrails
- Prefer local repo files as source of truth.
- Do not use browser or external tools unless explicitly required.
- Do not re-read files unnecessarily.
- Do not explore unrelated parts of the repo.
