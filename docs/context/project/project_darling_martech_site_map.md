# Darling MarTech Site Map

This is the site information architecture for `darlingmartech.com`, not just the header nav.

Status key:
- `Live` = already on the site
- `Next` = should exist in the next build phase
- `Later` = planned expansion page, not immediate

## 1. Top-Level Pages

```text
/                                Home                                  Live
/services                        Services hub                          Live
/work                            Case studies hub                      Live
/lab                             Lab hub                               Live
/about                           About / credibility                   Live
/process                         Process / how engagements work        Next
/contact                         Contact / conversion                  Live
/pricing                         Pricing / offers                      Later
```

## 2. Services Hub

Purpose:
- Central commercial hub
- Explains the three service layers
- Routes visitors into service landing pages based on need
- Carries proof into work pages and contact

Canonical structure:

```text
/services                                                             Live
├── /services/strategy                                                Live
│   └── /services/strategy/fractional-cmo                             Later
├── /services/brand-web                                               Live
│   ├── /services/brand-web/web-design-development                    Later
│   ├── /services/brand-web/conversion-rate-optimization              Later
│   ├── /services/brand-web/technical-seo                             Later
│   └── /services/brand-web/geo-optimization                          Later
├── /services/systems                                                 Live
│   ├── /services/systems/crm-implementation                          Later
│   ├── /services/systems/lead-gen-workflows                          Later
│   ├── /services/systems/lifecycle-email-automation                  Later
│   ├── /services/systems/agentic-marketing-systems                   Next
│   └── /services/systems/the-fortress                                Next
├── /services/growth                                                  Live
│   ├── /services/growth/attribution-modeling                         Later
│   ├── /services/growth/analytics-dashboard-buildout                 Later
│   ├── /services/growth/ga4-server-side-tracking                     Later
│   ├── /services/growth/the-conductor                                Next
│   └── /services/growth/reporting-infrastructure                     Later
├── /services/commerce                                                Live
└── /services/specialized                                             Live

/services/martech-audit                                               Live
```

## 3. Service Landing Pages

Immediate priority pages:

```text
/services/martech-audit
/services/systems/agentic-marketing-systems
/services/systems/the-fortress
/services/growth/the-conductor
```

Second-wave commercial pages:

```text
/services/brand-web/technical-seo
/services/brand-web/geo-optimization
/services/brand-web/conversion-rate-optimization
/services/strategy/fractional-cmo
/services/systems/lead-gen-workflows
/services/growth/ga4-server-side-tracking
```

Rules:
- Parent service pages explain the layer and route to child landing pages.
- Child landing pages are intent-specific money pages.
- `MarTech Audit` stays standalone because it is a productized entry offer, not a child under one parent.

## 4. Industry Pages

Priority order from the service architecture research:

```text
/industries/healthcare                                                Next
/industries/ecommerce                                                 Next
/industries/legal                                                     Next
/industries/hospitality                                               Next
/industries/saas                                                      Next
```

Possible expansion:

```text
/industries/local-service                                             Later
/industries/nonprofit                                                 Later
/industries/finance                                                   Later
```

Role of industry pages:
- Prove vertical fluency
- Pull together the right service pages
- Show only the work and labs that matter for that vertical

## 5. Selected Work Pages

Hub:

```text
/work                                                                 Live
```

Flagship proof pages:

```text
/work/graston-technique
/work/pike-medical-consultants
/work/317-bbq
/work/hoosier-boy-barbershop
/work/riley-bennett-egloff
```

High-value supporting proof pages:

```text
/work/the-fortress
/work/the-compass
/work/the-launchpad
/work/the-closer
/work/primarycare-indy
/work/urgentcare-indy
/work/tuohy-bailey-moore
/work/behr-pet-essentials
/work/russell-painting
/work/primary-colours
```

## 6. Lab Pages

Hub:

```text
/lab                                                                  Live
```

Current live lab/detail pages:

```text
/lab/cmo-simulator
/lab/graston-growth-engine
/lab/pro-dj-studio
/lab/strum-ai
/lab/barbershop-command-center
/lab/clinical-compass
/lab/smart-sales-pricing
/lab/investment-roi-planner
/lab/license-requirements
```

Future commercial-proof labs that should connect directly into service pages:

```text
/lab/geo-auditor                                                      Later
/lab/agentic-marketing-monitor                                        Later
/lab/martech-stack-auditor                                            Later
/lab/fortress-security-scanner                                        Later
/lab/roi-dashboard                                                    Later
```

## 7. About / Process / Contact

```text
/about                                                                Live
/process                                                              Next
/contact                                                              Live
```

Role:
- `/about` builds trust and gives background
- `/process` removes uncertainty and explains engagement flow
- `/contact` is the conversion endpoint for every commercial path

Recommended `/process` structure:

```text
/process
├── Discovery
├── Audit / diagnosis
├── Build / implementation
└── Optimization / ongoing support
```

## 8. Internal Linking Rules

### Global rules
- Every commercial page must have one primary CTA to `/contact`.
- Every service page must link to at least 2 relevant work pages.
- Every service page should link back to `/services`.
- Every child service page should link to its parent service page.
- Every industry page should link to 2 to 4 service pages and 2 to 3 work pages.
- Every lab page should link to exactly one primary service page and one supporting work page.
- Every work page should link to the service page it proves.
- Every work page should link to the relevant industry page once those pages exist.

### Hub-to-detail rules
- `/services` links to all parent service pages plus the standalone `MarTech Audit`.
- Parent service pages link down to child landing pages.
- `/work` links to flagship case studies first.
- `/lab` links to live tools first, not concept pages.

### Detail-to-detail rules
- `MarTech Audit` links to `Graston Technique`, `The Fortress`, `The Compass`, and `/contact`.
- `Agentic Marketing Systems` should link to `Graston Technique`, the future `Agentic Marketing Monitor`, and `/contact`.
- `The Fortress` should link to `/work/the-fortress`, `/services/martech-audit`, and `/contact`.
- `The Conductor` should link to analytics proof work, the future ROI dashboard lab, and `/contact`.

### Trust-path rules
- `/about` should link to `/process`, `/work`, and `/contact`.
- `/process` should link to `/services/martech-audit`, `/services`, and `/contact`.
- `/contact` should link back to `/services` and selected work proof for hesitant visitors.

## 9. Canonical IA Notes

- Keep current parent service slugs canonical for now: `strategy`, `brand-web`, `systems`, `growth`, `commerce`, `specialized`.
- Do not use preview-domain URLs as canonicals.
- Keep `MarTech Audit` standalone.
- Build industry pages only after the core service landing pages are in place.
- Labs only become proof links when the actual tool exists and is live.
