'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'

type GalleryImage = {
  src: string
  width: number
  height: number
  alt: string
}

function GalleryItem({ img, index }: { img: GalleryImage; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="break-inside-avoid overflow-hidden"
      style={{ transitionDelay: `${(index % 6) * 0.06}s` }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className="w-full h-auto object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        unoptimized
      />
    </motion.div>
  )
}

export function CaseStudyImages({ cloudinaryFolder }: { cloudinaryFolder?: string }) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!cloudinaryFolder) return
    const params = new URLSearchParams({ folder: cloudinaryFolder, recursive: 'true' })
    fetch(`/api/studio/images?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: GalleryImage[]) => setImages(data))
      .catch(() => {})
  }, [cloudinaryFolder])

  if (!cloudinaryFolder || images.length === 0) return null

  return (
    <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem', marginTop: '4rem' }}>
      <motion.p
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '2rem',
        }}
      >
        Project Work
      </motion.p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3"
      >
        {images.map((img, i) => (
          <GalleryItem key={img.publicId} img={img} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
