'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChartBar, Database, Sparkle, UploadSimple } from '@phosphor-icons/react'
import {
  DEMO_JOURNEYS,
  channelLabel,
  compareModels,
  groupIntoJourneys,
  importCsv,
  summarizeDataset,
  type AttributionPlatform,
  type AttributionResult,
  type Touchpoint,
} from '@/lib/attribution-snapshot'
import { analytics } from '@/lib/analytics'
import { springEntrance, viewport } from '@/lib/motion'
import styles from './ToolsAttributionSnapshotPageClient.module.css'

const CSV_TEMPLATES: Record<AttributionPlatform, { fileName: string; columns: string[]; sample: string[] }> = {
  'google-ads': {
    fileName: 'attribution-snapshot-google-ads-template.csv',
    columns: ['Date', 'Conversions', 'Conversion value', 'Click ID'],
    sample: ['2026-03-01', '1', '1250', 'gads-1001'],
  },
  meta: {
    fileName: 'attribution-snapshot-meta-template.csv',
    columns: ['Reporting starts', 'Purchases', 'Purchase conversion value'],
    sample: ['2026-03-01', '1', '940'],
  },
}

type SourceState = {
  label: string
  warnings: string[]
}

function percentage(value: number) {
  return `${Math.round(value * 100)}%`
}

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function averageCredits(results: AttributionResult[]) {
  const channels = new Set(results.flatMap((result) => Object.keys(result.channelCredits)))

  return Array.from(channels).map((channel) => {
    const values = results.map((result) => result.channelCredits[channel] ?? 0)
    const average = values.reduce((sum, value) => sum + value, 0) / results.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    return { channel, average, min, max, spread: max - min }
  })
}

function confidenceLabel(spread: number) {
  if (spread <= 0.12) {
    return 'Stable'
  }

  if (spread <= 0.24) {
    return 'Mixed'
  }

  return 'Volatile'
}

