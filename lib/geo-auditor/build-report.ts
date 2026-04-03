import type {
  AuditCheckResult,
  GeoAuditReport,
  ScoreBand,
  TopAction,
  AuditPriority,
} from './types'
import { calculateScore, getScoreBand } from './scoring'

function summaryHeadline(band: ScoreBand): string {
  if (band === 'strong') return 'Your site is well-positioned for AI discoverability'
  if (band === 'workable') return 'Solid foundation — a few targeted fixes will make a real difference'
  if (band === 'fragile') return 'AI visibility is limited — key signals are missing or blocked'
  return 'Your site is largely invisible to AI assistants right now'
}

function summaryOverview(
  score: number,
  band: ScoreBand,
  failCount: number,
  warnCount: number
): string {
  const issues = failCount + warnCount
  if (band === 'strong') {
    return `This site scores ${score}/100 across six GEO readiness signals. The core AI-visibility requirements are in place.`
  }
  if (band === 'workable') {
    return `This site scores ${score}/100. ${issues} check${issues !== 1 ? 's' : ''} returned issues — addressing the high-priority items will meaningfully improve AI citation rates.`
  }
  return `This site scores ${score}/100. ${failCount} critical issue${failCount !== 1 ? 's' : ''} and ${warnCount} warning${warnCount !== 1 ? 's' : ''} are limiting visibility in AI search results.`
}

function topPriorityMessage(checks: AuditCheckResult[]): string {
  const failing = checks
    .filter(c => c.status === 'fail')
    .sort((a, b) => b.weight - a.weight)
  const warning = checks
    .filter(c => c.status === 'warn')
    .sort((a, b) => b.weight - a.weight)
  const first = failing[0] ?? warning[0]
  if (!first) return 'Maintain your current GEO practices and revisit quarterly.'
  return `Start with ${first.label}: ${first.recommendation}`
}

function checkToTopAction(check: AuditCheckResult): TopAction {
  const effortMap: Record<AuditPriority, 'low' | 'medium' | 'high'> = {
    high: 'low',    // high-priority issues are usually quick structural fixes
    medium: 'medium',
    low: 'medium',
  }
  const impactMap: Record<AuditPriority, 'low' | 'medium' | 'high'> = {
    high: 'high',
    medium: 'medium',
    low: 'low',
  }
  return {
    title: `Fix: ${check.label}`,
    priority: check.priority,
    effort: effortMap[check.priority],
    impact: impactMap[check.priority],
    recommendation: check.recommendation,
  }
}

export function buildReport(
  url: string,
  checks: AuditCheckResult[],
  crawlMeta: {
    robotsUrlChecked: boolean
    homepageFetched: boolean
    responseTimeMs?: number
  }
): GeoAuditReport {
  const score = calculateScore(checks)
  const band = getScoreBand(score)
  const failCount = checks.filter(c => c.status === 'fail').length
  const warnCount = checks.filter(c => c.status === 'warn').length

  // Top actions: failing first, then warning, sorted by weight desc, max 5
  const needsWork = checks
    .filter(c => c.status !== 'pass')
    .sort((a, b) => {
      if (a.status === 'fail' && b.status !== 'fail') return -1
      if (b.status === 'fail' && a.status !== 'fail') return 1
      return b.weight - a.weight
    })
    .slice(0, 5)
    .map(checkToTopAction)

  return {
    url,
    normalizedUrl: url,
    fetchedAt: new Date().toISOString(),
    score,
    band,
    summary: {
      headline: summaryHeadline(band),
      overview: summaryOverview(score, band, failCount, warnCount),
      topPriority: topPriorityMessage(checks),
    },
    topActions: needsWork,
    checks,
    crawl: crawlMeta,
  }
}
