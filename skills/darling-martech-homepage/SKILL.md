---
name: darling-martech-homepage
description: >
  Homepage strategy, section roles, copy rules, and CTA routing for
  Darling MarTech. Use whenever editing app/page.tsx, any homepage section
  component (Hero, Services, CaseStudies, ContactCTA, FeaturedTool,
  Testimonials, AboutTeaser), writing homepage copy, or deciding whether to
  add or remove a homepage section. Also triggers when the user says "update
  the hero", "rewrite the services section", "add a homepage section",
  "the homepage feels off", "improve the homepage flow", or asks anything
  about homepage copy, structure, or section roles.
---

# Darling MarTech — Homepage Skill

## Before any homepage work

Check `app/page.tsx` for the current section order and component list.

**Active drift risk:** `<AboutTeaser />` is imported and rendered in `app/page.tsx` but was removed from the content strategy. If you see it, flag it to the user — the strategy says it should not be there. Do not add content to it, expand it, or recreate its job in another section.

The strategic section sequence is:
```
Hero → Services → FeaturedTool → CaseStudies → Testimonials → ContactCTA
```

---

## Section roles

Each section has exactly one job. If a section is trying to do two jobs, trim or split it.

| Section | Job | Routes to |
|---|---|---|
| Hero | Identify buyer + frame problem + explain model + first CTA | `/work` or `/contact?intent=unsure` |
| Services | Frame 4 problem clusters in buyer language | `/services` |
| FeaturedTool | Give unsure visitors immediate value without pushing to contact | `/tools` |
| CaseStudies | Show curated evidence — not every project, not an index | `/work` |
| Testimonials | External validation — working style and trust | `/contact` or `/work` |
| ContactCTA | One calm final invitation | `/contact?intent=unsure` |

---

## Hero rules

The hero carries the full positioning load. No other section should repeat the founder story.

The hero must answer:
1. Who this is for
2. What is broken
3. What Darling MarTech fixes
4. Why the strategy + systems model is different
5. What the best next step is

**Keep:** founder-led strategic + technical differentiator, calm premium tone, strong left-aligned hierarchy, buyer-problem framing.

**Reduce:** repetitive founder-story language, resume-like framing, vague high-context wording cold visitors have to decode.

**H1 direction** — combine buyer problem + model differentiator. Not a tagline. Not a job title.

Good directions:
- "Strategy, systems, and execution — in one accountable lead."
- "When growth, websites, CRM, and reporting are disconnected, everything gets harder."

**CTAs:**
- Primary: `See the work` → `/work`
- Secondary: `Request a consultation` → `/contact?intent=unsure`

---

## Services section rules

The services section translates the hero promise into recognizable problem clusters. It is not a mini-version of `/services`.

Each cluster card should:
- start with the business problem, not the service name
- keep copy short — 2–3 lines maximum
- route to `/services` (not directly to a child-service page)

Cluster framing:

| Cluster | Lead with this problem |
|---|---|
| Strategy & Leadership | No senior owner of the whole system |
| Websites, UX & Brand | The site underperforms or trust is weak |
| CRM, Automation & AI | Leads and follow-up are messy |
| Growth, SEO & Demand | Visibility and demand are too weak |

Do not explain deliverables here. That belongs on child-service pages.

---

## Language layer rule

The homepage uses Layer 1 + some Layer 2 only.

- **Layer 1 (use first):** plain buyer language — what is broken, why it matters
- **Layer 2 (use sparingly):** translator language — how the work connects strategy, systems, execution
- **Layer 3 (never on homepage):** specialist terms — CRM architecture, lifecycle automation, attribution cleanup

---

## CTA intent routing

| Homepage CTA | Route |
|---|---|
| Hero primary | `/work` |
| Hero secondary | `/contact?intent=unsure` |
| Services cards | `/services` |
| FeaturedTool | `/tools` |
| CaseStudies | `/work` |
| ContactCTA | `/contact?intent=unsure` |

Do not use `/contact?intent=service` on the homepage — that intent belongs on service pages where the buyer has already self-identified.

---

## Hard rules

1. The hero carries the positioning load. No other section repeats the founder story.
2. `<AboutTeaser />` is a drift artifact. Flag it; do not expand or recreate it.
3. The services section clusters problems — it does not replace `/services`.
4. Never stack multiple CTAs in the same section.
5. Never add a new section without a clear single-job justification.
6. Never use service jargon before the buyer problem is stated.
7. Hero text is always left-aligned, never centered.
8. Never make the homepage a substitute for `/services` or any child-service page.

---

## Anti-patterns

- Recreating the About teaser under a different name or in a renamed section
- Making the services cards explain deliverables (that belongs on child pages)
- Adding a new "why Jacob" section when the hero already does that job
- Adding CTAs to every section — intentional CTA scarcity is correct
- Centering hero copy (design rule violation)
- Using internal service labels before the problem is stated

---

## Source docs

Read these before making any homepage changes:
- `docs/context/project/service-pages/homepage-copy-deck.md`
- `docs/context/project/service-pages/homepage-hero-and-services-alignment.md`
- `docs/context/project/service-pages/homepage-services-content-map.md`
- `docs/context/project/service-pages/proof-snippet-library.md` (for proof section copy)
