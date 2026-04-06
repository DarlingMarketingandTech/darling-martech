import * as cheerio from 'cheerio'

export const AUDIT_USER_AGENT = 'DarlingMartechSiteAudit/1.0'

export function isAllowedAuditUrl(url: URL): boolean {
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

export function parseAllowedUrlParam(urlParam: string | null): { ok: true; url: URL } | { ok: false; error: string } {
  if (!urlParam) {
    return { ok: false, error: 'URL not allowed' }
  }
  let targetUrl: URL
  try {
    targetUrl = new URL(urlParam)
  } catch {
    return { ok: false, error: 'URL not allowed' }
  }
  if (!isAllowedAuditUrl(targetUrl)) {
    return { ok: false, error: 'URL not allowed' }
  }
  return { ok: true, url: targetUrl }
}

export function getTimeoutSignal(ms: number): AbortSignal {
  const controller = new AbortController()
  setTimeout(() => controller.abort(new Error('Request timeout')), ms)
  return controller.signal
}

function cleanText(value: string | undefined | null): string {
  if (!value) return ''
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeHref(href: string, base: string): string | null {
  const input = href.trim()
  if (!input) return null
  if (input.toLowerCase().startsWith('javascript:')) return null
  try {
    return new URL(input, base).toString()
  } catch {
    return null
  }
}

/**
 * Same-host http(s) URLs found in anchor hrefs (for bounded crawl).
 */
export function extractSameHostLinks(html: string, pageUrl: string): string[] {
  const base = pageUrl
  const host = new URL(pageUrl).hostname.toLowerCase()
  const $ = cheerio.load(html)
  const out: string[] = []
  const seen = new Set<string>()

  $('a[href]').each((_i, el) => {
    const hrefRaw = cleanText($(el).attr('href'))
    if (!hrefRaw || hrefRaw.startsWith('#')) return
    if (hrefRaw.toLowerCase().startsWith('mailto:') || hrefRaw.toLowerCase().startsWith('tel:')) return
    const abs = normalizeHref(hrefRaw, base)
    if (!abs) return
    let u: URL
    try {
      u = new URL(abs)
    } catch {
      return
    }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return
    if (u.hostname.toLowerCase() !== host) return
    u.hash = ''
    const key = u.toString()
    if (seen.has(key)) return
    seen.add(key)
    out.push(key)
  })

  return out
}
