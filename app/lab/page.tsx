import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Legacy Lab Route',
  description: 'Legacy route for tools and lab links.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LabPage() {
  redirect('/tools')
}
