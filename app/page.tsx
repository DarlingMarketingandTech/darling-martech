import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { AboutTeaser } from '@/components/sections/AboutTeaser'
import { FeaturedTool } from '@/components/sections/FeaturedTool'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Darling MarTech — Marketing Strategy & Technology',
  description:
    'Jacob Darling builds the marketing infrastructure that makes small businesses and startups grow — strategy, technology, automation, and execution. Based in Indianapolis, IN.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutTeaser />
      <FeaturedTool />
      <CaseStudies />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
