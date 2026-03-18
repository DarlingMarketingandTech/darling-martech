/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Cloudflare Pages with next-on-pages, API routes run on Edge runtime
  images: {
    // next/image optimization not supported in Cloudflare Pages edge
    unoptimized: true,
  },
  // NOTE: If you get "generate is not a function" during build, run:
  //   __NEXT_PRIVATE_STANDALONE_CONFIG="" npm run build
  // This happens when another Next.js app sets that env var in your shell session.
  generateBuildId: () => null,
}

module.exports = nextConfig
