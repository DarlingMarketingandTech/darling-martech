import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allServicePages } from '@/data/services'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

export const metadata: Metadata = {
  title: 'The Fortress — Infrastructure Hardening & Resilience Architecture — Darling MarTech',
  description:
    'Origin shielding, attack surface reduction, performance hardening, and monitoring infrastructure for business-critical marketing platforms.',
  alternates: {
    canonical: '/services/systems/the-fortress',
  },
}

export default function TheFortressPage() {
  const service = allServicePages.find((s) => s.id === 'the-fortress')
  if (!service) notFound()
  return <ServiceDetailPage service={service} />
}
