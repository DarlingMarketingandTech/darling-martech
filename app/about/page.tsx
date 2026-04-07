import type { Metadata } from 'next'
import AboutPageClient from '@/components/pages/AboutPageClient'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About Jacob Darling',
  description:
    'Learn about Jacob Darling, a marketing strategist and systems architect helping small businesses connect strategy, execution, and measurable growth.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return <AboutPageClient siteUrl={SITE_URL} />
}
