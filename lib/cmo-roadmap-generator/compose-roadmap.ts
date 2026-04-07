import { buildBusinessSnapshotLines, bottleneckLabel, mainGoalLabel } from './answer-labels'
import { ALL_ROADMAP_MODULES } from './modules'
import type { IntakeAnswers, RoadmapModule, RoadmapPhase, RoadmapResult } from './types'

function pickModules(answers: IntakeAnswers): RoadmapModule[] {
  const orderedIds: string[] = []

  if (answers.bottleneck === 'unclear-positioning') orderedIds.push('brand-strategy', 'gtm-planning')
  if (answers.bottleneck === 'messy-stack') orderedIds.push('martech-audit', 'crm-cleanup')
  if (answers.bottleneck === 'unclear-roi') orderedIds.push('kpi-baseline', 'attribution-cleanup')
  if (answers.bottleneck === 'weak-conversion') orderedIds.push('website-conversion', 'conversion-optimization')
  if (answers.mainGoal === 'bookings') orderedIds.push('crm-cleanup', 'website-conversion')
  if (answers.mainGoal === 'lead-generation') orderedIds.push('gtm-planning', 'website-conversion')
  if (answers.businessType === 'local-service' || answers.businessType === 'healthcare') orderedIds.push('local-seo')
  if (answers.activeChannels.includes('email')) orderedIds.push('email-automation')

  const defaults = ALL_ROADMAP_MODULES.map((module) => module.id)
  const unique = [...new Set([...orderedIds, ...defaults])].slice(0, answers.teamCapacity === 'founder-only' ? 6 : 8)

  return unique
    .map((id) => ALL_ROADMAP_MODULES.find((module) => module.id === id))
    .filter((module): module is RoadmapModule => Boolean(module))
}

function buildPhases(modules: RoadmapModule[]): RoadmapPhase[] {
  return [
    {
      phaseLabel: 'Phase 1',
      headline: 'Foundation',
      intent: 'Clarify positioning, baseline measurement, and the structural fixes that everything else depends on.',
      rangeLabel: 'Days 1–30',
      modules: modules.filter((module) => module.defaultPhase === 1),
    },
    {
      phaseLabel: 'Phase 2',
      headline: 'Build & systems',
      intent: 'Turn the plan into durable assets and workflows — site, CRM, local visibility, and handoffs.',
      rangeLabel: 'Days 31–60',
      modules: modules.filter((module) => module.defaultPhase === 2),
    },
    {
      phaseLabel: 'Phase 3',
      headline: 'Optimize & scale',
      intent: 'Improve conversion, lifecycle, and reporting once the foundation can support real learning.',
      rangeLabel: 'Days 61–90',
      modules: modules.filter((module) => module.defaultPhase === 3),
    },
  ]
}

function buildExecutiveSummary(answers: IntakeAnswers): string {
  const goal = mainGoalLabel(answers.mainGoal).toLowerCase()
  const bottleneck = bottleneckLabel(answers.bottleneck).toLowerCase()

  return `This 90-day view sequences work from your stated focus (${goal}) through your primary constraint (${bottleneck}). The first month prioritizes clarity and baseline structure so later build and optimization steps do not collapse under weak foundations.`
}

function contextualWhy(answers: IntakeAnswers): string[] {
  const lines: string[] = []

  if (answers.teamCapacity === 'founder-only' || answers.teamCapacity === 'lean') {
    lines.push('Capacity is tight — the phasing keeps the workload honest so execution does not spread across too many parallel threads.')
  }

  if (answers.stackMaturity === 'messy' || answers.stackMaturity === 'mixed') {
    lines.push('Stack maturity suggests cleanup and routing discipline before adding net-new channel complexity.')
  }

  if (answers.bottleneck === 'unclear-roi' || answers.mainGoal === 'reporting-clarity') {
    lines.push('Measurement and attribution surfaced as a pressure point — earlier phases make room for trustworthy reporting.')
  }

  return lines
}

function contextualWatchOuts(answers: IntakeAnswers): string[] {
  const extra: string[] = []

  if (answers.bottleneck === 'inconsistent-demand') {
    extra.push('Resist buying more reach before the offer, funnel, and follow-up story are coherent enough to convert demand you already earn.')
  }

  if (answers.bottleneck === 'weak-conversion') {
    extra.push('Conversion work fails quietly when traffic is blamed first — validate the path and message before increasing spend.')
  }

  if (answers.bottleneck === 'messy-stack') {
    extra.push('New tools rarely fix messy stacks — map what you have, retire friction, then automate.')
  }

  return extra
}

export function composeRoadmap(answers: IntakeAnswers): RoadmapResult {
  const modules = pickModules(answers)
  const phases = buildPhases(modules)
  const topModules = modules.slice(0, 3)

  const baseWhy = [
    'The roadmap starts with the constraints from your intake — not a generic best-practices template.',
    'Work is phased so positioning, systems, and measurement can settle before heavy optimization.',
    'You can use this as an internal alignment doc, a briefing for contractors, or the opening frame for a deeper engagement.',
  ]

  return {
    executiveSummary: buildExecutiveSummary(answers),
    businessSnapshotLines: buildBusinessSnapshotLines(answers),
    topPriorities: topModules.map((module) => ({
      title: module.title,
      description: module.description,
    })),
    phases,
    whyThisRoadmap: [...baseWhy, ...contextualWhy(answers)],
    watchOuts: [
      'Do not try to fix demand, positioning, and systems at the same time without sequencing the work.',
      'Do not over-invest in new channels before the website, tracking, and routing layer are trustworthy.',
      ...contextualWatchOuts(answers),
    ],
    recommendedPrimaryService: 'Fractional CMO / Strategic Leadership',
    recommendedSupportingService: 'MarTech Audit',
    recommendedEngagementFormat: 'Audit / Advisory',
    recommendedEngagementShape: '90-day roadmap sprint',
  }
}
