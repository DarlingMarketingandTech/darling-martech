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

// Cabinet Grotesk variable font from Fontshare
const cabinetGrotesk = localFont({
  src: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet-grotesk',
  display: 'swap',
  weight: '100 900',
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
      <body className="bg-obsidian text-warm-off-white antialiased">
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
