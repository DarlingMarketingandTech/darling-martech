/**
 * API Surface Classification:
 * - exposure: internal
 * - category: cloudinary
 * - notes: api.resource wrapper; connector-first; not part of default GPT schema.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import cloudinary from '@/lib/cloudinary.server'
import { normalizeResourceDetail } from '@/lib/cloudinary/normalizeResourceDetail'
import type { CloudinaryResourceType } from '@/lib/cloudinary/resolveAssetId'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const public_id = searchParams.get('public_id')
    if (!public_id) {
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 })
    }

    const resource_type = (searchParams.get('resource_type') || 'image') as CloudinaryResourceType
    const delivery_type = searchParams.get('delivery_type') || 'upload'

    const resource = (await cloudinary.api.resource(public_id, {
      resource_type,
      type: delivery_type,
    })) as Record<string, unknown>

    return NextResponse.json({
      public_id,
      resource: normalizeResourceDetail(resource),
      raw: resource,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lookup failed'
    const isNotFound = /not found|404/i.test(message)
    return NextResponse.json({ error: message }, { status: isNotFound ? 404 : 500 })
  }
}
