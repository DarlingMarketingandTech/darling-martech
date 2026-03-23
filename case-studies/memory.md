# Memory — Darling MarTech Case Studies & /work Section
> Location: `C:\dev\darling-martech\case-studies\memory.md`
> Also lives at: `ClaudeOS\Projects\03-Marketing-Content\Website\copy\case-studies\memory.md`
> Last updated: 2026-03-23

---

## Session Summary — 2026-03-23

This session produced the complete content library for the `/work` section of darlingmartech.com.

### What Was Accomplished
- Reviewed, revised, and polished all 19 case study `.md` files using the `darling-website-content` skill
- Built `2026-03-23-work-index.md` — a master index of all 19 projects, categorized, with Cloudinary assets mapped and dev notes
- Used the Cloudinary MCP connector (cloud: `djhqowk67`) to retrieve 445 assets from `studio/projects/` and map them to case studies
- Ran a `grep` voice scan across all 19 files for "we/our/us" — zero violations found
- Built `WORK-IMPLEMENTATION.md` — a full developer spec for Claude Code to implement the `/work` section

---

## The 19 Active Case Studies

All files are in `case-studies/` and are status: **Ready to Publish**.

| File | Slug | Category |
|------|------|----------|
| `2026-03-23-graston-technique.md` | `/work/graston-technique` | Automation |
| `2026-03-23-the-launchpad.md` | `/work/the-launchpad` | Automation (Graston sub) |
| `2026-03-23-the-closer.md` | `/work/the-closer` | Automation (Graston sub) |
| `2026-03-23-the-compass.md` | `/work/the-compass` | Automation (Graston sub) |
| `2026-03-23-the-fortress.md` | `/work/the-fortress` | Automation (Graston sub) |
| `2026-03-23-pike-medical-consultants.md` | `/work/pike-medical-consultants` | Healthcare |
| `2026-03-23-primarycare-indy.md` | `/work/primarycare-indy` | Healthcare (Pike sub) |
| `2026-03-23-urgentcare-indy.md` | `/work/urgentcare-indy` | Healthcare (Pike sub) |
| `2026-03-23-riley-bennett-egloff-full.md` | `/work/riley-bennett-egloff` | Legal |
| `2026-03-23-tuohy-bailey-moore.md` | `/work/tuohy-bailey-moore` | Legal |
| `2026-03-23-black-letter.md` | `/work/black-letter` | Legal / Brand |
| `2026-03-23-317-bbq.md` | `/work/317-bbq` | Hospitality |
| `2026-03-23-hoosier-boy-full.md` | `/work/hoosier-boy-barbershop` | Local Business |
| `2026-03-19-russell-painting.md` | `/work/russell-painting` | Local Business |
| `2026-03-19-behr-pet.md` | `/work/behr-pet-essentials` | E-Commerce |
| `2026-03-23-circle-city-kicks.md` | `/work/circle-city-kicks` | Brand Identity |
| `2026-03-23-clean-aesthetic-full.md` | `/work/clean-aesthetic` | Brand Identity |
| `2026-03-23-perpetual-movement-fitness.md` | `/work/perpetual-movement-fitness` | Brand Identity |
| `2026-03-19-primary-colours.md` | `/work/primary-colours` | Non-Profit |

---

## Parent/Child Relationships

- **Graston Technique** → parent of: The Launchpad, The Closer, The Compass, The Fortress
  - All sub-projects share Cloudinary image: `graston_technique_logo` (folder: `studio/projects`)
  - Implementation: Show Graston as hero card on index with expandable sub-project tags
- **Pike Medical Consultants** → parent of: PrimaryCare Indy, UrgentCare Indy
  - Sub-project pages should show "part of the Pike Medical ecosystem" badge

---

## Cloudinary Asset Map

Cloud name: `djhqowk67`
URL pattern: `https://res.cloudinary.com/djhqowk67/image/upload/v[version]/[public_id].[format]`
Logo anchor naming: `[project-slug]-logo-anchor` — use as primary hero image on index cards.

