#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function extractQuotedValues(input) {
  return Array.from(input.matchAll(/['\"]([a-z0-9-]+)['\"]/g)).map((m) => m[1]);
}

function extractArrayValues(content, fieldName) {
  const regex = new RegExp(`${fieldName}\\s*:\\s*\\[([\\s\\S]*?)\\]`, "g");
  const values = [];
  for (const match of content.matchAll(regex)) {
    values.push(...extractQuotedValues(match[1]));
  }
  return values;
}

const servicesContent = read("data/services.ts");
const workIndexContent = read("data/work/work-index.ts");
const nextConfigContent = read("next.config.js");

const rawServiceIds = Array.from(servicesContent.matchAll(/\bid\s*:\s*['\"]([a-z0-9-]+)['\"]/g)).map((m) => m[1]);
const nonPageServiceIds = new Set(["audit", "project", "embedded"]);
const serviceIds = new Set(rawServiceIds.filter((id) => !nonPageServiceIds.has(id)));

const workSlugs = new Set(
  Array.from(workIndexContent.matchAll(/slug\s*:\s*['\"]([a-z0-9-]+)['\"]/g)).map((m) => m[1]),
);

const proofWorkSlugs = extractArrayValues(servicesContent, "proofWorkSlugs");
const childServiceSlugs = extractArrayValues(servicesContent, "childServiceSlugs");
const relatedServiceSlugs = extractArrayValues(servicesContent, "relatedServiceSlugs");

const primaryServicePageSlugs = Array.from(
  workIndexContent.matchAll(/primaryServicePageSlug\s*:\s*['\"]([a-z0-9-]+)['\"]/g),
).map((m) => m[1]);

const failures = [];

for (const slug of proofWorkSlugs) {
  if (!workSlugs.has(slug)) {
    failures.push(`Unknown work slug in proofWorkSlugs: ${slug}`);
  }
}

for (const slug of childServiceSlugs) {
  if (!serviceIds.has(slug)) {
    failures.push(`Unknown service slug in childServiceSlugs: ${slug}`);
  }
}

for (const slug of relatedServiceSlugs) {
  if (!serviceIds.has(slug)) {
    failures.push(`Unknown service slug in relatedServiceSlugs: ${slug}`);
  }
}

for (const slug of primaryServicePageSlugs) {
  if (!serviceIds.has(slug)) {
    failures.push(`Unknown service slug in work-index primaryServicePageSlug: ${slug}`);
  }
}

const redirectSources = new Set(
  Array.from(nextConfigContent.matchAll(/source\s*:\s*['\"]([^'\"]+)['\"]/g)).map((m) => m[1]),
);

const requiredLegacyRedirects = [
  "/lab",
  "/lab/cmo-simulator",
  "/lab/geo-readiness-auditor",
  "/lab/cmo-roadmap-generator",
  "/lab/pro-dj-studio",
  "/lab/strum-ai",
  "/lab/graston-growth-engine",
  "/lab/barbershop-command-center",
  "/lab/clinical-compass",
  "/lab/smart-sales-pricing",
  "/lab/investment-roi-planner",
  "/lab/license-requirements",
  "/tools/graston-growth-engine",
];

for (const route of requiredLegacyRedirects) {
  if (!redirectSources.has(route)) {
    failures.push(`Missing legacy redirect source in next.config.js: ${route}`);
  }
}

if (failures.length > 0) {
  console.error("Content graph integrity check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content graph integrity check passed.");
console.log(`- Service slugs tracked: ${serviceIds.size}`);
console.log(`- Work slugs tracked: ${workSlugs.size}`);
console.log(`- proofWorkSlugs checked: ${proofWorkSlugs.length}`);
console.log(`- childServiceSlugs checked: ${childServiceSlugs.length}`);
console.log(`- relatedServiceSlugs checked: ${relatedServiceSlugs.length}`);
console.log(`- primaryServicePageSlug checked: ${primaryServicePageSlugs.length}`);
console.log(`- Legacy redirects checked: ${requiredLegacyRedirects.length}`);
