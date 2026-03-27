# About Page — Career Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat career list on the About page with an immersive scroll-animated vertical timeline featuring a dedicated Darling MarTech founder block, GSAP spine draw animation, Framer Motion depth entrance effects, and per-card accordion expand/collapse with grouped detail bullets.

**Architecture:** A new `CareerTimeline/` component folder encapsulates all timeline logic — parent component owns accordion state and GSAP init, `FounderBlock` is a pure presentational component, `TimelineCard` is a self-contained accordion card. The about page simply swaps out the old career section for `<CareerTimeline />`.

**Tech Stack:** Framer Motion 11 (entrance animations, accordion, chevron rotation), GSAP 3 + ScrollTrigger (spine draw), @phosphor-icons/react (CaretDown), CSS Modules + CSS custom properties.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `components/sections/CareerTimeline/CareerTimeline.tsx` | Parent — career data, openIndex state, GSAP spine init, renders FounderBlock + timeline |
| Create | `components/sections/CareerTimeline/FounderBlock.tsx` | Editorial founder panel — no state, Framer Motion only |
| Create | `components/sections/CareerTimeline/TimelineCard.tsx` | Single accordion job card |
| Create | `components/sections/CareerTimeline/CareerTimeline.module.css` | All styles for the three components |
| Modify | `app/about/page.tsx` | Remove career array + career section, import CareerTimeline |
| Modify | `app/about/About.module.css` | Remove career-related CSS rules |

---

## Task 1: Create CareerTimeline.module.css

**Files:**
- Create: `components/sections/CareerTimeline/CareerTimeline.module.css`

- [ ] **Step 1: Create the CSS module with all styles**

```css
/* ── Founder Block ── */

.founderBlock {
  position: relative;
  display: grid;
  gap: 2.5rem;
  padding: 2.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: 16px;
  margin-bottom: 5rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .founderBlock {
    grid-template-columns: 180px 1fr;
    gap: 4rem;
    padding: 3rem;
  }
}

.founderYear {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(4rem, 8vw, 7rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-text);
  opacity: 0.12;
  margin: 0;
  line-height: 0.9;
}

.founderPresent {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0.75rem 0 0.25rem;
}

.founderRole {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
}

.founderCopy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.founderHeading {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 0.5rem;
}

.founderPara {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-muted);
  margin: 0;
  max-width: 65ch;
}

/* ── Timeline wrapper ── */

.timelineSection {
  margin-bottom: 5rem;
}

.sectionLabel {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 3rem;
}

.timelineOuter {
  position: relative;
}

/* Spine line — animated via GSAP */
.spine {
  display: none;
}

@media (min-width: 768px) {
  .spine {
    display: block;
    position: absolute;
    left: 72px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-border-accent);
    transform-origin: top;
    /* scaleY animated by GSAP from 0 to 1 */
  }
}

.timelineList {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* perspective for 3D depth effect on cards */
  perspective: 1200px;
}

@media (min-width: 768px) {
  .timelineList {
    padding-left: 100px;
  }
}

/* ── Timeline Card ── */

.cardOuter {
  position: relative;
}

/* Year label — left of spine */
.yearLabel {
  display: none;
}

@media (min-width: 768px) {
  .yearLabel {
    display: block;
    position: absolute;
    left: -100px;
    top: 1.75rem;
    width: 60px;
    text-align: right;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: rgba(136, 136, 136, 0.6);
    line-height: 1;
  }
}

/* Dot connector */
.dot {
  display: none;
}

@media (min-width: 768px) {
  .dot {
    display: block;
    position: absolute;
    left: -32px;
    top: 1.875rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-accent);
    transform: translateX(-50%);
    transition: transform 0.2s ease;
  }
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.4s cubic-bezier(0.32, 0.72, 0, 1);
  cursor: pointer;
}

.card:hover {
  border-color: var(--color-border-accent);
}

.cardHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.75rem 2rem;
}

.cardMeta {
  flex: 1;
  min-width: 0;
}

.cardTitle {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.9375rem;
  color: var(--color-text);
  margin: 0 0 0.25rem;
}

.cardCompany {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-accent);
  margin: 0 0 0.125rem;
}

.cardLocation {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(136, 136, 136, 0.6);
  margin: 0;
}

.cardPeriod {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: rgba(136, 136, 136, 0.6);
  margin: 0.375rem 0 0;
}

/* Year inline for mobile */
.cardYearMobile {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 0.375rem;
}

@media (min-width: 768px) {
  .cardYearMobile {
    display: none;
  }
}

.cardSummary {
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-muted);
  margin: 0.75rem 0 0;
  max-width: 72ch;
}

.chevron {
  flex-shrink: 0;
  margin-top: 0.125rem;
  color: var(--color-muted);
}

/* ── Accordion expanded content ── */

.detailsWrap {
  overflow: hidden;
}

.detailsInner {
  padding: 0 2rem 1.75rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}

.detailGroups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detailGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detailCategory {
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0;
}

.detailBullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.detailBullets li {
  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-muted);
  padding-left: 1rem;
  position: relative;
}

.detailBullets li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--color-border-accent);
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/CareerTimeline/CareerTimeline.module.css
git commit -m "feat: add CareerTimeline CSS module"
```

