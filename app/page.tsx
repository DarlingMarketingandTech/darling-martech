import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { FeaturedTool } from '@/components/sections/FeaturedTool'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Darling MarTech — Marketing Strategy & Technology',
  description:
    'Jacob Darling fixes the gaps between marketing strategy, websites, CRM, automation, and measurement — so growth is easier to run and easier to trust. Based in Indianapolis, IN.',
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
