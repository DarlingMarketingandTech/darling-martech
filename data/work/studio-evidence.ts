export type WorkStudioDiscipline = 'Photography' | 'Identity Systems'

export type WorkStudioEvidenceItem = {
  id: string
  publicId: string
  alt: string
  title: string
  category: WorkStudioDiscipline
  context: string
  proves: string
  relatedHref?: string
  relatedLabel?: string
  client?: string
  year?: string
}

export const WORK_STUDIO_DISCIPLINES: WorkStudioDiscipline[] = ['Photography', 'Identity Systems']

// Curated supporting proof for the /work page only.
// This is intentionally small and does not mirror the full /studio archive.
export const WORK_STUDIO_EVIDENCE: WorkStudioEvidenceItem[] = [
  {
    id: '317-food-storytelling',
    publicId: 'DSC_8684',
    alt: '317 BBQ plated dish photography',
    title: 'Menu-first conversion photography',
    category: 'Photography',
    client: '317 BBQ',
    context: 'Captured to make menu intent obvious in the first scroll and reduce order friction.',
    proves: 'Shot planning tied directly to conversion flow, not ornamental food imagery.',
    relatedHref: '/work/317-bbq',
    relatedLabel: 'See the 317 BBQ case study',
  },
  {
    id: 'pike-clinical-trust-image',
    publicId: 'PMC-Dr.-Pike-Xray',
    alt: 'Pike Medical clinical portrait with x-ray',
    title: 'Trust-first healthcare imagery',
    category: 'Photography',
    client: 'Pike Medical Consultants',
    context: 'Built for a healthcare experience where visual trust has to register before booking intent.',
    proves: 'Image direction that supports medical credibility and patient approachability at the same time.',
    relatedHref: '/work/pike-medical-consultants',
    relatedLabel: 'See Pike Medical proof',
  },
  {
    id: 'barbershop-atmosphere-capture',
    publicId: 'barbershop-4484297_1920',
    alt: 'Hoosier Boy Barbershop interior atmosphere photography',
    title: 'Local service atmosphere capture',
    category: 'Photography',
    client: 'Hoosier Boy Barbershop',
    context: 'Used to translate in-person shop energy into a booking-led web journey.',
    proves: 'Creative direction aligned with local positioning and conversion behavior.',
    relatedHref: '/work/hoosier-boy-barbershop',
    relatedLabel: 'See Hoosier Boy proof',
  },
  {
    id: 'event-proof-photography',
    publicId: 'IMG_1884',
    alt: 'Primary Colours live event photography',
    title: 'Event credibility documentation',
    category: 'Photography',
    client: 'Primary Colours',
    context: 'Captured for sponsor reporting, recap publishing, and audience trust signals.',
    proves: 'Fast-turn event coverage that becomes durable campaign evidence after the event ends.',
    relatedHref: '/work/primary-colours',
    relatedLabel: 'See Primary Colours work',
  },
  {
    id: 'graston-identity-anchor',
    publicId: 'computer-training',
    alt: 'Graston Technique brand mark',
    title: 'Systems-ready brand anchor',
    category: 'Identity Systems',
    client: 'Graston Technique',
    context: 'Identity foundation used across certification, ecommerce, and platform experiences.',
    proves: 'Brand architecture designed to stay coherent across complex system surfaces.',
    relatedHref: '/work/graston-technique',
    relatedLabel: 'See Graston flagship proof',
  },
  {
    id: 'hoosier-brand-system',
    publicId: 'hoosierboy-logo-anchor',
    alt: 'Hoosier Boy Barbershop logo system',
    title: 'Local-first identity system',
    category: 'Identity Systems',
    client: 'Hoosier Boy Barbershop',
    context: 'Built to make one neighborhood shop unmistakable across storefront, social, and site.',
    proves: 'Identity decisions that improve recall while supporting booking-led execution.',
    relatedHref: '/work/hoosier-boy-barbershop',
    relatedLabel: 'See Hoosier Boy proof',
  },
  {
    id: 'black-letter-identity',
    publicId: 'Black_Letter_-_Full_Logo',
    alt: 'Black Letter legal advisory identity mark',
    title: 'Authority-focused legal branding',
    category: 'Identity Systems',
    client: 'Black Letter',
    context: 'Designed to signal legal authority without default category visual tropes.',
    proves: 'Positioning clarity through restrained brand systems in high-trust markets.',
    relatedHref: '/work/black-letter',
    relatedLabel: 'See Black Letter case study',
  },
  {
    id: 'clean-aesthetic-identity',
    publicId: 'clean-aesthetics-logo-anchor',
    alt: 'Clean Aesthetic identity symbol',
    title: 'Clinical-luxury identity balance',
    category: 'Identity Systems',
    client: 'Clean Aesthetic',
    context: 'Created for a launch-stage aesthetics brand that needed premium signal and clinical trust.',
    proves: 'Identity system choices that support premium pricing without sacrificing credibility.',
    relatedHref: '/work/clean-aesthetic',
    relatedLabel: 'See Clean Aesthetic work',
  },
]
