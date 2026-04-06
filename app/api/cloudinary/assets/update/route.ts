import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

function toPipeString(obj?: Record<string, unknown>) {
  if (!obj) return undefined

  return Object.entries(obj)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('|')
}

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      asset_id,
      display_name,
      asset_folder,
      tags,
      context,
      metadata,
      visual_search,
    } = body

    if (!asset_id) {
      return NextResponse.json(
        { error: 'asset_id is required' },
        { status: 400 },
      )
    }

    const result = await cloudinaryAdminFetch(`/resources/${encodeURIComponent(asset_id)}`, 'PUT', {
      display_name,
      asset_folder,
      tags: Array.isArray(tags) ? tags.join(',') : undefined,
      context: toPipeString(context as Record<string, unknown>),
      metadata: toPipeString(metadata as Record<string, unknown>),
      visual_search,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }
}