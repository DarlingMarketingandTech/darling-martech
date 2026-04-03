export type AttributionPlatform = 'google-ads' | 'meta'

export interface Touchpoint {
  channel: string
  timestamp: Date
  sessionId: string
  converted: boolean
  revenue: number
}

export interface AttributionResult {
  key: 'lastTouch' | 'firstTouch' | 'linear' | 'timeDecay'
  model: string
  channelCredits: Record<string, number>
  insights: string[]
}

export interface ImportedDataset {
  platform: AttributionPlatform
  touchpoints: Touchpoint[]
  warnings: string[]
}

const DAY_IN_MS = 86_400_000

export const DEMO_JOURNEYS: Touchpoint[][] = [
  [
    { channel: 'social', timestamp: new Date('2026-02-01T09:00:00'), sessionId: 'demo-1', converted: false, revenue: 0 },
    { channel: 'email', timestamp: new Date('2026-02-03T12:00:00'), sessionId: 'demo-1', converted: false, revenue: 0 },
    { channel: 'google-ads', timestamp: new Date('2026-02-05T16:00:00'), sessionId: 'demo-1', converted: true, revenue: 1400 },
  ],
  [
    { channel: 'organic', timestamp: new Date('2026-02-02T11:00:00'), sessionId: 'demo-2', converted: false, revenue: 0 },
    { channel: 'direct', timestamp: new Date('2026-02-07T10:00:00'), sessionId: 'demo-2', converted: true, revenue: 900 },
  ],
  [
    { channel: 'google-ads', timestamp: new Date('2026-02-04T08:00:00'), sessionId: 'demo-3', converted: false, revenue: 0 },
    { channel: 'social', timestamp: new Date('2026-02-06T15:00:00'), sessionId: 'demo-3', converted: false, revenue: 0 },
    { channel: 'email', timestamp: new Date('2026-02-08T10:30:00'), sessionId: 'demo-3', converted: false, revenue: 0 },
    { channel: 'direct', timestamp: new Date('2026-02-09T14:00:00'), sessionId: 'demo-3', converted: true, revenue: 1800 },
  ],
  [
    { channel: 'email', timestamp: new Date('2026-02-10T09:30:00'), sessionId: 'demo-4', converted: true, revenue: 650 },
  ],
  [
    { channel: 'social', timestamp: new Date('2026-02-11T10:00:00'), sessionId: 'demo-5', converted: false, revenue: 0 },
    { channel: 'organic', timestamp: new Date('2026-02-14T13:00:00'), sessionId: 'demo-5', converted: false, revenue: 0 },
    { channel: 'google-ads', timestamp: new Date('2026-02-16T17:00:00'), sessionId: 'demo-5', converted: true, revenue: 1200 },
  ],
]

function normalizeCredits(credits: Record<string, number>): Record<string, number> {
  const total = Object.values(credits).reduce((sum, value) => sum + value, 0)
  if (!total) {
    return credits
  }

  return Object.fromEntries(
    Object.entries(credits).map(([channel, value]) => [channel, value / total]),
  )
}

function buildInsights(model: string, credits: Record<string, number>): string[] {
  const sorted = Object.entries(credits).sort(([, left], [, right]) => right - left)
  if (sorted.length === 0) {
    return ['No credited channels were found in this dataset.']
  }

  const [topChannel, topCredit] = sorted[0]
  const insights = [
    `${topChannel} carries the strongest signal under ${model} at ${Math.round(topCredit * 100)}% of modeled credit.`,
  ]

  if (sorted.length > 1) {
    const [bottomChannel, bottomCredit] = sorted[sorted.length - 1]
    insights.push(
      `${bottomChannel} only picks up ${Math.round(bottomCredit * 100)}% here, which usually means it assists less often or sits farther from the close.`,
    )
  }

  return insights
}

function convertedJourneys(journeys: Touchpoint[][]): Touchpoint[][] {
  return journeys.filter((journey) => journey.some((touchpoint) => touchpoint.converted))
}

