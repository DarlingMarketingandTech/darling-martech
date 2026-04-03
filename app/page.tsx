import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { ToolPathRail } from '@/components/sections/ToolPathRail/ToolPathRail'
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
      <ToolPathRail
        mode="grid"
        location="home_tool_starting_points"
        eyebrow="Free strategy utilities"
        title="Choose your starting point."
        description="Run one of four practical tools to diagnose the real issue, prioritize the next move, and walk into a strategy conversation with context instead of guesswork."
      />
      <CaseStudies />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
