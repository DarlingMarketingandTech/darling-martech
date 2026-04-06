/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: site-audit
 * - notes: Read-only robots.txt fetch+parse; no browser automation.
 */
import { NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { AUDIT_USER_AGENT, getTimeoutSignal, parseAllowedUrlParam } from '@/lib/site-audit/shared'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type RobotsRule = { directive: 'allow' | 'disallow'; path: string }

type RobotsGroup = {
  user_agent: string
  rules: RobotsRule[]
}

function parseRobotsText(raw: string) {
  const lines = raw.replace(/^\uFEFF/, '').split(/\r?\n/)
  const sitemaps: string[] = []
  const groups: RobotsGroup[] = []
  let current: RobotsGroup = { user_agent: '*', rules: [] }
  groups.push(current)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colon = trimmed.indexOf(':')
    if (colon === -1) continue

    const key = trimmed.slice(0, colon).trim().toLowerCase()
    const value = trimmed.slice(colon + 1).trim()

    if (key === 'user-agent') {
      current = { user_agent: value || '*', rules: [] }
      groups.push(current)
      continue
    }

    if (key === 'sitemap') {
      if (value) sitemaps.push(value)
      continue
    }

    if (key === 'allow') {
      current.rules.push({ directive: 'allow', path: value })
      continue
    }

    if (key === 'disallow') {
      current.rules.push({ directive: 'disallow', path: value })
      continue
    }
  }

  return { groups, sitemaps }
}

export async function GET(req: Request) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const urlParam = new URL(req.url).searchParams.get('url')
  const parsed = parseAllowedUrlParam(urlParam)
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 })
  }

  const robotsUrl = parsed.url.pathname.toLowerCase().includes('robots.txt')
    ? parsed.url.toString()
    : new URL('/robots.txt', parsed.url).toString()

  let response: Response
  try {
    response = await fetch(robotsUrl, {
      method: 'GET',
      headers: { 'user-agent': AUDIT_USER_AGENT, accept: 'text/plain,*/*' },
      redirect: 'follow',
      signal: getTimeoutSignal(10000),
      cache: 'no-store',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fetch failed'
    return NextResponse.json(
      { ok: false, error: 'Upstream fetch failed', details: message },
      { status: 502 },
    )
  }

  const raw_text = await response.text()
  const structured = parseRobotsText(raw_text)

  return NextResponse.json({
    ok: true,
    requested_base_url: parsed.url.toString(),
    robots_url: robotsUrl,
    status_code: response.status,
    raw_text,
    ...structured,
  })
}
