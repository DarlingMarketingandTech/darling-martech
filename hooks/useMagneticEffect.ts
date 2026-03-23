'use client'

import { useRef, useCallback, RefObject } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 }

/**
 * Magnetic pull effect — button translates toward cursor within radius.
 * Attach ref to the element and spread { onMouseMove, onMouseLeave } on it.
 * Use x/y MotionValues in the element's style prop.
 */
export function useMagneticEffect(radius = 150, maxPull = 20): {
  ref: RefObject<HTMLElement | null>
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
  onMouseMove: (e: React.MouseEvent) => void
  onMouseLeave: () => void
} {
  const ref = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING_CONFIG)
  const y = useSpring(rawY, SPRING_CONFIG)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const pull = 1 - dist / radius
        rawX.set(dx * pull * (maxPull / radius) * 2)
        rawY.set(dy * pull * (maxPull / radius) * 2)
      }
    },
    [radius, maxPull, rawX, rawY]
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, x, y, onMouseMove, onMouseLeave }
}
