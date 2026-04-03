# Attribution Snapshot GA4 Setup Runbook

Last updated: 2026-04-03

## Purpose
This is the click-by-click GA4 setup companion for Attribution Snapshot event instrumentation.

Use this after deployment to:
- register event parameters as dimensions/metrics
- verify events are arriving
- build the first working funnel and source comparison

Canonical event reference: `docs/context/project/attribution-snapshot-analytics-matrix.md`
One-page admin checklist: `docs/context/project/attribution-snapshot-ga4-admin-quick-checklist.md`

## Prerequisites

1. `NEXT_PUBLIC_GA_ID` is set for the deployed environment.
2. The property is receiving page_view traffic from the site.
3. Attribution Snapshot route is live and reachable.

## Step 1: Confirm Base Event Flow

In GA4:

1. Open **Admin**.
2. Under **Property**, open **Data display > DebugView**.
3. In a browser session, open the tool route and trigger:
- page load
- platform switch
- template download
- demo load
- upload (or upload error)
- one CTA click
4. Confirm events appear in DebugView.

Expected event names:
- `tool_view`
- `tool_interaction`
- `attribution_snapshot_template_download`
- `attribution_snapshot_upload`
- `attribution_snapshot_results`
- `cta_click`

## Step 2: Register Event-Scoped Custom Dimensions

In GA4:

1. Open **Admin**.
2. Under **Property**, open **Data display > Custom definitions**.
3. Click **Create custom dimensions**.
4. Create the following event-scoped dimensions one by one:

| Dimension name | Scope | Event parameter |
|---|---|---|
| Tool Name | Event | tool_name |
| Tool Source | Event | source |
| Tool Interaction | Event | interaction |
| Tool Platform | Event | platform |
| CTA Location | Event | location |
| CTA Label | Event | label |

Recommended notes:
- Keep naming human-readable for non-technical users.
- Use a consistent prefix if your property has many unrelated dimensions.

## Step 3: Register Event-Scoped Custom Metrics

In GA4:

1. Stay in **Admin > Data display > Custom definitions**.
2. Open the **Custom metrics** tab.
3. Click **Create custom metrics**.
4. Create the following metrics:

| Metric name | Scope | Event parameter | Unit |
|---|---|---|---|
| Touchpoint Count | Event | touchpoint_count | Standard |
| Journey Count | Event | journey_count | Standard |
| Channel Count | Event | channel_count | Standard |

## Step 4: Build Attribution Snapshot Funnel Exploration

In GA4:

1. Open **Explore**.
2. Create a **Funnel exploration**.
3. Add funnel steps in this order:
- Step 1: `tool_view` where `tool_name` equals `Attribution Snapshot`
- Step 2: `attribution_snapshot_template_download` OR `tool_interaction` where `interaction` equals `demo_loaded` OR `upload_start`
- Step 3: `attribution_snapshot_upload` OR `attribution_snapshot_results`
- Step 4: `cta_click` where `location` equals `attribution_snapshot`
4. Save as: **Attribution Snapshot Funnel**.

Recommended options:
- Use open funnel to avoid over-filtering early sessions.
- Add breakdown by `source` once enough traffic exists.

## Step 5: Build Source Comparison Exploration

In GA4:

1. Create a **Free form** exploration.
2. Add dimensions:
- Event name
- Tool Source
- Tool Platform
- CTA Label
3. Add metrics:
- Event count
- Users
4. Filter to event names:
- `attribution_snapshot_upload`
- `attribution_snapshot_results`
- `cta_click`
5. Save as: **Attribution Snapshot Source Comparison**.

Use this to compare:
- Demo journeys vs Google Ads CSV vs Meta Ads CSV
- Which source drives stronger CTA intent

## Step 6: Build a Quick Monitoring Report (Optional)

In **Reports > Library** (or via custom report workflow):

1. Create a report filtered to Attribution Snapshot events.
2. Include cards for:
- daily `tool_view`
- daily `attribution_snapshot_upload`
- daily `attribution_snapshot_results`
- daily `cta_click` where `location=attribution_snapshot`
3. Pin to your main collection for weekly review.

## Verification Checklist

After setup, verify all checks below:

1. DebugView shows each event name when manually triggered.
2. Event parameters are populated (not `(not set)`) for:
- `tool_name`
- `interaction`
- `platform`
- `source`
- `location`
- `label`
3. Custom dimensions appear in explorations after GA4 processing delay.
4. Custom metrics return numeric values for upload/results events.
5. Funnel exploration returns non-zero users at Steps 1 to 3.
6. CTA step starts filling as users click contact/service/proof links.

## Troubleshooting

If no events appear:

1. Confirm `NEXT_PUBLIC_GA_ID` is present in the deployed environment.
2. Confirm GA script loads in page source/network requests.
3. Confirm ad blockers are not suppressing GA in your test browser.
4. Check browser console for errors around `window.gtag`.
5. Re-run checks in DebugView with a clean session.

If events appear but parameters are missing:

1. Confirm event parameter keys exactly match:
- `tool_name`, `source`, `interaction`, `platform`, `location`, `label`
- `touchpoint_count`, `journey_count`, `channel_count`
2. Confirm helpers in `lib/analytics.ts` are unchanged.
3. Re-test from the live route after a fresh deployment.

## Change Rule

When event names or parameter keys change in code, update both:
- `docs/context/project/attribution-snapshot-analytics-matrix.md`
- `docs/context/project/attribution-snapshot-ga4-setup.md`
- `docs/context/project/attribution-snapshot-ga4-admin-quick-checklist.md`
