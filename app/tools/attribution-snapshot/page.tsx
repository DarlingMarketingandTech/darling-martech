import type { Metadata } from 'next'
import ToolsAttributionSnapshotPageClient from '@/components/pages/ToolsAttributionSnapshotPageClient'
import { SITE_URL } from '@/lib/config'

const description =
  'Compare attribution models side by side with a lightweight CSV import and see where channel credit stays stable, where it shifts, and where your reporting setup needs work.'

export const metadata: Metadata = {
  title: 'Attribution Snapshot',
  description,
  alternates: {
    canonical: '/tools/attribution-snapshot',
  },
  openGraph: {
    title: 'Attribution Snapshot',
    description,
    url: `${SITE_URL}/tools/attribution-snapshot`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attribution Snapshot',
    description,
  },
}

export default function ToolsAttributionSnapshotPage() {
  return <ToolsAttributionSnapshotPageClient />
}
