import type { Metadata } from 'next'
import GeoAuditorPageClient from '@/components/lab/geo-auditor/GeoAuditorPageClient'

export const metadata: Metadata = {
  title: 'GEO Readiness Auditor | Darling MarTech',
  description:
    'Run a fast GEO readiness audit and identify the highest-priority technical and content fixes for AI-era discoverability.',
}

export default function GeoReadinessAuditorPage() {
  return <GeoAuditorPageClient />
}
