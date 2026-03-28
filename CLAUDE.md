# Darling MarTech — Project Brief for Claude Code

## About This File
This is the master project brief for the Darling MarTech website build.
Read this file in full before doing any work. Every decision about design,
copy, architecture, and tone should reference this document.

> **Skill files:** Extended design, redesign-audit, and copy instructions
> live in `skills/` (co-located in this repo) AND in the Claude OS:
> `C:\Users\hoosi\ClaudeOS\taste-skill-main\`
> - `skills/darling-martech-ui/SKILL.md` — Design system, component library, motion
> - `skills/darling-martech-redesign/SKILL.md` — Audit protocol for upgrading AI-looking code
> - `skills/darling-martech-copy/SKILL.md` — Voice, CTAs, error messages, microcopy

---

## Project Overview
Official website for **Darling MarTech** — the consulting brand of Jacob
Darling (Marketing and Technology LLC). The site targets small businesses
and startups, builds confidence in Jacob as a senior-level expert, and
converts visitors into clients.

- **Brand:** Darling MarTech
- **Owner:** Jacob Darling
- **Entity:** Marketing and Technology LLC
- **Domain:** darlingmartech.com
- **Email:** jacob@jacobdarling.com
- **Portfolio reference:** bearcavemarketing.com
- **Vercel preview:** darling-martech.vercel.app

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16+ App Router | RSC default. `"use client"` only for interactive/animated/3D components |
| Styling | **CSS Modules + CSS custom properties only** | Zero Tailwind colors/typography. Tailwind removed entirely for visual styling |
| 2D Animation | **Framer Motion 11** | All UI motion. Spring physics only — presets in `lib/motion.ts` |
| 3D / WebGL | **@react-three/fiber v9 + @react-three/drei v10 + Three.js 0.183** | Hero background, floating geometry, GPU-accelerated 3D |
| Scroll animation | **GSAP 3.14** | Timeline-based scroll sequences via `hooks/useScrollAnimation.ts` |
| Smooth scroll | **Lenis 1.3** | Inertia scrolling, wraps full app in `LenisProvider` |
| Interactivity | Custom hooks + motion components | Magnetic buttons, cursor spotlight, 3D card tilt |
| Components | shadcn/ui (customized) | Always adapted to brand — never default shadcn appearance |
| Icons | **@phosphor-icons/react** | `weight="light"` or `"regular"`. No Lucide. No Feather. No Heroicons. |
| Fonts | next/font localFont — Cabinet Grotesk, Inter | Instrument Serif via next/font Google |
| Contact form | React Hook Form + Zod + Resend API | |
| Images | next/image (always — never `<img>`) | unoptimized: true (Cloudflare Pages) |
| Hosting | Cloudflare Pages (GitHub auto-deploy) | |
| Media | Cloudinary Next.js SDK | Cloud: `djhqowk67` |
| Physics | @dimforge/rapier3d-compat | Available in node_modules |
| Geolocation | @mediapipe/tasks-vision | Available in node_modules |
| Analytics | Custom via `components/providers/Analytics.tsx` | |
| Cookie consent | `components/ui/CookieConsent.tsx` | |
| SEO | `app/robots.ts` + `app/sitemap.ts` + `components/JsonLd.tsx` | |

### Styling rule — CSS Modules ONLY for visual properties
Tailwind is **removed** from all visual styling. Every color, typography,
surface, animation, and visual property uses CSS Modules + CSS custom properties.

```
✅ Allowed (layout only):  grid  flex  col-span-2  container  mx-auto
❌ Never use:              bg-*  text-*  border-*  shadow-*  rounded-*
                           font-*  tracking-*  transition-*  animate-*
