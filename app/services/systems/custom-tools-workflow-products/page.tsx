import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const service = allServicePages.find((s) => s.id === 'custom-tools-workflow-products')

export const metadata: Metadata = {
  title: service?.title ?? 'Custom Tools & Workflow Products',
  description:
    'Customer- and staff-facing workflow products — configurators, dashboards, and operational surfaces — scoped to your stack and wired into CRM, site, and measurement.',
  alternates: {
    canonical: '/services/systems/custom-tools-workflow-products',
  },
}

export default function CustomToolsWorkflowProductsPage() {
  const service = allServicePages.find((s) => s.id === 'custom-tools-workflow-products')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
