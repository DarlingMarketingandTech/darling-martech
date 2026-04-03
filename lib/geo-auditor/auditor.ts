import * as cheerio from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import { SITE_ORIGIN } from './site'
import type { AuditAction, AuditBand, AuditCheckResult, AuditEffort, AuditPriority, AuditStatus, GeoAuditReport } from './types'

const CHECK_WEIGHTS = {
  aiCrawlerAccess: 20,
  structuredData: 20,
  contentStructure: 15,
  faqPatterns: 15,
  trustSignals: 20,
  metadataClarity: 10,
} as const

type CheckDefinition = {
  id: string
  label: string
  whyItMatters: string
}

const CHECK_DEFINITIONS: Record<keyof typeof CHECK_WEIGHTS, CheckDefinition> = {
  aiCrawlerAccess: {
    id: 'ai-crawler-access',
    label: 'AI crawler access',
    whyItMatters: 'If AI crawlers are blocked or ambiguous in robots.txt, your content becomes much harder to discover, summarize, or cite.',
  },
  structuredData: {
    id: 'structured-data',
    label: 'Structured data coverage',
    whyItMatters: 'Structured data makes the page easier for machines to classify and connect to a known business or service entity.',
  },
  contentStructure: {
    id: 'content-structure',
    label: 'Content structure and headings',
    whyItMatters: 'Clear heading hierarchy and scannable content improve extractability for both AI systems and human visitors.',
  },
  faqPatterns: {
    id: 'faq-patterns',
    label: 'Extractable answers and FAQ patterns',
    whyItMatters: 'Pages with direct, answer-shaped content are easier for AI systems to quote, summarize, and reuse accurately.',
  },
  trustSignals: {
    id: 'trust-signals',
    label: 'Trust and entity signals',
    whyItMatters: 'AI systems lean on clear business identity, contactability, and proof signals when deciding what to surface or trust.',
  },
  metadataClarity: {
    id: 'metadata-clarity',
    label: 'Metadata and page clarity',
    whyItMatters: 'Titles, descriptions, canonicals, and clear business framing help machines understand what the page is and who it serves.',
  },
}

