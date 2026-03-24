import type { Metadata } from 'next'
import { ServicesExperience } from './ServicesExperience'

export const metadata: Metadata = {
  title: 'Services — Darling MarTech',
  description:
    'Marketing strategy, brand identity, websites, CRM automation, SEO, analytics, AI tools, and specialized digital systems built by Jacob Darling.',
}

export default function ServicesPage() {
  return <ServicesExperience />
}
