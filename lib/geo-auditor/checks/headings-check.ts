import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult } from '../types'

export function checkContentStructure($: CheerioAPI): AuditCheckResult {
  const weight = 15
  const headings: { tag: number; text: string }[] = []

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = parseInt((el as { tagName: string }).tagName.slice(1), 10)
    const text = $(el).text().trim().slice(0, 80)
    headings.push({ tag, text })
  })

  const h1Count = headings.filter(h => h.tag === 1).length
  const h2Count = headings.filter(h => h.tag === 2).length
  const h3Count = headings.filter(h => h.tag === 3).length
  const issues: string[] = []

  const evidence: string[] = [`H1: ${h1Count}`, `H2: ${h2Count}`, `H3: ${h3Count}`]

  if (h1Count === 0) {
    issues.push('No H1 tag found — AI cannot determine the primary topic')
  } else if (h1Count > 1) {
    issues.push(`${h1Count} H1 tags found — only one is allowed`)
  }

  if (h2Count < 2) {
    issues.push(`Only ${h2Count} H2 section(s) — add at least 2 to signal meaningful content structure`)
  }

  const skipped: string[] = []
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].tag
    const curr = headings[i].tag
    if (curr > prev + 1) skipped.push(`H${prev}→H${curr}`)
  }
  if (skipped.length > 0) {
    issues.push(`Skipped heading level(s): ${skipped.join(', ')}`)
    evidence.push(`Skipped levels: ${skipped.join(', ')}`)
  }

  if (h1Count === 0) {
    return {
      id: 'content-structure',
      label: 'Content Structure',
      status: 'fail',
      score: 0,
      maxScore: weight,
      weight,
      priority: 'high',
      summary: 'No H1 tag found — AI cannot identify the primary topic of this page',
      whyItMatters:
        'The H1 tag is the primary signal AI uses to understand what a page is about. Without it, AI systems cannot reliably extract or attribute your content.',
      recommendation:
        'Add a single, clear H1 that describes the main topic of this page. Follow it with H2 sections for each major content area.',
      evidence,
    }
  }

  if (issues.length === 0) {
    return {
      id: 'content-structure',
      label: 'Content Structure',
      status: 'pass',
      score: weight,
      maxScore: weight,
      weight,
      priority: 'low',
      summary: `Good heading structure: 1 H1 + ${h2Count} H2 sections`,
      whyItMatters:
        'Logical heading hierarchy allows AI systems to map your content into structured knowledge and cite specific sections accurately.',
      recommendation:
        'Maintain clear heading hierarchy. Add H2/H3 sections to any long-form content pages to improve extractability.',
      evidence,
    }
  }

  return {
    id: 'content-structure',
    label: 'Content Structure',
    status: 'warn',
    score: Math.round(weight * 0.5),
    maxScore: weight,
    weight,
    priority: 'medium',
    summary: issues[0],
    whyItMatters:
      'Well-structured headings allow AI systems to extract and cite specific sections. Poor structure reduces citation likelihood and can cause misrepresentation.',
    recommendation: `Fix heading issues: ${issues.join('; ')}.`,
    evidence,
  }
}