type RobotsEvaluation = {
  checked: boolean
  evidence: string[]
  status: AuditStatus
  score: number
  summary: string
  recommendation: string
  priority: AuditPriority
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function firstContent(selectorText: string | undefined | null): string {
  return normalizeWhitespace(selectorText ?? '')
}

function scoreToStatus(score: number, maxScore: number): AuditStatus {
  if (score >= maxScore * 0.85) return 'pass'
  if (score >= maxScore * 0.45) return 'warn'
  return 'fail'
}

function priorityFromStatus(status: AuditStatus): AuditPriority {
  if (status === 'fail') return 'high'
  if (status === 'warn') return 'medium'
  return 'low'
}

function buildCheck(
  key: keyof typeof CHECK_WEIGHTS,
  result: Omit<AuditCheckResult, 'id' | 'label' | 'weight' | 'maxScore' | 'whyItMatters'>,
): AuditCheckResult {
  const definition = CHECK_DEFINITIONS[key]
  const weight = CHECK_WEIGHTS[key]

  return {
    id: definition.id,
    label: definition.label,
    weight,
    maxScore: weight,
    whyItMatters: definition.whyItMatters,
    ...result,
  }
}

function collectJsonLdTypes(input: unknown, found: Set<string>) {
  if (!input) return

  if (Array.isArray(input)) {
    input.forEach(item => collectJsonLdTypes(item, found))
    return
  }

  if (typeof input !== 'object') return

  const record = input as Record<string, unknown>
  const rawType = record['@type']
  if (typeof rawType === 'string') {
    found.add(rawType)
  } else if (Array.isArray(rawType)) {
    rawType.filter((value): value is string => typeof value === 'string').forEach(value => found.add(value))
  }

  Object.values(record).forEach(value => collectJsonLdTypes(value, found))
}

function hasKeywordLink($: CheerioAPI, keywords: string[]): boolean {
  return $('a[href]').toArray().some(element => {
    const href = ($(element).attr('href') ?? '').toLowerCase()
    return keywords.some(keyword => href.includes(keyword))
  })
}

function buildAiCrawlerAccessCheck(robots: RobotsEvaluation): AuditCheckResult {
  return buildCheck('aiCrawlerAccess', {
    status: robots.status,
    score: robots.score,
    priority: robots.priority,
    summary: robots.summary,
    recommendation: robots.recommendation,
    evidence: robots.evidence,
  })
}

function parseRobotsTxt(text: string): Map<string, { allows: string[]; disallows: string[] }> {
  const entries = new Map<string, { allows: string[]; disallows: string[] }>()
  let currentAgents: string[] = []

  for (const rawLine of text.split('\n')) {
    const line = rawLine.split('#')[0]?.trim()
    if (!line) continue

    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const directive = line.slice(0, separatorIndex).trim().toLowerCase()
    const value = line.slice(separatorIndex + 1).trim().toLowerCase()

    if (directive === 'user-agent') {
      currentAgents = [value]
      if (!entries.has(value)) {
        entries.set(value, { allows: [], disallows: [] })
      }
      continue
    }

    if (!currentAgents.length) continue

    for (const agent of currentAgents) {
      const entry = entries.get(agent)
      if (!entry) continue
      if (directive === 'allow') entry.allows.push(value)
      if (directive === 'disallow') entry.disallows.push(value)
    }
  }

  return entries
}

async function evaluateRobots(url: URL): Promise<RobotsEvaluation> {
  const robotsUrl = new URL('/robots.txt', url.origin)
  const trackedBots = ['gptbot', 'claudebot', 'perplexitybot', 'google-extended']

  try {
    const response = await fetch(robotsUrl.toString(), {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': `DarlingMarTechGeoAuditor/2.0 (+${SITE_ORIGIN})` },
    })

    if (!response.ok) {
      return {
        checked: false,
        status: 'warn',
        score: 10,
        priority: 'medium',
        summary: `robots.txt could not be verified (HTTP ${response.status}).`,
        recommendation: 'Publish a readable robots.txt and make AI crawler intent explicit instead of relying on defaults.',
        evidence: [`robots.txt request returned HTTP ${response.status}.`],
      }
    }

    const robotsText = await response.text()
    const parsed = parseRobotsTxt(robotsText)
    const wildcard = parsed.get('*')
    const blocked: string[] = []
    const explicit: string[] = []
    const inherited: string[] = []

    for (const bot of trackedBots) {
      const entry = parsed.get(bot)
      const source = entry ?? wildcard
      const isExplicit = Boolean(entry)
      const isBlocked = source?.disallows.some(rule => rule === '/' || rule === '/*') ?? false
      const isAllowed = source?.allows.some(rule => rule === '/' || rule === '/*') ?? false

      if (isBlocked && !isAllowed) {
        blocked.push(bot)
      } else if (isExplicit) {
        explicit.push(bot)
      } else {
        inherited.push(bot)
      }
    }

    if (!blocked.length && explicit.length === trackedBots.length) {
      return {
        checked: true,
        status: 'pass',
        score: CHECK_WEIGHTS.aiCrawlerAccess,
        priority: 'low',
        summary: 'robots.txt explicitly allows the major AI crawlers this audit checks.',
        recommendation: 'Keep the allow rules explicit as your robots policy evolves.',
        evidence: [`Explicit AI crawler coverage found for: ${explicit.join(', ')}.`],
      }
    }

    if (!blocked.length) {
      return {
        checked: true,
        status: 'warn',
        score: 14,
        priority: 'medium',
        summary: 'AI crawlers are likely allowed, but the policy is partly implicit instead of explicit.',
        recommendation: 'Add explicit user-agent blocks with Allow: / for GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.',
        evidence: [
          explicit.length ? `Explicitly addressed: ${explicit.join(', ')}.` : 'No crawler-specific directives found.',
          inherited.length ? `Inherited or not explicitly mentioned: ${inherited.join(', ')}.` : 'All tracked bots had explicit entries.',
        ],
      }
    }

    return {
      checked: true,
      status: 'fail',
      score: 4,
      priority: 'high',
      summary: 'One or more major AI crawlers are blocked or ambiguously disallowed in robots.txt.',
      recommendation: `Remove site-wide disallow rules or add Allow: / for ${blocked.join(', ')}.`,
      evidence: [`Blocked or effectively blocked: ${blocked.join(', ')}.`],
    }
  } catch (error) {
    return {
      checked: false,
      status: 'warn',
      score: 10,
      priority: 'medium',
      summary: 'robots.txt could not be fetched during the audit window.',
      recommendation: 'Make robots.txt publicly accessible and confirm your AI crawler policy in a live fetch.',
      evidence: [error instanceof Error ? error.message : 'Unknown robots fetch error.'],
    }
  }
}

function buildStructuredDataCheck($: CheerioAPI): AuditCheckResult {
  const scripts = $('script[type="application/ld+json"]').toArray()
  const detectedTypes = new Set<string>()

  scripts.forEach(script => {
    const raw = $(script).text()
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as unknown
      collectJsonLdTypes(parsed, detectedTypes)
    } catch {
      // Ignore malformed blobs and score what the page still exposes.
    }
  })

  const types = Array.from(detectedTypes)
  const hasCoreEntity = types.some(type => ['Organization', 'LocalBusiness', 'Person', 'Service', 'WebSite'].includes(type))
  const hasSupportingDetail = types.some(type => ['FAQPage', 'Article', 'WebPage', 'BreadcrumbList'].includes(type))

  let score = 0
  if (scripts.length > 0) score += 8
  if (hasCoreEntity) score += 8
  if (hasSupportingDetail) score += 4

  return buildCheck('structuredData', {
    status: scoreToStatus(score, CHECK_WEIGHTS.structuredData),
    score,
    priority: priorityFromStatus(scoreToStatus(score, CHECK_WEIGHTS.structuredData)),
    summary:
      score >= 17
        ? 'The page exposes a healthy structured-data baseline for machine readability.'
        : score >= 9
          ? 'The page exposes some structured data, but entity coverage is thin or incomplete.'
          : 'Structured data is missing or too weak to clearly describe the business, service, or page type.',
    recommendation:
      score >= 17
        ? 'Extend the same entity coverage consistently across service, work, and about pages.'
        : 'Add JSON-LD for the business entity and key page types such as Service, FAQPage, or WebPage.',
    evidence: [
      scripts.length ? `${scripts.length} JSON-LD block(s) found.` : 'No JSON-LD blocks detected.',
      types.length ? `Detected schema types: ${types.join(', ')}.` : 'No valid schema types could be parsed.',
    ],
  })
}