---

## Task 2: Create FounderBlock.tsx

**Files:**
- Create: `components/sections/CareerTimeline/FounderBlock.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, springCinematic, viewport } from '@/lib/motion'
import styles from './CareerTimeline.module.css'

export function FounderBlock() {
  return (
    <motion.div
      className={styles.founderBlock}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={containerVariants}
    >
      {/* Left — year anchor */}
      <motion.div variants={itemVariants}>
        <p className={styles.founderYear}>2026</p>
        <p className={styles.founderPresent}>Present</p>
        <p className={styles.founderRole}>Founder</p>
      </motion.div>

      {/* Right — editorial copy */}
      <motion.div variants={containerVariants} className={styles.founderCopy}>
        <motion.div variants={itemVariants}>
          <h3 className={styles.founderHeading}>Darling MarTech</h3>
          <p className={styles.founderPara}>
            I started Darling MarTech in January 2026 because small businesses deserve the kind of
            senior-level marketing strategy and technical execution that used to be reserved for brands
            with agency retainers — and they deserve it from one person who actually does the work.
          </p>
        </motion.div>
        <motion.p variants={itemVariants} className={styles.founderPara}>
          I work with small businesses and startups that need both the strategy and the system
          that executes it. The ones who are tired of hiring agencies that hand them off to juniors,
          or freelancers who can build a site but can&apos;t build a pipeline.
        </motion.p>
        <motion.p variants={itemVariants} className={styles.founderPara}>
          I solve the gap between marketing vision and technical reality. No hand-offs. No account
          managers. Strategy, automation, development, and analytics — handled directly, measured
          honestly, built to compound.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/CareerTimeline/FounderBlock.tsx
git commit -m "feat: add FounderBlock component"
```

---

## Task 3: Create TimelineCard.tsx

**Files:**
- Create: `components/sections/CareerTimeline/TimelineCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { springStandard } from '@/lib/motion'
import styles from './CareerTimeline.module.css'

export type JobDetail = {
  category: string
  bullets: string[]
}

export type Job = {
  title: string
  company: string
  location: string
  period: string
  year: string
  summary: string
  details: JobDetail[]
}

interface TimelineCardProps {
  job: Job
  isOpen: boolean
  onToggle: () => void
  index: number
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
}

export function TimelineCard({ job, isOpen, onToggle, index }: TimelineCardProps) {
  return (
    <motion.div
      className={styles.cardOuter}
      variants={cardVariants}
      custom={index}
    >
      {/* Year label — desktop only, left of spine */}
      <span className={styles.yearLabel}>{job.year}</span>

      {/* Dot connector — desktop only */}
      <motion.span
        className={styles.dot}
        whileHover={{ scale: 1.4 }}
        transition={springStandard}
      />

      {/* Card */}
      <div
        className={styles.card}
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
      >
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.cardMeta}>
            <p className={styles.cardYearMobile}>{job.year}</p>
            <p className={styles.cardTitle}>{job.title}</p>
            <p className={styles.cardCompany}>{job.company}</p>
            <p className={styles.cardLocation}>{job.location}</p>
            <p className={styles.cardPeriod}>{job.period}</p>
            <p className={styles.cardSummary}>{job.summary}</p>
          </div>
          <motion.span
            className={styles.chevron}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={springStandard}
          >
            <CaretDown size={18} weight="light" />
          </motion.span>
        </div>

        {/* Accordion details */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className={styles.detailsWrap}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={springStandard}
            >
              <div className={styles.detailsInner}>
                <div className={styles.detailGroups}>
                  {job.details.map((group) => (
                    <div key={group.category} className={styles.detailGroup}>
                      <p className={styles.detailCategory}>{group.category}</p>
                      <ul className={styles.detailBullets}>
                        {group.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/CareerTimeline/TimelineCard.tsx
git commit -m "feat: add TimelineCard accordion component"
```

