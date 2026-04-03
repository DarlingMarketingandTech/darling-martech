import type { Metadata } from 'next'
import ToolsCmoSimulatorPageClient from '@/components/pages/ToolsCmoSimulatorPageClient'

export const metadata: Metadata = {
  title: 'CMO Simulator | Darling MarTech Tools',
  description:
    'Use the CMO Simulator to practice strategic channel, budget, and KPI decision-making in a practical 10-minute flow.',
}

export default function ToolsCmoSimulatorPage() {
  return <ToolsCmoSimulatorPageClient />
}
