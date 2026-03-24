# CMO Simulator — Featured Tool & Lead Gate

**Date:** 2026-03-23
**Status:** Approved
**Scope:** Three deliverables — home page section, /lab featured card, /lab/cmo-simulator gate page

---

## Overview

Promote the CMO Simulator (currently a standard card in the /lab grid) to a featured tool across the site. Add a name+email lead-capture gate as a dedicated page at `/lab/cmo-simulator`. Capture leads via Resend notification to jacob@jacobdarling.com. Use session storage to avoid re-gating returning visitors in the same browser session.

**Canonical simulator URL:** `https://cmo-simulator-eight.vercel.app/`
(The old URL `cmo-simulator-3il5.vercel.app` in the tools array is outdated — the new canonical URL is used everywhere.)

---

## Deliverable 1 — Home Page: `<FeaturedTool>` Section

### Location
Inserted between `<AboutTeaser />` and `<CaseStudies />` in `app/page.tsx`. (Current order: Hero → Services → AboutTeaser → **FeaturedTool** → CaseStudies → Testimonials → ContactCTA.)

### Component Structure
`components/sections/FeaturedTool.tsx` — thin RSC shell that imports a `'use client'` motion component.

The RSC boundary is:
- `FeaturedTool.tsx` (Server Component) — renders the outer `<section>` and passes static props
- `FeaturedToolInner.tsx` (Client Component, `'use client'`) — all Framer Motion animation, including `whileInView`, stagger, pulse dot

This split is required because Framer Motion needs the client runtime. The pulsing dot is also in the client component.

### Layout
Asymmetric two-column split: `grid-template-columns: 1fr 1fr`, gap `5rem`, `max-width: 1400px`, `margin: 0 auto`. Collapses to single column below 768px with copy above card.

### Left — Copy
- Eyebrow: `Featured Tool` — `font-size: 0.75rem`, `font-weight: 500`, `letter-spacing: 0.15em`, `text-transform: uppercase`, `color: var(--color-accent)`, `margin-bottom: 1.5rem`
- H2: `Run a full CMO strategy session.` on first line, `Right now.` in italic with `color: var(--color-accent)` on second line — Cabinet Grotesk 900, `clamp(2.2rem, 4vw, 3.5rem)`, `line-height: 0.97`, `letter-spacing: -0.03em`
- Body: `Walk through the same decision-making framework I use with clients — budget allocation, channel strategy, KPI selection, and execution priority — in about 10 minutes. Free. No agenda.` — `color: var(--color-muted)`, `font-size: 1rem`, `line-height: 1.7`, `max-width: 44ch`
- CTA row:
  - Primary button: `Try the CMO Simulator →` → `href="/lab/cmo-simulator"` (opens gate page, same tab)
  - Ghost link: `Browse all lab tools` → `href="/lab"` — `color: var(--color-muted)`, underline border-bottom, `margin-left: 1.5rem`

### Right — Visual Card
Dark surface card, `aspect-ratio: 4/3`, `border-radius: 16px`, `border: 1px solid var(--color-border)`. Layers (bottom to top, all `position: absolute`, `inset: 0`):

