'use client'

import { useState, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight, XIcon } from '@phosphor-icons/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
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

const STUDIO_TAB_IDS: Record<StudioCategory, string> = {
  Photography: 'studio-tab-photography',
  'Graphic Design': 'studio-tab-graphic-design',
}

const STUDIO_PANEL_ID = 'studio-carousel-panel'

function scrollThumbCenteredInTrack(
  track: HTMLDivElement,
  thumb: HTMLDivElement,
  behavior: ScrollBehavior
) {
  const trackRect = track.getBoundingClientRect()
  const thumbRect = thumb.getBoundingClientRect()
  const thumbLeftInTrack = thumbRect.left - trackRect.left + track.scrollLeft
  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
  const targetLeft = thumbLeftInTrack - (track.clientWidth - thumbRect.width) / 2
  const left = Math.max(0, Math.min(targetLeft, maxScroll))
  track.scrollTo({ left, behavior })
}

export function WorkStudioCarousel() {
  const [active, setActive] = useState<StudioCategory>('Photography')
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxItem, setLightboxItem] = useState<StudioItem | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null)
  const lightboxReturnFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  const visible = STUDIO_ITEMS.filter((item) => item.category === active)

  // Keep the active thumb in view inside the horizontal track only — never
  // scrollIntoView on the document (avoids Lenis / viewport jump).
  useEffect(() => {
    const track = trackRef.current
    const thumb = itemRefs.current[activeIndex]
    if (!track || !thumb) return
    scrollThumbCenteredInTrack(track, thumb, reduceMotion ? 'instant' : 'smooth')
  }, [activeIndex, active, reduceMotion])

  useEffect(() => {
    if (!lightboxItem) return
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxItem(null)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusClose = () => lightboxCloseRef.current?.focus()
    const id = requestAnimationFrame(focusClose)

    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      lightboxReturnFocusRef.current?.focus()
      lightboxReturnFocusRef.current = null
    }
  }, [lightboxItem])

  const onPrev = () => {
    setActiveIndex((current) => (current - 1 + visible.length) % visible.length)
  }

  const onNext = () => {
    setActiveIndex((current) => (current + 1) % visible.length)
  }

  const handleStudioTabKeyDown = (event: ReactKeyboardEvent, cat: StudioCategory) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const i = CATEGORIES.indexOf(cat)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = (i + delta + CATEGORIES.length) % CATEGORIES.length
    const nextCat = CATEGORIES[next]
    setActive(nextCat)
    setActiveIndex(0)
    requestAnimationFrame(() => document.getElementById(STUDIO_TAB_IDS[nextCat])?.focus())
  }

  return (
    <section className={styles.studioSection} aria-label="Studio work — creative proof">
      <div className={styles.studioHeader}>
        <div className={styles.studioMeta}>
          <p className={styles.studioEyebrow}>Creative proof</p>
          <h2 className={styles.studioHeadline}>From the studio</h2>
        </div>

        <div className={styles.studioControls}>
          <button
            type="button"
            className={styles.studioControlBtn}
            onClick={onPrev}
            aria-label="Previous studio image"
          >
            <ArrowLeft weight="regular" size={16} aria-hidden />
          </button>
          <button
            type="button"
            className={styles.studioControlBtn}
            onClick={onNext}
            aria-label="Next studio image"
          >
            <ArrowRight weight="regular" size={16} aria-hidden />
          </button>
        </div>

        <div className={styles.studioToggle} role="tablist" aria-label="Filter studio by type">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={STUDIO_TAB_IDS[cat]}
              type="button"
              role="tab"
              aria-selected={active === cat}
              aria-controls={STUDIO_PANEL_ID}
              tabIndex={active === cat ? 0 : -1}
              onClick={() => {
                setActive(cat)
                setActiveIndex(0)
              }}
              onKeyDown={(e) => handleStudioTabKeyDown(e, cat)}
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
          id={STUDIO_PANEL_ID}
          ref={trackRef}
          role="tabpanel"
          aria-labelledby={STUDIO_TAB_IDS[active]}
          tabIndex={-1}
          className={styles.studioTrack}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
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
                aria-haspopup="dialog"
                onClick={(e) => {
                  lightboxReturnFocusRef.current = e.currentTarget
                  setLightboxItem(item)
                }}
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
          <ArrowRight weight="light" className={styles.studioLinkIcon} aria-hidden />
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
            role="presentation"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              role="dialog"
              aria-modal="true"
              aria-label="Studio image preview"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={lightboxCloseRef}
                type="button"
                className={styles.lightboxClose}
                onClick={() => setLightboxItem(null)}
                aria-label="Close image preview"
              >
                <XIcon weight="bold" size={20} aria-hidden />
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
