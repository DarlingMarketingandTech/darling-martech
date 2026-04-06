/**
 * API Surface Classification:
 * - exposure: optional
 * - category: cloudinary
 * - notes: Batched metadata updates; expose in GPT only if needed beyond connector workflows.
 */
import { NextRequest, NextResponse } from 'next/server'

import { buildAdminAssetPutBody } from '@/lib/cloudinary/assetUpdatePayload'
import { resolvePublicIdToAssetId, type CloudinaryResourceType } from '@/lib/cloudinary/resolveAssetId'
import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type BulkItem = {
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

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as { items?: BulkItem[] }
    const items = body.items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'items array is required' }, { status: 400 })
    }

    const results: Array<{
      asset_id?: string
      public_id?: string
      ok: boolean
      error?: string
      response?: unknown
    }> = []

    let updated_count = 0

    for (const item of items) {
      const resource_type = item.resource_type ?? 'image'
      const delivery_type = item.delivery_type ?? 'upload'

      let asset_id = item.asset_id?.trim()
      const public_id = item.public_id?.trim()

      if (!asset_id && !public_id) {
        results.push({ ok: false, error: 'Each item needs asset_id or public_id' })
        continue
      }

      if (!asset_id && public_id) {
        const resolved = await resolvePublicIdToAssetId(public_id, resource_type, delivery_type)
        if (!resolved) {
          results.push({
            public_id,
            ok: false,
            error: 'Asset not found for provided public_id',
          })
          continue
        }
        asset_id = resolved
      }

      const payload = buildAdminAssetPutBody({
        display_name: item.display_name,
        asset_folder: item.asset_folder,
        tags: item.tags,
        context: item.context,
        metadata: item.metadata,
        visual_search: item.visual_search,
      })

      try {
        const response = await cloudinaryAdminFetch(
          `/resources/${encodeURIComponent(asset_id!)}`,
          'PUT',
          payload,
        )
        updated_count++
        results.push({ asset_id, public_id, ok: true, response })
      } catch (error) {
        results.push({
          asset_id,
          public_id,
          ok: false,
          error: error instanceof Error ? error.message : 'Update failed',
        })
      }
    }

    return NextResponse.json({ results, updated_count })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bulk update failed' },
      { status: 500 },
    )
  }
}
