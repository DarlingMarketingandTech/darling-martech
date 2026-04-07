import type { Metadata } from 'next'
import RoadmapResultsDisplay from '@/components/lab/cmo-roadmap-generator/RoadmapResultsDisplay'
import { ROADMAP_INTAKE_QUERY_KEY } from '@/lib/cmo-roadmap-generator/intake-payload'
import { SITE_URL } from '@/lib/config'

const description =
  'Personalized roadmap output from the CMO Roadmap Generator. This page is driven by your encoded intake in the URL — canonical always points here without query parameters so search engines do not index duplicate variants.'

export const metadata: Metadata = {
  title: 'CMO Roadmap Generator — Results',
  description,
  alternates: {
    canonical: '/tools/cmo-roadmap-generator/results',
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
    title: 'CMO Roadmap Generator — Results',
    description,
    url: `${SITE_URL}/tools/cmo-roadmap-generator/results`,
    siteName: 'Darling MarTech',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMO Roadmap Generator — Results',
    description,
  },
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CmoRoadmapGeneratorResultsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const raw = sp[ROADMAP_INTAKE_QUERY_KEY]
  const encodedPayload = Array.isArray(raw) ? raw[0] : raw

  return <RoadmapResultsDisplay encodedPayload={encodedPayload} />
}
