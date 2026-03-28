# Darling MarTech Service Architecture

This file defines the commercial service architecture for Darling MarTech.

It is not a nav document. It is the service-system map that connects:
- parent services
- child services
- pain points
- deliverables
- proof
- labs
- industries
- buyer personas

It should guide:
- `/services` page structure
- future child service pages
- `/solutions/[problem]` pages
- `/industries/[vertical]` pages
- contact form service categories
- internal linking between services, work, and labs

## Canonical Architecture Notes

- These are the commercial parent services, even if the current live route slugs are different.
- `MarTech Audit` remains a standalone productized offer and also acts as an entry point into several parent services.
- Current live route mapping:
  - `Growth Strategy & Audits` maps to `/services/strategy` plus `/services/martech-audit`
  - `Website & Conversion Systems` maps to `/services/brand-web`
  - `CRM, Automation & RevOps` maps to `/services/systems`
  - `Search Visibility & GEO` currently sits under `/services/growth`
  - `Analytics, Attribution & Reporting` is currently split between `/services/growth` and future child pages
  - `AI Workflows & Digital Operations` currently sits under `/services/systems`

---

## 1. Growth Strategy & Audits

Role:
- Top-of-funnel strategic clarity
- Diagnostic offers
- Positioning and prioritization
- Senior-level growth direction before execution

Current route anchor:
- `/services/strategy`
- `/services/martech-audit`

### Child Services

#### Fractional CMO / Growth Strategy
- Route target: `/services/strategy/fractional-cmo`
- Related pain points:
  - No clear growth strategy
  - Founder is acting as the marketing lead
  - Channels are active but disconnected
  - Team executes tactics without a roadmap
- Related deliverables:
  - positioning and messaging strategy
  - channel plan
  - KPI framework
  - budget allocation guidance
  - campaign and roadmap planning
- Related case studies:
  - `/work/pike-medical-consultants`
  - `/work/riley-bennett-egloff`
  - `/work/primary-colours`
- Related lab projects:
  - `/lab/cmo-simulator`
- Related industries/personas:
  - healthcare founders
  - law firm leadership
  - founder-led SaaS teams
  - small business owners who have outgrown freelancers

#### MarTech Audit
- Route target: `/services/martech-audit`
- Related pain points:
  - CRM is a mess
  - attribution is broken
  - too many tools, unclear ROI
  - forms, automations, and reporting do not agree
  - the business knows something is broken but cannot see where
- Related deliverables:
  - full stack inventory
  - redundancy analysis
  - lifecycle and handoff review
  - attribution and reporting audit
  - prioritized remediation roadmap
- Related case studies:
  - `/work/graston-technique`
  - `/work/the-fortress`
  - `/work/the-compass`
  - `/work/the-launchpad`
- Related lab projects:
  - future `/lab/martech-stack-auditor`
- Related industries/personas:
  - operations-heavy healthcare teams
  - RevOps-minded SaaS teams
  - multi-tool service businesses
  - owners who inherited a messy stack

#### Positioning Workshop
- Route target: `/services/strategy/positioning-workshop`
- Related pain points:
  - offer sounds generic
  - website traffic does not convert
  - brand feels interchangeable
  - no clear reason to choose this business
- Related deliverables:
  - market positioning workshop
  - message hierarchy
  - audience language map
  - value proposition refinement
- Related case studies:
  - `/work/black-letter`
  - `/work/primary-colours`
  - `/work/riley-bennett-egloff`
- Related lab projects:
  - `/lab/cmo-simulator`
- Related industries/personas:
  - professional services firms
  - founder-led brands
  - businesses preparing for a relaunch

---

## 2. Website & Conversion Systems

Role:
- Trust-building front-end systems
- Conversion architecture
- site rebuilds and landing pages
- visual and structural changes that directly affect demand capture

Current route anchor:
- `/services/brand-web`

### Child Services

#### Web Design & Development
- Route target: `/services/brand-web/web-design-development`
- Related pain points:
  - site looks dated
  - mobile UX is weak
  - visitors do not know what to do next
  - site does not reflect the quality of the business
- Related deliverables:
  - website strategy
  - UX architecture
  - conversion-focused page layouts
  - responsive development
  - trust signal integration
- Related case studies:
  - `/work/317-bbq`
  - `/work/tuohy-bailey-moore`
  - `/work/hoosier-boy-barbershop`
- Related lab projects:
  - `/lab/barbershop-command-center`
  - `/lab/graston-growth-engine`
- Related industries/personas:
  - restaurants
  - law firms
  - local service businesses
  - founders relaunching an outdated site

#### Conversion Rate Optimization
- Route target: `/services/brand-web/conversion-rate-optimization`
- Related pain points:
  - traffic is coming in but leads are weak
  - forms are not converting
  - checkout or booking path leaks demand
  - no testing discipline
