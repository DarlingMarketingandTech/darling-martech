# Darling MarTech — Project Brief for Claude Code

## About This File
This is the master project brief for the Darling MarTech website build.
Read this file in full before doing any work. Every decision about design,
copy, architecture, and tone should reference this document.

> **Skill files:** Extended design, redesign-audit, and copy instructions
> live in `C:\Users\hoosi\ClaudeOS\taste-skill-main\`. Load these skills
> before building or upgrading any page:
> - `darling-martech-ui/SKILL.md` — Design system, component library, motion
> - `darling-martech-redesign/SKILL.md` — Audit protocol for upgrading AI-looking code
> - `darling-martech-copy/SKILL.md` — Voice, CTAs, error messages, microcopy

---

## Project Overview
Official website for **Darling MarTech** — the consulting brand of Jacob
Darling (Marketing and Technology LLC). The site targets small businesses
and startups, builds confidence in Jacob as a senior-level expert, and
converts visitors into clients.

- **Brand:** Darling MarTech
- **Owner:** Jacob Darling
- **Entity:** Marketing and Technology LLC
- **Domain:** darlingmartech.com (not yet live — use Cloudflare preview URL)
- **Location:** Indianapolis, IN
- **Email:** jacob@jacobdarling.com
- **Portfolio reference:** bearcavemarketing.com
- **Portfolio v2:** bearcave-marketing-v2.vercel.app

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16+ App Router | RSC default. `"use client"` only for interactive/animated/3D components |
| Styling | **CSS Modules + CSS custom properties only** | Zero Tailwind colors/typography. Tailwind removed entirely for visual styling |
| 2D Animation | **Framer Motion 11** | All UI motion. Spring physics only — presets in `lib/motion.ts` |
| 3D / WebGL | **@react-three/fiber v8 + @react-three/drei v9 + Three.js** | Hero background, floating geometry, GPU-accelerated 3D |
| Scroll animation | **GSAP + ScrollTrigger** | Timeline-based scroll sequences via `hooks/useScrollAnimation.ts` |
| Smooth scroll | **Lenis** | Inertia scrolling, wraps full app in `LenisProvider` |
| Interactivity | Custom hooks + motion components | Magnetic buttons, cursor spotlight, 3D card tilt |
| Components | shadcn/ui (customized) | Always adapted to brand — never default shadcn appearance |
| Icons | **@phosphor-icons/react** | `weight="light"` or `"regular"`. No Lucide. No Feather. No Heroicons. |
| Fonts | next/font localFont — Cabinet Grotesk, Inter | Instrument Serif via next/font Google |
| Contact form | React Hook Form + Zod + Resend API | |
| Images | next/image (always — never `<img>`) | |
| Hosting | Cloudflare Pages (GitHub auto-deploy) | |
| Media | Cloudinary Next.js SDK | Cloud: `djhqowk67` |

### Styling rule — CSS Modules ONLY for visual properties
Tailwind is **removed** from all visual styling. Every color, typography,
surface, animation, and visual property uses CSS Modules + CSS custom properties.

```
✅ Allowed (layout only):  grid  flex  col-span-2  container  mx-auto
❌ Never use:              bg-*  text-*  border-*  shadow-*  rounded-*
                           font-*  tracking-*  transition-*  animate-*
