# Darling MarTech

Marketing systems portfolio and lead-generation site for Jacob Darling, built with Next.js App Router. The project combines brand storytelling, case studies, interactive lab tools, studio work, and conversion-focused contact flows in one codebase.

- Domain: `darlingmartech.com`
- Primary brand: Darling MarTech / Marketing and Technology LLC
- Location focus: Indianapolis, Indiana
- Contact: `jacob@jacobdarling.com`

## Current Site Surface

### Core pages

- `/` home page with Hero, Services, About teaser, Featured Tool, case study rail, testimonial spotlight, and contact CTA
- `/about` long-form bio page with industry tags, credentials, and career timeline
- `/services` services experience page
- `/work` case study index
- `/work/[slug]` individual case study pages
- `/lab` lab index with category filtering, 3D telemetry panel, and featured CMO Simulator
- `/lab/[slug]` dynamic lab detail pages for supported tools
- `/lab/cmo-simulator` dedicated simulator experience
- `/studio` Cloudinary-powered visual archive
- `/contact` contact form page

### API routes

- `/api/contact` sends form submissions through Resend
- `/api/studio/images` fetches Cloudinary assets for the studio gallery
- `/api/cmo-simulator-access` handles simulator access workflow

## Recent Updates

- Rebuilt the testimonial section into a reusable branded spotlight module with Framer Motion, full recommendation data, animated quote transitions, and a selectable testimonial rail
- Added structured testimonial data in `data/testimonials.ts` so the same credibility block can be reused across multiple pages
- Added dynamic lab detail pages in `/lab/[slug]` backed by `data/labs.ts`
- Expanded the about page with the career timeline section
- Added the featured tool section and stronger home-page case study presentation
- Connected studio gallery content to Cloudinary search via a server route

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| Language | TypeScript 5.9 |
| UI styling | CSS Modules + CSS custom properties |
| Motion | Framer Motion |
| 3D | `@react-three/fiber`, `@react-three/drei`, `three` |
| Smooth scroll | Lenis |
| Additional animation | GSAP |
| Forms | React Hook Form + Zod |
| Email delivery | Resend |
| Images | Next Image + next-cloudinary |
| Icons | Phosphor Icons + Lucide |
| UI primitives | Radix + shadcn-style components |

## Brand System

Primary tokens live in [app/globals.css](./app/globals.css).

```css
--color-base: #0A0A0A;
--color-surface: #141414;
--color-surface-raised: #1A1A1A;
--color-accent: #FF4D00;
--color-text: #F5F0E8;
--color-muted: #888888;
--color-border: rgba(245, 240, 232, 0.08);
--color-border-accent: rgba(255, 77, 0, 0.3);
```

Typography:

- Display: Cabinet Grotesk
- Body: Inter
- Accent/editorial: Instrument Serif

## Project Structure

```text
app/
  about/
  contact/
  lab/
    [slug]/
    cmo-simulator/
  services/
  studio/
  work/
    [slug]/
  api/
    cmo-simulator-access/
    contact/
    studio/images/
components/
  3d/
  interactive/
  lab/
  layout/
  motion/
  providers/
  sections/
  ui/
data/
  labs.ts
  services.ts
  testimonials.ts
  work/
lib/
  analytics.ts
  cloudinary.ts
  motion.ts
public/
  fonts/
  labs/
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Environment Variables

Create `.env.local` with the values you actually use in your environment:

```env
RESEND_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_GA_ID=
```

Notes:

- `RESEND_API_KEY` is required for the contact form
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is used for image URLs and Cloudinary loaders
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are required for `/api/studio/images`
- `NEXT_PUBLIC_GA_ID` is optional; analytics no-op when absent

## Content and Data Sources

- Case studies are driven from `data/work/` plus supporting content in `case-studies/`
- Reusable lab detail content lives in `data/labs.ts`
- Testimonials live in `data/testimonials.ts`
- Studio image inventory is pulled from Cloudinary folder searches
- Brand and site guidance also exists in `CLAUDE.md` and project docs under `docs/superpowers/`

## Implementation Notes

- The app uses CSS Modules as the primary styling system; Tailwind remains in the project for base layers and limited utility usage
- Motion patterns are centralized in `lib/motion.ts`
- 3D experiences should stay client-only and be loaded with `dynamic(..., { ssr: false })`
- Contact handling runs through an Edge route; Cloudinary admin access runs on the Node runtime route

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Known Repo Notes

- `npm run lint` may report unrelated existing issues in generated `.next` output or untouched files; use targeted linting on changed source files when validating focused work
- The repository may contain local workspace and tool metadata that is not part of the site surface