export default function ToolsAttributionSnapshotPageClient() {
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([])
  const [source, setSource] = useState<SourceState | null>(null)
  const [platform, setPlatform] = useState<AttributionPlatform>('google-ads')
  const [error, setError] = useState<string | null>(null)
  const [isParsing, setIsParsing] = useState(false)

  const journeys = useMemo(() => groupIntoJourneys(touchpoints), [touchpoints])
  const results = useMemo(() => (journeys.length > 0 ? compareModels(journeys) : []), [journeys])
  const dataset = useMemo(() => summarizeDataset(touchpoints), [touchpoints])
  const averages = useMemo(() => averageCredits(results), [results])

  const topChannel = [...averages].sort((left, right) => right.average - left.average)[0]
  const weakestChannel = [...averages].sort((left, right) => left.average - right.average)[0]
  const mostVariableChannel = [...averages].sort((left, right) => right.spread - left.spread)[0]
  const hasTrackedView = useRef(false)
  const lastResultsKey = useRef<string | null>(null)

  useEffect(() => {
    if (hasTrackedView.current) {
      return
    }

    analytics.toolView('Attribution Snapshot', 'route')
    hasTrackedView.current = true
  }, [])

  useEffect(() => {
    if (!results.length || !source) {
      return
    }

    const resultsKey = `${source.label}:${dataset.journeyCount}:${dataset.channelCount}:${dataset.touchpointCount}`
    if (lastResultsKey.current === resultsKey) {
      return
    }

    analytics.attributionSnapshotResults(source.label, dataset.journeyCount, dataset.channelCount)
    lastResultsKey.current = resultsKey
  }, [dataset.channelCount, dataset.journeyCount, dataset.touchpointCount, results.length, source])

  function downloadTemplate() {
    const template = CSV_TEMPLATES[platform]
    const csv = `${template.columns.join(',')}\n${template.sample.join(',')}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = template.fileName
    anchor.click()
    URL.revokeObjectURL(url)
    analytics.attributionSnapshotTemplateDownload(platform)
  }

  async function handleFileSelection(file: File | null) {
    if (!file) {
      return
    }

    setIsParsing(true)
    setError(null)
    analytics.toolInteraction('Attribution Snapshot', 'upload_start', {
      platform,
    })

    try {
      const text = await file.text()
      const imported = importCsv(platform, text)
      setTouchpoints(imported.touchpoints)
      setSource({
        label: platform === 'google-ads' ? 'Google Ads CSV' : 'Meta Ads CSV',
        warnings: imported.warnings,
      })
      analytics.attributionSnapshotUpload(
        platform,
        imported.touchpoints.length,
        new Set(imported.touchpoints.map((touchpoint) => touchpoint.sessionId)).size,
      )
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : 'Could not parse that file.')
      analytics.toolInteraction('Attribution Snapshot', 'upload_error', {
        platform,
      })
    } finally {
      setIsParsing(false)
    }
  }

  function loadDemo() {
    setError(null)
    setTouchpoints(DEMO_JOURNEYS.flat())
    setSource({
      label: 'Demo journeys',
      warnings: ['Demo mode uses sample multi-touch journeys so you can see the model spread before importing anything real.'],
    })
    analytics.toolInteraction('Attribution Snapshot', 'demo_loaded', {
      journey_count: DEMO_JOURNEYS.length,
    })
  }

  function reset() {
    setTouchpoints([])
    setSource(null)
    setError(null)
    lastResultsKey.current = null
    analytics.toolInteraction('Attribution Snapshot', 'reset')
  }

  return (
    <main className={styles.page}>
      <div className={styles.backWrap}>
        <Link href="/tools" className={styles.backLink}>
          <ArrowLeft size={15} weight="regular" />
          All tools
        </Link>
      </div>

      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springEntrance}
      >
        <div className={styles.heroMeta}>
          <span className={styles.category}>Marketing</span>
          <span className={styles.year}>2026</span>
        </div>
        <div className={styles.heroGrid}>
          <div>
            <h1 className={styles.title}>Attribution Snapshot</h1>
            <p className={styles.tagline}>
              A fast, directional read on which channels look closer to revenue when you compare first-touch, last-touch, linear, and time-decay models side by side.
            </p>
            <p className={styles.intro}>
              This is not a full attribution warehouse. It is a practical operator tool for spotting where the story changes depending on the model, where budget confidence is stronger, and where your reporting setup is still too thin to trust.
            </p>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.metricStrip}>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>4</span>
                <span className={styles.metricLabel}>model views compared</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>CSV</span>
                <span className={styles.metricLabel}>demo or ad export input</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricValue}>Fast</span>
                <span className={styles.metricLabel}>directional answer, not a rebuild</span>
              </div>
            </div>
            <div className={styles.signalGrid}>
              {[
                'See where different models agree',
                'Flag channels with unstable credit spread',
                'Use the result to scope better measurement work',
              ].map((item) => (
                <div key={item} className={styles.signalCard}>
                  <Sparkle size={16} weight="fill" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.toolSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Try It Now</span>
          <h2 className={styles.sectionTitle}>Import a lightweight dataset or start with demo journeys.</h2>
          <p className={styles.sectionBody}>
            Phase 1 stays intentionally simple: Google Ads CSV, Meta Ads CSV, or demo data. The goal is to make the model spread visible fast, then route the deeper data problem into the right service conversation.
          </p>
        </div>

        <div className={styles.toolGrid}>
          <div className={styles.controlCard}>
            <div className={styles.controlTop}>
              <div>
                <p className={styles.controlEyebrow}>Input source</p>
                <h3 className={styles.controlTitle}>Choose a CSV template</h3>
              </div>
              <Database size={22} weight="regular" />
            </div>

            <div className={styles.platformTabs}>
              {([
                { value: 'google-ads', label: 'Google Ads' },
                { value: 'meta', label: 'Meta Ads' },
              ] as const).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={platform === item.value ? styles.platformTabActive : styles.platformTab}
                  onClick={() => {
                    setPlatform(item.value)
                    analytics.toolInteraction('Attribution Snapshot', 'platform_switch', {
                      platform: item.value,
                    })
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className={styles.templateCard}>
              <div className={styles.templateHeader}>
                <div>
                  <p className={styles.templateEyebrow}>Template</p>
                  <h4 className={styles.templateTitle}>Use this column structure.</h4>
                </div>
                <button type="button" className={styles.templateButton} onClick={downloadTemplate}>
                  Download template
                </button>
              </div>
              <div className={styles.templateColumns}>
                {CSV_TEMPLATES[platform].columns.map((column) => (
                  <span key={column} className={styles.templateColumn}>{column}</span>
                ))}
              </div>
            </div>

            <label className={styles.uploadCard}>
              <UploadSimple size={24} weight="regular" />
              <span className={styles.uploadTitle}>{isParsing ? 'Reading file...' : 'Upload a CSV export'}</span>
              <span className={styles.uploadBody}>
                {platform === 'google-ads'
                  ? 'Use a campaign export that includes Date, Conversions, Conversion value, and Click ID.'
                  : 'Use a Meta Ads export that includes Reporting starts, Purchases, and Purchase conversion value.'}
              </span>
              <input
                type="file"
                accept=".csv"
                className={styles.hiddenInput}
                onChange={(event) => void handleFileSelection(event.target.files?.[0] ?? null)}
              />
            </label>

            <div className={styles.controlActions}>
              <button type="button" className={styles.secondaryButton} onClick={loadDemo}>
                Load demo journeys
              </button>
              <button type="button" className={styles.ghostButton} onClick={reset} disabled={touchpoints.length === 0 && !error}>
                Reset
              </button>
            </div>

            {error ? <p className={styles.errorText}>{error}</p> : null}

            {source ? (
              <div className={styles.datasetSummary}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryLabel}>{source.label}</span>
                  <span className={styles.summaryMeta}>{dataset.touchpointCount} touchpoints loaded</span>
                </div>
                <div className={styles.summaryGrid}>
                  <div>
                    <span className={styles.summaryValue}>{dataset.journeyCount}</span>
                    <span className={styles.summaryName}>journeys</span>
                  </div>
                  <div>
                    <span className={styles.summaryValue}>{dataset.channelCount}</span>
                    <span className={styles.summaryName}>channels</span>
                  </div>
                  <div>
                    <span className={styles.summaryValue}>{dataset.conversionCount}</span>
                    <span className={styles.summaryName}>conversions</span>
                  </div>
                  <div>
                    <span className={styles.summaryValue}>{currency(dataset.revenue)}</span>
                    <span className={styles.summaryName}>modeled revenue</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className={styles.contextCard}>
            <div className={styles.controlTop}>
              <div>
                <p className={styles.controlEyebrow}>Interpretation</p>
                <h3 className={styles.controlTitle}>Read it like an operator, not an attribution vendor.</h3>
              </div>
              <ChartBar size={22} weight="regular" />
            </div>

            <div className={styles.noteList}>
              <div className={styles.noteCard}>
                <strong>Agreement matters.</strong>
                <span>If multiple models still point to the same channel, that signal is usually worth trusting more.</span>
              </div>
              <div className={styles.noteCard}>
                <strong>Spread matters.</strong>
                <span>If a channel swings hard between models, your measurement or journey stitching is likely still thin.</span>
              </div>
              <div className={styles.noteCard}>
                <strong>Context matters.</strong>
                <span>This MVP compares model logic against exported rows. It does not claim user-level or warehouse-grade attribution.</span>
              </div>
            </div>

            {source?.warnings.length ? (
              <div className={styles.warningBlock}>
                {source.warnings.map((warning) => (
                  <p key={warning}>{warning}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.section>

      {results.length > 0 ? (
        <>
          <motion.section
            className={styles.resultsSection}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={springEntrance}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Model Comparison</span>
              <h2 className={styles.sectionTitle}>See where the credit shifts when the logic changes.</h2>
            </div>

            <div className={styles.resultGrid}>
              {results.map((result) => {
                const sorted = Object.entries(result.channelCredits).sort(([, left], [, right]) => right - left)
                return (
                  <article key={result.key} className={styles.resultCard}>
                    <div className={styles.resultHeader}>
                      <h3>{result.model}</h3>
                      <span>{sorted.length} channels</span>
                    </div>
                    <div className={styles.barList}>
                      {sorted.map(([channel, value]) => (
                        <div key={`${result.key}-${channel}`} className={styles.barRow}>
                          <div className={styles.barMeta}>
                            <span>{channelLabel(channel)}</span>
                            <span>{percentage(value)}</span>
                          </div>
                          <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: percentage(value) }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.resultInsight}>
                      {result.insights[0]}
                    </div>
                  </article>
                )
              })}
            </div>
          </motion.section>

          <motion.section
            className={styles.resultsSection}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={springEntrance}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Spend Read</span>
              <h2 className={styles.sectionTitle}>Turn the model spread into a practical next move.</h2>
            </div>

            <div className={styles.recommendationGrid}>
              {topChannel ? (
                <article className={styles.recommendationCard}>
                  <span className={styles.recommendationLabel}>Lean in</span>
                  <h3>{channelLabel(topChannel.channel)}</h3>
                  <p>
                    It holds the strongest average credit across models at {percentage(topChannel.average)}. That usually means the channel still looks valuable even when you change the attribution logic.
                  </p>
                </article>
              ) : null}

              {weakestChannel ? (
                <article className={styles.recommendationCard}>
                  <span className={styles.recommendationLabel}>Pressure test</span>
                  <h3>{channelLabel(weakestChannel.channel)}</h3>
                  <p>
                    It only averages {percentage(weakestChannel.average)} of model credit. That does not automatically mean cut it, but it does mean it should justify itself with stronger downstream evidence.
                  </p>
                </article>
              ) : null}

              {mostVariableChannel ? (
                <article className={styles.recommendationCard}>
                  <span className={styles.recommendationLabel}>Investigate</span>
                  <h3>{channelLabel(mostVariableChannel.channel)}</h3>
                  <p>
                    Its credit ranges from {percentage(mostVariableChannel.min)} to {percentage(mostVariableChannel.max)} depending on the model. That is usually a measurement-quality problem before it is a budget-allocation problem.
                  </p>
                </article>
              ) : null}
            </div>

            <div className={styles.spreadTableWrap}>
              <div className={styles.spreadHeader}>
                <div>
                  <span className={styles.sectionLabel}>Confidence Table</span>
                  <h3 className={styles.spreadTitle}>Channel spread by model</h3>
                </div>
                <p className={styles.spreadBody}>
                  Smaller spreads usually mean the channel story is holding up regardless of attribution logic.
                </p>
              </div>

              <div className={styles.spreadTable}>
                <div className={styles.spreadTableHead}>
                  <span>Channel</span>
                  <span>Average</span>
                  <span>Range</span>
                  <span>Confidence</span>
                </div>
                {averages
                  .slice()
                  .sort((left, right) => right.average - left.average)
                  .map((channel) => (
                    <div key={channel.channel} className={styles.spreadRow}>
                      <span className={styles.spreadChannel}>{channelLabel(channel.channel)}</span>
                      <span>{percentage(channel.average)}</span>
                      <span>{percentage(channel.min)} - {percentage(channel.max)}</span>
                      <span className={styles.spreadConfidence}>{confidenceLabel(channel.spread)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.section>
        </>
      ) : null}

      <motion.section
        className={styles.explainSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <span className={styles.sectionLabel}>What This Is For</span>
        <div className={styles.explainGrid}>
          <div className={styles.explainCard}>
            <h2>Use this when the channel story feels fuzzy.</h2>
            <p>
              Most SMB teams are not missing a prettier dashboard. They are missing a trustworthy story about which channels create demand, which ones assist, and where reporting confidence breaks down. Attribution Snapshot makes that ambiguity visible fast.
            </p>
          </div>
          <div className={styles.explainCard}>
            <h2>Use the output to scope the real fix.</h2>
            <p>
              If the models roughly agree, the next move may be budget or channel focus. If they disagree sharply, the next move is usually better tracking, cleaner CRM structure, and reporting architecture you can actually run from.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <div className={styles.ctaCopy}>
          <span className={styles.sectionLabel}>Next Step</span>
          <h2>Want the real measurement version of this?</h2>
          <p>
            I can turn a directional read like this into a concrete reporting and attribution plan tied to your CRM, conversion flow, and actual operating decisions.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <Link
            href="/contact?intent=tool"
            className={styles.primaryCta}
            onClick={() => analytics.ctaClick('attribution_snapshot', 'measurement_plan')}
          >
            Turn this into a real measurement plan
            <ArrowRight size={16} weight="regular" />
          </Link>
          <Link
            href="/services/growth/the-conductor"
            className={styles.secondaryCta}
            onClick={() => analytics.ctaClick('attribution_snapshot', 'measurement_service')}
          >
            See the measurement service
          </Link>
          <Link
            href="/work/graston-growth-engine"
            className={styles.secondaryCta}
            onClick={() => analytics.ctaClick('attribution_snapshot', 'supporting_proof')}
          >
            See supporting proof
          </Link>
        </div>
      </motion.section>
    </main>
  )
}