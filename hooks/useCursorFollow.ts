'use client'

import { useState, useEffect, useCallback } from 'react'

export interface CursorPosition {
  x: number
  y: number
}

/**
 * Tracks cursor position, throttled to ~60fps.
 * Returns { x, y } in viewport pixels and isHovering state.
 */
export function useCursorFollow() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleEnter = useCallback(() => setIsHovering(true), [])
  const handleLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    let rafId: number
    let lastX = 0
    let lastY = 0

    const throttled = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPosition({ x: lastX, y: lastY })
          rafId = 0
        })
      }
    }

    window.addEventListener('mousemove', throttled, { passive: true })
    window.addEventListener('mouseenter', handleEnter)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', throttled)
      window.removeEventListener('mouseenter', handleEnter)
      window.removeEventListener('mouseleave', handleLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [handleEnter, handleLeave])

  return { position, isHovering }
}
