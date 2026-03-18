'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/lab', label: 'Lab' },
  { href: '/studio', label: 'Studio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-obsidian/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 group">
          <span className="font-display font-bold text-lg text-warm-off-white tracking-tight group-hover:text-warm-off-white transition-colors">
            Darling
          </span>
          <span className="font-display font-bold text-lg text-electric-orange tracking-tight">
            MarTech
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-mid-gray hover:text-warm-off-white transition-colors duration-200 font-body"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium bg-electric-orange text-warm-off-white px-4 py-2 hover:bg-electric-orange/90 transition-colors duration-200 font-body"
          >
            Let&apos;s talk
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn('block w-5 h-0.5 bg-warm-off-white transition-all duration-200', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('block w-5 h-0.5 bg-warm-off-white transition-all duration-200', menuOpen && 'opacity-0')} />
          <span className={cn('block w-5 h-0.5 bg-warm-off-white transition-all duration-200', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-obsidian border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-mid-gray hover:text-warm-off-white transition-colors font-body"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block text-sm font-medium bg-electric-orange text-warm-off-white px-5 py-3 text-center hover:bg-electric-orange/90 transition-colors font-body"
              >
                Let&apos;s talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
