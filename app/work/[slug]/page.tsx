import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { WorkCaseStudyJsonLd } from '@/components/JsonLd'
import { WorkDetailContent } from '@/components/sections/WorkDetail/WorkDetailContent'
import { getServicePageBySlug } from '@/data/services'
import { generateWorkStaticParams, getWorkBySlug } from '@/data/work/work-data'
import { getProjectMedia } from '@/lib/media/getProjectMedia'
import { getCanonicalWorkPath, isWorkSlugAlias, resolveWorkSlug } from '@/lib/work'
import type { CaseStudy } from '@/lib/work'

function buildWorkServiceBacklink(
  cs: CaseStudy,
  parent: CaseStudy | null,
): { href: string; label: string } | null {
  // Child builds may not have their own proof->service pairing set directly.
  // In those cases, inherit from the parent engagement.
  const id = cs.primaryServicePageSlug ?? parent?.primaryServicePageSlug
  if (!id) return null

  const page = getServicePageBySlug(id)
  if (!page) return null

  return {
    href: page.routePath ?? `/services/${page.id}`,
    label: page.title,
  }
}

export function generateStaticParams() {
  return generateWorkStaticParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const resolvedSlug = resolveWorkSlug(slug)
  const cs = getWorkBySlug(resolvedSlug)

  if (!cs) return {}

  const media = getProjectMedia(resolvedSlug)
  const ogImagePublicId = media?.hero?.publicId ?? cs.heroPublicId ?? cs.logoPublicId

  return {
    title: cs.titleTag,
    description: cs.metaDescription,
    alternates: {
      canonical: getCanonicalWorkPath(cs.slug),
    },
    openGraph: {
      title: cs.titleTag,
      description: cs.metaDescription,
      ...(ogImagePublicId && {
        images: [
          {
            url: `https://res.cloudinary.com/djhqowk67/image/upload/${ogImagePublicId}`,
          },
        ],
      }),
    },
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (isWorkSlugAlias(slug)) {
    redirect(getCanonicalWorkPath(slug))
  }

  const cs = getWorkBySlug(slug)
  if (!cs) notFound()

  const parent = cs.parentProjectSlug ? getWorkBySlug(cs.parentProjectSlug) ?? null : null
  const related = (cs.relatedProjectSlugs ?? [])
    .map((relatedSlug) => getWorkBySlug(relatedSlug))
    .filter((study): study is CaseStudy => Boolean(study))
  const serviceBacklink = buildWorkServiceBacklink(cs, parent)
  const media = getProjectMedia(cs.slug)
  const caseStudy = media?.hero ? { ...cs, heroPublicId: media.hero.publicId } : cs

  return (
    <>
      <WorkCaseStudyJsonLd cs={caseStudy} />
      <WorkDetailContent
        cs={caseStudy}
        parent={parent}
        related={related}
        serviceBacklink={serviceBacklink}
      />
    </>
  )
}
