import { z } from 'zod'

export const auditStatusValues = ['pass', 'warn', 'fail'] as const
export const auditPriorityValues = ['high', 'medium', 'low'] as const
export const auditEffortValues = ['low', 'medium', 'high'] as const
export const auditBandValues = ['strong', 'workable', 'fragile', 'invisible'] as const

export type AuditStatus = (typeof auditStatusValues)[number]
export type AuditPriority = (typeof auditPriorityValues)[number]
export type AuditEffort = (typeof auditEffortValues)[number]
export type AuditBand = (typeof auditBandValues)[number]

export const AuditCheckResultSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(auditStatusValues),
  score: z.number().min(0),
  maxScore: z.number().min(0),
  weight: z.number().min(0),
  priority: z.enum(auditPriorityValues),
  summary: z.string(),
  whyItMatters: z.string(),
  recommendation: z.string(),
  evidence: z.array(z.string()),
})

export const AuditActionSchema = z.object({
  title: z.string(),
  priority: z.enum(auditPriorityValues),
  effort: z.enum(auditEffortValues),
  impact: z.enum(auditPriorityValues),
  recommendation: z.string(),
})

export const GeoAuditReportSchema = z.object({
  url: z.string().url(),
  normalizedUrl: z.string().url(),
  fetchedAt: z.string(),
  score: z.number().min(0).max(100),
  band: z.enum(auditBandValues),
  summary: z.object({
    headline: z.string(),
    overview: z.string(),
    topPriority: z.string(),
  }),
  topActions: z.array(AuditActionSchema),
  checks: z.array(AuditCheckResultSchema),
  crawl: z.object({
    robotsUrlChecked: z.boolean(),
    homepageFetched: z.boolean(),
    responseTimeMs: z.number().optional(),
  }),
})

export const GeoAuditErrorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
})

export type AuditCheckResult = z.infer<typeof AuditCheckResultSchema>
export type AuditAction = z.infer<typeof AuditActionSchema>
export type GeoAuditReport = z.infer<typeof GeoAuditReportSchema>
export type GeoAuditErrorResponse = z.infer<typeof GeoAuditErrorResponseSchema>