- Related deliverables:
  - funnel audit
  - landing page rebuild
  - CTA and messaging testing
  - form flow simplification
  - booking or checkout optimization
- Related case studies:
  - `/work/317-bbq`
  - `/work/behr-pet-essentials`
  - `/work/tuohy-bailey-moore`
- Related lab projects:
  - future ROI-focused testing tools
- Related industries/personas:
  - e-commerce operators
  - restaurants with online ordering
  - lead-gen service businesses
  - owners paying for traffic that does not convert

#### Visual Identity
- Route target: `/services/strategy/visual-identity` or `/services/brand-web/visual-identity`
- Related pain points:
  - brand looks generic
  - no recognizable visual system
  - identity does not match pricing or positioning
- Related deliverables:
  - logo and mark system
  - typography and color direction
  - brand usage guidance
  - identity applications across site and collateral
- Related case studies:
  - `/work/black-letter`
  - `/work/circle-city-kicks`
  - `/work/clean-aesthetic`
  - `/work/hoosier-boy-barbershop`
- Related lab projects:
  - none required
- Related industries/personas:
  - premium advisory firms
  - local retail
  - healthcare and aesthetics brands
  - founders moving up-market

---

## 3. CRM, Automation & RevOps

Role:
- lead flow infrastructure
- CRM architecture
- lifecycle automation
- handoff systems between marketing and sales

Current route anchor:
- `/services/systems`

### Child Services

#### CRM Implementation
- Route target: `/services/systems/crm-implementation`
- Related pain points:
  - no lifecycle visibility
  - contacts live in disconnected systems
  - sales and marketing handoff is manual
  - team adopted a CRM but never implemented it correctly
- Related deliverables:
  - CRM architecture
  - pipeline setup
  - lead source mapping
  - lifecycle segmentation
  - forms and CRM sync
- Related case studies:
  - `/work/graston-technique`
  - `/work/the-launchpad`
  - `/work/the-closer`
- Related lab projects:
  - future `/lab/lead-scoring-tool`
- Related industries/personas:
  - training businesses
  - healthcare orgs
  - SaaS teams
  - service businesses with growing lead volume

#### Lead Intake & Speed-to-Lead
- Route target: `/services/systems/lead-intake-speed-to-lead`
- Related pain points:
  - leads come in but nobody follows up fast enough
  - intake forms drop context
  - referrals and inbound leads are not routed properly
- Related deliverables:
  - intake workflow mapping
  - auto-routing rules
  - notification and SLA logic
  - lead qualification automation
- Related case studies:
  - `/work/graston-technique`
  - `/work/urgentcare-indy`
  - `/work/the-launchpad`
- Related lab projects:
  - future `/lab/lead-scoring-tool`
- Related industries/personas:
  - law firms
  - healthcare practices
  - founder-led service businesses
  - anyone losing leads in the first 5 minutes

#### Lifecycle Email Automation
- Route target: `/services/systems/lifecycle-email-automation`
- Related pain points:
  - leads go cold after first touch
  - onboarding is inconsistent
  - no nurture system
  - retention and reactivation are ad hoc
- Related deliverables:
  - nurture sequence design
  - onboarding flows
  - reactivation campaigns
  - lifecycle trigger mapping
- Related case studies:
  - `/work/graston-technique`
  - `/work/the-launchpad`
  - `/work/behr-pet-essentials`
- Related lab projects:
  - future lifecycle optimization tools
- Related industries/personas:
  - membership businesses
  - e-commerce operators
  - SaaS products
  - service brands with longer buying cycles

---

## 4. Search Visibility & GEO

Role:
- organic visibility
- local and technical search performance
- AI-era discoverability
- search systems that turn intent into bookings, calls, or leads

Current route anchor:
- currently under `/services/growth`

### Child Services

#### Technical SEO
- Route target: `/services/growth/technical-seo`
- Related pain points:
  - site exists but does not rank
  - crawl/index issues
  - performance problems block visibility
  - metadata and structure are weak
- Related deliverables:
  - technical SEO audit
  - on-page structure cleanup
  - schema strategy
  - crawl and index fixes
  - performance and page-speed remediation
- Related case studies:
  - `/work/primarycare-indy`
  - `/work/hoosier-boy-barbershop`
  - `/work/russell-painting`
- Related lab projects:
  - future `/lab/geo-auditor`
- Related industries/personas:
  - local service businesses
  - clinics
  - law firms
  - businesses with existing sites that never gained visibility

#### GEO Optimization
- Route target: `/services/growth/geo-optimization`
- Related pain points:
  - site is invisible in AI summaries and answer engines
  - content is not structured for LLM retrieval
  - business wants first-mover advantage in AI search behavior
