#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const appDir = path.join(repoRoot, "app");

function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, acc);
      continue;
    }
    if (entry.isFile() && entry.name === "page.tsx") {
      acc.push(fullPath);
    }
  }
  return acc;
}

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, "/");
}

const pageFiles = walk(appDir);
const missingMetadata = [];

for (const filePath of pageFiles) {
  const content = fs.readFileSync(filePath, "utf8");
  const hasMetadataExport =
    /export\s+const\s+metadata\s*(?::\s*[^=]+)?\s*=/.test(content) ||
    /export\s+(async\s+)?function\s+generateMetadata\s*\(/.test(content);

  if (!hasMetadataExport) {
    missingMetadata.push(toRelative(filePath));
  }
}

if (missingMetadata.length > 0) {
  console.error("Missing metadata export on page routes:");
  for (const file of missingMetadata) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log(`Metadata check passed (${pageFiles.length} page routes).`);
