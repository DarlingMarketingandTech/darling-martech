import type { Metadata } from 'next'
import { ServicesExperience } from './ServicesExperience'

export const metadata: Metadata = {
  title: 'Services — Darling MarTech',
  description:
    'Jacob Darling fixes the bottlenecks that slow growth — strategy and leadership, websites and conversion, CRM and automation, or visibility and demand. Based in Indianapolis, IN.',
}

export default function ServicesPage() {
  return <ServicesExperience />
}
