'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

type Props = {
  position: 'top' | 'bottom'
}

// Purely cosmetic / convenience UI.
// These should never participate in the server-rendered HTML tree.
const CursorSpotlight = dynamic(
  () =>
    import('@/components/interactive/CursorSpotlight').then(
      (m) => m.CursorSpotlight
    ),
  { ssr: false }
)

const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((m) => m.ScrollProgress),
  { ssr: false }
)

const BackToTop = dynamic(
  () => import('@/components/ui/BackToTop').then((m) => m.BackToTop),
  { ssr: false }
)

const CookieConsent = dynamic(
  () => import('@/components/ui/CookieConsent').then((m) => m.CookieConsent),
  { ssr: false }
)

export function ClientCosmetics({ position }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    queueMicrotask(() => setMounted(true))
  }, [])

  // Keep server render and first client render identical.
  if (!mounted) return null

  if (position === 'top') {
    return (
      <>
        <CursorSpotlight />
        <ScrollProgress />
      </>
    )
  }

  return (
    <>
      <BackToTop />
      <CookieConsent />
    </>
  )
}