```

> **Gotcha:** `tailwind.config.ts` remains for shadcn token infrastructure. Rule:
> no Tailwind for visual styling (colors, typography, shadows). Layout utilities
> and shadcn plumbing are still Tailwind-backed.

### 3D components rule

All Three.js/R3F components MUST:

- Be lazy-loaded with `dynamic(..., { ssr: false })` — Three.js is browser-only
- Use `React.memo` or minimal re-render patterns
- Accept mouse position via `ref` (not state) to avoid React re-renders
- Target 60fps — never run heavy geometry inside `useFrame` without memoization

### Motion hierarchy

1. **Framer Motion** — React component animations, hover, entrance, spring physics
2. **GSAP ScrollTrigger** — scroll-sequenced timelines via `useScrollAnimation` hook
3. **Three.js `useFrame`** — per-frame 3D transforms (rotation, drift, camera rig)
4. **CSS** — only `transition: border-color` for hover state color changes

---

## Brand Identity

### CSS Custom Properties (copy these into globals.css)
```css
:root {
  --color-base:           #0A0A0A;  /* Primary background */
  --color-surface:        #141414;  /* Elevated cards, drawers */
  --color-surface-raised: #1A1A1A;  /* Modals, tooltips */
  --color-accent:         #FF4D00;  /* Electric Orange — use sparingly */
  --color-text:           #F5F0E8;  /* Warm Off-White — primary text */
  --color-muted:          #888888;  /* Secondary/body text */
  --color-border:         rgba(245, 240, 232, 0.08);  /* Hairline borders */
  --color-border-accent:  rgba(255, 77, 0, 0.3);      /* Hover accent borders */

  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-accent:  'Instrument Serif', serif;

  /* Spring physics presets for Framer Motion */
  --spring-standard:  /* stiffness: 120, damping: 20 */
  --spring-entrance:  /* stiffness: 80,  damping: 18 */
  --spring-cinematic: /* stiffness: 55,  damping: 16 */
}
```

### Color System
| Name | Hex | Role |
|---|---|---|
| Obsidian | #0A0A0A | Primary background — true near-black |
| Electric Orange | #FF4D00 | Brand accent — used sparingly (1–2× per section max) |
| Warm Off-White | #F5F0E8 | Text on dark, light backgrounds |
| Mid Gray | #888888 | Supporting/secondary text |
| Surface | #141414 | Cards, elevated sections |

### Typography
- **Display/Headlines:** Cabinet Grotesk — weight 700–900, tracking
  -0.02em to -0.04em, tight line-height ~0.95–1.1
- **Body:** Inter — weight 400, line-height 1.6–1.7, color #888888 on dark bg,
  `max-width: 65ch`
- **Accent:** Instrument Serif — italic only, emotional moments only
  (never in nav, UI, or data contexts)
- **Data/numbers:** `font-variant-numeric: tabular-nums`
- **Headings:** `text-wrap: balance` to prevent widows

### Logo
- Wordmark: "Darling" in #F5F0E8 + "MarTech" in #FF4D00 — Cabinet
  Grotesk Bold
- Monogram: "DM" mark for favicon, social avatars, compact use
- SVG files: `/public/images/logo/`

### Brand Photo
- Primary: `jacob-bio-photo-splash.jpg` — artistic watercolor treatment
- Location: `/public/images/`

---

## Framer Motion — Required Patterns

### Spring presets (define these once, import everywhere)
```ts
// lib/motion.ts
export const springStandard  = { type: "spring", stiffness: 120, damping: 20 }
export const springEntrance  = { type: "spring", stiffness: 80,  damping: 18 }
export const springCinematic = { type: "spring", stiffness: 55,  damping: 16 }

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
}

export const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springEntrance }
}
```

### Rules
- All sections use `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Every `motion.*` component that animates must be a `"use client"` component
- No `transition: all 0.3s ease` anywhere in CSS — use Framer Motion instead
- Stagger delay: 60–100ms (tighter feels mechanical)
- Only animate `transform` and `opacity` — never layout properties
- Hover: `whileHover={{ scale: 1.02 }}` on cards; `whileTap={{ scale: 0.98 }}` on buttons

---

## 21st.dev Component Library

These are pre-vetted drop-in components from 21st.dev. Install via shadcn CLI.
**All require brand adaptation** — see adaptation rules below.

| Component | Purpose | Install URL |
|---|---|---|
| AnimatedNavFramer (reapollo) | Floating pill nav, collapses on scroll | `https://21st.dev/community/components/reapollo/navigation-menu/default` |
| Hero ASCII (reapollo) | Left-aligned dark hero + geometric illustration right | `https://21st.dev/community/components/reapollo/hero-ascii/default` |
| Background Paths (kokonutd) | Animated wire path background at 15–20% opacity | `https://21st.dev/community/components/kokonutd/background-paths/default` |
| Grid Card (efferd) | Dark surface + animated grid pattern + gradient hover | `https://21st.dev/community/components/efferd/grid-card/default` |
| Button Colorful (kokonutd) | Directional hover fill from left + arrow icon | `https://21st.dev/community/components/kokonutd/button-colorful/default` |
| Underline Animation (danielpetho) | 3 Framer-powered variants for nav/footer links | `https://21st.dev/community/components/danielpetho/underline-animation/default` |

Install command pattern:
```bash
npx shadcn@latest add "https://21st.dev/r/[component-url]"
```

### Brand adaptation rules (apply to EVERY 21st.dev component after install)
1. **Colors** — Replace all purple/blue/gradient with `var(--color-accent)`,
   `var(--color-base)`, `var(--color-text)`, `var(--color-muted)`
2. **Icons** — Swap `lucide-react` → `@phosphor-icons/react` with `weight="light"`
3. **Fonts** — Replace any font-family with `var(--font-display)` for headings,
   `var(--font-body)` for paragraphs
4. **Tailwind colors** — Move to CSS Modules; keep only layout utilities
5. **Motion** — If component uses CSS transitions, upgrade to Framer Motion
   spring physics using the presets in `lib/motion.ts`

