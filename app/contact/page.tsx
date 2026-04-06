import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import styles from './Contact.module.css'

export const metadata: Metadata = {
  title: 'Start a Project | Darling MarTech',
  description:
    'Tell me what you\'re dealing with. I work with a small number of clients at a time — this is where it starts.',
}

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {/* Left column — positioning + direct contact */}
        <div className={styles.leftCol}>
          <p className={styles.eyebrow}>Start a Project</p>
          <h1 className={styles.headline}>Tell me what you&apos;re dealing with.</h1>
          <p className={styles.subheadline}>
            I work with a small number of clients at a time. No junior hand-offs, no account
            managers — just me, directly. Here&apos;s where it starts.
          </p>

          <div className={styles.contactBlock}>
            <p className={styles.contactBlockLabel}>Prefer to reach out directly?</p>
            <div className={styles.contactDetails}>
              <div className={styles.detailRow}>
                <div className={styles.detailLine} />
                <a href="mailto:jacob@darlingmartech.com" className={styles.detailLink}>
                  jacob@darlingmartech.com
                </a>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLine} />
                <a
                  href="https://www.linkedin.com/in/jacobdarling/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailLink}
                >
                  LinkedIn — Jacob Darling
                </a>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLine} />
                <span className={styles.detailText}>Indianapolis, IN</span>
              </div>
            </div>
          </div>

          <div className={styles.responseNote}>
            <p className={styles.responseText}>
              I reply to every message within 1 business day — usually faster.
            </p>
          </div>
        </div>

        {/* Right column — form */}
        {/* Suspense required because ContactForm uses useSearchParams */}
        <Suspense fallback={<div className={styles.formFallback} />}>
          <ContactForm />
        </Suspense>
      </div>
    </main>
  )
}