---

## Task 4: Create CareerTimeline.tsx (parent)

**Files:**
- Create: `components/sections/CareerTimeline/CareerTimeline.tsx`

- [ ] **Step 1: Create the parent component with full career data**

```tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { containerVariants, fadeVariants, viewport } from '@/lib/motion'
import { FounderBlock } from './FounderBlock'
import { TimelineCard } from './TimelineCard'
import type { Job } from './TimelineCard'
import styles from './CareerTimeline.module.css'

gsap.registerPlugin(ScrollTrigger)

const career: Job[] = [
  {
    title: 'Marketing Director',
    company: 'Graston Technique LLC',
    location: 'Indianapolis, IN',
    period: 'Aug 2023 – Dec 2025',
    year: '2023',
    summary:
      'Built full MarTech ecosystem for a high-volume clinician education platform serving thousands of providers.',
    details: [
      {
        category: 'System Architecture',
        bullets: [
          'Built integrated ecosystem with LearnDash LMS, WooCommerce, WP Fusion, Gravity Forms, Uncanny Automator, and FluentCRM.',
          "Architected 'Buy Now, Choose Later' credit system for training bundles.",
        ],
      },
      {
        category: 'AI & Automation',
        bullets: [
          'Built and deployed GPT-powered assistant connected via REST APIs for CEU rules, order lookups, and training suggestions.',
          '400+ automations triggered by tags, training progress, or form submissions.',
        ],
      },
      {
        category: 'Analytics & Dashboards',
        bullets: [
          'Created provider analytics dashboards syncing GA4 data via GTM and Analytify.',
          'Displays page views, link clicks, social metrics, UTM sources with admin override and export options.',
        ],
      },
      {
        category: 'Performance & DevOps',
        bullets: [
          'Optimized site speed with WP Rocket, LiteSpeed, Cloudflare CDN, async/defer scripts, GTM server-side tagging.',
          'Built REST-based dashboards with Cloudflare Workers + Mapbox.',
        ],
      },
      {
        category: 'Cloudflare',
        bullets: [
          'Rate-limiting, WAF rules, Bot Fight Mode, Tiered Cache, Managed Transforms, Page Rules, SSL/TLS Origin Cert, DNSSEC.',
        ],
      },
      {
        category: 'Server',
        bullets: [
          'Brotli + gzip compression, browser caching, security headers, cookie-free CDN, LiteSpeed CDN, WP Rocket page cache, PHP-FPM optimization, PHP 8.3 upgrade.',
        ],
      },
      {
        category: 'Monitoring & Recovery',
        bullets: [
          'Netdata monitoring and alerts, critical error recovery, server resource review, PHP handler update.',
        ],
      },
      {
        category: 'Code & Database',
        bullets: [
          'Search & replace cleanup, autoloaded options cleanup, JS and asset optimization, font and DNS preload fixes, Apache tuning.',
        ],
      },
      {
        category: 'Team Leadership',
        bullets: [
          'Managed cross-functional sprints with developers, designers, instructors, and marketing associates.',
          'Translated business goals into dev-ready specifications.',
        ],
      },
      {
        category: 'Tracking & Conversion',
        bullets: [
          'Form submission tracking (Gravity Forms / GTM / Google Ads), engagement tracking, conversion optimization, PixelYourSite Pro.',
        ],
      },
      {
        category: 'Instructor Tools',
        bullets: [
          'Dynamic event map integration with Google Maps API.',
          'Instructor dashboard with event filtering and instrument visibility.',
        ],
      },
      {
        category: 'Platform Development',
        bullets: ['LearnDash Multisite planning and architecture.'],
      },
    ],
  },
  {
    title: 'Interim Director of Marketing',
    company: 'Ultimate Technologies Group',
    location: 'Fishers, IN',
    period: 'Mar – Jul 2023',
    year: '2023',
    summary:
      'Led marketing strategy and execution during a key transitional period, ensuring business continuity across all channels.',
    details: [
      {
        category: 'Marketing Operations',
        bullets: [
          'End-to-end marketing communications including internal messaging, external campaigns, and stakeholder engagement.',
        ],
      },
      {
        category: 'Paid Media',
        bullets: ['Managed and optimized Google Ads campaigns — improved lead generation, CTR, and overall ROI.'],
      },
      {
        category: 'Content',
        bullets: [
          'Oversaw website, email marketing, social media, and sales collateral to support business development.',
        ],
      },
      {
        category: 'Cross-Functional',
        bullets: [
          'Coordinated with sales, customer success, and executive leadership to align marketing strategy with organizational goals.',
        ],
      },
      {
        category: 'Automation & CRM',
        bullets: [
          'Implemented marketing automation workflows and CRM integrations to streamline operations and enhance campaign performance tracking.',
        ],
      },
      {
        category: 'Research',
        bullets: ['Conducted market research and competitive analysis to refine targeting and positioning.'],
      },
      {
        category: 'SEO & Paid',
        bullets: ['Managed and optimized paid media and SEO, driving qualified traffic and online visibility.'],
      },
      {
        category: 'Branding',
        bullets: ['Directed branding updates and ensured visual and messaging alignment across all customer touchpoints.'],
      },
      {
        category: 'Leadership',
        bullets: ['Provided leadership and mentoring to the marketing team during organizational change.'],
      },
    ],
  },
  {
    title: 'Marketing Manager',
    company: 'Riley Bennett Egloff LLP',
    location: 'Indianapolis, IN',
    period: 'Jul 2022 – Mar 2023',
    year: '2022',
    summary:
      'Led strategic marketing, digital communications, and client development for a leading Indianapolis law firm.',
    details: [
      {
        category: 'Content & Collateral',
        bullets: [
          'Designed, built, and managed brochures, advertisements, email campaigns, newsletters, social media content, and RBE magazines.',
        ],
      },
      {
        category: 'Website & SEO',
        bullets: [
          'Full ownership of the RBE website — enhancing performance, SEO, and user experience.',
        ],
      },
      {
        category: 'PR & Media',
        bullets: [
          'Cultivated media relationships, drafted press releases, and secured firm publicity in legal news and thought leadership.',
        ],
      },
      {
        category: 'Email & Social',
        bullets: [
          'Created and executed direct email marketing and social media campaigns; tracked performance metrics and optimized results.',
        ],
      },
      {
        category: 'Business Development',
        bullets: [
          'Partnered with attorneys to develop individualized BD plans — successfully identifying new client engagement opportunities.',
        ],
      },
      {
        category: 'Proposals',
        bullets: [
          'Developed strategic pitch materials and managed RFP/proposal responses showcasing firm capabilities.',
        ],
      },
      {
        category: 'Awards & Recognition',
        bullets: [
          'Played key role in industry submissions and award nominations, increasing firm visibility and market recognition.',
        ],
      },
      {
        category: 'Relationships',
        bullets: [
          'Established trusted relationships with practice group leaders to support cross-selling and firm-wide business growth.',
        ],
      },
    ],
  },
  {
    title: 'Marketing Administrator',
    company: 'Riley Bennett Egloff LLP',
    location: 'Greater Indianapolis',
    period: 'Jun 2015 – Nov 2022',
    year: '2015',
    summary:
      'Managed content marketing, website, social media, graphic design, and firm-to-client communications.',
    details: [
      {
        category: 'Content Marketing',
        bullets: ['Managed all content initiatives across web, email, and print.'],
      },
      {
        category: 'Business Development',
        bullets: ['Developed and managed business development plans for individual attorneys.'],
      },
      {
        category: 'RFP Responses',
        bullets: ["Assisted in responding to the firm's RFP responses."],
      },
      {
        category: 'Strategic Planning',
        bullets: [
          "Worked with the Marketing Committee to carry out the firm's strategic marketing plan.",
        ],
      },
    ],
  },
  {
    title: 'Marketing Coordinator',
    company: 'Deerfield Financial Advisors',
    location: 'Indianapolis, IN',
    period: 'Jun 2013 – Jun 2015',
    year: '2013',
    summary:
      'Executed marketing initiatives to elevate brand awareness and attract new clients for a financial advisory firm.',
    details: [
      {
        category: 'Events',
        bullets: [
          'Planned and managed client-facing seminars and events, enhancing retention and brand credibility.',
        ],
      },
      {
        category: 'Content',
        bullets: [
          'Wrote and maintained website content, email marketing, and printed collateral with consistent brand messaging.',
        ],
      },
      {
        category: 'Technology',
        bullets: [
          'Researched, evaluated, and implemented new technology platforms improving client services and operational efficiency.',
        ],
      },
      {
        category: 'Compliance',
        bullets: [
          'Collaborated with Chief Compliance Officer to review all marketing materials for FINRA and SEC compliance.',
        ],
      },
    ],
  },
  {
    title: 'Marketing Coordinator',
    company: 'Pike Medical Consultants',
    location: 'Greater Indianapolis',
    period: 'Sep 2009 – Jun 2013',
    year: '2009',
    summary:
      'Directed all marketing — strategy, budgeting, advertising, branding, PR, website, and events. Reported directly to the company president.',
    details: [
      {
        category: 'Growth',
        bullets: [
          'Drove a 45% increase in patient visits over three years with consistently positive ROI.',
        ],
      },
      {
        category: 'Campaigns',
        bullets: [
          'Designed and executed integrated marketing and advertising campaigns contributing to sustained company growth.',
        ],
      },
      {
        category: 'Website',
        bullets: [
          'Led creation of new company website, modernizing digital presence and improving patient engagement.',
        ],
      },
      {
        category: 'Communications',
        bullets: [
          'Developed internal and external communication strategies to strengthen brand positioning.',
        ],
      },
      {
        category: 'PR',
        bullets: [
          'Oversaw public relations efforts to increase awareness and credibility in the healthcare community.',
        ],
      },
      {
        category: 'Analytics',
        bullets: [
          'Implemented data-driven tracking and evaluation to measure campaign effectiveness and inform future strategy.',
        ],
      },
    ],
  },
  {
    title: 'Marketing Intern',
    company: 'OrthoIndy',
    location: 'Indianapolis, IN',
    period: '2006 – 2007',
    year: '2007',
    summary:
      'Gained foundational experience in healthcare marketing — content development and event coordination.',
    details: [
      {
        category: 'Content & Events',
        bullets: [
          'Assisted with content development and event coordination in a professional healthcare marketing environment.',
        ],
      },
    ],
  },
]

export function CareerTimeline() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const spineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spine = spineRef.current
    const section = sectionRef.current
    if (!spine || !section) return

    gsap.set(spine, { scaleY: 0, transformOrigin: 'top' })

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(spine, {
          scaleY: 1,
          duration: 1.4,
          ease: 'power2.out',
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  function handleToggle(key: string) {
    setOpenIndex((prev) => (prev === key ? null : key))
  }

  return (
    <>
      <FounderBlock />

      <motion.div
        ref={sectionRef}
        className={styles.timelineSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
      >
        <motion.p variants={fadeVariants} className={styles.sectionLabel}>
          Career History
        </motion.p>

        <div className={styles.timelineOuter}>
          {/* GSAP-animated spine */}
          <div ref={spineRef} className={styles.spine} aria-hidden="true" />

          <motion.div className={styles.timelineList} variants={containerVariants}>
            {career.map((job, i) => {
              const key = `${job.company}-${job.period}`
              return (
                <TimelineCard
                  key={key}
                  job={job}
                  index={i}
                  isOpen={openIndex === key}
                  onToggle={() => handleToggle(key)}
                />
              )
            })}
          </div>
        </div>
      </motion.div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/CareerTimeline/CareerTimeline.tsx
git commit -m "feat: add CareerTimeline parent component with full career data and GSAP spine"
```

