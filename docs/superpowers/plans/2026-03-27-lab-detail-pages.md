# Lab Detail Pages + Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add iframe modal + individual detail pages for 4 Graston tools to the existing `/lab` page, wiring internal `detailHref` routes into the current `GalleryHoverCard`-based index.

**Architecture:** New `components/lab/` directory holds `LabModal` and `LabDetailPage` — both `"use client"` components. `data/labs.ts` provides typed content. A server-side dynamic route at `app/lab/[slug]/page.tsx` reads the data and renders `LabDetailPage`. One surgical edit to `app/lab/page.tsx` extends the `Tool` type and updates 4 entries; all other tools and the page structure are untouched.

**Tech Stack:** Next.js 16 App Router, Framer Motion 11, `@phosphor-icons/react`, CSS Modules, TypeScript strict mode.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `data/labs.ts` | Create | `LabDetailProps` interface + `LAB_DETAIL_DATA` record for all 4 tools |
| `components/lab/LabModal.tsx` | Create | Iframe popout modal with AnimatePresence, Escape key, scroll lock |
| `components/lab/LabModal.module.css` | Create | Modal styles: scrim, panel, title bar, iframe, mobile full-screen |
| `components/lab/LabDetailPage.tsx` | Create | Full detail page component — 9 sections, imports LabModal |
| `components/lab/LabDetailPage.module.css` | Create | Detail page styles: hero, metrics, prose, stack table, blockquote, CTA |
| `app/lab/[slug]/page.tsx` | Create | Server component — reads LAB_DETAIL_DATA, renders LabDetailPage or 404 |
| `app/lab/page.tsx` | Modify | Extend Tool type, update 4 Graston entries, update ToolCard render logic |

---

### Task 1: Create `data/labs.ts` with interface and all 4 entries

**Files:**
- Create: `data/labs.ts`

- [ ] **Step 1: Create the file**

