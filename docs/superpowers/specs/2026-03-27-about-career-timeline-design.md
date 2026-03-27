# About Page — Career Timeline Redesign
**Date:** 2026-03-27
**Status:** Approved

---

## Goal

Replace the existing flat career list on the About page with an immersive, scroll-animated career timeline featuring:
- A dedicated founder block for Darling MarTech (Jan 2026 – Present)
- A vertical timeline with GSAP-driven spine draw animation and Framer Motion depth effects
- Per-card accordion expand/collapse showing grouped detailed bullet points

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| 3D technique | Framer Motion + GSAP parallax (CSS perspective) | Best perf/immersion balance, no Three.js overhead |
| Accordion trigger | Full card row click + rotating chevron | Matches existing card hover pattern, minimal chrome |
| Darling MarTech placement | Dedicated founder block above timeline | Not just another job — editorial weight it deserves |
| Expanded detail format | Grouped by category with small accent headers | Scannable, reinforces systems-thinker positioning |

---

## Component Architecture

### New folder: `components/sections/CareerTimeline/`

```
CareerTimeline/
  CareerTimeline.tsx       — parent, owns openIndex state, GSAP spine init
  FounderBlock.tsx         — editorial founder panel, Framer Motion only
  TimelineCard.tsx         — single job card with accordion
  CareerTimeline.module.css
```

### Modified files
- `app/about/page.tsx` — remove inline `career` array + career section, import `<CareerTimeline />`
- `app/about/About.module.css` — remove career-related rules (move to CareerTimeline.module.css)

---

## Data Shape

```ts
type JobDetail = { category: string; bullets: string[] }

type Job = {
  title: string
  company: string
  location: string
  period: string
  year: string        // e.g. "2023" — displayed on timeline spine
  summary: string     // one-line collapsed description
  details: JobDetail[] // grouped expanded bullets
}
```

Career data lives as a typed const in `CareerTimeline.tsx`. Founder block copy lives as a const in `FounderBlock.tsx`.

---

## Career Data (full)

### Darling MarTech (Founder Block — not in timeline array)
- **Title:** Founder
- **Period:** Jan 2026 – Present
- **Why:** Started because small businesses deserve senior-level marketing strategy and technical execution that used to be reserved for brands with agency retainers.
- **Who:** Small businesses and startups that need both the strategy and the system that executes it.
- **Problems solved:** No hand-offs. No account managers. Direct, accountable work — strategy, automation, web development, and analytics in one person.

### Timeline Jobs (in order, newest first)

**1. Marketing Director — Graston Technique LLC**
- Location: Indianapolis, IN
- Period: Aug 2023 – Dec 2025
- Year: 2023
- Summary: Built full MarTech ecosystem for a high-volume clinician education platform serving thousands of providers.
- Details:
  - **System Architecture:** LearnDash LMS, WooCommerce, WP Fusion, Gravity Forms, Uncanny Automator, FluentCRM. Architected 'Buy Now, Choose Later' credit system for training bundles.
  - **AI & Automation:** GPT-powered assistant via REST APIs for CEU rules, order lookups, training suggestions. 400+ automations triggered by tags, training progress, or form submissions.
  - **Analytics & Dashboards:** Provider analytics dashboards syncing GA4 via GTM and Analytify. Page views, link clicks, social metrics, UTM sources with admin override and export.
  - **Performance & DevOps:** WP Rocket, LiteSpeed, Cloudflare CDN, async/defer scripts, GTM server-side tagging. REST-based dashboards with Cloudflare Workers + Mapbox.
  - **Cloudflare:** Rate-limiting, WAF rules, Bot Fight Mode, Tiered Cache, Managed Transforms, Page Rules, SSL/TLS Origin Cert, DNSSEC.
  - **Server:** Brotli + gzip compression, browser caching, security headers, LiteSpeed CDN, WP Rocket page cache, PHP-FPM optimization, PHP 8.3 upgrade.
  - **Monitoring & Recovery:** Netdata monitoring and alerts, critical error recovery, server resource review, PHP handler update.
  - **Code & Database:** Search & replace cleanup, autoloaded options cleanup, JS/asset optimization, font and DNS preload fixes, Apache tuning.
  - **Team Leadership:** Cross-functional sprints with developers, designers, instructors, marketing associates. Translates business goals into dev-ready specs.
  - **Tracking & Conversion:** Form submission tracking (Gravity Forms / GTM / Google Ads), engagement tracking, conversion optimization, PixelYourSite Pro.
  - **Instructor Tools:** Dynamic event map integration, Google Maps API, instructor dashboard with event filtering and instrument visibility.
  - **Platform Development:** LearnDash Multisite planning and architecture.