- Related deliverables:
  - GEO readiness audit
  - content structure recommendations
  - entity/schema reinforcement
  - answer-style content improvements
  - AI visibility roadmap
- Related case studies:
  - `/work/hoosier-boy-barbershop`
  - `/work/primarycare-indy`
  - `/work/russell-painting`
- Related lab projects:
  - future `/lab/geo-auditor`
- Related industries/personas:
  - SMB founders who depend on search
  - local service operators
  - professional services firms
  - businesses wanting early AI-search positioning

#### Local Search Visibility
- Route target: folded into `/services/growth` or future local SEO child page
- Related pain points:
  - weak Google Business presence
  - map pack visibility is poor
  - reviews and trust signals are unmanaged
- Related deliverables:
  - local SEO architecture
  - Google Business profile optimization
  - review strategy
  - location-page and service-area content
- Related case studies:
  - `/work/urgentcare-indy`
  - `/work/hoosier-boy-barbershop`
  - `/work/russell-painting`
- Related lab projects:
  - future local visibility audit tools
- Related industries/personas:
  - healthcare clinics
  - restaurants
  - barbershops
  - home services

---

## 5. Analytics, Attribution & Reporting

Role:
- measurement architecture
- reporting clarity
- decision-grade dashboards
- visibility into what is working and what is broken

Current route anchor:
- currently split between `/services/growth` and future dedicated analytics child pages

### Child Services

#### Attribution Modeling
- Route target: `/services/growth/attribution-modeling`
- Related pain points:
  - cannot prove ROI
  - marketing reports contradict each other
  - channels get credit arbitrarily
- Related deliverables:
  - attribution framework
  - lead source normalization
  - event taxonomy
  - reporting logic alignment
- Related case studies:
  - `/work/primarycare-indy`
  - `/work/the-compass`
  - `/work/graston-technique`
- Related lab projects:
  - future `/lab/roi-dashboard`
- Related industries/personas:
  - SaaS teams
  - healthcare operators
  - owners managing paid + organic together

#### GA4 & Server-Side Tracking
- Route target: `/services/growth/ga4-server-side-tracking`
- Related pain points:
  - GA4 setup is unreliable
  - event tracking is misfiring
  - ad-platform attribution is degraded
  - reporting confidence is low
- Related deliverables:
  - GA4 audit and rebuild
  - event architecture
  - conversion tracking validation
  - server-side tagging roadmap
- Related case studies:
  - `/work/the-compass`
  - `/work/primarycare-indy`
  - `/work/graston-technique`
- Related lab projects:
  - future analytics QA tools
- Related industries/personas:
  - paid media buyers
  - SaaS operators
  - e-commerce teams
  - service firms spending on ads without trustworthy tracking

#### The Conductor
- Route target: `/services/growth/the-conductor`
- Related pain points:
  - data exists in too many places
  - no executive-level dashboard
  - leadership cannot make decisions confidently
- Related deliverables:
  - unified reporting framework
  - source-of-truth dashboarding
  - KPI rollups
  - decision-grade reporting layer
- Related case studies:
  - `/work/the-compass`
  - `/work/graston-technique`
  - `/work/primarycare-indy`
- Related lab projects:
  - future `/lab/roi-dashboard`
  - future attribution engine
- Related industries/personas:
  - multi-channel small businesses
  - SaaS leadership
  - healthcare groups
  - founders who want cleaner reporting without enterprise overhead

#### Reporting Infrastructure
- Route target: `/services/growth/reporting-infrastructure`
- Related pain points:
  - reports are manual
  - team spends too much time exporting and formatting data
  - decision-makers do not get timely insight
- Related deliverables:
  - dashboard buildout
  - reporting automation
  - KPI definitions
  - source synchronization
- Related case studies:
  - `/work/the-compass`
  - `/work/graston-technique`
- Related lab projects:
  - future `/lab/roi-dashboard`
- Related industries/personas:
  - small internal teams
  - ops-heavy service businesses
  - founder-led companies outgrowing spreadsheet reporting

---

## 6. AI Workflows & Digital Operations

Role:
- operational leverage
- AI-assisted workflows
- internal tools
- automation and monitoring that reduce manual decision-making

Current route anchor:
- currently under `/services/systems`

### Child Services

#### Agentic Marketing Systems
- Route target: `/services/systems/agentic-marketing-systems`
- Related pain points:
  - nobody is monitoring campaigns consistently
  - reporting exists but no one turns it into actions
  - small team needs analyst-level leverage
- Related deliverables:
  - agentic monitoring workflows
  - alerting and recommendation systems
  - campaign insight automation
  - AI-assisted operational dashboards
- Related case studies:
  - `/work/graston-technique`
  - `/work/the-compass`
  - `/work/the-launchpad`
