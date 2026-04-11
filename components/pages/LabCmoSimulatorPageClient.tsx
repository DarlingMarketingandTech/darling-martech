'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PlayCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import Image from 'next/image'
import CmoAccessModal from '@/components/lab/CmoAccessModal'
import { springEntrance, viewport } from '@/lib/motion'
import styles from '@/components/lab/LabDetailPage.module.css'

function AutoLaunch({ onLaunch }: { onLaunch: () => void }) {
  const searchParams = useSearchParams()
  const autoLaunched = useRef(false)

  useEffect(() => {
    if (!autoLaunched.current && searchParams.get('launch') === '1') {
      onLaunch()
      autoLaunched.current = true
    }
  }, [searchParams, onLaunch])

  return null
}

export default function CmoSimulatorPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className={styles.page}>
      {/* Back link */}
      <div className={styles.backWrap}>
        <Link href="/tools" className={styles.backLink}>
          <ArrowLeft weight="regular" size={15} />
          All builds
        </Link>
      </div>

      {/* ...rest unchanged... */}

      <motion.section
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={springEntrance}
      >
        <p className={styles.ctaLine}>
          Ready to think through your marketing strategy with someone who&apos;s done this for 15 years?
        </p>
        <Link href="/contact" className={styles.ctaBtn}>
          Let&apos;s talk
          <ArrowRight weight="regular" size={16} />
        </Link>
        <Link href="/tools" className={styles.backToLab}>
          ← Back to all builds
        </Link>
      </motion.section>

      <Suspense>
        <AutoLaunch onLaunch={() => setModalOpen(true)} />
      </Suspense>

      <CmoAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
