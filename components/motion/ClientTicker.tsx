'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ClientTicker.module.css'

const clients = [
  'Urgent Care Indy',
  'Hoosier Boy Barbershop',
  'Riley Bennett Egloff',
  'Behr Pet Essentials',
  'Primary Colours',
  'Russell Painting Co.',
  'Graston Technique',
  'Clean Aesthetic',
]

// Duplicate for seamless loop
const doubled = [...clients, ...clients]

interface ClientTickerProps {
  /** Scroll parallax multiplier. 1.2 = moves 20% faster than scroll. */
  parallaxMultiplier?: number
}

export function ClientTicker({ parallaxMultiplier = 1.2 }: ClientTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Parallax shift: as section scrolls through viewport, translate X
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', `-${60 * parallaxMultiplier}px`]
  )

  return (
    <div ref={containerRef} className={styles.container} aria-label="Clients">
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      <div className={styles.track}>
        <motion.div className={styles.inner} style={{ x }}>
          {/* Inner ticker runs on CSS animation, parallax is layered via motion */}
          <div className={styles.tickerRow}>
            {doubled.map((client, i) => (
              <span key={i} className={styles.item}>
                <span className={styles.dot} aria-hidden="true" />
                <motion.span
                  className={styles.name}
                  whileHover={{
                    color: 'var(--color-text)',
                    rotateY: 5,
                    z: 10,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  style={{ display: 'inline-block', perspective: '400px' }}
                >
                  {client}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
