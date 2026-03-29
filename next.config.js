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
      // ── Lab → Tools route migration ────────────────────────────────────────
      {
        source: '/lab',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/lab/:slug*',
        destination: '/tools/:slug*',
        permanent: true,
      },
    ]
  },
  // NOTE: If build fails with "generate is not a function", it's because
  // __NEXT_PRIVATE_STANDALONE_CONFIG is set in your shell from another Next.js project.
  // Fix: __NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
}

module.exports = nextConfig
