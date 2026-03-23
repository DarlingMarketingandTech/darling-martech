'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { FloatingCard } from '@/components/3d/FloatingCard'
import { useFinePointer } from '@/hooks/useFinePointer'
import { cn } from '@/lib/utils'
import styles from './masonry-grid.module.css'

type MasonryGridColumns = {
  readonly base?: number
  readonly sm?: number
  readonly md?: number
  readonly lg?: number
  readonly xl?: number
}

interface MasonryGridProps<T> {
  readonly items: readonly T[]
  readonly renderItem: (item: T, index: number) => React.ReactNode
  readonly getItemKey?: (item: T, index: number) => React.Key
  readonly className?: string
  readonly itemClassName?: string
  readonly gap?: string
  readonly staggerDelay?: number
  readonly columns?: MasonryGridColumns
  readonly enableTilt?: boolean
  readonly tiltClassName?: string
}

const DEFAULT_COLUMNS: MasonryGridColumns = {
  base: 1,
  sm: 2,
  lg: 3,
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function MasonryGrid<T>({
  items,
  renderItem,
  getItemKey,
  className,
  itemClassName,
  gap = '1rem',
  staggerDelay = 0.05,
  columns = DEFAULT_COLUMNS,
  enableTilt = true,
  tiltClassName,
}: MasonryGridProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })
  const isFinePointer = useFinePointer()
  const containerVariants = React.useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }),
    [staggerDelay]
  )

  const style = {
    '--masonry-gap': gap,
    '--masonry-columns': columns.base ?? DEFAULT_COLUMNS.base ?? 1,
    '--masonry-columns-sm': columns.sm ?? columns.base ?? DEFAULT_COLUMNS.sm ?? 2,
    '--masonry-columns-md': columns.md ?? columns.sm ?? columns.base ?? DEFAULT_COLUMNS.sm ?? 2,
    '--masonry-columns-lg': columns.lg ?? columns.md ?? columns.sm ?? columns.base ?? DEFAULT_COLUMNS.lg ?? 3,
    '--masonry-columns-xl': columns.xl ?? columns.lg ?? columns.md ?? columns.sm ?? columns.base ?? DEFAULT_COLUMNS.lg ?? 3,
  } as React.CSSProperties

  return (
    <motion.div
      ref={containerRef}
      className={cn(styles.grid, className)}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      role="list"
    >
      {items.map((item, index) => {
        const content = renderItem(item, index)

        return (
          <motion.div
            key={getItemKey ? getItemKey(item, index) : index}
            className={cn(styles.item, itemClassName)}
            variants={itemVariants}
            role="listitem"
          >
            {enableTilt && isFinePointer ? (
              <FloatingCard className={cn(styles.card, tiltClassName)} maxTilt={6}>
                {content}
              </FloatingCard>
            ) : (
              content
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
