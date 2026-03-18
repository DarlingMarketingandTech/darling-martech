import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6">404</p>
      <h1 className="font-display font-black text-5xl md:text-7xl text-warm-off-white tracking-tightest mb-6">
        Page not found.
      </h1>
      <p className="text-mid-gray font-body mb-10">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-body font-medium text-sm bg-electric-orange text-warm-off-white px-6 py-3 hover:bg-electric-orange/90 transition-colors group"
      >
        ← Back home
      </Link>
    </div>
  )
}