function buildContentStructureCheck($: CheerioAPI): AuditCheckResult {
  const h1Count = $('h1').length
  const secondaryHeadings = $('h2, h3').length
  const solidParagraphs = $('p')
    .toArray()
    .map(element => normalizeWhitespace($(element).text()))
    .filter(text => text.length >= 60).length

  let score = 0
  if (h1Count === 1) score += 6
  if (secondaryHeadings >= 3) score += 5
  if (solidParagraphs >= 4) score += 4

  return buildCheck('contentStructure', {
    status: scoreToStatus(score, CHECK_WEIGHTS.contentStructure),
    score,
    priority: priorityFromStatus(scoreToStatus(score, CHECK_WEIGHTS.contentStructure)),
    summary:
      score >= 13
        ? 'The page is structured in a way that is readable and extractable.'
        : score >= 7
          ? 'The page has some structure, but the heading system or content depth is still thin.'
          : 'The page lacks enough structural clarity for confident extraction and summarization.',
    recommendation:
      score >= 13
        ? 'Keep the same heading discipline across other key pages.'
        : 'Use one clear H1, add supporting H2/H3 sections, and write in scan-friendly blocks instead of dense or unstructured text.',
    evidence: [
      `${h1Count} H1 heading(s) found.`,
      `${secondaryHeadings} H2/H3 heading(s) found.`,
      `${solidParagraphs} substantial paragraph block(s) found.`,
    ],
  })
}

function buildFaqCheck($: CheerioAPI): AuditCheckResult {
  const headings = $('h2, h3, h4')
    .toArray()
    .map(element => normalizeWhitespace($(element).text()).toLowerCase())

  const hasFaqHeading = headings.some(text => text.includes('faq') || text.includes('questions'))
  const questionHeadings = headings.filter(text => text.endsWith('?') || text.startsWith('how ') || text.startsWith('what ') || text.startsWith('why '))
  const hasFaqSchema = $('script[type="application/ld+json"]')
    .toArray()
    .some(element => $(element).text().includes('FAQPage'))

  let score = 0
  if (hasFaqSchema) score += 7
  if (hasFaqHeading) score += 4
  if (questionHeadings.length >= 2) score += 4

  return buildCheck('faqPatterns', {
    status: scoreToStatus(score, CHECK_WEIGHTS.faqPatterns),
    score,
    priority: priorityFromStatus(scoreToStatus(score, CHECK_WEIGHTS.faqPatterns)),
    summary:
      score >= 12
        ? 'The page contains direct-answer patterns that are easy to extract and reuse.'
        : score >= 6
          ? 'The page has some answer-shaped content, but it is not yet a strong FAQ or Q&A surface.'
          : 'The page does not yet offer enough direct-answer structure for AI-friendly extraction.',
    recommendation:
      score >= 12
        ? 'Expand this pattern to the pages where prospects ask the most repetitive questions.'
        : 'Add a short FAQ or question-led section with plain-English answers and corresponding FAQPage schema where appropriate.',
    evidence: [
      hasFaqSchema ? 'FAQPage schema detected.' : 'No FAQPage schema detected.',
      hasFaqHeading ? 'FAQ or questions heading detected.' : 'No obvious FAQ-style heading detected.',
      questionHeadings.length ? `${questionHeadings.length} question-shaped heading(s) found.` : 'No question-shaped headings found.',
    ],
  })
}

