# Tools and Skills Map
Last updated: 2026-03-28

## Purpose
This file tells Claude how to use local context, connectors, and project skills for the Darling MarTech project.

The main goal is to:
- reduce unnecessary tool chaining
- reduce token waste
- keep work grounded in the local repo and project docs
- use the most direct source of truth for each task

---

## Tool Use Hierarchy

Claude should use tools and skills in this order of priority:

1. Local project files
2. Project memory files
3. Project documentation in `/docs`
4. Project-specific skills
5. External connectors only when necessary
6. Live-site or browser-based verification only when explicitly requested

If the answer already exists in the repo, attached docs, or project memory, do not use external connectors.

---

## Primary Working Context

These are the default sources of truth for most tasks.

### Filesystem
Use for:
- reading and editing repo files
- inspecting routes, components, content files, and docs
- understanding the current implementation
- making precise changes with minimal exploration

Do not use external connectors when the local filesystem already contains the needed file.

### Main Darling MarTech repo folder
Use for:
- application routes
- page content
- service architecture
- work and lab structures
- shared UI components
- internal linking patterns
- local content/data sources

This is the primary source of truth for code and most content structure.

### Memory files
Primary memory/context files include:
- `MEMORY.md`
- `project_darling_martech_site_state.md`
- `project_darling_martech_skills.md`

Use for:
- current project status
- known decisions
- active priorities
- continuity across sessions

Do not override these casually without a clear reason.

### Project docs
Use docs such as:
- `CLAUDE.md`
- `docs/repo-map.md`
- `docs/content-architecture.md`
- `docs/editing-rules.md`
- `docs/routes-and-ownership.md`
- `docs/work-lab-taxonomy.md`
- `docs/service-architecture.md`
- `docs/site-state.md`

Use these before inferring architecture from partial code reads or browser inspection.

---

## Connector Policy

External connectors are secondary tools. Use them only when they are necessary for the requested task.

### Vercel
Use for:
- deployment verification
- environment/project checks
- confirming production deployment status
- checking what is live when explicit live verification is requested

Do not use for:
- reconstructing local code that already exists in the repo
- inferring page structure when local route files are available
- repeated recovery attempts if access fails

### Claude in Chrome
Use for:
- explicit live-site verification
- checking rendered page behavior
- validating published content or UI when requested
- confirming what users currently see on the live site

Do not use for:
- reading code that exists locally
- reverse-engineering structure from the browser when repo files are available
- repeated scraping attempts when local context is sufficient

### Notion
Use for:
- project notes or documents that live only in Notion
- strategy references when requested
- pulling planning material not present in the repo

Do not use if the same information already exists locally.

### Supabase
Use for:
- schema, tables, and database-related tasks
- data model review
- backend data checks tied to project implementation

Do not use for general site structure or content work unless the task is directly data-related.

### Cloudinary
Use for:
- media and asset organization
- image delivery/reference workflows
- asset management tasks

Do not use unless the task is specifically about media/assets.

### Gmail
Use for:
- email workflows only if explicitly requested
- outreach or operational email tasks

Do not use for general project work.

### Google Calendar
Use for:
- scheduling tasks only if explicitly requested

### Zapier
Use for:
- automation planning only when the task directly involves integrations or workflow design

Do not use as a fallback research tool.

### Desktop Commander
Use only if needed for local system operations not covered by the standard project file context.

### Windows-MCP
Use only for machine/system-specific tasks if explicitly needed.

### Three.js 3D Viewer
Use only when working on 3D assets or previews.

---

## Connector Restraint Rules

- Do not chain multiple connectors to reconstruct information that already exists locally.
- Do not escalate from one blocked connector to another unless external verification is truly required.
- If a connector fails and local context is available, stop and proceed from local context.
- Do not use live deployment, browser tools, or APIs to infer code when local source files exist.
- Use the most direct tool available and stop once enough context is available.

---

## Project Skills

Use project-specific skills when they directly match the task. Do not invoke multiple overlapping skills unless the task clearly requires it.

### `darling-martech-seo`
Use for:
- service page SEO
- on-page structure
- metadata recommendations
- internal linking strategy
- taxonomy improvements
- GEO/AI-search visibility structure
- FAQ and schema-aware content planning

### `darling-martech-labs`
Use for:
- `/lab` structure
- lab categorization
- linking labs to services
- deciding whether a project belongs in lab, work, or both
- productization signals from experiments

### `darling-martech-data`
Use for:
- analytics architecture
- attribution logic
- reporting structure
- KPI frameworks
- measurement planning
- dashboard/revenue visibility thinking

### `darling-martech-services`
Use for:
- service architecture
- parent/child service design
- packaging and offer design
- landing page intent
- service-page planning
- tying services to target personas and proof

### `darling-martech-copy`
Use for:
- service page copy
- homepage and landing page messaging
- CTAs
- headlines and positioning language
- trust-building copy
- conversion-focused wording

### `darling-website-content`
Use for:
- website page outlines
- content planning
- content hierarchy
- service/supporting page structures
- editorial planning

### `darling-martech-ui`
Use for:
- site interface recommendations
- layout decisions
- hierarchy and clarity improvements
- section structure
- visual organization tied to conversion and clarity

### `workspace-organizer`
Use for:
- cleanup recommendations
- file/folder organization
- reducing repo clutter
- improving working structure

### `file-organizer`
Use for:
- naming, grouping, and classification tasks
- reorganizing content or asset structures

### `industrial-brutalist-ui`
Use only when specifically relevant to a desired aesthetic or interface exploration.

### `name-frontend-design`
Use only when working on naming or front-end design concepts directly related to the project.

---

## Default Behavior by Task Type

### For code edits
Use:
1. local repo files
2. relevant docs
3. relevant project skill if needed

Do not start with Vercel or Chrome.

### For content strategy
Use:
1. project docs
2. memory files
3. service/copy/content skills

### For service architecture
Use:
1. service docs
2. taxonomy docs
3. `darling-martech-services`
4. `darling-martech-seo` when needed

### For `/work` and `/lab` mapping
Use:
1. taxonomy docs
2. local content/data files
3. `darling-martech-labs`
4. `darling-martech-services`

### For live verification
Use:
- Vercel or Claude in Chrome only if the user explicitly asks for current live-state confirmation

---

## Operating Rule Summary

- Local repo first
- Docs and memory second
- Skills third
- Connectors only when necessary
- Live verification only when explicitly requested
- Smallest effective action
- No unnecessary retries
- No multi-tool reconstruction when local truth exists

---

## Repo-Verified Addendum (Current)

### Current local skills found in `skills/`
- `darling-martech-copy`
- `darling-martech-data`
- `darling-martech-labs`
- `darling-martech-redesign`
- `darling-martech-seo`
- `darling-martech-services`
- `darling-martech-ui`

### Current docs present under `docs/`
- `docs/REPO-OPTIMIZATION-PLAN.md`
- `docs/context/README.md`
- `docs/context/project/*`
- `docs/context/strategy/*`
- `docs/context/repo/*`
- `docs/archive/outputs/marketing-strategy-service.md`
- `docs/archive/plans/*`
- `docs/superpowers/plans/*`
- `docs/superpowers/specs/*`

### Deployment context
- Active project host: Vercel
- Project URL: `https://vercel.com/darling-mar-tech/darling-martech`
- Live domain: `https://darling-martech.vercel.app/`

If any skill/doc listed above is renamed, added, or removed, update this file in the same change.
