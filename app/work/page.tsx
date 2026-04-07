import type { Metadata } from 'next'
import { getAllWork } from '@/data/work/work-data'
import { WorkIndexExperience, WorkBottomCTA } from '@/components/sections/WorkIndex/WorkGrid'
import { SectionHero } from '@/components/shared/SectionHero'
import type { ServiceTag } from '@/data/taxonomy'
import styles from './Work.module.css'

export const metadata: Metadata = {
  title: 'Work — Case Studies & Client Projects',
  description:
    'Real work. Real results. Case studies across brand identity, marketing strategy, automation, web development, and digital infrastructure — for businesses that needed more than a vendor.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work — Case Studies & Client Projects',
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
        <SectionHero
          variant="work"
          eyebrow="Selected work"
          title="Proof beats promises."
          description="Outcomes you can trace across strategy, systems, and execution, without the vendor runaround."
          primaryCta={{ label: 'Jump to flagship proof', href: '/work#flagship-proof' }}
          secondaryCta={{ label: 'Explore services', href: '/services' }}
          supportingContent={(
            <div className={styles.heroSupport} aria-label="Proof themes">
              <span className={styles.heroChip}>Strategy-to-execution continuity</span>
              <span className={styles.heroChip}>Measured outcomes over vanity metrics</span>
              <span className={styles.heroChip}>Flagship plus supporting proof depth</span>
            </div>
          )}
        />
        <WorkIndexExperience studies={studies} initialServiceFilter={initialServiceFilter} />
        <WorkBottomCTA />
      </div>
    </main>
  )
}
