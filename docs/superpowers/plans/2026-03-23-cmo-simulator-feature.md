# CMO Simulator Featured Tool & Lead Gate — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Promote the CMO Simulator to a featured tool on the home page and /lab, and add a name+email lead-capture gate page at `/lab/cmo-simulator` that notifies jacob@jacobdarling.com via Resend on each signup.

**Architecture:** Three independently deliverable tasks — (1) a new `FeaturedTool` RSC + client motion component inserted on the home page, (2) a featured hero card added above the /lab grid with CMO Simulator removed from the regular tools array, and (3) a new `/lab/cmo-simulator` gate page (`'use client'`) with a Resend-backed API route. Each task can be committed and tested independently.

**Tech Stack:** Next.js 16 App Router, Framer Motion 11, CSS Modules, React Hook Form, Zod, Resend, @phosphor-icons/react

---

## File Map

| File | Role | Action |
|------|------|--------|
| `components/sections/FeaturedTool.tsx` | RSC shell — outer `<section>`, no animation | Create |
| `components/sections/FeaturedToolInner.tsx` | `'use client'` — all Framer Motion, pulsing dot, whileInView | Create |
| `components/sections/FeaturedTool.module.css` | Layout + card layers for the home section | Create |
| `app/page.tsx` | Home page — insert `<FeaturedTool />` between `<AboutTeaser />` and `<CaseStudies />` | Edit |
| `app/lab/page.tsx` | Remove CMO Simulator from `tools` array; add `LabFeaturedCard` above grid | Edit |
| `app/lab/Lab.module.css` | Add featured card CSS classes | Edit |
| `app/lab/cmo-simulator/page.tsx` | Gate page — `'use client'`, session bypass, React Hook Form | Create |
| `app/lab/cmo-simulator/CmoSimulator.module.css` | Gate page layout + form panel styles | Create |
| `app/api/cmo-simulator-access/route.ts` | Edge API route — Zod validation + Resend notification | Create |

---

## Task 1: API Route — `/api/cmo-simulator-access`

Start here — the API route is the dependency for Task 3. Build it first so the gate page has something real to POST to.

**Files:**
- Create: `app/api/cmo-simulator-access/route.ts`

- [ ] **Step 1: Create the API route file**

```ts
// app/api/cmo-simulator-access/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const runtime = 'edge'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Darling MarTech <noreply@darlingmartech.com>',
      to: ['jacob@jacobdarling.com'],
      subject: `New CMO Simulator signup — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Time: ${new Date().toISOString()}`,
        '',
        'Sent from darlingmartech.com/lab/cmo-simulator',
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('CMO Simulator access error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

Navigate to `http://localhost:3000` in the browser. Check the terminal running `next dev` — no red errors should appear after the new file is saved.

Expected: `✓ Ready` — no TypeScript or compilation errors.

- [ ] **Step 3: Manual smoke-test the route**

```bash
curl -X POST http://localhost:3000/api/cmo-simulator-access \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

Expected (RESEND_API_KEY present): `{"success":true}`
Expected (RESEND_API_KEY missing): `{"error":"Failed to send notification"}` with status 500 — acceptable for local dev without the key.

Expected (bad payload):
```bash
curl -X POST http://localhost:3000/api/cmo-simulator-access \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"not-an-email"}'
```
Should return `400` with Zod error array.

- [ ] **Step 4: Commit**

```bash
git add app/api/cmo-simulator-access/route.ts
git commit -m "feat: add CMO Simulator access API route with Resend notification"
```

---

## Task 2: Home Page — `FeaturedTool` Section

**Files:**
- Create: `components/sections/FeaturedTool.tsx`
- Create: `components/sections/FeaturedToolInner.tsx`
- Create: `components/sections/FeaturedTool.module.css`
- Edit: `app/page.tsx`

- [ ] **Step 1: Create the CSS module**

```css
/* components/sections/FeaturedTool.module.css */

.section {
  padding: 6rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .section {
    padding: 6rem 2.5rem;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
  }
}

/* ── Copy ── */

.eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.5rem;
}

.heading {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 0.97;
  letter-spacing: -0.03em;
  color: var(--color-text);
  text-wrap: balance;
  margin: 0 0 1.5rem;
}

.headingAccent {
  font-style: italic;
  color: var(--color-accent);
  font-family: var(--font-accent);
}