---

## Design Principles

### The standard
The site should look like it was built by a senior human designer who spent
time on it — not generated from a template or AI prompt. Every layout
decision should have a visible reason. No pattern should appear just because
it's the default.

### Layout rules
- Dark background (#0A0A0A) always — never light gray or navy as base
- One accent color (Electric Orange) — intentional and sparingly placed
- Strong typographic scale — huge display text + small refined body text
- **Asymmetric layouts** — break the grid deliberately; never equal columns
  as the primary feature layout
- Hero is always left-aligned (or split-screen) — never centered text
  over a dark background
- Generous whitespace — let content breathe
- `min-height: 100dvh` on full-height sections — never `height: 100vh`
- `max-width: 1400px` container on all pages
- Complex layouts use CSS Grid — not flexbox percentage math
- Below 768px: all asymmetric layouts collapse to single column, no
  horizontal scroll

### Motion rules
- Scroll-triggered via `whileInView` — purposeful, not decorative
- Subtle hover micro-interactions on all interactive elements
- No instant state changes — all transitions spring-interpolated
- No animations on layout properties (width, height, top, left)

### Strictly avoid
- Purple-to-blue gradients on any element
- Glowing orbs or blob background shapes
- Glassmorphism / frosted blur cards
- Floating particle or confetti animations
- Generic symmetrical 3-column card grids as primary feature layout
- Overly rounded "bubbly" UI (`border-radius` max 16px for cards)
- Centered hero text over dark background
- `text-gradient` CSS on headings
- Generic white card + gray border + drop shadow pattern
- Any aesthetic that reads as AI-generated or template-built

### Card pattern (required)
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}
.card:hover {
  border-color: var(--color-border-accent);
}
```

---

## Brand Voice & Tone
**We are:** Confident and direct. Strategic and outcomes-focused.
Tech-fluent and clear. Personal and approachable.

**We are not:** Corporate or stiff. Salesy or pushy. Vague or full of
buzzwords. Overly trendy. Generic.

Every word should sound like Jacob speaking directly to a potential
client — not like an agency website. "I", not "we". Present tense.
Outcome-first (what did it unlock?) not tool-first.

### Copy anti-patterns (purge on sight)
| Found | Replace with |
|---|---|
| "Elevate your..." | Direct verb: "Build your...", "Grow your..." |
| "Seamless experience" | Describe what actually happens |
| "Unleash the power of" | Delete. State the outcome. |
| "Next-generation" | Specific technology name |
| "Game-changer" | Specific result stat |
| "Our team of experts" | "Me. Directly. No hand-offs." |
| Round numbers (50%, $100) | Real numbers from this brief |
| Exclamation marks | Confident, calm confirmation instead |

---

## Jacob Darling — Professional Profile

### Summary
Marketing strategist and systems architect with 15+ years of experience
building revenue-driving marketing infrastructure. Bridges creative
marketing vision and technical implementation. Works across agency and
brand sides equally.

### Key Stats (use these exact numbers — never round differently)
- 15+ years experience
- 400+ automation workflows built
- 30,000+ users served through platforms and systems
- 40% average conversion lift delivered
- Indiana University — B.S. Business Management, 2008
- Gold Key Photography Award — Scholastic Art & Writing Awards, 2008

### Industries
Healthcare, Legal, Finance, SaaS/Tech, Retail/E-commerce,
Media/Entertainment, Nonprofit, B2B, B2C, Local Service Businesses

### Career History
- **Marketing Director** — Graston Technique LLC (Aug 2023–Dec 2025)
  Built full MarTech ecosystem: LearnDash LMS, WooCommerce, WP Fusion,
  FluentCRM. Deployed GPT-powered AI assistant via REST APIs. Built 400+
  automations. Created GA4 analytics dashboards. Cloudflare CDN & security
  optimization. Managed cross-functional sprints.
- **Interim Director of Marketing** — Ultimate Technologies Group
  (Mar–Jul 2023)
  Led marketing strategy during transition. Google Ads optimization,
  marketing automation, CRM integration, branding updates.
- **Marketing Manager** — Riley Bennett Egloff LLP (Jul 2022–Mar 2023)
  Full marketing ownership for law firm. Website, SEO, PR, email, social,
  business development plans, RFP responses, award nominations.
- **Marketing Administrator** — Riley Bennett Egloff LLP (Jun 2015–Nov 2022)
  Content marketing, website, social media, graphic design, brand
  development, strategic marketing plan execution.
- **Marketing Coordinator** — Deerfield Financial Advisors (Jun 2013–Jun 2015)
  Events, content, tech platforms, FINRA/SEC compliance review.
- **Marketing Coordinator** — Pike Medical Consultants (Sep 2009–Jun 2013)
  Drove 45% increase in patient visits over 3 years. Full marketing
  ownership reporting directly to company president.
- **Marketing Intern** — OrthoIndy (2006–2007)

### Technical Skills
CRM Architecture (HubSpot, FluentCRM, Salesforce), Marketing Automation,
Email Marketing, Revenue Operations, GA4, GTM, Conversion Rate
Optimization, Full-Stack Web Development (WordPress, JavaScript, React,
Next.js), Cloudflare Workers, API Development, System Integration,
Serverless Development, WordPress, Figma, Adobe Creative Suite

---

## Current Site Architecture (Phase 2 — Live)

### Pages live on darling-martech.vercel.app
- `/` — Home (all core sections, 3D hero, stats, services, case studies, testimonials, CTA)
- `/about` — Full about page with career timeline
- `/contact` — Contact form page (React Hook Form + Zod + Resend)
- `/work` — Case studies index (masonry/staggered grid — Live)
- `/work/[slug]` — Individual case study pages (data-driven from `data/work/`)
- `/lab` — Lab tools index (9 detail pages — Live)
- `/lab/[slug]` — Lab detail pages (data-driven from `data/labs.ts`)
- `/lab/cmo-simulator` — Special: gated access via `CmoAccessModal`
- `/services` — Services page with 6 service categories (Live)
- `/services/[slug]` — Individual service detail pages (Live)
- `/studio` — Cloudinary masonry gallery (Live)
- `/studio/[slug]` — Studio gallery items
- `/api/contact` — Contact form API route
- `/api/cmo-simulator-access` — CMO Simulator gate API
- `/api/studio` — Studio Cloudinary API

### Phase 3 — Planned
- `/pricing` — Pricing page (content session needed)
- `/blog` — Thought leadership (MDX-powered)
- `/blog/[slug]` — Individual posts

---

## Data Layer — Source of Truth

**All content lives in `/data/` as typed TypeScript files. Never hardcode content in components.**

### `/data/labs.ts` — 9 lab entries in `LAB_DETAIL_DATA`
| Slug | Name | Category | Live URL |
|---|---|---|---|
| `cmo-simulator` | CMO Simulator | Marketing | (gated — email access) |
| `graston-growth-engine` | Graston Growth Engine | Marketing | graston-growth-engine.vercel.app |
| `pro-dj-studio` | PRO DJ Studio | Technologist | pro-dj-mixer.vercel.app |
| `strum-ai` | Strum AI | Technologist | jacobs-music-plum.vercel.app |
| `barbershop-command-center` | Barbershop Command Center | Developer | hoosier-boy-barbersh.vercel.app |
| `clinical-compass` | Clinical Compass | Developer | `/labs/clinical-compass/` (local HTML) |
| `smart-sales-pricing` | Smart Sales & Pricing Tool | Developer | `/labs/smart-sales-pricing/` (local HTML) |
| `investment-roi-planner` | Investment ROI Planner | Marketing | `/labs/investment-roi-planner/` (local HTML) |
| `license-requirements` | License Requirements Navigator | Developer | `/labs/license-requirements/` (local HTML) |

### `/data/services.ts` — 6 service categories in `serviceDetails`
| ID | Title | Layer |
|---|---|---|
| `strategy` | Fractional Marketing Leadership & Growth Strategy | strategy |
| `brand-web` | Brand Identity, Websites & Conversion Design | build |
| `systems` | CRM Architecture, Automation, Integrations & AI Tools | build |
| `growth` | SEO, Content Systems, Paid Acquisition & Analytics | growth |
| `commerce` | E-Commerce, Checkout Flows & Revenue Operations | build |
| `specialized` | Industry-Specific Systems & Specialty Engagements | build |

Also exports: `serviceOverview` (4 summary cards), `specializedServices` (8 items),
`engagementModels` (3: audit/project/embedded), `contactServiceOptions`, `serviceLayerMeta`

### `/data/work/work-index.ts` — Case study card grid (20 entries)

**Flagship featured (dashboardTier: 'flagship'):**
- `graston-technique` — Automation & Systems (+212% qualified leads, 95% overhead reduction, 48hrs/wk saved)
- `pike-medical-consultants` — Healthcare (45% patient growth, multi-division CMO)
- `317-bbq` — Hospitality (120% time on site, 40% conversion lift, 2x catering)
- `hoosier-boy-barbershop` — Hospitality (90% more bookings, 200% social, #1 local search)

**System tier (dashboardTier: 'system') — child projects:**
- `the-launchpad`, `the-closer`, `the-compass`, `the-fortress` (all under graston-technique)
- `primarycare-indy`, `urgentcare-indy` (under pike-medical-consultants)

**All case study slugs (canonical):**
`graston-technique`, `the-launchpad`, `the-closer`, `the-compass`, `the-fortress`,
`pike-medical-consultants`, `primarycare-indy`, `urgentcare-indy`,
`riley-bennett-egloff`, `tuohy-bailey-moore`,
`317-bbq`, `hoosier-boy-barbershop`, `russell-painting`,
`behr-pet-essentials`, `circle-city-kicks`,
`black-letter`, `clean-aesthetic`, `perpetual-movement-fitness`,
`primary-colours`

### `/data/work/work-data.ts` — Full case study content
Full case study objects with: hero, overview, results, services, timeline, media, etc.

### `/data/testimonials.ts` — Testimonial data
Verbatim quotes. Display order: Jesse Wey → Andrew Bastnagel → Kevin Martin See → Ben Worrell

---

## Case Studies — Content Status

| Slug | Client | Status |
|---|---|---|
| `graston-technique` | Graston Technique® | ✅ Content built |
| `the-launchpad` | The Launchpad | ✅ System sub-project |
| `the-closer` | The Closer | ✅ System sub-project |
| `the-compass` | The Compass | ✅ System sub-project |
| `the-fortress` | The Fortress | ✅ System sub-project |
| `pike-medical-consultants` | Pike Medical Consultants | ✅ Parent page built |
| `primarycare-indy` | PrimaryCare Indy | ✅ Built |
| `urgentcare-indy` | UrgentCare Indy | ✅ Built |
| `riley-bennett-egloff` | Riley Bennett Egloff LLP | Content session needed |
| `tuohy-bailey-moore` | Tuohy Bailey & Moore LLP | ✅ Built |
| `317-bbq` | 317 BBQ | ✅ Built |
| `hoosier-boy-barbershop` | Hoosier Boy Barbershop | ✅ Built |
| `russell-painting` | Russell Painting Co. | ✅ Built |
| `behr-pet-essentials` | Behr Pet Essentials | ✅ Built |
| `circle-city-kicks` | Circle City Kicks | ✅ Built |
| `black-letter` | Black Letter | ✅ Built |
| `clean-aesthetic` | Clean Aesthetic | Content session needed |
| `perpetual-movement-fitness` | Perpetual Movement Fitness | ✅ Built |
| `primary-colours` | Primary Colours | ✅ Built |
| `direct-care-indy` | Direct Care Indy | 🚧 In progress — do not publish |

**Pike Medical note:** Urgent Care Indy, Primary Care Indy, and Direct Care Indy
are all under the Pike Medical Consultants umbrella. Jacob serves as fractional
CMO across all three. Scope: website design/dev, Mailchimp, Google Ads, graphic
design, GA4, Google Search Console, Google My Business.

---

## Lab Tools — Detailed Reference

### Access-gated lab: CMO Simulator
- Route: `/lab/cmo-simulator`
- Access gate: `CmoAccessModal` component — requires name + email via Resend
- Session bypass: `sessionStorage` key for returning visitors
- API: `/api/cmo-simulator-access`
- Deployed: gated locally — no external URL needed

### Local HTML lab tools (in `/public/labs/`)
These are self-contained vanilla HTML/CSS/JS files:
- `/public/labs/clinical-compass/` — Graston Clinical Compass Tool.html
- `/public/labs/investment-roi-planner/` — Investment ROI Planner Tool.html
- `/public/labs/smart-sales-pricing/` — Graston Smart Sales and Pricing Tool.html
- `/public/labs/license-requirements/` — Practitioner License Requirements Tool.html

### Lab card visual modes (per entry in `data/labs.ts`)
Each lab entry includes `screenshots[]` with Cloudinary URLs for the detail page.

---

## Services — Architecture Detail

The services page (`/services`) has three layers of data:

1. **`serviceLayerMeta`** — Three strategy layers: Strategy / Build / Growth
2. **`serviceOverview`** — 4 summary cards for the overview section
3. **`serviceDetails`** — 6 full service categories with deliverables + proof cases
4. **`specializedServices`** — 8 specialty service items (Local SEO, Healthcare, Law, etc.)
5. **`engagementModels`** — 3 engagement types: Audit/Advisory, Project Build, Embedded/Fractional
6. **`contactServiceOptions`** — 7 options for the contact form select

**3D scene targets** in `serviceDetails` (`sceneTarget` field):
`strategy-core`, `build-brand-web`, `build-systems`, `growth-core`, `build-commerce`, `build-specialized`
These tie to the `ServicesAmbient` 3D scene component.

---

## Component Architecture — Key Components

### 3D Components (`components/3d/`)
- `HeroBackground.tsx` — Three.js hero scene (lazy-loaded, SSR disabled)
- `LabTelemetryScene.tsx` — Lab page 3D scene
- `ServicesAmbient.tsx` — Services page ambient 3D
- `WorkAmbient.tsx` — Work page ambient 3D
- `FloatingCard.tsx` — 3D card tilt effect
- `system/` — System/reusable 3D utilities
- `scene-types.ts` — Shared scene type definitions

### Interactive Components (`components/interactive/`)
- `CursorSpotlight.tsx` — Cursor-following spotlight effect
- `MagneticButton.tsx` — Magnetic hover effect on CTAs

### Motion Components (`components/motion/`)
- `KineticHeadline.tsx` — Animated headline component
- `ClientTicker.tsx` — Client logo ticker/marquee
- `StatCounter.tsx` — Animated number counter
- `index.ts` — Re-exports

### Layout Components (`components/layout/`)
- `Nav.tsx` + `Nav.module.css` — Floating pill nav
- `Footer.tsx` + `Footer.module.css`

### Section Components (`components/sections/`)
- `Hero.tsx` — Homepage hero
- `Services.tsx` — Services overview section
- `CaseStudies.tsx` — Case studies grid
- `CaseStudyContent.tsx` / `CaseStudyImages.tsx` — Work detail sections
- `AboutTeaser.tsx` — About teaser on homepage
- `Testimonials.tsx` — Testimonials section
- `ContactCTA.tsx` — Contact CTA section
- `ContactForm.tsx` — Contact form (React Hook Form + Zod)
- `FeaturedTool.tsx` / `FeaturedToolInner.tsx` — Lab featured tool
- `StudioGallery.tsx` — Cloudinary gallery
- `CareerTimeline/` — About page career timeline
- `WorkDetail/` — Work detail page components
- `WorkIndex/` — Work index page components

### Lab Components (`components/lab/`)
- `LabDetailPage.tsx` — Lab tool detail layout
- `LabModal.tsx` — Lab tool modal viewer
- `CmoAccessModal.tsx` — CMO Simulator access gate

### UI Components (`components/ui/`)
- `background-paths.tsx` — 21st.dev background paths (adapted)
- `button-colorful.tsx` — 21st.dev button colorful (adapted)
- `grid-card.tsx` — 21st.dev grid card (adapted)
- `underline-animation.tsx` — 21st.dev underline animation (adapted)
- `gallery-hover-card.tsx` — Studio gallery hover card
- `masonry-grid.tsx` — Masonry layout grid
- `ScrollProgress.tsx` — Scroll progress indicator
- `CookieConsent.tsx` — Cookie consent banner
- `BackToTop.tsx` — Back to top button

### Provider Components (`components/providers/`)
- `LenisProvider.tsx` — Smooth scroll provider
- `Analytics.tsx` — Analytics tracking

### Custom Hooks (`hooks/`)
- `useCursorFollow.ts` — Cursor position tracking
- `useFinePointer.ts` — Fine pointer detection
- `useMagneticEffect.ts` — Magnetic button effect
- `useReducedMotion.ts` — Reduced motion preference
- `useScrollAnimation.ts` — GSAP scroll animation
- `useScrollDirection.ts` — Scroll direction detection
- `useTypingEffect.ts` — Typing animation

---

## Canonical Slug Rules

Several case study slugs were renamed. These are the canonical slugs:
- `riley-bennett-egloff` (not rbe-law)
- `primarycare-indy` (not primary-care-indy)
- `urgentcare-indy` (not urgent-care-indy)
- `317-bbq` (not three-seventeen-bbq)

Redirects live in `next.config.js`.

---

## Asset Infrastructure

### Cloudinary
- Cloud name: `djhqowk67`
- Use Cloudinary Next.js SDK for all project/studio images
- Reference images by public ID, not local path
- Studio gallery pulls from Cloudinary folders:
  `/studio/photography/`
  `/studio/graphic-design/`
  `/studio/proof/`

### Cloudinary image reference pattern
```ts
// Use public ID, not full URL, in data files
logoPublicId: 'graston_technique_logo'
heroPublicId: 'PMC-Dr.-Pike-Xray'
cardPublicId: 'primary-care-indy-website'

