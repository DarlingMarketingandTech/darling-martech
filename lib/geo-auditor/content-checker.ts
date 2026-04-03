import { z } from 'zod'
import type { CheerioAPI } from 'cheerio'
import type { AuditCheckResult as CheckResult } from './types'

// ------------------------------------------------------------------------------
// Zod — JSON-LD FAQ entities (structure validation only; loose objects allowed)
// ------------------------------------------------------------------------------

const QuestionEntitySchema = z
  .object({
    '@type': z.union([z.string(), z.array(z.string())]).optional(),
    name: z.string().optional(),
    acceptedAnswer: z
      .union([
        z.object({ text: z.string().optional() }).passthrough(),
        z.array(z.object({ text: z.string().optional() }).passthrough()),
      ])
      .optional(),
  })
  .passthrough()

function jsonLdTypeList(raw: unknown): string[] {
  if (typeof raw === 'string') return [raw]
  if (Array.isArray(raw)) return raw.filter((x): x is string => typeof x === 'string')
  return []
}

function itemHasSchemaType(item: Record<string, unknown>, typeName: string): boolean {
  return jsonLdTypeList(item['@type']).some(t => t === typeName || t.endsWith(typeName))
}

function answerTextFromAcceptedAnswer(
  accepted: z.infer<typeof QuestionEntitySchema>['acceptedAnswer']
): string {
  if (!accepted) return ''
  if (Array.isArray(accepted)) {
    return accepted.map(a => String(a?.text ?? '')).join(' ').trim()
  }
  return String(accepted.text ?? '').trim()
}

// ------------------------------------------------------------------------------
// 1. Heading Hierarchy
// ------------------------------------------------------------------------------

/**
 * Checks:
 *  - Exactly one H1
 *  - At least two H2 sections
 *  - H3s only appear after an H2 (no skipped levels)
 *  - No H4+ without an H3 parent (skipped levels)
 */
export function checkHeadingHierarchy($: CheerioAPI): CheckResult {
  const headings: { tag: number; text: string }[] = []
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const tag = parseInt((el as { tagName: string }).tagName.slice(1), 10)
    const text = $(el).text().trim().slice(0, 60)
    headings.push({ tag, text })
  })

  const h1Count = headings.filter(h => h.tag === 1).length
  const h2Count = headings.filter(h => h.tag === 2).length

  const issues: string[] = []

  // H1 check
  if (h1Count === 0) issues.push('no H1 found — AI cannot determine primary topic')
  else if (h1Count > 1) issues.push(`${h1Count} H1 tags found — only one allowed`)

  // H2 check
  if (h2Count < 2) issues.push(`only ${h2Count} H2 section(s) — add at least 2 for content structure`)

  // Skipped-level check: walk the heading sequence
  const skippedLevels: string[] = []
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].tag
    const curr = headings[i].tag
    if (curr > prev + 1) {
      skippedLevels.push(`H${prev}→H${curr}`)
    }
  }
  if (skippedLevels.length > 0) {
    issues.push(`skipped heading level(s): ${skippedLevels.join(', ')}`)
  }

  const status: CheckResult['status'] =
    issues.length === 0 ? 'pass'
    : h1Count === 0 ? 'fail'
    : 'warn'

  return {
    id: 'heading-hierarchy',
    label: 'Heading Hierarchy',
    status,
    weight: 13,
    message:
      issues.length === 0        ? `Correct heading structure: 1 H1 + ${h2Count} H2 sub sections`
        : `Heading issues: ${issues.join('; ')}`,
    fix:       issues.length > 0
        ? 'Use exactly one H1, at least two H2s, and never skip heading levels (H2→ H6). AI uses heading structure to map your content.'        : undefined,
  }
}

// ------------------------------------------------------------------------------
// 2. FAQ / Q&A Content
// ------------------------------------------------------------------------------

interface FAQPair {
  question: string
  answer: string
}

// [full source content continues…]