function lastTouch(journeys: Touchpoint[][]): AttributionResult {
  const credits: Record<string, number> = {}

  convertedJourneys(journeys).forEach((journey) => {
    const conversion = journey.findLast((touchpoint) => touchpoint.converted)
    if (!conversion) {
      return
    }
    credits[conversion.channel] = (credits[conversion.channel] ?? 0) + conversion.revenue
  })

  const normalized = normalizeCredits(credits)
  return {
    key: 'lastTouch',
    model: 'Last Touch',
    channelCredits: normalized,
    insights: buildInsights('Last Touch', normalized),
  }
}

function firstTouch(journeys: Touchpoint[][]): AttributionResult {
  const credits: Record<string, number> = {}

  convertedJourneys(journeys).forEach((journey) => {
    const ordered = [...journey].sort((left, right) => left.timestamp.getTime() - right.timestamp.getTime())
    const conversion = ordered.find((touchpoint) => touchpoint.converted)
    const first = ordered[0]

    if (!conversion || !first) {
      return
    }

    credits[first.channel] = (credits[first.channel] ?? 0) + conversion.revenue
  })

  const normalized = normalizeCredits(credits)
  return {
    key: 'firstTouch',
    model: 'First Touch',
    channelCredits: normalized,
    insights: buildInsights('First Touch', normalized),
  }
}

function linear(journeys: Touchpoint[][]): AttributionResult {
  const credits: Record<string, number> = {}

  convertedJourneys(journeys).forEach((journey) => {
    const conversion = journey.find((touchpoint) => touchpoint.converted)
    if (!conversion || journey.length === 0) {
      return
    }

    const share = conversion.revenue / journey.length
    journey.forEach((touchpoint) => {
      credits[touchpoint.channel] = (credits[touchpoint.channel] ?? 0) + share
    })
  })

  const normalized = normalizeCredits(credits)
  return {
    key: 'linear',
    model: 'Linear',
    channelCredits: normalized,
    insights: buildInsights('Linear', normalized),
  }
}

function timeDecay(journeys: Touchpoint[][]): AttributionResult {
  const credits: Record<string, number> = {}

  convertedJourneys(journeys).forEach((journey) => {
    const conversion = journey.find((touchpoint) => touchpoint.converted)
    if (!conversion) {
      return
    }

    const weights = journey.map((touchpoint) => {
      const daysFromConversion = (conversion.timestamp.getTime() - touchpoint.timestamp.getTime()) / DAY_IN_MS
      return Math.pow(0.5, daysFromConversion / 7)
    })
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

    journey.forEach((touchpoint, index) => {
      const weightedShare = totalWeight > 0 ? (weights[index] / totalWeight) * conversion.revenue : 0
      credits[touchpoint.channel] = (credits[touchpoint.channel] ?? 0) + weightedShare
    })
  })

  const normalized = normalizeCredits(credits)
  return {
    key: 'timeDecay',
    model: 'Time Decay',
    channelCredits: normalized,
    insights: buildInsights('Time Decay', normalized),
  }
}

export function compareModels(journeys: Touchpoint[][]): AttributionResult[] {
  return [lastTouch(journeys), firstTouch(journeys), linear(journeys), timeDecay(journeys)]
}

export function groupIntoJourneys(touchpoints: Touchpoint[]): Touchpoint[][] {
  const grouped = new Map<string, Touchpoint[]>()

  touchpoints.forEach((touchpoint) => {
    const bucket = grouped.get(touchpoint.sessionId) ?? []
    bucket.push(touchpoint)
    grouped.set(touchpoint.sessionId, bucket)
  })

  return Array.from(grouped.values()).map((journey) =>
    [...journey].sort((left, right) => left.timestamp.getTime() - right.timestamp.getTime()),
  )
}

