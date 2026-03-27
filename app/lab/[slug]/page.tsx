import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import LabDetailPage from '@/components/lab/LabDetailPage'
import { LAB_DETAIL_DATA } from '@/data/labs'

interface Props {
  readonly params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lab = LAB_DETAIL_DATA[slug]
  if (!lab) return {}
  return {
    title: `${lab.name} — Darling MarTech`,
    description: lab.tagline,
  }
}

export default async function LabSlugPage({ params }: Props) {
  const { slug } = await params
  const lab = LAB_DETAIL_DATA[slug]
  if (!lab) notFound()
  return <LabDetailPage {...lab} />
}

// Exclude slugs that have their own explicit routes (e.g. cmo-simulator)
const EXPLICIT_ROUTES = new Set(['cmo-simulator'])

export async function generateStaticParams() {
  return Object.keys(LAB_DETAIL_DATA)
    .filter((slug) => !EXPLICIT_ROUTES.has(slug))
    .map((slug) => ({ slug }))
}
