'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, slideInRight, fadeVariants, springEntrance, viewport } from '@/lib/motion'
import { cloudinaryLoader } from '@/lib/cloudinary'

// Bio portrait — studio/graphic-design/bio-featured-2 (1009×1188)
const BIO_PHOTO_PUBLIC_ID = 'studio/graphic-design/bio-featured-2'

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
            {/* Copy — above the fold, use animate not whileInView */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeVariants}
                className="text-xs font-body tracking-widest uppercase mb-6"
                style={{ color: 'var(--color-accent)' }}
              >
                About Jacob Darling
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.97] tracking-tightest mb-10 text-balance"
                style={{ color: 'var(--color-text)' }}
              >
                Strategy and systems — built by someone who&apos;s done both for 15 years.
              </motion.h1>
              <motion.div
                variants={containerVariants}
                className="space-y-5 font-body leading-relaxed text-base md:text-lg"
                style={{ color: 'var(--color-muted)' }}
              >
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

            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <Image
                  loader={cloudinaryLoader}
                  src={BIO_PHOTO_PUBLIC_ID}
                  alt="Jacob Darling — Marketing Strategist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Credentials card */}
              <div
                className="mt-6 p-6 border space-y-3"
                style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.02)' }}
              >
                <p className="text-xs font-body tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>
                  Credentials
                </p>
                <ul className="space-y-2 text-sm font-body" style={{ color: 'var(--color-muted)' }}>
                  <li>B.S. Business Management — Indiana University, 2008</li>
                  <li>Gold Key Photography Award — Scholastic Art & Writing Awards, 2008</li>
                  <li>15+ years across healthcare, legal, finance, e-commerce, nonprofit</li>
                  <li>Indianapolis, IN</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Industries */}
          <motion.div
            className="py-16 border-t mb-20"
            style={{ borderColor: 'var(--color-border)' }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.p
              variants={fadeVariants}
              className="text-xs font-body tracking-widest uppercase mb-8"
              style={{ color: 'var(--color-accent)' }}
            >
              Industries
            </motion.p>
            <motion.div variants={containerVariants} className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <motion.span
                  key={ind}
                  variants={itemVariants}
                  className="text-sm font-body border px-4 py-2"
                  style={{ color: 'var(--color-muted)', borderColor: 'var(--color-border)' }}
                >
                  {ind}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Career */}
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.p
              variants={fadeVariants}
              className="text-xs font-body tracking-widest uppercase mb-10"
              style={{ color: 'var(--color-accent)' }}
            >
              Career History
            </motion.p>
            <div className="space-y-0 divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {career.map((job) => (
                <motion.div
                  key={job.company + job.period}
                  variants={itemVariants}
                  className="py-8 grid md:grid-cols-[220px_1fr] gap-4 md:gap-12"
                >
                  <div>
                    <p className="font-body font-medium text-sm" style={{ color: 'var(--color-text)' }}>{job.title}</p>
                    <p className="text-sm font-body mt-0.5" style={{ color: 'var(--color-accent)' }}>{job.company}</p>
                    <p className="text-xs font-body mt-1" style={{ color: 'rgba(136,136,136,0.6)' }}>{job.period}</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{job.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="pt-16 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            style={{ borderColor: 'var(--color-border)' }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2
                className="font-display font-black text-3xl md:text-4xl tracking-tightest"
                style={{ color: 'var(--color-text)' }}
              >
                Ready to work together?
              </h2>
              <p className="font-body mt-2" style={{ color: 'var(--color-muted)' }}>
                I keep my client list small. Let&apos;s see if we&apos;re a fit.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springEntrance}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-body font-medium text-base px-8 py-4 whitespace-nowrap group"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
                >
                  Get in touch
                  <span className="group-hover:translate-x-1" style={{ transition: 'transform 0.2s' }}>→</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </article>
    </>
  )
}
