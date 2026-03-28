import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const GEO_SERVICE_PATH = '/services/website-ux/geo-optimization'

function getGeoService() {
  return allServicePages.find((service) => service.id === 'geo-optimization')
}

export const metadata: Metadata = {
  title: 'GEO Optimization — Darling MarTech',
  description:
    'Run a free GEO audit, then fix the structural and trust signals that improve AI-search visibility for your business.',
  alternates: {
    canonical: GEO_SERVICE_PATH,
  },
}

export default function GeoOptimizationServicePage() {
  const service = getGeoService()
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
