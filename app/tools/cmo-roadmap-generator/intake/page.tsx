import type { Metadata } from 'next'
import RoadmapIntakeForm from '@/components/lab/cmo-roadmap-generator/RoadmapIntakeForm'
import { SITE_URL } from '@/lib/config'

const description =
  'Seven-question guided intake for the CMO Roadmap Generator. Your answers produce a deterministic 90-day marketing roadmap on the next step — this URL is a utility step, not the primary landing page for the tool.'

export const metadata: Metadata = {
  title: 'CMO Roadmap Generator — Intake',
  description,
  alternates: {
    canonical: '/tools/cmo-roadmap-generator/intake',
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  openGraph: {
    title: 'CMO Roadmap Generator — Intake',
    description,
    url: `${SITE_URL}/tools/cmo-roadmap-generator/intake`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMO Roadmap Generator — Intake',
    description,
  },
}

export default function CmoRoadmapGeneratorIntakePage() {
  return <RoadmapIntakeForm />
}
