# Fix UI — Darling MarTech

Handle UI bugs and small UX polish tasks with minimal repo exploration.

## Start
- Run `context-lite` first unless the task clearly requires broader context.
- Identify the smallest relevant file set before reading code.
- Inspect only the component, styles, route, and data directly involved.

## Diagnose First
Before changing code, write a short diagnosis that states:
- what is broken
- root cause
- smallest safe fix

## Scope
Use this command for:
- layout bugs
- interaction bugs
- CTA/link fixes
- filter issues
- spacing and visual polish
- accessibility fixes

## Implementation Rules
- Prefer minimal changes over redesign.
- Preserve the current visual language.
- Preserve existing CSS Modules patterns.
- Avoid touching unrelated components.
- Do not broaden scope unless the bug clearly requires it.
- Change app logic only when necessary to fix the issue.

## Execution
- Follow the existing component and route structure already in the repo.
- Reuse current patterns before introducing new ones.
- Validate the fix in the smallest practical way.

## Finish
After implementation, write a short summary that states:
- what changed
- why it fixed the issue
- any remaining risk or follow-up

## Optional Git Workflow
- create a bugfix branch
- commit
- push
- open PR if requested