// Cloudinary URL pattern for screenshots in labs.ts:
src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/[public-id].png'
```

### Fonts
- Cabinet Grotesk: already in `/public/fonts/cabinet-grotesk/` (woff2 files)
- Loaded via `next/font` `localFont` in `app/layout.tsx`

### Environment Variables
- `RESEND_API_KEY` — contact form email delivery (pending in .env.local)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67`

---

## Notable Work / Case Studies — Key Metrics

| Client | Industry | Key Metric | Notes |
|---|---|---|---|
| Graston Technique | SaaS/Healthcare Training | +212% qualified leads, 95% overhead reduction, 48hrs/wk saved | Flagship — automation platform |
| Pike Medical Consultants | Healthcare | 45% patient growth over 3 years | Fractional CMO, 5 divisions |
| PrimaryCare Indy | Healthcare | 75% more bookings, 300% organic traffic, 210% ROI | Under Pike Medical umbrella |
| UrgentCare Indy | Healthcare | +35% patient bookings, top-3 local rankings, 60% visits via online check-in | Under Pike Medical umbrella |
| Riley Bennett Egloff | Legal | 7+ year engagement, 29-attorney firm | Embedded marketing |
| Tuohy Bailey & Moore | Legal | 45% bounce reduction, 60% more form submissions | Brand + web rebuild |
| 317 BBQ | Hospitality | 120% time on site, 40% order conversion, 2x catering | Photography-led storytelling |
| Hoosier Boy Barbershop | Local Retail | 90% more bookings, 200% social, #1 local search | Brand identity + booking |
| Russell Painting | Local Service | 4.9★ Google, heritage narrative as #1 conversion driver | SEO + trust architecture |
| Behr Pet Essentials | E-Commerce | +28% avg cart, -40% support tickets, 3x conversion | Content-first strategy |
| Circle City Kicks | Local Retail | Full brand system, local identity mark | Streetwear branding |
| Black Letter | Legal Advisory | Full identity system, premium positioning from day one | Brand identity |
| Clean Aesthetic | Medical Aesthetics | 0 to full brand in one engagement, concierge pricing launch | Brand identity |
| Primary Colours | Non-Profit | $46k+ revenue, 10,000+ audience, 200+ artists | Event + sponsorship |

