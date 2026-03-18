import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Whether you need a full marketing system, a new website, or a strategic second opinion — let's talk.",
}

export default function ContactPage() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Left column */}
        <div>
          <p className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6">
            Let&apos;s Talk
          </p>
          <h1 className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-8 text-balance">
            Ready to build something that works?
          </h1>
          <p className="text-mid-gray font-body text-lg leading-relaxed mb-12">
            Whether you need a full marketing system, a new website, or a strategic second opinion —
            let&apos;s talk. I work with a small number of clients at a time so every engagement gets
            my full attention.
          </p>

          {/* Contact detail */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-px bg-electric-orange" />
              <a
                href="mailto:jacob@jacobdarling.com"
                className="text-sm text-mid-gray font-body hover:text-warm-off-white transition-colors"
              >
                jacob@jacobdarling.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-px bg-electric-orange" />
              <span className="text-sm text-mid-gray font-body">Indianapolis, IN</span>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <ContactForm />
      </div>
    </main>
  )
}
