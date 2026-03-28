import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

export const metadata: Metadata = {
  title: 'GEO Optimization — Darling MarTech',
  description:
    'Run a free GEO audit, then fix the structural and trust signals that improve AI-search visibility for your business.',
  alternates: {
    canonical: '/services/growth/geo-optimization',
  },
}

export default function GeoOptimizationPage() {
  const service = allServicePages.find((s) => s.id === 'geo-optimization')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
