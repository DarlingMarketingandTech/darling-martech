import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import CmoRoadmapGeneratorDetailPage from '@/components/lab/cmo-roadmap-generator/CmoRoadmapGeneratorDetailPage'

const description =
  'Learn how the CMO Roadmap Generator turns a short guided intake into a deterministic 90-day marketing roadmap with phased priorities, service guidance, and a clear next step — native on Darling MarTech.'

export const metadata: Metadata = {
  title: 'CMO Roadmap Generator',
  description,
  alternates: {
    canonical: '/tools/cmo-roadmap-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'CMO Roadmap Generator',
    description,
    url: `${SITE_URL}/tools/cmo-roadmap-generator`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMO Roadmap Generator',
    description,
  },
}

export default function ToolsCmoRoadmapGeneratorPage() {
  return <CmoRoadmapGeneratorDetailPage />
}
