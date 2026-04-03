import type { Metadata } from 'next'
import AboutPageClient from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'About Jacob Darling | Darling MarTech',
  description:
    'Learn about Jacob Darling, a marketing strategist and systems architect helping small businesses connect strategy, execution, and measurable growth.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
