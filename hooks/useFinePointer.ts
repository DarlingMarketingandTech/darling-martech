'use client'

import { useEffect, useState } from 'react'

export function useFinePointer() {
  const [isFinePointer, setIsFinePointer] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: fine)').matches
      : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const handler = (event: MediaQueryListEvent) => setIsFinePointer(event.matches)

    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return isFinePointer
}
