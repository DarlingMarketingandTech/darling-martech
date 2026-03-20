---
name: darling-martech-redesign
description: >
  Redesign and upgrade skill for darlingmartech.com. Audits existing code for
  AI-generated patterns, generic aesthetics, Tailwind over-reliance, and brand
  inconsistencies, then applies targeted fixes to move the site toward
  human-crafted, agency-tier quality. Use this skill when reviewing existing
  pages or components, when something "looks AI-generated" or "too generic",
  when migrating from Tailwind utility soup to CSS Modules, when adding Framer
  Motion to static sections, or when Phase 2 pages need to match the premium
  standard of a redesigned Phase 1. Triggers on: "audit this component",
  "this looks generic", "upgrade the homepage", "refactor the styling",
  "add motion to this section", "migrate away from Tailwind", "review the site",
  "it doesn't feel premium", or any request to improve existing darlingmartech.com code.
---

# Darling MarTech — Redesign & Upgrade Skill

---

## 0. Approved 21st.dev Component Swaps

When auditing existing code and finding generic AI patterns, these are approved
drop-in replacements from 21st.dev. All require brand adaptation (see rules below).

| Existing Pattern to Replace | 21st.dev Replacement | URL |
|-----------------------------|---------------------|-----|
| Static sticky navbar / generic header | AnimatedNavFramer — floating pill, collapses on scroll | `https://21st.dev/community/components/reapollo/navigation-menu/default` |
| Centered hero with dark overlay | Hero ASCII — left-aligned, geometric illustration right | `https://21st.dev/community/components/reapollo/hero-ascii/default` |
| Flat dark background / plain #0A0A0A | Background Paths — animated wire paths at 15–20% opacity | `https://21st.dev/community/components/kokonutd/background-paths/default` |
| Generic white card + shadow | Grid Card — dark surface + animated grid pattern + gradient hover | `https://21st.dev/community/components/efferd/grid-card/default` |
| Generic `<button>` or plain CTA | Button Colorful — directional hover fill from left, arrow icon | `https://21st.dev/community/components/kokonutd/button-colorful/default` |
| CSS underline on links / no hover state | Underline Animation — 3 variants, Framer-powered | `https://21st.dev/community/components/danielpetho/underline-animation/default` |

### Brand adaptation rules (apply to EVERY 21st.dev component)
1. **Colors** — Replace all purple/blue/gradient with `--color-accent: #FF4D00`, `--color-base: #0A0A0A`, `--color-text: #F5F0E8`, `--color-muted: #888888`
2. **Icons** — Swap any `lucide-react` import to `@phosphor-icons/react` with `weight="light"` or `"regular"`
3. **Fonts** — Replace any font-family with `var(--font-display)` (Cabinet Grotesk) for headings, `var(--font-body)` (Inter) for paragraphs
4. **Tailwind color classes** — Move to CSS Modules with CSS custom properties; keep only layout utilities
5. **Motion** — If the component uses CSS transitions, upgrade to Framer Motion spring physics using the brand spring presets

---

You are auditing and upgrading existing code for darlingmartech.com. Your job is
to identify everything that reads as AI-generated, generic, or off-brand, and
fix it with precision. You don't rewrite for the sake of rewriting — you
diagnose first, then operate.

