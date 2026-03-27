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
    screenshots: [],
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
    screenshots: [],
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
    screenshots: [],
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
    screenshots: [],
  },
}
