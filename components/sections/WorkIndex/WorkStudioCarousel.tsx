'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react'
import styles from './WorkIndex.module.css'

// ── Curated studio assets ─────────────────────────────────────────────────────
// Static list — no API call. Add/remove as portfolio evolves.

type StudioCategory = 'Photography' | 'Graphic Design'

interface StudioItem {
  publicId: string
  alt: string
  category: StudioCategory
}

const STUDIO_ITEMS: StudioItem[] = [
  // Photography
  { publicId: 'DSC_8684', alt: '317 BBQ — food photography', category: 'Photography' },
  { publicId: 'GC_Photography_317-81_1', alt: '317 BBQ — lifestyle photography', category: 'Photography' },
  { publicId: '635889083997282366-Dr.-James-Pike', alt: 'Pike Medical — professional portrait', category: 'Photography' },
  { publicId: 'PMC-Dr.-Pike-Xray', alt: 'Pike Medical — clinical imagery', category: 'Photography' },
  { publicId: 'barbershop-4484297_1920', alt: 'Hoosier Boy Barbershop — atmosphere', category: 'Photography' },
  { publicId: 'IMG_1884', alt: 'Primary Colours — event photography', category: 'Photography' },
  // Graphic Design
  { publicId: 'graston_technique_logo', alt: 'Graston Technique® — brand identity', category: 'Graphic Design' },
  { publicId: 'hoosierboy-logo-anchor', alt: 'Hoosier Boy Barbershop — logo system', category: 'Graphic Design' },
  { publicId: 'Black_Letter_-_Full_Logo', alt: 'Black Letter — brand identity', category: 'Graphic Design' },
  { publicId: 'clean-aesthetics-logo-anchor', alt: 'Clean Aesthetic — brand identity', category: 'Graphic Design' },
  { publicId: 'primary-colours-logo-anchor', alt: 'Primary Colours — identity system', category: 'Graphic Design' },
  { publicId: 'Perpetual_Movement_Coaching-_Secondary_Logo', alt: 'Perpetual Movement Fitness — logo', category: 'Graphic Design' },
]

const CATEGORIES: StudioCategory[] = ['Photography', 'Graphic Design']

export function WorkStudioCarousel() {
  const [active, setActive] = useState<StudioCategory>('Photography')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [lightboxItem, setLightboxItem] = useState<StudioItem | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  const visible = STUDIO_ITEMS.filter((item) => item.category === active)

  useEffect(() => {
    if (!visible.length) return
    const node = itemRefs.current[activeIndex]
    node?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeIndex, visible])

  useEffect(() => {
    if (isPaused || !visible.length) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visible.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [isPaused, visible.length])

  useEffect(() => {
    if (!lightboxItem) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxItem(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [lightboxItem])

  const onPrev = () => {
    setActiveIndex((current) => (current - 1 + visible.length) % visible.length)
  }

  const onNext = () => {
    setActiveIndex((current) => (current + 1) % visible.length)
  }

  return (
    <section className={styles.studioSection} aria-label="Studio work — creative proof">
      <div className={styles.studioHeader}>
        <div className={styles.studioMeta}>
          <p className={styles.studioEyebrow}>Creative Work</p>
          <h2 className={styles.studioHeadline}>Studio</h2>
        </div>

        <div className={styles.studioControls}>
          <button
            type="button"
            className={styles.studioControlBtn}
            onClick={onPrev}
            aria-label="Previous studio image"
          >
            <ArrowLeft weight="regular" size={16} />
          </button>
          <button
            type="button"
            className={styles.studioControlBtn}
            onClick={onNext}
            aria-label="Next studio image"
          >
            <ArrowRight weight="regular" size={16} />
          </button>
        </div>

        <div className={styles.studioToggle} role="tablist" aria-label="Filter studio by type">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => {
                setActive(cat)
                setActiveIndex(0)
              }}
              className={`${styles.studioToggleBtn} ${active === cat ? styles.studioToggleBtnActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.studioTrack}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {visible.map((item, index) => (
            <div
              key={item.publicId}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={styles.studioThumb}
            >
              <button
                type="button"
                className={styles.studioThumbButton}
                aria-label={`Open full image view: ${item.alt}`}
                onClick={() => setLightboxItem(item)}
              >
                <CldImage
                  src={item.publicId}
                  alt={item.alt}
                  width={640}
                  height={480}
                  crop="fill"
                  gravity="auto"
                  className={styles.studioThumbImage}
                  sizes="(min-width: 900px) 20vw, (min-width: 480px) 40vw, 70vw"
                />
              </button>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className={styles.studioFooter}>
        <Link href="/studio" className={styles.studioLink}>
          See full studio
          <ArrowRight weight="light" className={styles.studioLinkIcon} />
        </Link>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setLightboxItem(null)}
                aria-label="Close image preview"
              >
                <X weight="bold" size={20} />
              </button>
              <CldImage
                src={lightboxItem.publicId}
                alt={lightboxItem.alt}
                width={1400}
                height={1050}
                crop="fill"
                gravity="auto"
                className={styles.lightboxImage}
                sizes="(max-width: 640px) 90vw, 70vw"
              />
              <p className={styles.lightboxCaption}>{lightboxItem.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