1. **Grid texture** — reuse the same pattern from `Lab.module.css` `.toolCoverGrid`: `background-image: linear-gradient(rgba(245,240,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.04) 1px, transparent 1px); background-size: 40px 40px`
2. **Orange glow** — `radial-gradient(circle, rgba(255,77,0,0.18), transparent 70%)`, `width: 300px; height: 300px`, positioned `top: -60px; right: -60px`, `border-radius: 50%`
3. **Sweep** — `linear-gradient(145deg, rgba(255,77,0,0.06) 0%, transparent 50%)`
4. **Badge** (top-left, `position: absolute`) — pulsing dot + `Live · Production`. Orange pill: `background: rgba(255,77,0,0.15)`, `border: 1px solid rgba(255,77,0,0.3)`, `border-radius: 100px`, `padding: 0.3rem 0.75rem`, `font-size: 0.7rem`, `font-weight: 600`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--color-accent)`
5. **Center group** (flexbox, column, centered) — icon box + label + sublabel
6. **Stats row** (bottom, `position: absolute`, `bottom: 1.25rem`, left/right `1.25rem`) — three chip divs side by side

**Pulsing dot** (in badge and lab featured card): Framer Motion `animate={{ opacity: [1, 0.3, 1] }}` with `transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}`. Width/height `6px`, `border-radius: 50%`, `background: var(--color-accent)`.

**Icon:** Use `<Megaphone weight="light" />` from `@phosphor-icons/react` — matches the Marketing category icon already used in `app/lab/page.tsx` line 67. Size `32px` in home card, `36px` in lab featured card.

**Icon box:** `width: 72px; height: 72px`, `border: 1px solid var(--color-border-accent)`, `border-radius: 16px`, `background: rgba(255,77,0,0.06)`, `display: flex; align-items: center; justify-content: center`

**Label below icon:** `CMO Simulator` — `font-weight: 800`, `font-size: 1.1rem`, `letter-spacing: -0.02em`
**Sublabel:** `Marketing · Next.js · Vercel` — `font-size: 0.75rem`, `color: var(--color-muted)`

**Stats chips** (3 across):
- `~10m` / `Avg session`
- `CMO` / `Framework`
- `Free` / `No catch`

Each chip: `background: rgba(10,10,10,0.7)`, `border: 1px solid var(--color-border)`, `border-radius: 8px`, `padding: 0.5rem 0.75rem`, `flex: 1`.
Stat value: `font-weight: 800`, `font-size: 1.1rem`, `color: var(--color-accent)`, `font-variant-numeric: tabular-nums`, `line-height: 1`, `margin-bottom: 0.2rem`
Stat label: `font-size: 0.65rem`, `color: var(--color-muted)`, `text-transform: uppercase`, `letter-spacing: 0.08em`

### Animation
- Container (`FeaturedToolInner`): `variants={containerVariants}`, `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: "-80px" }}`
- Copy lines (eyebrow, h2, body, CTAs): `variants={itemVariants}` — `{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: springEntrance } }`
- Card: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={springEntrance}`
- Import `containerVariants`, `itemVariants`, `springEntrance`, `viewport` from `@/lib/motion`

### CSS
New file: `components/sections/FeaturedTool.module.css`

### Metadata
No change needed — `FeaturedTool` is a section on `app/page.tsx` which already has `metadata` defined.

---

## Deliverable 2 — `/lab` Page: Featured Hero Card

### Location
`app/lab/page.tsx` — rendered above the existing `motion.div` grid. CMO Simulator is removed from the `tools` array to avoid duplication.

### Filter Count
The `tools.length` count shown on the "All" filter button should still reflect only the tools in the grid — the featured card is not counted. This is intentional: the featured card is above the filter UI entirely. No change needed to the filter count logic; removing CMO Simulator from the array handles it automatically.