---

## Testimonials (use verbatim — full quotes)
- "Jacob has a great balance of strategic thinking and hands-on
  execution... I'd recommend him to anyone looking for a marketing
  professional who's both forward-thinking and results-oriented."
  — Jesse Wey, 2025
- "Jacob is the kind of marketer who makes an immediate impact...
  figuring out how to put new technologies to work in practical ways."
  — Andrew Bastnagel, 2025
- "Exuberance and moxie are unparalleled... ability to implement
  strategies that produce a positive ROI." — Kevin Martin See
- "Energy and ingenuity are extremely valuable assets... expanded
  our vision." — Ben Worrell

Display order: Jesse Wey → Andrew Bastnagel → Kevin Martin See → Ben Worrell

---

## Technical Requirements
- Use `next/font` localFont for Cabinet Grotesk, `next/font/google` for Inter
- shadcn/ui base components customized to brand palette — never default
- Framer Motion spring-physics for all animation (see presets above)
- Contact form: React Hook Form + Zod + Resend API
- All images via `next/image` with descriptive alt text (never `<img>`)
- **`next/image` is `unoptimized: true`** — Cloudflare Pages doesn't support
  Next.js image optimization. Don't add transformation params expecting server-side resizing.
- Full mobile responsiveness — mobile-first approach
- Dark mode is the default and only mode — no toggle, ever
- Target Lighthouse score: 95+ all metrics
- Cloudflare Pages deployment via GitHub auto-deploy
- `robots.ts` and `sitemap.ts` auto-generated
- Open Graph meta tags on every page
- Structured data (JSON-LD) via `components/JsonLd.tsx`
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- No `z-[9999]` — z-index is systematic and documented
- No commented-out dead code
- `metadata` export in every `page.tsx`
- `lucide-react` still in package.json but not imported — use `@phosphor-icons/react` only

