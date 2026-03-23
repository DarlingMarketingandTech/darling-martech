'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollAnimationConfig {
  from: gsap.TweenVars
  to: gsap.TweenVars
  scrub?: boolean | number
  start?: string
  end?: string
  markers?: boolean
}

/**
 * Attaches a GSAP ScrollTrigger animation to the returned ref.
 * Cleans up on unmount.
 */
export function useScrollAnimation<T extends HTMLElement>(
  config: ScrollAnimationConfig
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, config.from, {
        ...config.to,
        scrollTrigger: {
          trigger: el,
          start: config.start ?? 'top 85%',
          end: config.end ?? 'bottom 15%',
          scrub: config.scrub ?? false,
          markers: config.markers ?? false,
        },
      })
    })

    return () => ctx.revert()
  }, [config])

  return ref
}
