/**
 * API Surface Classification:
 * - exposure: internal
 * - category: cloudinary
 * - notes: Derived/variants inspection; connector-first; not part of default GPT schema.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { normalizeResourceDetail } from '@/lib/cloudinary/normalizeResourceDetail'
import { resolvePublicIdToAssetId, type CloudinaryResourceType } from '@/lib/cloudinary/resolveAssetId'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'
import cloudinary from '@/lib/cloudinary.server'

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

    let record: Record<string, unknown>
    let resolvedPublicId = public_id

    if (asset_id) {
      record = (await cloudinaryAdminFetch(
        `/resources/${encodeURIComponent(asset_id)}`,
        'GET',
      )) as Record<string, unknown>
      resolvedPublicId = (record.public_id as string | undefined) ?? undefined
    } else {
      const resolvedAssetId = await resolvePublicIdToAssetId(
        public_id!,
        resource_type,
        delivery_type,
      )
      if (!resolvedAssetId) {
        return NextResponse.json(
          { error: 'Asset not found for provided public_id' },
          { status: 404 },
        )
      }
      record = (await cloudinaryAdminFetch(
        `/resources/${encodeURIComponent(resolvedAssetId)}`,
        'GET',
      )) as Record<string, unknown>
    }

    let derived: unknown[] = (record.derived as unknown[]) ?? []

    const pid = resolvedPublicId ?? (record.public_id as string | undefined)
    if (pid && (!derived || derived.length === 0)) {
      try {
        const classic = (await cloudinary.api.resource(pid, {
          resource_type,
          type: delivery_type,
        })) as { derived?: unknown[] }
        derived = classic.derived ?? []
      } catch {
        // keep record-derived / empty
      }
    }

    return NextResponse.json({
      derived,
      detail: normalizeResourceDetail(record),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Derived lookup failed' },
      { status: 500 },
    )
  }
}
