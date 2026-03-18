import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-0">
            <span className="font-display font-bold text-base text-warm-off-white">Darling</span>
            <span className="font-display font-bold text-base text-electric-orange">MarTech</span>
          </Link>
          <p className="text-sm text-mid-gray font-body max-w-xs">
            Marketing strategy and technology for small businesses and startups.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-mid-gray font-body">
          <Link href="/#services" className="hover:text-warm-off-white transition-colors">Services</Link>
          <Link href="/#work" className="hover:text-warm-off-white transition-colors">Work</Link>
          <Link href="/about" className="hover:text-warm-off-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-warm-off-white transition-colors">Contact</Link>
        </nav>

        {/* Legal */}
        <div className="text-xs text-mid-gray/60 font-body">
          <p>© {new Date().getFullYear()} Marketing and Technology LLC</p>
          <p className="mt-1">Indianapolis, IN · <a href="mailto:jacob@jacobdarling.com" className="hover:text-mid-gray transition-colors">jacob@jacobdarling.com</a></p>
        </div>
      </div>
    </footer>
  )
}
