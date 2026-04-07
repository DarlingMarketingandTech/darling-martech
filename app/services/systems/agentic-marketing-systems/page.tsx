import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const service = allServicePages.find((s) => s.id === 'agentic-marketing-systems')

export const metadata: Metadata = {
  title: service?.title ?? 'Agentic Marketing Systems',
  description:
    'CRM-connected workflows, AI-assisted automations, and operational infrastructure that removes manual drag from marketing and sales.',
  alternates: {
    canonical: '/services/systems/agentic-marketing-systems',
  },
}

export default function AgenticMarketingSystemsPage() {
  const service = allServicePages.find((s) => s.id === 'agentic-marketing-systems')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