---

## Folder Structure
```
/app
  /page.tsx              — Home
  /about/page.tsx        — About
  /contact/page.tsx      — Contact
  /work/page.tsx         — Case studies index ✅
  /work/[slug]/page.tsx  — Case study detail ✅
  /lab/page.tsx          — Lab tools index ✅
  /lab/[slug]/page.tsx   — Lab tool detail ✅
  /lab/cmo-simulator/    — CMO Simulator (gated) ✅
  /services/page.tsx     — Services index ✅
  /services/[slug]/page.tsx — Service pages ✅
  /studio/page.tsx       — Studio gallery ✅
  /api/contact/          — Contact form API ✅
  /api/cmo-simulator-access/ — CMO gate API ✅
  /api/studio/           — Studio API ✅
  /robots.ts             — SEO ✅
  /sitemap.ts            — SEO ✅
/components
  /ui                    — shadcn base components (brand-customized) + 21st.dev
  /sections              — Page sections (Hero, Services, About, etc.)
  /layout                — Nav, Footer
  /motion                — "use client" Framer Motion wrapper components
  /3d                    — Three.js / R3F scenes (SSR-disabled)
  /interactive           — CursorSpotlight, MagneticButton
  /lab                   — Lab-specific components
  /providers             — LenisProvider, Analytics
/data
  /labs.ts               — 9 lab entries (LAB_DETAIL_DATA)
  /services.ts           — All service page content
  /testimonials.ts       — Testimonial data
  /work/work-index.ts    — 20 work card grid entries
  /work/work-data.ts     — Full case study content
/hooks
  useCursorFollow, useFinePointer, useMagneticEffect,
  useReducedMotion, useScrollAnimation, useScrollDirection, useTypingEffect
/lib
  /motion.ts             — Spring presets + shared animation variants
  /animations/           — Animation utilities
  /case-studies.ts       — Case study helpers
  /cloudinary.ts         — Cloudinary utilities
  /utils.ts              — General utilities
  /work.ts               — Work data helpers
/styles
  /globals.css           — CSS custom properties + resets
  /[Component].module.css — Per-component CSS Modules
/public
  /fonts/cabinet-grotesk/  — .woff2 files ✅
  /labs/                   — Local HTML tool files
    clinical-compass/
    investment-roi-planner/
    smart-sales-pricing/
    license-requirements/
/skills                  — Claude Code skill files (co-located in repo)
  /darling-martech-ui/SKILL.md
  /darling-martech-redesign/SKILL.md
  /darling-martech-copy/SKILL.md
/case-studies            — Raw case study research markdown
  behr-pet-case-study.md
  russell-painting/russell-painting-case-study.md
/docs/superpowers/       — Implementation specs and plans
  /plans/
  /specs/
```

