import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

import { validateActionKey } from '@/lib/auth/validateActionKey'

// Read-only endpoint for auditing page metadata/content quality signals.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type HeadingLevel = 'h1' | 'h2' | 'h3'

type HeadingItem = {
  level: HeadingLevel
  text: string
}

type MetaTagItem = {
  name: string | null
  property: string | null
  content: string | null
}

type LinkTagItem = {
  rel: string
  href: string
  hreflang: string | null
}

type InternalLinkItem = {
  href: string
  text: string | null
  is_internal: boolean
  is_anchor: boolean
  is_mailto: boolean
  is_tel: boolean
}

type ImageItem = {
  src: string
  alt: string | null
  width: number | null
  height: number | null
  is_missing_alt: boolean
}

type Checks = {
  has_title: boolean
  has_meta_description: boolean
  has_canonical: boolean
  h1_count: number
  has_multiple_h1: boolean
  h2_count: number
  internal_link_count: number
  image_count: number
  missing_alt_count: number
  is_html: boolean
}

type SiteAuditResponse = {
  ok: true
  requested_url: string
  final_url: string
  status_code: number
  content_type: string | null
  title: string | null
  meta_description: string | null
  canonical: string | null
  robots_meta: string | null
  language: string | null
  h1: string[]
  h2: string[]
  headings: HeadingItem[]
  meta_tags: MetaTagItem[]
  link_tags: LinkTagItem[]
  internal_links: InternalLinkItem[]
  images: ImageItem[]
  html_excerpt: string | null
  checks: Checks
}

function parseBooleanParam(value: string | null, defaultValue: boolean): boolean {
  if (value === null) return defaultValue
  const parsed = value.trim().toLowerCase()
  if (['1', 'true', 'yes', 'on'].includes(parsed)) return true
  if (['0', 'false', 'no', 'off'].includes(parsed)) return false
  return defaultValue
}

function isAllowedAuditUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase()
  const protocol = url.protocol.toLowerCase()

  if (protocol === 'https:' && (host === 'www.darlingmartech.com' || host === 'darlingmartech.com')) {
    return true
  }

  if (protocol === 'http:' && host === 'localhost' && url.port === '3000') {
    return true
  }

  if (protocol === 'https:' && host.endsWith('.vercel.app') && host.includes('darling-martech')) {
    return true
  }

  return false
}

function normalizeUrl(href: string, base: string): string | null {
  const input = href.trim()
  if (!input) return null

  const lower = input.toLowerCase()
  if (lower.startsWith('javascript:')) return null

  try {
    return new URL(input, base).toString()
  } catch {
    return null
  }
}

function cleanText(value: string | undefined | null): string {
  if (!value) return ''
  return value.replace(/\s+/g, ' ').trim()
}

function parseOptionalNumber(value: string | undefined): number | null {
  if (!value) return null
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? n : null
}

function getTimeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(() => controller.abort(new Error('Request timeout')), ms)
  return controller.signal
}

function buildChecks({
  title,
  metaDescription,
  canonical,
  h1,
  h2,
  internalLinks,
  images,
  isHtml,
}: {
  title: string | null
  metaDescription: string | null
  canonical: string | null
  h1: string[]
  h2: string[]
  internalLinks: InternalLinkItem[]
  images: ImageItem[]
  isHtml: boolean
}): Checks {
  const missingAltCount = images.filter(image => image.is_missing_alt).length

  return {
    has_title: Boolean(title),
    has_meta_description: Boolean(metaDescription),
    has_canonical: Boolean(canonical),
    h1_count: h1.length,
    has_multiple_h1: h1.length > 1,
    h2_count: h2.length,
    internal_link_count: internalLinks.length,
    image_count: images.length,
    missing_alt_count: missingAltCount,
    is_html: isHtml,
  }
}

