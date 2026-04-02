## Claude Code prompt — `/work` refinement (low-token)

```xml
<task>
  <goal>Refine /work behavior or content without drifting from runtime truth.</goal>
  <constraints>
    <must>Assume root CLAUDE.md is already loaded.</must>
    <must>Plan first, edit second.</must>
    <must>Keep file exploration narrow and scoped to /work.</must>
    <mustNot>Do not make unrelated runtime/UI changes.</mustNot>
  </constraints>

  <scope>
    <readFirst>
      <file>components/sections/WorkIndex/CLAUDE.md</file>
      <file>components/sections/WorkDetail/CLAUDE.md</file>
      <file>data/work/CLAUDE.md</file>
      <file>skills/darling-martech-work/SKILL.md</file>
    </readFirst>
    <thenInspect>
      <file>components/sections/WorkIndex/*</file>
      <file>components/sections/WorkDetail/*</file>
      <file>data/work/*</file>
      <file>lib/work.ts</file>
      <file>app/work/page.tsx</file>
      <file>app/work/[slug]/page.tsx</file>
    </thenInspect>
  </scope>

  <plan>
    <step>State what is being changed (one sentence) and why (one sentence).</step>
    <step>List the exact files to edit (keep it tight).</step>
    <step>List acceptance checks (runtime behavior + doc-sync impact).</step>
  </plan>

  <edit>
    <rules>
      <rule>Prefer data-layer ordering and tier logic over component-local hacks.</rule>
      <rule>Preserve hierarchy: flagship vs supporting vs system-child.</rule>
      <rule>Connected-system strip stays compact and under the parent only.</rule>
      <rule>Work detail route-out stays disciplined (service backlink + up to 2 proof links).</rule>
    </rules>
  </edit>

  <validate>
    <check>No files outside the scoped /work areas were modified.</check>
    <check>If hierarchy/template/route-out behavior changed, update the relevant subtree CLAUDE.md.</check>
    <check>If work↔service mapping changed, consider updating runtime-doc-sync checklist triggers.</check>
  </validate>
</task>
```

