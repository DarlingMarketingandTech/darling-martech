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
  /** When set, the card acts as a button (e.g. open an in-page tool modal) instead of navigating. */
  readonly onActivate?: () => void
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
  onActivate,
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
  const isActivatable = Boolean(onActivate)
  const surfaceClassName = cn(styles.surface, !href && !isActivatable && styles.staticSurface, isActivatable && styles.surfaceAsButton)

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
    onFocus: href || isActivatable ? () => handleHighlight(interactiveId ?? null) : undefined,
    onBlur: href || isActivatable ? () => handleHighlight(null) : undefined,
  }

  const showExternalIcon = Boolean(href && external && !isActivatable)
  const ctaText =
    ctaLabel ??
    (isActivatable ? 'Launch tool' : href ? (external ? 'Launch app' : 'View details') : undefined)
  const CtaIcon = showExternalIcon ? ArrowUpRight : ArrowRight

  /** Native `<button>` only allows phrasing content; our card shell uses block-level divs, which breaks HTML parsing and causes hydration mismatches. Use a focusable div instead. */
  const activatableProps: React.HTMLAttributes<HTMLDivElement> | undefined = onActivate
    ? {
        role: 'button',
        tabIndex: 0,
        onClick: onActivate,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onActivate()
          }
        },
        'aria-label': `${ctaText ?? 'Open'} — ${title}`,
      }
    : undefined

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

  const content = onActivate ? (
    <div {...commonProps} {...activatableProps}>
      {shell}
    </div>
  ) : href ? (
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