```typescript
// data/labs.ts

export interface LabDetailProps {
  slug: string
  name: string
  category: string
  year: string
  tagline: string
  metrics: { value: string; label: string }[]
  problemBody: string[]
  buildStack: { layer: string; choice: string; why: string }[]
  buildBody: string[]
  impactBody: string[]
  proofStatement: string
  ctaLine: string
  toolSrc: string
  screenshots: { src: string; alt: string; caption: string }[]
}

export const LAB_DETAIL_DATA: Record<string, LabDetailProps> = {
  'clinical-compass': {
    slug: 'clinical-compass',
    name: 'Clinical Compass',
    category: 'Developer',
    year: '2024',
    tagline: 'A decision-support tool that helps Graston practitioners navigate clinical protocols and treatment pathways — without calling the home office.',
    metrics: [
      { value: '400+', label: 'Graston-certified practitioners reached' },
      { value: '48 hrs/wk', label: 'Saved in manual protocol support calls' },
      { value: '1', label: 'Tool replacing a full support workflow' },
    ],
    problemBody: [
      'Graston Technique has hundreds of certified practitioners — physical therapists, chiropractors, athletic trainers — who regularly need to reference clinical protocols and treatment pathways for specific conditions. The problem: that guidance lived in PDFs, in email threads, and in the heads of the clinical team.',
      'Practitioners were calling and emailing constantly. The clinical support team was spending nearly two full days every week answering the same protocol questions. It wasn\'t scalable — and it was slowing down practitioners at the point of care.',
      'I built Clinical Compass to make that institutional knowledge instantly accessible. No login required, no PDF hunting, no waiting for a callback.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Needed to embed in existing Graston web properties without introducing a build system or framework dependency' },
      { layer: 'Logic', choice: 'Decision tree JSON', why: 'Clinical pathways modeled as a branching decision tree, making it easy for the clinical team to update content without touching code' },
      { layer: 'Hosting', choice: 'Embedded HTML file', why: 'Deployed as a self-contained HTML file — loads instantly, works offline, no API calls' },
      { layer: 'UX Pattern', choice: 'Progressive disclosure', why: 'Practitioners answer one question at a time — reduces cognitive load at the point of care' },
    ],
    buildBody: [
      'Clinical Compass is a self-contained HTML application — no framework, no build step, no external dependencies. The entire clinical decision tree is encoded as a JSON structure that the UI traverses based on practitioner responses.',
      'I modeled the UX after clinical assessment tools practitioners already knew: one question, one answer, progressive disclosure. Each branch leads either to a protocol recommendation or to a clarifying follow-up question. The clinical team could update the JSON file directly — no developer required.',
      'The tool was designed to be embedded anywhere Graston practitioners already were: the practitioner portal, email links, even printed QR codes at training events.',
    ],
    impactBody: [
      'Clinical Compass rolled out to 400+ certified Graston practitioners and immediately took pressure off the clinical support team. Protocol support calls dropped significantly in the first 90 days.',
      'More importantly, it changed how practitioners experienced Graston\'s support — instead of waiting for a callback, they had an answer in under two minutes. That\'s the kind of tool that turns a client relationship into a loyalty relationship.',
    ],
    proofStatement: 'That I can build clinical-grade decision tools as a solo marketer — and that the best support tool is one that makes the support team unnecessary.',
    ctaLine: 'Have a knowledge management or decision-support problem? Let\'s build something that scales.',
    toolSrc: '/labs/clinical-compass/Graston Clinical Compass Tool.html',
    screenshots: [],
  },

  'smart-sales-pricing': {
    slug: 'smart-sales-pricing',
    name: 'Smart Sales & Pricing Tool',
    category: 'Developer',
    year: '2024',
    tagline: 'An interactive pricing calculator that helps Graston sales reps build accurate quotes for certification bundles, equipment packages, and institutional accounts — in real time.',
    metrics: [
      { value: '+38%', label: 'Lead-to-demo conversion improvement' },
      { value: '< 2 min', label: 'From prospect question to accurate quote' },
      { value: '2 versions', label: 'Built and iterated based on sales team feedback' },
    ],
    problemBody: [
      'Graston\'s product catalog was complex. Certifications came in bundles, equipment had configuration options, institutional accounts had different pricing tiers than individual practitioners. Sales reps were building quotes manually in spreadsheets — and getting them wrong.',
      'The pricing errors were eroding trust with prospects. Worse, reps were losing deals in the follow-up gap: the time between a pricing question on a demo call and the manually-built quote they emailed two days later.',
      'I needed to close that gap entirely. Give reps a tool they could use live on a call, in front of the prospect, and get to an accurate number immediately.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Sales reps needed it accessible anywhere — no install, no login, browser tab open during calls' },
      { layer: 'Pricing Logic', choice: 'JavaScript calculation engine', why: 'All pricing rules, bundle discounts, and tier logic encoded in a single JS module for easy updates' },
      { layer: 'UX Pattern', choice: 'Real-time calculator', why: 'Every input immediately updates the output — reps see price changes live as they configure the quote' },
      { layer: 'Iteration', choice: 'v1 → v2 rebuild', why: 'v1 shipped fast, sales team used it for 60 days, v2 rebuilt based on real usage feedback' },
    ],
    buildBody: [
      'The Smart Sales & Pricing Tool went through two full versions. v1 was built fast — a working calculator that got into reps\' hands within a week. The goal was to get real usage data before over-engineering anything.',
      'After 60 days of real sales calls, I collected feedback from the team and rebuilt v2 from scratch. The calculation engine stayed the same; the UX changed significantly based on how reps were actually using it.',
      'Both versions are self-contained HTML files — no backend, no API calls, no login. A sales rep opens a browser tab and it\'s ready. The pricing logic is maintained in a single JavaScript configuration object that a non-developer can update.',
    ],
    impactBody: [
      'The pricing tool directly contributed to a 38% improvement in lead-to-demo conversion. When reps can answer pricing questions live on the first call — accurately, with full configuration detail — prospects don\'t need to \'think about it\' the same way.',
      'It also eliminated a source of internal frustration. Sales reps stopped manually building spreadsheet quotes. The pricing team stopped fielding \'what\'s the price for X if Y\' questions. Everyone was working from the same number.',
    ],
    proofStatement: 'That shipping a fast v1 and iterating on real usage data is better than designing the perfect tool — and that a JavaScript file in a browser tab can replace a week of spreadsheet work.',
    ctaLine: 'Have a sales tool or pricing workflow problem? I build things like this.',
    toolSrc: '/labs/smart-sales-pricing/graston Smart Sales and Pricing Tool.html',
    screenshots: [],
  },

  'investment-roi-planner': {
    slug: 'investment-roi-planner',
    name: 'Investment ROI Planner',
    category: 'Marketing',
    year: '2024',
    tagline: 'A financial planning tool that helps practitioners calculate the expected return on their Graston Technique certification investment — before they ever talk to a sales rep.',
    metrics: [
      { value: '+212%', label: 'Increase in qualified lead volume' },
      { value: 'Self-serve', label: 'ROI answer without a sales conversation' },
      { value: '3 inputs', label: 'All it takes to get a meaningful projection' },
    ],
    problemBody: [
      'Graston certification is a meaningful investment for a practitioner — time, money, and commitment to a new technique. The most common objection in the sales process wasn\'t about the technique itself. It was: "Will this actually pay off for my practice?"',
      'Reps were spending significant call time walking through ROI math. Prospects were asking questions that should have been answered before the first sales touchpoint. The conversion rate on those conversations was lower than it should have been because prospects arrived uncertain.',
      'The insight: answer the ROI question before the sales conversation happens. Let the tool do the qualifying work.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Deployed as a lead-gen asset embedded on the Graston website — no framework overhead, instant load' },
      { layer: 'Calculation Engine', choice: 'JavaScript financial model', why: 'ROI projections based on session volume, fee per session, and certification cost — simple inputs, meaningful outputs' },
      { layer: 'Output Format', choice: 'Visual results panel', why: 'Prospects see a clear monthly ROI projection and payback timeline — easy to screenshot and share internally' },
      { layer: 'CTA Integration', choice: 'Inline contact form', why: 'After seeing their ROI, prospects are warm — inline CTA converts at significantly higher rate than a generic form' },
    ],
    buildBody: [
      'The ROI Planner was built as a top-of-funnel asset, not a sales tool. It lives on the Graston website where prospects are researching, not in a sales rep\'s browser during a call.',
      'The model is intentionally simple: how many sessions per week, what do you charge per session, here\'s your projected monthly ROI and payback period. Three inputs, one clear output. Practitioners who find it through organic search or social get their core question answered in under two minutes.',
      'The CTA at the end of the calculation captures intent at peak interest — right after the prospect has convinced themselves the math works.',
    ],
    impactBody: [
      'The ROI Planner was a primary driver behind a 212% increase in qualified lead volume. Prospects who engaged with the tool arrived at sales conversations already sold on the economics — the call became about timing and logistics, not "is this worth it."',
      'It also improved sales efficiency. Reps stopped doing ROI math on calls. That time went back into closing, not educating.',
    ],
    proofStatement: 'That the best lead qualification happens before the first sales conversation — and that a self-serve calculator can do more qualifying work than a 30-minute discovery call.',
    ctaLine: 'Need a lead-gen asset that does the qualifying work for you? Let\'s build it.',
    toolSrc: '/labs/investment-roi-planner/Investment ROI Planner Tool.html',
    screenshots: [],
  },

  'license-requirements': {
    slug: 'license-requirements',
    name: 'License Requirements Navigator',
    category: 'Developer',
    year: '2024',
    tagline: 'A state-by-state licensing lookup tool that helps healthcare practitioners understand exactly what credentials they need — and which Graston certifications count toward them.',
    metrics: [
      { value: '50 states', label: 'Licensing requirement data indexed' },
      { value: '< 60 sec', label: 'From question to answer' },
      { value: 'Zero', label: 'Support calls needed for licensing questions' },
    ],
    problemBody: [
      'Healthcare licensing is complicated. A physical therapist in Texas has different continuing education requirements than one in New York. Chiropractors, athletic trainers, and massage therapists each operate under different state regulatory frameworks.',
      'Graston\'s clinical education team was fielding constant questions: "Does this course count for my CEU requirements in Ohio?" "Can I use my Graston certification toward my PT license renewal in California?" These are important questions — and getting them wrong means a practitioner fails their renewal.',
      'The support burden was significant, and the stakes were high. I built the License Requirements Navigator to give practitioners accurate, state-specific answers without requiring a call or email.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Embedded on the Graston practitioner portal — self-contained, no build system, instant load' },
      { layer: 'Data Layer', choice: 'JSON state database', why: 'All 50 states\' licensing requirements encoded as structured data — clinical team can update without touching code' },
      { layer: 'UX Pattern', choice: 'Two-step lookup', why: 'Practitioners select state then credential type — two inputs, one definitive answer' },
      { layer: 'Maintenance', choice: 'Editable JSON config', why: 'Licensing requirements change — built so a non-developer can update state data when regulations change' },
    ],
    buildBody: [
      'The License Requirements Navigator is built around a two-step lookup: select your state, select your credential type. The tool then pulls from a structured JSON database of state licensing requirements and returns a clear answer about which Graston certifications count, how many CEUs they provide, and any relevant renewal considerations.',
      'The data layer was designed for maintainability. Licensing requirements change when state legislatures update continuing education rules. The JSON config is structured so the Graston clinical team can update a state entry without touching any JavaScript.',
      'The tool runs entirely client-side — no API calls, no database connection. It loads instantly and works offline, which matters when practitioners are looking something up at a conference or between patients.',
    ],
    impactBody: [
      'After launch, licensing support questions effectively dropped to zero. Practitioners got accurate, specific answers in under a minute. The clinical education team reclaimed significant time that had been going to repetitive licensing Q&A.',
      'The tool also served as a subtle credibility signal — the fact that Graston built a state-indexed licensing database told practitioners the organization understood their regulatory reality and had done the work to make compliance easier.',
    ],
    proofStatement: 'That self-serve tools built on structured data can eliminate entire support categories — and that the best answer to a compliance question is one the practitioner finds themselves.',
    ctaLine: 'Have a support burden that should be self-serve? I build things that scale.',
    toolSrc: '/labs/license-requirements/Practitioner License Requirements Tool.html',
    screenshots: [],
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd c:/dev/darling-martech && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors referencing `data/labs.ts`.

- [ ] **Step 3: Commit**

```bash
cd c:/dev/darling-martech && git add data/labs.ts && git commit -m "feat: add lab detail data with LabDetailProps interface and 4 Graston entries"
```

---

### Task 2: Create `LabModal` component

**Files:**
- Create: `components/lab/LabModal.tsx`
- Create: `components/lab/LabModal.module.css`

- [ ] **Step 1: Create `LabModal.module.css`**

```css
/* components/lab/LabModal.module.css */

