export function normalizeResourceDetail(resource: Record<string, unknown>) {
  return {
    asset_id: resource.asset_id ?? null,
    public_id: resource.public_id ?? null,
    resource_type: resource.resource_type ?? null,
    type: resource.type ?? null,
    format: resource.format ?? null,
    version: resource.version ?? null,
    created_at: resource.created_at ?? null,
    bytes: resource.bytes ?? null,
    width: resource.width ?? null,
    height: resource.height ?? null,
    folder: resource.folder ?? null,
    asset_folder: resource.asset_folder ?? null,
    display_name: resource.display_name ?? null,
    secure_url: resource.secure_url ?? null,
    url: resource.url ?? null,
    tags: resource.tags ?? null,
    context: resource.context ?? null,
    derived: resource.derived ?? null,
    eager: resource.eager ?? null,
  }
}
