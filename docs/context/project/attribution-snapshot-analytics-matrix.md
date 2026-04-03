# Attribution Snapshot Analytics Matrix

Last updated: 2026-04-03

## Purpose
This document is the working analytics reference for Attribution Snapshot and related Tools index click tracking.

Companion setup runbook: `docs/context/project/attribution-snapshot-ga4-setup.md`
Admin quick checklist: `docs/context/project/attribution-snapshot-ga4-admin-quick-checklist.md`

Use this to:
- validate event coverage after UI changes
- configure GA4 custom dimensions and funnels
- keep naming and payloads consistent with the site analytics utility

## Event Matrix

| Event name | Where fired | Trigger | Parameters | Funnel role |
|---|---|---|---|---|
| tool_view | Attribution Snapshot route | First page view on initial mount | tool_name, source | Awareness |
| tool_interaction | Attribution Snapshot route | platform switch, upload start, upload error, demo load, reset | tool_name, interaction, plus context params | Engagement diagnostics |
| attribution_snapshot_template_download | Attribution Snapshot route | Template download button click | platform | Activation signal |
| attribution_snapshot_upload | Attribution Snapshot route | Successful CSV import | platform, touchpoint_count, journey_count | Core activation |
| attribution_snapshot_results | Attribution Snapshot route | Results generated for a new dataset state | source, journey_count, channel_count | Value realization |
| cta_click | Attribution Snapshot route and Tools index | Click on contact/service/proof CTAs and featured tool CTAs | location, label | Conversion intent |

## Parameter Reference

### tool_view
- tool_name: Attribution Snapshot
- source: route

### tool_interaction
- tool_name: Attribution Snapshot
- interaction values currently used:
  - platform_switch
  - upload_start
  - upload_error
  - demo_loaded
  - reset
- additional context params currently used:
  - platform (google-ads or meta)
  - journey_count (for demo_loaded)

### attribution_snapshot_template_download
- platform: google-ads or meta

### attribution_snapshot_upload
- platform: google-ads or meta
- touchpoint_count: numeric row count accepted after parsing
- journey_count: distinct session count from accepted touchpoints

### attribution_snapshot_results
- source: Demo journeys, Google Ads CSV, or Meta Ads CSV
- journey_count: grouped journey count in current state
- channel_count: unique channel count in current state

### cta_click labels currently used
- tools_index:
  - cmo_simulator
  - geo_readiness_auditor
  - cmo_roadmap_generator
  - attribution_snapshot
- attribution_snapshot:
  - measurement_plan
  - measurement_service
  - supporting_proof

## Source of Truth in Code

- Analytics utility and event helpers: lib/analytics.ts
- Attribution Snapshot event calls: components/pages/ToolsAttributionSnapshotPageClient.tsx
- Tools index CTA event calls: components/pages/ToolsPageClient.tsx

## Recommended GA4 Setup

1. Register custom dimensions for:
- tool_name
- source
- interaction
- platform
- location
- label

2. Register custom metrics for:
- touchpoint_count
- journey_count
- channel_count

3. Build a funnel exploration with this sequence:
- tool_view (tool_name = Attribution Snapshot)
- attribution_snapshot_template_download OR tool_interaction (interaction = demo_loaded OR upload_start)
- attribution_snapshot_upload OR attribution_snapshot_results
- cta_click (location = attribution_snapshot)

4. Add a comparison segment for source values:
- Demo journeys
- Google Ads CSV
- Meta Ads CSV

## QA Checklist

Run this list after instrumentation or UI changes:

1. Open Attribution Snapshot route and confirm tool_view fires once.
2. Switch platform tabs and confirm tool_interaction with interaction=platform_switch.
3. Download each template and confirm attribution_snapshot_template_download with correct platform.
4. Upload a valid CSV and confirm attribution_snapshot_upload payload values are present.
5. Trigger a parse error and confirm tool_interaction with interaction=upload_error.
6. Load demo and confirm tool_interaction with interaction=demo_loaded.
7. Reach results and confirm attribution_snapshot_results fires once per dataset state.
8. Click each CTA and confirm cta_click location/label values.
9. Click each Tools index featured CTA and confirm cta_click location=tools_index.

## Change Rule

When changing event names, parameter keys, or CTA labels for this tool flow, update this file in the same pull request.

When GA4 configuration steps change, update the companion setup runbook in the same pull request.