.body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 44ch;
  margin: 0 0 2rem;
}

.ctaRow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ctaPrimary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.ctaGhost {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.875rem;
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1px;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.ctaGhost:hover {
  border-color: var(--color-border-accent);
  color: var(--color-text);
}

/* ── Visual card ── */

.card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.cardGrid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 240, 232, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 240, 232, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

.cardGlow {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 77, 0, 0.18), transparent 70%);
  top: -60px;
  right: -60px;
  border-radius: 50%;
  pointer-events: none;
}

.cardSweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, rgba(255, 77, 0, 0.06) 0%, transparent 50%);
}

.cardBadge {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 77, 0, 0.15);
  border: 1px solid rgba(255, 77, 0, 0.3);
  border-radius: 100px;
  padding: 0.3rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  z-index: 1;
}

.pulseDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

.cardCenter {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 1;
}

.iconBox {
  width: 72px;
  height: 72px;
  border: 1px solid var(--color-border-accent);
  border-radius: 16px;
  background: rgba(255, 77, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardLabel {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-align: center;
}

.cardSublabel {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-muted);
  text-align: center;
  margin-top: -0.5rem;
}

.cardStats {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  right: 1.25rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
}

.cardStat {
  background: rgba(10, 10, 10, 0.7);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  flex: 1;
}

.statValue {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--color-accent);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.statLabel {
  font-family: var(--font-body);
  font-size: 0.6rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

- [ ] **Step 2: Create the client motion component**

```tsx
// components/sections/FeaturedToolInner.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Megaphone } from '@phosphor-icons/react'
import { containerVariants, itemVariants, springEntrance, viewport } from '@/lib/motion'
import styles from './FeaturedTool.module.css'

export function FeaturedToolInner() {
  return (
    <div className={styles.container}>
      {/* Left — copy */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.p variants={itemVariants} className={styles.eyebrow}>
          Featured Tool
        </motion.p>
        <motion.h2 variants={itemVariants} className={styles.heading}>
          Run a full CMO<br />strategy session.<br />
          <em className={styles.headingAccent}>Right now.</em>
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.body}>
          Walk through the same decision-making framework I use with clients — budget
          allocation, channel strategy, KPI selection, and execution priority — in about
          10 minutes. Free. No agenda.
        </motion.p>
        <motion.div variants={itemVariants} className={styles.ctaRow}>
          <Link href="/lab/cmo-simulator" className={styles.ctaPrimary}>
            Try the CMO Simulator →
          </Link>
          <Link href="/lab" className={styles.ctaGhost}>
            Browse all lab tools
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — visual card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.cardGrid} aria-hidden="true" />
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.cardSweep} aria-hidden="true" />

        <div className={styles.cardBadge}>
          <motion.span
            className={styles.pulseDot}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          Live · Production
        </div>

        <div className={styles.cardCenter}>
          <div className={styles.iconBox}>
            <Megaphone weight="light" size={32} color="var(--color-accent)" />
          </div>
          <div>
            <p className={styles.cardLabel}>CMO Simulator</p>
            <p className={styles.cardSublabel}>Marketing · Next.js · Vercel</p>
          </div>
        </div>

        <div className={styles.cardStats}>
          {[
            { value: '~10m', label: 'Avg session' },
            { value: 'CMO', label: 'Framework' },
            { value: 'Free', label: 'No catch' },
          ].map((stat) => (
            <div key={stat.label} className={styles.cardStat}>
              <p className={styles.statValue}>{stat.value}</p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 3: Create the RSC shell**

```tsx
// components/sections/FeaturedTool.tsx
import { FeaturedToolInner } from './FeaturedToolInner'
import styles from './FeaturedTool.module.css'

export function FeaturedTool() {
  return (
    <section className={styles.section} aria-label="Featured tool — CMO Simulator">
      <FeaturedToolInner />
    </section>
  )
}
```

- [ ] **Step 4: Insert `<FeaturedTool />` in `app/page.tsx`**

Open `app/page.tsx`. The current import block and return are:

```tsx
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'
```

Add the import and insert the component:

```tsx
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { FeaturedTool } from '@/components/sections/FeaturedTool'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'
```

In the return:

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutTeaser />
      <FeaturedTool />
      <CaseStudies />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 5: Visual check in browser**

Open `http://localhost:3000`. Scroll past AboutTeaser. Verify:
- Two-column layout visible (copy left, card right) on desktop
- Orange eyebrow "Featured Tool" visible
- Headline renders with italic orange "Right now."
- Card shows grid texture, orange glow, pulsing dot in badge
- Stats chips visible at bottom of card
- "Try the CMO Simulator →" button links to `/lab/cmo-simulator`
- "Browse all lab tools" links to `/lab`
- Framer Motion entrance animations fire on scroll into view

- [ ] **Step 6: Mobile check**

Resize browser to 375px wide. Verify:
- Single column, copy above card
- No horizontal scroll
- Headline readable without zooming

- [ ] **Step 7: Commit**

```bash
git add components/sections/FeaturedTool.tsx components/sections/FeaturedToolInner.tsx components/sections/FeaturedTool.module.css app/page.tsx
git commit -m "feat: add FeaturedTool section to home page for CMO Simulator"
```

---

## Task 3: `/lab` Page — Featured Hero Card

**Files:**
- Edit: `app/lab/page.tsx`
- Edit: `app/lab/Lab.module.css`

- [ ] **Step 1: Add featured card CSS to Lab.module.css**

Append these classes to the end of `app/lab/Lab.module.css`:

```css
/* ── Featured card (CMO Simulator hero) ── */

.featuredCard {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 280px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border-accent);
  margin-bottom: 3rem;
  background: var(--color-surface);
}

@media (min-width: 768px) {
  .featuredCard {
    grid-template-columns: 1fr 1fr;
  }
}

.featuredLeft {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .featuredLeft {
    border-bottom: none;
    border-right: 1px solid var(--color-border);
  }
}

.featuredPill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 77, 0, 0.12);
  border: 1px solid rgba(255, 77, 0, 0.25);
  border-radius: 100px;
  padding: 0.3rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  width: fit-content;
}

.featuredTitle {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.75rem;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin: 0 0 0.75rem;
}

.featuredDesc {
  font-family: var(--font-body);
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.65;
  max-width: 44ch;
  margin: 0 0 1.5rem;
}

.featuredStack {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.featuredCta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  text-decoration: none;
  width: fit-content;
}

.featuredRight {
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.featuredRightGrid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 240, 232, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 240, 232, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}

.featuredRightGlow {
  position: absolute;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(255, 77, 0, 0.15), transparent 70%);
  top: -40px;
  right: -40px;
  border-radius: 50%;
  pointer-events: none;
}

.featuredRightContent {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.featuredIconBox {
  width: 80px;
  height: 80px;
  border: 1px solid var(--color-border-accent);
  border-radius: 18px;
  background: rgba(255, 77, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.featuredStats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.featuredStat {
  text-align: center;
}

.featuredStatValue {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--color-accent);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.featuredStatLabel {
  font-family: var(--font-body);
  font-size: 0.65rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.25rem;
}

.featuredStatDivider {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}
```

- [ ] **Step 2: Add `LabFeaturedCard` component and update the tools array in `app/lab/page.tsx`**

At the top of the file, the existing imports already include `Megaphone` — if not, add it. The `motion` import is already there.

**Remove** the CMO Simulator entry from the `tools` array (currently line 31):
```ts
// DELETE this line:
{ name: 'CMO Simulator', category: 'Marketing', status: 'Production', description: 'Interactive simulator that walks through CMO-level decision-making across strategy, budget, and execution scenarios.', stack: ['Next.js', 'React', 'Vercel'], url: 'https://cmo-simulator-3il5.vercel.app' },
```

**Add `import Link from 'next/link'`** at the top of the file if not already present (check existing imports — the file does not currently import Link).

**Add** the `LabFeaturedCard` component after the existing `ToolCard` function (around line 139), before `export default function LabPage()`:

```tsx
function LabFeaturedCard() {
  return (
    <div className={styles.featuredCard}>
      <div className={styles.featuredLeft}>
        <div>
          <div className={styles.featuredPill}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            Production · Featured
          </div>
          <h2 className={styles.featuredTitle}>CMO Simulator</h2>
          <p className={styles.featuredDesc}>
            Walk through CMO-level decision-making — budget allocation, channel strategy,
            KPI selection, and execution priority. Same framework I use with clients.
            Takes about 10 minutes.
          </p>
          <div className={styles.featuredStack}>
            {['Next.js', 'React', 'Vercel', 'Marketing Strategy'].map((tag) => (
              <span key={tag} className={styles.toolCoverTag}>{tag}</span>
            ))}
          </div>
        </div>
        <Link href="/lab/cmo-simulator" className={styles.featuredCta}>
          Launch CMO Simulator →
        </Link>
      </div>

      <div className={styles.featuredRight}>
        <div className={styles.featuredRightGrid} aria-hidden="true" />
        <div className={styles.featuredRightGlow} aria-hidden="true" />
        <div className={styles.featuredRightContent}>
          <div className={styles.featuredIconBox}>
            <Megaphone weight="light" size={36} color="var(--color-accent)" />
          </div>
          <div className={styles.featuredStats}>
            <div className={styles.featuredStat}>
              <p className={styles.featuredStatValue}>~10m</p>
              <p className={styles.featuredStatLabel}>Session</p>
            </div>
            <div className={styles.featuredStatDivider} />
            <div className={styles.featuredStat}>
              <p className={styles.featuredStatValue}>Free</p>
              <p className={styles.featuredStatLabel}>Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Insert `<LabFeaturedCard />` above the filters section** in `LabPage()`. The current JSX structure inside `<div className={styles.inner}>` is:

```tsx
<section className={styles.telemetryPanel}>
  {/* telemetry + header + filters */}
</section>

{/* Tools grid */}
<motion.div className={styles.grid} ...>
```

Insert `<LabFeaturedCard />` between the `</section>` and the grid `<motion.div>`:

```tsx
</section>

{/* Featured tool — CMO Simulator */}
<LabFeaturedCard />

{/* Tools grid */}
<motion.div
  className={styles.grid}
  ...
```

This places the featured card between the telemetry/header/filter section and the tool grid — above the grid, below the filter buttons.

- [ ] **Step 3: Visual check in browser**

Open `http://localhost:3000/lab`. Verify:
- Featured card appears below the filter buttons and above the tool grid (between the telemetryPanel section and the grid)
- Orange accent border on the featured card
- Pulsing dot in the pill badge animates
- "Launch CMO Simulator →" button present, links to `/lab/cmo-simulator`
- CMO Simulator is no longer duplicated in the tool grid below
- Filter count for "All" is one less than before (reflects removal from array)
- "Marketing" filter count also decreased by one

- [ ] **Step 4: Mobile check at 375px**

- Featured card stacks to single column (left content above right visual)
- No horizontal overflow

- [ ] **Step 5: Commit**

```bash
git add app/lab/page.tsx app/lab/Lab.module.css
git commit -m "feat: add CMO Simulator featured hero card to /lab page"
```

---

## Task 4: Gate Page — `/lab/cmo-simulator`

**Files:**
- Create: `app/lab/cmo-simulator/layout.tsx`
- Create: `app/lab/cmo-simulator/page.tsx`
- Create: `app/lab/cmo-simulator/CmoSimulator.module.css`

- [ ] **Step 1: Create the layout file with metadata**

Next.js 16 throws a build error if you export `metadata` from a `'use client'` component. Always put metadata in a separate RSC layout.

```tsx
// app/lab/cmo-simulator/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMO Simulator — Darling MarTech',
  description:
    'Walk through the same CMO decision-making framework Jacob Darling uses with clients. Budget allocation, channel strategy, KPI selection — free, takes 10 minutes.',
}

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Create the CSS module**

```css
/* app/lab/cmo-simulator/CmoSimulator.module.css */

.page {
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  padding: 7rem 1.5rem 4rem;
}

@media (min-width: 768px) {
  .page {
    padding: 7rem 2.5rem 4rem;
  }
}

.bgGrid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(245, 240, 232, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 240, 232, 0.025) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.bgGlow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 77, 0, 0.07), transparent 65%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
}

.inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  align-items: start;
}

@media (min-width: 768px) {
  .inner {
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
  }
}

/* ── Copy column ── */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.breadcrumb a {
  color: var(--color-muted);
  text-decoration: none;
}

.breadcrumb a:hover {
  color: var(--color-text);
}

.breadcrumbSep {
  opacity: 0.4;
}

.eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.25rem;
}

.heading {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 0.97;
  letter-spacing: -0.03em;
  color: var(--color-text);
  text-wrap: balance;
  margin: 0 0 1.25rem;
}

.headingAccent {
  font-style: italic;
  color: var(--color-accent);
  font-family: var(--font-accent);
}

.body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 42ch;
  margin: 0 0 2rem;
}

.proof {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.proofItem {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-muted);
}

.proofDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

/* ── Form panel ── */

.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 77, 0, 0.4), transparent);
}

.panelHeading {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 0.4rem;
}

.panelSub {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-muted);
  margin: 0 0 2rem;
}

.field {
  margin-bottom: 1.25rem;
}

.label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--color-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.input:focus {
  border-color: var(--color-border-accent);
}

.input[data-error='true'] {
  border-color: var(--color-accent);
}

.fieldError {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-accent);
  margin: 0.4rem 0 0;
}

.submitBtn {
  width: 100%;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.95rem;
  border: none;
  border-radius: 8px;
  padding: 0.875rem;
  cursor: pointer;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submitBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.disclaimer {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: rgba(136, 136, 136, 0.55);
  text-align: center;
  margin: 1rem 0 0;
  line-height: 1.5;
}

.apiError {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-muted);
  margin: 0.75rem 0 0;
  text-align: center;
}

