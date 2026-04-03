/** @type {import('next').NextConfig} */
const nextConfig = {
  // Project deployment target: Vercel
  images: {
    // Keep unoptimized enabled per current project behavior.
    // If you later want Vercel Image Optimization, set this to false.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // ── Work slug normalisation ──────────────────────────────────────────
      {
        source: '/work/primary-care-indy',
        destination: '/work/primarycare-indy',
        permanent: true,
      },
      {
        source: '/work/urgent-care-indy',
        destination: '/work/urgentcare-indy',
        permanent: true,
      },
      {
        source: '/work/rbe-law',
        destination: '/work/riley-bennett-egloff',
        permanent: true,
      },
      // ── Service nested route migrations ──────────────────────────────────
      // Flat slugs → nested parent routes (canonical)
      {
        source: '/services/agentic-marketing-systems',
        destination: '/services/systems/agentic-marketing-systems',
        permanent: true,
      },
      {
        source: '/services/the-fortress',
        destination: '/services/systems/the-fortress',
        permanent: true,
      },
      {
        source: '/services/custom-tools-workflow-products',
        destination: '/services/systems/custom-tools-workflow-products',
        permanent: true,
      },
      {
        source: '/services/the-conductor',
        destination: '/services/growth/the-conductor',
        permanent: true,
      },
      // Old website-ux segment → correct growth segment
      {
        source: '/services/website-ux/geo-optimization',
        destination: '/services/growth/geo-optimization',
        permanent: true,
      },
      // Flat slug → nested route
      {
        source: '/services/geo-optimization',
        destination: '/services/growth/geo-optimization',
        permanent: true,
      },
      // ── Lab  Tools or Work route migration (targeted)
      {
        source: '/lab',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/lab/cmo-simulator',
        destination: '/tools/cmo-simulator',
        permanent: true,
      },
      {
        source: '/lab/geo-readiness-auditor',
        destination: '/tools/geo-readiness-auditor',
        permanent: true,
      },
      {
        source: '/lab/geo-auditor',
        destination: '/tools/geo-readiness-auditor',
        permanent: true,
      },
      {
        source: '/lab/cmo-roadmap-generator',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/lab/pro-dj-studio',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/lab/strum-ai',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/lab/graston-growth-engine',
        destination: '/work/graston-growth-engine',
        permanent: true,
      },
      {
        source: '/lab/barbershop-command-center',
        destination: '/work/barbershop-command-center',
        permanent: true,
      },
      {
        source: '/lab/clinical-compass',
        destination: '/work/clinical-compass',
        permanent: true,
      },
      {
        source: '/lab/smart-sales-pricing',
        destination: '/work/smart-sales-pricing',
        permanent: true,
      },
      {
        source: '/lab/investment-roi-planner',
        destination: '/work/investment-roi-planner',
        permanent: true,
      },
      {
        source: '/lab/license-requirements',
        destination: '/work/license-requirements',
        permanent: true,
      },
      // Proof-tool internal links use /tools/[labSlug]; Growth Engine is a work case study, not a tools detail route.
      {
        source: '/tools/graston-growth-engine',
        destination: '/work/graston-growth-engine',
        permanent: true,
      },
    ]
  },
  // NOTE: If build fails with "generate is not a function", it's because
  // __NEXT_PRIVATE_STANDALONE_CONFIG is set in your shell from another Next.js project.
  // Fix: __NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
}

module.exports = nextConfig
