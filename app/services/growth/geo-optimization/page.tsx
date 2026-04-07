import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const service = allServicePages.find((s) => s.id === 'geo-optimization')

export const metadata: Metadata = {
  title: service?.title ?? 'GEO & Discoverability Readiness',
  description:
    'Discoverability and GEO readiness: clearer structure, trustworthy signals, and a practical roadmap as search behavior shifts — without hype.',
  alternates: {
    canonical: '/services/growth/geo-optimization',
  },
}

export default function GeoOptimizationPage() {
  const service = allServicePages.find((s) => s.id === 'geo-optimization')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
