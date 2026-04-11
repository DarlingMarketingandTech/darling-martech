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
      {
        source: '/services/website-ux/geo-optimization',
        destination: '/services/growth/geo-optimization',
        permanent: true,
      },
      {
        source: '/services/geo-optimization',
        destination: '/services/growth/geo-optimization',
        permanent: true,
      },
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
        destination: '/tools/cmo-roadmap-generator',
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
      {
        source: '/tools/graston-growth-engine',
        destination: '/work/graston-growth-engine',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