The site is dark mode only. Stack: Next.js 14 App Router, Framer Motion,
shadcn/ui (customized), CSS Modules + CSS properties, Phosphor Icons.
Brand: Obsidian base (#0A0A0A), Electric Orange accent (#FF4D00), Warm Off-White
text (#F5F0E8). Display: Cabinet Grotesk. Body: Inter. Accent: Instrument Serif italic.

---

## 1. Audit Protocol

When reviewing any existing page, section, or component, run through all five
dimensions below. Mark each as ✅ Pass, ⚠️ Warn, or ❌ Fix.

### Dimension 1: Brand Fidelity
- [ ] Base color is #0A0A0A (not pure black, not navy, not #111)
- [ ] Only one accent color in use: #FF4D00. No purples, blues, teals.
- [ ] Text is #F5F0E8 (not pure white #ffffff)
- [ ] Secondary text is #888888 (not Tailwind's `text-gray-500` unless it maps to this)
- [ ] Cabinet Grotesk loaded and used for all display/headline text
- [ ] Instrument Serif italic used only for emotional accent moments (never in nav or UI)
- [ ] Inter used for body text only
- [ ] No gradient fills on headings
- [ ] Electric Orange appears at most 1–2 times per section and feels intentional

### Dimension 2: Typography
- [ ] Hero H1 is large, tight-tracked Cabinet Grotesk — not centered over a generic tagline
- [ ] No `font-family: Inter` anywhere outside of body/paragraph contexts
- [ ] Heading hierarchy is logical (single H1 per page)
- [ ] Body text has `max-width: 65ch` and `line-height: 1.6`
- [ ] No widowed words — `text-wrap: balance` or `text-wrap: pretty` applied to headings
- [ ] Numbers in data contexts use `font-variant-numeric: tabular-nums`
- [ ] No all-caps body text (labels/nav uppercase at 11–12px only with generous tracking)

### Dimension 3: Layout
- [ ] Hero is asymmetric (left-aligned, split-screen, or offset) — NOT centered text over dark bg
- [ ] No 3-equal-column card rows as the primary feature layout
- [ ] No `height: 100vh` — confirm `min-height: 100dvh` on full-height sections
- [ ] Max-width container exists (`max-w-[1400px] mx-auto` or similar)
- [ ] Complex layouts use CSS Grid, not flexbox percentage math
- [ ] Cards use elevation only when hierarchy demands it — not on every block of text
- [ ] Asymmetric layouts collapse to single column below 768px with no horizontal scroll

### Dimension 4: Motion & Interactivity
- [ ] All animations use Framer Motion with spring physics — no `transition: all 0.3s ease`
- [ ] Framer Motion components are isolated `"use client"` components
- [ ] Entrance animations use `whileInView` with `once: true`
- [ ] No `window.addEventListener('scroll')` — use IntersectionObserver or Framer `whileInView`
- [ ] Hover states exist on all interactive elements (buttons, nav links, cards)
- [ ] Active/press state: `scale(0.98)` or `translateY(1px)` on button press
- [ ] No instant state changes — all transitions interpolated with spring
- [ ] No animations on layout properties (width, height, top, left)

### Dimension 5: Code Quality
- [ ] All images use `next/image` (never `<img>`)
- [ ] Icons use Phosphor (`@phosphor-icons/react`) — no Lucide, no Feather
- [ ] Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- [ ] No emoji in markup, text, or alt text
- [ ] Alt text is descriptive on all meaningful images
- [ ] No `z-[9999]` stacking — z-index is systematic
- [ ] No commented-out dead code
- [ ] Metadata export in every `page.tsx`
- [ ] `.env.local` not in git

---

## 2. Fix Priority Order

Apply fixes in this order — maximum impact, minimum breakage risk:

1. **Brand color audit** — Replace any off-palette values with CSS custom properties
2. **Font swap** — Ensure Cabinet Grotesk is loaded and applied to all display contexts
3. **Hero layout break** — If the hero is centered and symmetrical, restructure to left-aligned asymmetric
4. **Replace Tailwind visual styling with CSS Modules** — Move colors, typography, shadows, surfaces to CSS
5. **Add Framer Motion entrance sequences** — Staggered reveals on all major content sections
6. **Hover and interaction states** — Make every interactive element feel physical
7. **Replace generic card patterns** — Spotlight borders, hairline edges, or spacing-only separation
8. **Polish** — Typography scale, optical spacing, accent placement

---

## 3. Tailwind → CSS Modules Migration Pattern

When migrating a component from Tailwind utility soup to the CSS Modules system:

**Before (Tailwind):**
```tsx
<section className="bg-black min-h-screen flex flex-col items-center justify-center px-8 py-24">
  <h1 className="text-white text-6xl font-bold tracking-tight text-center">
    Marketing that moves.
  </h1>
</section>
```

**After (CSS Modules + brand properties):**
```tsx
// Hero.module.css
.section {
  background: var(--color-base);
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 clamp(1.5rem, 5vw, 6rem);
}

.headline {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3.5rem, 7vw, 8rem);
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--color-text);
  text-align: left; /* Never center for hero */
}

@media (max-width: 768px) {
  .section { grid-template-columns: 1fr; padding: 6rem 1.5rem 4rem; }
}
```

Keep Tailwind only for structural utilities that genuinely don't need names:
`mt-4`, `px-6`, `gap-8`. Remove it from anything that touches color, typography,
or surfaces.

---

## 4. Framer Motion Addition Pattern

When adding Framer Motion to an existing static section:

```tsx
"use client"

import { motion } from 'framer-motion'

// Always define variants outside the component
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 }
  }
}

// Wrap the section in a motion container
export function ServiceSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={styles.section}
    >
      {services.map((s) => (
        <motion.div key={s.id} variants={item} className={styles.card}>
          {/* card content */}
        </motion.div>
      ))}
    </motion.section>
  )
}
```

Key rules:
- `viewport={{ once: true }}` — never re-animate on scroll back
- Stagger delay of 60–100ms feels natural — tighter feels mechanical
- Blend opacity fade with a Y-axis translate (never X unless intentional directionality)

---

## 5. Card Upgrade Patterns

### Replace generic card (white bg + gray border + shadow):
```css
/* ❌ Before */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ✅ After — lifted dark surface with spotlight hover */
.card {
  background: var(--color-surface);   /* #141414 */
  border: 1px solid var(--color-border); /* rgba(245,240,232,0.08) */
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.card:hover {
  border-color: var(--color-border-accent); /* rgba(255,77,0,0.3) */
}

/* Spotlight effect via CSS — no JS needed */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 77, 0, 0.04) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}
```

### Replace 3-column equal feature grid:
```tsx
/* ❌ Never: 3 equal columns */
<div className="grid grid-cols-3 gap-6">

/* ✅ Instead: asymmetric bento with varied weights */
<div className={styles.bentoGrid}>
  {/* CSS: grid-template-columns: 2fr 1fr; with the first item spanning 2 rows */}
```

---

## 6. Common Phase 1 → Phase 2 Upgrade Checklist

When building Phase 2 pages (/work, /lab, /studio) to match a redesigned Phase 1:

**Work / Case Studies page:**
- [ ] Masonry or staggered grid layout — not uniform card rows
- [ ] Each card: client name (Cabinet Grotesk), industry label (small, muted, uppercase), result stat (#FF4D00)
- [ ] Orange left-border reveal on hover via CSS transform (`scaleY` from 0 to 1)
- [ ] Framer Motion staggered entrance for card grid

**Lab page:**
- [ ] Tool cards as "machine" objects — not app tiles
- [ ] Short, direct descriptions (what it does, not what it "empowers you to do")
- [ ] Link to deployed apps — real destinations, not `href="#"`

**Studio page:**
- [ ] Cloudinary gallery (cloud: djhqowk67, folders: /studio/photography/, /studio/graphic-design/, /studio/proof/)
- [ ] Masonry layout or horizontal scroll — not uniform grid
- [ ] Lazy loading with `next/image` blur placeholders

---

## 7. Content Anti-Patterns to Purge

If you find any of the following in existing copy while auditing, flag and fix:

| Found | Replace With |
|-------|-------------|
| "Elevate your..." | Direct verb: "Build your...", "Grow your..." |
| "Seamless experience" | Describe what actually happens |
| "Unleash the power of" | Delete. State the outcome. |
| "Next-generation" | Specific technology name |
| "Game-changer" | Specific result stat |
| "John Doe" / "Jane Smith" | Real or contextual names |
| Round numbers (50%, $100) | Real numbers from MEMORY.md |
| Lorem Ipsum | Real copy or a `{/* TODO: real copy */}` comment |
| Exclamation marks in success states | Confident, calm confirmation |
| "Oops!" error messages | "Something went wrong. Try again." |

---

## 8. Redesign Output Format

When completing a redesign audit, always deliver in this order:

1. **Audit findings** — what was found across the 5 dimensions, what failed
2. **Prioritized fix list** — ordered by impact, not alphabetical
3. **Upgraded code** — complete, no `// ... rest of component` shortcuts
4. **What changed and why** — brief rationale for non-obvious decisions

Never deliver partial code. If a section is long, pause at a clean boundary and
note `[PAUSED — continue for: next section]` rather than truncating mid-component.
