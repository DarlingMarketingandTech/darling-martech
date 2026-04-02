import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { FeaturedTool } from '@/components/sections/FeaturedTool'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketing Strategy, Systems & Execution for Growth',
  description:
    'If your marketing feels disconnected, underperforming, or hard to trust — this is where it gets fixed. Strategy, websites, CRM, automation, and measurement built into one system.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedTool />
      <CaseStudies />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