**2. Interim Director of Marketing — Ultimate Technologies Group**
- Location: Fishers, IN
- Period: Mar – Jul 2023
- Year: 2023
- Summary: Led marketing strategy and execution during a key transitional period, ensuring business continuity across all channels.
- Details:
  - **Marketing Operations:** End-to-end marketing communications including internal messaging, external campaigns, and stakeholder engagement.
  - **Paid Media:** Google Ads campaigns — improved lead generation, CTR, and overall ROI.
  - **Content:** Website, email marketing, social media, and sales collateral for business development.
  - **Cross-Functional:** Coordinated with sales, customer success, and executive leadership to align marketing with organizational goals.
  - **Automation & CRM:** Marketing automation workflows and CRM integrations to streamline operations and enhance campaign performance tracking.
  - **Research:** Market research and competitive analysis to refine targeting and positioning.
  - **SEO & Paid:** Managed and optimized paid media and SEO, driving qualified traffic and online visibility.
  - **Branding:** Brand updates and visual/messaging alignment across all customer touchpoints.
  - **Leadership:** Mentored marketing team through organizational change.

**3. Marketing Manager — Riley Bennett Egloff LLP**
- Location: Indianapolis, IN
- Period: Jul 2022 – Mar 2023
- Year: 2022
- Summary: Led strategic marketing, digital communications, and client development for a leading Indianapolis law firm.
- Details:
  - **Content & Collateral:** Brochures, advertisements, email campaigns, newsletters, social media content, RBE magazines.
  - **Website & SEO:** Full ownership of the RBE website — performance, SEO, and user experience improvements.
  - **PR & Media:** Cultivated media relationships, drafted press releases, secured firm publicity in legal news and thought leadership.
  - **Email & Social:** Direct email marketing and social media campaigns with tracked performance metrics.
  - **Business Development:** Partnered with attorneys to develop individualized BD plans, identifying new client engagement opportunities.
  - **Proposals:** Strategic pitch materials and RFP/proposal responses showcasing firm capabilities.
  - **Awards & Recognition:** Industry submissions and award nominations increasing firm visibility.
  - **Intelligence:** Market intelligence insights to guide future strategy and BD planning.
  - **Relationships:** Trusted partnerships with practice group leaders to support cross-selling and firm-wide growth.

**4. Marketing Administrator — Riley Bennett Egloff LLP**
- Location: Greater Indianapolis
- Period: Jun 2015 – Nov 2022
- Year: 2015
- Summary: Managed content marketing, website, social media, graphic design, and firm-to-client communications.
- Details:
  - **Content Marketing:** Managed all content initiatives across web, email, and print.
  - **Business Development:** Developed and managed BD plans for individual attorneys.
  - **RFP Responses:** Assisted in responding to the firm's RFP responses.
  - **Strategic Planning:** Worked with the Marketing Committee to execute the firm's strategic marketing plan.

**5. Marketing Coordinator — Deerfield Financial Advisors**
- Location: Indianapolis, IN
- Period: Jun 2013 – Jun 2015
- Year: 2013
- Summary: Executed marketing initiatives to elevate brand awareness and attract new clients for a financial advisory firm.
- Details:
  - **Events:** Planned and managed client-facing seminars and events, enhancing retention and brand credibility.
  - **Content:** Website content, email marketing, and printed collateral with consistent brand messaging.
  - **Technology:** Researched and implemented new technology platforms improving client services and operational efficiency.
  - **Compliance:** Collaborated with Chief Compliance Officer to review all marketing materials for FINRA and SEC compliance.

