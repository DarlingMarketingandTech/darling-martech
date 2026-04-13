import type { Metadata } from 'next'
import { ProcessExperience } from './ProcessExperience'

export const metadata: Metadata = {
  title: 'How I Work',
  description:
    'How Jacob Darling runs engagements: problem-led fit, systems and measurement, solo-led delivery with clear cadence — plus proof-backed case studies and optional self-serve tools.',
  alternates: {
    canonical: '/process',
  },
}

export default function ProcessPage() {
  return <ProcessExperience />
}