---

## Task 5: Wire CareerTimeline into the About page

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/about/About.module.css`

- [ ] **Step 1: Update `app/about/page.tsx`**

Remove the `career` const array (lines 13–55) and the entire career section JSX block (the `motion.div` with `className={styles.career}`). Add the import and replace with `<CareerTimeline />`.

The final file should look like this:

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, slideInRight, fadeVariants, springEntrance, viewport } from '@/lib/motion'
import { buildCloudinaryUrl } from '@/lib/cloudinary'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { CareerTimeline } from '@/components/sections/CareerTimeline/CareerTimeline'
import styles from './About.module.css'

const BIO_PHOTO_SRC = buildCloudinaryUrl('studio/graphic-design/bio-featured-2')

const industries = [
  'Healthcare', 'Legal', 'Finance', 'SaaS / Tech',
  'Retail / E-commerce', 'Media / Entertainment',
  'Nonprofit', 'B2B', 'B2C', 'Local Service',
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Jacob Darling',
            jobTitle: 'Marketing Strategist & Systems Architect',
            url: 'https://darlingmartech.com',
            email: 'jacob@jacobdarling.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Indianapolis',
              addressRegion: 'IN',
              addressCountry: 'US',
            },
          }),
        }}
      />

      <article className={styles.article}>
        <div className={styles.inner}>

          {/* ── Hero block ── */}
          <div className={styles.heroGrid}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.p variants={fadeVariants} className={styles.eyebrow}>
                About Jacob Darling
              </motion.p>
              <motion.h1 variants={itemVariants} className={styles.headline}>
                Strategy and systems — built by someone who&apos;s done both for 15 years.
              </motion.h1>
              <motion.div variants={containerVariants} className={styles.bio}>
                <motion.p variants={itemVariants}>
                  I&apos;m Jacob Darling — a marketing strategist, systems architect, and technologist
                  based in Indianapolis. Over the past 15 years I&apos;ve built marketing infrastructure
                  for healthcare systems, law firms, financial advisors, e-commerce brands, nonprofits,
                  and startups. I&apos;ve led marketing from the inside as a director and built campaigns
                  from the outside as a consultant. I know both sides.
                </motion.p>
                <motion.p variants={itemVariants}>
                  What makes me different isn&apos;t just the range — it&apos;s the depth. I don&apos;t
                  hand your strategy to a developer and hope for the best. I build the strategy and the
                  system that executes it. CRM architecture, marketing automation, web development,
                  analytics pipelines, AI integrations — I do the work myself, and I measure everything.
                </motion.p>
                <motion.p variants={itemVariants}>
                  I started Darling MarTech because small businesses deserve the kind of senior-level
                  thinking and hands-on execution that used to be reserved for brands with agency
                  retainers. When you work with me, you get me — directly, personally, and accountably.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} initial="hidden" animate="visible">
              <div className={styles.photoWrap}>
                <Image
                  src={BIO_PHOTO_SRC}
                  alt="Jacob Darling — Marketing Strategist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </div>
              <div className={styles.credentialsCard}>
                <p className={styles.credLabel}>Credentials</p>
                <ul className={styles.credList}>
                  <li>B.S. Business Management — Indiana University, 2008</li>
                  <li>Gold Key Photography Award — Scholastic Art &amp; Writing Awards, 2008</li>
                  <li>15+ years across healthcare, legal, finance, e-commerce, nonprofit</li>
                  <li>Indianapolis, IN</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* ── Industries ── */}
          <motion.div
            className={styles.industries}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.p variants={fadeVariants} className={styles.sectionLabel}>
              Industries
            </motion.p>
            <motion.div variants={containerVariants} className={styles.tagGrid}>
              {industries.map((ind) => (
                <motion.span key={ind} variants={itemVariants} className={styles.tag}>
                  {ind}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Career Timeline ── */}
          <CareerTimeline />

          {/* ── CTA ── */}
          <motion.div
            className={styles.ctaStrip}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className={styles.ctaHeadline}>Ready to work together?</h2>
              <p className={styles.ctaBody}>I keep my client list small. Let&apos;s see if we&apos;re a fit.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <MagneticButton radius={120} maxPull={16}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springEntrance}
                  style={{ display: 'inline-block' }}
                >
                  <Link href="/contact" className={styles.ctaBtn}>
                    Get in touch
                    <span className={styles.ctaArrow}>→</span>
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>

        </div>
      </article>
    </>
  )
}
```

