# Tools CTA and Promotion Strategy

Last updated: 2026-04-03
Owner: Darling MarTech
Scope: Promote the 4 live visitor utilities as strategic conversion assets, not just buttons.

## Goal

Increase qualified tool starts, tool completion, and tool-led contact intent by turning tools into a visible narrative layer across the site.

Primary business objective:
- Convert more high-intent visitors through value-first tool usage before sales conversations.

Primary UX objective:
- Make every tool feel like a mini strategic product with outcome framing, proof, and a clear next step.

## Current Baseline (Repo Audit)

Current implementation strengths:
- Dedicated tools index with 4 featured utilities and strong visual card treatment.
- Homepage already includes one featured tool section.
- Tool-level analytics events exist for click and usage flows.
- Tool intent routing exists (`/contact?intent=tool`).

Current gaps:
- Most pages still treat tools as secondary links, not decision-stage assets.
- CTA copy is mostly action labels, not outcome promises by buyer intent.
- No cross-site "tool path" progression (awareness -> run -> interpret -> contact).
- No persistent tool recommendation logic by page context (service/work/process).

## External Pattern Research (What To Borrow)

Research sample reviewed:
- https://digitalneighbor.com/
- https://www.wearetg.com/
- https://www.tabnav.com/
- https://www.forthepeople.agency/
- https://plusdrie.com/
- https://www.wiz.io/
- https://www.freelancecake.com/
- Supporting marketplace context from https://www.designrush.com/agency/digital-marketing

Note:
- Some listed sites are animation-heavy and difficult to scrape via text extraction, so pattern synthesis focuses on verifiable structure and messaging signals from accessible pages.

### Pattern 1: Outcome-first framing beats feature-first framing
Observed on: wearetg, digitalneighbor, wiz, tabnav

What works:
- Headline names the business outcome, not tool internals.
- Tool or service card then explains mechanism in one short line.

Apply to Darling:
- Replace generic "launch/run" framing with outcome statements:
  - "Find the channels you should trust this quarter"
  - "See if AI search can actually find your business"
  - "Turn your strategy gap into a 90-day roadmap"

### Pattern 2: Modular pathways outperform one-off CTAs
Observed on: tabnav, wearetg, digitalneighbor

What works:
- A grouped section presents multiple free utilities as a system.
- Each tile has one clear "use now" action and one "learn more" path.

Apply to Darling:
- Introduce a reusable "Tool Path Rail" section component for non-tools pages:
  - Primary action: run the recommended tool now
  - Secondary action: why this tool matters for this page context

### Pattern 3: Trust + proof around utilities increases adoption
Observed on: wiz, wearetg, digitalneighbor

What works:
- Place social proof and expected output quality near the CTA.
- Show what user gets in concrete terms (score, report, model comparison).

Apply to Darling:
- Add compact "What you get in 3 minutes" bullets under each promoted tool card.
- Pair each tool with one supporting proof link (`/work/...`) and one service link (`/services/...`).

### Pattern 4: Distinct buyer-intent entry points reduce friction
Observed on: wearetg, freelancecake, tabnav

What works:
- Different CTA labels for different readiness levels (learn vs start vs talk).

Apply to Darling:
- Keep one dominant CTA per section, but adapt label by page role:
  - Homepage: "Run a free strategy tool"
  - Service page: "Diagnose this before you buy"
  - Work page: "See how your version scores"
  - Process page: "Start with a self-assessment"

## Darling "Call-to-Tool" Architecture

## 1) Role Definitions Per Tool

1. CMO Simulator
- Role: Strategic orientation (top/mid funnel)
- Promise: clarify priorities and trade-offs
- Best placement: homepage, process, strategy services

2. GEO Readiness Auditor
- Role: Search visibility diagnostic (mid funnel)
- Promise: visibility score + prioritized fixes
- Best placement: growth services, SEO-related work pages

3. CMO Roadmap Generator
- Role: Planning bridge (mid/bottom funnel)
- Promise: prioritized 90-day direction
- Best placement: services index, process page, contact pre-frame

4. Attribution Snapshot
- Role: Measurement confidence check (mid/bottom funnel)
- Promise: model spread clarity + next action
- Best placement: growth/services pages, work pages with revenue metrics

## 2) Sitewide Placement Plan

### Homepage
- Keep current featured tool section but add "Choose your starting point" mini-grid under hero or after services.
- Show all 4 tools in compact bento layout with one-line outcome promise.
- Add one "Not sure where to start?" recommendation CTA linking to CMO Simulator.

