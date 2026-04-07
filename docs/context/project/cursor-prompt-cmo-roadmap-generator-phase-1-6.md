# Cursor Prompt: CMO Roadmap Generator Native Rebuild

You are working in the DarlingMarketingandTech/darling-martech repo.

Goal:
Rebuild the CMO Roadmap Generator natively inside this repo and remove the need for iframe launch behavior.

Read first:
- CLAUDE.md
- data/labs.ts
- app/tools/page.tsx
- components/pages/ToolsPageClient.tsx
- any existing tool detail pages
- sitemap/metadata helpers
- docs/context/project/cmo-roadmap-generator-native-rebuild-plan.md
- docs/context/project/cmo-roadmap-generator-file-map.md
- docs/context/project/cmo-roadmap-generator-copy-outline.md

Constraints:
- no Tailwind
- no new routing model
- explicit static routes only
- CSS Modules only
- keep the pass narrow and repo-governed
- do not import the standalone app shell or styling system
- port logic, not presentation
- `/tools` is the self-serve strategy layer

Phases to implement:
1. native detail page
2. native intake flow
3. native results artifact
4. native email/send route
5. `/tools` index update
6. sitemap + internal linking pass

Required routes:
- /tools/cmo-roadmap-generator
- /tools/cmo-roadmap-generator/intake
- /tools/cmo-roadmap-generator/results
- /api/tools/cmo-roadmap-generator/send-roadmap

Use these file paths:
- app/tools/cmo-roadmap-generator/page.tsx
- components/pages/ToolsCmoRoadmapGeneratorPageClient.tsx
- components/pages/ToolsCmoRoadmapGeneratorPageClient.module.css
- app/tools/cmo-roadmap-generator/intake/page.tsx
- components/tools/cmo-roadmap-generator/RoadmapIntakeForm.tsx
- app/tools/cmo-roadmap-generator/results/page.tsx
- components/tools/cmo-roadmap-generator/RoadmapResultsDisplay.tsx
- components/tools/cmo-roadmap-generator/RoadmapResultsLeadForm.tsx
- components/tools/cmo-roadmap-generator/RoadmapResultsToolbar.tsx
- lib/tools/cmo-roadmap-generator/*
- app/api/tools/cmo-roadmap-generator/send-roadmap/route.ts

Functional requirements:
- intake captures 7 questions
- results include executive summary, top priorities, 3 phases, service path, engagement path, watch-outs
- results support shareable encoded URL
- results support print/PDF
- results support send-by-email
- update tools index so roadmap points to native page, not iframe launch
- include route in sitemap
- add clean metadata/canonical coverage

Validation:
- npm run lint
- npm run build
- npm run check:metadata
- npm run check:links
- npm run check:graph

When done, report:
1. files reviewed
2. exact files created/updated
3. what was changed
4. validation results
5. remaining follow-up items
