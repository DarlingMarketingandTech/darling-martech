export type BusinessType =
  | 'healthcare'
  | 'legal'
  | 'local-service'
  | 'saas'
  | 'ecommerce'
  | 'general'

export type BusinessStage =
  | 'pre-launch'
  | 'early'
  | 'established'
  | 'mature'

export type MainGoal =
  | 'lead-generation'
  | 'bookings'
  | 'brand-clarity'
  | 'revenue-growth'
  | 'reporting-clarity'

export type Bottleneck =
  | 'unclear-positioning'
  | 'weak-conversion'
  | 'messy-stack'
  | 'inconsistent-demand'
  | 'unclear-roi'

export type ActiveChannel =
  | 'website'
  | 'seo'
  | 'ads'
  | 'email'
  | 'social'
  | 'referrals'

export type StackMaturity = 'light' | 'mixed' | 'messy' | 'mature'
export type TeamCapacity = 'founder-only' | 'lean' | 'small-team' | 'dedicated-team'

export interface IntakeAnswers {
  businessType: BusinessType
  businessStage: BusinessStage
  mainGoal: MainGoal
  bottleneck: Bottleneck
  activeChannels: ActiveChannel[]
  stackMaturity: StackMaturity
  teamCapacity: TeamCapacity
}

export interface RoadmapModule {
  id: string
  title: string
  description: string
  defaultPhase: 1 | 2 | 3
}

export interface RoadmapPhase {
  /** Display label, e.g. "Phase 1" */
  phaseLabel: string
  /** Short editorial headline, e.g. "Foundation" */
  headline: string
  /** One line: what this block of work is for */
  intent: string
  rangeLabel: string
  modules: RoadmapModule[]
}

export interface RoadmapPriorityItem {
  title: string
  description: string
}

export interface RoadmapResult {
  executiveSummary: string
  /** Lines derived from intake answers for the artifact header */
  businessSnapshotLines: string[]
  topPriorities: RoadmapPriorityItem[]
  phases: RoadmapPhase[]
  whyThisRoadmap: string[]
  watchOuts: string[]
  recommendedPrimaryService: string
  recommendedSupportingService?: string
  recommendedEngagementFormat: string
  recommendedEngagementShape: string
}
