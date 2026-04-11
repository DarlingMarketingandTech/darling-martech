import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const service = allServicePages.find((s) => s.id === 'agentic-marketing-systems')

export const metadata: Metadata = service
  ? {
      title: service.title,
      description: service.summary,
      alternates: {
        canonical: service.routePath ?? `/services/${service.id}`,
      },
      openGraph: {
        title: service.title,
        description: service.summary,
      },
    }
  : {}

export default function AgenticMarketingSystemsPage() {
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
