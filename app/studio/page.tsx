import type { Metadata } from 'next'
import { StudioGallery } from '@/components/sections/StudioGallery'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Photography, graphic design, and brand work — a visual archive of projects across 15+ years.',
  alternates: {
    canonical: '/studio',
  },
}

export default function StudioPage() {
  return <StudioGallery />
}
