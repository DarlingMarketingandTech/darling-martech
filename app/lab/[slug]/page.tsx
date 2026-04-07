import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Legacy Lab Link',
  description: 'Legacy route maintained for backward compatibility.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LabSlugPage() {
  redirect('/tools')
}

