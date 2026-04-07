# CMO Roadmap Generator File Map

## New files

### Public tool page
- `app/tools/cmo-roadmap-generator/page.tsx`
- `components/pages/ToolsCmoRoadmapGeneratorPageClient.tsx`
- `components/pages/ToolsCmoRoadmapGeneratorPageClient.module.css`

### Intake
- `app/tools/cmo-roadmap-generator/intake/page.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapIntakeForm.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapIntakeForm.module.css`

### Results
- `app/tools/cmo-roadmap-generator/results/page.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapResultsDisplay.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapResultsLeadForm.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapResultsToolbar.tsx`
- `components/tools/cmo-roadmap-generator/RoadmapResults.module.css`

### Logic
- `lib/tools/cmo-roadmap-generator/types.ts`
- `lib/tools/cmo-roadmap-generator/questions.ts`
- `lib/tools/cmo-roadmap-generator/modules.ts`
- `lib/tools/cmo-roadmap-generator/compose-roadmap.ts`

### Email + API
- `app/api/tools/cmo-roadmap-generator/send-roadmap/route.ts`
- `lib/tools/cmo-roadmap-generator/email/decode-roadmap-token.ts`
- `lib/tools/cmo-roadmap-generator/email/roadmap-email-model.ts`
- `lib/tools/cmo-roadmap-generator/email/send-roadmap-schema.ts`
- `lib/tools/cmo-roadmap-generator/email/log-lead-submission.ts`

## Existing files to update

- `components/pages/ToolsPageClient.tsx`
- `data/labs.ts`
- `app/sitemap.ts`
- metadata/canonical handling for new routes
- any shared analytics helpers touched by tool events

## Notes

Keep the tool entry static and explicit.
Do not introduce `/tools/[slug]` in this pass.
