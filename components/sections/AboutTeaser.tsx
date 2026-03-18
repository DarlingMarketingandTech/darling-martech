'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutTeaser() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] bg-white/5 overflow-hidden"
        >
          <Image
            src="/images/jacob-bio-photo-splash.jpg"
            alt="Jacob Darling"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Orange accent */}
          <div className="absolute bottom-0 left-0 w-16 h-1 bg-electric-orange" />
        </motion.div>

        {/* Copy */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-tightest text-warm-off-white mb-8"
          >
            Both sides.<br />One person.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-mid-gray font-body leading-relaxed text-base md:text-lg mb-10"
          >
            Most consultants know marketing or technology. I&apos;ve spent 15 years doing both —
            leading marketing teams, architecting CRM systems, building automation workflows, and
            shipping code. When you hire me, you get me directly. No account managers. No hand-offs.
            Just clear thinking and clean execution.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-electric-orange hover:gap-3 transition-all duration-200"
            >
              Read my story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
