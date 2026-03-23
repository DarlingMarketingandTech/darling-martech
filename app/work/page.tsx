import type { Metadata } from 'next'
import { getAllWork } from '@/data/work/work-data'
import { WorkHero, WorkGrid, WorkBottomCTA } from '@/components/sections/WorkIndex/WorkGrid'

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

export default function WorkPage() {
  const studies = getAllWork()

  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <WorkHero />
        <WorkGrid studies={studies} />
        <WorkBottomCTA />
      </div>
    </main>
  )
}
