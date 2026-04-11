# Strategic Reframe Mode

## Purpose
Define a controlled operating mode for strategic diagnosis and scoped restructuring recommendations.

This mode helps AI builders and reviewers challenge whether the current structure is still doing the right job, without weakening the repo-safe implementation guardrails.

## Why this exists
Darling MarTech already has strong low-churn implementation rules that protect runtime integrity, route semantics, and data discipline.

Those rules should stay in place. But there are moments when repeated micro-polish is less effective than a scoped structural rethink. Strategic Reframe Mode creates a safe path for that work.

## Source of truth and authority
Authority order remains:

1. Runtime code and data in `app/`, `components/`, `data/`, `lib/`
2. `CLAUDE.md` as the master implementation brief
3. This file as a companion guide for reframe passes only

This file does not replace `CLAUDE.md` and does not override runtime truth.

## The two operating modes

### 1) Implementation Mode
Default mode for normal repo work.

- Narrow, safe, and drift-resistant
- Low-churn edits with clear file scope
- Preserves current IA and route architecture unless explicitly tasked
- Follows normal branch/PR discipline
- Prioritizes compatibility with existing data and component contracts

### 2) Strategic Reframe Mode
Diagnosis, challenge, and recommendation mode.

- Can question page job, section sequence, and information flow
- Can challenge IA clarity inside existing route families
- Can challenge bridging between `/services`, `/work`, and `/tools`
- Can identify when a scoped restructure is better than endless micro-polish
- Must not directly implement broad changes as part of the reframe pass

## Use this mode when...
- A page appears structurally misaligned with its role (for example, selling and proving are mixed in confusing ways)
- Section order likely causes comprehension or conversion drop-off
- Internal bridges between utilities, proof, and offers are weak or inconsistent
- The same class of UX/content issue keeps recurring despite local refinements
- A larger scoped change may outperform repeated small edits

## Do not use this mode when...
- The request is clearly implementation-only (bug fix, copy correction, minor UI polish, metadata fix)
- Existing structure is sound and only needs normal execution quality
- The proposal would require speculative architecture not grounded in repo strategy
- The effort is being used to bypass established implementation guardrails

## Allowed in Strategic Reframe Mode
- Diagnose structural bottlenecks and role confusion on key pages
- Propose re-sequencing of existing sections within current route families
- Propose clearer handoffs between `/tools` outcomes, `/work` proof, and `/services` offers
- Recommend scoped IA adjustments that stay inside current core system truths
- Identify migration logic and dependency order for a future implementation pass
- Define risks, tradeoffs, and measurable success criteria for a proposed rethink

## Not allowed in Strategic Reframe Mode
- Directly shipping broad redesigns or architectural rewrites
- Inventing unsupported route systems or random route sprawl
- Weakening proof/data integrity or bypassing the typed `data/` model
- Reclassifying core semantics without explicit justification:
  - `/work` remains canonical proof
  - `/tools` remains self-serve utility
  - service/work/tool relationship discipline remains intact
- Presenting speculative ideas as approved implementation direction

## Required outputs
Every Strategic Reframe pass must produce:

1. Problem statement
2. Why the current structure underperforms
3. Proposed change (scoped, concrete)
4. What stays fixed (non-negotiables and preserved truths)
5. Risks and tradeoffs
6. Likely files/routes/systems affected
7. Smallest testable next step

Optional but recommended:

- Success metrics and observation window
- Rollback boundary if the test underperforms

## Approval and handoff workflow (reframe to implementation)
1. Run the reframe pass as recommendation-only.
2. Review and approve scope before implementation starts.
3. Translate approved scope into explicit implementation tasks.
4. Return to Implementation Mode for execution.
5. Validate results against the agreed reframe hypothesis.

No broad implementation should start from this mode without explicit approval.

## Evaluation questions for proposed rethinks
- Does this improve the page's core job clarity?
- Does it preserve canonical roles across `/services`, `/work`, and `/tools`?
- Does it reduce cognitive load without collapsing necessary proof depth?
- Is the scope testable in a small, reversible step?
- Is the migration path clear and low risk for runtime/data integrity?
- Are we solving a structural issue, not just restyling symptoms?

## Darling-specific examples of acceptable reframe opportunities
- `/work` editorial simplification that improves scanning while preserving flagship/supporting/system proof hierarchy
- `/contact` flow restructuring to strengthen qualification and intent capture without bloating top-of-form friction
- Better bridge logic from tool outputs to the right service conversation path (while keeping `/tools` utility-first)
- Re-sequencing `/services` sections for comprehension and routing clarity without inventing a new offer architecture

## Anti-patterns to avoid
- Using "reframe" as blanket permission for speculative redesign
- Replacing grounded route semantics with abstract IA experiments
- Proposing changes that break proof assignment or data model discipline
- Skipping approval and moving directly into broad implementation
- Producing high-level critique without scoped next-step logic