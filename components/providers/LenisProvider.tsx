'use client'

import { useEffect, useMemo, useState } from 'react'
import { ReactLenis } from 'lenis/react'

type Props = {
  children: React.ReactNode
}

export function LenisProvider({ children }: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Respect user motion preferences to avoid forcing smooth-scroll.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateFromMatch = () => setPrefersReducedMotion(mediaQuery.matches)
    updateFromMatch()

    // Modern API (supported by current TS DOM libs and modern browsers)
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const options = useMemo(
    () => ({
      lerp: prefersReducedMotion ? 1 : 0.1,
      duration: prefersReducedMotion ? 0 : 1.4,
      smoothWheel: !prefersReducedMotion,
    }),
    [prefersReducedMotion]
  )

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
