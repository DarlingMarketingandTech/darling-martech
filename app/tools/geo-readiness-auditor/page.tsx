import type { Metadata } from 'next'
import GeoAuditorPageClient from '@/components/lab/geo-auditor/GeoAuditorPageClient'
import { SITE_URL } from '@/lib/config'

const description =
  'Run a fast GEO readiness audit and identify the highest-priority technical and content fixes for AI-era discoverability.'

export const metadata: Metadata = {
  title: 'GEO Readiness Auditor',
  description,
  alternates: {
    canonical: '/tools/geo-readiness-auditor',
  },
  openGraph: {
    title: 'GEO Readiness Auditor',
    description,
    url: `${SITE_URL}/tools/geo-readiness-auditor`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO Readiness Auditor',
    description,
  },
}

export default function GeoReadinessAuditorPage() {
  return <GeoAuditorPageClient />
}
