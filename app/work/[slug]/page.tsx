import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCaseStudy, getReadyCaseStudies } from '@/lib/case-studies'
import { CaseStudyContent } from '@/components/sections/CaseStudyContent'

export function generateStaticParams() {
  return getReadyCaseStudies().map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const cs = getCaseStudy(params.slug)
  if (!cs) return {}
  return {
    title: `${cs.client} — Case Study`,
    description: cs.description,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug)
  if (!cs || cs.status !== 'ready') notFound()
  return <CaseStudyContent cs={cs} />
}
