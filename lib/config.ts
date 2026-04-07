/**
 * Public site origin for metadata, sitemap, robots, and absolute JSON-LD URLs.
 * Set NEXT_PUBLIC_SITE_URL in each environment (e.g. https://www.darlingmartech.com).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const withProto =
      vercel.startsWith('http://') || vercel.startsWith('https://')
        ? vercel
        : `https://${vercel}`
    return withProto.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

export const SITE_URL = getSiteUrl()
