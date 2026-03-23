import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import workData, { getWorkBySlug, generateWorkStaticParams } from '@/data/work/work-data'
import { WorkDetailContent } from '@/components/sections/WorkDetail/WorkDetailContent'
import type { CaseStudy } from '@/lib/work'

export function generateStaticParams() {
  return generateWorkStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const cs = getWorkBySlug(params.slug)
  if (!cs) return {}
  return {
    title: cs.titleTag,
    description: cs.metaDescription,
    openGraph: {
      title: cs.titleTag,
      description: cs.metaDescription,
      ...(cs.logoPublicId && {
        images: [
          {
            url: `https://res.cloudinary.com/djhqowk67/image/upload/${cs.logoPublicId}`,
          },
        ],
      }),
    },
  }
}

function getAdjacentWork(slug: string): { prev: CaseStudy | null; next: CaseStudy | null } {
  const index = workData.findIndex((cs) => cs.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? workData[index - 1] : null,
    next: index < workData.length - 1 ? workData[index + 1] : null,
  }
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const cs = getWorkBySlug(params.slug)
  if (!cs) notFound()

  const { prev, next } = getAdjacentWork(params.slug)

  return <WorkDetailContent cs={cs} prev={prev} next={next} />
}
