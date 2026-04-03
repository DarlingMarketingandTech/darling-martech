import * as cheerio from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import { SITE_ORIGIN } from './site'

export interface SiteFetchResult {
  $: CheerioAPI
  html: string
  responseTimeMs: number
  url: string
}

export async function fetchSite(url: string): Promise<SiteFetchResult> {
  const start = Date.now()

  const response = await fetch(url, {
    headers: {
      'User-Agent': `GEOAuditor/2.0 (+${SITE_ORIGIN})`,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const responseTimeMs = Date.now() - start
  const $ = cheerio.load(html)

  return { $, html, responseTimeMs, url }
}

/** Normalize a user-supplied URL: add https if missing, strip trailing slash. */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim()
  const withScheme =
    trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`
  return withScheme.replace(/\/$/, '')
}
