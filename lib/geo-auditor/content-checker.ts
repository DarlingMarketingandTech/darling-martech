import { z } from 'zod'
import type { CheerioAPI } from 'cheerio'
import type { CheckResult } from './auditor'

// ---------------------------------------------------------------------------
// Zod — JSON-LD FAQ entities (structure validation only; loose objects allowed)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// 1. Heading Hierarchy
// ---------------------------------------------------------------------------

// [file content too long to show in this tool call: full base64 content inserted here.]
