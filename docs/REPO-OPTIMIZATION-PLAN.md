# Repo Optimization Plan (2026-03-28)

## Objectives

- Reduce root-level clutter and ambiguity.
- Keep only one canonical source for shared content/data.
- Preserve high-value planning/context docs for AI-assisted site editing.
- Keep generated artifacts out of versioned source.

## Completed In This Pass

- Removed redundant legacy root data files:
  - `labs.ts`
  - `services.ts`
  - `work-index.ts`
  - `work-data.ts`
- Removed obsolete one-off plan generation artifacts:
  - `decode-plan.ps1`
  - `make-plan.py`
  - `services-plan-encoded.txt`
- Reorganized planning/context docs from repo root into `docs/`:
  - `docs/context/strategy/`
  - `docs/context/repo/`
  - `docs/context/project/`
  - `docs/archive/plans/`
  - `docs/archive/outputs/`
- Updated documentation pointers in `README.md` and `CLAUDE.md`.

## Canonical Source Rules

- Marketing/service/lab/work data must live in `data/` only.
- Runtime pages and API behavior must be authored from `app/`.
- Reusable UI and interactions belong in `components/` and `hooks/`.
- Historical planning docs belong in `docs/context/` or `docs/archive/`, not repo root.

## Ongoing Hygiene Checklist

- Before adding a new file, check for an existing canonical location.
- Do not commit generated output (`.next/`, `*.tsbuildinfo`, local exports).
- Keep root limited to app/runtime/config entry points plus `README.md` and `CLAUDE.md`.
- Archive superseded plans under `docs/archive/` instead of leaving duplicates in root.
