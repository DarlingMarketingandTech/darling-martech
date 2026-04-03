import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult } from '../types'

export function checkMetadataClarity($: CheerioAPI): AuditCheckResult {
  const weight = 10
  const present: string[] = []
  const issues: string[] = []

  // Title tag
  const title = $('title').first().text().trim()
  if (title && title.length > 10) {
    present.push(`Title: "${title.slice(0, 60)}${title.length > 60 ? '…' : ''}"`)
  } else {
    issues.push(title ? 'Title tag too short (under 10 characters)' : 'No <title> tag found')
  }

  // Meta description
  const metaDesc = $('meta[name="description"]').attr('content')?.trim() ?? ''
  if (metaDesc.length > 20) {
    present.push(`Meta description: ${metaDesc.length} chars`)
  } else {
    issues.push(metaDesc ? 'Meta description too short (under 20 characters)' : 'No meta description found')
  }

  // Canonical
  const canonical = $('link[rel="canonical"]').attr('href')
  if (canonical) {
    present.push('Canonical URL declared')
  } else {
    issues.push('No canonical URL tag')
  }

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content')
  const ogDesc = $('meta[property="og:description"]').attr('content')
  if (ogTitle && ogDesc) {
    present.push('Open Graph title + description present')
  } else if (ogTitle || ogDesc) {
    issues.push('Open Graph metadata incomplete (title or description missing)')
  } else {
    issues.push('No Open Graph metadata found')
  }

  // Body content length as proxy for substantive page
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  if (bodyText.length > 200) {
    present.push('Page has substantive visible content')
  } else {
    issues.push('Very thin visible content (under 200 characters of body text)')
  }

  const evidence = [
    ...present,
    ...issues.map(i => `Issue: ${i}`),
  ]

  if (issues.length === 0) {
    return {
      id: 'metadata-clarity',
      label: 'Metadata & Page Clarity',
      status: 'pass',
      score: weight,
      maxScore: weight,
      weight,
      priority: 'low',
      summary: 'Complete metadata: title, description, canonical, and Open Graph present',
      whyItMatters:
        'Metadata is how AI systems quickly identify and categorize your pages. Complete metadata means accurate page classification.',
      recommendation:
        'Keep metadata up to date as you add new pages or update service offerings.',
      evidence,
    }
  }

  if (issues.length <= 2) {
    return {
      id: 'metadata-clarity',
      label: 'Metadata & Page Clarity',
      status: 'warn',
      score: Math.round(weight * 0.5),
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: `Mostly complete — ${issues.length} metadata gap${issues.length !== 1 ? 's' : ''}`,
      whyItMatters:
        'Missing metadata reduces AI confidence in page identity and may cause your content to be omitted from AI-generated summaries.',
      recommendation: `Fix: ${issues.slice(0, 2).join('; ')}.`,
      evidence,
    }
  }

  return {
    id: 'metadata-clarity',
    label: 'Metadata & Page Clarity',
    status: 'fail',
    score: 0,
    maxScore: weight,
    weight,
    priority: 'high',
    summary: `Multiple metadata gaps (${issues.length} issues)`,
    whyItMatters:
      "Metadata is an AI system's first read on who you are and what you offer. Multiple gaps significantly reduce discoverability.",
    recommendation:
      'Add a descriptive title, meta description (50–160 chars), canonical URL, and full Open Graph tags to every page.',
    evidence,
  }
}
