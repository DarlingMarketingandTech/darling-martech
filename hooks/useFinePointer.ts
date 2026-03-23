'use client'

import { useSyncExternalStore } from 'react'

export function useFinePointer() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia('(pointer: fine)')
      mediaQuery.addEventListener('change', onStoreChange)
      return () => mediaQuery.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(pointer: fine)').matches,
    () => false
  )
}
