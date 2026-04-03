import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult } from '../types'

export function checkTrustSignals($: CheerioAPI, _pageUrl: string): AuditCheckResult {
  const weight = 20
  const signals: string[] = []
  const missing: string[] = []

  // 1. About / team page link
  const aboutLinks = $(
    'a[href*="/about"], a[href*="about-us"], a[href*="/team"], a[href*="/who-we-are"]'
  ).length
  if (aboutLinks > 0) {
    signals.push('About or team page link present')
  } else {
    missing.push('No About/team page link found')
  }

  // 2. Contact information
  const hasPhoneOrEmail =
    $('a[href^="tel:"], a[href^="mailto:"]').length > 0
  const hasContactLink = $('a[href*="/contact"]').length > 0
  if (hasPhoneOrEmail || hasContactLink) {
    signals.push('Contact information present')
  } else {
    missing.push('No phone, email, or contact page link found')
  }

  // 3. Author / person or org identity schema
  let hasEntitySchema = false
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html() ?? ''
      const parsed: unknown = JSON.parse(raw)
      const list = Array.isArray(parsed) ? parsed : [parsed]
      for (const item of list) {
        if (typeof item !== 'object' || item === null) continue
        const obj = item as Record<string, unknown>
        const types = Array.isArray(obj['@type']) ? obj['@type'] : [obj['@type']]
        if (
          types.some(
            (t: unknown) =>
              typeof t === 'string' &&
              (t === 'Person' || t === 'LocalBusiness' || t === 'Organization')
          )
        ) {
          hasEntitySchema = true
        }
      }
    } catch { /* skip */ }
  })

  const authorElements = $(
    '[class*="author"], [rel="author"], [itemprop="author"], [class*="byline"]'
  ).length

  if (hasEntitySchema || authorElements > 0) {
    signals.push('Author or entity identity signals present')
  } else {
    missing.push('No author attribution or entity schema (Person/LocalBusiness/Organization)')
  }

  // 4. Social proof / testimonials / reviews
  const proofElements = $(
    '[class*="testimonial"], [class*="review"], [itemtype*="Review"], [class*="quote"], blockquote'
  ).length
  if (proofElements > 0) {
    signals.push(`Social proof elements found (${proofElements})`)
  } else {
    missing.push('No testimonials, reviews, or social proof detected')
  }

  // 5. Work, portfolio, or case study links
  const proofLinks = $(
    'a[href*="/work"], a[href*="/case-stud"], a[href*="/portfolio"], a[href*="/results"]'
  ).length
  if (proofLinks > 0) {
    signals.push(`Work / case study links found (${proofLinks})`)
  } else {
    missing.push('No work, case study, or portfolio links found')
  }

  const evidence = [
    ...signals,
    ...missing.map(m => `Missing: ${m}`),
  ]

  if (signals.length >= 4) {
    return {
      id: 'trust-signals',
      label: 'Trust & Entity Signals',
      status: 'pass',
      score: weight,
      maxScore: weight,
      weight,
      priority: 'low',
      summary: `Strong trust coverage: ${signals.length} of 5 signals present`,
      whyItMatters:
        'AI systems evaluate authority and entity clarity before citing sources. Strong signals increase citation probability and reduce misattribution.',
      recommendation:
        'Maintain current trust architecture. Review entity schema annually as your services evolve.',
      evidence,
    }
  }

  if (signals.length >= 2) {
    const earnedScore = Math.max(Math.round((signals.length / 5) * weight), Math.round(weight * 0.4))
    return {
      id: 'trust-signals',
      label: 'Trust & Entity Signals',
      status: 'warn',
      score: earnedScore,
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: `Partial trust coverage: ${signals.length} of 5 signals present`,
      whyItMatters:
        'AI systems use entity signals (who you are, how to contact you, proof of work) to decide how credible you are as a source.',
      recommendation: `Strengthen the missing signals: ${missing.slice(0, 2).join('; ')}.`,
      evidence,
    }
  }

  return {
    id: 'trust-signals',
    label: 'Trust & Entity Signals',
    status: 'fail',
    score: 0,
    maxScore: weight,
    weight,
    priority: 'high',
    summary: 'Weak trust signal coverage — AI systems cannot verify your authority',
    whyItMatters:
      'Without clear entity signals, AI systems are less likely to cite your content even when it is directly relevant to a query.',
    recommendation:
      'Add an About page, contact information, author attribution, social proof, and proof/case study links. Add Organization or Person JSON-LD schema.',
    evidence,
  }
}
