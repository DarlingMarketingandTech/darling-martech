import fs from 'node:fs/promises'
import path from 'node:path'

const REPO_ROOT = process.cwd()
const OUTPUT_IMAGE_ROOT = path.join(REPO_ROOT, 'public', 'images', 'work-brand-dna')
const OUTPUT_DATA_FILE = path.join(REPO_ROOT, 'data', 'work', 'brand-dna.generated.ts')

const SOURCES = [
  {
    slug: '317-bbq',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/317 bbq',
  },
  {
    slug: 'graston-technique',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/Graston',
  },
  {
    slug: 'hoosier-boy-barbershop',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/hoosier-boy-barbershop-brand-dna',
  },
  {
    slug: 'riley-bennett-egloff',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/RBE',
  },
  {
    slug: 'russell-painting',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/Russell Painting Company',
  },
  {
    slug: 'urgentcare-indy',
    folder: 'c:/Users/hoosi/OneDrive/Documents/Darling M&T/project brand dna/Urgent Care Indy',
  },
]

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])

function safeArray(value) {
  return Array.isArray(value) ? value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean) : []
}

function cleanText(value) {
  if (typeof value !== 'string') return undefined
  const text = value.trim()
  return text.length ? text : undefined
}

function parseTextBasedBrandDna(rawText) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) return null

  const data = {
    name: lines[0],
    websiteUrl: lines[1].startsWith('http') ? lines[1] : undefined,
    overview: undefined,
    tagline: undefined,
    brandValues: [],
    visualAesthetics: [],
    toneOfVoice: [],
    fonts: [],
    colors: [],
    campaignCreativeTitles: [],
    campaignImageFiles: [],
  }

  const sectionIndex = (label) => lines.findIndex((line) => line.toLowerCase() === label.toLowerCase())

  const colorsStart = sectionIndex('Colors')
  const fontsStart = sectionIndex('Fonts')
  const taglineStart = sectionIndex('Tagline')
  const overviewStart = sectionIndex('Business overview')

  if (colorsStart !== -1) {
    const colorsEndCandidates = [fontsStart, taglineStart, overviewStart].filter((idx) => idx > colorsStart)
    const colorsEnd = colorsEndCandidates.length ? Math.min(...colorsEndCandidates) : lines.length
    data.colors = lines.slice(colorsStart + 1, colorsEnd).filter((line) => /^#[0-9a-f]{6}$/i.test(line))
  }

  if (fontsStart !== -1) {
    const fontsEndCandidates = [taglineStart, overviewStart].filter((idx) => idx > fontsStart)
    const fontsEnd = fontsEndCandidates.length ? Math.min(...fontsEndCandidates) : lines.length
    data.fonts = lines
      .slice(fontsStart + 1, fontsEnd)
      .filter((line) => line.toLowerCase() !== 'aa' && !line.toLowerCase().includes('thumbnail'))
  }

  if (taglineStart !== -1 && lines[taglineStart + 1]) {
    data.tagline = lines[taglineStart + 1]
  }

  if (overviewStart !== -1) {
    data.overview = lines.slice(overviewStart + 1).join(' ')
  }

  return data
}