---

## Build Status

### Phase 1 — Complete ✅
- [x] Project scaffold
- [x] Brand tokens + CSS custom properties in globals.css
- [x] Nav + Footer
- [x] Home page (all sections, 3D hero, stats, services, case studies, testimonials, CTA)
- [x] About page + career timeline
- [x] Contact page + API route
- [x] SEO files (robots.ts, sitemap.ts) + structured data (JsonLd.tsx)
- [x] Cabinet Grotesk fonts — `/public/fonts/cabinet-grotesk/`
- [x] `lib/motion.ts` spring presets
- [x] Phosphor icons (`@phosphor-icons/react`)
- [x] 3D components: HeroBackground, LabTelemetryScene, ServicesAmbient, WorkAmbient, FloatingCard
- [x] Interactive: CursorSpotlight, MagneticButton
- [x] Motion: KineticHeadline, ClientTicker, StatCounter
- [x] LenisProvider smooth scroll
- [x] Analytics provider + CookieConsent
- [ ] Resend API key (pending — add to .env.local)
- [ ] Remaining Tailwind visual classes → CSS Modules migration

### Phase 2 — Complete ✅
- [x] `/work` index page — masonry/staggered grid with 20 case studies
- [x] `/work/[slug]` dynamic route — data in `data/work/work-data.ts`
- [x] `/lab` page with tool cards + 9 detail pages
- [x] `/lab/[slug]` dynamic route — data in `data/labs.ts`
- [x] `/lab/cmo-simulator` — gated CMO tool with email access modal
- [x] `/services` page with 6 service categories, 3D ambient scene
- [x] `/services/[slug]` — 4+ service detail pages
- [x] `/studio` page — Cloudinary masonry gallery
- [x] WorkAmbient + ServicesAmbient 3D scenes
- [x] 21st.dev components adapted: background-paths, button-colorful, grid-card, underline-animation
- [ ] 21st.dev AnimatedNavFramer (floating pill nav — remaining)
- [ ] Resend API integration (pending env key)

