import type { Metadata } from 'next'
import ToolsCmoSimulatorPageClient from '@/components/pages/ToolsCmoSimulatorPageClient'
import { SITE_URL } from '@/lib/config'

const description =
  'Use the CMO Simulator to practice strategic channel, budget, and KPI decision-making in a practical 10-minute flow.'

export const metadata: Metadata = {
  title: 'CMO Simulator',
  description,
  alternates: {
    canonical: '/tools/cmo-simulator',
  },
  openGraph: {
    title: 'CMO Simulator',
    description,
    url: `${SITE_URL}/tools/cmo-simulator`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMO Simulator',
    description,
  },
}

export default function ToolsCmoSimulatorPage() {
  return <ToolsCmoSimulatorPageClient />
}
