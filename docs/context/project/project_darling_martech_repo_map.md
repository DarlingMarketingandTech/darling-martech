# Project Darling MarTech Repo Map

This file gives technical context for the live Darling MarTech site so Claude can work inside the repo without guessing.

Use this as the implementation reference for route structure, content sources, naming patterns, and deployment assumptions.

## 1. Repo Purpose

This repository is the live marketing site for Darling MarTech.

It is a Next.js App Router build that combines:

- marketing pages
- case studies
- lab/tool showcase pages
- contact capture
- service architecture and related proof

This repo is not just a design shell. It contains the actual content model for services, work, labs, testimonials, SEO pages, and contact flow.

## 2. Core Stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React 19
- Animation: Framer Motion, GSAP, Lenis
- 3D / visual layers: React Three Fiber, Drei, Spline-adjacent patterns
- Forms: React Hook Form + Zod
- Media: Cloudinary via `next-cloudinary`
- Email: Resend
- Hosting / previews: Vercel
- Source control: GitHub

## 3. Top-Level Repo Structure

Primary folders:

- `app/` -> all routes, route metadata, and API endpoints
- `components/` -> reusable UI sections, interactive modules, shared shells
- `data/` -> content source of truth for services, labs, testimonials, and work indexes
- `hooks/` -> UI and motion hooks
- `lib/` -> supporting types, utilities, analytics, motion, and work helpers
- `public/` -> static assets
- `styles/` -> shared CSS modules and cross-section styling support

Important root docs:

- `project_darling_martech_site_map.md`
- `project_darling_martech_service_architecture.md`
- `project_darling_martech_work_taxonomy.md`
- `project_darling_martech_case_studies.md`
- `project_darling_martech_offers_and_packaging.md`
- `project_darling_martech_voice_and_messaging.md`
- `project_darling_martech_page_briefs.md`

## 4. Route Structure

Live top-level routes in `app/`:

- `/` -> `app/page.tsx`
- `/about` -> `app/about/page.tsx`
- `/contact` -> `app/contact/page.tsx`
- `/services` -> `app/services/page.tsx`
- `/services/[slug]` -> `app/services/[slug]/page.tsx`
- `/work` -> `app/work/page.tsx`
- `/work/[slug]` -> `app/work/[slug]/page.tsx`
- `/lab` -> `app/lab/page.tsx`
- `/lab/[slug]` -> `app/lab/[slug]/page.tsx`
- `/lab/cmo-simulator` -> dedicated route under `app/lab/cmo-simulator/page.tsx`
- `/studio` -> `app/studio/page.tsx`

Metadata / crawler routes:

- `/sitemap.xml` -> `app/sitemap.ts`
- `/robots.txt` -> `app/robots.ts`

API routes:

- `/api/contact` -> `app/api/contact/route.ts`
- `/api/cmo-simulator-access` -> `app/api/cmo-simulator-access/route.ts`
- `/api/studio/images` -> `app/api/studio/images/route.ts`

Planned but not currently implemented as live routes:

- `/process`
- `/pricing`
- `/industries/[slug]`
- `/solutions/[slug]`
- child-service SEO routes beyond the current `/services/[slug]` structure

## 5. Route Responsibilities

- Home: broad positioning and trust-building
- Services Hub: entry point to parent services and productized audit offer
- Service Detail Routes: current parent-service pages plus standalone `martech-audit`
- Work Hub and Work Detail: proof architecture and case-study depth
- Lab Hub and Lab Detail: strategic / technical proof tools
- About: credibility and company framing
- Contact: conversion and lead capture
- Studio: media / image exploration

## 6. Content Source Locations

Primary content files:

- `data/services.ts` -> service overviews, parent service pages, standalone service pages, engagement models, contact options
- `data/taxonomy.ts` -> shared service, industry, and outcome tags
- `data/labs.ts` -> lab detail records and taxonomy tags
- `data/testimonials.ts` -> homepage and page-level testimonials
- `data/work/work-index.ts` -> work card/index layer for hubs and filtering
- `data/work/work-data.ts` -> long-form case study detail content

Supporting types and helpers:

- `lib/work.ts` -> work types and helper logic
- `lib/case-studies.ts` -> supporting case-study narrative structures
- `lib/motion.ts` -> shared animation variants
- `lib/analytics.ts` -> analytics utilities
- `lib/cloudinary.ts` -> Cloudinary URL helpers

## 7. Service Data Model

Current service architecture lives in `data/services.ts`.

Important exports:

- `serviceOverview`
- `serviceDetails`
- `standaloneServicePages`
- `allServicePages`
- `specializedServices`
- `engagementModels`
- `contactServiceOptions`
- `getServicePageBySlug()`
- `generateServiceStaticParams()`

Current route behavior:

- `/services/[slug]` serves both parent service pages and standalone service pages from `allServicePages`
- current standalone service in production pathing: `martech-audit`

## 8. Work Data Model

The work system is split into two layers:

- `data/work/work-index.ts` -> index cards, filters, categories, theme metadata, related slugs, taxonomy tags
- `data/work/work-data.ts` -> full case-study narratives, process phases, outcomes, deliverables, media

General rule:

- use `work-index.ts` for grids, filters, service-to-proof linking, and lightweight route summaries
- use `work-data.ts` for detail pages and long-form proof content

