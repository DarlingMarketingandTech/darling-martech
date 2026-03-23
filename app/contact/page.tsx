import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm'
import styles from './Contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Whether you need a full marketing system, a new website, or a strategic second opinion — let's talk.",
}

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {/* Left column */}
        <div>
          <p className={styles.eyebrow}>Let&apos;s Talk</p>
          <h1 className={styles.headline}>Ready to build something that works?</h1>
          <p className={styles.subheadline}>
            Whether you need a full marketing system, a new website, or a strategic second
            opinion — let&apos;s talk. I work with a small number of clients at a time so every
            engagement gets my full attention.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.detailRow}>
              <div className={styles.detailLine} />
              <a href="mailto:jacob@jacobdarling.com" className={styles.detailLink}>
                jacob@jacobdarling.com
              </a>
            </div>
            <div className={styles.detailRow}>
              <div className={styles.detailLine} />
              <span className={styles.detailText}>Indianapolis, IN</span>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <ContactForm />
      </div>
    </main>
  )
}
