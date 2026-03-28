# Context Prime — Darling MarTech

Load full project context before any implementation work.

## Step 1 — Core instructions
- Read CLAUDE.md completely
- Understand business positioning, service architecture, and rules

## Step 2 — Data layer
- data/services.ts
- data/taxonomy.ts
- data/work/work-index.ts
- data/labs.ts

## Step 3 — Core components
- app/services/ServicesExperience.tsx
- components/sections/ServiceDetail/ServiceDetailPage.tsx
- app/services/[slug]/page.tsx
- app/work/page.tsx
- app/lab/page.tsx

## Step 4 — System understanding
Understand:

- Services:
  selector page → child pages = revenue pages

- Labs:
  proof + lead-gen tools tied to services

- Work:
  case studies connected via serviceIds, industryIds, outcomeIds

- Process:
  engagement explanation layer

## Step 5 — Confirm context
Before doing any work, summarize:
- service architecture
- routing patterns
- data relationships
- current feature state

Then proceed with the requested task.

## Rules
- Do NOT use browser or external tools unless explicitly required
- Prefer local repo files as source of truth
- Do NOT re-read files unnecessarily
- Do NOT explore unrelated parts of repo
