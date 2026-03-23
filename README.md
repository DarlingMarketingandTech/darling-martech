# Darling MarTech

Official website for **Darling MarTech** — the consulting brand of Jacob Darling (Marketing and Technology LLC). Built to convert visitors into clients for a senior marketing strategist and systems architect based in Indianapolis, IN.

- **Domain:** darlingmartech.com
- **Hosting:** Cloudflare Pages (GitHub auto-deploy)
- **Contact:** <jacob@jacobdarling.com>

---

## Tech Stack

| Layer | Technology | Version |
| --- | --- | --- |
| Framework | Next.js App Router | ^16.2.0 |
| Language | TypeScript | 5.9.3 |
| Styling | CSS Modules + CSS custom properties | — |
| 2D Animation | Framer Motion | ^11.18.2 |
| 3D / WebGL | @react-three/fiber + @react-three/drei + Three.js | ^8.18 / ^9.122 / ^0.183 |
| Scroll animation | GSAP + ScrollTrigger | ^3.14.2 |
| Smooth scroll | Lenis | ^1.3.19 |
| Components | shadcn/ui (brand-customized) | — |
| Icons | @phosphor-icons/react | ^2.1.10 |
| Contact form | React Hook Form + Zod + Resend | — |
| Images | next/image + next-cloudinary | ^6.17.5 |
| Fonts | Cabinet Grotesk (localFont), Inter, Instrument Serif | — |

**Cloudinary cloud name:** `djhqowk67`

**Styling rule:** Tailwind is removed from all visual styling. Every color, typography, and animation uses CSS Modules + CSS custom properties. Tailwind layout utilities only (`grid`, `flex`, `col-span-*`, `container`, `mx-auto`).

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local`:

```env
RESEND_API_KEY=your_key_here
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djhqowk67
```

---

## Project Structure

```text
/app
  /page.tsx                   — Home
  /about/page.tsx             — About
  /contact/page.tsx           — Contact
  /lab/page.tsx               — Tools & Experiments
  /work/page.tsx              — Case studies index (Phase 2)
  /work/[slug]/page.tsx       — Case study detail (Phase 2)
  /services/[slug]/page.tsx   — Service pages (Phase 2)
  /pricing/page.tsx           — Pricing (Phase 2)
/components
  /ui                         — shadcn base components (brand-customized)
  /sections                   — Page sections (Hero, Services, About, etc.)
  /layout                     — Nav, Footer
  /motion                     — "use client" Framer Motion wrapper components
/lib
  /motion.ts                  — Spring presets + shared animation variants
/styles
  /globals.css                — CSS custom properties + resets
  /[Component].module.css     — Per-component CSS Modules
/public
  /fonts/cabinet-grotesk/     — .woff2 files
  /images
    /logo                     — SVG logo files
    jacob-bio-photo-splash.jpg
```

---

## Brand Tokens

```css
--color-base:           #0A0A0A;   /* Primary background */
--color-surface:        #141414;   /* Elevated cards */
--color-accent:         #FF4D00;   /* Electric Orange */
--color-text:           #F5F0E8;   /* Warm Off-White */
--color-muted:          #888888;   /* Secondary text */
--color-border:         rgba(245, 240, 232, 0.08);
--color-border-accent:  rgba(255, 77, 0, 0.3);

--font-display: 'Cabinet Grotesk', sans-serif;
--font-body:    'Inter', sans-serif;
--font-accent:  'Instrument Serif', serif;
```

---

## 3D Component Rules

All Three.js / R3F components must:

- Be lazy-loaded with `dynamic(..., { ssr: false })`
- Use `React.memo` or minimal re-render patterns
- Accept mouse position via `ref` (not state)
- Target 60fps — no heavy geometry inside `useFrame` without memoization

---

## Build Status

### Phase 1 — Live

- Home, About, Contact pages
- Nav + Footer
- Brand tokens + CSS custom properties
- Contact form (React Hook Form + Zod + Resend)

### Phase 2 — In Progress

- /work — case studies index + detail pages
- /lab — tools & experiments
- /studio — Cloudinary-powered visual gallery
- /services/[slug] — service detail pages

### Phase 3 — Planned

- /blog — MDX-powered thought leadership
- /pricing — after content session with Jacob
