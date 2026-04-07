import type { IntakeAnswers } from './types'

export interface ToolQuestion {
  id: keyof IntakeAnswers
  label: string
  helpText?: string
  type: 'single-select' | 'multi-select'
  options: Array<{ value: string; label: string }>
}

export const ROADMAP_QUESTIONS: ToolQuestion[] = [
  {
    id: 'businessType',
    label: 'What kind of business are you running?',
    type: 'single-select',
    options: [
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'legal', label: 'Legal / professional services' },
      { value: 'local-service', label: 'Local service business' },
      { value: 'saas', label: 'SaaS' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'general', label: 'Other / general' },
    ],
  },
  {
    id: 'businessStage',
    label: 'What stage is the business in?',
    type: 'single-select',
    options: [
      { value: 'pre-launch', label: 'Pre-launch' },
      { value: 'early', label: 'Early traction' },
      { value: 'established', label: 'Established' },
      { value: 'mature', label: 'Mature / scaling' },
    ],
  },
  {
    id: 'mainGoal',
    label: 'What matters most right now?',
    type: 'single-select',
    options: [
      { value: 'lead-generation', label: 'Lead generation' },
      { value: 'bookings', label: 'Bookings / pipeline' },
      { value: 'brand-clarity', label: 'Positioning / clarity' },
      { value: 'revenue-growth', label: 'Revenue growth' },
      { value: 'reporting-clarity', label: 'Reporting clarity' },
    ],
  },
  {
    id: 'bottleneck',
    label: 'What is the biggest bottleneck?',
    type: 'single-select',
    options: [
      { value: 'unclear-positioning', label: 'Unclear positioning' },
      { value: 'weak-conversion', label: 'Weak conversion' },
      { value: 'messy-stack', label: 'Messy stack / systems' },
      { value: 'inconsistent-demand', label: 'Inconsistent demand' },
      { value: 'unclear-roi', label: 'Unclear ROI / attribution' },
    ],
  },
  {
    id: 'activeChannels',
    label: 'Which channels are active today?',
    type: 'multi-select',
    options: [
      { value: 'website', label: 'Website' },
      { value: 'seo', label: 'SEO' },
      { value: 'ads', label: 'Paid ads' },
      { value: 'email', label: 'Email' },
      { value: 'social', label: 'Social' },
      { value: 'referrals', label: 'Referrals' },
    ],
  },
  {
    id: 'stackMaturity',
    label: 'How mature is the current stack?',
    type: 'single-select',
    options: [
      { value: 'light', label: 'Very light' },
      { value: 'mixed', label: 'Mixed' },
      { value: 'messy', label: 'Messy / fragmented' },
      { value: 'mature', label: 'Mature / documented' },
    ],
  },
  {
    id: 'teamCapacity',
    label: 'How much execution capacity do you have?',
    type: 'single-select',
    options: [
      { value: 'founder-only', label: 'Founder only' },
      { value: 'lean', label: 'Lean support' },
      { value: 'small-team', label: 'Small team' },
      { value: 'dedicated-team', label: 'Dedicated team' },
    ],
  },
]
