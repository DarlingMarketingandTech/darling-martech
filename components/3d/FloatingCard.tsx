'use client'

import { useRef, useCallback, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface FloatingCardProps {
  children: ReactNode
  maxTilt?: number
  className?: string
}

const SPRING = { stiffness: 120, damping: 20 }

/**
 * Wraps a card and applies 3D tilt based on cursor position over the card.
 * Max tilt is ±maxTilt degrees on both axes.
 */
export function FloatingCard({ children, maxTilt = 12, className }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, SPRING)
  const springY = useSpring(rawY, SPRING)

  // rotateY: positive when cursor is right of center
  const rotateY = useTransform(springX, [-1, 1], [-maxTilt, maxTilt])
  // rotateX: positive when cursor is above center (invert for natural feel)
  const rotateX = useTransform(springY, [-1, 1], [maxTilt, -maxTilt])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      // Normalized -1 to 1
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      rawX.set(nx)
      rawY.set(ny)
    },
    [rawX, rawY]
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        willChange: 'transform',
      }}
    >
      {children}
    </motion.div>
  )
}
