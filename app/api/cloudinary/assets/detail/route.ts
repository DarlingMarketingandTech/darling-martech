/**
 * API Surface Classification:
 * - exposure: internal
 * - category: cloudinary
 * - notes: Normalized asset detail; connector-first; not part of default GPT schema.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { normalizeResourceDetail } from '@/lib/cloudinary/normalizeResourceDetail'
import { resolvePublicIdToAssetId, type CloudinaryResourceType } from '@/lib/cloudinary/resolveAssetId'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const asset_id = searchParams.get('asset_id')?.trim()
    const public_id = searchParams.get('public_id')?.trim()
    const resource_type = (searchParams.get('resource_type') || 'image') as CloudinaryResourceType
    const delivery_type = searchParams.get('delivery_type') || 'upload'

    if (!asset_id && !public_id) {
      return NextResponse.json(
        { error: 'Either asset_id or public_id is required' },
        { status: 400 },
      )
    }

    if (asset_id && public_id) {
      return NextResponse.json(
        { error: 'Provide only one of asset_id or public_id' },
        { status: 400 },
      )
    }

    if (asset_id) {
      const data = (await cloudinaryAdminFetch(
        `/resources/${encodeURIComponent(asset_id)}`,
        'GET',
      )) as Record<string, unknown>
      return NextResponse.json({
        detail: normalizeResourceDetail(data),
        raw: data,
      })
    }

    const resolvedId = await resolvePublicIdToAssetId(public_id!, resource_type, delivery_type)
    if (!resolvedId) {
      return NextResponse.json(
        { error: 'Asset not found for provided public_id' },
        { status: 404 },
      )
    }

    const data = (await cloudinaryAdminFetch(
      `/resources/${encodeURIComponent(resolvedId)}`,
      'GET',
    )) as Record<string, unknown>

    return NextResponse.json({
      detail: normalizeResourceDetail(data),
      raw: data,
      resolved_asset_id: resolvedId,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Detail failed' },
      { status: 500 },
    )
  }
}
