'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ReactLenis } from 'lenis/react'

type Props = {
  children: React.ReactNode
}

export function LenisProvider({ children }: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Respect user motion preferences to avoid forcing smooth-scroll.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(mediaQuery.matches)

    update()

    // Safari still prefers addListener/removeListener.
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', update)
      return () => mediaQuery.removeEventListener('change', update)
    }

    // eslint-disable-next-line deprecation/deprecation
    mediaQuery.addListener(update)
    // eslint-disable-next-line deprecation/deprecation
    return () => mediaQuery.removeListener(update)
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