### Services Index (`/services`)
- Add one contextual tool tile per cluster card (secondary prominence, high relevance).
- Example:
  - Strategy cluster -> CMO Simulator
  - Growth cluster -> GEO Auditor
  - Systems cluster -> Attribution Snapshot or CMO Roadmap Generator

### Service Detail Pages (`/services/[slug]`)
- Add "Diagnose before engagement" tool block after hero/summary.
- Use exactly one primary tool card, optionally one secondary.
- Keep CTA hierarchy clear: service CTA remains primary for purchase-intent users.

### Work Index + Work Detail
- Add small "Try the framework" panel tied to the proof narrative.
- Example:
  - If case study cites measurement clarity -> Attribution Snapshot
  - If local SEO visibility proof -> GEO Auditor

### Process Page
- Add phased CTA stack matching process stages:
  - Discover -> CMO Simulator
  - Diagnose -> GEO or Attribution
  - Plan -> CMO Roadmap Generator
  - Implement -> Contact intent tool

### Contact Page
- Keep existing intent model.
- For `intent=tool`, prefill supportive helper copy:
  - "Paste your output summary and where you got stuck."

## 3) CTA Copy System (Replace Generic Button Language)

Use this 3-part formula:
- Verb + outcome + time/risk qualifier

Examples:
- "Get your GEO score in under 2 minutes"
- "Compare attribution models before changing spend"
- "Build a 90-day marketing roadmap"
- "Run a CMO-level decision session"

Secondary CTA examples:
- "See a real client example"
- "Understand the method first"

## 4) Design Direction (Non-Button Promotion)

Direction A: Strategy Console
- Dark control-room panel aesthetic (fits current brand system).
- Each tool card includes:
  - signal pill (what stage)
  - expected output chip
  - one metric/value teaser
  - primary CTA + supporting proof link

Direction B: Diagnostic Bento Grid
- Responsive modular cells (2026 bento pattern), mixed card heights.
- At least one card shows "tool preview state" not just static screenshot.

Direction C: Guided Tool Path
- Horizontal progress strip:
  - Assess -> Prioritize -> Plan -> Talk
- Each step links to one tool or conversation endpoint.

Motion guidance:
- Keep spring-based reveal and subtle hover lift.
- Use staggered content reveal per row, not generic global fade.

## 5) Analytics and Measurement Plan

Track promotion impact with existing analytics structure and extend where needed.

Existing foundation:
- `cta_click` and tool-specific events are already in place.

Add event labeling discipline:
- `location`: page_section context (home_services_grid, service_detail_diagnostic, work_detail_tool_panel, process_tool_path)
- `label`: tool slug + action type

Core KPIs:
- Tool CTA CTR by section
- Tool start rate by page source
- Tool completion/value event rate
- Tool -> contact conversion rate
- Contact submissions with `intent=tool`

Experiment cadence:
- Run 2-week A/B copy tests per high-traffic section.
- Keep design fixed while testing copy first.

## 6) 30/60/90 Execution Plan

### First 30 days (Fast wins)
1. Add new copy system for tool CTAs across homepage/tools/process.
2. Add one reusable "Tool Path Rail" component and ship on homepage + process.
3. Add service-cluster contextual tool links on `/services`.
4. Extend analytics labels for section-specific tool CTA attribution.

### Days 31-60 (Structural rollout)
1. Add service detail diagnostic block template.
2. Add work detail contextual tool panel.
3. Ship bento-style mini-grid variant for homepage and compare against current list format.

### Days 61-90 (Optimization)
1. Tune recommendations by page type and conversion performance.
2. Promote highest-converting tool path in nav/footer micro-placements.
3. Expand content support: one short explainer per tool use case.

## Recommended First Build Slice

Start here for highest leverage with lowest risk:
1. Homepage "Choose your starting point" bento block (all 4 tools)
2. Process page "Guided Tool Path" strip
3. Services index contextual tool mapping by cluster

This creates immediate cross-site visibility without changing route architecture.

## Implementation Constraints (Darling-specific)

- Keep `/tools` as canonical utility surface.
- Keep one primary CTA per section; tool CTA should not overpower page primary conversion intent.
- Keep `/contact?intent=tool` routing intact.
- Preserve dark base + orange accent system and existing motion language.
- Prefer modular section components for reuse over page-specific one-offs.

## Success Definition

This strategy is working when:
- Tool starts increase from non-tools pages.
- More contacts arrive with `intent=tool` and higher context quality.
- Service and work pages generate tool-assisted pre-qualified conversations.
- Tools feel like a strategic product layer, not isolated buttons.
