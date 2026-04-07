import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

const service = allServicePages.find((s) => s.id === 'the-conductor')

export const metadata: Metadata = {
  title: service?.title ?? 'The Conductor',
  description:
    'KPI frameworks, attribution logic, GA4 cleanup, and dashboard infrastructure that turns disconnected data into a system your team can manage by.',
  alternates: {
    canonical: '/services/growth/the-conductor',
  },
}

export default function TheConductorPage() {
  const service = allServicePages.find((s) => s.id === 'the-conductor')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
