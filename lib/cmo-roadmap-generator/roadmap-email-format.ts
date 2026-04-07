import type { RoadmapResult } from './types'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function phaseBlockText(phase: RoadmapResult['phases'][number]): string {
  const lines = [
    `${phase.phaseLabel} — ${phase.headline} (${phase.rangeLabel})`,
    phase.intent,
    ...phase.modules.map((m) => `  • ${m.title}: ${m.description}`),
  ]
  return lines.join('\n')
}

function phaseBlockHtml(phase: RoadmapResult['phases'][number]): string {
  const modules = phase.modules
    .map(
      (m) =>
        `<li><strong>${escapeHtml(m.title)}</strong> — ${escapeHtml(m.description)}</li>`,
    )
    .join('')

  return `<h3 style="margin:1.25rem 0 0.35rem;font-size:15px;">${escapeHtml(phase.phaseLabel)} — ${escapeHtml(phase.headline)}</h3>
<p style="margin:0 0 0.35rem;color:#444;font-size:14px;">${escapeHtml(phase.rangeLabel)}</p>
<p style="margin:0 0 0.5rem;color:#555;font-size:14px;line-height:1.5;">${escapeHtml(phase.intent)}</p>
<ul style="margin:0;padding-left:1.2rem;color:#333;font-size:14px;line-height:1.55;">${modules}</ul>`
}

/**
 * Plain-text body for Resend (user copy + same structure Jacob sees on BCC).
 */
export function formatRoadmapEmailText(roadmap: RoadmapResult, recipientName?: string): string {
  const greet = recipientName?.trim() ? `Hi ${recipientName.trim()},` : 'Hi,'

  const priorities = roadmap.topPriorities
    .map((p, i) => `${i + 1}. ${p.title}\n   ${p.description}`)
    .join('\n\n')

  const phases = roadmap.phases.map(phaseBlockText).join('\n\n')

  const engagement = [
    `Primary service: ${roadmap.recommendedPrimaryService}`,
    roadmap.recommendedSupportingService
      ? `Supporting service: ${roadmap.recommendedSupportingService}`
      : null,
    `Format: ${roadmap.recommendedEngagementFormat}`,
    `Shape: ${roadmap.recommendedEngagementShape}`,
  ]
    .filter((line): line is string => line != null)
    .join('\n')

  return [
    greet,
    '',
    'Here is the 90-day marketing roadmap you generated on darlingmartech.com (computed from your intake answers).',
    '',
    '— Executive summary —',
    roadmap.executiveSummary,
    '',
    '— Your context (from intake) —',
    ...roadmap.businessSnapshotLines.map((line) => `• ${line}`),
    '',
    '— Top priorities —',
    priorities,
    '',
    '— Phased roadmap —',
    phases,
    '',
    '— Suggested engagement shape —',
    engagement,
    '',
    '— Watch-outs —',
    ...roadmap.watchOuts.map((w) => `• ${w}`),
    '',
    'If you want to turn this into executed work, reply to this email or start at https://www.darlingmartech.com/contact?intent=tool',
    '',
    '—',
    'Jacob Darling',
    'Darling MarTech',
  ].join('\n')
}

/**
 * Lightweight HTML alternative for mail clients that prefer HTML.
 */
export function formatRoadmapEmailHtml(roadmap: RoadmapResult, recipientName?: string): string {
  const greet = recipientName?.trim()
    ? `<p style="margin:0 0 1rem;font-size:16px;line-height:1.5;">Hi ${escapeHtml(recipientName.trim())},</p>`
    : '<p style="margin:0 0 1rem;font-size:16px;line-height:1.5;">Hi,</p>'

  const snapshot = roadmap.businessSnapshotLines
    .map((line) => `<li style="margin-bottom:0.35rem;">${escapeHtml(line)}</li>`)
    .join('')

  const priorities = roadmap.topPriorities
    .map(
      (p, i) =>
        `<li style="margin-bottom:0.85rem;"><strong>${i + 1}. ${escapeHtml(p.title)}</strong><br/><span style="color:#555;">${escapeHtml(p.description)}</span></li>`,
    )
    .join('')

  const phases = roadmap.phases.map(phaseBlockHtml).join('')

  const watch = roadmap.watchOuts
    .map((w) => `<li style="margin-bottom:0.35rem;">${escapeHtml(w)}</li>`)
    .join('')

  const supporting = roadmap.recommendedSupportingService
    ? `<p style="margin:0.35rem 0;"><strong>Supporting service:</strong> ${escapeHtml(roadmap.recommendedSupportingService)}</p>`
    : ''

  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;max-width:640px;margin:0;padding:24px;color:#111;background:#fff;">
${greet}
<p style="margin:0 0 1rem;color:#444;font-size:15px;line-height:1.6;">Here is the <strong>90-day marketing roadmap</strong> you generated on Darling MarTech. It is built from your intake answers — not pasted in from the browser.</p>
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Executive summary</h2>
<p style="margin:0 0 1rem;font-size:15px;line-height:1.65;color:#333;">${escapeHtml(roadmap.executiveSummary)}</p>
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Your context</h2>
<ul style="margin:0 0 1rem;padding-left:1.2rem;color:#333;font-size:14px;line-height:1.5;">${snapshot}</ul>
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Top priorities</h2>
<ol style="margin:0 0 1rem;padding-left:1.2rem;">${priorities}</ol>
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Phased roadmap</h2>
${phases}
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Suggested engagement</h2>
<p style="margin:0.35rem 0;font-size:14px;"><strong>Primary:</strong> ${escapeHtml(roadmap.recommendedPrimaryService)}</p>
${supporting}
<p style="margin:0.35rem 0;font-size:14px;"><strong>Format:</strong> ${escapeHtml(roadmap.recommendedEngagementFormat)}</p>
<p style="margin:0.35rem 0;font-size:14px;"><strong>Shape:</strong> ${escapeHtml(roadmap.recommendedEngagementShape)}</p>
<h2 style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#888;margin:1.5rem 0 0.5rem;">Watch-outs</h2>
<ul style="margin:0 0 1.25rem;padding-left:1.2rem;color:#333;font-size:14px;line-height:1.55;">${watch}</ul>
<p style="margin:0;font-size:14px;line-height:1.6;color:#555;">Want help executing this? Reply to this email or visit <a href="https://www.darlingmartech.com/contact?intent=tool" style="color:#c2410c;">darlingmartech.com/contact</a> with intent <em>I just ran a tool</em>.</p>
<p style="margin:1.5rem 0 0;font-size:14px;color:#333;">— Jacob Darling<br/><span style="color:#666;">Darling MarTech</span></p>
</body></html>`
}
