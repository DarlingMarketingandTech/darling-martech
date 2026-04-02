'use client'

import dynamic from 'next/dynamic'

type Props = {
  position: 'top' | 'bottom'
}

// These are purely cosmetic / convenience UI elements.
// Keep them out of the server render path and load them lazily.
const CursorSpotlight = dynamic(
  () =>
    import('@/components/interactive/CursorSpotlight').then(
      (m) => m.CursorSpotlight
    ),
  { ssr: false, loading: () => null }
)

const ScrollProgress = dynamic(
  () => import('@/components/ui/ScrollProgress').then((m) => m.ScrollProgress),
  { ssr: false, loading: () => null }
)

const BackToTop = dynamic(
  () => import('@/components/ui/BackToTop').then((m) => m.BackToTop),
  { ssr: false, loading: () => null }
)

const CookieConsent = dynamic(
  () => import('@/components/ui/CookieConsent').then((m) => m.CookieConsent),
  { ssr: false, loading: () => null }
)

export function ClientCosmetics({ position }: Props) {
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