If a project needs to appear on a service page as proof, it should usually be tagged in `work-index.ts` first.

## 9. Lab Data Model

Lab detail content lives in `data/labs.ts`.

Each lab record can contain:

- slug
- name
- category
- year
- tagline
- metrics
- problem / build / impact narratives
- screenshots
- optional taxonomy tags
- CTA line
- tool source URL or route

General rule:

- labs are capability proof and should not be presented as fake client proof
- labs should connect to services through shared taxonomy tags

## 10. Component Structure

High-value component zones:

- `components/sections/` -> page sections such as hero, services, testimonials, work detail, contact CTA
- `components/sections/WorkDetail/` -> detailed case study rendering
- `components/sections/ServiceDetail/` -> service detail page rendering
- `components/3d/` -> visual ambient and scene components
- `components/interactive/` -> buttons and higher-interaction UI modules
- `components/ui/` -> lower-level primitives where present

General pattern:

- route files in `app/` stay fairly thin
- rendering logic often lives in `components/sections/...`
- content is usually driven from `data/...`
- styling is mostly CSS Modules colocated with route or section components

## 11. Naming Conventions

Routes and slugs:

- use lowercase kebab-case for route segments and slugs
- work slugs live in both index/detail layers and should stay aligned
- service slugs should map directly to entries in `allServicePages`
- lab slugs should map directly to keys in `LAB_DETAIL_DATA`

Type and data naming:

- exported arrays and records use explicit plural names
- route-specific data often uses `Detail`, `Overview`, `Index`, or `Page` suffixes
- shared taxonomy IDs use compact kebab-case constants from `data/taxonomy.ts`

Component naming:

- React components use PascalCase
- CSS Modules generally match component or route names
- section components often use descriptive page-role names like `WorkDetailContent` or `ServicesExperience`

## 12. SEO and Metadata Notes

Key metadata files:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

Current domain strategy:

- the repo intentionally keeps `https://darlingmartech.com` as the hardcoded future canonical base
- this is deliberate until the real domain is attached and launched
- do not replace with random Vercel preview URLs for canonical tags or sitemap generation

Current sitemap behavior:

- includes home, about, services, service detail routes, work detail routes, lab routes, studio, and contact

## 13. Deployment Notes

GitHub relationship:

- GitHub repo is the source of truth
- remote: `https://github.com/DarlingMarketingandTech/darling-martech.git`

Vercel relationship:

- Vercel is used for preview and live deployment
- current preview-style domain in use: `https://darling-martech.vercel.app`
- future production domain target: `https://darlingmartech.com`

Build commands:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run start`

Important note from `next.config.js`:

- if build fails with `generate is not a function`, check whether `__NEXT_PRIVATE_STANDALONE_CONFIG` is leaking in from another Next.js project

## 14. Media and External Service Dependencies

Cloudinary:

- remote images are served from `res.cloudinary.com`
- Cloudinary env vars are used in image helper and studio API code

Resend:

- contact flow and simulator gate rely on Resend env configuration

Analytics:

- `NEXT_PUBLIC_GA_ID` is used for Google Analytics wiring

## 15. Data Hygiene Rules

- Prefer `data/` as the source of truth for content-backed routes.
- Keep taxonomy references typed through `data/taxonomy.ts`.
- If a work item is being used as proof on a service page, make sure the corresponding `serviceIds`, `industryIds`, and `outcomeIds` are present in `data/work/work-index.ts`.
- If a lab is meant to support a service narrative, tag it in `data/labs.ts` rather than hardcoding relationships in components.
- Avoid creating duplicate narrative truth in both route files and data files unless the route genuinely needs custom presentation logic.

## 16. Files Claude Should Read First By Task

If working on services:

- `data/services.ts`
- `data/taxonomy.ts`
- `app/services/page.tsx`
- `app/services/[slug]/page.tsx`
- `components/sections/ServiceDetail/ServiceDetailPage.tsx`

If working on work / case studies:

- `data/work/work-index.ts`
- `data/work/work-data.ts`
- `lib/work.ts`
- `app/work/page.tsx`
- `app/work/[slug]/page.tsx`

If working on labs:

- `data/labs.ts`
- `app/lab/page.tsx`
- `app/lab/[slug]/page.tsx`

If working on global SEO:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

If working on lead capture:

- `app/contact/page.tsx`
- `app/api/contact/route.ts`
- `components/sections/ContactCTA.tsx`
- `components/sections/ContactForm.tsx`

## 17. Known Architecture Boundaries

- The parent-service route architecture is currently the live system; broader SEO child-service expansion is planned but not yet the canonical routing model.
- `martech-audit` is the first standalone commercial service page inside the current services system.
- `/process`, `/solutions`, `/industries`, and deeper commercial page layers are strategy-approved but still future implementation work.
- Labs should support service sales, but they should not create false promises about live external tools if those tools are not actually deployed.

## 18. Practical Rule For Claude

When making changes:

- respect the current live route architecture first
- read the data file before changing the component
- prefer adding or normalizing source-of-truth content in `data/` instead of hardcoding page copy in route files
- keep future domain canonicals in place until launch
- do not invent routes, offers, or proof assets that are not supported by the strategy docs or repo content