**6. Marketing Coordinator — Pike Medical Consultants**
- Location: Greater Indianapolis
- Period: Sep 2009 – Jun 2013
- Year: 2009
- Summary: Directed all marketing for the organization — strategy, budgeting, advertising, branding, PR, website, and events. Reported directly to the company president.
- Details:
  - **Growth:** Drove a 45% increase in patient visits over three years with consistently positive ROI.
  - **Campaigns:** Designed and executed integrated marketing and advertising campaigns contributing to sustained company growth.
  - **Website:** Led creation of new company website, modernizing digital presence and improving patient engagement.
  - **Communications:** Developed internal and external communication strategies to strengthen brand positioning.
  - **PR:** Oversaw public relations efforts to increase awareness and credibility in the healthcare community.
  - **Analytics:** Implemented data-driven tracking and evaluation to measure campaign effectiveness and inform future strategy.

**7. Marketing Intern — OrthoIndy**
- Location: Indianapolis, IN
- Period: 2006 – 2007
- Year: 2007
- Summary: Gained foundational experience in healthcare marketing — content development and event coordination.
- Details:
  - **Content & Events:** Assisted with content development and event coordination in a professional healthcare marketing environment.

---

## Visual Design

### Founder Block
- Full-width card, surface background (`var(--color-surface)`), `border-radius: 16px`, `border: 1px solid var(--color-border)`
- Orange left accent border: `4px solid var(--color-accent)` on left edge
- Two-column grid on desktop: left = ghosted year + labels, right = editorial copy
- Left: `"2026"` in Cabinet Grotesk 900, `clamp(4rem, 8vw, 7rem)`, `var(--color-text)` at `opacity: 0.12`; `"Present"` in small accent caps beneath; `"Founder"` label
- Right: three short prose blocks (why, who, what) — no bullets
- Animation: `whileInView`, `springCinematic`, `y: 30 → 0` + `opacity: 0 → 1`

### Timeline Spine
- Container: `position: relative`, left-side spine line
- Spine: `2px` vertical line, `var(--color-border-accent)`, drawn via GSAP `scaleY: 0 → 1` ScrollTrigger, `transformOrigin: top`
- Year markers: left of spine, tabular numerals, `var(--color-muted)` at 60% opacity, `font-size: 0.75rem`
- Dot connectors: `10px` circles, `var(--color-accent)` fill, `scale: 1 → 1.4` on card hover via Framer Motion

### Timeline Cards
- Sit to the right of the spine with a horizontal connector line to the dot
- Same card pattern: `var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: 16px`
- `border-color` → `var(--color-border-accent)` on hover (CSS transition)
- Entrance animation per card: `opacity: 0 → 1`, `y: 40 → 0`, `rotateX: 8deg → 0deg`, `scale: 0.97 → 1`
- Parent timeline gets `perspective: 1200px`
- Stagger: 80ms between cards

### Accordion
- Collapsed: title, company, location, period, summary + `CaretDown` chevron (right-aligned)
- Chevron: `rotate: 0 → 180deg` on open, Framer Motion `animate`
- Expand: `AnimatePresence` + `motion.div`, `height: 0 → auto`, `opacity: 0 → 1`, `springStandard`
- One card open at a time (`openIndex: string | null`)
- Expanded: category groups with accent-colored caps label + bullet list beneath

---

## Constraints
- `"use client"` on `CareerTimeline.tsx` (GSAP + Framer Motion)
- GSAP `ScrollTrigger` registered once in a `useEffect` with proper cleanup
- No Three.js
- All colors via CSS custom properties — no Tailwind color classes
- Icons: `@phosphor-icons/react` (`CaretDown`), `weight="light"`
- Mobile: spine line hidden below 768px, cards full-width single column, year shown inline in card header
