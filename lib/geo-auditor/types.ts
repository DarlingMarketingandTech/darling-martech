export type AuditStatus = 'pass' | 'warn' | 'fail'
export type AuditPriority = 'high' | 'medium' | 'low'
export type ScoreBand = 'strong' | 'workable' | 'fragile' | 'invisible'

export type CheckId =
  | 'ai-crawler-access'
  | 'structured-data'
  | 'content-structure'
  | 'faq-patterns'
  | 'trust-signals'
  | 'metadata-clarity'

export interface AuditCheckResult {
  id: CheckId
  label: string
  status: AuditStatus
  score: number       // earned score (0–weight)
  maxScore: number    // = weight
  weight: number
  priority: AuditPriority
  summary: string
  whyItMatters: string
  recommendation: string
  evidence: string[]
}

export interface TopAction {
  title: string
  priority: AuditPriority
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  recommendation: string
}

export interface GeoAuditReport {
  url: string
  normalizedUrl: string
  fetchedAt: string
  score: number
  band: ScoreBand
  summary: {
    headline: string
    overview: string
    topPriority: string
  }
  topActions: TopAction[]
  checks: AuditCheckResult[]
  crawl: {
    robotsUrlChecked: boolean
    homepageFetched: boolean
    responseTimeMs?: number
  }
}

export interface GeoAuditErrorResponse {
  error: string
  code:
    | 'RATE_LIMITED'
    | 'INVALID_REQUEST'
    | 'FETCH_FAILED'
    | 'TIMEOUT'
    | 'PARSE_ERROR'
    | 'INTERNAL_ERROR'
  details?: { path: string; message: string }[]
  resetIn?: number
}

/** Canonical weight allocation for the 6 GEO checks (sums to 100). */
export const CHECK_WEIGHTS: Record<CheckId, number> = {
  'ai-crawler-access': 20,
  'structured-data':   20,
  'trust-signals':     20,
  'content-structure': 15,
  'faq-patterns':      15,
  'metadata-clarity':  10,
} as const