```

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

### Notable Work / Case Studies
1. **Primary Care Indy** — Healthcare · 210% ROI · Unified brand system
   across 3+ locations. Merged PMC identity into Primary Care Indy.
   Digital-first patient intake strategy. Google/Healthgrades/Zocdoc sync.
2. **Hoosier Boy Barbershop** — Local Retail · 4.1× booking lift · 100%
   local brand recall · Zero paid media at launch. Full brand identity,
   Americana iconography, environmental design.
3. **Behr Pet Essentials** — E-Commerce · +28% avg cart value · -40%
   support tickets · 3× info-to-purchase conversion. Infographic-first
   content architecture, direct-response campaign system.
4. **Urgent Care Indy** — Healthcare · +35% booking increase. Digital
   integration and patient growth strategy.
5. **Primary Colours** — Nonprofit · $46k+ revenue generated. Event
   marketing, sponsorship, arts nonprofit strategy.
6. **Russell Painting** — Local Service · 4.9★ star sentiment. Local SEO,
   lead generation, heritage brand strategy.
7. **Clean Aesthetic** — Medical Aesthetics · 4-week brand launch.
   Concierge luxury brand identity and launch strategy.

### Testimonials (use verbatim — full quotes)
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

Testimonial order for impact: Jesse Wey → Andrew Bastnagel →
Kevin Martin See → Ben Worrell.

---

## Site Architecture

### Phase 1 — Launch Now
- `/` — Home (one-page with all core sections)
- `/about` — Full about page
- `/contact` — Contact form page

### Phase 2 — Post Launch
- `/services/marketing-strategy` — Service detail page
- `/services/web-development` — Service detail page
- `/services/tech-implementation` — Service detail page
- `/services/seo-digital-marketing` — Service detail page
- `/work` — Case studies index
- `/work/[slug]` — Individual case study pages
- `/pricing` — Pricing page

### Phase 3 — Future
- `/blog` — Thought leadership (MDX-powered)
- `/blog/[slug]` — Individual posts

---

## Full Page Copy

### HOME — Hero Section
**Headline:**
15 years of marketing strategy and systems architecture — in one person,
working directly with you.

**Subheadline:**
Jacob Darling builds the marketing infrastructure that makes small
businesses and startups grow — strategy, technology, automation, and
execution. No agencies. No hand-offs. Just results you can measure.

**CTA Button:** Let's build something that works.

**Stats Bar:**
- 15+ Years Experience
- 400+ Automations Built
- 30,000+ Users Served
- 40% Avg Conversion Lift

### HOME — Services Section
**Section label:** What I Do
**Headline:** Four disciplines. One person. Zero hand-offs.

1. **Marketing Strategy & Consulting**
   Brand positioning, go-to-market planning, and campaign strategy built
   around your specific goals — not a templated playbook.

2. **Web & App Development**
   Fast, modern websites and web apps built with Next.js — designed to
   look sharp, perform well, and turn visitors into clients.

3. **Tech Implementation**
   The right tools, configured the right way. CRM, automation, analytics,
   and integrations handled by someone who understands both the tech and
   the marketing strategy behind it.

4. **SEO & Digital Marketing**
   Search strategy, content systems, and digital campaigns built to
   compound over time — bringing qualified leads to you consistently.

### HOME — About Teaser
**Headline:** Both sides. One person.
**Copy:** Most consultants know marketing or technology. I've spent 15
years doing both — leading marketing teams, architecting CRM systems,
building automation workflows, and shipping code. When you hire me,
you get me directly. No account managers. No hand-offs. Just clear
thinking and clean execution.
**CTA:** Read my story →

### HOME — Case Studies Teaser
**Headline:** Work that proves the point.
**Subheadline:** Across healthcare, legal, finance, retail, nonprofits,
and local business — here's what strategy and execution look like when
the same person does both.
**Featured:** Primary Care Indy, Hoosier Boy Barbershop, Behr Pet
Essentials, Urgent Care Indy, Primary Colours

### HOME — Testimonials
Use the 4 verbatim testimonials listed above.

### HOME — Contact CTA Section
**Headline:** Ready to build something that works?
**Copy:** I work directly with a small number of clients at a time.
Every engagement gets my full attention.
**CTA:** Let's talk →

---

### ABOUT PAGE

**Eyebrow:** About Jacob Darling
**Headline:** Strategy and systems — built by someone who's done both
for 15 years.

**Bio:**
I'm Jacob Darling — a marketing strategist, systems architect, and
technologist based in Indianapolis. Over the past 15 years I've built
marketing infrastructure for healthcare systems, law firms, financial
advisors, e-commerce brands, nonprofits, and startups. I've led marketing
from the inside as a director and built campaigns from the outside as a
consultant. I know both sides.

What makes me different isn't just the range — it's the depth. I don't
hand your strategy to a developer and hope for the best. I build the
strategy and the system that executes it. CRM architecture, marketing
automation, web development, analytics pipelines, AI integrations — I
do the work myself, and I measure everything.

I started Darling MarTech because small businesses deserve the kind of
senior-level thinking and hands-on execution that used to be reserved
for brands with agency retainers. When you work with me, you get me —
directly, personally, and accountably.

**Credentials block:**
- B.S. Business Management — Indiana University, 2008
- Gold Key Photography Award — Scholastic Art & Writing Awards, 2008
- 15+ years across healthcare, legal, finance, e-commerce, nonprofit
- Indianapolis, IN

---

### CONTACT PAGE

**Headline:** Ready to build something that works?
**Subheadline:** Whether you need a full marketing system, a new website,
or a strategic second opinion — let's talk. I work with a small number
of clients at a time so every engagement gets my full attention.

**Form fields:**
- Name (text)
- Company (text)
- Email (email)
- What do you need help with? (select):
  - Marketing Strategy & Consulting
  - Web & App Development
  - Tech Implementation
  - SEO & Digital Marketing
  - Not sure yet — let's talk
- Message (textarea)
- Submit: "Send it →"

**After submit:** "Got it — I'll be in touch within 1 business day."

---

## Technical Requirements
- Use `next/font` localFont for Cabinet Grotesk, `next/font/google` for Inter
- shadcn/ui base components customized to brand palette — never default
- Framer Motion spring-physics for all animation (see presets above)
- Contact form: React Hook Form + Zod + Resend API
- All images via `next/image` with descriptive alt text (never `<img>`)
- Full mobile responsiveness — mobile-first approach
- Dark mode is the default and only mode — no toggle, ever
- Target Lighthouse score: 95+ all metrics
- Cloudflare Pages deployment via GitHub auto-deploy
- `robots.txt` and `sitemap.xml` generated automatically
- Open Graph meta tags on every page
- Structured data (JSON-LD) for local business
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- No `z-[9999]` — z-index is systematic and documented
- No commented-out dead code
- `metadata` export in every `page.tsx`

---

## Folder Structure
```
/app
  /page.tsx              — Home
  /about/page.tsx        — About
  /contact/page.tsx      — Contact
  /work/page.tsx         — Case studies index (Phase 2)
  /work/[slug]/page.tsx  — Case study detail (Phase 2)
  /services/[slug]/page.tsx — Service pages (Phase 2)
  /pricing/page.tsx      — Pricing (Phase 2)
