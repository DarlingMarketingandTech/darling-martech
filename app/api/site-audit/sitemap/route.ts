/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: site-audit
 * - notes: Read-only sitemap XML fetch+parse; no browser automation.
 */
import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { AUDIT_USER_AGENT, getTimeoutSignal, parseAllowedUrlParam } from '@/lib/site-audit/shared'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function defaultSitemapUrl(site: URL) {
  return new URL('/sitemap.xml', site).toString()
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

  const u = parsed.url
  const target = u.pathname.toLowerCase().endsWith('.xml')
    ? u.toString()
    : defaultSitemapUrl(u)

  let response: Response
  try {
    response = await fetch(target, {
      method: 'GET',
      headers: {
        'user-agent': AUDIT_USER_AGENT,
        accept: 'application/xml,text/xml,text/plain,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: getTimeoutSignal(15000),
      cache: 'no-store',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fetch failed'
    return NextResponse.json(
      { ok: false, error: 'Upstream fetch failed', details: message },
      { status: 502 },
    )
  }

  const xml = await response.text()
  const $ = cheerio.load(xml, { xmlMode: true })

  const urlsetLocs = $('urlset url loc')
    .map((_i, el) => $(el).text().trim())
    .get()
    .filter(Boolean)

  const indexLocs = $('sitemapindex sitemap loc')
    .map((_i, el) => $(el).text().trim())
    .get()
    .filter(Boolean)

  const kind = indexLocs.length > 0 ? 'sitemapindex' : urlsetLocs.length > 0 ? 'urlset' : 'unknown'

  return NextResponse.json({
    ok: true,
    requested_url: target,
    final_url: response.url || target,
    status_code: response.status,
    kind,
    urls: urlsetLocs,
    child_sitemaps: indexLocs,
  })
}
