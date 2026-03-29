---
name: darling-martech-homepage
description: Homepage strategy and section-role rules for Darling MarTech. Use when editing app/page.tsx, homepage sections, homepage copy, or deciding whether to add/remove homepage sections.
---

# Darling MarTech — Homepage Skill

## Purpose
Use this skill to keep homepage work aligned with the site architecture.

The homepage should:
- orient the right buyer fast
- frame the problem clearly
- explain the strategy + systems model
- show where proof lives
- route users to the right next step

The homepage should not:
- explain every service in detail
- repeat the founder story in multiple sections
- recreate the removed homepage About teaser in another form
- lead with jargon

## Use this skill when
- editing `app/page.tsx`
- editing `components/sections/Hero.tsx`
- editing `components/sections/Services.tsx`
- editing homepage proof / testimonial / CTA sections
- rewriting homepage copy
- deciding whether to add, remove, or combine homepage sections

## Read first
- `CLAUDE.md`
- `docs/context/project/service-pages/homepage-copy-deck.md`
- `docs/context/project/service-pages/homepage-hero-and-services-alignment.md`
- `docs/context/project/service-pages/homepage-services-content-map.md`
- `docs/context/project/service-pages/proof-snippet-library.md`

## Hard rules
1. The homepage section sequence is:
   - Hero
   - Services
   - FeaturedTool
   - CaseStudies
   - Testimonials
   - ContactCTA
2. The hero carries the primary positioning load.
3. Do not recreate the removed homepage About teaser in another form.
4. The services section is a problem-cluster bridge, not a mini `/services` page.
5. Homepage language should use Layer 1 and some Layer 2 only.
6. Do not lead the homepage with technical specialist language.
7. Keep hero text left-aligned and commercially legible.
8. Do not add a new homepage section without removing or replacing one.

## Priorities
- buyer clarity in under 30 seconds
- distinct section roles
- fewer repeated founder-positioning messages
- stronger hero framing
- clean CTA routing

## CTA rules
- Hero primary CTA: usually `/work`
- Hero secondary CTA: usually `/contact?intent=unsure`
- Services section: route to `/services`
- Featured tool: route to `/tools`
- Final contact CTA: usually `/contact?intent=unsure`

Do not use `/contact?intent=service` as the default homepage CTA.

## Anti-patterns
Avoid:
- rebuilding the homepage around founder biography
- using the services section to explain full child-service scope
- stacking multiple competing CTAs in one section
- repeating the same promise in hero + another section
- using jargon before the buyer problem is stated

## Expected outputs
Good homepage work should produce:
- a stronger, clearer hero
- cleaner section roles
- tighter services framing
- fewer redundant blocks
- routing that points users toward `/services`, `/work`, `/tools`, or `/contact` appropriately

## Runtime drift check
Before any homepage work, inspect `app/page.tsx`.
If `<AboutTeaser />` is still present, flag it and remove it if the task is a homepage refinement pass.

## Reminder
The homepage orients.
It does not replace `/services`, `/work`, or `/about`.