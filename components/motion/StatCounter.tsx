'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import styles from './StatCounter.module.css'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  /** Delay before count begins, in seconds */
  delay?: number
}

export function StatCounter({
  value,
  suffix = '+',
  prefix = '',
  label,
  delay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const displayValue = useMotionValue(0)
  const springValue = useSpring(displayValue, { stiffness: 50, damping: 25, mass: 1 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return

    const timeout = setTimeout(() => {
      animate(displayValue, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (displayRef.current) {
            const rounded = Math.round(latest)
            displayRef.current.textContent =
              value >= 1000
                ? (rounded / 1000).toFixed(0) + (value >= 1000 ? ',000' : '')
                : String(rounded)
          }
        },
      })
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [isInView, value, delay, displayValue])

  return (
    <div ref={ref} className={styles.stat}>
      <p className={styles.value}>
        {prefix}
        <span ref={displayRef} className={styles.number}>
          0
        </span>
        {suffix}
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  )
}
