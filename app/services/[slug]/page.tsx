import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { generateServiceStaticParams, getServicePageBySlug } from '@/data/services'
import { SERVICE_TAGS, INDUSTRY_TAGS } from '@/data/taxonomy'
import { ServiceDetailPage } from '@/components/sections/ServiceDetail/ServiceDetailPage'

export function generateStaticParams() {
  return generateServiceStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePageBySlug(slug)
  if (!service) return {}

  const serviceLabels = service.serviceIds.map((id) => SERVICE_TAGS[id]).join(', ')
  const industryLabels = service.industryIds?.map((id) => INDUSTRY_TAGS[id]).join(', ')

  return {
    title: service.title,
    description: service.summary,
    keywords: [serviceLabels, industryLabels].filter(Boolean).join(', '),
    openGraph: {
      title: `${service.title} — Darling MarTech`,
      description: service.summary,
    },
    alternates: {
      canonical: service.routePath ?? `/services/${service.id}`,
    },
  }
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServicePageBySlug(slug)
  if (!service) notFound()
  if (service.routePath && service.routePath !== `/services/${service.id}`) {
    redirect(service.routePath)
  }

  return <ServiceDetailPage service={service} />
}
