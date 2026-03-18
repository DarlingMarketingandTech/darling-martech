'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { buildCloudinaryUrl, cloudinaryLoader } from '@/lib/cloudinary'

type Section = 'photography' | 'graphic-design' | 'proof'

const sections: { key: Section; label: string; folder: string }[] = [
  { key: 'photography', label: 'Photography', folder: 'studio/photography' },
  { key: 'graphic-design', label: 'Design', folder: 'studio/graphic-design' },
  { key: 'proof', label: 'Proof', folder: 'studio/proof' },
]

// Cloudinary images are fetched client-side via the Cloudinary API
// These are placeholder entries — the component fetches real images from Cloudinary
type GalleryImage = {
  publicId: string
  width: number
  height: number
  alt: string
}

function LightboxModal({
  image,
  onClose,
}: {
  image: GalleryImage
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl max-h-[90vh] w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            loader={cloudinaryLoader}
            src={image.publicId}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="object-contain max-h-[85vh] w-auto mx-auto"
            sizes="90vw"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-sm font-body transition-colors"
          >
            ✕ Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function GalleryGrid({ images, onSelect }: { images: GalleryImage[]; onSelect: (img: GalleryImage) => void }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
      {images.map((img, i) => (
        <GalleryItem key={img.publicId} img={img} index={i} onSelect={onSelect} />
      ))}
    </div>
  )
}

function GalleryItem({
  img,
  index,
  onSelect,
}: {
  img: GalleryImage
  index: number
  onSelect: (img: GalleryImage) => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="break-inside-avoid cursor-pointer group overflow-hidden"
      onClick={() => onSelect(img)}
    >
      <div className="relative overflow-hidden bg-white/5">
        <Image
          loader={cloudinaryLoader}
          src={img.publicId}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
    </motion.div>
  )
}

function EmptyState({ section }: { section: string }) {
  return (
    <div className="py-24 text-center">
      <p className="text-mid-gray/40 font-body text-sm">
        Images from{' '}
        <code className="text-electric-orange/60 font-mono text-xs">
          studio/{section}/
        </code>{' '}
        will appear here once uploaded to Cloudinary.
      </p>
    </div>
  )
}

// In production, fetch from Cloudinary Admin API via a server action or API route.
// For now, this component renders with whatever images are in Cloudinary.
// To populate: upload images to Cloudinary under studio/photography/, studio/graphic-design/, studio/proof/
async function fetchCloudinaryImages(folder: string): Promise<GalleryImage[]> {
  try {
    const res = await fetch(`/api/studio/images?folder=${encodeURIComponent(folder)}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export function StudioGallery() {
  const [activeSection, setActiveSection] = useState<Section>('photography')
  const [images, setImages] = useState<Record<Section, GalleryImage[]>>({
    photography: [],
    'graphic-design': [],
    proof: [],
  })
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  useEffect(() => {
    async function load() {
      setLoading(true)
      const section = sections.find((s) => s.key === activeSection)!
      if (images[activeSection].length === 0) {
        const imgs = await fetchCloudinaryImages(section.folder)
        setImages((prev) => ({ ...prev, [activeSection]: imgs }))
      }
      setLoading(false)
    }
    load()
  }, [activeSection]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentImages = images[activeSection]

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-electric-orange text-xs font-body tracking-widest uppercase mb-6"
            >
              Studio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.97] tracking-tightest text-warm-off-white mb-6 text-balance max-w-2xl"
            >
              Visual work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-mid-gray font-body text-lg leading-relaxed max-w-xl"
            >
              Photography, graphic design, and brand artifacts — a visual record across 15+ years of
              client work.
            </motion.p>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1 mb-12 border-b border-white/8">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`px-5 py-3 text-sm font-body transition-colors duration-150 border-b-2 -mb-px ${
                  activeSection === s.key
                    ? 'border-electric-orange text-warm-off-white'
                    : 'border-transparent text-mid-gray hover:text-warm-off-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Gallery */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-4 h-4 border border-electric-orange/40 border-t-electric-orange rounded-full animate-spin" />
            </div>
          ) : currentImages.length > 0 ? (
            <GalleryGrid images={currentImages} onSelect={setLightbox} />
          ) : (
            <EmptyState section={activeSection} />
          )}
        </div>
      </main>

      {lightbox && <LightboxModal image={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
