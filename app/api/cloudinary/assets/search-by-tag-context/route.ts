/**
 * API Surface Classification:
 * - exposure: internal
 * - category: cloudinary
 * - notes: Search expression builder for tag/context/folder; connector-first; not part of default GPT schema.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import cloudinary from '@/lib/cloudinary.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function esc(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export async function GET(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const tag = searchParams.get('tag')?.trim()
    const context_key = searchParams.get('context_key')?.trim()
    const context_value = searchParams.get('context_value')?.trim()
    const asset_folder = searchParams.get('asset_folder')?.trim()
    const max_results = Number(searchParams.get('max_results') || '30')
    const next_cursor = searchParams.get('next_cursor') || undefined

    const hasCtx = Boolean(context_key && context_value)
    if (!tag && !hasCtx && !asset_folder) {
      return NextResponse.json(
        { error: 'Provide tag, context_key+context_value, and/or asset_folder' },
        { status: 400 },
      )
    }

    const rt = searchParams.get('resource_type')?.trim() || 'image'
    const parts: string[] = [`resource_type="${esc(rt)}"`]
    if (tag) parts.push(`tags="${esc(tag)}"`)
    if (hasCtx) parts.push(`context.${esc(context_key!)}="${esc(context_value!)}"`)
    if (asset_folder) parts.push(`asset_folder="${esc(asset_folder)}"`)

    const expression = parts.join(' AND ')

    let search = cloudinary.search
      .expression(expression)
      .sort_by('uploaded_at', 'desc')
      .max_results(max_results)
      .with_field('tags')
      .with_field('context')

    if (next_cursor) {
      search = search.next_cursor(next_cursor)
    }

    const result = await search.execute()

    return NextResponse.json({
      expression,
      total_count: result.total_count ?? result.resources?.length ?? 0,
      resources: result.resources ?? [],
      next_cursor: result.next_cursor ?? null,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Search failed' },
      { status: 500 },
    )
  }
}