export async function GET(req: Request) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const requestUrl = new URL(req.url)
  const urlParam = requestUrl.searchParams.get('url')

  if (!urlParam) {
    return NextResponse.json({ ok: false, error: 'URL not allowed' }, { status: 400 })
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(urlParam)
  } catch {
    return NextResponse.json({ ok: false, error: 'URL not allowed' }, { status: 400 })
  }

  if (!isAllowedAuditUrl(targetUrl)) {
    return NextResponse.json({ ok: false, error: 'URL not allowed' }, { status: 400 })
  }

  const includeHtmlExcerpt = parseBooleanParam(requestUrl.searchParams.get('include_html_excerpt'), false)
  const includeMetaTags = parseBooleanParam(requestUrl.searchParams.get('include_meta_tags'), true)
  const includeLinks = parseBooleanParam(requestUrl.searchParams.get('include_links'), true)
  const includeImages = parseBooleanParam(requestUrl.searchParams.get('include_images'), true)

  let response: Response
  try {
    response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'user-agent': 'DarlingMartechSiteAudit/1.0',
        accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: getTimeoutSignal(10000),
      cache: 'no-store',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch URL'
    return NextResponse.json(
      {
        ok: false,
        error: 'Upstream fetch failed',
        details: message,
      },
      { status: 502 }
    )
  }

  const finalUrl = response.url || targetUrl.toString()
  const contentTypeHeader = response.headers.get('content-type')
  const contentType = contentTypeHeader ? contentTypeHeader.toLowerCase() : null
  const isHtml = Boolean(contentType && contentType.includes('text/html'))

  const emptyPayload: SiteAuditResponse = {
    ok: true,
    requested_url: targetUrl.toString(),
    final_url: finalUrl,
    status_code: response.status,
    content_type: contentTypeHeader,
    title: null,
    meta_description: null,
    canonical: null,
    robots_meta: null,
    language: null,
    h1: [],
    h2: [],
    headings: [],
    meta_tags: [],
    link_tags: [],
    internal_links: [],
    images: [],
    html_excerpt: null,
    checks: buildChecks({
      title: null,
      metaDescription: null,
      canonical: null,
      h1: [],
      h2: [],
      internalLinks: [],
      images: [],
      isHtml,
    }),
  }

  if (!isHtml) {
    return NextResponse.json(
      {
        ...emptyPayload,
        checks: {
          ...emptyPayload.checks,
          is_html: false,
        },
      },
      { status: 200 }
    )
  }

  let html: string
  try {
    html = await response.text()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to read response body'
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to read upstream response',
        details: message,
      },
      { status: 502 }
    )
  }

  try {
    const $ = cheerio.load(html)

    const title = cleanText($('title').first().text()) || null
    const metaDescription = cleanText($('meta[name="description"]').attr('content')) || null
    const canonicalRaw = cleanText($('link[rel="canonical"]').first().attr('href'))
    const canonical = canonicalRaw ? normalizeUrl(canonicalRaw, finalUrl) ?? canonicalRaw : null
    const robotsMeta = cleanText($('meta[name="robots"]').attr('content')) || null
    const language = cleanText($('html').attr('lang')) || null

    const headings: HeadingItem[] = []
    $('h1, h2, h3').each((_idx, element) => {
      const tag = element.tagName?.toLowerCase()
      if (tag !== 'h1' && tag !== 'h2' && tag !== 'h3') return
      const text = cleanText($(element).text())
      if (!text) return
      headings.push({
        level: tag as HeadingLevel,
        text,
      })
    })

    const h1 = headings.filter(item => item.level === 'h1').map(item => item.text)
    const h2 = headings.filter(item => item.level === 'h2').map(item => item.text)

    const metaTags: MetaTagItem[] = []
    if (includeMetaTags) {
      $('meta').each((_idx, element) => {
        const name = cleanText($(element).attr('name')) || null
        const property = cleanText($(element).attr('property')) || null
        const content = cleanText($(element).attr('content')) || null
        metaTags.push({ name, property, content })
      })
    }

    const linkTags: LinkTagItem[] = []
    $('head link').each((_idx, element) => {
      const hrefRaw = cleanText($(element).attr('href'))
      if (!hrefRaw) return
      const normalized = normalizeUrl(hrefRaw, finalUrl)
      if (!normalized) return
      const rel = cleanText($(element).attr('rel')).toLowerCase() || 'link'
      const hreflang = cleanText($(element).attr('hreflang')) || null
      linkTags.push({
        rel,
        href: normalized,
        hreflang,
      })
    })

    const finalHost = new URL(finalUrl).hostname.toLowerCase()
    const internalLinks: InternalLinkItem[] = []
    if (includeLinks) {
      const seen = new Set<string>()
      $('a[href]').each((_idx, element) => {
        const hrefRaw = cleanText($(element).attr('href'))
        if (!hrefRaw) return

        const lower = hrefRaw.toLowerCase()
        if (lower.startsWith('javascript:')) return

        const isAnchor = hrefRaw.startsWith('#')
        const isMailto = lower.startsWith('mailto:')
        const isTel = lower.startsWith('tel:')
        let href = hrefRaw
        let isInternal = false

        if (isAnchor || isMailto || isTel) {
          isInternal = false
        } else {
          const normalized = normalizeUrl(hrefRaw, finalUrl)
          if (!normalized) return
          const parsed = new URL(normalized)
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return
          if (parsed.hostname.toLowerCase() !== finalHost) return
          href = normalized
          isInternal = true
        }

        const text = cleanText($(element).text()) || null
        const dedupeKey = `${href}|${text ?? ''}|${String(isAnchor)}|${String(isMailto)}|${String(isTel)}`
        if (seen.has(dedupeKey)) return
        seen.add(dedupeKey)

        internalLinks.push({
          href,
          text,
          is_internal: isInternal,
          is_anchor: isAnchor,
          is_mailto: isMailto,
          is_tel: isTel,
        })
      })
    }

    const images: ImageItem[] = []
    if (includeImages) {
      $('img[src]').each((_idx, element) => {
        const srcRaw = cleanText($(element).attr('src'))
        if (!srcRaw) return
        const src = normalizeUrl(srcRaw, finalUrl) ?? srcRaw
        const altText = cleanText($(element).attr('alt'))
        const alt = altText || null
        const width = parseOptionalNumber($(element).attr('width'))
        const height = parseOptionalNumber($(element).attr('height'))

        images.push({
          src,
          alt,
          width,
          height,
          is_missing_alt: alt === null,
        })
      })
    }

    const htmlExcerpt = includeHtmlExcerpt ? cleanText(html).slice(0, 3000) : null

    const payload: SiteAuditResponse = {
      ok: true,
      requested_url: targetUrl.toString(),
      final_url: finalUrl,
      status_code: response.status,
      content_type: contentTypeHeader,
      title,
      meta_description: metaDescription,
      canonical,
      robots_meta: robotsMeta,
      language,
      h1,
      h2,
      headings,
      meta_tags: metaTags,
      link_tags: linkTags,
      internal_links: internalLinks,
      images,
      html_excerpt: htmlExcerpt,
      checks: buildChecks({
        title,
        metaDescription,
        canonical,
        h1,
        h2,
        internalLinks,
        images,
        isHtml: true,
      }),
    }

    return NextResponse.json(payload, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse HTML'
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to parse HTML',
        details: message,
      },
      { status: 502 }
    )
  }
}
