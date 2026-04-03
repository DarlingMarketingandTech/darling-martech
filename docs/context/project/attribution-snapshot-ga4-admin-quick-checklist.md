# Attribution Snapshot GA4 Admin Quick Checklist

Last updated: 2026-04-03
Audience: non-technical admin/operator

## Goal
Confirm Attribution Snapshot tracking is live and usable in GA4 without digging through code.

## 10-Minute Checklist

1. Open GA4 property for Darling MarTech.
2. Go to Admin > Data display > DebugView.
3. In a test browser session, run this flow on the site:
- open Attribution Snapshot
- switch platform tab
- download a template
- load demo or upload CSV
- click one CTA
4. In DebugView, confirm these events show up:
- tool_view
- tool_interaction
- attribution_snapshot_template_download
- attribution_snapshot_upload
- attribution_snapshot_results
- cta_click

If these appear, base tracking is live.

## Admin Setup (Required Once)

### A) Add custom dimensions
Admin > Data display > Custom definitions > Create custom dimensions

Create these dimensions (Event scope):
- Tool Name (tool_name)
- Tool Source (source)
- Tool Interaction (interaction)
- Tool Platform (platform)
- CTA Location (location)
- CTA Label (label)

### B) Add custom metrics
Admin > Data display > Custom definitions > Custom metrics

Create these metrics:
- Touchpoint Count (touchpoint_count)
- Journey Count (journey_count)
- Channel Count (channel_count)

## Quick Funnel to Save

In Explore > Funnel exploration, create this sequence:

1. tool_view where tool_name = Attribution Snapshot
2. attribution_snapshot_template_download OR tool_interaction where interaction = demo_loaded OR upload_start
3. attribution_snapshot_upload OR attribution_snapshot_results
4. cta_click where location = attribution_snapshot

Save as: Attribution Snapshot Funnel

## Weekly Health Check

Every week, check:
- tool_view trend
- upload count
- results count
- CTA click count from attribution_snapshot
- source mix (Demo journeys vs Google Ads CSV vs Meta Ads CSV)

## If Something Looks Broken

1. Confirm NEXT_PUBLIC_GA_ID exists in the deployed environment.
2. Re-run DebugView test with a clean browser session.
3. Check for ad blockers in your test browser.
4. Escalate with screenshots of:
- DebugView event stream
- any event missing expected parameters

## Canonical References
- Event matrix: docs/context/project/attribution-snapshot-analytics-matrix.md
- Full setup runbook: docs/context/project/attribution-snapshot-ga4-setup.md
