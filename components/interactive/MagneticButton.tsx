'use client'

import { useRef, useCallback, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './MagneticButton.module.css'

interface MagneticButtonProps {
  children: ReactNode
  radius?: number
  maxPull?: number
  className?: string
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 }

/**
 * Wraps any child and applies a magnetic pull effect.
 * The wrapped element translates toward the cursor when within `radius` px.
 */
export function MagneticButton({
  children,
  radius = 150,
  maxPull = 20,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

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
        const pull = (1 - dist / radius) * maxPull
        rawX.set(dx * (pull / (dist || 1)))
        rawY.set(dy * (pull / (dist || 1)))
      }
    },
    [radius, maxPull, rawX, rawY]
  )

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      className={`${styles.wrapper} ${className ?? ''}`}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}
