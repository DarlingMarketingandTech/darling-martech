#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const scanRoots = ["app", "components", "data", "hooks", "lib"];
const sourceExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

const bannedPatterns = [
  { regex: /from\s+['\"]lucide-react['\"]/g, label: "lucide-react" },
  { regex: /from\s+['\"]feather-icons['\"]/g, label: "feather-icons" },
  { regex: /from\s+['\"]@heroicons\//g, label: "@heroicons/*" },
  { regex: /from\s+['\"]react-icons\/fi/g, label: "react-icons/fi*" },
  { regex: /require\(\s*['\"]lucide-react['\"]\s*\)/g, label: "lucide-react (require)" },
];

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

const files = [];
for (const root of scanRoots) {
  const rootPath = path.join(repoRoot, root);
  if (exists(rootPath)) {
    walkFiles(rootPath, files);
  }
}

const violations = [];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");
  for (const pattern of bannedPatterns) {
    if (pattern.regex.test(content)) {
      violations.push({ file: toRelative(filePath), pattern: pattern.label });
    }
  }
}

if (violations.length > 0) {
  console.error("Banned import usage detected:");
  for (const violation of violations) {
    console.error(`- ${violation.file}: ${violation.pattern}`);
  }
  process.exit(1);
}

console.log(`Banned import check passed (${files.length} files scanned).`);
