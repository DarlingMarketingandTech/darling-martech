/**
 * API Surface Classification:
 * - exposure: internal
 * - category: cloudinary
 * - notes: Resources-by-prefix listing; connector-first; not part of default GPT schema.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import cloudinary from '@/lib/cloudinary.server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get('folder')
    if (!folder) {
      return NextResponse.json({ error: 'folder is required' }, { status: 400 })
    }

    const max_results = Number(searchParams.get('max_results') || '30')
    const next_cursor = searchParams.get('next_cursor') || undefined
    const resource_type = searchParams.get('resource_type') || 'image'
    const sort_by = searchParams.get('sort_by')
    const direction = searchParams.get('direction') || 'desc'

    const result = await cloudinary.api.resources({
      resource_type,
      type: 'upload',
      prefix: folder,
      max_results,
      next_cursor,
    })

    return NextResponse.json({
      folder,
      resources: result.resources ?? [],
      next_cursor: result.next_cursor ?? null,
      resource_type,
      requested_sort_by: sort_by,
      requested_direction: direction,
      note:
        sort_by || direction !== 'desc'
          ? 'Cloudinary resources listing does not apply sort_by/direction in this route; values are echoed for API parity.'
          : undefined,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Folder contents failed' },
      { status: 500 },
    )
  }
}
