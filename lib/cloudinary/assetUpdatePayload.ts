export function toPipeString(obj?: Record<string, unknown>) {
  if (!obj) return undefined

  return Object.entries(obj)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('|')
}

export function buildAdminAssetPutBody(input: {
  display_name?: string
  asset_folder?: string
  tags?: string[]
  context?: Record<string, unknown>
  metadata?: Record<string, unknown>
  visual_search?: boolean
}) {
  return {
    display_name: input.display_name,
    asset_folder: input.asset_folder,
    tags: Array.isArray(input.tags) ? input.tags.join(',') : undefined,
    context: toPipeString(input.context),
    metadata: toPipeString(input.metadata),
    visual_search: input.visual_search,
  }
}