.scrim {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.82);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 200;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 201;
  width: min(92vw, 1200px);
  height: min(88vh, 860px);
  background: var(--color-surface, #141414);
  border: 1px solid rgba(245, 240, 232, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.titleBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(245, 240, 232, 0.08);
  flex-shrink: 0;
}

.titleLeft {
  display: flex;
  align-items: center;
  gap: 12px;
}

.titleLabel {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-accent, #FF4D00);
  text-transform: uppercase;
}

.titleName {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text, #F5F0E8);
  letter-spacing: -0.01em;
}

.titleActions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.readLink {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-muted, #888888);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.18s ease;
}

.readLink:hover {
  color: var(--color-text, #F5F0E8);
}

.closeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid rgba(245, 240, 232, 0.1);
  border-radius: 6px;
  color: var(--color-muted, #888888);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.closeBtn:hover {
  background: rgba(245, 240, 232, 0.06);
  color: var(--color-text, #F5F0E8);
  border-color: rgba(245, 240, 232, 0.2);
}

.iframeWrapper {
  flex: 1;
  overflow: hidden;
  background: #fff;
}

.iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

@media (max-width: 640px) {
  .modal {
    width: 100vw;
    height: 100dvh;
    border-radius: 0;
    top: 0;
    left: 0;
    transform: none;
  }
}
```

- [ ] **Step 2: Create `LabModal.tsx`**

```typescript
// components/lab/LabModal.tsx
'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowSquareOut } from '@phosphor-icons/react'
import Link from 'next/link'
import { springCinematic } from '@/lib/motion'
import styles from './LabModal.module.css'

interface LabModalProps {
  isOpen: boolean
  onClose: () => void
  toolSrc: string
  toolName: string
  toolSlug: string
}

export default function LabModal({ isOpen, onClose, toolSrc, toolName, toolSlug }: LabModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={`${toolName} — interactive tool`}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={springCinematic}
          >
            <div className={styles.titleBar}>
              <div className={styles.titleLeft}>
                <span className={styles.titleLabel}>Lab Tool</span>
                <span className={styles.titleName}>{toolName}</span>
              </div>
              <div className={styles.titleActions}>
                <Link href={`/lab/${toolSlug}`} className={styles.readLink}>
                  <ArrowSquareOut weight="regular" size={16} />
                  Read the build
                </Link>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close tool">
                  <X weight="regular" size={18} />
                </button>
              </div>
            </div>
            <div className={styles.iframeWrapper}>
              <iframe
                src={toolSrc}
                title={toolName}
                className={styles.iframe}
                sandbox="allow-scripts allow-forms allow-same-origin"
                loading="lazy"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd c:/dev/darling-martech && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors referencing `LabModal`.

- [ ] **Step 4: Commit**

```bash
cd c:/dev/darling-martech && git add components/lab/LabModal.tsx components/lab/LabModal.module.css && git commit -m "feat: add LabModal iframe popout component"
```

---

### Task 3: Create `LabDetailPage` CSS module

**Files:**
- Create: `components/lab/LabDetailPage.module.css`

- [ ] **Step 1: Create the CSS module**

```css
/* components/lab/LabDetailPage.module.css */

.page {
  min-height: 100dvh;
  background: var(--color-base, #0A0A0A);
  color: var(--color-text, #F5F0E8);
}

/* Back link */
.backWrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 100px 5vw 0;
}

.backLink {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted, #888888);
  text-decoration: none;
  transition: color 0.15s ease;
}

.backLink:hover {
  color: var(--color-text, #F5F0E8);
}

/* Hero */
.hero {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 5vw 72px;
}

.heroMeta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent, #FF4D00);
}

.year {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-muted, #888888);
}

.h1 {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: clamp(2.4rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--color-text, #F5F0E8);
  margin: 0 0 24px;
  max-width: 18ch;
  text-wrap: balance;
}

.tagline {
  font-family: var(--font-instrument-serif, 'Instrument Serif', serif);
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-muted, #888888);
  margin: 0 0 48px;
  max-width: 60ch;
  line-height: 1.5;
}

/* Metrics strip */
.metrics {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
  padding-top: 32px;
  border-top: 1px solid rgba(245, 240, 232, 0.07);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metricValue {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--color-accent, #FF4D00);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.metricLabel {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.78rem;
  color: var(--color-muted, #888888);
  max-width: 22ch;
  line-height: 1.35;
}

/* Shared section */
.section {
  max-width: 1080px;
  margin: 0 auto;
  padding: 64px 5vw;
  border-top: 1px solid rgba(245, 240, 232, 0.06);
}

.sectionLabel {
  display: inline-block;
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted, #888888);
  margin-bottom: 24px;
}

.sectionH2 {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text, #F5F0E8);
  margin: 0 0 16px;
}

.sectionBody {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.95rem;
  color: var(--color-muted, #888888);
  line-height: 1.65;
  max-width: 58ch;
  margin: 0 0 32px;
}

/* Prose paragraphs */
.prose {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 66ch;
}

.prose p {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.975rem;
  line-height: 1.7;
  color: rgba(245, 240, 232, 0.75);
  margin: 0;
}

/* Launch button */
.launchBtn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: var(--color-accent, #FF4D00);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}

/* Screenshots */
.screenshotsSection {
  max-width: 1080px;
  margin: 0 auto;
  padding: 64px 5vw;
  border-top: 1px solid rgba(245, 240, 232, 0.06);
}

.screenshots {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 8px;
}

.figure {
  margin: 0;
}

.screenshotFrame {
  background: var(--color-surface, #141414);
  border: 1px solid rgba(245, 240, 232, 0.08);
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}

.screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.caption {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.8rem;
  color: var(--color-muted, #888888);
  line-height: 1.5;
  margin-top: 12px;
  max-width: 50ch;
}

/* Stack table */
.stackTable {
  margin-top: 40px;
  border: 1px solid rgba(245, 240, 232, 0.08);
  border-radius: 8px;
  overflow: hidden;
}

.stackHeader {
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr;
  padding: 12px 20px;
  background: rgba(245, 240, 232, 0.04);
  border-bottom: 1px solid rgba(245, 240, 232, 0.08);
}

.stackHeader span {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted, #888888);
}

.stackRow {
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(245, 240, 232, 0.05);
}

.stackRow:last-child {
  border-bottom: none;
}

.stackLayer {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text, #F5F0E8);
}

.stackChoice {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-accent, #FF4D00);
}

.stackWhy {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.8rem;
  color: var(--color-muted, #888888);
  line-height: 1.4;
}

/* Proof blockquote */
.proofQuote {
  font-family: var(--font-instrument-serif, 'Instrument Serif', serif);
  font-style: italic;
  font-size: clamp(1.1rem, 2.2vw, 1.4rem);
  color: var(--color-text, #F5F0E8);
  line-height: 1.55;
  margin: 0;
  max-width: 62ch;
  padding-left: 24px;
  border-left: 3px solid var(--color-accent, #FF4D00);
}

/* CTA section */
.ctaSection {
  max-width: 1080px;
  margin: 0 auto;
  padding: 64px 5vw 120px;
  border-top: 1px solid rgba(245, 240, 232, 0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.ctaLine {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--color-text, #F5F0E8);
  margin: 0;
  max-width: 48ch;
  text-wrap: balance;
}

.ctaBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: var(--color-accent, #FF4D00);
  color: #fff;
  border-radius: 6px;
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

.ctaBtn:hover {
  opacity: 0.9;
}

.backToLab {
  font-family: var(--font-display, 'Cabinet Grotesk', sans-serif);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-muted, #888888);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.15s ease;
}

.backToLab:hover {
  color: var(--color-text, #F5F0E8);
}

/* Mobile */
@media (max-width: 768px) {
  .metrics {
    gap: 28px;
  }

  .screenshots {
    grid-template-columns: 1fr;
  }

  .stackHeader,
  .stackRow {
    grid-template-columns: 1fr 1fr;
  }

  .stackWhy {
    display: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd c:/dev/darling-martech && git add components/lab/LabDetailPage.module.css && git commit -m "feat: add LabDetailPage CSS module"
```

---

### Task 4: Create `LabDetailPage` component

**Files:**
- Create: `components/lab/LabDetailPage.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/lab/LabDetailPage.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import LabModal from './LabModal'
import { springEntrance, viewport } from '@/lib/motion'
import type { LabDetailProps } from '@/data/labs'
import styles from './LabDetailPage.module.css'

export default function LabDetailPage({
  slug,
  name,
  category,
  year,
  tagline,
  metrics,
  problemBody,
  buildStack,
  buildBody,
  impactBody,
  proofStatement,
  ctaLine,
  toolSrc,
  screenshots,
}: LabDetailProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.page}>
      {/* Back link */}
      <div className={styles.backWrap}>
        <Link href="/lab" className={styles.backLink}>
          <ArrowLeft weight="regular" size={15} />
          All builds
        </Link>
      </div>

      {/* Hero — animate on mount, not whileInView */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.heroMeta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.year}>{year}</span>
        </div>
        <h1 className={styles.h1}>{name}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.metrics}>
          {metrics.map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={styles.metricValue}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Try It Now */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>Try It Now</span>
        <h2 className={styles.sectionH2}>Launch the tool below.</h2>
        <p className={styles.sectionBody}>
          This is the actual tool — not a screenshot, not a video. Click Launch to open it
          in a full panel and use it yourself.
        </p>
        <motion.button
          className={styles.launchBtn}
          onClick={() => setModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        >
          <PlayCircle weight="fill" size={20} />
          Launch {name}
        </motion.button>
      </motion.section>

      {/* The Problem */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Problem</span>
        <div className={styles.prose}>
          {problemBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.section>

      {/* Screen Captures — conditional */}
      {screenshots.length > 0 && (
        <motion.section
          className={styles.screenshotsSection}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={springEntrance}
        >
          <span className={styles.sectionLabel}>Screen Captures</span>
          <div className={styles.screenshots}>
            {screenshots.map((s, i) => (
              <figure key={i} className={styles.figure}>
                <div className={styles.screenshotFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt={s.alt} className={styles.screenshot} loading="lazy" />
                </div>
                <figcaption className={styles.caption}>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </motion.section>
      )}

      {/* The Build */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Build</span>
        <div className={styles.prose}>
          {buildBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className={styles.stackTable}>
          <div className={styles.stackHeader}>
            <span>Layer</span>
            <span>Choice</span>
            <span>Why</span>
          </div>
          {buildStack.map((row) => (
            <div key={row.layer} className={styles.stackRow}>
              <span className={styles.stackLayer}>{row.layer}</span>
              <span className={styles.stackChoice}>{row.choice}</span>
              <span className={styles.stackWhy}>{row.why}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* The Impact */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>The Impact</span>
        <div className={styles.prose}>
          {impactBody.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.section>

      {/* What This Proves */}
      <motion.section
        className={styles.section}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>What This Proves</span>
        <blockquote className={styles.proofQuote}>{proofStatement}</blockquote>
      </motion.section>

      {/* CTA */}
      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <p className={styles.ctaLine}>{ctaLine}</p>
        <Link href="/contact" className={styles.ctaBtn}>
          Let&apos;s talk
          <ArrowRight weight="regular" size={16} />
        </Link>
        <Link href="/lab" className={styles.backToLab}>
          ← Back to all builds
        </Link>
      </motion.section>

      {/* Modal */}
      <LabModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        toolSrc={toolSrc}
        toolName={name}
        toolSlug={slug}
      />
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd c:/dev/darling-martech && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd c:/dev/darling-martech && git add components/lab/LabDetailPage.tsx && git commit -m "feat: add LabDetailPage component with 9 sections and modal integration"
```

---

### Task 5: Create the dynamic route

**Files:**
- Create: `app/lab/[slug]/page.tsx`

- [ ] **Step 1: Create the file**

```typescript
// app/lab/[slug]/page.tsx
import { notFound } from 'next/navigation'
import LabDetailPage from '@/components/lab/LabDetailPage'
import { LAB_DETAIL_DATA } from '@/data/labs'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LabSlugPage({ params }: Props) {
  const { slug } = await params
  const lab = LAB_DETAIL_DATA[slug]
  if (!lab) notFound()
  return <LabDetailPage {...lab} />
}

export async function generateStaticParams() {
  return Object.keys(LAB_DETAIL_DATA).map((slug) => ({ slug }))
}
```

- [ ] **Step 2: Verify TypeScript and build**

```bash
cd c:/dev/darling-martech && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd c:/dev/darling-martech && git add app/lab/[slug]/page.tsx && git commit -m "feat: add /lab/[slug] dynamic route with generateStaticParams"
```

---

### Task 6: Update `app/lab/page.tsx`

**Files:**
- Modify: `app/lab/page.tsx`

- [ ] **Step 1: Extend the `Tool` type**

In `app/lab/page.tsx`, find the `Tool` type definition (lines 21–28) and add `detailHref`:

```typescript
type Tool = {
  name: string
  category: 'Marketing' | 'Developer' | 'Technologist'
  status: 'Production' | 'Beta' | 'Experimental'
  description: string
  stack: string[]
  url?: string
  detailHref?: string
}
```

- [ ] **Step 2: Replace the 3 existing Graston entries and remove Graston Growth Engine**

Find and replace this block in the `tools` array (the Marketing section entry and the three Developer section entries for Graston tools):

Remove:
```typescript
  { name: 'Graston Growth Engine', category: 'Marketing', status: 'Experimental', description: 'Marketing automation and lead scoring engine built for the Graston Technique ecosystem.', stack: ['Next.js', 'FluentCRM', 'REST API'] },
```

Remove (from Developer section):
```typescript
  { name: 'Clinical Compass', category: 'Developer', status: 'Production', description: 'Healthcare provider lookup and clinical resource tool built for patient-facing use.', stack: ['Next.js', 'REST API', 'TypeScript'], url: 'https://bearcave-marketing-v2.vercel.app/lab/clinical-compass' },
  { name: 'License Hub', category: 'Developer', status: 'Production', description: 'Professional license verification hub with state-level lookup and expiration tracking.', stack: ['Next.js', 'Node.js', 'API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/license-hub' },
  { name: 'GT9 Pricing Tool', category: 'Developer', status: 'Production', description: 'Custom pricing calculator for Graston Technique product configurations and course bundles.', stack: ['React', 'TypeScript', 'WooCommerce API'], url: 'https://bearcave-marketing-v2.vercel.app/lab/gt9-pricing' },
```

Add these 4 entries in their place (Investment ROI Planner in the Marketing section, the other 3 in the Developer section):

In the Marketing section (after `{ name: 'ROI Calculator', ...`):
```typescript
  { name: 'Investment ROI Planner', category: 'Marketing', status: 'Production', description: 'Self-serve financial planning tool that helps practitioners calculate ROI on Graston certification before talking to sales.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/investment-roi-planner' },
```

In the Developer section (replacing the 3 removed entries):
```typescript
  { name: 'Clinical Compass', category: 'Developer', status: 'Production', description: 'Decision-support tool helping Graston practitioners navigate clinical protocols and treatment pathways without calling the home office.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/clinical-compass' },
  { name: 'License Requirements Navigator', category: 'Developer', status: 'Production', description: 'State-by-state licensing lookup for healthcare practitioners — which credentials they need, which Graston certs count toward them.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/license-requirements' },
  { name: 'Smart Sales & Pricing Tool', category: 'Developer', status: 'Production', description: 'Real-time pricing calculator for Graston certification bundles, equipment configurations, and institutional accounts.', stack: ['HTML', 'CSS', 'JavaScript'], detailHref: '/lab/smart-sales-pricing' },
```

- [ ] **Step 3: Update `ToolCard` render logic**

Find the `ToolCard` function. Update the `GalleryHoverCard` props to handle `detailHref`:

```typescript
function ToolCard({
  tool,
  onHighlight,
}: {
  readonly tool: Tool
  readonly onHighlight: (target: string | null) => void
}) {
  const hasDetail = Boolean(tool.detailHref)
  const hasUrl = Boolean(tool.url)

  return (
    <GalleryHoverCard
      title={tool.name}
      summary={tool.description}
      href={tool.detailHref ?? tool.url}
      cover={<ToolCardCover tool={tool} />}
      eyebrow={tool.category}
      badges={[tool.status, ...tool.stack.slice(0, 2)]}
      footer={
        <span
          className={styles.toolFooterMeta}
          onMouseEnter={hasDetail || hasUrl ? () => onHighlight(`${tool.name}-launch`) : undefined}
          onMouseLeave={hasDetail || hasUrl ? () => onHighlight(tool.name) : undefined}
        >
          {hasDetail ? 'Explore build details' : hasUrl ? 'Open deployed tool' : 'Rebuilding — check back soon'}
        </span>
      }
      ctaLabel={hasDetail ? 'Read the build' : hasUrl ? 'Launch app' : undefined}
      external={!hasDetail && hasUrl}
      interactiveId={tool.name}
      onHighlightChange={onHighlight}
      variant="lab"
    />
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd c:/dev/darling-martech && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd c:/dev/darling-martech && git add app/lab/page.tsx && git commit -m "feat: wire 4 Graston lab tools to internal /lab/[slug] detail routes"
```

---

### Task 7: Full build verification

**Files:** none (verification only)

- [ ] **Step 1: Run full build**

```bash
cd c:/dev/darling-martech && npm run build 2>&1 | tail -30
```

Expected: `✓ Compiled successfully` or equivalent. Four static pages generated for `/lab/[slug]`.

- [ ] **Step 2: Check all 4 slugs appear in build output**

Look for these in the build output:
```
/lab/clinical-compass
/lab/smart-sales-pricing
/lab/investment-roi-planner
/lab/license-requirements
```

- [ ] **Step 3: Final commit if any fixes were needed**

If the build required any adjustments, commit them:
```bash
cd c:/dev/darling-martech && git add -p && git commit -m "fix: resolve build issues from lab detail pages"
```

---

## Self-Review

**Spec coverage:**
- ✅ `data/labs.ts` with `LabDetailProps` interface — Task 1
- ✅ All 4 tool entries with full content — Task 1
- ✅ Exact `toolSrc` paths matching `/public/labs/` filenames — Task 1
- ✅ `LabModal` with AnimatePresence, Escape key, scroll lock, mobile full-screen — Task 2
- ✅ `LabDetailPage` with all 9 sections — Task 4
- ✅ Hero uses `animate` (not `whileInView`) — Task 4
- ✅ Screenshots section conditional on `screenshots.length > 0` — Task 4
- ✅ Stack table 3 columns — Task 4
- ✅ Blockquote with left accent border — Task 4
- ✅ Dynamic route with `await params` (Next.js 15+) — Task 5
- ✅ `generateStaticParams` for all 4 slugs — Task 5
- ✅ Tool type extended with `detailHref` — Task 6
- ✅ Graston Growth Engine removed — Task 6
- ✅ 3 renamed entries + 1 new Investment ROI Planner — Task 6
- ✅ `ToolCard` priority logic: `detailHref` → `url` → neither — Task 6
- ✅ `LabModal` imported from `@/lib/motion` `springCinematic` — Task 2 ✅

**Type consistency check:**
- `LabDetailProps` defined in `data/labs.ts`, imported via `import type { LabDetailProps } from '@/data/labs'` in `LabDetailPage.tsx` — consistent
- `LAB_DETAIL_DATA` exported from `data/labs.ts`, imported in `app/lab/[slug]/page.tsx` — consistent
- `LabModal` props: `isOpen`, `onClose`, `toolSrc`, `toolName`, `toolSlug` — used identically in `LabDetailPage.tsx` — consistent
- `springCinematic`, `springEntrance`, `viewport` all exported from `lib/motion.ts` — confirmed present

**No placeholders found.**