export function channelLabel(channel: string): string {
  const known: Record<string, string> = {
    'google-ads': 'Google Ads',
    email: 'Email',
    organic: 'Organic Search',
    direct: 'Direct',
    social: 'Social / Meta',
  }

  return known[channel] ?? channel.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

export function summarizeDataset(touchpoints: Touchpoint[]) {
  const channels = new Set(touchpoints.map((touchpoint) => touchpoint.channel))
  const sessionIds = new Set(touchpoints.map((touchpoint) => touchpoint.sessionId))
  const conversions = touchpoints.filter((touchpoint) => touchpoint.converted)
  const revenue = conversions.reduce((sum, touchpoint) => sum + touchpoint.revenue, 0)

  return {
    touchpointCount: touchpoints.length,
    channelCount: channels.size,
    journeyCount: sessionIds.size,
    conversionCount: conversions.length,
    revenue,
  }
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentValue = ''
  let inQuotes = false
  const normalized = text.replace(/^\uFEFF/, '')

  for (let index = 0; index < normalized.length; index += 1) {
    const character = normalized[index]
    const nextCharacter = normalized[index + 1]

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        currentValue += '"'
        index += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (character === ',' && !inQuotes) {
      currentRow.push(currentValue.trim())
      currentValue = ''
      continue
    }

    if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1
      }
      currentRow.push(currentValue.trim())
      if (currentRow.some((value) => value.length > 0)) {
        rows.push(currentRow)
      }
      currentRow = []
      currentValue = ''
      continue
    }

    currentValue += character
  }

  if (currentValue.length > 0 || currentRow.length > 0) {
    currentRow.push(currentValue.trim())
    if (currentRow.some((value) => value.length > 0)) {
      rows.push(currentRow)
    }
  }

  return rows
}

function csvObjects(text: string): Array<Record<string, string>> {
  const rows = parseCsv(text)
  if (rows.length < 2) {
    return []
  }

  const [header, ...body] = rows
  return body.map((row) =>
    Object.fromEntries(header.map((column, index) => [column, row[index] ?? ''])),
  )
}

export function importCsv(platform: AttributionPlatform, text: string): ImportedDataset {
  const rows = csvObjects(text)

  if (rows.length === 0) {
    throw new Error('No usable rows were found in that CSV.')
  }

  if (platform === 'google-ads') {
    const touchpoints = rows
      .filter((row) => row.Date)
      .map((row, index) => ({
        channel: 'google-ads',
        timestamp: new Date(row.Date),
        sessionId: row['Click ID'] || `google-ads-${index + 1}`,
        converted: Number.parseFloat(row.Conversions || '0') > 0,
        revenue: Number.parseFloat(row['Conversion value'] || '0') || 0,
      }))
      .filter((touchpoint) => !Number.isNaN(touchpoint.timestamp.getTime()))

    if (touchpoints.length === 0) {
      throw new Error('The Google Ads file did not include readable Date rows.')
    }

    return {
      platform,
      touchpoints,
      warnings: [
        'Google Ads imports are only as good as the conversion and click ID fields in the export. This is a directional read, not person-level attribution.',
      ],
    }
  }

  const touchpoints = rows
    .filter((row) => row['Reporting starts'])
    .map((row, index) => ({
      channel: 'social',
      timestamp: new Date(row['Reporting starts']),
      sessionId: `meta-${index + 1}`,
      converted: Number.parseFloat(row.Purchases || '0') > 0,
      revenue: Number.parseFloat(row['Purchase conversion value'] || '0') || 0,
    }))
    .filter((touchpoint) => !Number.isNaN(touchpoint.timestamp.getTime()))

  if (touchpoints.length === 0) {
    throw new Error('The Meta export did not include readable Reporting starts rows.')
  }

  return {
    platform,
    touchpoints,
    warnings: [
      'Meta exports do not include a shared journey identifier here, so each row is treated as a standalone touchpoint sequence. Use this as a channel signal, not as final attribution truth.',
    ],
  }
}