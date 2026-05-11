#!/usr/bin/env node

const DEFAULT_MAX_RESULTS = 100
const DELETE_BATCH_SIZE = 100
let cloudinary

function printHelp() {
  console.log(`
Cloudinary derived-asset cleanup

Usage:
  npm run cloudinary:cleanup -- --search '<expression>' [--max-results 100] [--execute]
  npm run cloudinary:cleanup -- --public-id <id> [--public-id <id> ...] [--execute]

Options:
  --search <expression>        Cloudinary Search API expression used to find assets.
  --public-id <id>             Target one or more explicit public IDs.
  --resource-type <type>       Cloudinary resource type (default: image).
  --delivery-type <type>       Cloudinary delivery type (default: upload).
  --max-results <count>        Max assets to inspect for --search (default: 100).
  --execute                    Actually delete derived assets. Dry-run by default.
  --help                       Show this message.

Examples:
  npm run cloudinary:cleanup -- --search 'asset_folder="studio/archive"' 
  npm run cloudinary:cleanup -- --public-id studio/projects/example --execute
`)
}

function parseArgs(argv) {
  const options = {
    publicIds: [],
    search: null,
    resourceType: 'image',
    deliveryType: 'upload',
    maxResults: DEFAULT_MAX_RESULTS,
    execute: false,
    help: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    switch (arg) {
      case '--public-id':
        if (!argv[i + 1]) throw new Error('Missing value for --public-id')
        options.publicIds.push(argv[i + 1].trim())
        i += 1
        break
      case '--search':
        if (!argv[i + 1]) throw new Error('Missing value for --search')
        options.search = argv[i + 1].trim()
        i += 1
        break
      case '--resource-type':
        if (!argv[i + 1]) throw new Error('Missing value for --resource-type')
        options.resourceType = argv[i + 1].trim()
        i += 1
        break
      case '--delivery-type':
        if (!argv[i + 1]) throw new Error('Missing value for --delivery-type')
        options.deliveryType = argv[i + 1].trim()
        i += 1
        break
      case '--max-results':
        if (!argv[i + 1]) throw new Error('Missing value for --max-results')
        options.maxResults = Number.parseInt(argv[i + 1], 10)
        i += 1
        break
      case '--execute':
        options.execute = true
        break
      case '--help':
      case '-h':
        options.help = true
        break
      default:
        throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return options
}

async function ensureEnv() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Missing Cloudinary environment variables. Expected NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    )
  }

  const { v2 } = await import('cloudinary')
  cloudinary = v2

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
}

async function loadPublicIdsFromSearch(expression, maxResults) {
  const publicIds = []
  let nextCursor

  while (publicIds.length < maxResults) {
    const remaining = Math.max(1, Math.min(500, maxResults - publicIds.length))
    let query = cloudinary.search
      .expression(expression)
      .sort_by('uploaded_at', 'desc')
      .max_results(remaining)

    if (nextCursor) {
      query = query.next_cursor(nextCursor)
    }

    const result = await query.execute()
    const resources = Array.isArray(result.resources) ? result.resources : []

    for (const resource of resources) {
      const publicId = typeof resource.public_id === 'string' ? resource.public_id.trim() : ''
      if (publicId) publicIds.push(publicId)
      if (publicIds.length >= maxResults) break
    }

    if (!result.next_cursor || resources.length === 0) break
    nextCursor = result.next_cursor
  }

  return publicIds
}

function getDerivedIds(resource) {
  const derived = Array.isArray(resource?.derived) ? resource.derived : []

  return derived
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      return item.id ?? item.derived_resource_id ?? null
    })
    .filter((value) => typeof value === 'string' && value.length > 0)
}

async function inspectAsset(publicId, resourceType, deliveryType) {
  const resource = await cloudinary.api.resource(publicId, {
    resource_type: resourceType,
    type: deliveryType,
  })

  return {
    publicId,
    assetId: resource.asset_id ?? null,
    bytes: resource.bytes ?? 0,
    derivedCount: Array.isArray(resource.derived) ? resource.derived.length : 0,
    derivedIds: getDerivedIds(resource),
  }
}

function printSummary(results, execute) {
  const assetsWithDerived = results.filter((item) => item.derivedCount > 0)
  const totalDerived = assetsWithDerived.reduce((sum, item) => sum + item.derivedIds.length, 0)

  console.log(`Scanned assets: ${results.length}`)
  console.log(`Assets with derived variants: ${assetsWithDerived.length}`)
  console.log(`Derived variants found: ${totalDerived}`)
  console.log(`Mode: ${execute ? 'execute' : 'dry-run'}`)

  if (assetsWithDerived.length === 0) return

  console.log('\nTargets:')
  for (const item of assetsWithDerived) {
    console.log(`- ${item.publicId} (${item.derivedIds.length} derived)`)
  }
}

async function deleteDerivedResources(derivedIds) {
  for (let i = 0; i < derivedIds.length; i += DELETE_BATCH_SIZE) {
    const batch = derivedIds.slice(i, i + DELETE_BATCH_SIZE)
    await cloudinary.api.delete_derived_resources(batch)
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))

  if (options.help) {
    printHelp()
    return
  }

  if (!options.search && options.publicIds.length === 0) {
    throw new Error('Provide either --search or at least one --public-id.')
  }

  if (!Number.isFinite(options.maxResults) || options.maxResults <= 0) {
    throw new Error('--max-results must be a positive integer.')
  }

  await ensureEnv()

  const publicIds = options.search
    ? await loadPublicIdsFromSearch(options.search, options.maxResults)
    : [...new Set(options.publicIds)]

  if (publicIds.length === 0) {
    console.log('No matching assets found.')
    return
  }

  const results = []
  for (const publicId of publicIds) {
    try {
      results.push(
        await inspectAsset(publicId, options.resourceType, options.deliveryType)
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Cloudinary error'
      console.warn(`Skipping ${publicId}: ${message}`)
    }
  }

  printSummary(results, options.execute)

  if (!options.execute) {
    console.log('\nDry run complete. Re-run with --execute to delete derived variants.')
    return
  }

  const allDerivedIds = results.flatMap((item) => item.derivedIds)

  if (allDerivedIds.length === 0) {
    console.log('\nNothing to delete.')
    return
  }

  await deleteDerivedResources(allDerivedIds)
  console.log(`\nDeleted ${allDerivedIds.length} derived resources.`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
