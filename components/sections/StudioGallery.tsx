'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import styles from './StudioGallery.module.css'

type Section = 'photography' | 'graphic-design' | 'projects'

const sections: { key: Section; label: string; folder: string }[] = [
  { key: 'photography', label: 'Photography', folder: 'studio/photography' },
  { key: 'graphic-design', label: 'Design', folder: 'studio/graphic-design' },
  { key: 'projects', label: 'Projects', folder: 'studio/projects' },
]

type GalleryImage = {
  src: string
  width: number
  height: number
  alt: string
}

function LightboxModal({ image, onClose }: { image: GalleryImage; onClose: () => void }) {
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
        className={styles.lightboxBackdrop}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.lightboxContent}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={styles.lightboxImage}
            sizes="90vw"
            unoptimized
          />
          <button onClick={onClose} className={styles.lightboxClose}>
            ✕ Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function GalleryGrid({ images, onSelect }: { images: GalleryImage[]; onSelect: (img: GalleryImage) => void }) {
  return (
    <div className={styles.grid}>
      {images.map((img, i) => (
        <GalleryItem key={img.src} img={img} index={i} onSelect={onSelect} />
      ))}
    </div>
  )
}

function GalleryItem({ img, index, onSelect }: { img: GalleryImage; index: number; onSelect: (img: GalleryImage) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className={styles.gridItem}
      onClick={() => onSelect(img)}
    >
      <div className={styles.imageWrap}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <div className={styles.imageOverlay} />
      </div>
    </motion.div>
  )
}

function EmptyState({ section }: { section: string }) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyText}>
        Images from{' '}
        <code className={styles.emptyCode}>studio/{section}/</code>{' '}
        will appear here once uploaded to Cloudinary.
      </p>
    </div>
  )
}

async function fetchCloudinaryImages(folder: string, recursive = false): Promise<GalleryImage[]> {
  try {
    const params = new URLSearchParams({ folder })
    if (recursive) params.set('recursive', 'true')
    const res = await fetch(`/api/studio/images?${params.toString()}`, {
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
    projects: [],
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
        const imgs = await fetchCloudinaryImages(section.folder, section.key === 'projects')
        setImages((prev) => ({ ...prev, [activeSection]: imgs }))
      }
      setLoading(false)
    }
    load()
  }, [activeSection]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentImages = images[activeSection]

  return (
    <>
      <main className={styles.main}>
        <div className={styles.inner}>
          {/* Header */}
          <div ref={headerRef} className={styles.header}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className={styles.eyebrow}
            >
              Studio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={styles.headline}
            >
              Visual work.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.subheadline}
            >
              Photography, graphic design, and brand artifacts — a visual record across 15+ years of
              client work.
            </motion.p>
          </div>

          {/* Section tabs */}
          <div className={styles.tabs}>
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`${styles.tab} ${activeSection === s.key ? styles.tabActive : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Gallery */}
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
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
