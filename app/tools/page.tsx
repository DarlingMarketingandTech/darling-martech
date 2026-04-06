import type { Metadata } from 'next'
import { Suspense } from 'react'
import ToolsPageClient from '@/components/pages/ToolsPageClient'

export const metadata: Metadata = {
  title: 'Tools | Darling MarTech',
  description:
    'Run practical strategy tools including the CMO Simulator, GEO Readiness Auditor, CMO Roadmap Generator, and Attribution Snapshot.',
}

export default function ToolsPage() {
  return (
    <Suspense fallback={null}>
      <ToolsPageClient />
    </Suspense>
  )
}