function buildTrustSignalsCheck($: CheerioAPI, bodyText: string): AuditCheckResult {
  const hasAboutLink = hasKeywordLink($, ['about'])
  const hasContactLink = hasKeywordLink($, ['contact'])
  const hasProofLink = hasKeywordLink($, ['work', 'case-study', 'case-studies'])
  const hasEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(bodyText)
  const hasPhone = /\+?\d[\d\s().-]{7,}\d/.test(bodyText)
  const hasTestimonialsLanguage = /(testimonial|case study|results|proof)/i.test(bodyText)

  let score = 0
  if (hasAboutLink) score += 4
  if (hasContactLink) score += 4
  if (hasProofLink || hasTestimonialsLanguage) score += 6
  if (hasEmail || hasPhone) score += 6

  return buildCheck('trustSignals', {
    status: scoreToStatus(score, CHECK_WEIGHTS.trustSignals),
    score,
    priority: priorityFromStatus(scoreToStatus(score, CHECK_WEIGHTS.trustSignals)),
    summary:
      score >= 17
        ? 'The page exposes strong business identity and trust markers.'
        : score >= 9
          ? 'The page exposes some trust signals, but they are not yet complete or obvious enough.'
          : 'The page needs stronger proof, contactability, and business identity signals.',
    recommendation:
      score >= 17
        ? 'Keep trust signals consistent across the rest of the site architecture.'
        : 'Strengthen About, Contact, and proof visibility so both humans and machines can verify who is behind the site and why it should be trusted.',
    evidence: [
      hasAboutLink ? 'About link detected.' : 'No About link detected.',
      hasContactLink ? 'Contact link detected.' : 'No Contact link detected.',
      hasProofLink || hasTestimonialsLanguage ? 'Proof or testimonial language detected.' : 'No obvious proof or testimonial language detected.',
      hasEmail || hasPhone ? 'Direct contact details detected in page text.' : 'No direct contact details detected in page text.',
    ],
  })
}

function buildMetadataCheck($: CheerioAPI, url: URL, bodyText: string): AuditCheckResult {
  const title = firstContent($('title').first().text())
  const description = firstContent($('meta[name="description"]').attr('content'))
  const canonical = firstContent($('link[rel="canonical"]').attr('href'))
  const ogSiteName = firstContent($('meta[property="og:site_name"]').attr('content'))
  const clearBusinessFraming = bodyText.toLowerCase().includes('marketing') || bodyText.toLowerCase().includes('agency') || bodyText.toLowerCase().includes('consult') || bodyText.toLowerCase().includes('service')

  let score = 0
  if (title.length >= 10) score += 3
  if (description.length >= 50) score += 3
  if (canonical) score += 2
  if (ogSiteName || clearBusinessFraming) score += 2

  return buildCheck('metadataClarity', {
    status: scoreToStatus(score, CHECK_WEIGHTS.metadataClarity),
    score,
    priority: priorityFromStatus(scoreToStatus(score, CHECK_WEIGHTS.metadataClarity)),
    summary:
      score >= 9
        ? 'Metadata gives the page a clear machine-readable identity.'
        : score >= 5
          ? 'Metadata exists, but key signals are incomplete or lightweight.'
          : 'Metadata is too thin to clearly frame the page and business.',
    recommendation:
      score >= 9
        ? 'Carry the same metadata discipline through your full page set.'
        : `Tighten the page title, meta description, canonical URL, and visible business framing for ${url.hostname}.`,
    evidence: [
      title ? `Title detected: ${title}.` : 'No title detected.',
      description ? `Meta description length: ${description.length} characters.` : 'No meta description detected.',
      canonical ? `Canonical detected: ${canonical}.` : 'No canonical URL detected.',
      ogSiteName ? `og:site_name detected: ${ogSiteName}.` : clearBusinessFraming ? 'Visible business framing language detected.' : 'No strong site-name or business framing signal detected.',
    ],
  })
}

