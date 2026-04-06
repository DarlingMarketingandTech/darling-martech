'use client'

import { useState, useEffect, useRef, useMemo, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowLeft, ArrowRight, XIcon } from '@phosphor-icons/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  WORK_STUDIO_DISCIPLINES,
  WORK_STUDIO_EVIDENCE,
  type WorkStudioDiscipline,
  type WorkStudioEvidenceItem,
} from '@/data/work/studio-evidence'
import styles from './WorkIndex.module.css'

const STUDIO_TAB_IDS: Record<WorkStudioDiscipline, string> = {
  Photography: 'studio-tab-photography',
  'Identity Systems': 'studio-tab-identity-systems',
}

const STUDIO_PANEL_ID = 'studio-carousel-panel'
const STUDIO_THUMBNAIL_GROUP_ID = 'studio-thumbnail-group'

function getThumbId(itemId: string) {
  return `studio-thumb-${itemId}`
}

function scrollThumbCenteredInTrack(
  track: HTMLDivElement,
  thumb: HTMLButtonElement,
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
  const [active, setActive] = useState<WorkStudioDiscipline>('Photography')
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxItem, setLightboxItem] = useState<WorkStudioEvidenceItem | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null)
  const lightboxReturnFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()

  const visible = useMemo(
    () => WORK_STUDIO_EVIDENCE.filter((item) => item.category === active),
    [active]
  )

  const safeActiveIndex = visible.length === 0
    ? 0
    : Math.min(activeIndex, visible.length - 1)

  const activeItem = visible[safeActiveIndex] ?? null

  // Keep the active thumb in view inside the horizontal track only — never
  // scrollIntoView on the document (avoids Lenis / viewport jump).
  useEffect(() => {
    const track = trackRef.current
    const thumb = itemRefs.current[safeActiveIndex]
    if (!track || !thumb) return
    scrollThumbCenteredInTrack(track, thumb, reduceMotion ? 'instant' : 'smooth')
  }, [safeActiveIndex, active, reduceMotion])

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
    if (visible.length === 0) return
    setActiveIndex((current) => {
      const normalized = Math.min(current, visible.length - 1)
      return (normalized - 1 + visible.length) % visible.length
    })
  }

  const onNext = () => {
    if (visible.length === 0) return
    setActiveIndex((current) => {
      const normalized = Math.min(current, visible.length - 1)
      return (normalized + 1) % visible.length
    })
  }

  const handleStudioTabKeyDown = (event: ReactKeyboardEvent, cat: WorkStudioDiscipline) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()

    if (event.key === 'Home') {
      const nextCat = WORK_STUDIO_DISCIPLINES[0]
      setActive(nextCat)
      setActiveIndex(0)
      requestAnimationFrame(() => document.getElementById(STUDIO_TAB_IDS[nextCat])?.focus())
      return
    }

    if (event.key === 'End') {
      const nextCat = WORK_STUDIO_DISCIPLINES[WORK_STUDIO_DISCIPLINES.length - 1]
      setActive(nextCat)
      setActiveIndex(0)
      requestAnimationFrame(() => document.getElementById(STUDIO_TAB_IDS[nextCat])?.focus())
      return
    }

    const i = WORK_STUDIO_DISCIPLINES.indexOf(cat)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = (i + delta + WORK_STUDIO_DISCIPLINES.length) % WORK_STUDIO_DISCIPLINES.length
    const nextCat = WORK_STUDIO_DISCIPLINES[next]
    setActive(nextCat)
    setActiveIndex(0)
    requestAnimationFrame(() => document.getElementById(STUDIO_TAB_IDS[nextCat])?.focus())
  }

  const handleThumbKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

    event.preventDefault()
    if (visible.length === 0) return

    let nextIndex = index

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % visible.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + visible.length) % visible.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = visible.length - 1
    }

    setActiveIndex(nextIndex)
    requestAnimationFrame(() => itemRefs.current[nextIndex]?.focus())
  }

  const openLightbox = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: WorkStudioEvidenceItem
  ) => {
    lightboxReturnFocusRef.current = event.currentTarget
    setLightboxItem(item)
  }

  return (
    <section className={styles.studioSection} aria-label="Studio evidence">
      <div className={styles.studioHeader}>
        <div className={styles.studioMeta}>
          <p className={styles.studioEyebrow}>Supporting evidence</p>
          <h2 className={styles.studioHeadline}>Additional proof from delivery work.</h2>
          <p className={styles.studioIntro}>
            Not every meaningful signal needs a full case study. This curated set shows
            execution quality, brand judgment, and proof-supporting assets tied to client work.
          </p>
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
          {WORK_STUDIO_DISCIPLINES.map((cat) => (
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
          role="tabpanel"
          aria-labelledby={STUDIO_TAB_IDS[active]}
          tabIndex={-1}
          className={styles.studioPanel}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
        >
          {activeItem && (
            <>
              <div className={styles.studioFeatureWrap}>
                <div className={styles.studioFeatureMedia}>
                  <button
                    type="button"
                    className={styles.studioFeatureButton}
                    aria-label={`Open detail view: ${activeItem.title}`}
                    aria-haspopup="dialog"
                    onClick={(event) => openLightbox(event, activeItem)}
                  >
                    <CldImage
                      src={activeItem.publicId}
                      alt={activeItem.alt}
                      width={1200}
                      height={900}
                      crop="fill"
                      gravity="auto"
                      className={styles.studioFeatureImage}
                      sizes="(min-width: 1000px) 44vw, (min-width: 640px) 84vw, 92vw"
                    />
                  </button>
                </div>

                <aside className={styles.studioEvidencePanel} aria-label="Evidence details for selected studio item">
                  <p className={styles.studioEvidenceCategory}>{activeItem.category}</p>
                  <h3 className={styles.studioEvidenceTitle}>{activeItem.title}</h3>

                  <p className={styles.studioEvidenceMeta}>
                    {activeItem.client ? `${activeItem.client}` : 'Selected studio proof'}
                    {activeItem.year ? ` • ${activeItem.year}` : ''}
                  </p>

                  <div className={styles.studioEvidenceRows}>
                    <p className={styles.studioEvidenceRowLabel}>Context</p>
                    <p className={styles.studioEvidenceRow}>{activeItem.context}</p>

                    <p className={styles.studioEvidenceRowLabel}>What this proves</p>
                    <p className={styles.studioEvidenceRow}>{activeItem.proves}</p>
                  </div>

                  <div className={styles.studioEvidenceActions}>
                    <button
                      type="button"
                      className={styles.studioOpenButton}
                      aria-haspopup="dialog"
                      onClick={(event) => openLightbox(event, activeItem)}
                    >
                      View full evidence
                    </button>
                    {activeItem.relatedHref && activeItem.relatedLabel && (
                      <Link href={activeItem.relatedHref} className={styles.studioRelatedLink}>
                        {activeItem.relatedLabel}
                        <ArrowRight weight="light" className={styles.studioLinkIcon} aria-hidden />
                      </Link>
                    )}
                  </div>
                </aside>
              </div>

              <div
                className={styles.studioTrack}
                role="group"
                id={STUDIO_THUMBNAIL_GROUP_ID}
                aria-label="Choose a studio evidence item"
                ref={trackRef}
              >
                {visible.map((item, index) => (
                  <div key={item.id} className={styles.studioThumb}>
                    <button
                      type="button"
                      id={getThumbId(item.id)}
                      ref={(el) => {
                        itemRefs.current[index] = el
                      }}
                      className={`${styles.studioThumbButton} ${index === safeActiveIndex ? styles.studioThumbButtonActive : ''}`}
                      aria-pressed={index === safeActiveIndex}
                      aria-label={`Select evidence item: ${item.title}`}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => handleThumbKeyDown(event, index)}
                    >
                      <CldImage
                        src={item.publicId}
                        alt={item.alt}
                        width={400}
                        height={300}
                        crop="fill"
                        gravity="auto"
                        className={styles.studioThumbImage}
                        sizes="(min-width: 1000px) 16vw, (min-width: 640px) 24vw, 42vw"
                      />
                      <span className={styles.studioThumbTitle}>{item.title}</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className={styles.studioFooter}>
        <Link href="/studio" className={styles.studioLink}>
          Browse full studio archive
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
              aria-labelledby="studio-lightbox-title"
              aria-describedby="studio-lightbox-context studio-lightbox-proves"
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
                aria-label="Close studio detail view"
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
              <div className={styles.lightboxMeta}>
                <p className={styles.lightboxEyebrow}>{lightboxItem.category}</p>
                <h3 id="studio-lightbox-title" className={styles.lightboxTitle}>{lightboxItem.title}</h3>
                <p className={styles.lightboxCaption}>{lightboxItem.alt}</p>
                <p id="studio-lightbox-context" className={styles.lightboxContext}>
                  <span className={styles.lightboxLabel}>Context:</span> {lightboxItem.context}
                </p>
                <p id="studio-lightbox-proves" className={styles.lightboxProves}>
                  <span className={styles.lightboxLabel}>What this proves:</span> {lightboxItem.proves}
                </p>
                {lightboxItem.relatedHref && lightboxItem.relatedLabel && (
                  <Link href={lightboxItem.relatedHref} className={styles.studioRelatedLink}>
                    {lightboxItem.relatedLabel}
                    <ArrowRight weight="light" className={styles.studioLinkIcon} aria-hidden />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
