# Service Page Prompt Shortcuts

Use these shortcut patterns when you want a cheaper, tighter Claude Code pass.

## Core rule
Prefer the compact helper files first:
- `batch-1-service-build-kit.json`
- `parent-child-linking-kit.json`
- `batch-1-service-status.json`
- `service-proof-snippets.json`

Use longer planning docs only if the helper files are missing needed context.

## Shortcut 1 — Build one Batch 1 service page
Use when refining a single service entry in `data/services.ts`.

### Required reads
1. `CLAUDE.md`
2. `service-page-template.md`
3. `service-proof-matrix.md`
4. `batch-1-service-build-kit.json`

### Runtime files
- `data/services.ts`
- `app/services/[slug]/page.tsx`
- `ServiceDetailPage.tsx`
- `CLAUDE.md`

### Scope
- edit only the target service entry
- keep template changes minimal
- update `CLAUDE.md` tracking only

## Shortcut 2 — Parent/child service linking pass
Use after Batch 1 page builds are complete.

### Required reads
1. `CLAUDE.md`
2. `parent-child-linking-kit.json`
3. `batch-1-service-status.json`

### Runtime files
- `data/services.ts`
- `/services` index runtime files
- any service navigation or related-service components
- `CLAUDE.md`

### Scope
- parent page → child page links
- sibling related-service cleanup
- CTA/link consistency
- no broad copy rewrites

## Shortcut 3 — Proof alignment pass
Use when tightening proof hierarchy, proof cards, or service/work backlinks.

### Required reads
1. `CLAUDE.md`
2. `service-proof-snippets.json`
3. `service-proof-matrix.md`
4. `internal-linking-map.md`

### Runtime files
- `data/services.ts`
- relevant `/work` data files
- service detail components
- `CLAUDE.md`

### Scope
- primary vs supporting proof
- proof link cleanup
- work-to-service backlinks
- no unrelated UI work

## Shortcut 4 — Lightweight visual-support pass
Use only after Batch 1 and linking/proof cleanup are complete.

### Required reads
1. `CLAUDE.md`
2. `batch-1-service-status.json`
3. `service-proof-snippets.json`

### Runtime files
- service detail UI files
- work/proof UI files if directly affected
- `CLAUDE.md`

### Scope
- proof thumbnails
- section-level visual rhythm
- light media support
- no redesign

## Usage note for Cursor
Cursor is best for:
- JSON/data cleanup
- related-link cleanup
- single-file service-entry edits
- small component polish

Use Claude Code for:
- architecture-sensitive multi-file passes
- route/template changes
- service-page copy passes that need layered writing discipline

## Maintenance rule
When Batch 1 status changes, update:
- `batch-1-service-status.json`
- any affected helper file
- then `CLAUDE.md` if the change is material
