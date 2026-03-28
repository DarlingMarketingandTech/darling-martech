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
    ]
  },
  // NOTE: If build fails with "generate is not a function", it's because
  // __NEXT_PRIVATE_STANDALONE_CONFIG is set in your shell from another Next.js project.
  // Fix: __NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
}

module.exports = nextConfig
