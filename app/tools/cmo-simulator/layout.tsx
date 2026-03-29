import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CMO Simulator — Darling MarTech',
  description:
    'Walk through the same CMO decision-making framework Jacob Darling uses with clients. Budget allocation, channel strategy, KPI selection — free, takes 10 minutes.',
}

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return <>{children}</>
}
