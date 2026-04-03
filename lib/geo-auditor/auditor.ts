import { fetchSite } from './fetch-site'
import { buildReport } from './build-report'
import { checkRobotsCrawlerAccess } from './checks/robots-check'
import { checkStructuredData } from './checks/schema-check'
import { checkContentStructure } from './checks/headings-check'
import { checkFaqPatterns } from './checks/faq-check'
import { checkTrustSignals } from './checks/trust-check'
import { checkMetadataClarity } from './checks/metadata-check'
import type { GeoAuditReport } from './types'

export type { GeoAuditReport }

export async function runAudit(url: string): Promise<GeoAuditReport> {
  // Fetch homepage HTML + robots.txt in parallel
  const [siteResult, robotsResult] = await Promise.all([
    fetchSite(url),
    checkRobotsCrawlerAccess(url),
  ])

  const { $, responseTimeMs } = siteResult

  const checks = [
    robotsResult,
    checkStructuredData($),
    checkContentStructure($),
    checkFaqPatterns($),
    checkTrustSignals($, url),
    checkMetadataClarity($),
  ]

  const robotsUrlChecked = robotsResult.evidence.some(
    e => e.toLowerCase().includes('robots.txt') || e.toLowerCase().includes('gptbot') || e.toLowerCase().includes('claudebot')
  )

  return buildReport(url, checks, {
    robotsUrlChecked,
    homepageFetched: true,
    responseTimeMs,
  })
}