- Related lab projects:
  - future `/lab/agentic-marketing-monitor`
- Related industries/personas:
  - lean SaaS teams
  - founder-led businesses
  - operators who need automated oversight

#### The Fortress
- Route target: `/services/systems/the-fortress`
- Related pain points:
  - infrastructure risk
  - direct-origin exposure
  - slow or unstable site performance
  - nobody owns the operational hardening layer
- Related deliverables:
  - origin shielding and security hardening
  - caching and performance architecture
  - infrastructure review
  - monitoring and operational safeguards
- Related case studies:
  - `/work/the-fortress`
  - `/work/graston-technique`
- Related lab projects:
  - future `/lab/fortress-security-scanner`
- Related industries/personas:
  - healthcare organizations
  - SaaS products
  - businesses with sensitive infrastructure or uptime concerns

#### Custom Internal Tools & Operational Dashboards
- Route target: folded into `/services/systems` and `/services/growth/the-conductor`
- Related pain points:
  - too much manual work
  - team relies on spreadsheets or disconnected tools
  - no custom interface for recurring decisions
- Related deliverables:
  - internal tools
  - calculators
  - admin dashboards
  - automation control panels
- Related case studies:
  - `/work/the-launchpad`
  - `/work/the-compass`
  - `/work/the-closer`
- Related lab projects:
  - `/lab/graston-growth-engine`
  - `/lab/barbershop-command-center`
  - `/lab/clinical-compass`
  - `/lab/smart-sales-pricing`
- Related industries/personas:
  - ops-heavy training businesses
  - local service operators
  - founders with niche workflows not served by off-the-shelf tools

---

## Cross-Service Pain Point Map

Use these to drive `/solutions/[problem]` pages and contact intake categories.

### Leads are coming in, but not converting
- Primary services:
  - Conversion Rate Optimization
  - CRM Implementation
  - Lead Intake & Speed-to-Lead
  - MarTech Audit

### CRM is a mess
- Primary services:
  - MarTech Audit
  - CRM Implementation
  - Reporting Infrastructure

### Website looks fine but does not produce business results
- Primary services:
  - Web Design & Development
  - Conversion Rate Optimization
  - Technical SEO

### We cannot tell what marketing is working
- Primary services:
  - Attribution Modeling
  - GA4 & Server-Side Tracking
  - The Conductor
  - MarTech Audit

### We need automation because the team is too small
- Primary services:
  - CRM Implementation
  - Lifecycle Email Automation
  - Agentic Marketing Systems
  - Custom Internal Tools

### We need strategic direction before we invest more
- Primary services:
  - Fractional CMO / Growth Strategy
  - Positioning Workshop
  - MarTech Audit

---

## Cross-Service Industry / Persona Map

### Healthcare
- Best-fit services:
  - MarTech Audit
  - Fractional CMO / Growth Strategy
  - CRM Implementation
  - Local Search Visibility
  - The Conductor

### Legal / Professional Services
- Best-fit services:
  - Positioning Workshop
  - Web Design & Development
  - Lead Intake & Speed-to-Lead
  - Attribution Modeling

### E-Commerce
- Best-fit services:
  - Conversion Rate Optimization
  - Lifecycle Email Automation
  - GA4 & Server-Side Tracking
  - Reporting Infrastructure

### Hospitality / Local Service
- Best-fit services:
  - Web Design & Development
  - Local Search Visibility
  - Conversion Rate Optimization
  - GEO Optimization

### SaaS / Training / Membership
- Best-fit services:
  - CRM Implementation
  - Agentic Marketing Systems
  - The Conductor
  - The Fortress

---

## Implementation Priorities

### Priority 1
- `MarTech Audit`
- `Agentic Marketing Systems`
- `The Fortress`
- `The Conductor`

### Priority 2
- `Technical SEO`
- `GEO Optimization`
- `Conversion Rate Optimization`
- `Fractional CMO`

### Priority 3
- `Lead Intake & Speed-to-Lead`
- `GA4 & Server-Side Tracking`
- `Reporting Infrastructure`
- `Positioning Workshop`

---

## Internal Linking Rules For Service Architecture

- Every parent service page links to all of its child services.
- Every child service page links back to its parent.
- Every child service page links to:
  - 2 to 3 related case studies
  - 1 primary lab project if it exists
  - 1 to 2 related pain-point pages once `/solutions` exists
  - 1 to 2 related industry pages once `/industries` exists
- `MarTech Audit` should cross-link into:
  - CRM, Automation & RevOps
  - Analytics, Attribution & Reporting
  - AI Workflows & Digital Operations
- `The Conductor` and `The Fortress` should be treated as named frameworks, not generic service blurbs.
- `Agentic Marketing Systems` should be positioned as a differentiated, first-mover service and linked accordingly from CRM and AI parent pages.
