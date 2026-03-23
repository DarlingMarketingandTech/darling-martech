/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Cloudflare Pages with next-on-pages, API routes run on Edge runtime
  images: {
    // next/image optimization not supported in Cloudflare Pages edge
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // NOTE: If build fails with "generate is not a function", it's because
  // __NEXT_PRIVATE_STANDALONE_CONFIG is set in your shell from another Next.js project.
  // Fix: __NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
}

module.exports = nextConfig
