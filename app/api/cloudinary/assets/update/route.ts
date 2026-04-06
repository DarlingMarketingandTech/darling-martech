/**
 * API Surface Classification:
 * - exposure: optional
 * - category: cloudinary
 * - notes: Admin asset update with public_id→asset_id convenience; prefer native connector when sufficient.
 */
import { NextRequest, NextResponse } from 'next/server'

import { buildAdminAssetPutBody } from '@/lib/cloudinary/assetUpdatePayload'
import { resolvePublicIdToAssetId, type CloudinaryResourceType } from '@/lib/cloudinary/resolveAssetId'
import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

type UpdateAssetBody = {
  asset_id?: string
  public_id?: string
  resource_type?: CloudinaryResourceType
  delivery_type?: string
  display_name?: string
  asset_folder?: string
  tags?: string[]
  context?: Record<string, unknown>
  metadata?: Record<string, unknown>
  visual_search?: boolean
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as UpdateAssetBody
    const {
      asset_id: bodyAssetId,
      public_id,
      resource_type = 'image',
      delivery_type = 'upload',
      display_name,
      asset_folder,
      tags,
      context,
      metadata,
      visual_search,
    } = body

    if (!bodyAssetId && !public_id) {
      return NextResponse.json(
        { error: 'Either asset_id or public_id is required' },
        { status: 400 },
      )
    }

    let asset_id = bodyAssetId?.trim() || undefined
    if (!asset_id && public_id) {
      const resolved = await resolvePublicIdToAssetId(public_id.trim(), resource_type, delivery_type)
      if (!resolved) {
        return NextResponse.json(
          { error: 'Asset not found for provided public_id' },
          { status: 404 },
        )
      }
      asset_id = resolved
    }

    const payload = buildAdminAssetPutBody({
      display_name,
      asset_folder,
      tags,
      context,
      metadata,
      visual_search,
    })

    const result = await cloudinaryAdminFetch(
      `/resources/${encodeURIComponent(asset_id!)}`,
      'PUT',
      payload,
    )

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 },
    )
  }
}
