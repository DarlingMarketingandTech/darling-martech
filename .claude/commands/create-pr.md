# Create PR — Darling MarTech

Handle the Git workflow after code changes are already complete.

## Assumption
- The implementation work is finished before this command starts.

## Workflow
1. Inspect `git status` and identify only the files relevant to the completed task.
2. If not already on a clean feature branch, create one with a short, descriptive branch name.
3. Stage only the relevant files. Do not stage unrelated changes.
4. Write a clear commit message that reflects the actual change.
5. Push the branch to origin.
6. Open a pull request against `main`.

## Return
Return:
- branch name
- commit hash
- PR title
- PR URL
- short summary

## Failure Handling
- Stop and report clearly if Git auth fails.
- Stop and report clearly if push fails.
- Stop and report clearly if PR creation fails.
- Do not fake success.

## Guardrails
- Do not modify unrelated files.
- Do not merge the PR.
- Keep the workflow practical and focused on the completed change set.
