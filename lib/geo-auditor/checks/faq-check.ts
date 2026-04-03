import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult } from '../types'

interface JsonLdItem {
  '@type'?: string | string[]
  [key: string]: unknown
}

function extractJsonLd($: CheerioAPI): JsonLdItem[] {
  const items: JsonLdItem[] = []
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html() ?? ''
      if (!raw.trim()) return
      const parsed: unknown = JSON.parse(raw)
      const list = Array.isArray(parsed) ? parsed : [parsed]
      for (const entry of list) {
        if (typeof entry === 'object' && entry !== null)
          items.push(entry as JsonLdItem)
      }
    } catch { /* skip malformed */ }
  })
  return items
}

function hasFaqSchema(items: JsonLdItem[]): boolean {
  return items.some(item => {
    const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']]
    return types.some(t => typeof t === 'string' && (t === 'FAQPage' || t.endsWith('FAQPage')))
  })
}

function detectQaPatterns($: CheerioAPI): { questionCount: number; patterns: string[] } {
  const patterns: string[] = []
  let questionCount = 0

  // FAQ section headings
  const faqHeadings = $('h2, h3').filter((_, el) => {
    const text = $(el).text().toLowerCase()
    return (
      text.includes('faq') ||
      text.includes('frequently asked') ||
      text.includes('common question') ||
      text.includes('questions and answers')
    )
  })
  if (faqHeadings.length > 0) {
    patterns.push(`FAQ heading section found (${faqHeadings.length})`)
    questionCount += 3 // proxy — assume questions follow
  }

  // Headings ending with '?'
  const questionHeadings = $('h2, h3, h4').filter((_, el) =>
    $(el).text().trim().endsWith('?')
  )
  if (questionHeadings.length > 0) {
    patterns.push(`${questionHeadings.length} question-format heading(s) detected`)
    questionCount += questionHeadings.length
  }

  // details/summary accordion elements
  const detailsCount = $('details').length
  if (detailsCount > 0) {
    patterns.push(`${detailsCount} accordion/details element(s) found`)
    questionCount += detailsCount
  }

  // Definition lists
  const dlCount = $('dl > dt').length
  if (dlCount > 0) {
    patterns.push(`${dlCount} definition term(s) in <dl> structure`)
  }

  return { questionCount, patterns }
}

export function checkFaqPatterns($: CheerioAPI): AuditCheckResult {
  const weight = 15
  const items = extractJsonLd($)
  const hasFaq = hasFaqSchema(items)
  const { questionCount, patterns } = detectQaPatterns($)

  const evidence: string[] = []
  if (hasFaq) evidence.push('FAQPage schema block detected')
  if (patterns.length > 0) evidence.push(...patterns)
  if (evidence.length === 0) evidence.push('No FAQ schema or Q&A content patterns found')

  if (hasFaq && questionCount >= 3) {
    return {
      id: 'faq-patterns',
      label: 'FAQ & Q&A Patterns',
      status: 'pass',
      score: weight,
      maxScore: weight,
      weight,
      priority: 'low',
      summary: `FAQPage schema + ${questionCount} Q&A content patterns detected`,
      whyItMatters:
        'FAQ content with FAQPage schema is among the most extractable content for AI systems and frequently surfaces in AI-generated answers.',
      recommendation:
        'Keep FAQ content updated. Expand with new questions as they come from customers. Each answer should be self-contained.',
      evidence,
    }
  }

  if (hasFaq || questionCount >= 2) {
    return {
      id: 'faq-patterns',
      label: 'FAQ & Q&A Patterns',
      status: 'warn',
      score: Math.round(weight * 0.6),
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: hasFaq
        ? 'FAQPage schema present but limited Q&A content detected'
        : `Q&A patterns found (${questionCount}) but no FAQPage schema`,
      whyItMatters:
        'Q&A content paired with FAQPage schema dramatically increases citation likelihood in AI-generated answers.',
      recommendation: hasFaq
        ? 'Expand FAQ content — aim for 5–10 specific, question-format entries with clear, complete answers.'
        : 'Add FAQPage JSON-LD schema to your existing Q&A content so AI systems can extract it reliably.',
      evidence,
    }
  }

  return {
    id: 'faq-patterns',
    label: 'FAQ & Q&A Patterns',
    status: 'fail',
    score: 0,
    maxScore: weight,
    weight,
    priority: 'high',
    summary: 'No FAQ content or structured Q&A patterns found',
    whyItMatters:
      'AI assistants are frequently asked specific questions. Sites with FAQ content and FAQPage schema are far more likely to be cited as sources in AI responses.',
    recommendation:
      'Add a dedicated FAQ section with at least 5 questions in question format. Pair each with a clear, complete answer. Add FAQPage JSON-LD schema.',
    evidence,
  }
}
