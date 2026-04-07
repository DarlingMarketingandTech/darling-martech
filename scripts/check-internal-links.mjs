#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const sourceRoots = ["app", "components", "data", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, "/");
}

function walkFiles(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") {
        continue;
      }
      walkFiles(fullPath, acc);
      continue;
    }
    if (entry.isFile() && sourceExtensions.has(path.extname(entry.name))) {
      acc.push(fullPath);
    }
  }
  return acc;
}

function normalizeLink(raw) {
  let link = raw.split("#")[0].split("?")[0];
  if (link.length > 1 && link.endsWith("/")) {
    link = link.slice(0, -1);
  }
  return link;
}

function collectWorkSlugs() {
  const filePath = path.join(repoRoot, "data", "work", "work-index.ts");
  const content = read(filePath);
  const slugs = new Set();
  const matches = content.matchAll(/slug\s*:\s*['\"]([a-z0-9-]+)['\"]/g);
  for (const match of matches) {
    slugs.add(match[1]);
  }
  return slugs;
}

function collectServicePaths() {
  const filePath = path.join(repoRoot, "data", "services.ts");
  const content = read(filePath);

  const paths = new Set(["/services"]);

  const routePathMatches = content.matchAll(/routePath\s*:\s*['\"](\/services\/[^'\"]+)['\"]/g);
  for (const match of routePathMatches) {
    paths.add(match[1]);
  }

  const idMatches = content.matchAll(/\bid\s*:\s*['\"]([a-z0-9-]+)['\"]/g);
  for (const match of idMatches) {
    paths.add(`/services/${match[1]}`);
  }

  return paths;
}

function collectToolPaths() {
  const paths = new Set(["/tools"]);
  const toolsDir = path.join(repoRoot, "app", "tools");

  function scanToolsDir(dir, urlPath) {
    if (!exists(dir)) {
      return;
    }
    const pagePath = path.join(dir, "page.tsx");
    if (exists(pagePath)) {
      paths.add(urlPath);
    }
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }
      scanToolsDir(path.join(dir, entry.name), `${urlPath}/${entry.name}`);
    }
  }

  scanToolsDir(toolsDir, "/tools");

  const nextConfigPath = path.join(repoRoot, "next.config.js");
  const nextConfig = read(nextConfigPath);
  const redirectSources = nextConfig.matchAll(/source\s*:\s*['\"](\/tools\/[^'\"]+)['\"]/g);
  for (const match of redirectSources) {
    paths.add(match[1]);
  }

  return paths;
}

const workSlugs = collectWorkSlugs();
const servicePaths = collectServicePaths();
const toolPaths = collectToolPaths();

const filesToScan = [];
for (const root of sourceRoots) {
  const rootPath = path.join(repoRoot, root);
  if (exists(rootPath)) {
    walkFiles(rootPath, filesToScan);
  }
}

const linkPattern = /['"`]\/(work|services|tools)(?:\/[a-z0-9-]+){0,3}(?:\?[^'"`]+)?(?:#[^'"`]+)?['"`]/g;
const failures = [];

for (const filePath of filesToScan) {
  const content = read(filePath);
  const matches = content.matchAll(linkPattern);
  for (const match of matches) {
    const raw = match[0].slice(1, -1);
    const normalized = normalizeLink(raw);

    if (normalized === "/work" || normalized === "/services" || normalized === "/tools") {
      continue;
    }

    if (normalized.startsWith("/work/")) {
      const slug = normalized.slice("/work/".length).split("/")[0];
      if (!workSlugs.has(slug)) {
        failures.push({ file: toRelative(filePath), link: normalized, reason: "unknown work slug" });
      }
      continue;
    }

    if (normalized.startsWith("/services/")) {
      if (!servicePaths.has(normalized)) {
        failures.push({ file: toRelative(filePath), link: normalized, reason: "unknown service route" });
      }
      continue;
    }

    if (normalized.startsWith("/tools/")) {
      if (!toolPaths.has(normalized)) {
        failures.push({ file: toRelative(filePath), link: normalized, reason: "unknown tools route" });
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Internal link integrity check failed:");
  for (const issue of failures) {
    console.error(`- ${issue.file}: ${issue.link} (${issue.reason})`);
  }
  process.exit(1);
}

console.log(`Internal link check passed (${filesToScan.length} files scanned).`);
