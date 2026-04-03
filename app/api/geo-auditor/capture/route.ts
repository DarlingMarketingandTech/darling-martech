import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp } from '@/lib/geo-auditor/rate-limiter'
import { SITE_HOSTNAME, SITE_ORIGIN, geoOptimizationUrl } from '@/lib/geo-auditor/site'
import { GeoAuditReportSchema } from '@/lib/geo-auditor/types'

const BaseSchema = z.object({
  name: z.preprocess(value => (typeof value === 'string' ? value.trim() : value), z.string().min(1).max(100)),
  email: z.preprocess(value => (typeof value === 'string' ? value.trim().toLowerCase() : value), z.string().email()),
  company: z.preprocess(value => (typeof value === 'string' ? value.trim() : value), z.string().max(120).optional()),
})

const ModernSchema = BaseSchema.extend({ audit: GeoAuditReportSchema })
const LegacySchema = BaseSchema.extend({ auditData: GeoAuditReportSchema })

type CaptureRequest = z.infer<typeof BaseSchema> & { audit: z.infer<typeof GeoAuditReportSchema> }

function normalizeRequest(body: unknown): { success: true; data: CaptureRequest } | { success: false; message: string; details?: unknown } {
  const modern = ModernSchema.safeParse(body)
  if (modern.success) {
    return { success: true, data: modern.data }
  }

  const legacy = LegacySchema.safeParse(body)
  if (legacy.success) {
    return {
      success: true,
      data: {
        name: legacy.data.name,
        email: legacy.data.email,
        company: legacy.data.company,
        audit: legacy.data.auditData,
      },
    }
  }

  const firstIssue = modern.error.issues[0] ?? legacy.error.issues[0]
  return {
    success: false,
    message: firstIssue?.message ?? 'Invalid request payload.',
    details: modern.error.issues,
  }
}

function renderActions(report: CaptureRequest['audit']): string {
  const actions = report.topActions.slice(0, 5)
  if (!actions.length) {
    return '<p style="margin:0;color:#d9e2f2;">No urgent actions were identified in the audited checks.</p>'
  }

  return actions
    .map(
      action => `
        <li style="margin:0 0 12px;">
          <strong style="color:#f5f0e8;">${action.title}</strong><br />
          <span style="color:#c7ced9;">${action.recommendation}</span>
        </li>
      `,
    )
    .join('')
}

