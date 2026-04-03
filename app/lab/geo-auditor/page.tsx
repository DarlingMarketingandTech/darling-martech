import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Legacy GEO Auditor Route | Darling MarTech',
  description: 'Legacy route for GEO Readiness Auditor links.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyGeoAuditorPage() {
  redirect('/tools/geo-readiness-auditor')
}
