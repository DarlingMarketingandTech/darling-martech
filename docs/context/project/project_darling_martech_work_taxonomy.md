# Darling MarTech Work Taxonomy

This file defines the proof taxonomy for `/work` and `/lab`.

Its job is to make each project machine-sortable and directly connectable to:
- service pages
- solution pages
- industry pages
- contact flows
- CTA logic on work and lab detail pages

This is the working source of truth for project-to-service mapping.

## How To Use This File

- `primary parent service` should map each project to one commercial parent service from `project_darling_martech_service_architecture.md`
- `secondary services` are the supporting service tags or child services that also fit
- `CTA destination` is the canonical service page this project should push visitors toward
- If a child service route does not exist yet, use the current parent service route as fallback

## Parent Service Reference

- `Growth Strategy & Audits`
- `Website & Conversion Systems`
- `CRM, Automation & RevOps`
- `Search Visibility & GEO`
- `Analytics, Attribution & Reporting`
- `AI Workflows & Digital Operations`

## Funnel Stage Reference

- `Awareness` = broad credibility / inspiration / early proof
- `Consideration` = evaluating approaches or service fit
- `Decision` = high-intent proof tied directly to a service sale

## Proof Type Reference

- `Case study` = client work with business outcome
- `System proof` = sub-project or named internal system with concrete metrics
- `Tool proof` = live or embedded product/tool demonstrating capability
- `Brand proof` = positioning / identity / trust-building outcome

---

## Work Projects

