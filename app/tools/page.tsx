import type { Metadata } from 'next'
import ToolsPageClient from '@/components/pages/ToolsPageClient'

export const metadata: Metadata = {
  title: 'Tools | Darling MarTech',
  description:
    'Run practical strategy tools including the CMO Simulator, GEO Readiness Auditor, and CMO Roadmap Generator.',
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
