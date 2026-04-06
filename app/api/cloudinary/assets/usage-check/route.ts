/**
 * API Surface Classification:
 * - exposure: gpt
 * - category: cloudinary
 * - notes: Correlates Cloudinary assets with this repo (data/, components/, app/, lib/, next.config*); inferPageMappings() + safe_to_rename_signal; not available from Cloudinary alone.
 */
import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'
import {
  collectRepoSourceFiles,
  computeSafeToRenameSignal,
  findRepoReferences,
  inferPageMappings,
  type PageMapping,
  type RepoReference,
  type SafeToRename,
} from '@/lib/cloudinary/usageCheckScan'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type UsageItem = {
  public_id?: string
  asset_id?: string
  secure_url?: string
}

function dedupeRefs(refs: RepoReference[]): RepoReference[] {
  const seen = new Set<string>()
  const out: RepoReference[] = []
  for (const r of refs) {
    const k = `${r.file}:${r.line_hint ?? ''}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push(r)
  }
  return out
}

async function tryPublicIdFromAsset(asset_id: string): Promise<string | null> {
  try {
    const data = (await cloudinaryAdminFetch(
      `/resources/${encodeURIComponent(asset_id)}`,
      'GET',
    )) as { public_id?: string }
    return data.public_id ?? null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as {
      public_ids?: string[]
      asset_ids?: string[]
      secure_urls?: string[]
      items?: UsageItem[]
    }

    const files = collectRepoSourceFiles(process.cwd())

    const items: UsageItem[] = []
    if (Array.isArray(body.items) && body.items.length > 0) {
      items.push(...body.items)
    } else {
      for (const id of body.public_ids ?? []) {
        items.push({ public_id: id })
      }
      for (const id of body.asset_ids ?? []) {
        items.push({ asset_id: id })
      }
      for (const u of body.secure_urls ?? []) {
        items.push({ secure_url: u })
      }
    }

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Provide items[], or public_ids[], asset_ids[], and/or secure_urls[]' },
        { status: 400 },
      )
    }

    const output: Array<{
      public_id: string | null
      asset_id: string | null
      secure_url: string | null
      is_referenced_in_repo: boolean
      is_mapped_to_known_page: boolean
      repo_reference_count: number
      page_mapping_count: number
      repo_references: RepoReference[]
      page_mappings: PageMapping[]
      safe_to_rename_signal: SafeToRename
    }> = []

    for (const raw of items) {
      let publicId = raw.public_id?.trim() || null
      const assetId = raw.asset_id?.trim() || null
      const secureUrl = raw.secure_url?.trim() || null

      if (assetId && !publicId) {
        publicId = await tryPublicIdFromAsset(assetId)
      }

      const needles: string[] = []
      if (publicId) needles.push(publicId)
      if (assetId) needles.push(assetId)
      if (secureUrl) needles.push(secureUrl)

      const refMap = new Map<string, RepoReference>()
      for (const needle of needles) {
        for (const r of findRepoReferences(files, needle)) {
          const k = `${r.file}:${r.line_hint ?? ''}`
          refMap.set(k, r)
        }
      }

      const repo_references = dedupeRefs([...refMap.values()])
      const page_mappings = publicId ? inferPageMappings(publicId) : []
      const families = new Set(page_mappings.map(m => m.route_family))
      const repo_reference_count = repo_references.length
      const page_mapping_count = page_mappings.length

      const is_referenced_in_repo = repo_reference_count > 0
      const is_mapped_to_known_page = page_mapping_count > 0

      const safe_to_rename_signal = computeSafeToRenameSignal(repo_reference_count, families)

      output.push({
        public_id: publicId,
        asset_id: assetId,
        secure_url: secureUrl,
        is_referenced_in_repo,
        is_mapped_to_known_page,
        repo_reference_count,
        page_mapping_count,
        repo_references,
        page_mappings,
        safe_to_rename_signal,
      })
    }

    return NextResponse.json({ results: output })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Usage check failed' },
      { status: 500 },
    )
  }
}
