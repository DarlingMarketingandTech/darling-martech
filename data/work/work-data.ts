import type { CaseStudy } from '@/lib/work'
import { resolveWorkSlug } from '@/lib/work'
import { workIndex } from './work-index'

const workData: CaseStudy[] = [
  // ── 317 BBQ ────────────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === '317-bbq')!,
    titleTag: '317 BBQ — Restaurant Rebrand, Visual Storytelling & Website Redesign | Darling MarTech',
    metaDescription:
      'How a menu-first website redesign and on-site photography shoot doubled catering inquiries, grew order conversions 40%, and boosted time-on-site 120% for a Broad Ripple BBQ spot.',
    subhead:
      '317 BBQ had the food, the atmosphere, and the local identity. Their website had none of it. I rebuilt the digital experience around one insight: people eat with their eyes first, and the site wasn\'t feeding them anything.',
    challenge:
      'For restaurants, the decision to visit often gets made before anyone smells the food. Someone searches, lands on a site, scrolls for about ten seconds, and makes a call: is this worth my time and money? If the visuals are weak, if the menu is buried, if it doesn\'t feel like a place they want to be — they\'re already gone.\n\n317 BBQ is a Broad Ripple restaurant with real identity. The food is genuine, the atmosphere is local, and the "Proudly Indiana" personality isn\'t a marketing line — it\'s built into how they operate. The problem was that none of that translated online. The site was failing the product. Weak visuals were muting the food. The menu took work to find. Catering — a significant revenue stream — was practically invisible. And mobile visitors, who make up the majority of restaurant traffic, were landing on an experience that wasn\'t built for them.\n\nThe brief was clear: make the digital experience match the real one. Stop selling the restaurant with words that don\'t convert and start selling it with the thing that actually does — the food itself, shown at its best, placed exactly where a hungry person\'s eye goes first.',
    approach:
      'The strategic insight here was that a restaurant website has one job: create appetite and remove friction between that appetite and an action. Order now. Book catering. Come in tonight. Every second a visitor spends navigating, hunting for the menu, or trying to figure out if the food looks good is a second they\'re reconsidering.\n\nI approached this as a visual sales problem before a design problem. The site needed to lead with food — not a brand statement, not a mission paragraph, not a generic carousel — food. Real food, shot well, surfaced immediately, paired with the simplest possible path to ordering or inquiring.\n\nThat meant the project couldn\'t start with a website brief. It had to start with a camera. The photography and video shoot wasn\'t a nice add-on to the website redesign — it was the foundation. Without owning the visual assets, there was no story to tell. I planned the shoot to capture not just the dishes but the textures, the smoke, the atmosphere, and the moments that make 317 BBQ feel like a place worth leaving the house for.',
    deliverables: [
      {
        title: 'On-Site Photography & Video',
        description:
          'I planned and executed an on-site shoot designed to capture the full sensory range of the 317 BBQ experience: close-range food photography showing texture, glaze, and smoke, atmosphere photography showing the space and energy of the room, and video content capturing the preparation, ambiance, and personality of the brand. Photography directed for appetite appeal — smoke, bark, glaze, color — not just composition.',
      },
      {
        title: 'Brand Identity',
        description:
          'I built a visual identity around 317 BBQ\'s existing personality: bold, rustic-yet-refined, authentically Indiana. The mark and brand system used classic BBQ visual cues modernized with contemporary typography and a visual weight that works at every scale — from a website header to a takeout bag.',
      },
      {
        title: 'Menu-First Website Redesign',
        description:
          'The homepage was rebuilt around a single strategic priority: get to the food fast. Signature dishes — pork belly burnt ends, smoked wings, brisket, ribs, deviled eggs, local Amish chicken — are surfaced in the first scroll, each with photography and direct order calls to action. Multiple "Order Now" CTAs route directly into Toast for pickup ordering.',
      },
      {
        title: 'Catering & Private Events Pathway',
        description:
          'Catering was an underperforming revenue stream not because demand was low — it was because the site buried it. I built a dedicated catering section structured around event intent rather than marketing copy: buffet service details, meat-by-the-pound options, side information, and a clear catering-request flow. Catering inquiries doubled after launch.',
      },
      {
        title: 'Mobile-First Conversion Design',
        description:
          'Restaurant traffic is overwhelmingly mobile. I rebuilt the layout for mobile-first usability: fast load times, legible text, thumb-friendly navigation, and a clear order path that didn\'t require pinching or hunting.',
      },
      {
        title: 'Local Identity & Operational Clarity',
        description:
          'The "Proudly Indiana" positioning was already there. I made it visible. Local identity signals — the Broad Ripple address, Indiana references, community messaging — were built into the site. Hours, phone, and directions were surfaced where they needed to be.',
      },
    ],
    process: [
      { label: 'Week 1', description: 'Discovery and planning — understanding the restaurant\'s vision, customer base, revenue priorities, and visual direction.' },
      { label: 'Week 2', description: 'Design and content planning — site architecture, copy structure, visual layout before the shoot.' },
      { label: 'Week 3', description: 'On-site photography and video shoot — food, atmosphere, brand.' },
      { label: 'Weeks 4–5', description: 'Development and integration — WordPress build, Toast integration, mobile optimization, QA.' },
      { label: 'Week 6', description: 'Launch + three months of post-launch support included.' },
    ],
    outcome:
      'The behavioral shifts told the story before the revenue numbers did. Time on site grew 120% — people were actually exploring the site rather than bouncing. Menu page visits climbed 85%. Order conversions improved 40%. Catering inquiries doubled. Web traffic rose 30% overall. Within the first 90 days, sales had grown 20%.\n\nWhat those numbers prove is that the problem was never the food. The food was always good. The problem was that the site was failing to communicate it — and that failure had a direct cost in unconverted visitors, unmade orders, and catering opportunities that never came in.',
    whatThisMeansForYou:
      'If your restaurant has a strong product but a weak digital presence, you\'re not losing customers because the food isn\'t good enough. You\'re losing them because the screen isn\'t doing what the plate does in person. That\'s a solvable problem. That\'s what I build.',
    ctaLine: 'make your food as irresistible online as it is in person',
    cloudinaryAssets: [
      { publicId: 'GC_Photography_317-81_1', label: '317 BBQ photography', folder: 'studio/projects/317bbq' },
      { publicId: 'DSC_8684', label: '317 BBQ food photography', folder: 'studio/projects/317bbq' },
    ],
  },

  // ── Black Letter ───────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'black-letter')!,
    titleTag: 'Black Letter — Legal Consultant Agency Brand Identity | Darling MarTech',
    metaDescription:
      'How a concept-driven monogram identity built around the meaning of "black-letter law" gave a legal advisory brand authority, distinction, and a visual system that scales across every professional touchpoint.',
    subhead:
      'Black Letter needed to feel intellectually credible, premium, and immediately distinct from every generic navy-blue professional services firm in the market. The name was the answer — and the identity was built around it.',
    challenge:
      'Legal consultant and advisory brands have a harder branding problem than law firms. Law firms can lean on recognizable category signals — the name structure, the letterhead, the client list. A legal consultant or advisory practice exists in a more ambiguous space. It needs to feel credible enough to sit alongside the law firms its clients are also working with, while clearly communicating a different kind of value: strategic advisory, not just legal execution.\n\nThe visual identity usually makes or breaks that positioning before a word is read. Generic navy-blue professional services branding disappears into the sea of competitors who all look equally serious and equally forgettable. Over-designed brands that reach for "premium" through ornament lose the gravitas the category requires. The mark has to do something harder: communicate authority through restraint.\n\nBlack Letter came to this project with an unusual asset: a name that already carried meaning. In legal language, "black-letter law" refers to well-established principles — the foundational rules that are broadly settled and not in dispute. The phrase evokes tradition, authority, written structure, and clarity. It was already a positioning statement.',
    approach:
      'The strategic move was to lean into the conceptual richness of the name rather than treat it as incidental. If "Black Letter" already evokes typographic tradition and legal doctrine, then the most coherent visual approach was an identity rooted in those same qualities: classical letterform construction, editorial refinement, and the kind of form-based credibility that comes from getting typographic decisions exactly right.\n\nThat ruled out the obvious approaches — no scales, no gavels, no courthouse columns. Legal-adjacent brands that rely on those symbols communicate category but not distinction. A mark that builds credibility through form, not symbol, is more intelligent and more ownable. It signals that the practice thinks carefully about craft — which is exactly the signal a legal advisory brand needs to send.\n\nThe result needed to feel like it had existed for decades while being visually sharp enough to work in a contemporary digital environment. Classic but not old. Premium but not flashy. Authoritative but not inaccessible.',
    deliverables: [
      {
        title: 'Naming Validation & Brand Brief',
        description:
          'While the name arrived with the project, the brief began with validation: why does "Black Letter" work, what does it mean to the target audience, and how does that meaning shape every subsequent design decision? Developed the brand brief around three pillars — authority, precision, and premium professionalism.',
      },
      {
        title: 'BL Monogram Mark',
        description:
          'Built the primary identity around an interlocking B and L monogram with a refined serif construction — rooted in classical typography, with a subtle calligraphic sweep that introduces sophistication without becoming ornate. An orange accent woven into the letterform structure provides controlled distinction: confident, modern, and immediately differentiating against the all-black professional services landscape.',
      },
      {
        title: 'Color Palette',
        description:
          'Black as the dominant tone: authority, permanence, weight. Vivid orange as the accent: confidence, distinction, energy. Used with precision, this combination positions the brand as established and forward rather than conservative and static. The palette holds across print, digital, and environmental applications.',
      },
      {
        title: 'Typography System',
        description:
          'High-contrast serif forms in the mark balanced with a cleaner, more restrained wordmark treatment — sophistication and usability in the same system. Typography specified for headline, body, and detail use across all client-facing contexts: proposals, pitch decks, reports, correspondence, and digital channels.',
      },
      {
        title: 'Brand Guidelines & Application Suite',
        description:
          'Full guidelines document covering logo usage and clear space rules, color system with print and digital values, typography hierarchy, and application examples across the surfaces a legal advisory brand inhabits: website header, proposals and pitch decks, letterhead and business cards, presentation materials, email signature, and social profiles.',
      },
    ],
    outcome:
      'Black Letter launched with a visual identity that did the work the name set up: authoritative, refined, and distinct from every generic competitor in the professional services space. The monogram was memorable enough to function as a standalone mark — on a business card, an email signature, a website favicon — while the full system held authority across multi-page proposals and presentation decks.\n\nThe strongest outcome wasn\'t a specific metric — it was positioning. The identity gave Black Letter a credible answer to the question every new client is implicitly asking before they engage: do these people think carefully? The mark, the color, the typographic precision — every element said yes.',
    whatThisMeansForYou:
      'If your advisory practice, consulting firm, or professional services brand looks like everyone else in your category, you\'re not just a branding problem — you\'re a business development problem. The solution is an identity that does the positioning work before the first conversation. That\'s what I build.',
    ctaLine: 'build a brand that communicates your expertise before you say a word',
    cloudinaryAssets: [
      { publicId: 'Black_Letter_-_Full_Logo', label: 'Black Letter logo', folder: 'studio/projects' },
    ],
  },

  // ── Circle City Kicks ──────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'circle-city-kicks')!,
    titleTag: 'Circle City Kicks — Sneaker Brand Identity Rooted in Indianapolis Street Culture | Darling MarTech',
    metaDescription:
      'How a circular badge mark with a suspended sneaker and Indianapolis skyline gave a local sneaker buy/sell/trade brand a visual identity that could compete with faceless online marketplaces.',
    subhead:
      'Circle City Kicks needed to stand out in a market where most competitors are nameless digital storefronts. The answer was the opposite of generic: a badge mark built from the city\'s own identity, with the kind of local specificity no national marketplace can fake.',
    challenge:
      'Sneaker resale is a crowded space that cuts in two directions at once. At the top, you have StockX and GOAT — faceless, transactional, national. At the bottom, you have Instagram DMs and local Facebook groups — scrappy, trust-dependent, no visual identity at all. In the middle, there\'s an opportunity that almost nobody is building toward: the trusted local authenticator with real community presence and a brand worth wearing.\n\nCircle City Kicks was positioned for that middle lane. A buy/sell/trade concept tied to Indianapolis — a city with a genuine sneaker culture, a recognizable name, and an underused cultural identity. The opportunity wasn\'t to compete with StockX on scale. It was to be the thing StockX will never be: local, human, and recognizable in a specific place.\n\nThe design problem was how to put that positioning into a mark. Logo design for streetwear and sneaker brands is easy to get wrong in two directions: too generic (clippers, shoes, swoosh derivatives) or too try-hard (over-detailed illustrative marks that don\'t scale).',
    approach:
      'The name "Circle City" did most of the strategic work before a single line was drawn. Circle City is one of Indianapolis\'s most durable nicknames — tied to Monument Circle, the city\'s iconic central roundabout, and the distinctive radial street plan that makes Indianapolis geographically unlike most American cities.\n\nThat gave the mark a built-in structure: circular. A badge format that reinforced the city reference while also creating the contained, emblem-quality shape that streetwear and sneaker brands use for stickers, apparel patches, and packaging. The circle wasn\'t just a shape — it was a concept.\n\nInside that structure, the layering problem was how to make the mark feel multi-dimensional without becoming cluttered. The solution was to treat the sneaker as a display object — not a product icon, but a collectible, the way serious collectors think about their best pairs. Suspended centrally against a skyline silhouette, the shoe became the hero rather than an attribute.',
    deliverables: [
      {
        title: 'Logo Mark & Badge System',
        description:
          'Built the primary mark around a circular badge structure containing three layered elements: an Indianapolis skyline silhouette establishing geographic identity, a centrally suspended sneaker treated as a collectible object rather than a product symbol, and bold stacked wordmark typography that reads as street-culture athletic rather than corporate retail.',
      },
      {
        title: 'Color & Typography',
        description:
          'A red and black palette with white — high contrast, urban, energetic. The combination reads as streetwear-native without mimicking any specific brand. Bold athletic block lettering in the wordmark reinforced the visual energy while keeping the mark legible at every scale.',
      },
      {
        title: 'Versatility & Application',
        description:
          'Designed the mark system from the start for every surface Circle City Kicks would need to show up on: social avatars, Instagram stories, stickers, apparel graphics, resale packaging, event signage, and marketplace imagery. A brand in this space lives and dies on social media and on the product itself.',
      },
    ],
    outcome:
      'Circle City Kicks launched with a visual identity that positioned it as a local culture brand rather than a generic resale account. The badge mark gave the concept an ownable visual asset that national platforms can\'t replicate — a mark that\'s specific to a place, specific to a city, and specific to the people who call themselves Hoosiers.\n\nWhat this project proved is that the local specificity most brands try to add after the fact is most powerful when it\'s embedded in the core identity logic from day one. "Circle City" wasn\'t just a name applied to a logo. It became the structural idea that shaped everything — the badge format, the city reference, the community positioning.',
    whatThisMeansForYou:
      'If your brand is trying to compete in a space dominated by faceless national players, the most powerful move is usually the opposite of what those players are doing — be specific, be local, be human. That\'s what I build.',
    ctaLine: 'build a brand your market actually claims as its own',
    cloudinaryAssets: [
      { publicId: 'cck-logo-anchor', label: 'Circle City Kicks logo', folder: 'studio/projects/circle-city-kicks' },
    ],
  },

  // ── Clean Aesthetic ────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'clean-aesthetic')!,
    titleTag: 'Clean Aesthetic — Medical Aesthetics Brand Identity & Launch Strategy | Darling MarTech',
    metaDescription:
      'How a monogram-based identity system and restrained visual language launched a concierge Botox practice with a brand that communicates both clinical credibility and premium luxury.',
    subhead:
      'Medical aesthetics branding fails in one of two directions: too sterile or too promotional. Clean Aesthetic needed to sit exactly in the middle — premium enough to justify concierge pricing, credible enough to earn clinical trust. I built that from the name up.',
    challenge:
      'Medical aesthetics is a category where brand does most of the selling before a patient ever walks in. Someone considering Botox or filler isn\'t just choosing a treatment — they\'re choosing a provider they trust with their face. That\'s an extremely high-stakes decision, and the brand is the first signal they\'re evaluating.\n\nThe failure modes are well-established. Brands that lean too hard into luxury aesthetics look cosmetic-heavy and medically lightweight — which raises alarm bells for a clinically-minded patient. Brands that lean too hard into healthcare neutrality feel indistinct and impersonal — which isn\'t what someone is looking for when they\'re choosing concierge care.\n\nThis client was launching a concierge Botox practice and had everything needed clinically: the training, the credentials, the space, and the provider experience. The brief was to build a brand that could command premium positioning from day one, before a single review was collected or a before-and-after was photographed. That meant the brand itself had to do credibility work.',
    approach:
      'The most important decision in this project was the name. "Clean Aesthetic" worked on two levels simultaneously: it described the clinical philosophy (clean technique, natural-looking results) and it described the visual aesthetic of the brand itself. A name that carries its own positioning is worth more than a clever word combination — it means the identity starts doing work before a single dollar of marketing is spent.\n\nFrom the name, the visual system followed a clear logic. Minimal. Precise. Confident. The mark needed to communicate the same thing a well-executed treatment does: control, refinement, and the kind of restraint that signals expertise rather than effort.\n\nThe color and typography choices reinforced that signal. Teal-green, used intentionally, sits in the precise overlap between clinical credibility and modern luxury — it reads as medical without feeling sterile, aspirational without feeling flashy.',
    deliverables: [
      {
        title: 'Naming',
        description:
          'Developed "Clean Aesthetic" through a structured process: competitive audit of the existing aesthetics brand landscape, brand strategy brief, naming candidates evaluated against positioning fit, domain availability, and trademark risk. The selected name carried dual meaning — clinical philosophy and visual identity.',
      },
      {
        title: 'Monogram Mark & Logo System',
        description:
          'Built the primary identity around a refined CA monogram with an overlapping circular element — controlled, polished, and memorable as a standalone device. The mark reads at every scale, from a business card emboss to a social avatar, without losing its precision. Delivered with full variation suite: primary mark, horizontal lockup, stacked lockup, monogram-only, and simplified favicon version.',
      },
      {
        title: 'Color Palette & Visual Language',
        description:
          'A teal-green primary palette chosen specifically to communicate trust, cleanliness, and contemporary medical sensibility — distinct from the predictable black-and-gold of generic luxury branding and the clinical blues of traditional healthcare. Supporting neutrals and white space created a visual environment that felt elevated and considered.',
      },
      {
        title: 'Typography System',
        description:
          'Modern sans-serif primary typeface aligned with contemporary aesthetics — legible, refined, and versatile across marketing materials. Type hierarchy defined for headline, subhead, body, and label use across all applications.',
      },
      {
        title: 'Brand Guidelines Document',
        description:
          'Full guidelines covering logo usage and clear space, color system with hex, RGB, and CMYK values, typography rules and hierarchy, photography art direction brief, tone of voice guidance, and application do/don\'t examples. Gave the practice a clear reference standard for every future marketing and branding decision.',
      },
    ],
    outcome:
      'Clean Aesthetic launched with a complete brand system — name, identity, guidelines, and a set of application templates — that positioned the practice for premium pricing from day one. The brand communicated both the clinical credibility that safety-conscious patients need and the elevated, personal-luxury quality that concierge aesthetics clients are actually paying for.\n\nWhat this project proved is that in medical aesthetics — and in premium personal services generally — the brand isn\'t decoration. It\'s the first clinical signal. A well-built identity communicates competence before a patient ever reads a word of copy.',
    whatThisMeansForYou:
      'If you\'re launching a premium practice, clinic, or personal-service brand that needs to command high prices before you have a track record to lean on, the brand itself has to do the selling. Building the right one — not a generic placeholder — is how you close that gap from the first day you\'re open. That\'s what I build.',
    ctaLine: 'launch with a brand that earns trust before you\'ve said a word',
    cloudinaryAssets: [
      { publicId: 'clean-aesthetics-logo-anchor', label: 'Clean Aesthetic logo', folder: 'studio/projects/clean-aesthetics' },
      { publicId: 'CA_Logo_-_Secondary_ful_color', label: 'Clean Aesthetic secondary logo', folder: 'studio/projects/clean-aesthetics' },
    ],
  },

  // ── Graston Technique ──────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'graston-technique')!,
    titleTag: 'Graston Technique® — Training Lifecycle Automation & Platform Engineering | Darling MarTech',
    metaDescription:
      'How a suite of interconnected automation systems turned Graston Technique\'s fragmented training and membership operations into a self-running clinician platform — with 95% overhead reduction, +212% qualified leads, and 48 hrs/week returned to the team.',
    subhead:
      'Graston Technique® certifies clinicians across 15+ licensed professions in over 50 states. The operational and marketing infrastructure hadn\'t kept up with the scale. I built the systems that did.',
    challenge:
      'Graston Technique® is a clinically validated soft-tissue treatment method used by physical therapists, chiropractors, athletic trainers, and a dozen other licensed professions. The certification program is rigorous. The practitioner network is large and distributed. And the infrastructure holding it together was anything but.\n\nEvery new training registration triggered a chain of manual steps across four disconnected systems. Data didn\'t sync. CRM records were incomplete. Certificate issuance required staff intervention. The provider directory — a high-value patient acquisition tool — was essentially a passive listing with no automated onboarding and no lifecycle communication.\n\nAttribution was broken across multiple dashboards. And the site itself was intermittently slow, unstable under peak traffic, and vulnerable to 85,000+ bad-bot requests per month.\n\nThis wasn\'t one project. It was a platform that needed to be rebuilt from the infrastructure up.',
    approach:
      'The throughline across every system I built for Graston was the same: eliminate the manual handoff. Every place where a human had to touch a record, trigger a communication, issue a certificate, or reconcile data across systems was a failure point — and at scale, those failure points compounded into operational drag, revenue leakage, and a fractured clinician experience.\n\nThe solution wasn\'t to patch each problem in isolation. It was to design an event-driven architecture where a single action — a course purchase, a training completion, a directory enrollment — propagated automatically through every connected system. One trigger. Every downstream consequence handled without staff intervention.',
    deliverables: [
      {
        title: 'The Launchpad — Provider Directory Membership Funnel',
        description:
          'Converted the provider directory from a passive listing into a conversion engine. When a clinician completes a LearnDash course, the system automatically creates their directory profile and activates a 60-day premium trial. A 60-day FluentCRM email sequence guides them through profile setup and renewal — all without staff involvement. Result: +40% conversion lift, 95% reduction in administrative overhead.',
      },
      {
        title: 'The Conductor — Unified Data Pipeline',
        description:
          'Built an event-driven data architecture that synchronized WooCommerce, LearnDash, Gravity Forms, Google Sheets, and FluentCRM into a single source of truth. Eliminated hours of weekly manual reconciliation and enabled hyper-targeted segmentation campaigns.',
      },
      {
        title: 'The Closer — Quote-to-Order & Payment Plan Engine',
        description:
          'Rebuilt high-ticket training bundle sales into an automated system. Gravity Forms generates structured quotes that instantly create pending WooCommerce orders. An ACF-driven payment plan framework (3–18 months) connects to Stripe for recurring billing, retries, and dunning. Quote-to-close time reduced 60%.',
      },
      {
        title: 'The Compass — Analytics & Attribution Framework',
        description:
          'Rebuilt the entire measurement layer from scratch. Strict UTM governance, server-side event collection, and all signals unified in BigQuery and Looker Studio with annotated dashboards. Result: 100% attribution accuracy, confident marketing decisions, improved ROAS.',
      },
      {
        title: 'The Fortress — Multi-Layer Security Architecture',
        description:
          'Deployed Cloudflare WAF with aggressive rules tuned against WordPress-specific exploits. Super Bot Fight Mode neutralized 85,000+ bad-bot hits per month. Authenticated Origin Pulls (mTLS) ensured only Cloudflare could communicate with the origin server. Server CPU load dropped 40%.',
      },
    ],
    flagshipProofModules: [
      {
        title: 'Provider directory: from passive listing to conversion engine',
        body: 'The provider directory was Graston\'s highest-leverage patient acquisition surface — and it was doing almost nothing. Clinicians who completed training weren\'t being guided into their directory listing. The three membership tiers (Premier at $299/year, Preferred at $199/year, and a free 60-day Premier trial provisioned automatically on course completion) had no automated onboarding. Most practitioners who qualified never activated.\n\nI redesigned the entire post-completion flow. Course completion in LearnDash now triggers automatic profile creation, activates the 60-day Premier trial, and fires a structured email sequence: welcome on day 0, profile completion nudges through day 21, a mid-trial ROI preview on day 30, a practitioner success story on day 45, and renewal urgency from day 53 through 60. Zero staff involvement at any step. For existing practitioners — thousands of alumni who had never been invited into the directory — I structured a controlled rollout at 200 invitations per week, managing both deliverability and the moderation queue. Qualified leads grew 212%. Directory conversion lifted 40%.',
        imagePublicId: 'graston-growth-engine_-_for_providers',
        imageAlt: 'Graston Growth Engine provider hub showing directory profile management and membership tiers',
        imageCaption: 'Provider hub: automated onboarding, tiered membership, and 60-day nurture sequence — no staff intervention required.',
      },
      {
        title: 'Training lifecycle and certification',
        body: 'Every training registration used to trigger four manual steps across disconnected systems. Staff reconciled data. Certificates got issued by hand. Enrollment confirmations went out late or not at all.\n\nI automated the complete journey. A WooCommerce purchase triggers LearnDash enrollment. Course completion fires a Gravity Forms evaluation. Results are logged, WP Fusion tags the CRM record, and the certificate is generated and delivered automatically. 95% of the manual overhead — 48 hours per week — was eliminated without adding headcount.',
        imagePublicId: 'graston-website-training',
        imageAlt: 'Graston Technique training course page showing structured learning path for licensed clinicians',
        imageCaption: 'Training page: purchase → enrollment → completion → certification, fully automated.',
      },
      {
        title: 'CRM, operational visibility, and internal tooling',
        body: 'Four disconnected systems meant four sources of record with no reconciliation layer. CRM data was incomplete. Segmentation campaigns were guesswork. When an instructor needed to know whether an event had enough enrollments to avoid cancellation, they\'d spend hours pulling numbers manually from three different places.\n\nI built a unified data pipeline connecting WooCommerce, LearnDash, Gravity Forms, and FluentCRM, then surfaced that data through two internal tools. The admin command center aggregates orders, enrollment progress, evaluations, and CRM tags in a single tabbed view — with enrollment velocity indicators that flag low-enrollment events before they reach a cancellation threshold. A separate instructor dashboard adds event-type filtering and surfaces instrument model data pulled from FluentCRM contact records, supporting personalized follow-up and training outreach. Dunning automation handles payment failures through a staged recovery sequence before any downgrade fires. Renewal reminders go out at 30 and 7 days automatically.',
        imagePublicId: 'graston-growth-engine_-_admin_command_center',
        imageAlt: 'Graston Growth Engine admin command center showing enrollment data, CRM tags, and event management tools',
        imageCaption: 'Admin command center: cross-system visibility that previously required hours of manual reconciliation.',
      },
      {
        title: 'Measurement, attribution, and Google Ads optimization',
        body: 'Attribution was fragmented across multiple dashboards with inconsistent UTM tagging and client-side tracking that ad blockers severed routinely. The practical result: marketing decisions were made on data that was 20–40% incomplete. Nobody could confidently say which campaigns were driving training sales.\n\nI rebuilt the measurement layer from scratch. Server-side event collection via Cloudflare Workers bypassed ad blockers entirely. Gravity Forms submissions were pushed to the GTM dataLayer as qualified lead events — with form-ID filtering so only marketing-qualified completions triggered Google Ads lead conversions. WooCommerce purchase events were reconfigured as primary conversion actions in Google Ads for smart bidding, so the algorithm optimized for actual sales, not proxy signals. All signals were unified in BigQuery and Looker Studio with annotated dashboards. Attribution went from unreliable to trusted. ROAS improved because the data was finally accurate enough to act on.',
      },
      {
        title: 'Provider-facing analytics: building the retention case',
        body: 'A directory membership only renews if providers believe it\'s working. Without visibility into their own performance data, even a directory that\'s genuinely driving patient traffic looks like a sunk cost at renewal time.\n\nI built a provider-facing analytics pipeline that gives each member their own numbers: profile views, website clicks, phone clicks, form submissions, scroll depth, top referral sources, and a peer benchmark chart showing how their listing compares to the directory average. GA4 events are proxied through Cloudflare Workers into provider-specific ACF fields — then pulled into FluentCRM for personalized monthly delivery. Every Premier member gets an automated ROI email with their data each month. Providers can see exactly what their membership is doing for them, which changes the renewal conversation from "I hope this is worth it" to "here\'s the math."',
      },
      {
        title: 'Infrastructure, security, and edge architecture',
        body: 'The platform had three compounding problems: 85,000+ bad-bot requests hitting the origin server monthly, PHP handler instability causing intermittent 500 errors under peak traffic, and a directory search experience slow enough to drive patient bounce before a provider was found.\n\nI rebuilt the platform layer by layer. The directory runs as a headless experience — React frontend on Cloudflare Pages, with Cloudflare Workers acting as the secure API layer between the public interface and the WordPress origin. The origin is never exposed directly; all provider search, filtering, and analytics proxying runs at the edge. Cloudflare WAF with WordPress-specific rules neutralized the bot traffic. Authenticated Origin Pulls (mTLS) ensured only Cloudflare could reach the origin server. Brotli compression and a structured caching strategy reduced payload 20–30% and pushed the CDN Tiered Cache hit ratio to 86%. Server CPU load dropped 40%. The platform went from fragile under load to stable enough to instrument with real-time monitoring — CPU, memory, and I/O alerts so problems surface before users notice them.',
      },
    ],
    systemsSynthesis:
      'This was not a marketing campaign or a website refresh. It was a full platform rebuild across six operational layers: a membership directory with automated onboarding, automated training and certification, a unified CRM and internal command center, a complete measurement layer from GTM to BigQuery, provider-facing analytics dashboards, and a hardened edge infrastructure. Each layer was built to work without manual intervention. Each one feeds into the next. That\'s why the overhead dropped 95% and the leads grew 212% — not because of a tactic, but because the whole system was designed to run itself.',
    outcome:
      'Qualified leads grew 212%. Directory conversion lifted 40%. Administrative overhead dropped 95% — 48 hours per week returned to the team. Attribution went from incomplete to trusted. Google Ads started optimizing for actual sales. The platform stopped breaking under load.\n\nBut the most important outcome was structural. Graston Technique® stopped being an organization held together by manual processes and started operating as a platform. Every clinician enrolled, every certificate issued, every directory profile activated, every renewal reminded, every provider ROI email delivered — handled automatically, accurately, at scale.',
    whatThisMeansForYou:
      'If your training platform, membership business, or professional association is being held together by spreadsheets, manual CRM updates, and staff who are doing work a system should own — you\'re not just inefficient. You\'re capped. The ceiling on your growth is the capacity of your operations team. I build the systems that remove that ceiling.',
    closingStatement:
      'This engagement is the clearest proof of what I do: strategic diagnosis of a fragmented operation, followed by a purpose-built system that makes the whole thing run without constant management. Not a campaign. Not a refresh. A platform rebuilt to be self-sustaining — with the measurement layer, the retention mechanics, and the edge infrastructure to stay that way. That\'s what fractional CMO-level leadership looks like when it\'s paired with someone who can actually build the thing.',
    ctaLine: 'turn your platform into something that runs itself',
    cloudinaryAssets: [
      { publicId: 'graston_technique_logo', label: 'Graston Technique logo', folder: 'studio/projects' },
      { publicId: 'graston-website', label: 'Graston website overview', folder: 'studio/projects/graston-technique' },
      { publicId: 'graston-website-training', label: 'Graston training page preview', folder: 'studio/projects/graston-technique' },
      { publicId: 'graston-website-shop', label: 'Graston shop page preview', folder: 'studio/projects/graston-technique' },
    ],
  },

  // ── Hoosier Boy Barbershop ─────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'hoosier-boy-barbershop')!,
    titleTag: 'Hoosier Boy Barbershop — Brand Identity, Website & Local Booking Growth | Darling MarTech',
    metaDescription:
      'How Indiana-rooted brand identity, a mobile-first website, and an integrated booking system drove 90% more online bookings and top local search rankings for a Noblesville barbershop.',
    subhead:
      'Hoosier Boy Barbershop needed to modernize without losing the old-school personality that makes barbershop culture work. I built the identity, the website, and the booking experience that let both things be true at once — then extended the engagement into a connected operations platform for the business itself.',
    challenge:
      'Most barbershops either look like a chain or look forgettable. The ones that build loyal local followings are the ones that feel like they belong somewhere specific — a neighborhood, a community, a state of mind.\n\nHoosier Boy Barbershop had the name, the culture, and the atmosphere. What it didn\'t have was a brand and digital presence that translated any of that to someone who hadn\'t walked through the door yet. New customers discovered barbershops online, scanned for social proof, checked whether booking looked easy, and made a call in about ten seconds. The shop was losing that decision before the first click.\n\nThe challenge had a real tension at its center: modern customers expect convenience — mobile booking, clear pricing, easy discovery — but barbershop culture depends on authenticity, personality, and the sense that this place is not a franchise. Strip away the personality to look more polished, and you\'ve destroyed the product. Keep the personality but ignore the digital experience, and the place stays invisible.',
    approach:
      'The strategic answer was already in the name. "Hoosier Boy" isn\'t a generic barbershop name — it\'s a declaration of place. Indiana pride. State identity. That\'s not just a brand asset; it\'s a brand direction.\n\nI built the identity around Indiana\'s state bird — the cardinal — paired with classic barber iconography: a barber pole, a heritage banner treatment, bold block typography, and a red, white, and blue palette that felt patriotic without being cliché. The goal was a mark that someone who\'d never heard of the shop would recognize as both unmistakably local and unmistakably barbershop.\n\nThat kind of place-based specificity is harder to copy than generic design. It\'s also more memorable. And for a local service business competing on repeat visits and word of mouth, being memorable is half the business model.',
    deliverables: [
      {
        title: 'Brand Identity System',
        description:
          'Built a full identity from scratch, anchored by a custom-illustrated cardinal gripping a barber pole — giving the shop a symbol that was regional, categorical, and visually unique all at once. The identity included the primary mark, a badge variant, horizontal and stacked lockups, and a monogram for tight-fit applications.',
      },
      {
        title: 'Environmental & Signage Design',
        description:
          'Applied the identity across the physical space: window graphics, interior signage, and environmental design that turned the barbershop itself into a brand moment. Walking in felt like walking into the brand — not just a shop that happened to have a logo on the wall.',
      },
      {
        title: 'Mobile-First Website with Booking Integration',
        description:
          'Built a responsive, mobile-first website structured around the decisions a new customer needs to make fast. The homepage surfaces service descriptions with pricing, barber profiles, customer reviews, location and hours, and a prominent Book An Appointment CTA integrated directly with Booksy. Multiple booking prompts throughout the experience reduced friction to near zero.',
      },
      {
        title: 'Connected Operations Platform Direction',
        description:
          'The engagement extended past the public website into a companion platform layer — the Barbershop Command Center — giving the business a connected booking, admin, and CRM foundation without turning the main brand story into a software product story.',
      },
      {
        title: 'Local SEO & Discovery',
        description:
          'Built the site\'s content architecture around local search intent — structured data, location-relevant copy, service-specific landing pages, and a Google Business profile optimized for discovery in Noblesville and surrounding Indianapolis-area searches. Top local search rankings achieved and maintained.',
      },
      {
        title: 'Social Media Visual Language',
        description:
          'Delivered a social content system — branded templates, visual language guidelines, and a launch content framework — so the team could post consistently and on-brand from day one without needing a designer for every piece of content.',
      },
    ],
    outcome:
      'Online bookings grew 90%. Social media engagement climbed 200%. New customer acquisition improved 55%. Local search rankings reached the top position for barbershop keywords. Foot traffic increased visibly after launch — the storefront and the brand were doing acquisition work without any paid media.\n\nThe barbershop became recognizable in its market before a single ad dollar was spent. That\'s the mark of a brand that\'s doing real work: it generates awareness, not just impressions. People saw the cardinal, remembered the name, and came in because the brand made the place feel worth choosing.',
    whatThisMeansForYou:
      'If your local business has the right product and the right personality but a brand and website that don\'t communicate either, you\'re not losing to competitors with better service — you\'re losing to competitors who look more credible online. That\'s a fixable problem. That\'s what I build.',
    ctaLine: 'build a local brand that owns its market before spending a dollar on ads',
    cloudinaryAssets: [
      { publicId: 'hoosierboy-logo-anchor', label: 'Hoosier Boy Barbershop logo', folder: 'studio/projects/hoosierboy-barber-shop' },
      { publicId: 'hoosierboy-logo-legacy', label: 'Hoosier Boy legacy logo', folder: 'studio/projects' },
      { publicId: 'bird', label: 'Hoosier Boy cardinal asset', folder: 'studio/projects/hoosierboy-barber-shop' },
      { publicId: 'Bcard_Google', label: 'Hoosier Boy business card', folder: 'studio/projects/hoosierboy-barber-shop' },
      { publicId: 'barbershop-4484297_1920', label: 'Hoosier Boy barbershop photography', folder: 'studio/projects/hoosierboy-barber-shop' },
    ],
  },

  // ── Barbershop Command Center (Hoosier Boy) ───────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'barbershop-command-center')!,
    titleTag: 'Barbershop Command Center — Booking, CRM & Operations Platform for Hoosier Boy | Darling MarTech',
    metaDescription:
      'How a connected public booking app, admin command center, CRM foundation, and automation-ready operations layer gave Hoosier Boy Barbershop a fuller business system beyond generic scheduling software.',
    subhead:
      'Hoosier Boy needed more than a generic scheduler. I built a connected booking and operations system: a public app for clients, a command layer for the shop, and a CRM-ready foundation underneath both.',
    challenge:
      'Most barbershops are still operating across too many disconnected surfaces at once: consumer scheduling software for guests, text threads for coordination, and no real CRM or lifecycle view behind the scenes. That starts to break as service complexity, no-show risk, and repeat-client management grow.\n\nThe structural problem is that the public booking experience and the business-operations layer usually do not share the same logic. The client sees a calendar. The owner is left stitching together history, communication, service rules, deposits, and reporting somewhere else.\n\nHoosier Boy needed one connected system that could do both jobs honestly: help clients book without friction, and give the shop a reliable operating layer for oversight, client context, and next-step workflow.',
    approach:
      'I treated the build as a companion app and admin platform rather than a prettier booking form. The public side stays conversion-focused: service-first navigation, barber selection, mobile-first scheduling, and a clean path from interest to booked appointment.\n\nUnderneath that, the platform uses one shared data model for appointment state, client records, service rules, and operating visibility. That lets the business side behave like a system instead of a dashboard pasted on top of a scheduler.\n\nThe owner/admin side also pushes further than a simple dashboard. The concept includes an Automation & AI Hub direction: workflow orchestration, connector-ready surfaces, insights, and agent-oriented operating logic that can sit on top of the booking and CRM foundation without pretending every integration is already fully live.\n\nThe result is a cleaner split of responsibilities. Clients get a simple booking experience. Owners and barbers get the command layer: appointment oversight, lifecycle context, and workflow logic built around how the shop actually runs.',
    deliverables: [
      {
        title: 'Public Booking App',
        emphasis: 'feature',
        description:
          'Service-first booking flow with barber selection, real-time availability, and mobile-first UX — designed to keep the customer-facing path simple while still honoring shop-specific scheduling rules.',
      },
      {
        title: 'Admin Command Center',
        emphasis: 'feature',
        description:
          'Owner-facing dashboard for daily and weekly operations: appointment load, projected revenue, completion signals, and scheduling exceptions in one operational surface.',
      },
      {
        title: 'CRM + Lifecycle Layer',
        description:
          'Structured client records around appointment context, lifecycle stages, communication direction, and service history so the business has more than a calendar view of the relationship.',
      },
      {
        title: 'Automation & AI Hub Direction',
        description:
          'Owner/barber role logic, workflow direction, connectors, insights, premium slot validation, deposit rules, and shared Next.js + Supabase architecture give the system the structure it needs to support a real automation hub without overstating live integrations.',
      },
    ],
    process: [
      { label: 'Operational mapping', description: 'Mapped services, barber roles, booking rules, premium offerings, and the moments where generic scheduling tools stop matching the real business.' },
      { label: 'Companion-system build', description: 'Built the public booking app and the admin command center against one shared schema so customer flow and internal operations stay connected.' },
      { label: 'Lifecycle and workflow layering', description: 'Added CRM structure, appointment-stage logic, and owner/barber view separation to move the build past scheduling and toward a fuller operations platform.' },
      { label: 'Readiness hardening', description: 'Tested slot rules, deposits, overlaps, and edge cases while keeping automation and AI positioning honest: structured for expansion, not oversold as fully integrated production automation.' },
    ],
    outcome:
      'The build moved Hoosier Boy beyond a generic booking helper into a more credible business-operations system. Clients can book through a public flow that fits the brand. Owners get a clearer operational picture before the week closes. Barbers get a role-aware workflow layer instead of relying on side-channel coordination.\n\nMore importantly, the platform now holds the logic generic scheduling tools usually leave scattered: service rules, deposits, appointment stages, client context, and the beginnings of a usable CRM record. That makes it more valuable than a calendar because it starts to represent how the business actually works.\n\nIt also makes the Automation & AI Hub direction more credible. The workflow layer, connector-ready surfaces, insight views, and agent-oriented orchestration model are grounded in the same operating system rather than treated like a separate AI concept dropped on top.\n\nThe parent Hoosier Boy engagement proved the brand, booking, and local-growth foundation. This child build proves the layer underneath it: a companion app and admin platform that can support future workflow automation and AI-assisted operations without pretending those integrations are already fully live.',
    whatThisMeansForYou:
      'If your service business is forcing generic scheduling software to do CRM, staff coordination, lifecycle management, and operational reporting, the problem is not your team. The problem is the shape of the system. I build the companion platform that fits the way the business actually runs, then leaves room for smarter automation on top of it.',
    ctaLine: 'build the operations layer behind your customer-facing experience',
    problemVisualPublicId: 'Barbershop_Command_Center',
    cloudinaryAssets: [
      { publicId: 'Barbershop_Command_Center', label: 'Barbershop Command Center dashboard', folder: 'studio/projects/hoosierboy-barber-shop' },
      { publicId: 'Book_Appointment_I_Hoosier_Boy_Barbershop', label: 'Hoosier Boy client booking', folder: 'studio/projects/hoosierboy-barber-shop' },
    ],
  },

  // ── Perpetual Movement Fitness ─────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'perpetual-movement-fitness')!,
    titleTag: 'Perpetual Movement Fitness — Kinetic Brand Identity for a Coaching Brand | Darling MarTech',
    metaDescription:
      'How a minimal, directional identity system communicated progress, momentum, and transformation for a fitness coaching brand — without a single dumbbell or flame in sight.',
    subhead:
      'Most fitness logos announce themselves with aggression: heavy weights, sharp edges, flames. Perpetual Movement Fitness needed to say something different. Movement as progress. Transformation over time. A coaching brand, not a gym brand. I built an identity that showed the difference.',
    challenge:
      'Fitness branding is one of the most cluttered identity categories there is. Generic gym logos — dumbbells, flames, bold all-caps type, human silhouettes in action poses — are everywhere and interchangeable. The problem isn\'t that these logos look bad. The problem is that they all look the same, and they all communicate the same thing: this is a place to work out hard.\n\nFor a coaching and personal transformation brand, that\'s the wrong signal. Coaching clients aren\'t buying intensity. They\'re buying progress, accountability, and a relationship with a trainer who understands that the goal is long-term change, not a single performance moment.\n\nPerpetual Movement Fitness needed an identity that communicated that distinction. Not a gym brand. A coaching brand. Not a "train hard" message. A "keep moving forward" message. The visual language had to feel different from the category default — cleaner, more directional, more about trajectory than effort.',
    approach:
      'The strategic insight was that restraint was the differentiator. In a category full of heavy, loud, aggressive visual energy, a minimal, directional mark would stand out — not because it tried to be different, but because it was built around a different idea.\n\nThe concept was direction — specifically, the arrow as a motion device. Not a decorative element, not a generic call-to-action symbol, but the structural logic of the mark itself. If the brand is about perpetual forward movement, the logo should feel like it\'s moving.\n\nThe execution had to be minimal enough that the directional element was the hero, not a supporting accent. That meant using a lean wordmark with a simple extended line and arrow structure — keeping the type light and the energy clean.',
    deliverables: [
      {
        title: 'Wordmark & Symbol System',
        description:
          'Built the primary mark around an extended horizontal line and forward-facing arrow integrated into the wordmark treatment — turning the logo itself into a motion device. The symbol reads directionally at a glance, without needing the brand name to contextualize it. Clean, light-weight typography allowed the arrow structure to remain the visual hero.',
      },
      {
        title: 'Color System',
        description:
          'A blue-cyan palette — energetic and fresh without being aggressive or intimidating. In a category where red and black dominate, the cooler tone positioned Perpetual Movement as a clarity-and-confidence coaching brand rather than a high-intensity performance brand.',
      },
      {
        title: 'Brand Identity System',
        description:
          'Delivered the complete identity system: primary wordmark, symbol-only variant, horizontal and stacked lockups, and a monogram for tight-fit applications. Typography specified across headline, body, and supporting text uses. Each element built to work across website, social media, email headers, training materials, apparel, and event marketing.',
      },
    ],
    outcome:
      'Perpetual Movement Fitness launched with an identity that immediately differentiated it from the gym-and-performance aesthetic dominating the fitness branding category. The mark communicated coaching, transformation, and sustained progress — the right signals for a brand trying to attract serious long-term clients, not casual gym members.\n\nThe minimal execution also gave the brand practical versatility. The directional mark scaled well from social avatar to website header to printed materials, without losing its energy or legibility at any size.',
    whatThisMeansForYou:
      'If your fitness, coaching, or wellness brand looks like everyone else in the category, the fix isn\'t a better logo — it\'s a clearer concept. What does your brand actually stand for, at the idea level? Build from that, and the visual identity follows. That\'s what I build.',
    ctaLine: 'build a brand built around an idea, not a category cliché',
    cloudinaryAssets: [
      { publicId: 'pmf-logo-anchor', label: 'Perpetual Movement Fitness logo', folder: 'studio/projects/perpetual-movement-fitness' },
    ],
  },

  // ── Pike Medical Consultants ───────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'pike-medical-consultants')!,
    titleTag: 'Pike Medical Consultants — Healthcare Parent Brand & Multi-Division Platform Strategy | Darling MarTech',
    metaDescription:
      'How a fractional CMO engagement shaped the parent-brand architecture, digital infrastructure, and marketing strategy for a multi-division Indianapolis medical group — driving 45% patient growth over three years.',
    subhead:
      'Pike Medical Consultants is the parent organization behind UrgentCare Indy, PrimaryCare Indy, GeriCare, LungCare, and occupational health services. I directed the marketing, brand, and digital strategy that gave a fragmented healthcare ecosystem a coherent identity — and 45% patient growth to show for it.',
    challenge:
      'Most healthcare marketing problems look like marketing problems. This one was actually a structural problem.\n\nPike Medical Consultants, founded in 2007 by Dr. James D. Pike, had grown into a multi-division organization covering urgent care, primary care, geriatric care, pulmonary care, occupational health, bone health, and life counseling. Each division had its own patient-facing experience — they were experiences, plural, not a system.\n\nUrgentcareindy.com, primarycareindy.com, and pikemedical.com existed as separate digital properties with separate user journeys, separate analytics, and separate brand authority. A patient who came in through urgent care wasn\'t being carried into primary care. The parent brand was operating as a passive corporate brochure rather than the connective tissue of a healthcare platform.\n\nMeanwhile, the marketing function itself needed building. There was no organized strategy, no campaign infrastructure, no content system, no PR cadence, no business development framework for the employer-facing service lines.',
    approach:
      'The strategic frame I applied across this engagement was to treat Pike Medical as a platform, not a portfolio. A portfolio is a collection of independent things. A platform is a connected system where the whole is worth more than the sum of its parts.\n\nIn healthcare, that distinction matters enormously. A patient who enters the system through urgent care is a patient who could have a primary care relationship, a geriatric care plan, a pulmonary workup, or an occupational health account. Every division had acquisition channels. Almost none of them had retention or cross-referral infrastructure.\n\nThe approach built from the top down: establish the parent brand as the trust and authority layer, then use that foundation to create coherent division-level experiences that fed back into a unified patient lifecycle.',
    deliverables: [
      {
        title: 'Parent Brand Architecture & Corporate Website',
        description:
          'Developed and directed the corporate Pike Medical digital presence — the umbrella brand that had to hold five divisions together, communicate mission and values, route users to the right care model, and support business development for employer-facing services.',
      },
      {
        title: 'Multi-Division Digital Ecosystem',
        description:
          'Directed the redesign and restructuring of all three primary company websites — pikemedical.com, urgentcareindy.com, and primarycareindy.com — improving visual consistency, traffic performance, and information architecture across the ecosystem.',
      },
      {
        title: 'Brand Identity & Awareness',
        description:
          'Developed brand-awareness strategy and materials across the full Pike Medical ecosystem — ensuring that each division\'s visual identity and messaging felt like part of the same organizational family while serving the distinct needs of their respective patient populations.',
      },
      {
        title: 'Advertising & Paid Patient Acquisition',
        description:
          'Managed paid advertising across search and display channels for patient acquisition — Google Ads, geo-targeting, and audience segmentation aligned to the specific demand profiles of urgent care vs. primary care vs. occupational health.',
      },
      {
        title: 'Employer-Facing Business Development',
        description:
          'Built out the marketing infrastructure for Pike Medical\'s occupational health service line — pre-employment physicals, drug and alcohol screening, fit-for-duty exams, workers\' comp support, and employer wellness programs.',
      },
      {
        title: 'Budget Planning, Campaign Reporting & Ongoing Optimization',
        description:
          'Managed the marketing budget and campaign reporting function — translating spend into measurable outcomes and giving leadership the visibility to make confident growth decisions.',
      },
    ],
    outcome:
      '45% growth in patient visits over three years, achieved while maintaining positive ROI on every marketing initiative. That figure represents the compounding effect of a coherent strategy applied consistently — not a single campaign win.\n\nThe deeper outcome was organizational. Pike Medical ended the engagement with a functioning marketing infrastructure, a parent brand that communicated what it actually was, a multi-division digital ecosystem that worked together rather than against itself, and a set of marketing tools and frameworks that could support continued growth beyond the engagement.',
    whatThisMeansForYou:
      'If you\'re running a multi-location practice, a growing healthcare group, or any service business where multiple divisions are operating without a coherent parent-brand strategy, you\'re leaving patient lifetime value and organizational credibility on the table. I build the infrastructure that holds it together. That\'s what I build.',
    ctaLine: 'build a healthcare platform instead of a collection of websites',
    cloudinaryAssets: [
      { publicId: '635889083997282366-Dr.-James-Pike', label: 'Dr. James Pike portrait', folder: 'studio/projects/pike-medical' },
      { publicId: 'pmc-welcome', label: 'Pike Medical welcome graphic', folder: 'studio/projects/pike-medical' },
      { publicId: 'pmc-webheader-med', label: 'Pike Medical header graphic', folder: 'studio/projects/pike-medical' },
      { publicId: 'download', label: 'Pike Medical brand graphic', folder: 'studio/projects/pike-medical' },
    ],
  },

  // ── PrimaryCare Indy ───────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'primarycare-indy')!,
    titleTag: 'PrimaryCare Indy — Healthcare Brand, Website & Patient Acquisition | Darling MarTech',
    metaDescription:
      'How a full digital transformation drove 75% more online bookings, 300% organic traffic growth, and 210% ROI for an independent Indianapolis primary care clinic.',
    problemVisualPublicId: 'primary-care-indy-website',
    subhead:
      'PrimaryCare Indy had the clinical expertise and the personal touch. What it lacked was a digital presence that made patients trust it before the first appointment. I built that from the ground up.',
    challenge:
      'Independent primary care practices face a specific competitive problem. Large health systems spend tens of thousands of dollars on their digital infrastructure. SEO teams, paid search budgets, patient portal technology, professional photography, brand teams. A solo or small-group practice rarely has any of that — but competes for the same patients in the same search results.\n\nPrimaryCare Indy was a growing family medicine clinic in Northwest Indianapolis with strong clinical care and a genuinely personal approach. Their patients loved them. The problem was that new patients couldn\'t find them — and when they did, the digital experience didn\'t do the clinic justice. The website looked secondary. The Google presence was minimal. The brand didn\'t communicate the warmth and capability that existing patients experienced in person.\n\nThe stakes were real. Patients in Indianapolis searching for a primary care physician accepting new patients were landing on well-optimized health system pages and making decisions before PrimaryCare Indy even appeared in the results.',
    approach:
      'The strategic frame that shaped this project was simple: healthcare consumers increasingly behave like retail consumers. They expect clarity, convenience, mobile-friendly interfaces, and transparent next steps. If your site makes someone work to understand what you do, who you see, whether you take their insurance, or how to schedule, they leave.\n\nThat insight drove everything. I approached the project less like a design exercise and more like a patient-acquisition infrastructure build. Every decision — from brand identity to site architecture to Google Business optimization — was evaluated by one question: does this make it easier for a patient to choose this clinic?\n\nThe deeper strategic layer was local SEO. Primary care is a high-intent local search category. Someone searching "primary care physician accepting new patients Indianapolis" is not browsing. They need a doctor. If the clinic wasn\'t in the top results with a fully optimized, review-backed, information-complete presence, that patient was going elsewhere.',
    deliverables: [
      {
        title: 'Brand Identity',
        description:
          'Developed a full brand identity system built around a person-plus-cross motif that communicated personalized care and holistic wellness. The color system used calming blues, teals, and soft grays — clinical enough to signal trust, warm enough to avoid feeling corporate.',
      },
      {
        title: 'Website Redesign (WordPress, Mobile-First)',
        emphasis: 'feature',
        description:
          'The site was built on WordPress with a custom theme, mobile-first layout, optimized load times, schema markup for medical services, integrated Google Maps, HIPAA-safe form routing, SSL, and Core Web Vitals readiness. A patient can move from "what does this clinic do?" to "how do I schedule?" in under three clicks.',
      },
      {
        title: 'Patient-Centered Service Architecture',
        description:
          'Designed the content structure around the full scope of the clinic\'s services: acute care, preventive care, diabetes management, on-site lab work, mental health services, immunizations, telehealth, and women\'s and men\'s health. Each section written to reduce uncertainty rather than just describe the service.',
      },
      {
        title: 'Patient Portal & Scheduling Integration',
        description:
          'Integrated the My Medical Locker patient portal — giving patients access to balances, records, secure messaging, appointment history, and personal health tracking. Built out the online appointment and scheduling workflow, reducing administrative call volume. Administrative calls dropped 50% after launch.',
      },
      {
        title: 'Local SEO & Google Business Optimization',
        emphasis: 'feature',
        description:
          'Built a comprehensive local SEO strategy targeting high-intent queries. Google Business profile work included improved completeness, keyword targeting, a systematic review management and response workflow, optimized imagery and metadata, and consistent NAP across all directory listings. Result: 300% increase in organic traffic over 12 months, 70% of inbound appointments tracing directly to Google.',
      },
      {
        title: 'Email Communication System',
        description:
          'Built a HIPAA-compliant Mailchimp email infrastructure for ongoing patient communication — seasonal health reminders, flu campaigns, wellness check prompts, service updates, and patient education content.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Visibility Audit',
        description:
          'Audited the clinic website, Google Business profile, review presence, and patient decision path to identify the gaps causing larger health systems to win before PrimaryCare Indy was even considered.',
      },
      {
        label: 'Phase 2: Brand & Experience Design',
        description:
          'Built the identity system, restructured the site architecture, and rewrote the service narrative around clarity, trust, and fast patient decision-making.',
      },
      {
        label: 'Phase 3: Scheduling & Search Infrastructure',
        description:
          'Integrated the patient portal and scheduling flow, deployed local SEO improvements, and tightened every high-intent page around conversion rather than brochure copy.',
      },
      {
        label: 'Phase 4: Patient Growth Optimisation',
        description:
          'Tracked booking behavior, administrative friction, reviews, and local search performance to compound gains after launch and confirm the clinic was now winning through Google.',
      },
    ],
    outcome:
      'The results were significant across every channel. Online appointment bookings grew 75%. Organic traffic climbed 300% over 12 months. Seventy percent of inbound appointments could be directly attributed to Google Search and Maps. Administrative call volume dropped 50%. Patient satisfaction improved 20%. New patient referrals grew 35%. The Google rating held at 5 stars across 50+ reviews. Total ROI on the engagement: 210%.',
    whatThisMeansForYou:
      'If you run an independent practice — in healthcare or any professional service — that\'s consistently losing to larger, better-funded competitors in Google results, the answer isn\'t a bigger budget. It\'s a smarter system. That\'s what I build.',
    ctaLine: 'build a patient acquisition system your practice can actually own',
    cloudinaryAssets: [
      { publicId: 'primary-care-indy-website', label: 'PrimaryCare Indy website overview', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'primary-care-indy-website-telehealth', label: 'PrimaryCare Indy telehealth page preview', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'primarycare-logo-anchor', label: 'PrimaryCare Indy logo', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'Dr._PIke', label: 'Dr. Pike portrait', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'Primary_Care_Logo_with_PMC', label: 'PrimaryCare Indy PMC logo', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'PMC-Dr.-Pike-Xray', label: 'PrimaryCare Indy clinical photography', folder: 'studio/projects/primarycare-indy' },
      { publicId: 'PMC-Dr.-PIke-Patient-Room', label: 'PrimaryCare Indy patient room photography', folder: 'studio/projects/primarycare-indy' },
    ],
  },

  // ── Riley Bennett Egloff ───────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'riley-bennett-egloff')!,
    titleTag: 'Riley Bennett Egloff LLP — Law Firm Marketing Leadership & Digital Transformation | Darling MarTech',
    metaDescription:
      'A 7+ year embedded marketing engagement with a 29-attorney Indianapolis law firm — spanning website strategy, SEO, content, PR, BD, and a next-generation digital ecosystem blueprint.',
    subhead:
      'Riley Bennett Egloff didn\'t need a campaign. It needed a marketing director who understood both the business of law and the work of building a modern firm brand. I was that person for seven years.',
    challenge:
      'Law firms are strange marketing clients. The work is confidential. The practitioners are often skeptical of marketing. The brand has to feel authoritative without feeling arrogant, approachable without feeling casual. And the digital experience — the first thing most prospective clients encounter — has to earn trust before anyone speaks to a human.\n\nRiley Bennett Egloff came to me with a firm that had built a sterling reputation over decades. Twenty-nine attorneys. Deep expertise across business and commercial law, litigation, labor and employment, healthcare, construction, bankruptcy, and government law. A culture of camaraderie and genuine community involvement that the marketing materials barely hinted at.\n\nThe digital presence didn\'t match the firm. The website was content-heavy but performance-poor — an 80%+ bounce rate and 1.46 pages-per-session told the story. Practice area pages were underselling the firm\'s depth. Attorney bios weren\'t doing the relationship work they could. The analytics were tracking sessions, not decisions.',
    approach:
      'Long-term marketing engagements at a law firm require a different operating mode than project-based agency work. The best results come from someone who understands the firm\'s culture well enough to write in the voice of each practice group, who knows which attorneys are building their personal brand and which prefer to stay out of the spotlight, and who can bridge the gap between the firm\'s legal sophistication and the accessibility a prospective client needs.\n\nThat\'s the role I operated in — part strategist, part embedded marketing director, part content creator, part technical project owner. The work was both strategic and hands-on simultaneously.\n\nThe digital transformation angle took shape gradually. When it became clear the existing WordPress site had accumulated technical debt that couldn\'t be patched around, I commissioned a full technical audit and used it as the foundation for a next-generation platform blueprint.',
    deliverables: [
      {
        title: 'Website Ownership & Performance',
        description:
          'Managed the firm\'s WordPress site end-to-end for seven years — attorney bio integrations, practice area pages, content updates, UX improvements, and SEO implementation. Restructured page architecture, improved internal linking, and overhauled meta structure. Bounce rate declined from over 80%; engagement metrics climbed above the 1.46 pages-per-session baseline.',
      },
      {
        title: 'Next-Generation Platform Blueprint',
        description:
          'When the existing WordPress build reached the limits of what improvement could accomplish, I commissioned a comprehensive technical audit and built a detailed four-phase blueprint for a modern rebuild: a React/Next.js front-end with headless CMS, a universal attorney vCard and link generator, an immersive newsroom hub, a smart attorney bio engine, and a performance and accessibility layer that would meet modern standards.',
      },
      {
        title: 'Content Strategy & Copywriting',
        description:
          'Wrote and maintained ongoing content across all firm channels — attorney bios that positioned practitioners as individuals, not just credential lists; practice area pages that communicated expertise in language clients could actually use; thought leadership articles that ranked for high-intent searches and demonstrated the firm\'s depth.',
      },
      {
        title: 'PR & Media Relations',
        description:
          'Cultivated relationships with legal journalists, drafted and distributed press releases, coordinated award nominations, and secured placements in local and national legal publications. Elevated the firm\'s profile in the Indiana legal community.',
      },
      {
        title: 'Business Development Support',
        description:
          'Partnered with individual attorneys to develop personalized BD plans — identifying their targets, building their pitch materials, and aligning their marketing activity with the firm\'s cross-selling strategy. Managed RFP and proposal responses.',
      },
      {
        title: 'Client Experience Innovation',
        description:
          'Identified and solved a friction point that sounds minor but wasn\'t: clients arriving downtown for their first meeting were anxious about parking. I proposed and produced a professional arrival-and-parking guide video — drone cinematography, on-screen wayfinding graphics, professional voiceover — that reduced first-visit anxiety and improved initial impressions.',
      },
    ],
    outcome:
      'Seven years is the outcome that says the most. In law firm marketing, long engagements don\'t happen because the results are average. They happen because the work compounds — year over year of content investment, search authority, relationship building, and brand consistency.\n\nThe firm\'s digital presence improved measurably on every engagement metric: lower bounce rates, higher pages-per-session, stronger search visibility, better attorney bios, more consistent PR. The next-generation platform blueprint gave leadership a clear path forward.',
    whatThisMeansForYou:
      'If you\'re running a law firm or professional services practice that needs more than a one-time project — a real marketing function, someone who can operate across strategy and execution and understand your world well enough to represent it — that\'s exactly what this engagement was. That\'s what I build.',
    ctaLine: 'find a long-term marketing partner who actually understands your field',
    cloudinaryAssets: [
      { publicId: 'rbe-logo-anchor', label: 'Riley Bennett Egloff logo', folder: 'studio/projects/riley-bennett-egloff' },
      { publicId: 'dss', label: 'Riley Bennett Egloff website still', folder: 'studio/projects/riley-bennett-egloff' },
    ],
  },

  // ── The Closer ────────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'the-closer')!,
    titleTag: 'The Closer — Quote-to-Order Revenue System & Payment Plan Engine | Darling MarTech',
    metaDescription:
      'How a Gravity Forms → WooCommerce → Stripe quote-to-order engine with ACF-driven payment plans eliminated manual invoicing and stopped high-ticket deals from dying at checkout.',
    subhead:
      'A custom quote-to-order system was losing deals because the payment step created friction at exactly the wrong moment. I rebuilt the entire revenue flow — from quote through checkout to payment plan — and reduced manual invoices to zero.',
    challenge:
      'High-ticket service and product sales have a specific failure point that lower-ticket businesses don\'t think about: the invoice. When a buyer reaches agreement and then gets emailed a PDF invoice with wiring instructions and a 30-day net payment term, the momentum dies. Every hour that passes between "yes" and "payment received" is an hour for second-guessing to set in.\n\nThis business had exactly that problem. Deals were closing verbally, quotes were being sent manually, invoices were being created by hand, and payment plans — which were essential for larger ticket sizes — required manual setup and tracking every single month. The operations team was spending significant time on revenue administration rather than revenue generation.',
    approach:
      'The strategic frame here was that payment friction isn\'t a financial problem — it\'s a conversion problem. Every manual step between "yes" and "paid" is a drop-off risk. The solution wasn\'t a better invoice template. It was eliminating the invoice entirely by replacing the entire back-and-forth with a self-serve checkout flow built for high-ticket, complex-configuration purchases.\n\nThe architecture needed to handle three things that standard WooCommerce checkout doesn\'t support well out of the box: custom quote configurations with variable pricing, flexible payment plan structures (not just monthly subscriptions), and clean Stripe integration that could handle both one-time and installment payments on the same transaction.',
    deliverables: [
      {
        title: 'Gravity Forms Quote Engine',
        description:
          'Built a multi-step Gravity Forms quote builder that translated client configuration inputs — service tier, scope, timeline, add-ons — into a dynamic price calculation. The form fed directly into WooCommerce as a draft order, pre-populated with all line items. No copy-paste, no manual order creation.',
      },
      {
        title: 'WooCommerce Order & Checkout System',
        emphasis: 'feature',
        description:
          'Customized the WooCommerce checkout flow for high-ticket B2B and B2C purchases. Buyers could see exactly what they were committing to — total cost, payment schedule, and per-installment amount — before confirming. Payment plan selection as a native checkout option.',
      },
      {
        title: 'ACF-Driven Payment Plan Configuration',
        description:
          'Built the payment plan engine using Advanced Custom Fields to allow staff to configure plan options (3 months, 6 months, 12 months, 18 months, custom) per product or service category — without code changes. New plan structures could be deployed in minutes.',
      },
      {
        title: 'Stripe Integration & Installment Automation',
        emphasis: 'feature',
        description:
          'Integrated Stripe for payment processing with support for both one-time charges and installment schedules. Initial deposit or full payment collected at checkout; subsequent installments auto-charged via Stripe. Failed payment retry logic and payment confirmation emails all handled automatically.',
      },
      {
        title: 'Revenue Reporting Dashboard',
        description:
          'Built a WooCommerce admin dashboard view showing active payment plans, upcoming charges, total committed revenue, and outstanding balances. The operations team could see the full revenue pipeline in one view.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Revenue Friction Audit',
        description:
          'Mapped the existing quote, invoice, and payment-plan handoff to locate where sales momentum was stalling and where operations was spending manual effort to keep deals alive.',
      },
      {
        label: 'Phase 2: Checkout Architecture',
        description:
          'Designed a quote-to-order flow that could turn custom configurations into draft orders, expose payment options clearly, and replace invoice chasing with a guided checkout path.',
      },
      {
        label: 'Phase 3: Payment Plan Engine',
        description:
          'Built the ACF-driven plan configuration layer and Stripe installment automation so staff could deploy financing options without code changes or manual follow-up.',
      },
      {
        label: 'Phase 4: Revenue Operations Visibility',
        description:
          'Added reporting and monitoring around active plans, upcoming charges, and failed payments so the system could be operated as a revenue engine rather than a patchwork of manual admin.',
      },
    ],
    outcome:
      'Manual invoice creation dropped to zero. The operations team stopped spending hours per week on payment administration and started spending zero. Deals that had previously required 2–5 back-and-forth touchpoints between quote and payment now completed in a single session.\n\nThe payment plan flexibility turned what had been a sticking point in negotiations into a sales tool. Offering a 6-month or 12-month plan with automatic billing removed the budget objection from the close. More deals converted, and they converted faster.',
    whatThisMeansForYou:
      'If high-ticket deals in your business are dying between verbal agreement and payment, the problem isn\'t your sales process — it\'s the system that handles the handoff. That\'s a solvable problem. That\'s what I build.',
    ctaLine: 'stop losing deals at the payment step',
  },

  // ── The Compass ───────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'the-compass')!,
    titleTag: 'The Compass — Observability Stack & Uptime Engineering | Darling MarTech',
    metaDescription:
      'How a centralized Datadog + AWS CloudWatch observability stack and custom anomaly scoring delivered 99.98% uptime SLA and auto-resolved 94% of issues before alerts fire.',
    subhead:
      'A multi-brand platform was flying blind — no unified observability, no anomaly detection, and no way to know something was wrong until users were already affected. I built an intelligence layer that changed that.',
    challenge:
      'A multi-brand platform was operating with fragmented monitoring — different dashboards, different alert thresholds, different tooling for different properties. The result was the worst kind of observability: engineers thought they had visibility, but what they actually had was a collection of disconnected signals that didn\'t tell a coherent story.\n\nIssues surfaced through user complaints, not internal detection. Post-mortems kept revealing the same pattern: something had been wrong for 10, 20, 40 minutes before anyone knew. By then, the blast radius was large and the fix was reactive.',
    approach:
      'The core insight was that monitoring and observability are not the same thing. Monitoring tells you a metric crossed a threshold. Observability tells you why the system is behaving the way it is — and ideally, predicts where it\'s going.\n\nThe existing setup was pure monitoring: static thresholds, manual triage, reactive response. What the platform needed was a model that could score anomalies relative to historical baselines, correlate signals across services and properties, and trigger automated remediation for the failure patterns that were well-understood.\n\nI designed the stack around two layers: Datadog for application-level observability and AWS CloudWatch for infrastructure-level signals. A custom anomaly scoring model tied them together.',
    deliverables: [
      {
        title: 'Datadog APM & Distributed Tracing',
        description:
          'Instrumented all application services with Datadog APM, enabling distributed tracing across request lifecycles. Service maps built for every major user journey — sign-up, checkout, content delivery — so anomalies in one service could be correlated with upstream and downstream impact instantly.',
      },
      {
        title: 'AWS CloudWatch Unified Integration',
        description:
          'Centralized CloudWatch metrics and logs across all AWS accounts and regions into a single aggregation layer. Infrastructure signals (EC2 CPU, RDS connections, Lambda cold starts, S3 request errors) fed into the same observability plane as application traces.',
      },
      {
        title: 'Custom Anomaly Scoring Model',
        emphasis: 'feature',
        description:
          'Built a custom scoring model that evaluated incoming signals against rolling historical baselines rather than static thresholds. Seasonal traffic patterns, deployment-correlated spikes, and known-good variance windows were all factored in. The model assigned anomaly scores rather than binary alerts.',
      },
      {
        title: 'Auto-Resolution Workflows',
        emphasis: 'feature',
        description:
          'For the 15+ failure patterns that were well-understood and repeatedly occurring, built automated remediation workflows: cache flushes on memory saturation signals, auto-scaling triggers on traffic anomalies, queue resets on message backlog spikes, container restarts on unhealthy health checks. These handled 94% of issues without human intervention.',
      },
      {
        title: 'Alert Routing & On-Call Optimization',
        description:
          'Redesigned the alert routing logic to eliminate notification fatigue. High-confidence, high-severity signals paged the on-call engineer with full context attached. Low-confidence signals were logged, scored, and monitored without triggering pages. MTTR dropped 40%.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Signal Audit',
        description:
          'Audited dashboards, alerts, and incident history across the platform to identify where fragmented monitoring was hiding problems instead of surfacing them.',
      },
      {
        label: 'Phase 2: Observability Unification',
        description:
          'Connected Datadog APM and CloudWatch into a shared observability plane so application traces and infrastructure signals could be read as one system.',
      },
      {
        label: 'Phase 3: Anomaly Intelligence',
        description:
          'Built the scoring model that compared live signals against historical baselines and produced confidence-weighted anomalies instead of noisy threshold alerts.',
      },
      {
        label: 'Phase 4: Auto-Resolution & On-Call Tuning',
        description:
          'Automated the known failure patterns, tightened alert routing, and reduced the number of human interventions required to keep the platform healthy.',
      },
    ],
    outcome:
      '99.98% uptime SLA — held consistently across all brand properties. 94% of issues auto-resolved before a human was ever notified. Mean time to resolution dropped 40%. The platform stopped finding out about problems from users.\n\nThe platform went from reactive firefighting to proactive infrastructure management. The observability layer was no longer something engineers checked during incidents. It became something the system acted on continuously.',
    whatThisMeansForYou:
      'If your team is still finding out about production issues from users or Slack notifications, you don\'t have observability — you have lag. I can build the layer that changes that. That\'s what I build.',
    ctaLine: 'stop firefighting and start running infrastructure that manages itself',
  },

  // ── The Fortress ──────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'the-fortress')!,
    titleTag: 'The Fortress — Web Security Architecture & Cloudflare WAF | Darling MarTech',
    metaDescription:
      'How Cloudflare WAF deployment, DNSSEC enforcement, and Authenticated Origin Pulls blocked 85k+ threats/month and cut server CPU load 40%.',
    subhead:
      'Most websites are exposed in ways their owners don\'t know about. I built a layered security architecture that eliminated direct origin exposure, absorbed tens of thousands of threats per month, and made the infrastructure invisible to everything that wasn\'t legitimate traffic.',
    challenge:
      'A high-traffic web platform was operating with its origin server directly exposed. That\'s a problem most site owners don\'t think about until it\'s too late: if an attacker can find your origin IP, your CDN and your firewall become irrelevant. They route around the protection entirely and hit the server raw.\n\nThis platform also had no meaningful bot mitigation, no DNS security layer, and an infrastructure that was taking on resource load from malicious traffic — not just serving real users. Server performance was degrading. Costs were climbing. And the exposure meant that any determined attacker could take the whole thing offline at will.',
    approach:
      'The strategy was to treat the CDN as a full security perimeter, not just a performance layer. Most teams deploy Cloudflare and call it done. That\'s not enough — because if your origin IP is discoverable (and it often is, through DNS history, certificate transparency logs, or brute-force scanning), the CDN becomes optional for an attacker.\n\nTrue origin hardening means making the server invisible and unreachable to anything that doesn\'t come through the proxy. That\'s the goal I started with: not just filtering traffic at the edge, but ensuring there was no path to the origin that bypassed the edge entirely.',
    deliverables: [
      {
        title: 'Cloudflare WAF Deployment & Tuning',
        emphasis: 'feature',
        description:
          'Deployed Cloudflare Web Application Firewall with custom ruleset tuned to the platform\'s actual traffic profile. OWASP Core Ruleset enabled and configured to minimize false positives. Result: 85,000+ threats blocked per month at the edge, before they ever reached the origin.',
      },
      {
        title: 'Authenticated Origin Pulls',
        emphasis: 'feature',
        description:
          'Configured Cloudflare Authenticated Origin Pulls — a mutual TLS (mTLS) handshake that ensures the origin server only accepts connections from Cloudflare\'s edge. Any direct-to-origin request receives a TLS rejection. Direct origin exposure: zero.',
      },
      {
        title: 'DNSSEC Enforcement',
        description:
          'Enabled and enforced DNSSEC across all zones. DNS records are now cryptographically signed — preventing DNS cache poisoning, spoofing, and man-in-the-middle attacks at the resolution layer.',
      },
      {
        title: 'Bot & DDoS Mitigation',
        description:
          'Configured Cloudflare Bot Management rules and rate limiting across high-value endpoints. Automated credential stuffing, scraping, and volumetric DDoS attempts are challenged or blocked before they consume server resources. Server CPU load dropped 40% post-deployment.',
      },
      {
        title: 'Firewall Rules & Page Rules',
        description:
          'Built a layered ruleset covering geographic restrictions on admin paths, challenge requirements for suspicious behavioral signals, and page-level caching rules that reduced origin hits for static and semi-static content.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Exposure Audit',
        description:
          'Confirmed the direct-origin risk, mapped the current traffic path, and identified the DNS and certificate signals that could allow attackers to route around edge protection.',
      },
      {
        label: 'Phase 2: Edge Security Deployment',
        description:
          'Deployed Cloudflare WAF, bot mitigation, and rate limiting with rules tuned to the platform\'s real traffic behavior rather than generic defaults.',
      },
      {
        label: 'Phase 3: Origin Lockdown',
        description:
          'Implemented Authenticated Origin Pulls and DNSSEC so the origin would only accept traffic from the edge and the resolution layer could not be spoofed.',
      },
      {
        label: 'Phase 4: Performance & Threat Tuning',
        description:
          'Adjusted firewall behavior, caching rules, and challenge thresholds to reduce server load while holding a tighter perimeter against ongoing malicious traffic.',
      },
    ],
    outcome:
      'Within the first billing cycle post-deployment, 85,000+ threats were blocked at the edge per month. Server CPU load dropped 40% as malicious and automated traffic stopped reaching the origin. Direct-to-origin attack surface: closed entirely.\n\nThe platform stopped being something the team had to watch and defend manually. The architecture handled threat response automatically — WAF rules fired, bad bots were challenged, rate limits held. No origin bypass attempts succeeded after deployment.',
    whatThisMeansForYou:
      'If your site is behind a CDN but your origin IP is discoverable, you don\'t have a security perimeter — you have an illusion of one. The fix isn\'t complicated. But it has to be done right. That\'s what I build.',
    ctaLine: 'lock down your infrastructure the right way',
  },

  // ── The Launchpad ─────────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'the-launchpad')!,
    titleTag: 'The Launchpad — Marketing Automation & Member Lifecycle System | Darling MarTech',
    metaDescription:
      'How a headless LearnDash-to-FluentCRM webhook bridge automated the full member lifecycle — enrollment, access, and CRM sequences — with zero manual steps and 95% overhead reduction.',
    subhead:
      'A membership and course platform was drowning in manual enrollment operations — tagging members by hand, provisioning course access one-by-one, and running follow-up sequences that depended on someone remembering to send them. I automated the entire lifecycle.',
    challenge:
      'Membership businesses have a lifecycle problem that gets worse as they scale. At 50 members, manual enrollment is annoying. At 500, it\'s a part-time job. At 5,000, it\'s a full-time operations role that exists purely to do work a system should be doing.\n\nThis platform was running LearnDash for course delivery and FluentCRM for member communication — two solid tools that weren\'t talking to each other. Every new member triggered a chain of manual steps: enroll in the course, assign the correct access tier, tag the CRM record, trigger the welcome sequence, set up progress tracking, schedule milestone emails. Miss one step, and the member experience broke.',
    approach:
      'The architectural insight was that LearnDash and FluentCRM didn\'t need to be directly integrated — they needed to communicate through a webhook bridge that could translate enrollment events into CRM actions in real time. Every meaningful state change in the member journey (new enrollment, course completion, tier upgrade, cancellation) should fire a webhook, and that webhook should trigger a precise set of CRM actions.\n\nI designed the system as headless directory architecture: the platform\'s membership directory lived as a central data layer, with LearnDash as the course delivery surface and FluentCRM as the communication and segmentation layer. The webhook bridge was the nervous system connecting them.',
    deliverables: [
      {
        title: 'LearnDash-to-FluentCRM Webhook Bridge',
        emphasis: 'feature',
        description:
          'Built a custom webhook handler that captured every LearnDash enrollment event — new member, course access, group assignment, completion — and translated each into a real-time FluentCRM API call. No polling, no cron jobs, no lag. When a member enrolled, CRM was updated within seconds.',
      },
      {
        title: 'Headless Directory Architecture',
        description:
          'Restructured the membership directory as a standalone data layer, decoupled from the course delivery UI. This gave the platform flexibility to change course structure or CRM tooling without rebuilding the enrollment logic.',
      },
      {
        title: 'Full Lifecycle CRM Automation',
        emphasis: 'feature',
        description:
          'Mapped the complete member lifecycle — from first enrollment through active engagement, milestone completions, at-risk signals, and cancellation — and built FluentCRM automation sequences for each stage. Welcome sequences, progress nudges, completion congratulations, re-engagement campaigns, and offboarding flows all triggered automatically.',
      },
      {
        title: 'Access Tier Management',
        description:
          'Built logic to handle multi-tier membership access — free, paid, and premium tiers with different course bundles — and automated the provisioning and revocation of access based on payment status.',
      },
      {
        title: 'Monitoring & Error Handling',
        description:
          'Built webhook failure logging and retry logic so that any enrollment event that failed to process was queued, retried, and escalated for review if it failed three times. No silent failures.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Lifecycle Mapping',
        description:
          'Mapped every manual handoff between enrollment, access provisioning, CRM tagging, and follow-up so the automation design matched the real member journey.',
      },
      {
        label: 'Phase 2: Integration Bridge',
        description:
          'Built the webhook layer between LearnDash and FluentCRM so every important state change in the course platform could trigger CRM actions in real time.',
      },
      {
        label: 'Phase 3: Automation Coverage',
        description:
          'Configured onboarding, progress, re-engagement, and cancellation sequences so the lifecycle ran automatically across every major membership state.',
      },
      {
        label: 'Phase 4: Reliability Layer',
        description:
          'Added monitoring, retries, and escalation paths to ensure that failed webhook events were recoverable and never became silent experience breaks for members.',
      },
    ],
    outcome:
      'Manual enrollment overhead dropped 95%. The team that was spending hours per week on enrollment operations stopped doing it entirely. CRM sequences now fired automatically on every trigger. Member onboarding time dropped from days to under three minutes.\n\nSupport tickets related to missing course access or missing welcome emails dropped to near zero. Members got what they paid for, when they paid for it, with no friction and no waiting for someone to process their enrollment.',
    whatThisMeansForYou:
      'If your membership platform, course business, or subscription product relies on manual steps between checkout and delivery, you\'re creating inconsistency at scale and paying someone to do work a system should own. That\'s a fixable problem. That\'s what I build.',
    ctaLine: 'automate the work your team shouldn\'t be doing',
  },

  // ── Graston Growth Engine ─────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'graston-growth-engine')!,
    titleTag: 'Graston Growth Engine — Provider Directory & Two-Sided Growth Platform | Darling MarTech',
    metaDescription:
      'Proof build for Graston Technique: Next.js directory with map-synced Supabase spatial search, provider performance analytics, Premier ROI modeling, and AI-assisted support routing — live on Vercel.',
    subhead:
      'The clinician directory was the main patient acquisition surface, but it behaved like a static export. I rebuilt it as a product: patients get precise local results; providers see why Premier membership pays for itself.',
    challenge:
      'For Graston Technique, the provider directory is the primary patient acquisition touchpoint — but it was built like a static list, not a growth asset. Patients could not filter by location with precision. Providers had no honest view of profile performance. Clinical education was buried in manual support work that self-service and automation could absorb.\n\nScale broke in two directions: the patient path was too slow and imprecise for high-intent local search, and the provider path gave clinicians no reason to stay engaged between certification renewals.\n\nThe answer was not cosmetic search UI. It was treating the directory as a two-sided marketplace — measurable ROI for providers, real-time relevance for patients.',
    approach:
      'I shipped a Next.js App Router front end with Supabase PostgreSQL as the system of record for profiles, tiers, training levels, and support tickets.\n\nSpatial search is the technical spine: Google Maps exposes the viewport LatLngBounds; a debounced idle listener (300ms) batches fetches so the provider list stays synced with the map without hammering the database — the same pattern premium real estate products use.\n\nThe Provider Hub makes retention rational: profile views, site click-throughs, and funnel metrics tie to Premier positioning, including projected annual revenue under stated patient volume assumptions. The AI Assistant Console layers keyword-based ticket routing, after-hours auto-replies, and VIP escalation so corporate support scales without losing quality.',
    deliverables: [
      {
        title: 'Map-Synced Spatial Directory',
        emphasis: 'feature',
        description:
          'Viewport-bound Supabase queries against provider LatLng data with debounced updates — patients see who is actually near them as the map moves.',
      },
      {
        title: 'Provider Hub & Premier ROI Surface',
        emphasis: 'feature',
        description:
          'Per-provider analytics plus Recharts dashboards that make profile performance and upgrade economics visible — including projected revenue for Premier tiers.',
      },
      {
        title: 'Admin Command Center',
        description:
          'Operations view for support load, VIP alerts, and automation performance so the team can manage a national network without flying blind.',
      },
      {
        title: 'AI Assistant Console',
        description:
          'Rules-driven routing for billing vs clinical vs onboarding paths, after-hours coverage, and escalation — less manual triage on repetitive tickets.',
      },
      {
        title: 'Supabase Schema & Membership Logic',
        description:
          'Normalized model for profiles, membership tiers, and tickets so directory, analytics, and support share one source of truth.',
      },
    ],
    process: [
      { label: 'Product framing', description: 'Defined two-sided success metrics — patient relevance and provider ROI — before touching schema design.' },
      { label: 'Spatial + data layer', description: 'Implemented Supabase spatial filtering, map integration, and debounce strategy for production-scale queries.' },
      { label: 'Provider + ops surfaces', description: 'Built Provider Hub analytics, Premier storytelling, admin command center, and automation console in parallel.' },
      { label: 'Launch & iteration', description: 'Rolled out on Vercel with continuous tuning on performance, SEO-critical directory pages, and support workflows.' },
    ],
    outcome:
      'Patients moved from paginated lists to real-time, map-aligned discovery. Providers shifted from passive listings to an active hub with defensible reasons to maintain profiles and consider Premier investment.\n\nThe automation layer multiplied clinical team capacity — faster routing, fewer repetitive touches, clearer escalation — without adding headcount.\n\nThis build sits inside the larger Graston platform story: +212% qualified leads, 95% overhead reduction, and 48 hours per week returned across the automation program. The Growth Engine is the public proof that the directory itself became revenue infrastructure, not a brochure.',
    whatThisMeansForYou:
      'If your "directory" is really a database dump with a map pin on top, you are leaving patient intent and provider retention on the table. I build directories as products with measurable economics. That is what I build.',
    ctaLine: 'turn your directory into a growth and retention engine',
    problemVisualPublicId: 'graston-growth-engine_-_for_providers',
    cloudinaryAssets: [
      { publicId: 'graston-growth-engine_-_for_providers', label: 'Graston Growth Engine provider hub', folder: 'studio/projects/graston-technique' },
      { publicId: 'graston-growth-engine_-_admin_command_center', label: 'Graston Growth Engine admin command center', folder: 'studio/projects/graston-technique' },
      { publicId: 'graston-growth-engine_-_ai_assistant', label: 'Graston Growth Engine AI assistant console', folder: 'studio/projects/graston-technique' },
    ],
  },

  // ── Smart Sales & Pricing Tool (Graston) ──────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'smart-sales-pricing')!,
    titleTag: 'Smart Sales & Pricing Tool — Live Quoting Engine for Graston Sales | Darling MarTech',
    metaDescription:
      'Proof build: self-contained pricing calculator for Graston certification bundles and equipment — +38% lead-to-demo conversion, sub-two-minute quotes, rebuilt once on real rep usage.',
    subhead:
      'Complex bundles and institutional tiers were stalling demos. I gave reps a browser-tab calculator that answers pricing accurately while the prospect is still on the line.',
    challenge:
      'Graston\'s catalog mixed certifications, equipment configurations, and institutional tiers. Reps were assembling quotes in spreadsheets — wrong numbers eroded trust, and the lag between demo questions and emailed quotes killed momentum.\n\nThe failure mode was not "bad math." It was timing. Prospects who wait two days for a quote are not the same prospects you had live on the call.\n\nThe goal was zero-latency accuracy: configure live, show the number immediately, eliminate the follow-up gap.',
    approach:
      'I optimized for field use first: vanilla HTML, CSS, and JavaScript — no install, no login, a tab open next to Zoom.\n\nAll bundle discounts, tier rules, and equipment options live in a single calculation module so updates stay centralized. The UX pattern is real-time recalculation — every input change immediately refreshes totals so reps and prospects watch the number move together.\n\nVersioning was deliberate. v1 shipped fast to get real call usage; after 60 days of feedback, v2 rebuilt the interface around how reps actually navigated bundles while preserving the proven engine.',
    deliverables: [
      {
        title: 'Real-Time Pricing Engine',
        emphasis: 'feature',
        description:
          'JavaScript configuration object encoding bundles, discounts, and institutional rules — one module to maintain, immediate outputs on every change.',
      },
      {
        title: 'Sales-Call UX (v1 → v2)',
        description:
          'Shipped quickly, observed real demos, then redesigned flows for how reps configured quotes under pressure — without rewriting trusted math.',
      },
      {
        title: 'Zero-Dependency Deployment',
        description:
          'Static asset pattern so reps anywhere can run quotes offline-friendly and IT-light — critical for conference floors and remote sales.',
      },
    ],
    process: [
      { label: 'v1 sprint', description: 'Locked core pricing rules and shipped a working calculator into reps\' hands within days.' },
      { label: 'Field observation', description: 'Collected 60 days of real-call feedback on sequencing, defaults, and error prevention.' },
      { label: 'v2 rebuild', description: 'Rebuilt interaction design around observed behavior while keeping the calculation core stable.' },
    ],
    outcome:
      'Lead-to-demo conversion improved 38% when pricing could be answered live, accurately, with full configuration detail — prospects did not need to "think about it" in a follow-up void.\n\nInternal friction dropped: reps stopped hand-building spreadsheet quotes; pricing stopped answering one-off "what if" emails.\n\nProof statement from the engagement: shipping a credible v1 and iterating on usage beats designing a perfect tool in isolation — and a disciplined JS file can replace a week of spreadsheet labor.',
    whatThisMeansForYou:
      'If your sales team is still the bottleneck between curiosity and a number, the fix is usually not more headcount — it is a calculator with your rules baked in. I build those systems. That is what I build.',
    ctaLine: 'give sales accurate numbers in the moment prospects still care',
    problemVisualPublicId: 'Graston_Technique_Smart_Pricing_Tool_-_home',
    cloudinaryAssets: [
      {
        publicId: 'Smart_Pricing_Tool-phone',
        label:
          'Illustrative scene: rep on a live call with the Smart Sales & Pricing workspace — how the tool sits beside real sales conversations',
        folder: 'studio/labs/Graston Technique® Smart Pricing Tool',
      },
      {
        publicId: 'Graston_Technique_Smart_Pricing_Tool_-_home',
        label:
          'Graston Smart Sales & Pricing Tool — shipped web UI (bundles, equipment, institutional tiers)',
        folder: 'studio/labs/Graston Technique® Smart Pricing Tool',
      },
    ],
  },

  // ── Investment ROI Planner (Graston) ─────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'investment-roi-planner')!,
    titleTag: 'Investment ROI Planner — Self-Serve Certification Economics for Graston | Darling MarTech',
    metaDescription:
      'Proof build: embedded ROI planner answering certification payback before sales touch — three inputs, visual payback output, cited in +212% qualified lead lift for Graston Technique.',
    subhead:
      'The main objection was not clinical — it was economic. I built a top-of-funnel planner so practitioners validated payback themselves before the first rep conversation.',
    challenge:
      'Graston certification is a serious investment. The recurring objection in pipeline was practical: will this pay off for my practice?\n\nReps were burning call time on ROI math. Prospects arrived uncertain, so discovery calls fought economics instead of timing.\n\nThe strategic move was to qualify economically before the human conversation — answer the money question when intent is highest, on the marketing site, in under two minutes.',
    approach:
      'I deployed a vanilla HTML/CSS/JS experience embedded with Graston\'s properties — instant load, no framework tax, easy to host alongside existing pages.\n\nThe model stays intentionally simple: sessions per week, fee per session, certification cost — enough to produce credible monthly ROI and payback framing without pretending to be an FP&A suite.\n\nResults render in a visual panel prospects can screenshot for partners. A tight inline CTA captures hand-raisers at peak conviction — right after the math works in their heads.',
    deliverables: [
      {
        title: 'JavaScript Financial Model',
        emphasis: 'feature',
        description:
          'Transparent ROI and payback calculations tuned to certification economics — simple inputs, defensible outputs, easy to adjust as pricing evolves.',
      },
      {
        title: 'Embedded Lead Asset',
        description:
          'Positioned on research paths where practitioners self-educate — not a rep-only tool — so marketing qualifies before sales spends cycles.',
      },
      {
        title: 'Conversion-Optimized Results + CTA',
        description:
          'Results panel structured for clarity and shareability; CTA placed immediately after confirmation bias lands in the prospect\'s favor.',
      },
    ],
    process: [
      { label: 'Model design', description: 'Aligned inputs with how practitioners already think about weekly caseload and reimbursement.' },
      { label: 'Build + embed', description: 'Shipped lightweight static asset for fast load and simple governance alongside core site.' },
      { label: 'Funnel integration', description: 'Connected planner completion to CRM capture and sales follow-up rules.' },
    ],
    outcome:
      'The planner became a primary driver behind a 212% increase in qualified lead volume. Practitioners who ran the math showed up ready — calls shifted to logistics and timing instead of "is this worth it."\n\nSales reclaimed time previously spent on spreadsheet education and moved it into closing.\n\nThis is the same throughline as the broader Graston automation story: let systems qualify so humans close.',
    whatThisMeansForYou:
      'If your funnel leaks because prospects cannot self-validate economics, a calculator is often the highest-ROI asset you can ship. I build those proofs. That is what I build.',
    ctaLine: 'let the math qualify leads before your calendar does',
    problemVisualPublicId: 'Graston_Technique_ROI_Calculator_-_main',
    cloudinaryAssets: [
      { publicId: 'Graston_Technique_ROI_Calculator_-_main', label: 'Investment ROI Planner main view', folder: 'studio/projects/graston-technique' },
      { publicId: 'Graston_Technique_ROI_Calculator_-_2', label: 'Investment ROI Planner detail view', folder: 'studio/projects/graston-technique' },
    ],
  },

  // ── Clinical Compass (Graston) ────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'clinical-compass')!,
    titleTag: 'Clinical Compass — Point-of-Care Protocol System for Graston | Darling MarTech',
    metaDescription:
      'Proof build: self-contained clinical decision paths for 400+ Graston practitioners — JSON decision trees, progressive disclosure, and a sharp drop in protocol support load within 90 days.',
    heroPublicId: 'Generated_Image_April_12_2026_-_4_24AM',
    subhead:
      'Institutional knowledge was trapped in PDFs and callbacks. I shipped a zero-dependency experience practitioners could run between patients — and gave clinical education a maintainable content layer.',
    challenge:
      'Graston Technique supports hundreds of certified clinicians who need the right protocol at the point of care. The guidance lived in documents, email, and tribal knowledge — so practitioners waited, and the clinical team burned nearly two days a week repeating the same answers.\n\nThat is not a communication problem. It is a scale problem. Every delayed answer is friction at the moment of treatment; every repeated call is capacity the organization cannot get back.\n\nThe bar was high: fast enough for a busy clinic, accurate enough for clinical trust, simple enough for the education team to evolve without a release train.',
    approach:
      'I built Clinical Compass as vanilla HTML, CSS, and JavaScript — no framework surface area, embeddable anywhere Graston already hosted practitioners, instant load, offline-friendly in practice.\n\nThe logic is a branching decision tree in JSON the UI walks one question at a time — the same progressive disclosure pattern clinicians already expect from assessment flows. Updates ship as data edits, not redeploys.\n\nDistribution matched real behavior: practitioner portal, email deep links, QR codes at live training — anywhere a question used to become a ticket.',
    deliverables: [
      {
        title: 'JSON-Backed Clinical Pathways',
        emphasis: 'feature',
        description:
          'Decision tree structure separating presentation from content so clinical staff can revise branches and outcomes without touching application code.',
      },
      {
        title: 'Progressive Disclosure UX',
        emphasis: 'feature',
        description:
          'Single-question steps to protect cognitive load at the point of care — protocol summary only when the path resolves.',
      },
      {
        title: 'Embed-Anywhere Static Delivery',
        description:
          'Self-contained asset with no API dependency — suitable for tight security postures, fast first paint, and conference-floor usage.',
      },
    ],
    process: [
      { label: 'Workflow audit', description: 'Mapped top protocol questions driving volume into the clinical support queue.' },
      { label: 'Tree modeling', description: 'Encoded pathways in JSON with clinical stakeholders validating branch logic.' },
      { label: 'Ship + embed', description: 'Rolled out across practitioner touchpoints and monitored support ticket mix.' },
    ],
    outcome:
      'Reached 400+ certified practitioners with immediate self-serve access. Protocol support calls fell sharply in the first 90 days — reclaiming roughly two days per week previously lost to repetition.\n\nThe deeper win was experiential: practitioners stopped associating Graston support with waiting. Answers arrived in under two minutes, which is the difference between a vendor relationship and a loyalty relationship at clinical depth.\n\nThis sits alongside the flagship Graston automation story — another proof that the right lightweight system can retire entire support categories.',
    whatThisMeansForYou:
      'If your experts are answering the same specialized questions on loop, the fix is rarely "hire another person." It is usually structured knowledge with a UI that respects how the work actually happens. I build that. That is what I build.',
    ctaLine: 'retire repetitive expert answers with a system the business can own',
    problemVisualPublicId: 'graston_instruments_-_clinical_compass-summary',
  },

  // ── License Requirements Navigator (Graston) ─────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'license-requirements')!,
    titleTag: 'License Requirements Navigator — State Licensing Intelligence for Graston | Darling MarTech',
    metaDescription:
      'Proof build: 50-state CE and credential lookup for Graston practitioners — two-step client-side tool, editable JSON data layer, licensing support volume effectively eliminated post-launch.',
    heroPublicId: 'Generated_Image_April_12_2026_-_2_52AM',
    subhead:
      'Regulatory reality varies by state and credential. I turned it into structured data and a two-field lookup so practitioners stopped opening tickets for answers they could own themselves.',
    challenge:
      'Healthcare licensing is not one rule — it is fifty jurisdictions multiplied by credential types. Graston\'s clinical education team fielded constant, high-stakes questions: does this course count, how many CEUs, what about renewal in this state?\n\nWrong answers are not annoyances — they are renewal risk for the practitioner and liability risk for the brand.\n\nThe organization needed authoritative, state-specific answers without turning the team into a lookup desk.',
    approach:
      'I shipped a vanilla HTML/CSS/JS experience with a two-step pattern: state, then credential type — minimal inputs, maximal clarity.\n\nAll fifty states live in a structured JSON dataset designed for non-developer maintenance when statutes change. The runtime is entirely client-side: no API latency, works in waiting rooms and conference halls, respects conservative hosting constraints.\n\nOutputs spell out which Graston certifications apply, CEU credit, and renewal considerations in plain language — the same reassurance a support call used to provide.',
    deliverables: [
      {
        title: '50-State JSON Licensing Dataset',
        emphasis: 'feature',
        description:
          'Normalized records per state and credential path with an update workflow the clinical team could own when regulations shift.',
      },
      {
        title: 'Two-Step Lookup UX',
        emphasis: 'feature',
        description:
          'Reduced cognitive load to two decisions before surfacing a definitive compliance-oriented answer.',
      },
      {
        title: 'Client-Side Runtime',
        description:
          'Zero network round-trips for lookups — fast, portable, and embeddable on the practitioner portal without backend coupling.',
      },
    ],
    process: [
      { label: 'Content architecture', description: 'Structured state and credential dimensions with legal-education review of critical fields.' },
      { label: 'Build + validate', description: 'Implemented lookup engine and spot-checked high-volume state and role combinations.' },
      { label: 'Operational handoff', description: 'Documented JSON edit path so updates did not require engineering for routine changes.' },
    ],
    outcome:
      'Post-launch, licensing questions effectively dropped to zero as a support category. Practitioners received accurate answers in under a minute on their own time.\n\nClinical education reclaimed hours previously spent on repetitive lookups — hours that went back into curriculum and higher-value practitioner support.\n\nThe project also signaled credibility: a national training brand that indexed fifty regulatory regimes was visibly meeting practitioners in their real compliance world.',
    whatThisMeansForYou:
      'If compliance or policy questions are eating your team alive, structured data plus a disciplined UX often removes the entire queue. I build those systems. That is what I build.',
    ctaLine: 'turn compliance FAQs into self-serve truth',
    problemVisualPublicId: 'Practitioner_License_Requirements_I_Graston_Technique_-_search_2',
    cloudinaryAssets: [
      { publicId: 'Practitioner_License_Requirements_I_Graston_Technique_-_search', label: 'License Requirements Navigator search', folder: 'studio/projects/graston-technique' },
      { publicId: 'Practitioner_License_Requirements_I_Graston_Technique_-_search_2', label: 'License Requirements Navigator results', folder: 'studio/projects/graston-technique' },
    ],
  },

  // ── Tuohy Bailey & Moore ──────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'tuohy-bailey-moore')!,
    titleTag: 'Tuohy Bailey & Moore LLP — Law Firm Brand Refresh & Website | Darling MarTech',
    metaDescription:
      'How a full brand refresh and website revitalization cut bounce rates 45% and grew contact form submissions 60% for an established Indianapolis law firm.',
    subhead:
      'Tuohy Bailey & Moore had the credibility. The client results. The decades of track record. What they lacked was a brand and website that communicated any of it. I fixed that.',
    challenge:
      'Legal buyers make decisions before they ever pick up the phone. They land on a site, spend about eight seconds deciding whether this firm looks credible and serious, then either call or leave. The merits of the case don\'t matter if the first impression doesn\'t hold.\n\nTuohy Bailey & Moore was an established Indianapolis firm with over 200 years of combined attorney experience, a broad practice spanning business law, real estate, civil litigation, estate planning, employment, and zoning, and a reputation built across decades of real work. None of that was visible on the screen. The brand felt dated. The visual system had no clear hierarchy. The website carried the substance of a serious firm but didn\'t feel like one.',
    approach:
      'The strategic insight that unlocked this project was simple: in legal services, design is not decoration. It is evidence. Every visual choice — the weight of a typeface, the depth of a color palette, the structure of a page layout — tells a prospect something about how the firm thinks and operates. Weak design communicates weak attention to detail. That is a devastating signal in a trust-driven category.\n\nSo the solution wasn\'t about making things prettier. It was about making the brand do the persuasion work that the firm\'s attorneys were already doing in consultation rooms. I needed to build a visual and digital system where every touchpoint was communicating stability, clarity, and authority before a single word was read.',
    deliverables: [
      {
        title: 'Logo & Visual Identity System',
        description:
          'Rebuilt the mark from the ground up. The new identity is anchored in a deep burgundy/wine tone and warm charcoal gray — grounded, professional, nothing trendy. The symbol uses interlocking geometric forms that communicate structure and continuity. The result is a mark that holds weight, works at every scale, and positions the firm as serious without feeling cold.',
      },
      {
        title: 'Brand Playbook',
        description:
          'Delivered a full brand playbook covering typography usage, color application, imagery direction, voice and tone guidelines, and application examples. This became an internal resource the firm could use to maintain brand consistency across every future touchpoint. Produced ~95% brand consistency across touchpoints after six months of use.',
      },
      {
        title: 'Website Architecture & Content Strategy',
        description:
          'The site had to support a robust and content-heavy practice architecture: business transactions, civil litigation, commercial law, employment law, estate planning, land use and zoning, local conflict counsel, and real estate transactions. Each practice area page was built around both the business case and the human case.',
      },
      {
        title: 'Trust-Signal Design',
        description:
          'The homepage was designed around the firm\'s strongest credibility pillars: founded in 1978, downtown Indianapolis presence, 200+ years of combined experience, and prompt responsiveness. These aren\'t bullet points on an About page. They\'re conversion assets. I made sure they were visible, legible, and placed where they\'d actually be seen.',
      },
      {
        title: 'SEO & Technical Foundation',
        description:
          'Keyword research and SEO structure were built into the site from the start — not bolted on. Practice-area pages were structured around the intent-based searches a prospective client would actually run, from "business attorney Indianapolis" to "estate planning lawyer near me."',
      },
    ],
    outcome:
      'The results were immediate and measurable. Bounce rate dropped 45%. Contact form submissions climbed 60%. Inbound inquiries grew roughly 40% post-launch.\n\nBut the more durable outcome was internal. The brand playbook became a working tool — something the firm actually used to maintain consistency as they grew. That kind of consistency compounds over time. It turns a rebrand from a one-time event into a long-term competitive asset.',
    whatThisMeansForYou:
      'If you\'re running a firm — or any professional services practice — where your website doesn\'t reflect the actual quality of your work, you\'re losing clients to competitors who look more credible, even if they\'re less capable. That gap is fixable. That\'s what I build.',
    ctaLine: 'close the gap between your reputation and your digital presence',
    cloudinaryAssets: [
      { publicId: 'tbm-logo-anchor', label: 'Tuohy Bailey & Moore logo', folder: 'studio/projects/tuohy-bailey-moore' },
      { publicId: 'law-firm-18', label: 'Tuohy Bailey & Moore office photography', folder: 'studio/projects/tuohy-bailey-moore' },
    ],
  },

  // ── UrgentCare Indy ───────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'urgentcare-indy')!,
    titleTag: 'UrgentCare Indy — Healthcare Brand, Website & Patient Acquisition | Darling MarTech',
    metaDescription:
      'How a full digital rebuild cut wait-time friction, drove 35% more online bookings, and made online check-in the default for 60% of UrgentCare Indy patients.',
    problemVisualPublicId: 'urgentorED3',
    subhead:
      'UrgentCare Indy needed a digital front door that matched the speed and clarity of the care inside. I rebuilt it from the brand up — and turned a frustrating check-in process into a conversion system.',
    challenge:
      'Urgent care is a category where your website is doing triage before the patient walks in the door. Someone lands on your page in pain, anxious, probably on a phone, and they need three things answered immediately: Can this clinic treat what I have? How fast can I be seen? How hard is this going to be?\n\nIf those three questions aren\'t answered in the first scroll, they\'re gone — likely to a competitor who looked faster and clearer.\n\nUrgentCare Indy, part of the Pike Medical ecosystem alongside a primary care division, had built a solid clinical operation. What it hadn\'t built was a digital experience that matched the quality of the care inside. The brand was underdeveloped, the website wasn\'t built around how stressed patients actually use the web, and the check-in process created friction right at the moment patients most needed ease.',
    approach:
      'The strategic phrase that anchored this project was "urgency meets trust." It sounds simple. It\'s actually a hard balance to build.\n\nUrgent care sites that lean too far into speed can feel chaotic or cold. Sites that over-engineer trust signals can feel slow and clinical. The correct position is something more like: fast and calm. Move the patient quickly through the information they need, but do it in a way that makes them feel like they\'re in good hands.\n\nThat translated into a brand identity built around calm blues and greens, rounded geometric typography, and a modernized medical-cross concept that communicated both speed and reassurance. From there, I structured the entire digital experience around the real questions patients ask — not the service categories a clinic thinks patients should care about.',
    deliverables: [
      {
        title: 'Brand Identity',
        description:
          'Developed the brand system from scratch — logo, color palette, typography, and an identity designed to scale across signage, patient badges, print, and digital. The primary mark combined a medical cross with forward-motion design language: fast access to care without sacrificing warmth or professionalism.',
      },
      {
        title: 'Website Redesign (WordPress, Mobile-First)',
        emphasis: 'feature',
        description:
          'Built on WordPress with a mobile-first layout — because urgent care patients are almost universally on a phone, in a hurry, often anxious. I structured the homepage to immediately surface: conditions treated, clinic hours, insurance and self-pay options, online check-in, and a direct bridge into PrimaryCare Indy for continuity of care.',
      },
      {
        title: 'Clockwise MD / Online Check-In Integration',
        emphasis: 'feature',
        description:
          'Integrated Clockwise MD for real-time online check-in and live wait-time estimates. This single feature changed how patients interacted with the clinic before they arrived — giving them control over timing, reducing lobby dwell time. Result: 60% of visits shifted to online check-in, and average wait time dropped 30%.',
      },
      {
        title: 'Transparent Pricing',
        description:
          'Built a dedicated Self-Pay Pricing page that publicly outlined tiered visit costs — $100, $200, $250, and $300 depending on visit complexity — with same-day cash and credit options. Cost uncertainty is one of the biggest friction points in urgent care. Making pricing visible before arrival is a trust signal.',
      },
      {
        title: 'Local SEO, Google Business & Paid Acquisition',
        description:
          'Ran keyword targeting for "urgent care Indianapolis" and nearby-area variations, built and optimized the Google Business profile with review management workflows, and ran ongoing Google Ads campaigns with geo-targeting, device optimization, custom landing pages, and monthly A/B testing.',
      },
      {
        title: 'Occupational Health & Employer Services',
        description:
          'Built out a dedicated Occupational Health section that repositioned UrgentCare Indy beyond consumer walk-ins: pre-employment physicals, drug screening, fit-for-duty exams, work injury care, and workers\' comp support.',
      },
    ],
    process: [
      {
        label: 'Phase 1: Urgency Audit',
        description:
          'Mapped the real patient decision path to identify where the existing site was creating friction for people who needed answers quickly on a phone.',
      },
      {
        label: 'Phase 2: Fast-and-Calm Experience Design',
        description:
          'Built the brand and site architecture around the balance of urgency and trust so patients could move quickly without the experience feeling chaotic.',
      },
      {
        label: 'Phase 3: Check-In & Pricing Infrastructure',
        description:
          'Integrated Clockwise MD, surfaced transparent self-pay pricing, and structured the site around the exact information patients need before arrival.',
      },
      {
        label: 'Phase 4: Search & Demand Optimisation',
        description:
          'Expanded visibility through local SEO, Google Business optimisation, and paid acquisition so the rebuilt experience had qualified patient demand flowing into it.',
      },
    ],
    outcome:
      'Online bookings climbed 35%. Online check-in accounted for 60% of all visits. Average patient wait time dropped 30%. Patient satisfaction scores rose 25%. Local search visibility reached the top 3 in Indianapolis.\n\nUrgentCare Indy stopped being a clinic with a website and started being a clinic with a digital patient acquisition system. Every layer of the experience — brand, site architecture, check-in flow, pricing transparency, local visibility, paid demand — was working together.',
    whatThisMeansForYou:
      'If you\'re running a clinic, a practice, or any healthcare service where the digital experience is working against your patient flow, the fix isn\'t a prettier website. It\'s a system built around how patients actually move when they\'re looking for care. That\'s what I build.',
    ctaLine: 'turn your clinic\'s website into a real patient acquisition system',
    cloudinaryAssets: [
      { publicId: 'urgentcare-logo-anchor', label: 'UrgentCare Indy logo', folder: 'studio/projects/urgentcare-indy' },
      { publicId: 'slide3-with-phone', label: 'UrgentCare Indy mobile website mockup', folder: 'studio/projects/urgentcare-indy' },
      { publicId: 'urgentorED3', label: 'UrgentCare Indy patient education graphic', folder: 'studio/projects/urgentcare-indy' },
      { publicId: 'Facebook-When-to-Go-Where', label: 'UrgentCare Indy channel education graphic', folder: 'studio/projects/urgentcare-indy' },
      { publicId: 'do_you_know_where_to_go_urgent_care__primary_care_or_er', label: 'UrgentCare Indy triage education graphic', folder: 'studio/projects/urgentcare-indy' },
    ],
  },

  // ── Blazing Star Therapy ──────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'blazing-star-therapy')!,
    titleTag: 'Blazing Star Therapy — Trust-Led Therapy Website Launch | Darling MarTech',
    metaDescription:
      'How a newly formed therapy practice launched with a calm, credibility-first website focused on service clarity, consultation readiness, and mobile usability.',
    problemVisualPublicId: 'blazing-star-therapy-mockup-on-screens',
    subhead:
      'Blazing Star Therapy needed a first website that could earn trust before a relationship existed. I built a calm, consultation-ready foundation that helps the right client move from uncertainty to first contact.',
    challenge:
      'New therapy practices face a different launch problem than established groups. There is no long track record to lean on, no large review footprint yet, and no brand familiarity in the market. That means the website has to earn trust quickly without feeling overdesigned or salesy.\n\nBlazing Star Therapy needed a digital presence that felt clear and human from the first visit: who this practice helps, how sessions work, what the service area includes, and how to request a consultation without friction. The risk was hesitation. If any of those answers felt vague, visitors would leave before reaching out.',
    approach:
      'The strategic move was restraint. Instead of overbuilding pages and features, I focused on the minimum credible website done well.\n\nI structured the site around trust signals and decision clarity: therapist positioning, plain-language service descriptions, consultation expectations, and a visible action path on desktop and mobile. The goal was not to impress with complexity. The goal was to reduce first-contact hesitation so the right visitor could say yes to the next step.',
    deliverables: [
      {
        title: 'Website Strategy & Launch Architecture',
        emphasis: 'feature',
        description:
          'Defined the core page structure, messaging hierarchy, and launch scope so the first version of the site could ship confidently without unnecessary complexity.',
      },
      {
        title: 'Trust-First Content Direction',
        description:
          'Built copy around therapist credibility, approach clarity, and what a first consultation looks like so potential clients could assess fit quickly and comfortably.',
      },
      {
        title: 'Service-Area & Session Clarity',
        description:
          'Structured key details around service area, session format, and client expectations to remove ambiguity that often blocks first contact in therapy journeys.',
      },
      {
        title: 'Consultation Path Design',
        emphasis: 'feature',
        description:
          'Created a straightforward consultation path with clear CTAs and low-friction next steps so the site supports action instead of adding decision fatigue.',
      },
      {
        title: 'Mobile-Ready Execution',
        description:
          'Ensured the launch experience stays legible, calm, and actionable on phones, where many first-time therapy searches and referrals are evaluated.',
      },
    ],
    outcome:
      'Blazing Star Therapy launched with a clear, trust-led digital presence that supports real decision-making instead of forcing visitors to interpret vague marketing language.\n\nThe site now gives prospective clients a clear way to assess fit, evaluate therapist credibility, and request a consultation without unnecessary friction. For a new practice, that decision clarity is the proof point: trust and clarity are now doing the work generic marketing language could not.',
    whatThisMeansForYou:
      'If you are launching a practice and your website still feels generic, you are asking people to trust you without giving them enough to trust. You do not need a massive build. You need the right structure, the right signals, and a clear next step. That is what this project demonstrates.',
    ctaLine: 'launch a trust-first practice site that makes the next step clear',
    cloudinaryAssets: [
      { publicId: 'blazing-star-therapy-hero-desktop', label: 'Blazing Star Therapy homepage', folder: 'studio/projects/blazing-star-therapy' },
      { publicId: 'blazing-star-therapy-about-desktop', label: 'Blazing Star Therapy about section', folder: 'studio/projects/blazing-star-therapy' },
      { publicId: 'blazing-star-therapy-mockup-on-screens', label: 'Blazing Star Therapy multi-device mockup', folder: 'studio/projects/blazing-star-therapy' },
      { publicId: 'blazing-star-therapy-consult-mobile', label: 'Blazing Star Therapy consultation section on mobile', folder: 'studio/projects/blazing-star-therapy' },
      { publicId: 'blazing-star-therapy-full-page-desktop', label: 'Blazing Star Therapy full-page website view', folder: 'studio/projects/blazing-star-therapy' },
    ],
  },

  // ── Behr Pet Essentials ───────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'behr-pet-essentials')!,
    titleTag: 'Behr Pet Essentials — E-Commerce Content Strategy & Conversion | Darling MarTech',
    metaDescription:
      'How an infographic-first content strategy drove a 28% cart value lift and cut support tickets by 40% for a veterinarian-backed organic pet care brand.',
    subhead:
      'Behr Pet Essentials had a legitimately great product — organic, veterinarian-formulated, hypoallergenic. The problem was that great products don\'t sell themselves when buyers are skeptical. I built a content system that did.',
    challenge:
      'Organic pet care is a crowded, skeptical market. Buyers have been burned before — products claiming "natural" or "veterinarian-approved" that don\'t deliver. Behr Pet Essentials had real clinical backing and a genuinely superior formulation. But complex ingredient science doesn\'t convert when it lives in a wall of text.\n\nThe challenge: turn skeptical browsers into confident buyers, at scale, without a massive paid media budget.',
    approach:
      'The insight was simple: infographics are silent salespeople.\n\nA well-built infographic compresses clinical validation into a single scannable asset. Buyers don\'t need to read a product page — they need one image that answers every objection before they can raise it.\n\nI built an infographic-first content architecture for Behr Pet: every piece of creative designed to do a specific job at a specific stage of the buyer journey. Educational assets for awareness. Benefit-stacked graphics for consideration. Urgency-driven campaign creative for conversion. And a Complete Solution series that made cross-selling feel natural rather than pushy.\n\nThe secondary benefit: when you educate buyers visually before purchase, you massively reduce the questions they have afterward. Fewer support tickets. Happier customers. Lower operational cost.',
    deliverables: [
      {
        title: 'Infographic Content Architecture',
        description:
          'Designed the full content system: veterinarian-backed ingredient science translated into scannable trust signals. Clinical-style presentation that bridged the gap between consumer skepticism and purchase confidence. Each infographic deployed at the right pre-purchase touchpoint.',
      },
      {
        title: 'Complete Solution Series',
        description:
          'Cross-sell creative that communicated bundled product value without a single line of ad copy. One graphic, one visual hierarchy, one clear next step.',
      },
      {
        title: 'Direct-Response Campaign System',
        description:
          'A layered multi-channel campaign pairing urgency-driven sale banners with educational problem/solution assets — each piece engineered to convert a specific stage of the buyer journey. Benefit stacking, urgency architecture, and veterinarian credentialing worked together.',
      },
      {
        title: 'Consumer Education Assets',
        description:
          'Visual explainers embedded at the point of decision — replacing FAQ pages that nobody reads with graphics that everyone processes. Feline acne, hot spots, hypoallergenic formulation: every concern answered visually.',
      },
    ],
    outcome:
      'Cart value lifted 28%. When buyers understand what they\'re buying and why it\'s worth more, they buy more of it.\n\nSupport ticket volume dropped 40%. Educated buyers don\'t need hand-holding. The content answered their questions before they had to ask.\n\nInfo-to-purchase conversion rate tripled. The gap between "learning about a product" and "buying it" closed because the content closed it.',
    whatThisMeansForYou:
      'If your product requires explanation before purchase — if your buyers need to understand it before they\'ll trust it — you have a content problem before you have a conversion problem. Paid media won\'t solve it. More product copy won\'t solve it. A content system built to educate, build trust, and convert at every stage of the buyer journey will.',
    ctaLine: 'turn your product complexity into a conversion advantage',
    cloudinaryAssets: [
      { publicId: 'behr-pet-logo-anchor', label: 'Behr Pet Essentials logo', folder: 'studio/projects/behr-pet-essentials' },
      { publicId: 'Complete_Solution_Cats', label: 'Complete Solution Cats graphic', folder: 'studio/projects/behr-pet-essentials' },
      { publicId: 'summer_sale', label: 'Summer sale campaign', folder: 'studio/projects/behr-pet-essentials' },
    ],
  },

  // ── Primary Colours ───────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'primary-colours')!,
    titleTag: 'Primary Colours — Non-Profit Marketing Strategy & Event Revenue | Darling MarTech',
    metaDescription:
      'How a structured sponsorship architecture and exhibition marketing campaign generated $46k+ in revenue for a local arts non-profit.',
    subhead:
      'Primary Colours needed a modernized marketing engine and a sponsorship system that worked at every budget level. I built both — and ran the campaign that filled a 23-day outdoor exhibition.',
    challenge:
      'Primary Colours is a legacy arts non-profit in Indianapolis. They had a strong community reputation, a committed board, and real ambition. What they lacked was the infrastructure to turn that ambition into sustainable revenue.\n\nNo cohesive digital strategy. No scalable sponsorship framework. No audience infrastructure capable of supporting a major exhibition. When I joined the board, the organization was at a critical growth point — and the window to get it right was narrow.',
    approach:
      'The first thing I did was audit everything — digital presence, donor pipeline, existing sponsorship packaging, audience reach. The gaps were clear: the organization was leaving money on the table at every level because it didn\'t have a structured way to say yes to corporate partners.\n\nMost non-profits treat sponsorships like donations. Ask for what you can get, hope for the best. That\'s not a strategy.\n\nI designed a four-tier sponsorship architecture with clearly differentiated value propositions at $500, $1,500, $3,000, and $5,000. Each tier had distinct deliverables — digital exposure, on-site branding, artist introductions — giving corporate partners a frictionless entry point at whatever budget level made sense. The result: no sponsor left without an option that worked for them.',
    deliverables: [
      {
        title: 'Sponsorship Architecture',
        description:
          'Multi-tier program designed with four distinct levels from $500 to $5,000. Each tier engineered with specific, deliverable value propositions — digital exposure, on-site branding, artist introductions — to maximize uptake across corporate budgets of every size.',
      },
      {
        title: 'Digital Platform Redesign',
        description:
          'Redesigned the organization\'s digital presence to support both audience growth and donor/sponsor acquisition. Built for the exhibition and beyond.',
      },
      {
        title: 'Exhibition Marketing Campaign — \'Installation Nation\'',
        description:
          'Full campaign execution across the 23-day run: digital promotion, local press outreach, event activation, and content throughout. Sustained an audience of 10,000+ across the exhibition.',
      },
      {
        title: 'Donor & Sponsor Acquisition Strategy',
        description:
          'Outreach sequencing, pitch materials, and sponsor deck. Turned the sponsorship program into a repeatable system, not a one-off ask.',
      },
    ],
    process: [
      { label: 'Phase 1: Board Onboarding & Audit (Weeks 1–3)', description: 'Assessed existing marketing infrastructure, donor pipeline, and digital presence. Identified critical gaps in sponsorship packaging and audience engagement that were suppressing revenue potential.' },
      { label: 'Phase 2: Sponsorship Architecture (Weeks 4–8)', description: 'Designed the four-tier sponsorship program. Built the pitch materials, sponsor deck, and outreach sequence. Each tier engineered with distinct value propositions to maximize uptake.' },
      { label: 'Phase 3: Exhibition Launch — Installation Nation (Weeks 9–18)', description: 'Executed the full 23-day outdoor exhibition marketing campaign. Coordinated digital promotion, local press, and event activation. Drove sustained audience of 10,000+ across the run.' },
      { label: 'Phase 4: Revenue Close & Impact Reporting (Weeks 19–24)', description: 'Closed $46,000+ in total exhibition revenue. Delivered a full impact report demonstrating ROI per sponsorship tier and a roadmap for scaling the model in subsequent years.' },
    ],
    outcome:
      'The exhibition was fully funded. $46,000+ in total revenue. 10,000+ attendees across 23 days. 200+ local artists directly supported.\n\nBut the more important outcome: the organization now has a repeatable model. The sponsorship architecture, the campaign structure, the audience infrastructure — it all exists now. The next exhibition starts from a stronger position than this one did.',
    whatThisMeansForYou:
      'Non-profits aren\'t different from businesses in the ways that matter most. They need strategy. They need structure. They need someone who can turn a good mission into a system that generates revenue. The same is true for any organization trying to grow an audience, build partnerships, or run a campaign that actually produces results.',
    ctaLine: 'build a marketing system that does more than generate noise',
    cloudinaryAssets: [
      { publicId: 'primary-colours-logo-anchor', label: 'Primary Colours logo', folder: 'studio/projects/primary-colours' },
      { publicId: 'IMG_1911', label: 'Exhibition photography', folder: 'studio/projects/primary-colours' },
      { publicId: 'IMG_1884', label: 'Exhibition photography', folder: 'studio/projects/primary-colours' },
    ],
  },

  // ── Russell Painting ──────────────────────────────────────────────────────
  {
    ...workIndex.find((w) => w.slug === 'russell-painting')!,
    titleTag: 'Russell Painting Co. — Local SEO & Trust-Led Website Redesign | Darling MarTech',
    metaDescription:
      'How a trust signal-led redesign and local SEO strategy turned a 43-year-old painting company\'s heritage into its most powerful lead generation asset.',
    subhead:
      'Russell Painting Co. had an award-winning reputation built over four decades. Their website didn\'t reflect any of it. I rebuilt their digital presence around the thing that actually converts local service buyers: trust.',
    challenge:
      'Russell Painting Co. had everything a home services company needs to win in a local market — four decades of experience, an Angie\'s List "A" grade, HomeAdvisor ratings, and a reputation built entirely on word of mouth. Their pipeline depended on it.\n\nThe problem: a new wave of digitally native painting companies was eating into their lead flow. These competitors looked better online. Their sites were modern. They showed up in search. And they were winning jobs that, by any objective measure of quality and experience, should have gone to Russell.\n\nThe brand\'s greatest asset — its heritage — was completely invisible online.',
    approach:
      'Most local service businesses try to compete online by looking newer. That wasn\'t the right move for Russell.\n\nRussell\'s 43-year history wasn\'t a liability to be hidden — it was the most powerful trust signal in the room. So I built the entire site around it.\n\nThe strategy was "Trust Signal architecture" — every high-intent page structured to answer the buyer\'s core question before they could even ask it: Can I trust these people in my home?\n\nAngie\'s List "A" grade above the fold. HomeAdvisor ratings visible immediately. The 43-year family business narrative as the hero story, not buried in an about page. Every element engineered to close the trust gap before a visitor ever reached the contact form.',
    deliverables: [
      {
        title: 'Trust Signal-Led Website Redesign',
        description:
          'Restructured the site\'s information hierarchy from the ground up. Trust signals — awards, ratings, heritage narrative — moved above the fold on every high-intent page. The design made a 43-year-old company look exactly like what it was: the most credible option in the market.',
      },
      {
        title: 'Heritage Narrative Content Strategy',
        description:
          'Wrote the brand story in a way that made the company\'s longevity feel like proof, not nostalgia. Forty-three years doesn\'t just mean experience — it means they\'ve been in homes like yours, earning trust like yours, for longer than most of their competitors have been in business.',
      },
      {
        title: 'Local SEO Architecture',
        description:
          'Built a keyword cluster targeting Indianapolis neighborhood-level painting searches. Rebuilt internal linking, page structure, and metadata to capture high-intent local traffic. Optimized Google Business Profile and all review platform listings.',
      },
      {
        title: 'Lead Funnel Rebuild',
        description:
          'Rebuilt the contact and quote request flows to maximize conversion from organic traffic. Reduced friction from first visit to first call.',
      },
      {
        title: 'Review Platform Integration',
        description:
          'Synchronized the brand presence across Google, Angie\'s List, and HomeAdvisor — consistent identity, consistent messaging, consistent proof.',
      },
    ],
    process: [
      { label: 'Phase 1: Digital Presence Audit (Weeks 1–2)', description: 'Audited the existing site, Google Business Profile, and all review platform listings against top local competitors. Identified heritage credentials as critically under-leveraged trust assets.' },
      { label: 'Phase 2: Trust Architecture Design (Weeks 3–5)', description: 'Restructured the site\'s information hierarchy to lead with trust signals. Wrote the heritage narrative content. Built wireframes with trust signal placement mapped to conversion intent.' },
      { label: 'Phase 3: SEO & Lead Funnel Build (Weeks 6–10)', description: 'Deployed local SEO cluster targeting Indianapolis neighborhood-level painting keywords. Rebuilt contact and quote request flows to maximize organic conversion. Launched the redesigned site.' },
      { label: 'Phase 4: Results & Optimisation (Weeks 11–12)', description: 'Tracked lead volume, SEO ranking movement, and review sentiment post-launch. Confirmed 4.9-star conversion sentiment and improved local search visibility.' },
    ],
    outcome:
      'The site stopped being a brochure and started generating leads.\n\nLocal SEO rankings improved across primary Indianapolis service keywords. Inbound lead volume grew. But the most telling outcome came in client feedback: in new client enquiries, the heritage narrative became the most frequently cited reason for choosing Russell over competitors.\n\nPeople weren\'t just finding them. They were choosing them — because the site finally gave them a reason to.\n\n4.9-star sentiment across all review platforms. Still climbing.',
    whatThisMeansForYou:
      'If your business has been around long enough to have a reputation, you already have the most powerful thing in local marketing: proof. The question is whether your digital presence reflects it. A website that doesn\'t show why someone should trust you isn\'t a marketing asset. It\'s a liability. Let\'s turn yours into the former.',
    ctaLine: 'turn what you\'ve built into leads',
    cloudinaryAssets: [
      { publicId: 'russell-painting-website', label: 'Russell Painting website overview', folder: 'studio/projects/Russell Painting' },
      { publicId: 'russell-painting-website-services', label: 'Russell Painting services page preview', folder: 'studio/projects/Russell Painting' },
      { publicId: 'russell-painting-logo', label: 'Russell Painting Co. logo', folder: 'studio/projects' },
      { publicId: 'russell-painting-logo2', label: 'Russell Painting Co. logo variant', folder: 'studio/projects' },
    ],
  },
]

export default workData

export function getWorkBySlug(slug: string): CaseStudy | undefined {
  const resolvedSlug = resolveWorkSlug(slug)
  return workData.find((cs) => cs.slug === resolvedSlug)
}

export function getAllWork(): CaseStudy[] {
  return workData
}

export function generateWorkStaticParams() {
  return workData.map((cs) => ({ slug: cs.slug }))
}