| Project | Folder | Key Assets |
|---------|--------|------------|
| Graston Technique | `studio/projects` | `graston_technique_logo` |
| Black Letter | `studio/projects` | `Black_Letter_-_Full_Logo` |
| Russell Painting | `studio/projects` | `russell-painting-logo`, `russell-painting-logo2` |
| 317 BBQ | `studio/projects/317bbq` | `GC_Photography_317-81_1`, `DSC_8684`, `Image_from_iOS` |
| Circle City Kicks | `studio/projects/circle-city-kicks` | `cck-logo-anchor`, `Logo_Draft_2`, `Logo_Draft_1` |
| Clean Aesthetic | `studio/projects/clean-aesthetics` | `clean-aesthetics-logo-anchor`, `CA_Logo_-_Secondary_ful_color` |
| Hoosier Boy Barbershop | `studio/projects/hoosierboy-barber-shop` | `hoosierboy-logo-anchor`, `hoosierboy-logo-legacy` |
| Perpetual Movement Fitness | `studio/projects/perpetual-movement-fitness` | `pmf-logo-anchor` |
| PrimaryCare Indy | `studio/projects/primarycare-indy` | `primarycare-logo-anchor`, `Dr._PIke`, `PMC-Dr.-Pike-Xray` |
| Riley Bennett Egloff | `studio/projects/riley-bennett-egloff` | `rbe-logo-anchor`, `attorneys` |
| Tuohy Bailey & Moore | `studio/projects/tuohy-bailey-moore` | `tbm-logo-anchor` |
| UrgentCare Indy | `studio/projects/urgentcare-indy` | `urgentcare-logo-anchor`, `urgentorED3`, `Facebook-When-to-Go-Where` |
| Behr Pet Essentials | `studio/projects/behr-pet-essentials` | `behr-pet-logo-anchor`, `Complete_Solution_Cats`, `summer_sale` |
| Primary Colours | `studio/projects/primary-colours` | `primary-colours-logo-anchor`, `IMG_1911`, `IMG_1884` |

---

## Tech Stack — darlingmartech.com

- **Framework:** Next.js 14 App Router, TypeScript
- **Styling:** CSS Modules + CSS custom properties (not Tailwind for visual work)
- **Images:** `next-cloudinary` (`CldImage`) — cloud: `djhqowk67`
- **Animations:** Framer Motion — use presets from `/lib/motion.ts`
- **UI:** shadcn/ui
- **Data layer:** Static TypeScript files at `/data/work/work-index.ts`
- **Repo:** `C:\dev\darling-martech` (Claude Code has access via Desktop Commander)

### TypeScript Types (from WORK-IMPLEMENTATION.md)
```typescript
interface WorkCard {
  slug: string
  title: string
  label: string
  headline: string
  metrics: string[]
  category: string
  cloudinaryId?: string
}

interface CaseStudy {
  slug: string
  title: string
  label: string
  headline: string
  subhead: string
  metrics: string[]
  challenge: string
  approach: string
  deliverables: Deliverable[]
  process?: ProcessPhase[]
  outcome: string
  whatThisMeansForYou: string
  cloudinaryAssets: CloudinaryAsset[]
}
```

---

## Brand Voice Rules (critical — enforce on every file)

1. **First person singular only** — "I" not "we". Jacob is a solo operator. No exceptions.
2. **No buzzwords** — never: leverage, synergy, holistic, robust, scalable solutions, best-in-class, game-changer, full-service, cutting-edge, tailored solutions, end-to-end
3. **Outcome first** — lead with results, follow with process
4. **Specific always** — every claim needs a number, a named client, or a concrete detail
5. **Metadata block at the top** — title tag, meta description, slug come before the hero, always
6. **CTA at the end** — every page ends with a specific invitation pointing to /contact

---

## Developer Handoff

The `WORK-IMPLEMENTATION.md` file at the repo root (`C:\dev\darling-martech\WORK-IMPLEMENTATION.md`) is the complete developer spec for Claude Code. It contains:
- Full file structure to create
- TypeScript types
- All 19 slugs with Cloudinary publicId references
- Key metrics per card (exact strings)
- Index page layout spec
- Detail page section order
- Graston sub-project cross-linking instructions
- CldImage usage examples
- CSS Module conventions
- Implementation order and Definition of Done checklist

To implement the /work section: drop Claude Code into the repo and say "follow WORK-IMPLEMENTATION.md".

---

## Work Index Reference

The master work index is at: `case-studies/2026-03-23-work-index.md`
It contains all 19 cards with labels, headlines, metrics, slugs, Cloudinary references, and dev notes.

Filter categories for the index page:
- All Work
- Automation & Systems
- Brand Identity
- Healthcare
- Legal & Professional
- Web & SEO
- Strategy & Leadership