function bandFromScore(score: number): AuditBand {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'workable'
  if (score >= 35) return 'fragile'
  return 'invisible'
}

function effortForCheck(id: AuditCheckResult['id']): AuditEffort {
  switch (id) {
    case 'ai-crawler-access':
    case 'metadata-clarity':
      return 'low'
    case 'faq-patterns':
    case 'content-structure':
      return 'medium'
    default:
      return 'high'
  }
}

function sortChecks(checks: AuditCheckResult[]): AuditCheckResult[] {
  const statusOrder: Record<AuditStatus, number> = { fail: 0, warn: 1, pass: 2 }
  const priorityOrder: Record<AuditPriority, number> = { high: 0, medium: 1, low: 2 }

  return [...checks].sort((left, right) => {
    const statusDelta = statusOrder[left.status] - statusOrder[right.status]
    if (statusDelta !== 0) return statusDelta

    const priorityDelta = priorityOrder[left.priority] - priorityOrder[right.priority]
    if (priorityDelta !== 0) return priorityDelta

    return left.score - right.score
  })
}

function buildActions(checks: AuditCheckResult[]): AuditAction[] {
  return sortChecks(checks)
    .filter(check => check.status !== 'pass')
    .map(check => ({
      title: check.label,
      priority: check.priority,
      effort: effortForCheck(check.id),
      impact: check.priority,
      recommendation: check.recommendation,
    }))
}

function buildSummary(score: number, band: AuditBand, checks: AuditCheckResult[]): GeoAuditReport['summary'] {
  const activeIssues = sortChecks(checks).filter(check => check.status !== 'pass')
  const topIssue = activeIssues[0]
  const bandHeadlines: Record<AuditBand, string> = {
    strong: 'Strong foundation with a few worthwhile refinements.',
    workable: 'Workable baseline, but there are still important gaps to close.',
    fragile: 'Fragile visibility foundation with multiple issues affecting AI discoverability.',
    invisible: 'Low discoverability readiness and a high likelihood of being underrepresented in AI results.',
  }

  return {
    headline: bandHeadlines[band],
    overview:
      activeIssues.length === 0
        ? `This page scored ${score}/100 and presents a healthy machine-readable foundation across the audited signals.`
        : `This page scored ${score}/100. The biggest issue right now is ${topIssue?.label.toLowerCase() ?? 'overall discoverability readiness'}, which weakens how clearly the site can be crawled, understood, or cited.`,
    topPriority: topIssue
      ? `${topIssue.label}: ${topIssue.recommendation}`
      : 'No urgent issues detected in the audited checks.',
  }
}

export async function runAudit(url: string): Promise<GeoAuditReport> {
  const normalizedUrl = new URL(url)
  const startedAt = Date.now()
  const response = await fetch(normalizedUrl.toString(), {
    headers: { 'User-Agent': `DarlingMarTechGeoAuditor/2.0 (+${SITE_ORIGIN})` },
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${normalizedUrl.toString()}: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const responseTimeMs = Date.now() - startedAt
  const $ = cheerio.load(html)
  const bodyText = normalizeWhitespace($('body').text())

  const robotsEvaluation = await evaluateRobots(normalizedUrl)
  const checks = [
    buildAiCrawlerAccessCheck(robotsEvaluation),
    buildStructuredDataCheck($),
    buildContentStructureCheck($),
    buildFaqCheck($),
    buildTrustSignalsCheck($, bodyText),
    buildMetadataCheck($, normalizedUrl, bodyText),
  ]

  const score = checks.reduce((total, check) => total + check.score, 0)
  const band = bandFromScore(score)
  const sortedChecks = sortChecks(checks)
  const topActions = buildActions(sortedChecks)

  return {
    url: normalizedUrl.toString(),
    normalizedUrl: normalizedUrl.toString(),
    fetchedAt: new Date().toISOString(),
    score,
    band,
    summary: buildSummary(score, band, sortedChecks),
    topActions,
    checks: sortedChecks,
    crawl: {
      robotsUrlChecked: robotsEvaluation.checked,
      homepageFetched: true,
      responseTimeMs,
    },
  }
}