### Phase 3 — Planned
- [ ] `/pricing` page (after content session)
- [ ] Remaining case studies: riley-bennett-egloff, clean-aesthetic (content sessions needed)
- [ ] Blog infrastructure (MDX)

---

## Content Sessions Still Needed
1. Riley Bennett Egloff — full scope (7+ year engagement detail)
2. Clean Aesthetic — full scope
3. Pricing — define service tiers before building page
4. Services — expand each service page with process steps if needed

---

## Quick Start

```bash
npm run dev    # Development server on localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

**Build gotcha:** If `npm run build` fails with "generate is not a function",
a conflicting shell env var is set from another Next.js project:

```bash
__NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
```

---

## Gotchas & Known Issues

- **Tailwind NOT fully removed** — `tailwind.config.ts` remains for shadcn token infrastructure. Visual styling must use CSS Modules.
- **`next/image` is `unoptimized: true`** — Cloudflare Pages doesn't support Next.js image optimization.
- **Slug renames** — Canonical slugs: `riley-bennett-egloff`, `primarycare-indy`, `urgentcare-indy`. Redirects in `next.config.js`.
- **`lucide-react` in package.json** — Still listed but unused. Use `@phosphor-icons/react` only.
- **Lab content in `data/labs.ts`** — All 9 lab detail pages are data-driven from `LAB_DETAIL_DATA`.
- **CMO Simulator access** — Gated via `CmoAccessModal` + `/api/cmo-simulator-access`. SessionStorage bypass for returning visitors.
- **WorkAmbient + ServicesAmbient** — Both use `dynamic(..., { ssr: false })`. If adding new 3D scenes, follow same pattern.
- **`case-studies/` directory** — Contains raw markdown research files, NOT used by the app. App reads from `data/work/work-data.ts`.
- **`.worktrees/cmo-simulator-feature/`** — Abandoned worktree in repo. Ignore it.
- **`outputs/marketing-strategy-service.md`** — Research artifact. Not used by app.
