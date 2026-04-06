import cloudinary from '@/lib/cloudinary.server'

export type CloudinaryResourceType = 'image' | 'video' | 'raw'

/**
 * Resolve Media Library asset_id from public_id via Search API, then Admin resource fallback.
 */
export async function resolvePublicIdToAssetId(
  publicId: string,
  resourceType: CloudinaryResourceType = 'image',
  deliveryType: string = 'upload',
): Promise<string | null> {
  const trimmed = publicId.trim()
  if (!trimmed) return null

  const escaped = trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const expr =
    `public_id="${escaped}" AND resource_type="${resourceType}" AND type="${deliveryType}"`

  try {
    const result = await cloudinary.search.expression(expr).max_results(1).execute()
    const row = result.resources?.[0] as { asset_id?: string } | undefined
    if (row?.asset_id) return row.asset_id
  } catch {
    // fall through to api.resource
  }

  try {
    const res = (await cloudinary.api.resource(trimmed, {
      resource_type: resourceType,
      type: deliveryType,
    })) as { asset_id?: string }
    return res.asset_id ?? null
  } catch {
    return null
  }
}
