'use client'

import { useEffect, useRef } from 'react'
import styles from './CursorSpotlight.module.css'

/**
 * Full-viewport radial gradient spotlight that tracks the cursor.
 * Only renders on desktop (pointer: fine). Hidden on touch devices.
 * Updates via CSS custom properties — no React re-renders on mouse move.
 */
export function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate if pointer is fine (mouse, not touch)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = divRef.current
    if (!el) return

    let rafId: number

    const onMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        el.style.setProperty('--cx', `${e.clientX}px`)
        el.style.setProperty('--cy', `${e.clientY}px`)
        rafId = 0
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div ref={divRef} className={styles.spotlight} aria-hidden="true" />
}
