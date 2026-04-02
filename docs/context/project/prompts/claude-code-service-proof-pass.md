## Claude Code prompt — service-proof pass (low-token)

```xml
<task>
  <goal>Align service pages and proof links with the canonical work proof model.</goal>
  <constraints>
    <must>Assume root CLAUDE.md is already loaded.</must>
    <must>Plan first, edit second.</must>
    <must>Keep reads file-scoped to services + work + proof mapping.</must>
    <mustNot>Do not rewrite service copy unless explicitly requested.</mustNot>
  </constraints>

  <scope>
    <readFirst>
      <file>skills/darling-martech-proof/SKILL.md</file>
      <file>skills/darling-martech-work/SKILL.md</file>
      <file>docs/context/project/checklists/runtime-doc-sync.md</file>
    </readFirst>
    <thenInspect>
      <file>data/services.ts</file>
      <file>data/work/work-index.ts</file>
      <file>lib/work.ts</file>
      <file>components/sections/WorkDetail/*</file>
      <file>components/sections/WorkIndex/*</file>
    </thenInspect>
  </scope>

  <plan>
    <step>List the exact mismatch(es) (e.g., wrong slug, wrong primary proof, missing backlink).</step>
    <step>Propose the smallest edit set to fix them.</step>
    <step>State what docs will need syncing if behavior/mapping changes.</step>
  </plan>

  <edit>
    <rules>
      <rule>Metrics must remain verbatim (do not round or paraphrase).</rule>
      <rule>Work pages are the canonical proof surface; services contextualize.</rule>
      <rule>Work→service backlink is one clean link (no directory behavior).</rule>
      <rule>Preserve /work hierarchy (flagship vs supporting vs system-child).</rule>
    </rules>
  </edit>

  <validate>
    <check>All referenced work slugs exist in data/work/work-index.ts.</check>
    <check>All referenced service routes resolve (including nested routePath cases).</check>
    <check>If proof mapping changed, update subtree CLAUDE.md and/or helper docs per runtime-doc-sync.</check>
  </validate>
</task>
```