- [ ] **Step 2: Remove career rules from `app/about/About.module.css`**

Delete the following rule blocks from that file (they now live in `CareerTimeline.module.css`):

```css
/* ── Career ── */

.career { ... }
.careerList { ... }
.careerItem { ... }
@media (min-width: 768px) { .careerItem { ... } }
.jobTitle { ... }
.jobCompany { ... }
.jobPeriod { ... }
.jobDesc { ... }
```

Specifically remove lines 155–208 of the current `About.module.css`.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx app/about/About.module.css
git commit -m "feat: wire CareerTimeline into about page, remove old career section"
```

---

## Task 6: Verify the build

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

Navigate to `http://localhost:3000/about`.

Expected:
- Founder block renders above the timeline with orange left border, ghosted "2026", three prose paragraphs
- Timeline spine draws in as you scroll down (desktop only)
- Each job card shows title, company, location, period, summary, and a caret chevron on the right
- Clicking a card expands the accordion with grouped category headers and bullets; chevron rotates 180°
- Clicking again or clicking a different card collapses it
- On mobile (< 768px): no spine line, year shows inline in card header as orange small caps

- [ ] **Step 2: Check for TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit if clean**

```bash
git add -A
git commit -m "feat: complete about page career timeline with accordion and GSAP spine"
```
