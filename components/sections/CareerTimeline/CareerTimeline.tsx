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
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
