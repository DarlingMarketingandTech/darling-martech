import type { Metadata } from 'next'
import { ProcessExperience } from './ProcessExperience'

export const metadata: Metadata = {
  title: 'How I Work — Darling MarTech',
  description:
    'How Darling MarTech engagements are structured — diagnosis first, build second, optimize third. No hand-offs, no agency layers, one accountable owner.',
}

export default function ProcessPage() {
  return <ProcessExperience />
}
