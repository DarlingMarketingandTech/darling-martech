import type { Metadata } from 'next'
import ToolsAttributionSnapshotPageClient from '@/components/pages/ToolsAttributionSnapshotPageClient'

export const metadata: Metadata = {
  title: 'Attribution Snapshot | Darling MarTech Tools',
  description:
    'Compare attribution models side by side with a lightweight CSV import and see where channel credit stays stable, where it shifts, and where your reporting setup needs work.',
}

export default function ToolsAttributionSnapshotPage() {
  return <ToolsAttributionSnapshotPageClient />
}