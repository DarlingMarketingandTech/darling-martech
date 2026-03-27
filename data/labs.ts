export interface LabDetailProps {
  slug: string
  name: string
  category: string
  year: string
  tagline: string
  metrics: { value: string; label: string }[]
  problemBody: string[]
  buildStack: { layer: string; choice: string; why: string }[]
  buildBody: string[]
  impactBody: string[]
  proofStatement: string
  ctaLine: string
  toolSrc: string
  screenshots: { src: string; alt: string; caption: string }[]
}

export const LAB_DETAIL_DATA: Record<string, LabDetailProps> = {
  'cmo-simulator': {
    slug: 'cmo-simulator',
    name: 'CMO Simulator',
    category: 'Marketing',
    year: '2025',
    tagline: 'A 10-minute interactive framework that walks you through CMO-level decision-making — budget allocation, channel strategy, KPI selection, and execution priority. The same logic I use with clients.',
    metrics: [
      { value: '~10 min', label: 'Average session time' },
      { value: 'Free', label: 'No cost, no catch' },
      { value: '15+ yrs', label: 'Of real client frameworks distilled' },
    ],
    problemBody: [
      'Most marketing conversations start in the wrong place. Teams jump straight to tactics — which channels, which ads, which content — before establishing the strategic logic that should be driving those decisions. The result is fragmented execution, wasted budget, and no clear story for what\'s working and why.',
      'CMO-level thinking is a specific skill. It\'s the ability to see budget allocation, channel strategy, KPI selection, and execution priority as an integrated system — where each decision informs the others. Most marketers never get exposure to that kind of structured decision-making unless they\'ve worked directly with a senior strategist.',
      'I built the CMO Simulator to make that framework self-serve. The same logic I use when I onboard a new client — the questions I ask, the tradeoffs I surface, the prioritization decisions — packaged as an interactive tool you can run yourself in about 10 minutes.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js App Router', why: 'Full React component control with server-side rendering for fast initial load and good SEO on the access page' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Instant deployment, preview URLs for iteration, global CDN for fast load regardless of where the user is' },
      { layer: 'State Management', choice: 'React useState + session flow', why: 'Multi-step wizard with conditional branching based on responses — React state handles the decision tree cleanly' },
      { layer: 'Access Gate', choice: 'Name + email form with Resend', why: 'Light-touch gating — not a paywall, just context capture. Resend handles email notification on each new access' },
      { layer: 'Session Persistence', choice: 'sessionStorage bypass', why: 'Returning visitors skip the gate — the tool should be frictionless after the first visit' },
    ],
    buildBody: [
      'The CMO Simulator is structured as a guided decision-making session. The user moves through a series of framing questions — about their organization\'s goals, their current marketing reality, their budget constraints, and their execution capacity — and at each step, the tool responds with the strategic logic that a CMO would apply.',
      'The experience is less "quiz" and more "thinking partner." The goal isn\'t to give you a score. It\'s to walk you through the exact sequence of questions a senior marketer asks before touching tactics. Budget before channels. Channels before content. Measurement before execution.',
      'The access gate is intentionally light. Name and email — that\'s it. No sales sequence follows. I use the data to understand who\'s engaging with the tool and to reach out personally if someone\'s situation looks like a fit for working together. The simulator does the qualifying; I do the conversation.',
    ],
    impactBody: [
      'The CMO Simulator serves two purposes. For potential clients, it demonstrates the kind of thinking they\'d get working with me — before they have to commit to a conversation. It builds credibility in a way a case study can\'t: you experience the framework instead of reading about it.',
      'For me, it\'s a qualification mechanism. Someone who takes 10 minutes to work through a CMO-level decision framework has already demonstrated the kind of strategic mindset that makes for a good client engagement. By the time they reach out, we\'re already aligned on how to think about marketing problems.',
    ],
    proofStatement: 'That the best sales tool is a demonstration of how you think — and that a free interactive framework can qualify clients better than any discovery call script.',
    ctaLine: 'Ready to think through your marketing strategy with someone who\'s done this for 15 years?',
    toolSrc: '',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_Q1.png',
        alt: 'CMO Simulator — question one walkthrough',
        caption: 'The simulator walks through one decision at a time — no overwhelm, just structure.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/CMO_Sim-_build_your_own_company.png',
        alt: 'CMO Simulator — build your own company step',
        caption: 'Each step builds the strategic foundation before moving to the next decision layer.',
      },
    ],
  },

  'graston-growth-engine': {
    slug: 'graston-growth-engine',
    name: 'Graston Growth Engine',
    category: 'Marketing',
    year: '2024',
    tagline: 'A full-stack directory ecosystem that turns a static clinician list into a high-performance lead-gen and provider-retention machine — map-integrated spatial search, AI assistant console, Premier analytics suite, and automated support ticketing.',
    metrics: [
      { value: 'Real-time', label: 'Viewport-synced spatial search' },
      { value: '300ms', label: 'Debounced idle fetch for map UX' },
      { value: '$27k+', label: 'Projected annual revenue per Premier provider' },
    ],
    problemBody: [
      'For Graston Technique®, the provider directory is the primary patient acquisition touchpoint — but it was built like a static list, not a growth asset. Patients couldn\'t filter by location with any precision. Providers had no visibility into how their profile was performing. The clinical education team was fielding constant support requests that a well-designed self-service system could eliminate.',
      'The core scalability problem was twofold: the patient experience was too slow and imprecise to capture high-intent local search traffic, and the provider experience gave clinicians no reason to stay engaged with the platform between certification renewals.',
      'The fix wasn\'t just a better search UI. It required rethinking the directory as a two-sided marketplace — one that creates measurable ROI for providers while delivering hyper-local, real-time results for patients.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js App Router', why: 'Full React control with server-side rendering for SEO-critical directory pages and fast initial load on the patient-facing search' },
      { layer: 'Database', choice: 'Supabase (PostgreSQL)', why: 'Relational schema for provider profiles, training levels, membership tiers, and support tickets — all normalized into a single source of truth' },
      { layer: 'Geospatial Search', choice: 'Google Maps API + Supabase spatial queries', why: 'Viewport bounding box logic — map pans and zooms trigger filtered Supabase queries against LatLngBounds coordinates in real-time' },
      { layer: 'AI Console', choice: 'LLM-driven automation rules engine', why: 'Keyword-based ticket routing, auto-replies for after-hours inquiries, and VIP escalation alerts built into the admin dashboard' },
      { layer: 'Analytics', choice: 'Custom Recharts dashboard', why: 'Profile view and conversion funnel tracking per provider — visualizes the ROI of Premier membership to drive upgrades' },
    ],
    buildBody: [
      'The spatial search engine is the technical core of the build. As a user pans or zooms the map, the Google Maps API captures the current LatLngBounds — the NorthEast and SouthWest coordinates of the visible viewport. Those coordinates are passed to a Supabase PostgreSQL function that filters the provider table for entries within that bounding box. A 300ms debounced idle listener prevents excessive fetches while keeping the list in tight sync with the map — the same pattern high-end real estate platforms use.',
      'The Provider Hub is where the retention logic lives. Providers get a dashboard showing profile views, website click-throughs, and conversion rates — data that makes the ROI of maintaining active certification visible in real numbers. The Premier ROI calculator projects annual revenue at different patient volume assumptions, making the membership upgrade decision concrete rather than theoretical.',
      'The AI Assistant Console layers automation on top of the support workflow. An automation rules engine routes incoming tickets by keyword — billing questions to finance, certification questions to clinical education, onboarding requests to a self-service wiki. After-hours auto-replies and VIP escalation alerts reduce the support burden on the corporate team without degrading the provider experience.',
    ],
    impactBody: [
      'The Graston Growth Engine demonstrates what happens when a directory is treated as a product instead of a database export. The patient experience went from a paginated list to a real-time, map-synced search that captures local intent at the moment of need.',
      'The provider experience shifted from passive to active — clinicians now have a reason to log in between renewals, maintain their profile, and upgrade their membership tier. That engagement creates a retention flywheel: better provider data improves patient results, which strengthens the brand\'s network effect.',
      'The AI automation layer is the operational multiplier. By routing tickets automatically and surfacing proactive alerts, the system extends the capacity of the Graston clinical team without adding headcount — the kind of leverage that matters for a brand operating at national scale.',
    ],
    proofStatement: 'That a directory is a product, not a database export — and that the right architecture turns a static asset into a scalable revenue and retention engine.',
    ctaLine: 'Building a two-sided platform or need to turn your brand\'s directory into a growth asset? Let\'s talk.',
    toolSrc: 'https://graston-growth-engine.vercel.app/',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston-growth-engine_-_for_providers.png',
        alt: 'Graston Growth Engine — provider hub dashboard',
        caption: 'The Provider Hub gives clinicians real-time visibility into profile performance and conversion metrics.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston-growth-engine_-_admin_command_center.png',
        alt: 'Graston Growth Engine — admin command center',
        caption: 'The Admin Command Center surfaces support trends, VIP alerts, and automation rule performance in one view.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston-growth-engine_-_ai_assistant.png',
        alt: 'Graston Growth Engine — AI assistant console',
        caption: 'The AI Assistant Console automates ticket routing, after-hours replies, and proactive escalation alerts.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston-growth-engine_-_marketing_toolkit.png',
        alt: 'Graston Growth Engine — marketing toolkit',
        caption: 'Gated brand asset repository gives providers access to verified marketing materials and onboarding guides.',
      },
    ],
  },

  'pro-dj-studio': {
    slug: 'pro-dj-studio',
    name: 'PRO DJ Studio',
    category: 'Technologist',
    year: '2024',
    tagline: 'A professional-grade mixing environment built entirely for the browser — dual-deck architecture, real-time AI STEM separation, and a 3D-accelerated interface that emulates the tactile feel of a $5,000 hardware setup.',
    metrics: [
      { value: '12ms', label: 'Audio start latency' },
      { value: '96/100', label: 'Lighthouse performance score' },
      { value: '< 5ms', label: 'STEM toggle speed' },
    ],
    problemBody: [
      'Professional DJs work on hardware that costs thousands of dollars — Pioneer CDJs, Serato controllers, dedicated mixers. The performance tools they rely on don\'t exist in the browser. What does exist is either a toy-grade audio player or a DAW so complex it requires weeks of training.',
      'The accessibility problem is real: aspiring DJs, producers, and hobbyists can\'t justify a $5,000 hardware investment to learn or practice. And even pros lack a portable, zero-install option for situations where their hardware isn\'t available.',
      'PRO DJ Studio was engineered to close that gap. Browser-based, hardware-emulating, zero-installation. The goal wasn\'t to approximate professional performance tools — it was to build them natively in the browser without sacrificing the low-latency, tactile feel that makes hardware worth buying.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js + TypeScript', why: 'Strict type-safety across the complex audio store prevents null audio references during live playback — a crash there is unacceptable' },
      { layer: 'Audio Engine', choice: 'Web Audio API', why: 'Low-level browser audio processing for near-zero latency — gain nodes, frequency filters, exponential ramping, and buffer management all run natively' },
      { layer: 'State', choice: 'Zustand', why: 'High-speed global store syncing dual-deck states — crossfader, BPM sync, and waveforms stay perfectly aligned without React re-render overhead' },
      { layer: '3D UI', choice: 'Spline', why: 'Adds depth and dynamic lighting to the deck interface, making digital controls feel physical — critical for the "tactile dashboard" design goal' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Edge-optimized deployment for the 12ms audio start latency benchmark — CDN proximity matters for audio applications' },
      { layer: 'PWA', choice: 'Full manifest', why: 'Installable on device for offline use — pros need the tool available in venues where connectivity is unreliable' },
    ],
    buildBody: [
      'The interface is architected as a modular grid that prioritizes actionable data — waveforms, BPMs, EQs, and library metadata all visible simultaneously without visual noise. The layout mirrors the ergonomic design of professional hardware: every control is where a working DJ expects it.',
      'The audio engine went through a rigorous Mixer Feature Audit that produced "Quantum" processing logic. EQ kill switches use sharp-cutoff frequency filters — not volume sliders — to completely remove bands the way professional hardware does. All faders and EQs use exponential ramp-to-value automation to prevent digital clipping. The crossfader supports both "Blend" curves for smooth radio-style transitions and "Cut" curves for scratch performance.',
      'The Remix Grid adds a Capture & Launch system: grab a 4-bar loop from Deck A and immediately trigger it as a pad. This required building a custom buffer-management system that clips audio on the fly and assigns it to a reactive pad bank without interrupting the main deck\'s playback. The AI STEM separation layer (VOC, DRM, INST) handles real-time isolation of vocal, drum, and instrument channels — each running through independent gain nodes with phase alignment maintained across the mix.',
    ],
    impactBody: [
      'PRO DJ Studio benchmarks at 12ms audio start latency, 18ms UI interaction delay, and a Lighthouse score of 96/100. These aren\'t vanity metrics — for audio applications, every millisecond of latency is perceptible. Hitting near-hardware numbers in a browser context required careful optimization at every layer of the stack.',
      'From a portfolio perspective, this project is a masterclass in designing for power users. When the workflow is high-complexity and every interaction is time-critical, UX decisions that would be invisible in a standard web app become the difference between a tool professionals trust and one they abandon. PRO DJ Studio proves the ability to hold both the engineering and the experience simultaneously.',
    ],
    proofStatement: 'That high-fidelity performance tools can live in a web environment without sacrificing the tactile, zero-latency feel of professional hardware — and that browser-based doesn\'t have to mean compromised.',
    ctaLine: 'Building a complex, performance-critical web application? I build things that have to work perfectly under pressure.',
    toolSrc: 'https://pro-dj-mixer.vercel.app/',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/PRO_DJ_STUDIO_-_home.png',
        alt: 'PRO DJ Studio — main mixer interface',
        caption: 'Dual-deck architecture with waveform display, EQ kill switches, and STEM controls — all in the browser at near-zero latency.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/PRO_DJ_STUDIO_-_playing.png',
        alt: 'PRO DJ Studio — decks in active playback',
        caption: 'Live mixing session with crossfader, BPM sync, and real-time waveform visualization running simultaneously.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/PRO_DJ_STUDIO_-_library.png',
        alt: 'PRO DJ Studio — track library view',
        caption: 'Integrated track library with BPM, key, and artwork metadata — instant load via the library.json sync pipeline.',
      },
    ],
  },

  'strum-ai': {
    slug: 'strum-ai',
    name: 'Strum AI',
    category: 'Technologist',
    year: '2024',
    tagline: 'A high-performance SaaS platform that converts raw audio inspiration into interactive chord charts and professional guitar notation — with a Notion-like song management system and real-time practice tools built in.',
    metrics: [
      { value: 'AI-driven', label: 'Audio-to-chord transcription' },
      { value: 'PWA-ready', label: 'Offline chord library access' },
      { value: 'Full suite', label: 'Metronome, tuner, setlist auto-advance' },
    ],
    problemBody: [
      'Most guitarists record audio snippets of ideas on their phones that never get transcribed or developed. The gap between "I have an idea" and "I have a song I can play" is almost entirely friction — manual transcription, scattered files, switching between a metronome app, a tuner app, and a chord reference.',
      'Existing tools address pieces of the problem: tabs are static PDFs, chord apps don\'t connect to your own recordings, practice tools are separate from your song library. There\'s no unified system that treats a musician\'s creative output as interconnected data.',
      'Strum AI was built to close that gap entirely. Upload audio, get a chord progression. Manage your songs as living documents with BPM, key, and audio reference attached. Practice with built-in tools. Perform with auto-advancing setlists. Everything in one place.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'React + Vite', why: 'Lightning-fast build toolchain with near-perfect Lighthouse scores — essential for a tool musicians use on mobile in rehearsal spaces' },
      { layer: 'AI Layer', choice: 'Audio transcription API', why: 'Analyzes audio frequencies to suggest chord progressions, reducing manual transcription from hours to seconds' },
      { layer: 'Notation', choice: 'ChordPro', why: 'Industry-standard format for chord/lyric notation — import/export keeps the app compatible with the broader music tool ecosystem' },
      { layer: 'Styling', choice: 'Tailwind CSS', why: 'Rapid component styling for a complex multi-view dashboard with obsidian dark-mode palette and high-contrast readability for stage use' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Zero-config deployment with instant preview URLs, global CDN for fast load regardless of where the musician is' },
      { layer: 'PWA', choice: 'Full manifest + service worker', why: 'Musicians can install Strum AI on their devices for offline chord library access — essential when rehearsal spaces have poor connectivity' },
    ],
    buildBody: [
      'Strum AI treats every song as a collection of data points — BPM, key, chord progression, audio reference — not a static file. The song management system lets users filter, search, and edit their library in real time, turning a folder of recordings into a searchable intelligence summary of their creative output.',
      'The AI transcription pipeline handles the hard part: analyzing uploaded audio and mapping frequency patterns to chord suggestions. The ChordPro integration means output isn\'t locked inside Strum AI — users can export to any compatible notation tool, or import existing ChordPro files to bring existing libraries in.',
      'The Discover page includes an optional Ultimate Guitar chord provider — a local-use scraper that fetches and cleans external tab data, giving users a search-to-library pipeline for educational exploration. The real-time practice suite adds a dynamic metronome, chromatic tuner, and setlist auto-advance for live performance — all built in, eliminating the need for third-party apps during rehearsal or on stage.',
    ],
    impactBody: [
      'Strum AI demonstrates a Product-Led Growth model applied to a creative tool. The free-tier utilities — tuner, metronome, chord library — create a sticky environment that naturally leads users to the core AI transcription value proposition. Users are inside the ecosystem before they encounter the most powerful feature.',
      'From a portfolio perspective, Strum AI proves an ability to architect complex multi-feature platforms that prioritize both technical depth and user retention. The combination of AI audio processing, complex state management (overlapping setlist transitions, lazy-loaded song data), PWA implementation, and a polished obsidian-dark SaaS UI represents a full-stack build that goes well beyond a standard portfolio project.',
    ],
    proofStatement: 'That Product-Led Growth isn\'t just a SaaS strategy — it\'s a design principle. Build the utility tools that get users in the door, then let the AI do the convincing.',
    ctaLine: 'Building a complex platform that needs both technical depth and a clear user acquisition strategy? Let\'s talk.',
    toolSrc: 'https://jacobs-music-plum.vercel.app/',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/STRUM_AI_I_Pro_Guitar_Transcription.png',
        alt: 'Strum AI — main dashboard',
        caption: 'The song management dashboard treats every track as structured data — BPM, key, chords, and audio reference in one view.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/STRUM_AI_I_Pro_Guitar_Transcription_-_chords_page.png',
        alt: 'Strum AI — chord chart view',
        caption: 'AI-generated chord charts display progressions in ChordPro format — interactive, editable, and exportable.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/STRUM_AI_I_Pro_Guitar_Transcription_-_discover_page.png',
        alt: 'Strum AI — discover page',
        caption: 'The Discover page pulls external chord data into the library — search-to-save in one flow.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/STRUM_AI_I_Pro_Guitar_Transcription_-_tools_page.png',
        alt: 'Strum AI — practice tools suite',
        caption: 'Built-in metronome, tuner, and setlist auto-advance keep musicians in the ecosystem from rehearsal to stage.',
      },
    ],
  },

  'barbershop-command-center': {
    slug: 'barbershop-command-center',
    name: 'Barbershop Command Center',
    category: 'Developer',
    year: '2024',
    tagline: 'A dual-sided business OS for high-performance barbershops — a Command Center dashboard for owners and barbers, paired with a frictionless client booking engine built for conversion.',
    metrics: [
      { value: 'Dual-sided', label: 'Owner dashboard + client booking' },
      { value: '3-phase', label: 'NSHR validation workflow' },
      { value: 'Real-time', label: 'Revenue projection engine' },
    ],
    problemBody: [
      'Most barbershops run on a mix of group chats, paper books, and consumer scheduling apps that weren\'t built for the complexity of a multi-barber, multi-service shop. The result: double bookings, no-shows with no visibility, and owners with zero financial picture of their week until it\'s over.',
      'The deeper problem is structural. The front-end booking experience and the back-end operational view are treated as separate problems — so owners end up with a booking app that clients use and a spreadsheet they manage, with nothing connecting the two.',
      'Hoosier Boy Barbershop needed a single system that served both sides. Something that reduced client-side friction to near zero while giving the shop a live financial and operational pulse. Not a generic calendar. An operating system built specifically for how a barbershop actually runs.',
    ],
    buildStack: [
      { layer: 'Framework', choice: 'Next.js App Router', why: 'Full-stack React with server-side rendering for fast initial load on both the client booking flow and the owner dashboard' },
      { layer: 'Database', choice: 'Supabase', why: 'Postgres-backed real-time data for appointment state, barber availability, and revenue tracking — with auth for the admin side' },
      { layer: 'Hosting', choice: 'Vercel', why: 'Zero-config deployment with preview URLs for rapid iteration across both the client and admin interfaces' },
      { layer: 'Styling', choice: 'Tailwind CSS', why: 'Fast component-level styling for a complex UI with multiple distinct views and states' },
      { layer: 'State', choice: 'React + server actions', why: 'Complex booking logic (slot validation, overlap detection, deposit gating) handled server-side with optimistic client updates' },
    ],
    buildBody: [
      'The Command Center is built as two distinct applications sharing a single codebase. The client-facing side prioritizes conversion: service-first navigation, staff selection, and a mobile-first booking flow designed to capture intent before friction has a chance to kill it. Clients pick their service, pick their barber (Jimmy or Nate), and land on a time slot — no account required.',
      'The business logic is where it gets complex. "The Hour" — a premium extended service — isn\'t just a longer appointment. The engine validates two consecutive 30-minute atomic slots and applies a premium rate to protect revenue density. NSHR (Non-Surgical Hair Replacement) installation is programmatically gated behind a completed consultation, with a 50% deposit trigger to offset the financial exposure of a three-hour vacancy.',
      'On the owner side, the dashboard surfaces what matters: today\'s appointment count, expected revenue, completion rate, and flagged issues (no-shows, cancellations) in a single view. Barbers can mark clients as Arrived, In-Service, or Completed — giving the shop a live floor-level pulse without anyone having to ask.',
    ],
    impactBody: [
      'The Barbershop Command Center replaces a fragmented system of apps and manual tracking with a single source of truth. Owners can see their week\'s projected revenue before it happens and react to revenue leakage in real time instead of discovering it at close.',
      'For clients, the booking experience is designed to eliminate the friction that turns intent into abandonment. Staff-specific booking fosters the personal relationships that drive long-term retention — the kind of loyalty that doesn\'t survive a generic "next available" booking flow.',
      'The system proves that custom-built, domain-specific platforms outperform general-purpose scheduling tools for businesses with complex operational logic. Generic tools make everyone slightly capable. A purpose-built system makes one business excellent.',
    ],
    proofStatement: 'That service businesses with complex operational logic deserve software built for their specific rules — not workarounds inside tools designed for everyone.',
    ctaLine: 'Have a service business that\'s outgrown its scheduling software? Let\'s build the right system.',
    toolSrc: 'https://hoosier-boy-barbersh.vercel.app/',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Barbershop_Command_Center.jpg',
        alt: 'Barbershop Command Center — owner dashboard',
        caption: 'The Command Center surfaces today\'s appointments, expected revenue, and flagged issues in a single view.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Book_Appointment_I_Hoosier_Boy_Barbershop.png',
        alt: 'Hoosier Boy Barbershop — client booking interface',
        caption: 'Service-first client flow with staff selection — designed for mobile and built to reduce drop-off at every step.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Book_Appointment_Cal_ViewI_Hoosier_Boy_Barbershop.png',
        alt: 'Hoosier Boy Barbershop — calendar availability view',
        caption: 'Calendar view shows real-time slot availability per barber — clients pick their person, then their time.',
      },
    ],
  },

  'clinical-compass': {
    slug: 'clinical-compass',
    name: 'Clinical Compass',
    category: 'Developer',
    year: '2024',
    tagline: 'A decision-support tool that helps Graston practitioners navigate clinical protocols and treatment pathways — without calling the home office.',
    metrics: [
      { value: '400+', label: 'Graston-certified practitioners reached' },
      { value: '48 hrs/wk', label: 'Saved in manual protocol support calls' },
      { value: '1', label: 'Tool replacing a full support workflow' },
    ],
    problemBody: [
      'Graston Technique has hundreds of certified practitioners — physical therapists, chiropractors, athletic trainers — who regularly need to reference clinical protocols and treatment pathways for specific conditions. The problem: that guidance lived in PDFs, in email threads, and in the heads of the clinical team.',
      'Practitioners were calling and emailing constantly. The clinical support team was spending nearly two full days every week answering the same protocol questions. It wasn\'t scalable — and it was slowing down practitioners at the point of care.',
      'I built Clinical Compass to make that institutional knowledge instantly accessible. No login required, no PDF hunting, no waiting for a callback.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Needed to embed in existing Graston web properties without introducing a build system or framework dependency' },
      { layer: 'Logic', choice: 'Decision tree JSON', why: 'Clinical pathways modeled as a branching decision tree, making it easy for the clinical team to update content without touching code' },
      { layer: 'Hosting', choice: 'Embedded HTML file', why: 'Deployed as a self-contained HTML file — loads instantly, works offline, no API calls' },
      { layer: 'UX Pattern', choice: 'Progressive disclosure', why: 'Practitioners answer one question at a time — reduces cognitive load at the point of care' },
    ],
    buildBody: [
      'Clinical Compass is a self-contained HTML application — no framework, no build step, no external dependencies. The entire clinical decision tree is encoded as a JSON structure that the UI traverses based on practitioner responses.',
      'I modeled the UX after clinical assessment tools practitioners already knew: one question, one answer, progressive disclosure. Each branch leads either to a protocol recommendation or to a clarifying follow-up question. The clinical team could update the JSON file directly — no developer required.',
      'The tool was designed to be embedded anywhere Graston practitioners already were: the practitioner portal, email links, even printed QR codes at training events.',
    ],
    impactBody: [
      'Clinical Compass rolled out to 400+ certified Graston practitioners and immediately took pressure off the clinical support team. Protocol support calls dropped significantly in the first 90 days.',
      'More importantly, it changed how practitioners experienced Graston\'s support — instead of waiting for a callback, they had an answer in under two minutes. That\'s the kind of tool that turns a client relationship into a loyalty relationship.',
    ],
    proofStatement: 'That I can build clinical-grade decision tools as a solo marketer — and that the best support tool is one that makes the support team unnecessary.',
    ctaLine: 'Have a knowledge management or decision-support problem? Let\'s build something that scales.',
    toolSrc: '/labs/clinical-compass/Graston Clinical Compass Tool.html',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston_instruments_-_clinical_compass.jpg',
        alt: 'Clinical Compass — decision pathway interface',
        caption: 'Practitioners navigate clinical protocols one question at a time — point-of-care speed, no manual lookup.',
      },
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/graston_instruments_-_clinical_compass-summary.jpg',
        alt: 'Clinical Compass — protocol summary output',
        caption: 'The summary screen surfaces the relevant protocol with all supporting detail — ready to apply immediately.',
      },
    ],
  },

  'smart-sales-pricing': {
    slug: 'smart-sales-pricing',
    name: 'Smart Sales & Pricing Tool',
    category: 'Developer',
    year: '2024',
    tagline: 'An interactive pricing calculator that helps Graston sales reps build accurate quotes for certification bundles, equipment packages, and institutional accounts — in real time.',
    metrics: [
      { value: '+38%', label: 'Lead-to-demo conversion improvement' },
      { value: '< 2 min', label: 'From prospect question to accurate quote' },
      { value: '2 versions', label: 'Built and iterated based on sales team feedback' },
    ],
    problemBody: [
      'Graston\'s product catalog was complex. Certifications came in bundles, equipment had configuration options, institutional accounts had different pricing tiers than individual practitioners. Sales reps were building quotes manually in spreadsheets — and getting them wrong.',
      'The pricing errors were eroding trust with prospects. Worse, reps were losing deals in the follow-up gap: the time between a pricing question on a demo call and the manually-built quote they emailed two days later.',
      'I needed to close that gap entirely. Give reps a tool they could use live on a call, in front of the prospect, and get to an accurate number immediately.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Sales reps needed it accessible anywhere — no install, no login, browser tab open during calls' },
      { layer: 'Pricing Logic', choice: 'JavaScript calculation engine', why: 'All pricing rules, bundle discounts, and tier logic encoded in a single JS module for easy updates' },
      { layer: 'UX Pattern', choice: 'Real-time calculator', why: 'Every input immediately updates the output — reps see price changes live as they configure the quote' },
      { layer: 'Iteration', choice: 'v1 → v2 rebuild', why: 'v1 shipped fast, sales team used it for 60 days, v2 rebuilt based on real usage feedback' },
    ],
    buildBody: [
      'The Smart Sales & Pricing Tool went through two full versions. v1 was built fast — a working calculator that got into reps\' hands within a week. The goal was to get real usage data before over-engineering anything.',
      'After 60 days of real sales calls, I collected feedback from the team and rebuilt v2 from scratch. The calculation engine stayed the same; the UX changed significantly based on how reps were actually using it.',
      'Both versions are self-contained HTML files — no backend, no API calls, no login. A sales rep opens a browser tab and it\'s ready. The pricing logic is maintained in a single JavaScript configuration object that a non-developer can update.',
    ],
    impactBody: [
      'The pricing tool directly contributed to a 38% improvement in lead-to-demo conversion. When reps can answer pricing questions live on the first call — accurately, with full configuration detail — prospects don\'t need to \'think about it\' the same way.',
      'It also eliminated a source of internal frustration. Sales reps stopped manually building spreadsheet quotes. The pricing team stopped fielding \'what\'s the price for X if Y\' questions. Everyone was working from the same number.',
    ],
    proofStatement: 'That shipping a fast v1 and iterating on real usage data is better than designing the perfect tool — and that a JavaScript file in a browser tab can replace a week of spreadsheet work.',
    ctaLine: 'Have a sales tool or pricing workflow problem? I build things like this.',
    toolSrc: '/labs/smart-sales-pricing/graston Smart Sales and Pricing Tool.html',
    screenshots: [
      {
        src: 'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Graston_Technique_Smart_Pricing_Tool_-_home.png',
        alt: 'Graston Technique Smart Sales & Pricing Tool — home screen',
        caption: 'Real-time pricing calculator for certification bundles and equipment configurations — accurate quotes live on any sales call.',
      },
    ],
  },

  'investment-roi-planner': {
    slug: 'investment-roi-planner',
    name: 'Investment ROI Planner',
    category: 'Marketing',
    year: '2024',
    tagline: 'A financial planning tool that helps practitioners calculate the expected return on their Graston Technique certification investment — before they ever talk to a sales rep.',
    metrics: [
      { value: '+212%', label: 'Increase in qualified lead volume' },
      { value: 'Self-serve', label: 'ROI answer without a sales conversation' },
      { value: '3 inputs', label: 'All it takes to get a meaningful projection' },
    ],
    problemBody: [
      'Graston certification is a meaningful investment for a practitioner — time, money, and commitment to a new technique. The most common objection in the sales process wasn\'t about the technique itself. It was: "Will this actually pay off for my practice?"',
      'Reps were spending significant call time walking through ROI math. Prospects were asking questions that should have been answered before the first sales touchpoint. The conversion rate on those conversations was lower than it should have been because prospects arrived uncertain.',
      'The insight: answer the ROI question before the sales conversation happens. Let the tool do the qualifying work.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Deployed as a lead-gen asset embedded on the Graston website — no framework overhead, instant load' },
      { layer: 'Calculation Engine', choice: 'JavaScript financial model', why: 'ROI projections based on session volume, fee per session, and certification cost — simple inputs, meaningful outputs' },
      { layer: 'Output Format', choice: 'Visual results panel', why: 'Prospects see a clear monthly ROI projection and payback timeline — easy to screenshot and share internally' },
      { layer: 'CTA Integration', choice: 'Inline contact form', why: 'After seeing their ROI, prospects are warm — inline CTA converts at significantly higher rate than a generic form' },
    ],
    buildBody: [
      'The ROI Planner was built as a top-of-funnel asset, not a sales tool. It lives on the Graston website where prospects are researching, not in a sales rep\'s browser during a call.',
      'The model is intentionally simple: how many sessions per week, what do you charge per session, here\'s your projected monthly ROI and payback period. Three inputs, one clear output. Practitioners who find it through organic search or social get their core question answered in under two minutes.',
      'The CTA at the end of the calculation captures intent at peak interest — right after the prospect has convinced themselves the math works.',
    ],
    impactBody: [
      'The ROI Planner was a primary driver behind a 212% increase in qualified lead volume. Prospects who engaged with the tool arrived at sales conversations already sold on the economics — the call became about timing and logistics, not "is this worth it."',
      'It also improved sales efficiency. Reps stopped doing ROI math on calls. That time went back into closing, not educating.',
    ],
    proofStatement: 'That the best lead qualification happens before the first sales conversation — and that a self-serve calculator can do more qualifying work than a 30-minute discovery call.',
    ctaLine: 'Need a lead-gen asset that does the qualifying work for you? Let\'s build it.',
    toolSrc: '/labs/investment-roi-planner/Investment ROI Planner Tool.html',
    screenshots: [
      'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Graston_Technique_ROI_Calculator_-_main.png',
      'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Graston_Technique_ROI_Calculator_-_2.png',
    ],
  },

  'license-requirements': {
    slug: 'license-requirements',
    name: 'License Requirements Navigator',
    category: 'Developer',
    year: '2024',
    tagline: 'A state-by-state licensing lookup tool that helps healthcare practitioners understand exactly what credentials they need — and which Graston certifications count toward them.',
    metrics: [
      { value: '50 states', label: 'Licensing requirement data indexed' },
      { value: '< 60 sec', label: 'From question to answer' },
      { value: 'Zero', label: 'Support calls needed for licensing questions' },
    ],
    problemBody: [
      'Healthcare licensing is complicated. A physical therapist in Texas has different continuing education requirements than one in New York. Chiropractors, athletic trainers, and massage therapists each operate under different state regulatory frameworks.',
      'Graston\'s clinical education team was fielding constant questions: "Does this course count for my CEU requirements in Ohio?" "Can I use my Graston certification toward my PT license renewal in California?" These are important questions — and getting them wrong means a practitioner fails their renewal.',
      'The support burden was significant, and the stakes were high. I built the License Requirements Navigator to give practitioners accurate, state-specific answers without requiring a call or email.',
    ],
    buildStack: [
      { layer: 'Frontend', choice: 'Vanilla HTML/CSS/JS', why: 'Embedded on the Graston practitioner portal — self-contained, no build system, instant load' },
      { layer: 'Data Layer', choice: 'JSON state database', why: 'All 50 states\' licensing requirements encoded as structured data — clinical team can update without touching code' },
      { layer: 'UX Pattern', choice: 'Two-step lookup', why: 'Practitioners select state then credential type — two inputs, one definitive answer' },
      { layer: 'Maintenance', choice: 'Editable JSON config', why: 'Licensing requirements change — built so a non-developer can update state data when regulations change' },
    ],
    buildBody: [
      'The License Requirements Navigator is built around a two-step lookup: select your state, select your credential type. The tool then pulls from a structured JSON database of state licensing requirements and returns a clear answer about which Graston certifications count, how many CEUs they provide, and any relevant renewal considerations.',
      'The data layer was designed for maintainability. Licensing requirements change when state legislatures update continuing education rules. The JSON config is structured so the Graston clinical team can update a state entry without touching any JavaScript.',
      'The tool runs entirely client-side — no API calls, no database connection. It loads instantly and works offline, which matters when practitioners are looking something up at a conference or between patients.',
    ],
    impactBody: [
      'After launch, licensing support questions effectively dropped to zero. Practitioners got accurate, specific answers in under a minute. The clinical education team reclaimed significant time that had been going to repetitive licensing Q&A.',
      'The tool also served as a subtle credibility signal — the fact that Graston built a state-indexed licensing database told practitioners the organization understood their regulatory reality and had done the work to make compliance easier.',
    ],
    proofStatement: 'That self-serve tools built on structured data can eliminate entire support categories — and that the best answer to a compliance question is one the practitioner finds themselves.',
    ctaLine: 'Have a support burden that should be self-serve? I build things that scale.',
    toolSrc: '/labs/license-requirements/Practitioner License Requirements Tool.html',
    screenshots: [
      'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Practitioner_License_Requirements_I_Graston_Technique_-_search.png',
      'https://res.cloudinary.com/djhqowk67/image/upload/w_1400,f_auto,q_auto/Practitioner_License_Requirements_I_Graston_Technique_-_search_2.png',
    ],
  },
}