| Project name | Type | Primary parent service | Secondary services | Target persona | Target industry | Funnel stage | Platform / stack | Proof type | Business outcome | CTA destination |
|---|---|---|---|---|---|---|---|---|---|---|
| Graston Technique | work | CRM, Automation & RevOps | MarTech Audit; Agentic Marketing Systems; The Conductor | marketing director; ops lead; education platform owner | healthcare; SaaS; membership/training | Decision | WordPress; WooCommerce; LearnDash; CRM automation; API integrations; analytics | Case study | +212% qualified leads; 95% overhead reduction; 48 hrs/wk saved | `/services/martech-audit` |
| The Launchpad | work | CRM, Automation & RevOps | Lead Intake & Speed-to-Lead; Lifecycle Email Automation | ops lead; membership program manager | healthcare; SaaS; training | Decision | membership workflow stack; CRM integration; automation systems | System proof | 95% less manual overhead; 0 manual enrollment steps | `/services/systems/lead-intake-speed-to-lead` |
| The Closer | work | Website & Conversion Systems | CRM, Automation & RevOps; Conversion Rate Optimization | sales leader; e-commerce operator | SaaS; e-commerce | Decision | quote-to-order automation; payment workflow systems | System proof | 0 manual invoices; checkout friction removed | `/services/brand-web/conversion-rate-optimization` |
| The Compass | work | Analytics, Attribution & Reporting | MarTech Audit; The Conductor | founder; ops lead; marketing analyst | healthcare; SaaS | Decision | analytics layer; monitoring; dashboard systems | System proof | 94% issues auto-resolved; clearer operational visibility | `/services/growth/the-conductor` |
| The Fortress | work | AI Workflows & Digital Operations | MarTech Audit; Technical SEO | founder; ops lead; web infrastructure owner | healthcare; SaaS | Decision | infrastructure hardening; performance; origin shielding; caching | System proof | 85k+ threats blocked; lower server load; hidden origin | `/services/systems/the-fortress` |
| Pike Medical Consultants | work | Growth Strategy & Audits | Fractional CMO; Brand Strategy; Paid Acquisition | clinic owner; healthcare executive | healthcare | Consideration | multi-site marketing ecosystem; web; ads; analytics | Case study | 45% patient growth over 3 years | `/services/strategy/fractional-cmo` |
| PrimaryCare Indy | work | Search Visibility & GEO | Analytics, Attribution & Reporting; Web Design & Development | clinic owner; practice manager | healthcare; local service | Decision | local SEO; site rebuild; analytics; patient acquisition systems | Case study | 300% traffic growth; 75% more bookings; 210% ROI | `/services/growth/technical-seo` |
| UrgentCare Indy | work | Search Visibility & GEO | Website & Conversion Systems; Paid Acquisition | urgent care operator; practice manager | healthcare; local service | Decision | local SEO; online check-in UX; paid demand; web | Case study | top-3 local rankings; +35% bookings | `/services/growth/technical-seo` |
| Riley Bennett Egloff | work | Growth Strategy & Audits | Website & Conversion Systems; Brand Strategy | law firm leadership; managing partner | legal; B2B | Consideration | website; PR; BD support; digital transformation | Case study | 7+ year embedded engagement; long-cycle trust proof | `/services/strategy/fractional-cmo` |
| Tuohy Bailey & Moore | work | Website & Conversion Systems | Growth Strategy & Audits; Conversion Rate Optimization | law firm partner; practice administrator | legal | Decision | brand + website rebuild | Case study | 60% more contact submissions; 45% lower bounce | `/services/brand-web/web-design-development` |
| 317 BBQ | work | Website & Conversion Systems | Conversion Rate Optimization; Visual Identity | restaurant owner; hospitality founder | hospitality; local service | Decision | website redesign; photography; ordering path optimization | Case study | 40% conversion lift; 2x catering inquiries | `/services/brand-web/conversion-rate-optimization` |
| Hoosier Boy Barbershop | work | Website & Conversion Systems | Search Visibility & GEO; Visual Identity | shop owner; local service founder | local service; hospitality | Decision | booking UX; brand system; local SEO | Case study | 90% more bookings; #1 local rankings | `/services/brand-web/web-design-development` |
| Russell Painting | work | Search Visibility & GEO | Website & Conversion Systems; Brand Strategy | home service owner | local service | Decision | SEO; trust architecture; service website | Case study | strong local keyword visibility; lead engine rebuilt | `/services/growth/technical-seo` |
| Behr Pet Essentials | work | Website & Conversion Systems | CRM, Automation & RevOps; Analytics, Attribution & Reporting | e-commerce owner; product marketer | e-commerce | Decision | content-first commerce system; conversion and support optimization | Case study | +28% cart value; -40% support tickets; 3x conversion | `/services/brand-web/conversion-rate-optimization` |
| Circle City Kicks | work | Website & Conversion Systems | Growth Strategy & Audits; Visual Identity | founder; lifestyle brand owner | e-commerce; retail | Awareness | brand identity system; merch-ready visual system | Brand proof | differentiated local retail brand | `/services/brand-web/visual-identity` |
| Black Letter | work | Growth Strategy & Audits | Website & Conversion Systems; Positioning Workshop | advisory founder; legal consultant | legal | Consideration | identity and positioning system | Brand proof | premium authority positioning from day one | `/services/strategy/positioning-workshop` |
| Clean Aesthetic | work | Website & Conversion Systems | Growth Strategy & Audits; Visual Identity | med spa founder; healthcare entrepreneur | healthcare | Consideration | launch brand system; concierge positioning | Brand proof | launched with premium pricing confidence | `/services/brand-web/visual-identity` |
| Perpetual Movement Fitness | work | Website & Conversion Systems | Growth Strategy & Audits; Visual Identity | coach; wellness founder | fitness; local service | Awareness | identity system; coaching brand design | Brand proof | clear coaching-first positioning | `/services/brand-web/visual-identity` |
| Primary Colours | work | Growth Strategy & Audits | Website & Conversion Systems; Event Marketing Systems | nonprofit director; event organizer | nonprofit | Consideration | sponsorship strategy; campaign architecture; event marketing | Case study | $46k+ raised; 10,000+ audience reached | `/services/strategy/fractional-cmo` |

---

## Lab Projects

