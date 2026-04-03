import type { AuditCheckResult } from '../types'

const AI_BOTS: Record<string, string[]> = {
  GPTBot:          ['gptbot'],
  ClaudeBot:       ['claudebot', 'anthropic-ai'],
  PerplexityBot:   ['perplexitybot'],
  'Google-Extended': ['google-extended'],
}

interface RobotsEntry {
  userAgent: string
  disallows: string[]
  allows: string[]
}

function parseRobotsTxt(text: string): RobotsEntry[] {
  const entries: RobotsEntry[] = []
  let current: RobotsEntry | null = null

  for (const raw of text.split('\n')) {
    const line = raw.split('#')[0].trim()
    if (!line) {
      if (current) { entries.push(current); current = null }
      continue
    }
    const sep = line.indexOf(':')
    if (sep === -1) continue
    const directive = line.slice(0, sep).trim().toLowerCase()
    const value = line.slice(sep + 1).trim()

    if (directive === 'user-agent') {
      if (!current) {
        current = { userAgent: value.toLowerCase(), disallows: [], allows: [] }
      } else {
        current.userAgent += `|${value.toLowerCase()}`
      }
    } else if (directive === 'disallow' && current) {
      current.disallows.push(value)
    } else if (directive === 'allow' && current) {
      current.allows.push(value)
    }
  }
  if (current) entries.push(current)
  return entries
}

type BotAccess = 'allowed' | 'blocked' | 'not-mentioned'

function resolveBotAccess(entries: RobotsEntry[], aliases: string[]): BotAccess {
  let wildcardEntry: RobotsEntry | undefined
  let specificEntry: RobotsEntry | undefined

  for (const entry of entries) {
    const agents = entry.userAgent.split('|')
    if (agents.some(a => aliases.includes(a))) specificEntry = entry
    if (agents.includes('*')) wildcardEntry = entry
  }

  const applicable = specificEntry ?? wildcardEntry
  if (!applicable) return 'not-mentioned'

  const isBlocked = applicable.disallows.some(p => p === '/')
  if (isBlocked) {
    return applicable.allows.some(p => p === '/') ? 'allowed' : 'blocked'
  }
  return 'allowed'
}

export async function checkRobotsCrawlerAccess(siteUrl: string): Promise<AuditCheckResult> {
  const weight = 20
  const robotsUrl = new URL('/robots.txt', siteUrl).href
  let robotsTxt: string | null = null
  let robotsUrlChecked = false

  try {
    const res = await fetch(robotsUrl, {
      headers: { 'User-Agent': 'GEOAuditor/2.0' },
      signal: AbortSignal.timeout(5000),
    })
    if (res.ok) {
      robotsTxt = await res.text()
      robotsUrlChecked = true
    }
  } catch {
    // robots.txt is optional — absence is not a hard failure
  }

  if (!robotsUrlChecked || !robotsTxt) {
    return {
      id: 'ai-crawler-access',
      label: 'AI Crawler Access',
      status: 'warn',
      score: Math.round(weight * 0.5),
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: 'No robots.txt found — AI crawlers will use default behavior',
      whyItMatters:
        'AI assistants like ChatGPT and Claude check robots.txt before indexing your site. Without it, they rely on defaults that may not include your content.',
      recommendation:
        'Create a robots.txt that explicitly allows GPTBot, ClaudeBot, and PerplexityBot.',
      evidence: [`robots.txt not found or unreachable at ${robotsUrl}`],
    }
  }

  const entries = parseRobotsTxt(robotsTxt)
  const results: Record<string, BotAccess> = {}
  for (const [name, aliases] of Object.entries(AI_BOTS)) {
    results[name] = resolveBotAccess(entries, aliases)
  }

  const blocked = Object.entries(results)
    .filter(([, v]) => v === 'blocked').map(([k]) => k)
  const notMentioned = Object.entries(results)
    .filter(([, v]) => v === 'not-mentioned').map(([k]) => k)
  const evidence = Object.entries(results).map(([bot, access]) => `${bot}: ${access}`)

  if (blocked.length > 0) {
    return {
      id: 'ai-crawler-access',
      label: 'AI Crawler Access',
      status: 'fail',
      score: 0,
      maxScore: weight,
      weight,
      priority: 'high',
      summary: `${blocked.join(', ')} ${blocked.length === 1 ? 'is' : 'are'} blocked from crawling`,
      whyItMatters:
        'Blocked AI crawlers cannot read or cite your content in AI search results. This is the most direct way to be invisible to AI systems.',
      recommendation: `Remove the Disallow: / rule for ${blocked.join(', ')} in your robots.txt, or add explicit Allow: / overrides.`,
      evidence,
    }
  }

  if (notMentioned.length >= 3) {
    return {
      id: 'ai-crawler-access',
      label: 'AI Crawler Access',
      status: 'warn',
      score: Math.round(weight * 0.65),
      maxScore: weight,
      weight,
      priority: 'medium',
      summary: `${notMentioned.length} AI crawlers not explicitly addressed in robots.txt`,
      whyItMatters:
        'Explicitly naming AI bots signals that you want to be discoverable by AI systems and reduces the risk of accidental blocking.',
      recommendation: `Add explicit Allow: / lines for ${notMentioned.join(', ')} to your robots.txt.`,
      evidence,
    }
  }

  return {
    id: 'ai-crawler-access',
    label: 'AI Crawler Access',
    status: 'pass',
    score: weight,
    maxScore: weight,
    weight,
    priority: 'low',
    summary: 'AI crawlers are allowed to index your site',
    whyItMatters:
      'Correct AI bot permissioning is the foundation of GEO. Without access, no other optimization matters.',
    recommendation:
      'Maintain current robots.txt configuration and review it after any major site changes.',
    evidence,
  }
}
