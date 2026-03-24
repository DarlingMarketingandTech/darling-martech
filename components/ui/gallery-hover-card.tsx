'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { useFinePointer } from '@/hooks/useFinePointer'
import { cn } from '@/lib/utils'
import styles from './gallery-hover-card.module.css'

interface GalleryHoverCardProps {
  readonly title: string
  readonly summary: string
  readonly href?: string
  readonly cover: React.ReactNode
  readonly eyebrow?: string
  readonly badges?: string[]
  readonly footer?: React.ReactNode
  readonly ctaLabel?: string
  readonly external?: boolean
  readonly interactiveId?: string
  readonly onHighlightChange?: (target: string | null) => void
  readonly variant?: 'work' | 'lab'
  readonly alwaysExpandedOnMobile?: boolean
}

export function GalleryHoverCard({
  title,
  summary,
  href,
  cover,
  eyebrow,
  badges = [],
  footer,
  ctaLabel,
  external = false,
  interactiveId,
  onHighlightChange,
  variant = 'work',
  alwaysExpandedOnMobile = true,
}: GalleryHoverCardProps) {
  const isFinePointer = useFinePointer()
  const isInteractive = isFinePointer || !alwaysExpandedOnMobile
  const rootClassName = cn(
    styles.frame,
    isInteractive ? styles.interactiveFine : styles.expanded,
    variant === 'lab' ? styles.variantLab : styles.variantWork
  )
  const surfaceClassName = cn(styles.surface, !href && styles.staticSurface)

  const handleHighlight = React.useCallback(
    (target: string | null) => {
      onHighlightChange?.(target)
    },
    [onHighlightChange]
  )

  const commonProps = {
    className: surfaceClassName,
    onMouseEnter: isFinePointer ? () => handleHighlight(interactiveId ?? null) : undefined,
    onMouseLeave: isFinePointer ? () => handleHighlight(null) : undefined,
    onFocus: href ? () => handleHighlight(interactiveId ?? null) : undefined,
    onBlur: href ? () => handleHighlight(null) : undefined,
  }

  const ctaText = ctaLabel ?? (href ? (external ? 'Launch app' : 'View details') : undefined)
  const CtaIcon = external ? ArrowUpRight : ArrowRight

  const shell = (
    <>
      <div className={styles.media}>
        <div className={styles.coverSlot}>
          {cover}
        </div>
        <div className={styles.mediaScrim} />
      </div>

      <div className={styles.content}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>

        {badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((badge) => (
              <span key={badge} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>
        )}

        {(footer || ctaText) && (
          <div className={styles.footer}>
            <div className={styles.footerMeta}>{footer}</div>
            {ctaText && (
              <span className={styles.cta}>
                {ctaText}
                <CtaIcon weight="light" className={styles.ctaIcon} />
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )

  const content = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {shell}
      </a>
    ) : (
      <Link href={href} {...commonProps}>
        {shell}
      </Link>
    )
  ) : (
    <div {...commonProps}>{shell}</div>
  )

  return isFinePointer ? (
    <FloatingCard className={rootClassName} maxTilt={variant === 'work' ? 7 : 6}>
      {content}
    </FloatingCard>
  ) : (
    <div className={rootClassName}>{content}</div>
  )
}
