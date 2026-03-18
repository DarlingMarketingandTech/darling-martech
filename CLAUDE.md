# Darling MarTech — Project Brief for Claude Code

## About This File
This is the master project brief for the Darling MarTech website build.
Read this file in full before doing any work. Every decision about design,
copy, architecture, and tone should reference this document.

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
- **Framework:** Next.js 14+ with App Router
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Components:** shadcn/ui (customized to brand)
- **Fonts:** Cabinet Grotesk (display), Inter (body), Instrument Serif italic (accent)
- **Contact form:** React Hook Form + Zod + Resend API
- **Images:** next/image (optimized)
- **Hosting:** Cloudflare Pages (via GitHub integration)
- **Repo:** GitHub (private)

---

## Brand Identity

### Color System
| Name | Hex | Role |
|---|---|---|
| Obsidian | #0A0A0A | Primary background — true near-black |
| Electric Orange | #FF4D00 | Brand accent — used sparingly |
| Warm Off-White | #F5F0E8 | Text on dark, light backgrounds |
| Mid Gray | #888888 | Supporting/secondary text |

### Typography
- **Display/Headlines:** Cabinet Grotesk — weight 700–900, tracking
  -0.02em to -0.03em, tight line-height ~0.95–1.1
- **Body:** Inter — weight 400, line-height 1.7, color #888888 on dark bg
- **Accent:** Instrument Serif — italic only, for pull quotes and taglines

### Logo
- Wordmark: "Darling" in #F5F0E8 + "MarTech" in #FF4D00 — Cabinet
  Grotesk Bold
- Monogram: "DM" mark for favicon, social avatars, compact use
- SVG files: `/public/images/logo/`

### Brand Photo
- Primary: `jacob-bio-photo-splash.jpg` — artistic watercolor treatment
- Location: `/public/images/`

---

## Design Principles
- Dark background (#0A0A0A) always — never light gray or navy as base
- One accent color (Electric Orange) used intentionally and sparingly
- Strong typographic scale — huge display text + small refined body text
- Asymmetric layouts — break the grid deliberately
- Generous whitespace — let content breathe
- Scroll-triggered animations via Framer Motion — purposeful, not showy
- Subtle hover micro-interactions on all interactive elements
- Mobile-first, fully responsive

### Strictly Avoid
- Purple-to-blue gradients
- Glowing orbs or blob background shapes
- Glassmorphism / frosted blur cards
- Floating particle animations
- Generic symmetrical card grids
- Overly rounded "bubbly" UI
- Any aesthetic common in AI-generated or template sites

### Design Inspiration
JOR Personal Assistant Behance case study — dark backgrounds, single bold
accent color, geometric logomark, strong typographic scale, premium
product mockups shown in context, mixed layout with asymmetry and
breathing room.

---

## Brand Voice & Tone
**We are:** Confident and direct. Strategic and outcomes-focused.
Tech-fluent and clear. Personal and approachable.

**We are not:** Corporate or stiff. Salesy or pushy. Vague or full of
buzzwords. Overly trendy. Generic.

Every word should sound like Jacob speaking directly to a potential
client — not like an agency website.

---

## Jacob Darling — Professional Profile

### Summary
Marketing strategist and systems architect with 15+ years of experience
building revenue-driving marketing infrastructure. Bridges creative
marketing vision and technical implementation. Works across agency and
brand sides equally.

### Key Stats
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

### Testimonials (use verbatim)
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
- Use `next/font` for Cabinet Grotesk and Inter
- shadcn/ui base components customized to brand palette
- Framer Motion scroll-triggered reveals on every section
- Contact form: React Hook Form + Zod + Resend API
- All images via `next/image` with proper alt text
- Full mobile responsiveness — mobile-first approach
- Dark mode is the default and only mode — no toggle needed
- Target Lighthouse score: 95+ all metrics
- Cloudflare Pages deployment via GitHub auto-deploy
- `robots.txt` and `sitemap.xml` generated automatically
- Open Graph meta tags on every page
- Structured data (JSON-LD) for local business

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
  /ui                    — shadcn base components
  /sections              — Page sections (Hero, Services, About, etc.)
  /layout                — Nav, Footer
/public
  /images
    /logo                — SVG logo files
    jacob-bio-photo-splash.jpg
/styles
  globals.css
```

---

## First Task for Claude Code
When starting work, scaffold the complete Next.js project with:
1. Tailwind CSS configured with brand color tokens
2. shadcn/ui initialized
3. Framer Motion installed
4. Cabinet Grotesk + Inter loaded via next/font
5. Global styles with brand colors as CSS variables
6. Nav component with logo and CTA
7. Footer component
8. Home page with all sections stubbed out
9. About page
10. Contact page with working form (Resend)
11. Cloudflare Pages config (`_routes.json`, `next.config.js`)
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
- Re-enable localFont block in app/layout.tsx

### Environment Variables
- `RESEND_API_KEY` — contact form email delivery
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67`

---

## Phase 2 Pages (build after launch)

### /work — Case Studies Index
Grid of client case study cards. Each card shows:
- Client name
- Industry tag
- Key result/ROI metric
- Brief description
- Link to full case study

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

Each lab card shows:
- Tool name + category badge
- Status (Production/Beta/Experimental)
- One-line description
- Tech stack tags
- "Launch App" button → links to live Vercel deployment

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

Masonry or grid layout. Lightbox on click.
Lazy load all images via next/image + Cloudinary loader.

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

## Build Order for Claude Code

### Phase 1 (complete — deployed to Cloudflare preview URL)
- [x] Project scaffold
- [x] Brand tokens + Tailwind config
- [x] Nav + Footer
- [x] Home page (all sections)
- [x] About page
- [x] Contact page + API route
- [x] SEO files + structured data
- [ ] Cabinet Grotesk fonts (pending — download from fontshare)
- [ ] Resend API key (pending — add to .env.local)

### Phase 2 (next sprint)
- [ ] /work index page
- [ ] /work/[slug] — start with Hoosier Boy, Behr Pet, Primary Colours
- [ ] /lab page with tool cards
- [ ] /studio page with Cloudinary gallery
- [ ] Cloudinary SDK integration

### Phase 3
- [ ] /services/[slug] — 4 service detail pages
- [ ] /pricing page (after content session)
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