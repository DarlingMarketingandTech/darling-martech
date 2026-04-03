import type { AuditCheckResult, ScoreBand } from './types'

export function calculateScore(checks: AuditCheckResult[]): number {
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0)
  if (totalWeight === 0) return 0
  const earned = checks.reduce((sum, c) => sum + c.score, 0)
  return Math.round((earned / totalWeight) * 100)
}

export function buildSummary(score: number): string {
  if (score >= 80) return 'Excellent GEO readiness — your site is well-positioned for AI visibility.'
  if (score >= 60) return 'Good foundation, but key gaps are limiting your AI visibility.'
  if (score >= 40) return 'Moderate GEO readiness — significant improvements needed to appear in AI results.'
  return 'Critical issues found — your site is largely invisible to AI assistants and search engines.'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e' // green
  if (score >= 60) return '#f59e0b' // amber
  if (score >= 40) return '#f97316' // orange
  return '#ef4444' // red
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Needs Work'
  return 'Critical'
}

export function getScoreBand(score: number): ScoreBand {
  if (score >= 75) return 'strong'
  if (score >= 50) return 'workable'
  if (score >= 25) return 'fragile'
  return 'invisible'
}

export function getBandLabel(band: ScoreBand): string {
  const labels: Record<ScoreBand, string> = {
    strong: 'Strong',
    workable: 'Workable',
    fragile: 'Fragile',
    invisible: 'Invisible',
  }
  return labels[band]
}

export function getBandColor(band: ScoreBand): string {
  const colors: Record<ScoreBand, string> = {
    strong: '#22c55e',
    workable: '#f59e0b',
    fragile: '#f97316',
    invisible: '#ef4444',
  }
  return colors[band]
}
