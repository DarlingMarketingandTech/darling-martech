# Service Route + Slug Conventions

Use this file to keep current and future service routes consistent.

## Goal

Service routes should be:
- clear
- commercial
- easy to understand
- easy to link internally
- stable enough to support future SEO work

## Current architecture rule

The repo currently uses:
- `/services`
- `/services/[slug]`

Future child-service pages should stay aligned with this structure unless there is a deliberate route migration.

## Naming rules

### Prefer plain-English slugs
Good:
- `fractional-cmo`
- `website-strategy`
- `crm-architecture`
- `local-seo`
- `conversion-optimization`

Avoid:
- overly clever internal names
- abstract productized labels without explanation
- unnecessary acronyms in the slug when a clearer term exists

### Match page purpose, not internal taxonomy language
If the service page is meant for buyers, the slug should be buyer-legible.

Prefer:
- `website-strategy`
Over:
- `digital-experience-optimization-systems`

### Keep cluster grouping readable if nested later
If the route system later expands into nested child pages, keep slug names compatible with that future shape.

For example:
- `/services/strategy/fractional-cmo`
- `/services/web/website-strategy`
- `/services/systems/crm-architecture`
- `/services/growth/local-seo`

These are not mandatory now, but new names should not fight this future structure.

## Recommended route naming shortlist

| Sub-service | Recommended slug |
|---|---|
| Fractional CMO / Strategic Leadership | `fractional-cmo` or `strategic-leadership` |
| Website Strategy & Rebuilds | `website-strategy` or `website-rebuilds` |
| CRM Architecture | `crm-architecture` |
| Local SEO | `local-seo` |
| Conversion Optimization | `conversion-optimization` |
| Workflow Automation | `workflow-automation` |
| Marketing Audit & Growth Roadmap | `marketing-audit` or `growth-roadmap` |
| Lead Generation Systems | `lead-generation-systems` |
| Positioning & Messaging Strategy | `positioning-messaging` |
| Sales Enablement Systems | `sales-enablement-systems` |
| Website Ownership & Optimization | `website-optimization` |
| Brand Identity Systems | `brand-identity` |
| Internal Tools & AI Workflows | `internal-tools-ai-workflows` |
| GEO / AI Search Readiness | `geo-ai-search-readiness` or `geo-readiness` |
| Content & Demand Systems | `content-demand-systems` |
| Go-to-Market / Launch Strategy | `go-to-market` |
| Reporting & Decision Systems | `reporting-decision-systems` |

## Internal linking rule

Whenever a new service page route is created:
- update service-page docs if the final slug differs from the planning name
- use the same slug in CTA references, breadcrumbs, metadata, and proof links
- avoid alias routes unless necessary

## CTA intent rule

Service routes should typically resolve to a CTA using:
- `/contact?intent=service`

## Metadata rule

Titles and descriptions should use the buyer-readable service name, not internal shorthand.

## Use case

Use this file before creating any new route under `/services` or refactoring existing service URLs.