import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        'electric-orange': '#FF4D00',
        'warm-off-white': '#F5F0E8',
        'mid-gray': '#888888',
        surface: '#141414',
        'surface-raised': '#1A1A1A',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
      },
      fontFamily: {
        display: ['var(--font-cabinet-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        accent: ['var(--font-instrument-serif)', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
      },
      lineHeight: {
        display: '0.95',
        tight: '1.1',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [require('tailwindcss-animate') as any],
}
export default config
