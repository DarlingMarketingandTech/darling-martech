'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Metadata } from 'next'

const career = [
  {
    title: 'Marketing Director',
    company: 'Graston Technique LLC',
    period: 'Aug 2023 – Dec 2025',
    description:
      'Built full MarTech ecosystem: LearnDash LMS, WooCommerce, WP Fusion, FluentCRM. Deployed GPT-powered AI assistant via REST APIs. Built 400+ automations. Created GA4 analytics dashboards.',
  },
  {
    title: 'Interim Director of Marketing',
    company: 'Ultimate Technologies Group',
    period: 'Mar – Jul 2023',
    description:
      'Led marketing strategy during transition. Google Ads optimization, marketing automation, CRM integration, branding updates.',
  },
  {
    title: 'Marketing Manager',
    company: 'Riley Bennett Egloff LLP',
    period: 'Jul 2022 – Mar 2023',
    description:
      'Full marketing ownership for law firm. Website, SEO, PR, email, social, business development plans, RFP responses.',
  },
  {
    title: 'Marketing Administrator',
    company: 'Riley Bennett Egloff LLP',
    period: 'Jun 2015 – Nov 2022',
    description:
      'Content marketing, website, social media, graphic design, brand development, strategic marketing plan execution.',
  },
  {
    title: 'Marketing Coordinator',
    company: 'Deerfield Financial Advisors',
    period: 'Jun 2013 – Jun 2015',
    description: 'Events, content, tech platforms, FINRA/SEC compliance review.',
  },
  {
    title: 'Marketing Coordinator',
    company: 'Pike Medical Consultants',
    period: 'Sep 2009 – Jun 2013',
    description:
      'Drove 45% increase in patient visits over 3 years. Full marketing ownership reporting directly to company president.',
  },
]

const industries = [
  'Healthcare',
  'Legal',
  'Finance',
  'SaaS / Tech',
  'Retail / E-commerce',
  'Media / Entertainment',
  'Nonprofit',
  'B2B',
  'B2C',
  'Local Service',
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* Structured data */}
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

      <article className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero block */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-28 items-start">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6"
              >
                About Jacob Darling
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-10 text-balance"
              >
                Strategy and systems — built by someone who&apos;s done both for 15 years.
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5 text-mid-gray font-body leading-relaxed text-base md:text-lg"
              >
                <p>
                  I&apos;m Jacob Darling — a marketing strategist, systems architect, and technologist
                  based in Indianapolis. Over the past 15 years I&apos;ve built marketing infrastructure
                  for healthcare systems, law firms, financial advisors, e-commerce brands, nonprofits,
                  and startups. I&apos;ve led marketing from the inside as a director and built campaigns
                  from the outside as a consultant. I know both sides.
                </p>
                <p>
                  What makes me different isn&apos;t just the range — it&apos;s the depth. I don&apos;t
                  hand your strategy to a developer and hope for the best. I build the strategy and the
                  system that executes it. CRM architecture, marketing automation, web development,
                  analytics pipelines, AI integrations — I do the work myself, and I measure everything.
                </p>
                <p>
                  I started Darling MarTech because small businesses deserve the kind of senior-level
                  thinking and hands-on execution that used to be reserved for brands with agency
                  retainers. When you work with me, you get me — directly, personally, and accountably.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                <Image
                  src="/images/jacob-bio-photo-splash.jpg"
                  alt="Jacob Darling — Marketing Strategist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Credentials card */}
              <div className="mt-6 p-6 border border-white/8 bg-white/[0.02] space-y-3">
                <p className="text-xs text-electric-orange font-body tracking-widest uppercase">Credentials</p>
                <ul className="space-y-2 text-sm text-mid-gray font-body">
                  <li>B.S. Business Management — Indiana University, 2008</li>
                  <li>Gold Key Photography Award — Scholastic Art & Writing Awards, 2008</li>
                  <li>15+ years across healthcare, legal, finance, e-commerce, nonprofit</li>
                  <li>Indianapolis, IN</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Industries */}
          <FadeUp>
            <div className="py-16 border-t border-white/5 mb-20">
              <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-8">Industries</p>
              <div className="flex flex-wrap gap-3">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="text-sm text-mid-gray font-body border border-white/10 px-4 py-2"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Career */}
          <FadeUp>
            <div className="mb-20">
              <p className="text-xs text-electric-orange font-body tracking-widest uppercase mb-10">Career History</p>
              <div className="space-y-0 divide-y divide-white/5">
                {career.map((job, i) => (
                  <FadeUp key={job.company + job.period} delay={i * 0.05}>
                    <div className="py-8 grid md:grid-cols-[220px_1fr] gap-4 md:gap-12">
                      <div>
                        <p className="text-warm-off-white font-body font-medium text-sm">{job.title}</p>
                        <p className="text-electric-orange text-sm font-body mt-0.5">{job.company}</p>
                        <p className="text-mid-gray/60 text-xs font-body mt-1">{job.period}</p>
                      </div>
                      <p className="text-mid-gray font-body text-sm leading-relaxed">{job.description}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp>
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="font-display font-black text-3xl md:text-4xl text-warm-off-white tracking-tightest">
                  Ready to work together?
                </h2>
                <p className="text-mid-gray font-body mt-2">I keep my client list small. Let&apos;s see if we&apos;re a fit.</p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-body font-medium text-base bg-electric-orange text-warm-off-white px-8 py-4 hover:bg-electric-orange/90 transition-all duration-200 group whitespace-nowrap"
              >
                Get in touch
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </article>
    </>
  )
}
