import { z } from 'zod'
import type { IntakeAnswers } from './types'

/** Query key for handing intake answers to the results route (Phase 4 send-roadmap can reuse the same string). */
export const ROADMAP_INTAKE_QUERY_KEY = 'd'

export const INTAKE_PAYLOAD_VERSION = 1 as const

const businessTypeSchema = z.enum([
  'healthcare',
  'legal',
  'local-service',
  'saas',
  'ecommerce',
  'general',
])

const businessStageSchema = z.enum(['pre-launch', 'early', 'established', 'mature'])

const mainGoalSchema = z.enum([
  'lead-generation',
  'bookings',
  'brand-clarity',
  'revenue-growth',
  'reporting-clarity',
])

const bottleneckSchema = z.enum([
  'unclear-positioning',
  'weak-conversion',
  'messy-stack',
  'inconsistent-demand',
  'unclear-roi',
])

const activeChannelSchema = z.enum(['website', 'seo', 'ads', 'email', 'social', 'referrals'])

const stackMaturitySchema = z.enum(['light', 'mixed', 'messy', 'mature'])

const teamCapacitySchema = z.enum(['founder-only', 'lean', 'small-team', 'dedicated-team'])

/** Wire format v1 — short keys keep the query string compact. */
const payloadV1Schema = z.object({
  v: z.literal(1),
  bt: businessTypeSchema,
  bs: businessStageSchema,
  mg: mainGoalSchema,
  bn: bottleneckSchema,
  ac: z.array(activeChannelSchema).min(1).max(6),
  sm: stackMaturitySchema,
  tc: teamCapacitySchema,
})

export type IntakePayloadV1 = z.infer<typeof payloadV1Schema>

function wireToAnswers(wire: IntakePayloadV1): IntakeAnswers {
  return {
    businessType: wire.bt,
    businessStage: wire.bs,
    mainGoal: wire.mg,
    bottleneck: wire.bn,
    activeChannels: wire.ac,
    stackMaturity: wire.sm,
    teamCapacity: wire.tc,
  }
}

function answersToWire(answers: IntakeAnswers): IntakePayloadV1 {
  return {
    v: INTAKE_PAYLOAD_VERSION,
    bt: answers.businessType,
    bs: answers.businessStage,
    mg: answers.mainGoal,
    bn: answers.bottleneck,
    ac: answers.activeChannels,
    sm: answers.stackMaturity,
    tc: answers.teamCapacity,
  }
}

function utf8ToBase64Url(json: string): string {
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  const base64 = btoa(binary)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlToUtf8(encoded: string): string {
  const padded = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const padLen = (4 - (padded.length % 4)) % 4
  const base64 = padded + '='.repeat(padLen)
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

/**
 * Encode validated intake answers to a URL-safe string (base64url JSON v1).
 * Safe to run in the browser (intake) or on the server.
 */
export function encodeIntakePayload(answers: IntakeAnswers): string {
  const wire = answersToWire(answers)
  const json = JSON.stringify(wire)
  return utf8ToBase64Url(json)
}

export type DecodeIntakePayloadResult =
  | { ok: true; answers: IntakeAnswers }
  | { ok: false; error: 'missing' | 'invalid' | 'malformed' }

/**
 * Decode the `d` query param back into IntakeAnswers. Deterministic for a given encoded string.
 */
export function decodeIntakePayload(encoded: string | undefined | null): DecodeIntakePayloadResult {
  if (encoded == null || encoded.trim() === '') {
    return { ok: false, error: 'missing' }
  }

  let json: string
  try {
    json = base64UrlToUtf8(encoded.trim())
  } catch {
    return { ok: false, error: 'malformed' }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { ok: false, error: 'malformed' }
  }

  const parsedResult = payloadV1Schema.safeParse(parsed)
  if (!parsedResult.success) {
    return { ok: false, error: 'invalid' }
  }

  return { ok: true, answers: wireToAnswers(parsedResult.data) }
}
