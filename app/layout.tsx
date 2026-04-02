import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { GoogleAnalytics } from '@/components/providers/Analytics'
import { ClientCosmetics } from '@/components/layout/ClientCosmetics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

// Cabinet Grotesk — keep only commonly used weights to reduce font payload.
const cabinetGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2',
      weight: '700',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2',
      weight: '800',
    },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://darlingmartech.com'),
  title: {
    default: 'Darling MarTech — Strategy, Systems & Growth Infrastructure',
    template: '%s | Darling MarTech',
  },
  description:
    'Strategy, systems, and execution for SMBs and startups. Jacob Darling builds the marketing infrastructure that drives measurable growth — websites, CRM, automation, and performance systems.',
  keywords: [
    'marketing strategy consultant',
    'marketing systems',
    'CRM architecture',
    'marketing automation',
    'conversion optimization',
    'local SEO',
    'MarTech consultant',
    'Indianapolis marketing consultant',
    'Jacob Darling',
  ],
  authors: [{ name: 'Jacob Darling' }],
  creator: 'Jacob Darling',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darlingmartech.com',
    siteName: 'Darling MarTech',
    title: 'Strategy, Systems & Growth Infrastructure',
    description:
      'Strategy + implementation + measurement — built into one system. Marketing infrastructure for SMBs and startups.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Darling MarTech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategy, Systems & Growth Infrastructure',
    description:
      'Marketing systems that actually drive growth — not disconnected tactics.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cabinetGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <GoogleAnalytics />
        <LenisProvider>
          {/* Cosmetic UI is deferred in a Client Component to avoid Server Component build constraints. */}
          <ClientCosmetics position="top" />
          <LocalBusinessJsonLd />
          <Nav />
          <main>{children}</main>
          <Footer />
          <ClientCosmetics position="bottom" />
        </LenisProvider>
      </body>
    </html>
  )
}
