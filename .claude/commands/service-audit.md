# Service Audit — Darling MarTech

Audit and refine the current service architecture with minimal, high-value changes.

## Start
- Run `context-prime` first.

## Inspect
- `CLAUDE.md`
- `data/services.ts`
- `app/services/ServicesExperience.tsx`
- `components/sections/ServiceDetail/ServiceDetailPage.tsx`
- process page if present

## Audit For
- parent/child service relationships
- `childServiceSlugs`
- `relatedServiceSlugs`
- CTA specificity
- featured offers
- service-to-work linking
- service-to-lab linking
- service-to-contact flow

## Approach
- Prioritize the smallest high-value refinement opportunities.
- Prefer tightening over expansion.
- Avoid broad redesigns.
- Preserve the current service architecture unless a small structural fix is clearly necessary.

## Output
Produce:
1. short architecture assessment
2. top issues
3. exact refinement plan
4. implementation summary if changes are made

## Guardrails
- Use local repo files as source of truth.
- Do not explore unrelated parts of the repo.
- Do not broaden scope beyond service architecture refinement.
