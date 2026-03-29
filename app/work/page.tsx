import type { Metadata } from 'next'
import { getAllWork } from '@/data/work/work-data'
import { WorkIndexExperience, WorkBottomCTA } from '@/components/sections/WorkIndex/WorkGrid'
import { WorkStudioCarousel } from '@/components/sections/WorkIndex/WorkStudioCarousel'
import type { ServiceTag } from '@/data/taxonomy'
import styles from './Work.module.css'

export const metadata: Metadata = {
  title: 'Work — Darling MarTech | Case Studies & Client Projects',
  description:
    'Real work. Real results. Case studies across brand identity, marketing strategy, automation, web development, and digital infrastructure — for businesses that needed more than a vendor.',
  openGraph: {
    title: 'Work — Darling MarTech | Case Studies & Client Projects',
    description:
      'Real work. Real results. Case studies across brand identity, marketing strategy, automation, web development, and digital infrastructure.',
  },
}

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>
}) {
  const studies = getAllWork()
  const { service } = await searchParams
  const initialServiceFilter = (service as ServiceTag) ?? null

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <WorkIndexExperience studies={studies} initialServiceFilter={initialServiceFilter} />
        <WorkStudioCarousel />
        <WorkBottomCTA />
      </div>
    </main>
  )
}
