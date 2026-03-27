import { notFound } from 'next/navigation'
import LabDetailPage from '@/components/lab/LabDetailPage'
import { LAB_DETAIL_DATA } from '@/data/labs'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function LabSlugPage({ params }: Props) {
  const { slug } = await params
  const lab = LAB_DETAIL_DATA[slug]
  if (!lab) notFound()
  return <LabDetailPage {...lab} />
}

export async function generateStaticParams() {
  return Object.keys(LAB_DETAIL_DATA).map((slug) => ({ slug }))
}
