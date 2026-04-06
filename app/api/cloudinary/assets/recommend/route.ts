/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: cloudinary
 * - notes: Darling folder semantics: /studio/projects (work/proof), /studio/labs (tools), /studio/graphic-design, /studio/photography, /website images; /studio/archive not a default source; page-name search expressions + scoring.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import cloudinary from '@/lib/cloudinary.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type PreferredOrientation = 'landscape' | 'portrait' | 'square' | 'any'

type RecommendableAsset = {
  public_id?: string
  display_name?: string
  asset_folder?: string
  tags?: string[]
  context?: Record<string, unknown>
  width?: number
  height?: number
}

type ScoredRecommendableAsset = RecommendableAsset & {
  _score: number
  score_reason: string
}

function matchesOrientation(
  preferred: PreferredOrientation,
  width?: number,
  height?: number,
) {
  if (!width || !height || preferred === 'any') return true
  if (preferred === 'landscape') return width > height
  if (preferred === 'portrait') return height > width
  if (preferred === 'square') return Math.abs(width - height) <= 60
  return true
}

function buildSearchExpression(pageName: string, folder?: string) {
  const page = pageName.toLowerCase()

  if (folder) {
    return `resource_type="image" AND asset_folder="${folder}"`
  }

  if (page.includes('work') || page.includes('project') || page.includes('case')) {
    return 'resource_type="image" AND (asset_folder="studio/projects" OR asset_folder:"studio/projects/*" OR asset_folder="website images/work")'
  }

  if (page.includes('lab') || page.includes('tool')) {
    return 'resource_type="image" AND (asset_folder="studio/labs" OR asset_folder:"studio/labs/*" OR asset_folder="website images/labs")'
  }

  if (page.includes('photo')) {
    return 'resource_type="image" AND (asset_folder="studio/photography" OR asset_folder:"studio/photography/*")'
  }

  if (page.includes('design')) {
    return 'resource_type="image" AND (asset_folder="studio/graphic-design" OR asset_folder:"studio/graphic-design/*")'
  }

  if (page.includes('about') || page.includes('founder')) {
    return 'resource_type="image" AND (asset_folder="website images/about" OR asset_folder="studio/photography" OR asset_folder:"studio/photography/*")'
  }

  return 'resource_type="image" AND (asset_folder="website images" OR asset_folder:"website images/*" OR asset_folder="studio/projects" OR asset_folder:"studio/projects/*" OR asset_folder="studio/graphic-design" OR asset_folder:"studio/graphic-design/*" OR asset_folder="studio/photography" OR asset_folder:"studio/photography/*")'
}

function scoreAsset(asset: RecommendableAsset, pageName: string, keywords: string[]) {
  let score = 0

  const haystack = [
    asset.public_id,
    asset.display_name,
    asset.asset_folder,
    ...(asset.tags || []),
    JSON.stringify(asset.context || {}),
  ]
    .join(' ')
    .toLowerCase()

  if (haystack.includes(pageName.toLowerCase())) score += 4

  for (const keyword of keywords) {
    if (haystack.includes(String(keyword).toLowerCase())) score += 2
  }

  if ((asset.width || 0) >= 1600) score += 2
  if ((asset.height || 0) >= 900) score += 1

  if ((asset.tags || []).includes('featured')) score += 2

  return score
}

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const {
      page_name,
      folder,
      brand_keywords = [],
      preferred_orientation = 'landscape',
      limit = 8,
    } = await req.json()

    if (!page_name) {
      return NextResponse.json(
        { error: 'page_name is required' },
        { status: 400 },
      )
    }

    const expression = buildSearchExpression(page_name, folder)

    const result = await cloudinary.search
      .expression(expression)
      .sort_by('uploaded_at', 'desc')
      .max_results(Math.max(limit * 5, 30))
      .with_field('tags')
      .with_field('context')
      .execute()

    const resources = (result.resources || []) as RecommendableAsset[]

    const recommended = resources
      .filter((asset: RecommendableAsset) =>
        matchesOrientation(
          preferred_orientation as PreferredOrientation,
          asset.width,
          asset.height,
        ),
      )
      .map((asset: RecommendableAsset): ScoredRecommendableAsset => {
        const score = scoreAsset(asset, page_name, brand_keywords as string[])

        return {
          ...asset,
          _score: score,
          score_reason:
            `Selected for ${page_name} based on folder relevance, keyword fit, ` +
            'tag/context match, and usable image dimensions.',
        }
      })
      .sort((a: ScoredRecommendableAsset, b: ScoredRecommendableAsset) => b._score - a._score)
      .slice(0, limit)
      .map(({ _score, ...rest }: ScoredRecommendableAsset) => {
        void _score
        return rest
      })

    return NextResponse.json({ recommended, expression })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Recommend failed' },
      { status: 500 },
    )
  }
}