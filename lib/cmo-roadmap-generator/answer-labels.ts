import type { ActiveChannel, IntakeAnswers } from './types'

const BUSINESS_TYPE: Record<IntakeAnswers['businessType'], string> = {
  healthcare: 'Healthcare',
  legal: 'Legal / professional services',
  'local-service': 'Local service',
  saas: 'SaaS',
  ecommerce: 'E-commerce',
  general: 'General / other',
}

const STAGE: Record<IntakeAnswers['businessStage'], string> = {
  'pre-launch': 'Pre-launch',
  early: 'Early traction',
  established: 'Established',
  mature: 'Mature / scaling',
}

const GOAL: Record<IntakeAnswers['mainGoal'], string> = {
  'lead-generation': 'Lead generation',
  bookings: 'Bookings / pipeline',
  'brand-clarity': 'Positioning / clarity',
  'revenue-growth': 'Revenue growth',
  'reporting-clarity': 'Reporting clarity',
}

const BOTTLENECK: Record<IntakeAnswers['bottleneck'], string> = {
  'unclear-positioning': 'Unclear positioning',
  'weak-conversion': 'Weak conversion',
  'messy-stack': 'Messy stack / systems',
  'inconsistent-demand': 'Inconsistent demand',
  'unclear-roi': 'Unclear ROI / attribution',
}

const CHANNEL: Record<ActiveChannel, string> = {
  website: 'Website',
  seo: 'SEO',
  ads: 'Paid ads',
  email: 'Email',
  social: 'Social',
  referrals: 'Referrals',
}

const STACK: Record<IntakeAnswers['stackMaturity'], string> = {
  light: 'Very light tooling',
  mixed: 'Mixed stack',
  messy: 'Fragmented / messy stack',
  mature: 'Mature / documented stack',
}

const TEAM: Record<IntakeAnswers['teamCapacity'], string> = {
  'founder-only': 'Founder-led execution',
  lean: 'Lean support',
  'small-team': 'Small team',
  'dedicated-team': 'Dedicated marketing capacity',
}

/**
 * Short, scannable lines for the results artifact (print + screen).
 * Derived only from decoded intake — same source of truth as the payload.
 */
export function buildBusinessSnapshotLines(answers: IntakeAnswers): string[] {
  const channels = answers.activeChannels.map((c) => CHANNEL[c]).join(' · ')

  return [
    `${BUSINESS_TYPE[answers.businessType]} · ${STAGE[answers.businessStage]}`,
    `Primary focus: ${GOAL[answers.mainGoal]}`,
    `Main bottleneck: ${BOTTLENECK[answers.bottleneck]}`,
    `Stack: ${STACK[answers.stackMaturity]} · Team: ${TEAM[answers.teamCapacity]}`,
    `Active channels: ${channels}`,
  ]
}

export function bottleneckLabel(bottleneck: IntakeAnswers['bottleneck']): string {
  return BOTTLENECK[bottleneck]
}

export function mainGoalLabel(goal: IntakeAnswers['mainGoal']): string {
  return GOAL[goal]
}
