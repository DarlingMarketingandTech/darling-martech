# Lab Update — Darling MarTech

Handle `/lab` updates, proof-tool fixes, and lab-to-service alignment with the smallest effective scope.

## Start
- Run `context-prime` first for large lab work.
- Run `context-lite` for small bugfixes when that is enough.

## Inspect
- `app/lab/page.tsx`
- `data/labs.ts`
- related service pages
- relevant work proof when needed

## Support
- filter and interaction bug fixes
- featured lab CTA improvements
- tool launch flow improvements
- service mapping cleanup
- `proofTools` alignment
- lab detail CTA refinement

## Enforce
- every lab should map to 1 primary service
- every lab should map to 1 supporting work page
- featured tools can route directly into the tool if that is commercially stronger

## Process
Before implementation, provide a brief diagnosis that states:
- what is broken or weak
- root cause
- smallest effective fix

After implementation, provide:
- implementation summary
- next recommended cleanup step

## Guardrails
- Prefer local repo files as source of truth.
- Avoid broad refactors.
- Preserve the current lab, service, and proof architecture unless a small structural fix is clearly necessary.
- Do not explore unrelated parts of the repo.
