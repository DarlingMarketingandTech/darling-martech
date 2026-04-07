import type { Metadata } from 'next'
import LabCmoSimulatorPageClient from '@/components/pages/LabCmoSimulatorPageClient'

export const metadata: Metadata = {
  title: 'Legacy CMO Simulator Route',
  description: 'Legacy route for the CMO Simulator experience.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyLabCmoSimulatorPage() {
  return <LabCmoSimulatorPageClient />
}
