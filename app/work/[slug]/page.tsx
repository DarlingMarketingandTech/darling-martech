import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getWorkBySlug, generateWorkStaticParams } from '@/data/work/work-data'
import { getServicePageBySlug } from '@/data/services'
import { WorkDetailContent } from '@/components/sections/WorkDetail/WorkDetailContent'
import { WorkCaseStudyJsonLd } from '@/components/JsonLd'
import type { CaseStudy } from '@/lib/work'
import { getCanonicalWorkPath, isWorkSlugAlias, resolveWorkSlug } from '@/lib/work'

function buildWorkServiceBacklink(cs: CaseStudy, parent: CaseStudy | null): { href: string; label: string } | null {
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
  return {
    title: cs.titleTag,
    description: cs.metaDescription,
    alternates: {
      canonical: getCanonicalWorkPath(cs.slug),
    },
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
    .map((slug) => getWorkBySlug(slug))
    .filter((study): study is CaseStudy => Boolean(study))
  const serviceBacklink = buildWorkServiceBacklink(cs, parent)

  return (
    <>
      <WorkCaseStudyJsonLd cs={cs} />
      <WorkDetailContent
        cs={cs}
        parent={parent}
        related={related}
        serviceBacklink={serviceBacklink}
      />
    </>
  )
}
