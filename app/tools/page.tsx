import type { Metadata } from 'next'
import { Suspense } from 'react'
import ToolsPageClient from '@/components/pages/ToolsPageClient'

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Run practical strategy tools including the CMO Simulator, GEO Readiness Auditor, CMO Roadmap Generator, and Attribution Snapshot.',
  alternates: {
    canonical: '/tools',
  },
}

export default function ToolsPage() {
  return (
    <Suspense fallback={null}>
      <ToolsPageClient />
    </Suspense>
  )
}