/components
  /ui                    — shadcn base components (brand-customized)
  /sections              — Page sections (Hero, Services, About, etc.)
  /layout                — Nav, Footer
  /motion                — "use client" Framer Motion wrapper components
/lib
  /motion.ts             — Spring presets + shared animation variants
/styles
  /globals.css           — CSS custom properties + resets
  /[Component].module.css — Per-component CSS Modules
/public
  /fonts/cabinet-grotesk/  — .woff2 files (download from fontshare.com)
  /images
    /logo                — SVG logo files
    jacob-bio-photo-splash.jpg
```

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

### Fonts
- Cabinet Grotesk: download from fontshare.com/fonts/cabinet-grotesk
- Place woff2 files in `/public/fonts/cabinet-grotesk/`
- Load via `next/font` `localFont` in `app/layout.tsx`

### Environment Variables
- `RESEND_API_KEY` — contact form email delivery
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67`

---

## Phase 2 Pages (build after launch)

### /work — Case Studies Index
Layout: Masonry or staggered grid — not uniform card rows.
Each card:
- Client name (Cabinet Grotesk, display weight)
- Industry label (small, muted, uppercase, tabular)
- Key result stat (#FF4D00 accent color)
- Orange left-border reveal on hover via CSS `scaleY` from 0 to 1
- Framer Motion staggered entrance for the grid

### /work/[slug] — Individual Case Studies

**IMPORTANT:** Each case study needs a dedicated content session
before building. Several represent ongoing fractional CMO engagements,
not just one-off projects. Do not use placeholder content.

Confirmed case studies (slugs + status):

| Slug | Client | Status |
|---|---|---|
| urgent-care-indy | Urgent Care Indy | Content session needed |
| direct-care-indy | Direct Care Indy | In progress — do not publish yet |
| primary-care-indy | Primary Care Indy | Content session needed |
| hoosier-boy-barbershop | Hoosier Boy Barbershop | Content ready in brief |
| behr-pet-essentials | Behr Pet Essentials | Content ready in brief |
| primary-colours | Primary Colours | Content ready in brief |
| rbe-law | Riley Bennett Egloff LLP | Content session needed |
| russell-painting | Russell Painting Co. | Content ready in brief |
| clean-aesthetic | Clean Aesthetic | Content session needed |

**Pike Medical note:** Urgent Care Indy, Primary Care Indy, and Direct
Care Indy are all under the Pike Medical Consultants umbrella. Jacob
serves as fractional CMO across all three — scope includes:
- Full website design and development
- Email marketing (Mailchimp)
- Google Ads campaign management
- Graphic design (patient handouts, signage, print)
- Google Analytics monitoring and reporting
- Google Search Console management
- Google My Business management
- Direct Care Indy is a new launch currently in progress

Build a Pike Medical parent case study plus individual clinic pages.

### /lab — Tools & Experiments

Three categories matching v2 site:
- Marketing (Growth Engine, ROI Calculator, Brand Builder,
  Marketing Simulator, Email Simulator, Social Simulator)
- Developer (Clinical Compass, License Hub, GT9 Pricing Tool,
  SEO Scanner, Lead Score Lab)
- Technologist (Site Optimization & Security, Campaign Performance
  Analyzer, Competitor Intelligence Platform, Link Architect,
  Edge Image Negotiator, GA4 Analytics Bridge, CRM-Aware AI Hook,
  Zero-FOUC Theme Engine, Global Telemetry Monitor)

Lab card design: tool cards as "machine" objects — not app tiles.
Short, direct descriptions (what it does, not what it "empowers you to do").
Tech stack tags shown. Status badge (Production / Beta / Experimental).

Each card links to a live deployed app — no `href="#"`.

Deployed lab apps to link:
- CMO Simulator: cmo-simulator-3il5.vercel.app
- Piko Artist Website: piko-artist-website-v3-three.vercel.app
- Strum AI: jacobs-music-plum.vercel.app (polish before linking)
- Graston Growth Engine: graston-growth-enginegg-zkj2.vercel.app
  (not ready — skip until rebuilt)
- All v2 lab tools: bearcave-marketing-v2.vercel.app/lab/[slug]

### /studio — Visual Gallery

Cloudinary-powered artifact gallery. Three sections:
- Photography — pulls from Cloudinary /studio/photography/
- Design — pulls from Cloudinary /studio/graphic-design/
- Proof — pulls from Cloudinary /studio/proof/

Layout: Masonry or horizontal scroll — not uniform grid.
Lightbox on click. Lazy load all images via next/image + Cloudinary loader.
Blur placeholder on all images.

### /services/[slug] — Individual Service Pages

| Slug | Title |
|---|---|
| marketing-strategy | Marketing Strategy & Consulting |
| web-development | Web & App Development |
| tech-implementation | Tech Implementation |
| seo-digital-marketing | SEO & Digital Marketing |

Each page: hero, detailed description, process steps,
relevant case studies, CTA.

### /pricing — Pricing Page
Content session needed — Jacob to define service tiers and pricing
before building this page.

---

## WordPress Sites Built (reference in case studies)
- rbelaw.com — Riley Bennett Egloff LLP (law firm)
- grastontechnique.com — Graston Technique LLC
- hoosierboybarbershop.com — Hoosier Boy Barbershop
- 317bbq.com — 317 BBQ
- russellpaintingcompany.com — Russell Painting Co.
- blazingstartherapy.com — Blazing Star Therapy

---

## Quick Start

```bash
npm run dev    # Development server on localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

**Build gotcha:** If `npm run build` fails with "generate is not a function", a conflicting shell env var is set from another Next.js project:

```bash
__NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
```

---

## Gotchas

- **Tailwind is NOT fully removed** — `tailwind.config.ts` remains for shadcn token infrastructure. Rule: no Tailwind for visual styling (colors, typography, shadows). Layout utilities and shadcn plumbing are still Tailwind-backed.
- **`next/image` is `unoptimized: true`** — Cloudflare Pages doesn't support Next.js image optimization. Don't add transformation params expecting server-side resizing.
- **Slug renames** — Several case study slugs were renamed; redirects live in `next.config.js`. Canonical slugs: `riley-bennett-egloff`, `primarycare-indy`, `urgentcare-indy` (not the old hyphenated forms in this brief).
- **`lucide-react` in package.json** — Still listed as a dependency but not imported anywhere. Don't add new imports from it; use `@phosphor-icons/react` only.
- **Lab content lives in `data/labs.ts`** — All 9 lab detail pages are data-driven from `LAB_DETAIL_DATA`. No `.md` files needed or used for labs.

---

## Data Directory

`/data/` holds all typed TS content files — use these instead of hardcoding content in components:

- `labs.ts` — 9 lab entries (`LAB_DETAIL_DATA`)
- `services.ts` — service page content
- `testimonials.ts` — testimonial data
- `work/work-index.ts` — work card grid data
- `work/work-data.ts` — full case study content

Implementation specs for each feature sprint: `/docs/superpowers/plans/` and `/docs/superpowers/specs/`

---

## Build Order for Claude Code

### Phase 1 — Complete

- [x] Project scaffold
- [x] Brand tokens + CSS custom properties in globals.css
- [x] Nav + Footer
- [x] Home page (all sections)
- [x] About page
- [x] Contact page + API route
- [x] SEO files + structured data
- [x] Cabinet Grotesk fonts — `/public/fonts/cabinet-grotesk/`
- [x] `lib/motion.ts` spring presets
- [x] Phosphor icons (`@phosphor-icons/react`) — lucide-react still in package.json but unused
- [ ] Resend API key (pending — add to .env.local)
- [ ] Migrate remaining Tailwind visual classes → CSS Modules

### Phase 2 — In Progress

- [x] `/work` index page — masonry/staggered grid
- [x] `/work/[slug]` dynamic route — data in `data/work/`
- [x] `/lab` page with tool cards + 9 detail pages
- [x] `/lab/[slug]` dynamic route — data in `data/labs.ts`
- [x] `/studio` page — Cloudinary masonry gallery
- [x] `/services/[slug]` — 4 service detail pages
- [ ] Install + adapt 21st.dev AnimatedNavFramer component
- [ ] Install + adapt 21st.dev Background Paths for hero section
- [ ] Install + adapt 21st.dev Grid Card for services section

### Phase 3

- [ ] `/pricing` page (after content session)
- [ ] Remaining case studies (after content sessions)
- [ ] Blog infrastructure (MDX)

---

## Next Content Sessions Needed

1. Pike Medical / Urgent Care Indy — full fractional CMO scope
2. Primary Care Indy — full scope
3. RBE Law — full scope
4. Clean Aesthetic — full scope
5. Pricing — define service tiers
6. Services — expand each service page with process steps
