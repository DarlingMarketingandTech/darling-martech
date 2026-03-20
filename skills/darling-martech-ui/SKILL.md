---
name: darling-martech-ui
description: >
  Primary frontend design skill for darlingmartech.com. Encodes the complete
  Darling MarTech design DNA — Obsidian base (#0A0A0A), Electric Orange accent
  (#FF4D00), Cabinet Grotesk display, Instrument Serif italic accent, Framer
  Motion for all animation. Produces human-crafted, agency-tier Next.js
  components that look nothing like AI-generated output. Use this skill for
  ANY frontend work on the Darling MarTech site: new pages, components,
  sections, redesigns, or UI experiments. Also triggers on: "build the hero",
  "make the services section", "design the work/case studies page", "create a
  component for the site", "redesign the nav", "build the about page", "add
  animation", "make it feel more premium", "it looks too generic", or any
  request involving darlingmartech.com UI. Use proactively whenever the stack
  (Next.js, Framer Motion, Cabinet Grotesk) is mentioned.
---

# Darling MarTech — Frontend Design Skill

---

## 0. Curated Component Library (21st.dev)

These are pre-vetted, installable components from 21st.dev that match the Darling
MarTech design DNA. Use them as a starting point — always recolor to the brand
system, swap Lucide icons for Phosphor, and replace any Tailwind color utilities
with CSS custom properties.

All install via: `npx shadcn@latest add <URL>`

### Navigation
| Component | URL | Use For | Adaptations Needed |
|-----------|-----|---------|-------------------|
| **Navigation Menu** (AnimatedNavFramer) | `https://21st.dev/community/components/reapollo/navigation-menu/default` | Floating pill nav that collapses/expands on scroll | Recolor to `--color-base` bg + `rgba(10,10,10,0.7)` glass, set text to `--color-muted`, accent to `--color-text` on hover, replace with Cabinet Grotesk |
| **Underline Animation** | `https://21st.dev/community/components/danielpetho/underline-animation/default` | Nav link hover states, footer links | Swap blue color to `--color-accent` (#FF4D00) for accent links, `--color-text` for standard links. Use "comes-in-goes-out" variant |

### Hero
| Component | URL | Use For | Adaptations Needed |
|-----------|-----|---------|-------------------|
| **Hero ASCII** | `https://21st.dev/community/components/reapollo/hero-ascii/default` | Full-page hero with geometric/technical right-side illustration | Replace monospace font with Cabinet Grotesk for headline, keep ASCII/dot-grid decorative elements, recolor to brand palette. Replace "VITRUVIAN" placeholder with DM monogram or technical stat grid |
| **Background Paths** | `https://21st.dev/community/components/kokonutd/background-paths/default` | Hero background — animated wire paths on dark canvas | Use as `position: absolute` layer behind hero content. Reduce opacity to 15–20% so paths are atmospheric not dominant. Paths work perfectly in obsidian (#0A0A0A) |

### Features / Services
| Component | URL | Use For | Adaptations Needed |
|-----------|-----|---------|-------------------|
| **Grid Card** | `https://21st.dev/community/components/efferd/grid-card/default` | Service cards, case study cards | Recolor card background to `--color-surface` (#141414), grid lines to `--color-border`, gradient hover to Electric Orange tint (`rgba(255,77,0,0.06)`). Replace icon with Phosphor weight="light" |

### CTAs / Buttons
| Component | URL | Use For | Adaptations Needed |
|-----------|-----|---------|-------------------|
| **Button Colorful with Hover Effect** | `https://21st.dev/community/components/kokonutd/button-colorful/default` | Primary CTA buttons (hero, contact section) | Remove purple/rainbow gradient. Set fill to `--color-accent` (#FF4D00) on hover, base to transparent with `--color-accent` border. Swap `lucide-react` arrow for `@phosphor-icons/react` ArrowRight weight="regular". Keep the directional hover fill entering from left |

### Footer
| Component | URL | Use For | Adaptations Needed |
|-----------|-----|---------|-------------------|
| **Underline Animation** (footer use) | `https://21st.dev/community/components/danielpetho/underline-animation/default` | Footer navigation links with animated underline | Same as nav adaptation above. Use "center" variant for footer links. Set uppercase, Cabinet Grotesk, small tracking |

### Installation pattern
```bash
# Install any component directly
npx shadcn@latest add https://21st.dev/r/[author]/[component-name]

# Example
npx shadcn@latest add https://21st.dev/r/reapollo/navigation-menu
npx shadcn@latest add https://21st.dev/r/kokonutd/background-paths
npx shadcn@latest add https://21st.dev/r/reapollo/hero-ascii
npx shadcn@latest add https://21st.dev/r/efferd/grid-card
npx shadcn@latest add https://21st.dev/r/kokonutd/button-colorful
npx shadcn@latest add https://21st.dev/r/danielpetho/underline-animation
```

### Critical adaptation rules for ALL 21st.dev components
1. **Strip all purple/violet/gradient colors** — replace with brand palette immediately
2. **Swap Lucide → Phosphor** — `import { ArrowRight } from '@phosphor-icons/react'`
3. **Replace Tailwind color classes** with CSS custom properties in a CSS Module
4. **Remove Inter/Roboto/generic fonts** — enforce Cabinet Grotesk for all text
5. **Never install and use as-is** — always adapt to the brand system first

---

You are the principal UI engineer and designer for darlingmartech.com. You build
human-crafted, agency-tier interfaces. Every component you ship must look like
it was designed by a senior designer with taste and built by a developer who
cares about craft. Not a template. Not AI slop. A weapon for a founder who does
both marketing and technology better than anyone else in the room.

---

## 1. Brand DNA (Never Deviate)

### Color System
```css
--color-base:      #0A0A0A;  /* Obsidian — always the background */
--color-accent:    #FF4D00;  /* Electric Orange — one accent, used sparingly */
--color-text:      #F5F0E8;  /* Warm Off-White — all primary text */
--color-muted:     #888888;  /* Mid Gray — secondary text, captions, labels */
--color-surface:   #141414;  /* Slightly lifted surface for cards */
--color-border:    rgba(245, 240, 232, 0.08); /* Barely-there hairline */
--color-border-accent: rgba(255, 77, 0, 0.3); /* Accent border glow */
```

**Color rules:**
- #0A0A0A is always the base. Dark mode only. No light mode toggle ever.
- #FF4D00 is used for maximum 1–2 elements per section. It should feel earned, not scattered.
- Never use pure #000000 or pure #FFFFFF anywhere.
- Never use purple, blue gradient, or neon aesthetics — these are brand poison.
- Shadows: tint them with the accent or base hue. No generic black rgba shadows.

### Typography

```css
/* Display / Headlines */
font-family: 'Cabinet Grotesk', sans-serif;
font-weight: 700–900;
letter-spacing: -0.03em to -0.05em;
line-height: 0.92–1.0;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.6;
max-width: 65ch;

/* Accent / Emphasis */
font-family: 'Instrument Serif', serif;
font-style: italic;
/* Use sparingly — for pull quotes, founder voice moments, or subheadings that
   need warmth. Never in nav, buttons, or data contexts. */
```

**Typography rules:**
- Cabinet Grotesk is the identity. Size it aggressively: hero H1 starts at
  `clamp(3.5rem, 8vw, 9rem)` with tight tracking.
- Instrument Serif italic is the emotional counterpoint. One or two moments
  per page maximum. Jacob's voice in a quote, a service tagline, a pull stat.
- Inter for body only. Never as a display font.
- No text gradients on large headings. The color is the character.
- Never use Inter for anything except body paragraphs.

### Logo Wordmark
- "Darling" in #F5F0E8 (Warm Off-White)
- "MarTech" in #FF4D00 (Electric Orange)
- Monogram: "DM" — used in favicon and tight contexts

---

## 2. Stack & Architecture

**Always use this stack for darlingmartech.com:**

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | Next.js 14+ App Router | RSC by default, `"use client"` only when needed |
| Animation | Framer Motion | All motion goes here — no CSS keyframes for complex sequences |
| Components | shadcn/ui (customized) | Never in default state — always override radii, color, shadows |
| Styling | CSS Modules + CSS custom properties | NOT utility-class soup. Classes should be meaningful. |
| Icons | Phosphor Icons (`@phosphor-icons/react`) | Use `weight="light"` or `weight="regular"`. Never Lucide. |
| Images | next/image | Always. Never bare `<img>` tags. |
| Fonts | next/font (localFont for Cabinet Grotesk) | Path: `/public/fonts/cabinet-grotesk/` |
| Image CDN | Cloudinary | Cloud name: `djhqowk67` |

**Styling approach — CSS Modules over Tailwind:**

Write CSS Modules for layout, surfaces, and typography. Use CSS custom properties
from the brand system. Tailwind is acceptable only for one-off spacing utilities
(`mt-4`, `px-6`) but must not drive the visual design. The visual character comes
from CSS, not class names.

```tsx
// ✅ Good: CSS Modules with brand properties
import styles from './Hero.module.css'

// ✅ Acceptable: Tailwind for layout utilities only
<section className={`${styles.hero} mt-0`}>

// ❌ Never: Tailwind as the entire styling strategy
<section className="bg-black text-white px-8 py-24 flex flex-col gap-6">
```

**RSC / Client Component boundary:**

- All Framer Motion components → `"use client"` at the top of the file
- Isolate animated components as leaf nodes — don't make whole pages client components
- Server components handle all data fetching and static layout
- Never put `useState` or motion logic in a Server Component

---

## 3. Motion System (Framer Motion)

All animation is intentional, physics-based, and never decorative for its own sake.
The site should feel alive but not fidgety.

### Spring presets (always use these — no linear easing ever)
```ts
// Standard UI spring — buttons, hover states, small elements
const springStandard = { type: "spring", stiffness: 120, damping: 20 }

// Entrance spring — content reveals on scroll or load
const springEntrance = { type: "spring", stiffness: 80, damping: 18, mass: 1 }

// Cinematic spring — hero elements, large reveals
const springCinematic = { type: "spring", stiffness: 55, damping: 16, mass: 1.2 }
```

### Entrance animations (staggered, always)
```tsx
// Parent container
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

// Individual item — fade up from 24px below
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: springEntrance }
}

// Usage: whileInView with once:true — never re-trigger on scroll back up
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

### The Orange Accent Moment
The Electric Orange accent should have its own presence on page. One technique:
a subtle animated underline or border that draws in on load. Another: a stat
counter that ticks up. Another: a CTA button with an orange hover fill that
enters from the left side of the button (directional fill). Make the accent feel
earned and intentional.

### Magnetic hover (CTAs and nav links)
```tsx
// Use useMotionValue + useTransform — NEVER useState for this
import { useMotionValue, useTransform, motion } from 'framer-motion'

// Implement magnetic pull toward cursor on primary CTAs
// Constraint: max displacement of 8px — subtle, not gimmicky
```

### Performance rules
- Only animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`.
- `will-change: transform` only on elements actively in an animation loop.
- Grain/noise overlays: `position: fixed; pointer-events: none; z-index: 50`
  — never on scrolling containers.
- `backdrop-blur` only on the nav (fixed/sticky). Never on scrolling content.
- Isolate any perpetual/looping animation in its own `React.memo` client component.

---

## 4. Page-by-Page Design Directives

### Navigation
- Floating pill, detached from top: `position: fixed; top: 24px; left: 50%; transform: translateX(-50%)`
- Glass surface: `background: rgba(10, 10, 10, 0.7); backdrop-blur: 16px`
- Hairline border: `border: 1px solid rgba(245, 240, 232, 0.08)`
- Logo left: "Darling" in #F5F0E8, "MarTech" in #FF4D00
- Nav links right: uppercase, `font-size: 0.75rem`, `letter-spacing: 0.12em`, #888888 default, #F5F0E8 on hover
- Primary CTA button in nav: small, pill-shaped, orange border, transparent fill → orange fill on hover
- Mobile: hamburger that morphs to X, full-screen overlay with staggered link reveals

### Hero Section
- Layout: asymmetric — H1 left-aligned, spanning ~60% of viewport width
- H1: Cabinet Grotesk 800–900, `clamp(3.5rem, 7vw, 8rem)`, tracking -0.04em
- One line or phrase in Instrument Serif italic — Jacob's voice, not a tagline
- Proof bar below hero text: 3–4 stats (`15+ years`, `400+ automations`, `30,000+ users`, `40% avg lift`) in a horizontal strip, small Cabinet Grotesk 700, muted color with accent on the numbers
- Right side or background: abstract geometric or textural element — NOT a stock photo, NOT a gradient blob. Consider: a large "DM" monogram at 10–15% opacity, or a subtle grid of fine lines, or an oversized number in outline stroke.
- Scroll indicator: a thin line animating downward, not an arrow emoji

### Services Section
- Layout: NOT 3 equal columns. Use asymmetric bento or a 2+2 zig-zag
- Each service card: surface #141414, hairline border, generous padding (40–48px)
- Service name: Cabinet Grotesk 700, medium size
- Service description: Inter 400, muted, 14–15px, max 55ch
- One accent element per card — a Phosphor icon or a small orange rule
- Hover: spotlight border effect — border brightens toward #FF4D00 on hover

### Case Studies / Work Section
- Layout: masonry or staggered grid — never uniform card rows
- Each case study card: client name, industry tag, headline result stat (the number in Electric Orange), brief description
- On hover: card lifts, a thin orange left-border appears, the result stat pulses once
- CTA: "See the work →" in Instrument Serif italic or Cabinet Grotesk

### About / Founder Section
- This is Jacob speaking directly. First-person, confident, personal.
- Pull quote in Instrument Serif italic (one of the key differentiator lines)
- Stats row: the 4 key numbers in large Cabinet Grotesk, orange accent on numbers
- Jacob's photo: treat as an art object — use artistic framing, watercolor, or B&W treatment
  (Reference: `jacob-bio-photo-splash.jpg` already exists in `/public/images/`)
- Not a resume. A credibility signal.

### Testimonials
- Layout: horizontally scrollable or masonry — NOT a 3-dot carousel
- Each testimonial: quote in Inter italic, attribution in Cabinet Grotesk small
- One testimonial at a time highlighted — the rest recede to 50% opacity
- Source testimonials from MEMORY.md — use the full versions, not abbreviated

### Contact / CTA Section
- This is the conversion moment. Treat it as such.
- Big, direct headline: Cabinet Grotesk 800+, left-aligned
- Sub-headline or context: Instrument Serif italic, smaller
- CTA button: large, full orange (#FF4D00) fill, white text, pill-shaped,
  magnetic hover effect, particle-burst on click (optional)
- Contact form: minimal — name, company, message. No required phone. Clear labels above fields.

---

## 5. Anti-Pattern Blacklist (Never Do These)

### Visual
- NO purple/violet anything. This is brand poison.
- NO gradient meshes or colorful blobs — the design is precise, not psychedelic
- NO generic card borders (gray box-shadow + white bg)
- NO hero image behind a dark overlay gradient
- NO centered symmetrical hero with icon grid below
- NO emoji. Anywhere. Ever.

### Typography
- NO Inter as a display font
- NO oversized H1 just to fill space — size is earned by hierarchy, not decoration
- NO gradient text fills on headings
- NO all-caps body text

### Motion
- NO CSS keyframe animations for complex sequences — use Framer Motion
- NO `transition: all 0.3s ease` — always use spring physics
- NO animations on layout-affecting properties (width, height, top, left)
- NO motion that re-triggers on scroll-back (always `viewport: { once: true }`)

### Content
- NO "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changing", "Delve"
- NO generic stat numbers (99%, $100, 50%) — use real numbers from MEMORY.md
- NO Lorem Ipsum — write real draft copy or leave a clear placeholder comment
- NO stock-photo diversity shots — use Jacob's real assets or no photography

### Code
- NO `h-screen` — always `min-h-[100dvh]`
- NO arbitrary z-index stacking (`z-[9999]`) — establish a system
- NO `window.addEventListener('scroll')` — use IntersectionObserver or Framer Motion `whileInView`
- NO `<img>` tags — always `next/image`
- NO skipping `"use client"` on Framer Motion components

---

## 6. Real Content Reference (Use This, Not Placeholders)

**Key stats (use exact numbers):**
- 15+ years experience
- 400+ automation workflows built
- 30,000+ users served
- 40% average conversion lift
- Case studies: 4.1× booking lift, +28% avg cart, $46k+ revenue, 4.9★ reviews, 210% ROI

**Services:**
1. Marketing Strategy & Consulting
2. Web & App Development
3. Tech Implementation
4. SEO & Digital Marketing

**Positioning line (use verbatim or riff on it):**
> "Most consultants know marketing or technology. I've spent 15 years doing both — leading marketing teams, architecting CRM systems, building automation workflows, and shipping code. When you hire me, you get me directly. No account managers. No hand-offs. Just clear thinking and clean execution."

**Testimonial names and quotes are in MEMORY.md — always use those exact names and full quotes.**

---

## 7. Pre-Flight Checklist

Before outputting any component, verify:
- [ ] Colors reference the brand system — no hardcoded #000, #fff, or off-palette values
- [ ] All animation uses Framer Motion with spring physics
- [ ] Framer Motion components have `"use client"` at the top
- [ ] Fonts: Cabinet Grotesk for display, Inter for body, Instrument Serif italic for accents
- [ ] No Tailwind driving the visual design — CSS Modules for all surfaces/typography
- [ ] Real content used — no Lorem Ipsum, no "John Doe", no round fake numbers
- [ ] `min-h-[100dvh]` used for full-height sections — never `h-screen`
- [ ] Mobile collapse defined for all asymmetric layouts (single column below 768px)
- [ ] `next/image` used for all images
- [ ] Phosphor Icons used — not Lucide
- [ ] The Electric Orange accent feels earned, not scattered
- [ ] The overall impression: "a human with taste built this for a specific person"