### Component
Inline `LabFeaturedCard` function in `app/lab/page.tsx` (not a separate file — it's single-use).

### Layout
Full-width horizontal card, `display: grid`, `grid-template-columns: 1fr 1fr`, `min-height: 280px`, `border-radius: 16px`, `overflow: hidden`. Distinguished from regular cards with `border: 1px solid var(--color-border-accent)` (orange). Left and right halves separated by `border-right: 1px solid var(--color-border)`.

### Left Half — Content
- Padding: `2.5rem`
- Display: `flex; flex-direction: column; justify-content: space-between`
- Top group:
  - "Production · Featured" pill (same style as home badge, with Framer Motion pulsing dot)
  - H2: `CMO Simulator` — Cabinet Grotesk 900, `1.75rem`, `letter-spacing: -0.03em`, `line-height: 1`, `margin-bottom: 0.75rem`
  - Body: `Walk through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. Same framework I use with clients. Takes about 10 minutes.` — `color: var(--color-muted)`, `font-size: 0.9rem`, `line-height: 1.65`, `max-width: 44ch`, `margin-bottom: 1.5rem`
  - Stack tags: `Next.js`, `React`, `Vercel`, `Marketing Strategy` — same `.toolCoverTag` style
- Bottom: CTA button `Launch CMO Simulator →` → `href="/lab/cmo-simulator"`, orange, `width: fit-content`

Heading hierarchy note: The page H1 is "Tools & Experiments." (line 160 in lab/page.tsx). The featured card title uses H2 — correct hierarchy.

### Right Half — Visual
- Background: grid texture (`background-image` same as toolCoverGrid, `background-size: 32px 32px`) + orange glow (`radial-gradient`, `width: 260px; height: 260px`, `top: -40px; right: -40px`, `18% opacity`)
- Centered flex column: icon box (80px, same pattern, `border-radius: 18px`) + stats row
- Stats row: `~10m / Session` | vertical divider (`1px`, `height: 32px`, `var(--color-border)`) | `Free / Access`
- Stat value: `font-weight: 900`, `font-size: 1.5rem`, `color: var(--color-accent)`

### CMO Simulator Removal
Remove the object `{ name: 'CMO Simulator', category: 'Marketing', ... }` from the `tools` array (line 31 in `lab/page.tsx`). The `url` field `'https://cmo-simulator-3il5.vercel.app'` is also removed — the canonical URL `https://cmo-simulator-eight.vercel.app/` is only used via the gate page.

### CSS
Add to `app/lab/Lab.module.css`: `.featuredCard`, `.featuredLeft`, `.featuredRight`, `.featuredRight-grid`, `.featuredRight-glow`, `.featuredRight-content`, `.featuredPill`, `.featuredTitle`, `.featuredDesc`, `.featuredStack`, `.featuredCta`, `.featuredStats`, `.featuredStatDivider`

---

## Deliverable 3 — Gate Page: `/lab/cmo-simulator`

### Route
`app/lab/cmo-simulator/page.tsx` — new page file. Must be a `'use client'` component (requires sessionStorage, useForm, router).

### Metadata
Required in every `page.tsx`. Add as a named export in the same file:
```ts
export const metadata = {
  title: 'CMO Simulator — Darling MarTech',
  description: 'Walk through the same CMO decision-making framework Jacob Darling uses with clients. Budget allocation, channel strategy, KPI selection — free, takes 10 minutes.',
}
```
Note: `metadata` export works in Client Components in Next.js 16 when exported as a `const` (not a function). If the linter complains, move metadata to a separate `layout.tsx` in `app/lab/cmo-simulator/`.

### Session Bypass (on mount)
```ts
useEffect(() => {
  let hasAccess = false
  try {
    hasAccess = Boolean(sessionStorage.getItem('cmo-simulator-access'))
  } catch {
    // sessionStorage unavailable (private browsing, embedded webview) — show gate
  }
  if (hasAccess) {
    window.open('https://cmo-simulator-eight.vercel.app/', '_blank', 'noopener,noreferrer')
    router.replace('/lab')  // replace (not push) to avoid back-button loop
  }
}, [router])
```

**Return visit UX:** Returning visitors in the same session are immediately bounced — simulator opens in new tab, page replaces to `/lab`. This is the intended behavior: the gate is a one-time ask per session.

**router.replace vs router.push:** Use `router.replace('/lab')` — avoids adding `/lab/cmo-simulator` to the history stack, which would create an infinite bounce loop when the user hits back.

### Layout
`display: grid`, `grid-template-columns: 1fr 1fr`, `gap: 6rem`, `max-width: 1100px`, `margin: 0 auto`, `min-height: 100dvh`, `padding: 7rem 2.5rem`. Collapses to single column below 768px — **copy (left) appears above form (right)** on mobile, which is the correct order (value prop before ask).

Background layers (on the `<section>` wrapper):
1. Grid texture: `background-image` lines at 2.5% opacity, `48px` spacing, `position: absolute; inset: 0`
2. Orange radial glow: `radial-gradient(circle, rgba(255,77,0,0.07), transparent 65%)`, `600px × 600px`, centered, `position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%)`
Section must be `position: relative; overflow: hidden`.

### Left — Copy
- Breadcrumb: `Lab / CMO Simulator` — `font-size: 0.75rem`, `color: var(--color-muted)`, separator `/` at `0.4` opacity. `Lab` links to `/lab`, `CMO Simulator` is plain text.
- Eyebrow: `Free Tool · Marketing Strategy`
- H1: `Think like a CMO for` (line 1) + italic orange `10 minutes.` (line 2) — Cabinet Grotesk 900, `clamp(2rem, 4vw, 3.2rem)`, `line-height: 0.97`, `letter-spacing: -0.03em`
- Body: `Walk through budget allocation, channel strategy, KPI selection, and execution priority — the same decision-making framework I use with clients. No agenda. No pitch at the end.` — `color: var(--color-muted)`, `font-size: 1rem`, `line-height: 1.7`, `max-width: 42ch`, `margin-bottom: 2rem`
- Proof list (3 items, orange dots, `display: flex; align-items: center; gap: 0.75rem`, `font-size: 0.875rem`, `color: var(--color-muted)`):
  - "Built on 15+ years of real client work"
  - "No login required after this form"
  - "Takes about 10 minutes to complete"

Proof dots: `width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); flex-shrink: 0` — static, no animation.

### Right — Form Panel
`background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: 20px`, `padding: 2.5rem`, `position: relative; overflow: hidden`.

Top-edge orange gradient line via `::before`: `content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,77,0,0.4), transparent)`

**Panel heading:** `Get instant access` — `font-weight: 800`, `font-size: 1.1rem`, `letter-spacing: -0.02em`, `margin-bottom: 0.4rem`
**Panel subheading:** `Drop your name and email — that's it.` — `font-size: 0.85rem`, `color: var(--color-muted)`, `margin-bottom: 2rem`

**Fields** (two, matching `ContactForm.tsx` patterns):
- Name: `type="text"`, placeholder `Jane Doe`, `id="name"`, registered with React Hook Form
- Email: `type="email"`, placeholder `you@company.com`, `id="email"`, registered with React Hook Form
- Field-level errors render below each input in a `<p>` tag, `color: var(--color-accent)` (matches ContactForm error style), `font-size: 0.8rem`
- Labels: `display: block`, `font-size: 0.72rem`, `font-weight: 500`, `color: var(--color-muted)`, `letter-spacing: 0.06em`, `text-transform: uppercase`, `margin-bottom: 0.5rem`
- Inputs: match `components/ui/input.tsx` style — `background: var(--color-surface-raised)`, `border: 1px solid var(--color-border)`, `border-radius: 8px`, `padding: 0.75rem 1rem`, `color: var(--color-text)`, `font-size: 0.9rem`

**Zod schema:**
```ts
const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email address'),
})
```

**Submit button:** Full-width, `background: var(--color-accent)`, `color: #fff`, `font-weight: 800`, `font-size: 0.95rem`, `border: none`, `border-radius: 8px`, `padding: 0.875rem`, `cursor: pointer`, `display: flex; align-items: center; justify-content: center; gap: 0.5rem`

**Form states:**

| State | Button text | Button disabled | Other |
|-------|------------|-----------------|-------|
| `idle` | `Launch the CMO Simulator →` | No | — |
| `loading` | `Sending…` | Yes | — |
| `success` | — (see below) | — | See success flow |
| `error` | `Launch the CMO Simulator →` | No | Error msg below button |

**Success flow (on API 200):**
1. `sessionStorage.setItem('cmo-simulator-access', '1')` wrapped in `try/catch`
2. `const popup = window.open('https://cmo-simulator-eight.vercel.app/', '_blank', 'noopener,noreferrer')`
3. If `popup === null` (popup blocked): render a fallback visible link inside the panel — `<a href="https://cmo-simulator-eight.vercel.app/" target="_blank" rel="noopener noreferrer">Click here to open the CMO Simulator →</a>` — styled as orange underlined text, `font-size: 0.9rem`. The form panel content switches to this fallback state instead of the form.
4. If popup succeeded: `router.replace('/lab')`

**Error state:** Below the submit button, render `<p>Something went wrong — try again or email <a href="mailto:jacob@jacobdarling.com">jacob@jacobdarling.com</a></p>` at `font-size: 0.8rem`, `color: var(--color-muted)`.

**Disclaimer:** `No spam. No sales sequences. Just me knowing you tried the tool.` — `font-size: 0.72rem`, `color: rgba(136,136,136,0.55)`, `text-align: center`, `margin-top: 1rem`, `line-height: 1.5`

### Animation
Entrance: `motion.div` wrapper on both columns, `initial={{ opacity: 0, y: 24 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={springEntrance}`. Not `whileInView` since this is the full page content — use `animate` directly.

### CSS
New file: `app/lab/cmo-simulator/CmoSimulator.module.css`

---

## API Route: `/api/cmo-simulator-access`

### File
`app/api/cmo-simulator-access/route.ts`

### Runtime
`export const runtime = 'edge'`

### Method: POST

**Request body:**
```ts
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})
```

**Resend notification:**
```ts
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
```

**Responses:**
- `200`: `{ success: true }`
- `400`: `{ error: zodError.errors }` (Zod parse failure)
- `500`: `{ error: 'Failed to send notification' }` (Resend failure)

**Rate limiting:** Not implemented in v1 — accepted risk. The gate is low-value to spam (no download, no account creation). Monitor manually via Resend dashboard.

---

## Data Flow

```
User clicks "Try the CMO Simulator →" (home or /lab)
  → navigates to /lab/cmo-simulator (same tab)
  → page mounts
  → useEffect checks sessionStorage (try/catch for private browsing)
    → token exists: window.open(simulator, '_blank') + router.replace('/lab')
    → no token: render gate form
  → user fills name + email, submits
  → React Hook Form validates (Zod schema)
    → invalid: show field-level errors, do not submit
    → valid: set state 'loading', POST /api/cmo-simulator-access
  → API route: Zod parse → Resend.send() → return { success: true }
  → client receives 200:
    → sessionStorage.setItem('cmo-simulator-access', '1') [try/catch]
    → window.open(simulator, '_blank')
      → if blocked (null): show fallback link, stop
      → if success: router.replace('/lab')
  → jacob@jacobdarling.com receives Resend notification
```

---

## File Manifest

| File | Action |
|------|--------|
| `components/sections/FeaturedTool.tsx` | New — RSC shell |
| `components/sections/FeaturedToolInner.tsx` | New — `'use client'` motion wrapper |
| `components/sections/FeaturedTool.module.css` | New |
| `app/page.tsx` | Edit — add `<FeaturedTool />` between `<AboutTeaser />` and `<CaseStudies />` |
| `app/lab/page.tsx` | Edit — add `LabFeaturedCard` above grid, remove CMO Simulator from `tools` array |
| `app/lab/Lab.module.css` | Edit — add featured card CSS classes |
| `app/lab/cmo-simulator/page.tsx` | New — `'use client'`, gate form + session bypass |
| `app/lab/cmo-simulator/CmoSimulator.module.css` | New |
| `app/api/cmo-simulator-access/route.ts` | New — edge runtime, Resend notification |

---

## Design Constraints

- CSS Modules only for visual properties — no Tailwind color/typography classes
- Framer Motion spring physics for all animation — pulsing dot uses `animate` loop, entrances use `whileInView` or `animate`
- Icons: `@phosphor-icons/react` — `<Megaphone weight="light" />` for the CMO Simulator icon throughout
- React Hook Form + Zod for gate form (same pattern as `ContactForm.tsx`)
- Edge runtime for API route (matches existing `app/api/contact/route.ts`)
- `router.replace` (not `router.push`) for session bypass redirect — prevents back-button loop
- `try/catch` around all `sessionStorage` access — handles private browsing and embedded webviews
- `window.open` popup-blocked fallback: show a direct link inside the panel
- Mobile: single column below 768px, copy above form
- `border-radius` max: 20px (panels), 16px (cards)