async function readBrandJson(folder) {
  const entries = await fs.readdir(folder, { withFileTypes: true })
  const jsonEntry = entries.find((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.json'))

  if (!jsonEntry) return { parsed: null, jsonFile: null }

  const jsonPath = path.join(folder, jsonEntry.name)
  const raw = await fs.readFile(jsonPath, 'utf8')
  const trimmed = raw.trim()

  if (!trimmed) return { parsed: null, jsonFile: jsonEntry.name }

  try {
    return { parsed: JSON.parse(trimmed), jsonFile: jsonEntry.name }
  } catch {
    return { parsed: parseTextBasedBrandDna(trimmed), jsonFile: jsonEntry.name }
  }
}

function extractCampaignData(parsed) {
  const campaignCreativeTitles = []
  const campaignImageFiles = []

  if (!parsed || !Array.isArray(parsed.campaigns)) {
    return { campaignCreativeTitles, campaignImageFiles }
  }

  for (const campaign of parsed.campaigns) {
    if (!campaign || !Array.isArray(campaign.creatives)) continue
    for (const creative of campaign.creatives) {
      if (creative?.title) campaignCreativeTitles.push(String(creative.title).trim())
      if (!Array.isArray(creative?.versions)) continue
      for (const version of creative.versions) {
        if (version?.fileName) campaignImageFiles.push(String(version.fileName).trim())
      }
    }
  }

  return {
    campaignCreativeTitles: [...new Set(campaignCreativeTitles)],
    campaignImageFiles: [...new Set(campaignImageFiles)],
  }
}

function chooseFeaturedImages(imageFiles, campaignImageFiles) {
  const screencaps = imageFiles.filter((file) => file.toLowerCase().startsWith('screencapture-'))
  const campaignExisting = campaignImageFiles.filter((name) => imageFiles.includes(name))

  const ordered = [...screencaps, ...campaignExisting, ...imageFiles]
  const unique = []

  for (const file of ordered) {
    if (!unique.includes(file)) unique.push(file)
    if (unique.length >= 4) break
  }

  return unique
}

async function copyImages(sourceFolder, destinationFolder, selectedImageFiles) {
  await fs.mkdir(destinationFolder, { recursive: true })

  for (const imageFile of selectedImageFiles) {
    const from = path.join(sourceFolder, imageFile)
    const to = path.join(destinationFolder, imageFile)
    await fs.copyFile(from, to)
  }
}

function toTsArray(values) {
  return `[${values.map((value) => JSON.stringify(value)).join(', ')}]`
}

function buildTsFile(profiles) {
  const lines = []
  lines.push('// Auto-generated by scripts/sync-brand-dna-assets.mjs')
  lines.push('// Do not edit manually. Re-run the sync script after source updates.')
  lines.push('')
  lines.push('export type BrandDnaProfile = {')
  lines.push('  slug: string')
  lines.push('  name?: string')
  lines.push('  websiteUrl?: string')
  lines.push('  overview?: string')
  lines.push('  tagline?: string')
  lines.push('  brandValues: string[]')
  lines.push('  visualAesthetics: string[]')
  lines.push('  toneOfVoice: string[]')
  lines.push('  fonts: string[]')
  lines.push('  colors: string[]')
  lines.push('  campaignCreativeTitles: string[]')
  lines.push('  imageFiles: string[]')
  lines.push('  featuredImageFiles: string[]')
  lines.push('}')
  lines.push('')
  lines.push('export const BRAND_DNA_PROFILES: Record<string, BrandDnaProfile> = {')

  for (const profile of profiles) {
    lines.push(`  ${JSON.stringify(profile.slug)}: {`)
    lines.push(`    slug: ${JSON.stringify(profile.slug)},`)
    if (profile.name) lines.push(`    name: ${JSON.stringify(profile.name)},`)
    if (profile.websiteUrl) lines.push(`    websiteUrl: ${JSON.stringify(profile.websiteUrl)},`)
    if (profile.overview) lines.push(`    overview: ${JSON.stringify(profile.overview)},`)
    if (profile.tagline) lines.push(`    tagline: ${JSON.stringify(profile.tagline)},`)
    lines.push(`    brandValues: ${toTsArray(profile.brandValues)},`)
    lines.push(`    visualAesthetics: ${toTsArray(profile.visualAesthetics)},`)
    lines.push(`    toneOfVoice: ${toTsArray(profile.toneOfVoice)},`)
    lines.push(`    fonts: ${toTsArray(profile.fonts)},`)
    lines.push(`    colors: ${toTsArray(profile.colors)},`)
    lines.push(`    campaignCreativeTitles: ${toTsArray(profile.campaignCreativeTitles)},`)
    lines.push(`    imageFiles: ${toTsArray(profile.imageFiles)},`)
    lines.push(`    featuredImageFiles: ${toTsArray(profile.featuredImageFiles)},`)
    lines.push('  },')
  }

  lines.push('}')
  lines.push('')

  return `${lines.join('\n')}\n`
}

async function main() {
  const profiles = []

  for (const source of SOURCES) {
    const entries = await fs.readdir(source.folder, { withFileTypes: true })
    const imageFiles = entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b))

    const { parsed } = await readBrandJson(source.folder)
    const campaignData = extractCampaignData(parsed)
    const featuredImageFiles = chooseFeaturedImages(imageFiles, campaignData.campaignImageFiles)

    const profile = {
      slug: source.slug,
      name: cleanText(parsed?.name),
      websiteUrl: cleanText(parsed?.websiteUrl),
      overview: cleanText(parsed?.overview),
      tagline: cleanText(parsed?.tagline),
      brandValues: safeArray(parsed?.brandValues),
      visualAesthetics: safeArray(parsed?.visualAesthetics),
      toneOfVoice: safeArray(parsed?.toneOfVoice),
      fonts: safeArray(parsed?.fonts),
      colors: safeArray(parsed?.colors),
      campaignCreativeTitles: safeArray(campaignData.campaignCreativeTitles),
      imageFiles,
      featuredImageFiles,
    }

    const destinationFolder = path.join(OUTPUT_IMAGE_ROOT, source.slug)
    await copyImages(source.folder, destinationFolder, featuredImageFiles)

    profiles.push(profile)
  }

  profiles.sort((a, b) => a.slug.localeCompare(b.slug))

  const generated = buildTsFile(profiles)
  await fs.writeFile(OUTPUT_DATA_FILE, generated, 'utf8')

  console.log(`Synced ${profiles.length} brand DNA profiles`)
  for (const profile of profiles) {
    console.log(`- ${profile.slug}: ${profile.featuredImageFiles.length} images`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
