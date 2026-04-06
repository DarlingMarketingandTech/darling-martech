import fs from 'fs'
import path from 'path'

const SCAN_ROOTS = ['data', 'components', 'app', 'lib'] as const
const EXT_RE = /\.(tsx?|jsx?|json|css|md|mdx|mjs|cjs)$/i

const SKIP_DIR = new Set([
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
])

export type RepoReference = {
  file: string
  line_hint?: string
}

export type PageMapping = {
  route_family: string
  reason: string
}

export type SafeToRename = 'unknown' | 'low_risk' | 'caution' | 'high_risk'

function walkDir(dir: string, out: string[]) {
  if (!fs.existsSync(dir)) return
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (SKIP_DIR.has(ent.name)) continue
      walkDir(full, out)
    } else if (EXT_RE.test(ent.name)) {
      out.push(full)
    }
  }
}

export function collectRepoSourceFiles(cwd: string): string[] {
  const out: string[] = []
  for (const root of SCAN_ROOTS) {
    walkDir(path.join(/* turbopackIgnore: true */ cwd, root), out)
  }
  const nextCfg = ['next.config.js', 'next.config.mjs', 'next.config.ts']
  for (const cfg of nextCfg) {
    const p = path.join(/* turbopackIgnore: true */ cwd, cfg)
    if (fs.existsSync(p)) out.push(p)
  }
  return out
}

function findNeedleLines(content: string, needle: string): number[] {
  const lines: number[] = []
  let idx = 0
  while (idx < content.length) {
    const found = content.indexOf(needle, idx)
    if (found === -1) break
    const line = content.slice(0, found).split('\n').length
    lines.push(line)
    idx = found + needle.length
  }
  return lines
}

export function findRepoReferences(files: string[], needle: string): RepoReference[] {
  if (!needle) return []
  const refs: RepoReference[] = []
  for (const file of files) {
    let content: string
    try {
      content = fs.readFileSync(file, 'utf8')
    } catch {
      continue
    }
    if (!content.includes(needle)) continue
    const lines = findNeedleLines(content, needle)
    for (const line of lines) {
      refs.push({ file: path.normalize(file), line_hint: String(line) })
    }
  }
  return refs
}

export function inferPageMappings(publicId: string): PageMapping[] {
  const id = publicId.toLowerCase()
  const mappings: PageMapping[] = []
  if (id.includes('studio/projects') || id.startsWith('studio/projects')) {
    mappings.push({
      route_family: '/work',
      reason: 'studio/projects is primary case-study and service proof imagery',
    })
  }
  if (id.includes('studio/labs')) {
    mappings.push({
      route_family: '/tools',
      reason: 'studio/labs aligns with tools and productized build media',
    })
  }
  if (id.includes('studio/graphic-design')) {
    mappings.push({
      route_family: '/studio',
      reason: 'studio/graphic-design is design-led gallery and page imagery',
    })
  }
  if (id.includes('studio/photography')) {
    mappings.push({
      route_family: '/studio',
      reason: 'studio/photography is editorial and gallery imagery',
    })
  }
  if (id.includes('website images')) {
    mappings.push({
      route_family: '/',
      reason: 'website images are curated direct-use site assets',
    })
  }
  if (id.includes('studio/archive')) {
    mappings.push({
      route_family: 'archive',
      reason: 'archive folders are lower-trust defaults; verify usage before rename',
    })
  }
  return mappings
}

export function computeSafeToRenameSignal(
  repoCount: number,
  mappingFamilies: Set<string>,
): SafeToRename {
  if (repoCount === 0) return 'unknown'
  if (repoCount >= 5) return 'high_risk'
  if (repoCount >= 2) return 'caution'
  if (mappingFamilies.size > 1) return 'caution'
  return 'low_risk'
}