| Project name | Type | Primary parent service | Secondary services | Target persona | Target industry | Funnel stage | Platform / stack | Proof type | Business outcome | CTA destination |
|---|---|---|---|---|---|---|---|---|---|---|
| CMO Simulator | lab | Growth Strategy & Audits | Fractional CMO; Positioning Workshop | founder; CEO; marketing lead | B2B; SaaS | Awareness | Next.js; gated flow; session logic; Resend | Tool proof | qualifies strategic-fit leads before contact | `/services/strategy/fractional-cmo` |
| Graston Growth Engine | lab | CRM, Automation & RevOps | AI Workflows & Digital Operations; Analytics, Attribution & Reporting | platform owner; operations lead | healthcare; SaaS | Decision | Next.js; Supabase; Maps API; analytics dashboard; AI console | Tool proof | turns a directory into a lead and retention engine | `/services/systems/crm-implementation` |
| PRO DJ Studio | lab | AI Workflows & Digital Operations | Custom Internal Tools | technical founder; product builder | creative tech; SaaS | Awareness | Next.js; TypeScript; Web Audio API; Zustand; PWA | Tool proof | demonstrates complex browser-product engineering | `/services/systems` |
| Strum AI | lab | AI Workflows & Digital Operations | Growth Strategy & Audits; Product-Led UX | SaaS founder; product builder | creative tech; SaaS | Awareness | React; Vite; AI transcription; PWA | Tool proof | proves full-stack AI product design and retention thinking | `/services/systems/agentic-marketing-systems` |
| Barbershop Command Center | lab | Website & Conversion Systems | CRM, Automation & RevOps; Custom Internal Tools | local service owner; shop operator | local service; hospitality | Consideration | Next.js; Supabase; booking engine; admin dashboard | Tool proof | unified booking and operations layer for a service business | `/services/brand-web/web-design-development` |
| Clinical Compass | lab | AI Workflows & Digital Operations | CRM, Automation & RevOps; Knowledge systems | clinical support lead; education ops lead | healthcare | Decision | vanilla HTML/CSS/JS; JSON decision tree | Tool proof | eliminates repetitive protocol-support workflow | `/services/systems` |
| Smart Sales & Pricing Tool | lab | CRM, Automation & RevOps | AI Workflows & Digital Operations; Lead Intake & Speed-to-Lead | sales leader; revenue ops lead | healthcare; SaaS | Decision | vanilla HTML/CSS/JS; pricing engine | Tool proof | faster quoting; +38% lead-to-demo conversion | `/services/systems/crm-implementation` |
| Investment ROI Planner | lab | Growth Strategy & Audits | Website & Conversion Systems; Conversion Rate Optimization | buyer evaluating ROI; sales enablement lead | healthcare; SaaS | Decision | vanilla HTML/CSS/JS; financial calculator | Tool proof | pre-qualifies leads before the sales call | `/services/martech-audit` |
| License Requirements Navigator | lab | AI Workflows & Digital Operations | CRM, Automation & RevOps; Search Visibility & GEO | clinical education lead; compliance-heavy operator | healthcare | Consideration | vanilla HTML/CSS/JS; JSON data layer | Tool proof | reduces support burden to near zero for a regulated workflow | `/services/systems` |

---

## Proposed Mappings For Currently Untagged Work

These projects do not yet have full taxonomy fields in code, but should be treated as mapped immediately in Claude-facing logic:

- `Tuohy Bailey & Moore`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/web-design-development`

- `Russell Painting`:
  - primary parent service: `Search Visibility & GEO`
  - CTA destination: `/services/growth/technical-seo`

- `Behr Pet Essentials`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/conversion-rate-optimization`

- `Circle City Kicks`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/visual-identity`

- `Black Letter`:
  - primary parent service: `Growth Strategy & Audits`
  - CTA destination: `/services/strategy/positioning-workshop`

- `Clean Aesthetic`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/visual-identity`

- `Perpetual Movement Fitness`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/visual-identity`

- `Primary Colours`:
  - primary parent service: `Growth Strategy & Audits`
  - CTA destination: `/services/strategy/fractional-cmo`

- `Barbershop Command Center`:
  - primary parent service: `Website & Conversion Systems`
  - CTA destination: `/services/brand-web/web-design-development`

- `Clinical Compass`:
  - primary parent service: `AI Workflows & Digital Operations`
  - CTA destination: `/services/systems`

- `Smart Sales & Pricing Tool`:
  - primary parent service: `CRM, Automation & RevOps`
  - CTA destination: `/services/systems/crm-implementation`

- `Investment ROI Planner`:
  - primary parent service: `Growth Strategy & Audits`
  - CTA destination: `/services/martech-audit`

- `License Requirements Navigator`:
  - primary parent service: `AI Workflows & Digital Operations`
  - CTA destination: `/services/systems`

---

## Internal Routing Rules From This Taxonomy

- Every `/work/[slug]` page should display:
  - primary parent service
  - 2 to 3 secondary services
  - a CTA to the `CTA destination`

- Every `/lab/[slug]` page should display:
  - primary parent service
  - proof type = `Tool proof`
  - one CTA to the matching service page

- `/work` hub should support filtering by:
  - parent service
  - industry
  - funnel stage
  - proof type

- `/lab` hub should support filtering by:
  - parent service
  - industry
  - stack type
  - funnel stage

- If a project maps to a planned child service that does not exist yet, link to the current live parent service page until the child page ships.