function renderChecks(report: CaptureRequest['audit']): string {
  return report.checks
    .map(
      check => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);color:#f5f0e8;font-weight:600;vertical-align:top;">${check.label}</td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);color:#c7ced9;vertical-align:top;">${check.summary}</td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);color:#c7ced9;vertical-align:top;text-transform:capitalize;">${check.status}</td>
        </tr>
      `,
    )
    .join('')
}

function buildHtml({ name, company, audit }: CaptureRequest): string {
  const companyLine = company ? `<p style="margin:0 0 4px;color:#c7ced9;">Company: ${company}</p>` : ''

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:32px 16px;background:#090909;font-family:Inter,Arial,sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
                <tr>
                  <td style="padding:32px 32px 24px;background:linear-gradient(135deg, rgba(255,77,0,0.18), rgba(255,77,0,0.04));border-bottom:1px solid rgba(255,255,255,0.08);">
                    <p style="margin:0 0 10px;color:#ffb089;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:700;">Darling MarTech · GEO Readiness Auditor</p>
                    <h1 style="margin:0 0 8px;color:#f5f0e8;font-size:28px;line-height:1.2;">Your full GEO report is ready, ${name}.</h1>
                    <p style="margin:0;color:#c7ced9;font-size:15px;line-height:1.6;">This is the deeper version of the audit: stronger diagnosis, clearer priorities, and a cleaner path into implementation.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 8px;">
                    <div style="display:inline-block;padding:10px 14px;border-radius:999px;background:rgba(255,77,0,0.12);color:#ffb089;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${audit.band} · ${audit.score}/100</div>
                    <h2 style="margin:18px 0 10px;color:#f5f0e8;font-size:22px;line-height:1.3;">${audit.summary.headline}</h2>
                    <p style="margin:0 0 14px;color:#c7ced9;font-size:15px;line-height:1.7;">${audit.summary.overview}</p>
                    <p style="margin:0 0 18px;color:#f5f0e8;font-size:15px;line-height:1.7;"><strong>What I would fix first:</strong> ${audit.summary.topPriority}</p>
                    <p style="margin:0 0 6px;color:#c7ced9;">Audited URL: <a href="${audit.url}" style="color:#ffb089;">${audit.url}</a></p>
                    ${companyLine}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 32px 8px;">
                    <h3 style="margin:0 0 12px;color:#f5f0e8;font-size:18px;">Top actions</h3>
                    <ol style="margin:0;padding-left:20px;color:#c7ced9;line-height:1.7;">
                      ${renderActions(audit)}
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px 8px;">
                    <h3 style="margin:0 0 12px;color:#f5f0e8;font-size:18px;">Check-by-check breakdown</h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;">
                      <thead>
                        <tr style="background:#171717;">
                          <th align="left" style="padding:12px 16px;color:#8e97a5;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Check</th>
                          <th align="left" style="padding:12px 16px;color:#8e97a5;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Finding</th>
                          <th align="left" style="padding:12px 16px;color:#8e97a5;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${renderChecks(audit)}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 32px 32px;">
                    <div style="padding:22px;border-radius:18px;background:rgba(255,77,0,0.08);border:1px solid rgba(255,77,0,0.22);">
                      <h3 style="margin:0 0 10px;color:#f5f0e8;font-size:18px;">Want help fixing this?</h3>
                      <p style="margin:0 0 18px;color:#c7ced9;font-size:15px;line-height:1.7;">The audit tells you what is weak. The GEO optimization service is where I turn that diagnosis into structure, implementation, and measurable discoverability improvements.</p>
                      <a href="${geoOptimizationUrl()}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#ff4d00;color:#090909;font-weight:700;text-decoration:none;">Review the GEO optimization service</a>
                    </div>
                    <p style="margin:24px 0 0;color:#8e97a5;font-size:12px;line-height:1.6;">Requested from <a href="${SITE_ORIGIN}" style="color:#ffb089;">${SITE_HOSTNAME}</a>.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function buildText({ name, company, audit }: CaptureRequest): string {
  const actions = audit.topActions.map(action => `- ${action.title}: ${action.recommendation}`).join('\n')
  const checks = audit.checks.map(check => `- ${check.label} [${check.status}]: ${check.summary}`).join('\n')

  return [
    `Hi ${name},`,
    '',
    `Your full GEO report is ready for ${audit.url}.`,
    `Score: ${audit.score}/100 (${audit.band})`,
    company ? `Company: ${company}` : '',
    '',
    audit.summary.headline,
    audit.summary.overview,
    '',
    `What I would fix first: ${audit.summary.topPriority}`,
    '',
    'Top actions:',
    actions || '- No urgent actions identified.',
    '',
    'Check-by-check breakdown:',
    checks,
    '',
    `Review the GEO optimization service: ${geoOptimizationUrl()}`,
    `Requested from ${SITE_HOSTNAME}`,
  ].filter(Boolean).join('\n')
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rateLimit = await checkRateLimit(ip, 'capture')

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        message: `Too many report requests. Please try again in ${Math.ceil(rateLimit.resetIn / 60)} minute(s).`,
      },
      { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON body.' }, { status: 400 })
  }

  const normalized = normalizeRequest(body)
  if (!normalized.success) {
    return NextResponse.json({ success: false, message: normalized.message, details: normalized.details }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    return NextResponse.json({ success: false, message: 'Email service is not configured.' }, { status: 503 })
  }

  try {
    const resend = new Resend(resendKey)
    const from = process.env.RESEND_FROM ?? 'GEO Auditor <onboarding@resend.dev>'
    const html = buildHtml(normalized.data)
    const text = buildText(normalized.data)

    const { error } = await resend.emails.send({
      from,
      to: normalized.data.email,
      subject: `Your GEO report for ${new URL(normalized.data.audit.url).hostname} — ${normalized.data.audit.score}/100`,
      html,
      text,
    })

    if (error) {
      return NextResponse.json({ success: false, message: 'Failed to send the report email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: `The full report has been sent to ${normalized.data.email}.` })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Unexpected email delivery failure.',
      },
      { status: 500 },
    )
  }
}
