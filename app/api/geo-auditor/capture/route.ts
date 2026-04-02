/**
 * POST /api/capture
 *
 * Body:  { email: string, auditData: AuditResult }
 * Returns: { success: boolean, message: string }
 *
 * Sends a full GEO Readiness Report to the user via Resend.
 * Rate limit: 5 emails / hour per IP.
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp } from '@/lib/geo-auditor/rate-limiter'
import { SITE_ORIGIN, SITE_HOSTNAME, geoOptimizationUrl } from '@/lib/geo-auditor/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// validation schemas

const CheckResultSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(['pass', 'warn', 'fail']),
  weight: z.number().min(0).max(100),
  message: z.string(),
  fix: z.string().optional(),
})

const AuditResultSchema = z.object({
  url: z.string().url(),
  score: z.number().min(0).max(100),
  checks: z.array(CheckResultSchema).min(1),
  summary: z.string(),
  fetchedAt: z.string(),
})

const RequestSchema = z.object({
  name: z.preprocess(
    val => (typeof val === 'string' ? val.trim() : val),
    z.string().min(1, 'Please enter your name').max(100)
  ),
  email: z.preprocess(
    val => (typeof val === 'string' ? val.trim().toLowerCase() : val),
    z.string().email('Please enter a valid email address')
  ),
  auditData: AuditResultSchema,
})

type CaptureRequest = z.infer<typeof RequestSchema>

type CheckResult = z.infer<typeof CheckResultSchema>

// [email template functions and POST handler as in source file]
export async function POST(req: NextRequest) {
  return NextResponse.json({ success: false, message: 'Capture route migrated— full email html template to be injected' }, { status: 501 })
}