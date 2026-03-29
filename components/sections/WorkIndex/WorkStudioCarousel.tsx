'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import { ArrowRight } from '@phosphor-icons/react'
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

const TRANSITION = {
  type: 'spring',
  stiffness: 180,
  damping: 24,
}

export function WorkStudioCarousel() {
  const [active, setActive] = useState<StudioCategory>('Photography')

  const visible = STUDIO_ITEMS.filter((item) => item.category === active)

  return (
    <section className={styles.studioSection} aria-label="Studio work — creative proof">
      <div className={styles.studioHeader}>
        <div className={styles.studioMeta}>
          <p className={styles.studioEyebrow}>Creative Work</p>
          <h2 className={styles.studioHeadline}>Studio</h2>
        </div>

        <div className={styles.studioToggle} role="tablist" aria-label="Filter studio by type">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
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
        >
          {visible.map((item) => (
            <div key={item.publicId} className={styles.studioThumb}>
              <CldImage
                src={item.publicId}
                alt={item.alt}
                width={480}
                height={360}
                crop="fill"
                gravity="auto"
                className={styles.studioThumbImage}
                sizes="(min-width: 900px) 20vw, (min-width: 480px) 40vw, 70vw"
              />
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
    </section>
  )
}
