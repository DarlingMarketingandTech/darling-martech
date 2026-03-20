import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { GoogleAnalytics } from '@/components/providers/Analytics'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { BackToTop } from '@/components/ui/BackToTop'
import { CookieConsent } from '@/components/ui/CookieConsent'

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

// Cabinet Grotesk — all weights for optimal performance
const cabinetGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Thin.woff2',
      weight: '100',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Extralight.woff2',
      weight: '200',
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Light.woff2',
      weight: '300',
    },
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
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Black.woff2',
      weight: '900',
    },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://darlingmartech.com'),
  title: {
    default: 'Darling MarTech — Marketing Strategy & Technology',
    template: '%s | Darling MarTech',
  },
  description:
    'Jacob Darling builds the marketing infrastructure that makes small businesses and startups grow — strategy, technology, automation, and execution. Based in Indianapolis, IN.',
  keywords: [
    'marketing strategy',
    'marketing technology',
    'MarTech',
    'CRM',
    'marketing automation',
    'web development',
    'Indianapolis',
    'Jacob Darling',
  ],
  authors: [{ name: 'Jacob Darling' }],
  creator: 'Jacob Darling',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://darlingmartech.com',
    siteName: 'Darling MarTech',
    title: 'Darling MarTech — Marketing Strategy & Technology',
    description:
      'Jacob Darling builds the marketing infrastructure that makes small businesses and startups grow — strategy, technology, automation, and execution.',
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
    title: 'Darling MarTech — Marketing Strategy & Technology',
    description:
      'Jacob Darling builds the marketing infrastructure that makes small businesses and startups grow.',
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
    <html lang="en" className={`${inter.variable} ${cabinetGrotesk.variable} ${instrumentSerif.variable}`}>
      <body>
        <GoogleAnalytics />
        <LenisProvider>
          <LocalBusinessJsonLd />
          <ScrollProgress />
          <Nav />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </LenisProvider>
      </body>
    </html>
  )
}
