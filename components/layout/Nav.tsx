'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { springStandard } from '@/lib/motion'

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
        'fixed top-0 left-0 right-0 z-50',
        scrolled ? 'border-b' : 'bg-transparent'
      )}
      style={scrolled ? {
        background: 'rgba(10,10,10,0.90)',
        backdropFilter: 'blur(8px)',
        borderColor: 'var(--color-border)',
      } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5">
          <span className="font-display font-bold text-lg" style={{ color: 'var(--color-text)' }}>
            Darling
          </span>
          <span className="font-display font-bold text-lg" style={{ color: 'var(--color-accent)' }}>
            MarTech
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium font-body px-4 py-2"
            style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
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
          <motion.span
            className="block w-5 h-[1.5px] origin-center"
            style={{ background: 'var(--color-text)' }}
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={springStandard}
          />
          <motion.span
            className="block w-5 h-[1.5px]"
            style={{ background: 'var(--color-text)' }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={springStandard}
          />
          <motion.span
            className="block w-5 h-[1.5px] origin-center"
            style={{ background: 'var(--color-text)' }}
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={springStandard}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={springStandard}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'var(--color-base)', borderColor: 'var(--color-border)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-body"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block text-sm font-medium font-body px-5 py-3 text-center"
                style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
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
