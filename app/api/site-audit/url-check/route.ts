/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: site-audit
 * - notes: Read-only URL/redirect/title/canonical checks; no browser automation.
 */
import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { AUDIT_USER_AGENT, getTimeoutSignal, parseAllowedUrlParam } from '@/lib/site-audit/shared'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function cleanText(s: string | undefined | null) {
  if (!s) return null
  const t = s.replace(/\s+/g, ' ').trim()
  return t || null
}

function normalizeUrl(href: string, base: string): string | null {
  const input = href.trim()
  if (!input) return null
  if (input.toLowerCase().startsWith('javascript:')) return null
  try {
    return new URL(input, base).toString()
  } catch {
    return null
  }
}

async function checkOne(urlStr: string) {
  const parsed = parseAllowedUrlParam(urlStr)
  if (!parsed.ok) {
    return {
      requested_url: urlStr,
      final_url: null as string | null,
      status_code: null as number | null,
      title: null as string | null,
      canonical: null as string | null,
      redirect_count: 0,
      is_ok: false,
      note: parsed.error,
    }
  }

  let current = parsed.url.toString()
  let redirect_count = 0

  for (let i = 0; i < 12; i++) {
    const response = await fetch(current, {
      method: 'GET',
      redirect: 'manual',
      headers: {
        'user-agent': AUDIT_USER_AGENT,
        accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      signal: getTimeoutSignal(10000),
      cache: 'no-store',
    })

    if (response.status >= 300 && response.status < 400) {
      const loc = response.headers.get('location')
      if (!loc) {
        return {
          requested_url: urlStr,
          final_url: current,
          status_code: response.status,
          title: null,
          canonical: null,
          redirect_count,
          is_ok: false,
          note: 'Redirect without Location header',
        }
      }
      redirect_count++
      current = new URL(loc, current).toString()
      const nextParsed = parseAllowedUrlParam(current)
      if (!nextParsed.ok) {
        return {
          requested_url: urlStr,
          final_url: current,
          status_code: response.status,
          title: null,
          canonical: null,
          redirect_count,
          is_ok: false,
          note: 'Redirect target URL not allowed',
        }
      }
      continue
    }

    const final_url = response.url || current
    let title: string | null = null
    let canonical: string | null = null

    const ct = response.headers.get('content-type')?.toLowerCase() ?? ''
    if (response.ok && ct.includes('text/html')) {
      try {
        const html = await response.text()
        const $ = cheerio.load(html)
        title = cleanText($('title').first().text())
        const canonRaw = cleanText($('link[rel="canonical"]').first().attr('href'))
        canonical = canonRaw ? normalizeUrl(canonRaw, final_url) ?? canonRaw : null
      } catch {
        // ignore parse errors
      }
    }

    return {
      requested_url: urlStr,
      final_url,
      status_code: response.status,
      title,
      canonical,
      redirect_count,
      is_ok: response.ok,
      note: response.ok ? null : `HTTP ${response.status}`,
    }
  }

  return {
    requested_url: urlStr,
    final_url: current,
    status_code: null,
    title: null,
    canonical: null,
    redirect_count,
    is_ok: false,
    note: 'Too many redirects',
  }
}

export async function POST(req: Request) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: { urls?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const urls = body.urls
  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ ok: false, error: 'urls array is required' }, { status: 400 })
  }

  const capped = urls.slice(0, 30)
  const results = []
  for (const u of capped) {
    try {
      results.push(await checkOne(String(u)))
    } catch (error) {
      results.push({
        requested_url: String(u),
        final_url: null,
        status_code: null,
        title: null,
        canonical: null,
        redirect_count: 0,
        is_ok: false,
        note: error instanceof Error ? error.message : 'Check failed',
      })
    }
  }

  return NextResponse.json({ ok: true, results })
}
