import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult } from '../types'

const SMB_PRIORITY_TYPES = ['LocalBusiness', 'Organization', 'Service', 'FAQPage']

interface JsonLdItem {
  '@type'?: string | string[]
  '@context'?: string
  [key: string]: unknown
}

function flattenType(raw: string | string[] | undefined): string[] {
  if (!raw) return []
  return Array.isArray(raw) ? raw : [raw]
}

function extractJsonLd($: CheerioAPI): { items: JsonLdItem[]; malformed: number } {
  const items: JsonLdItem[] = []
  let malformed = 0

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).html() ?? ''
      if (!raw.trim()) return
      const parsed: unknown = JSON.parse(raw)
      const list = Array.isArray(parsed) ? parsed : [parsed]
      for (const entry of list) {
        if (typeof entry === 'object' && entry !== null)
          items.push(entry as JsonLdItem)
        else malformed++
      }
    } catch {
      malformed++
    }
  })

  return { items, malformed }
}

export function checkStructuredData($: CheerioAPI): AuditCheckResult {
  const weight = 20
  const { items, malformed } = extractJsonLd($)

  if (items.length === 0) {
    return {
      id: 'structured-data',
      label: 'Structured Data',
      status: 'fail',
      score: 0,
      maxScore: weight,
      weight,
      priority: 'high',
      summary: 'No JSON-LD structured data found on this page',
      whyItMatters:
        'Structured data is how AI systems understand your business type, services, and identity. Without it, AI systems have to guess from unstructured text, which produces inconsistent or inaccurate results.',
      recommendation:
        'Add at minimum an Organization or LocalBusiness schema block to your homepage. Include name, url, description, and address. If you have FAQ content, add FAQPage schema.',
      evidence: ['No application/ld+json script blocks found'],
    }
  }

  const allTypes = items.flatMap(i => flattenType(i['@type']))
  const presentSMB = SMB_PRIORITY_TYPES.filter(t =>
    allTypes.some(f => f === t || f.endsWith(t))
  )
  const missingSMB = SMB_PRIORITY_TYPES.filter(t => !presentSMB.includes(t))

  const evidence: string[] = [
    `Schema blocks found: ${items.length}${malformed > 0 ? ` (${malformed} malformed)` : ''}`,
    `Types detected: ${allTypes.join(', ') || 'none'}`,
  ]
  if (malformed > 0) evidence.push(`${malformed} block(s) have JSON parse errors`)

  if (presentSMB.length === 0) {
    return {
      id: 'structured-data',
      label: 'Structured Data',
      status: 'warn',
      score: Math.round(weight * 0.35),
      maxScore: weight,
      weight,
      priority: 'high',
      summary: 'Schema blocks found but none are SMB-relevant types',
      whyItMatters:
        'Generic schema without Organization or LocalBusiness type limits how AI classifies and describes your business.',
      recommendation: `Add ${missingSMB.slice(0, 2).join(' or ')} schema to clearly identify your business type for AI systems.`,
      evidence,
    }
  }

  if (missingSMB.length >= 2) {
    return {
      id: 'structured-data',
      label: 'Structured Data',
      status: 'warn',
      score: Math.round(weight * 0.65),
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: `Core schema present (${presentSMB.join(', ')}) — additional types missing`,
      whyItMatters:
        'More complete structured data gives AI systems more context about your services, location, and content, improving how you appear in AI-generated answers.',
      recommendation: `Consider adding ${missingSMB.join(', ')} schema to improve AI coverage.`,
      evidence,
    }
  }

  return {
    id: 'structured-data',
    label: 'Structured Data',
    status: 'pass',
    score: weight,
    maxScore: weight,
    weight,
    priority: 'low',
    summary: `Strong schema coverage: ${presentSMB.join(', ')}`,
    whyItMatters:
      'Well-structured schema gives AI systems the clearest possible signal about your business type, offerings, and identity.',
    recommendation:
      'Keep schema up to date as your services change. Consider FAQPage schema for any Q&A content.',
    evidence,
  }
}
