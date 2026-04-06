/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: site-audit
 * - notes: Bounded same-host crawl via fetch+parse; no browser automation.
 */
import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import {
  AUDIT_USER_AGENT,
  extractSameHostLinks,
  getTimeoutSignal,
  parseAllowedUrlParam,
} from '@/lib/site-audit/shared'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function cleanText(s: string | undefined | null) {
  if (!s) return null
  const t = s.replace(/\s+/g, ' ').trim()
  return t || null
}

export async function POST(req: Request) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: { start_url?: string; max_pages?: number; max_depth?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const startParsed = parseAllowedUrlParam(body.start_url ?? null)
  if (!startParsed.ok) {
    return NextResponse.json({ ok: false, error: startParsed.error }, { status: 400 })
  }

  const max_pages = Math.min(Math.max(Number(body.max_pages ?? 10) || 10, 1), 25)
  const max_depth = Math.min(Math.max(Number(body.max_depth ?? 1) || 1, 0), 3)

  const visited = new Set<string>()
  const queue: { url: string; depth: number }[] = [{ url: startParsed.url.toString(), depth: 0 }]
  const pages: Array<{
    requested_url: string
    final_url: string
    status_code: number
    content_type: string | null
    title: string | null
    internal_links_found: number
    error?: string
  }> = []

  while (queue.length > 0 && pages.length < max_pages) {
    const next = queue.shift()!
    if (visited.has(next.url)) continue
    visited.add(next.url)

    let response: Response
    try {
      response = await fetch(next.url, {
        method: 'GET',
        headers: {
          'user-agent': AUDIT_USER_AGENT,
          accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        },
        redirect: 'follow',
        signal: getTimeoutSignal(10000),
        cache: 'no-store',
      })
    } catch (error) {
      pages.push({
        requested_url: next.url,
        final_url: next.url,
        status_code: 0,
        content_type: null,
        title: null,
        internal_links_found: 0,
        error: error instanceof Error ? error.message : 'Fetch failed',
      })
      continue
    }

    const finalUrl = response.url || next.url
    const contentType = response.headers.get('content-type')
    const isHtml = Boolean(contentType?.toLowerCase().includes('text/html'))

    let title: string | null = null
    let links: string[] = []

    if (isHtml && response.ok) {
      try {
        const html = await response.text()
        const $ = cheerio.load(html)
        title = cleanText($('title').first().text())
        links = extractSameHostLinks(html, finalUrl)
      } catch {
        // keep defaults
      }
    }

    pages.push({
      requested_url: next.url,
      final_url: finalUrl,
      status_code: response.status,
      content_type: contentType,
      title,
      internal_links_found: links.length,
    })

    if (next.depth < max_depth) {
      for (const href of links) {
        if (visited.has(href)) continue
        if (pages.length + queue.length >= max_pages * 3) break
        queue.push({ url: href, depth: next.depth + 1 })
      }
    }
  }

  return NextResponse.json({
    ok: true,
    start_url: startParsed.url.toString(),
    max_pages,
    max_depth,
    visited_count: visited.size,
    pages,
  })
}