.apiError a {
  color: var(--color-text);
}

/* Popup-blocked fallback */
.fallback {
  text-align: center;
  padding: 1.5rem 0;
}

.fallbackText {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-muted);
  margin: 0 0 1rem;
}

.fallbackLink {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

- [ ] **Step 2: Create the gate page**

```tsx
// app/lab/cmo-simulator/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { springEntrance } from '@/lib/motion'
import styles from './CmoSimulator.module.css'

// Metadata lives in layout.tsx — do NOT add it here (client component restriction)

const SIMULATOR_URL = 'https://cmo-simulator-eight.vercel.app/'
const SESSION_KEY = 'cmo-simulator-access'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export default function CmoSimulatorPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'popup-blocked'>('idle')

  // Session bypass — returning visitors skip the form
  useEffect(() => {
    let hasAccess = false
    try {
      hasAccess = Boolean(sessionStorage.getItem(SESSION_KEY))
    } catch {
      // sessionStorage unavailable (private browsing, embedded webview) — show gate
    }
    if (hasAccess) {
      window.open(SIMULATOR_URL, '_blank', 'noopener,noreferrer')
      router.replace('/lab')
    }
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/cmo-simulator-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('API error')

      // Persist access in session storage
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }

      // Open simulator — handle popup blockers
      const popup = window.open(SIMULATOR_URL, '_blank', 'noopener,noreferrer')
      if (popup === null) {
        setStatus('popup-blocked')
      } else {
        router.replace('/lab')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/lab">Lab</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span>CMO Simulator</span>
          </nav>

          <p className={styles.eyebrow}>Free Tool · Marketing Strategy</p>
          <h1 className={styles.heading}>
            Think like a CMO for<br />
            <em className={styles.headingAccent}>10 minutes.</em>
          </h1>
          <p className={styles.body}>
            Walk through budget allocation, channel strategy, KPI selection, and
            execution priority — the same decision-making framework I use with clients.
            No agenda. No pitch at the end.
          </p>

          <ul className={styles.proof} role="list">
            {[
              'Built on 15+ years of real client work',
              'No login required after this form',
              'Takes about 10 minutes to complete',
            ].map((item) => (
              <li key={item} className={styles.proofItem}>
                <span className={styles.proofDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right — form panel */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springEntrance, delay: 0.1 }}
        >
          {status === 'popup-blocked' ? (
            <div className={styles.fallback}>
              <p className={styles.fallbackText}>
                Your browser blocked the popup. Click below to open the simulator:
              </p>
              <a
                href={SIMULATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
                Open CMO Simulator →
              </a>
            </div>
          ) : (
            <>
              <p className={styles.panelHeading}>Get instant access</p>
              <p className={styles.panelSub}>Drop your name and email — that&apos;s it.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Your name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    className={styles.input}
                    data-error={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className={styles.fieldError}>{errors.name.message}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className={styles.input}
                    data-error={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={styles.fieldError}>{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={styles.submitBtn}
                >
                  {status === 'loading' ? 'Sending…' : 'Launch the CMO Simulator →'}
                </button>

                {status === 'error' && (
                  <p className={styles.apiError}>
                    Something went wrong — try again or email{' '}
                    <a href="mailto:jacob@jacobdarling.com">jacob@jacobdarling.com</a>
                  </p>
                )}
              </form>

              <p className={styles.disclaimer}>
                No spam. No sales sequences. Just me knowing you tried the tool.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Visual check in browser**

Open `http://localhost:3000/lab/cmo-simulator`. Verify:
- Background grid texture and orange glow visible
- Two-column layout: copy left, form panel right
- Breadcrumb shows "Lab / CMO Simulator" with Lab linked
- Headline: "Think like a CMO for" + italic orange "10 minutes."
- Three proof items with orange dots
- Form panel has orange top-edge gradient line
- Two fields: name and email with correct placeholders
- "Launch the CMO Simulator →" button is orange, full-width
- Disclaimer text visible below
- Framer Motion entrance animations play on load (not scroll)

- [ ] **Step 5: Test form validation**

Click submit with empty fields. Verify:
- "Name is required" error appears below name field
- "Enter a valid email address" appears below email field
- Form does not submit

Fill in valid data and submit. With `RESEND_API_KEY` missing locally, you'll get a 500 from the API. Verify:
- "Something went wrong" error message appears below button
- Button re-enables, form is not cleared

- [ ] **Step 6: Test session bypass**

In browser console: `sessionStorage.setItem('cmo-simulator-access', '1')`. Refresh the page.
Expected: page immediately redirects to `/lab` (simulator would open in new tab if popup not blocked).
Expected after redirect: browser back button does not return to `/lab/cmo-simulator` in an infinite loop (because `router.replace` was used).

Clear session: `sessionStorage.removeItem('cmo-simulator-access')`. Refresh. Verify gate form reappears.

- [ ] **Step 7: Mobile check at 375px**

- Copy above form panel (single column)
- No horizontal scroll
- Form fields full width
- Submit button full width

- [ ] **Step 8: Commit**

```bash
git add app/lab/cmo-simulator/layout.tsx app/lab/cmo-simulator/page.tsx app/lab/cmo-simulator/CmoSimulator.module.css
git commit -m "feat: add CMO Simulator gate page with session bypass and form"
```

---

## Task 5: End-to-End Verification

- [ ] **Step 1: Full flow walkthrough**

1. Open `http://localhost:3000`
2. Scroll to the FeaturedTool section — verify it appears between AboutTeaser and CaseStudies
3. Click "Try the CMO Simulator →" — navigates to `/lab/cmo-simulator`
4. Fill in name + email, submit
5. With RESEND_API_KEY set: confirm Resend notification received at jacob@jacobdarling.com
6. Confirm simulator opens in new tab (or fallback link shows if popup blocked)
7. Confirm page redirects to `/lab`
8. Return to `/lab` — CMO Simulator not in the regular grid
9. Click "Launch CMO Simulator →" on the featured card — navigates to gate page again
10. Because session storage is set, immediately bounced back to `/lab` with simulator open

- [ ] **Step 2: Screenshot all three placements for reference**

Each page must be opened, waited, then screenshotted in separate commands (agent-browser runs as a daemon — `&&` chaining works within a single shell call):

```bash
npx agent-browser --color-scheme dark open http://localhost:3000
npx agent-browser wait --load networkidle
npx agent-browser screenshot --full --screenshot-dir c:/tmp
```

```bash
npx agent-browser open http://localhost:3000/lab
npx agent-browser wait --load networkidle
npx agent-browser screenshot --full --screenshot-dir c:/tmp
```

```bash
npx agent-browser open http://localhost:3000/lab/cmo-simulator
npx agent-browser wait --load networkidle
npx agent-browser screenshot --full --screenshot-dir c:/tmp
```

- [ ] **Step 3: Final commit and push check**

```bash
git log --oneline -6
```

Expected: 4 commits visible — API route, home section, lab card, gate page.

---

## Environment Variable Reminder

`RESEND_API_KEY` must be set for the notification email to send. For local dev, add to `.env.local`:

```
RESEND_API_KEY=re_xxxx
```

For Vercel deployment, add via the Vercel project settings → Environment Variables.
