// GA4 Analytics Utility
// Set NEXT_PUBLIC_GA_ID in your environment to activate tracking.
// This utility is safe to include in builds — it no-ops when the ID is absent.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const isAnalyticsEnabled = (): boolean => !!GA_ID

// Track a custom event
export function trackEvent(action: string, params?: Record<string, string | number | boolean>) {
  if (!isAnalyticsEnabled()) return
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

// Track page views (call in route change handler)
export function trackPageView(url: string) {
  if (!isAnalyticsEnabled()) return
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_ID, { page_path: url })
  }
}

// Common event helpers
export const analytics = {
  contactFormSubmit: (service: string) =>
    trackEvent('form_submit', { form_name: 'contact', service_type: service }),

  caseStudyView: (slug: string) =>
    trackEvent('case_study_view', { case_study: slug }),

  labAppLaunch: (appName: string) =>
    trackEvent('lab_app_launch', { app_name: appName }),

  ctaClick: (location: string, label: string) =>
    trackEvent('cta_click', { location, label }),

  scrollDepth: (depth: number) =>
    trackEvent('scroll_depth', { depth_percent: depth }),
}

// Type augmentation for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}
