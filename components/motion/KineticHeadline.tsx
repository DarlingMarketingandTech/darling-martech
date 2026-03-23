'use client'

import { motion } from 'framer-motion'
import styles from './KineticHeadline.module.css'

interface KineticHeadlineProps {
  children: string
  /** The exact substring to render in Instrument Serif italic orange */
  accentPhrase?: string
  staggerDelay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 90,
    transformOrigin: 'bottom center',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 18,
    },
  },
}

export function KineticHeadline({
  children,
  accentPhrase,
  staggerDelay = 0.08,
  className,
  as: Tag = 'h1',
}: KineticHeadlineProps) {
  // Split into tokens: words & spaces, preserving accent phrase as a unit
  const tokens: Array<{ text: string; isAccent: boolean; isSpace: boolean }> = []

  if (accentPhrase && children.includes(accentPhrase)) {
    const [before, after] = children.split(accentPhrase)

    // Words before the accent phrase
    before.split(/(\s+)/).forEach((t) => {
      if (!t) return
      tokens.push({ text: t, isAccent: false, isSpace: /^\s+$/.test(t) })
    })

    // Accent phrase as single token
    tokens.push({ text: accentPhrase, isAccent: true, isSpace: false })

    // Words after accent phrase
    after.split(/(\s+)/).forEach((t) => {
      if (!t) return
      tokens.push({ text: t, isAccent: false, isSpace: /^\s+$/.test(t) })
    })
  } else {
    children.split(/(\s+)/).forEach((t) => {
      if (!t) return
      tokens.push({ text: t, isAccent: false, isSpace: /^\s+$/.test(t) })
    })
  }

  const animatedTokens = tokens.filter((t) => !t.isSpace)
  let animatedIndex = 0

  return (
    <Tag className={`${styles.headline} ${className ?? ''}`} style={{ perspective: '800px' }}>
      <motion.span
        style={{ display: 'inline' }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: staggerDelay, delayChildren: 0.05 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {tokens.map((token, i) => {
          if (token.isSpace) {
            return <span key={i}> </span>
          }

          const idx = animatedIndex++

          return (
            <motion.span
              key={i}
              variants={wordVariants}
              custom={idx}
              style={{ display: 'inline-block' }}
              className={token.isAccent ? styles.accent : undefined}
            >
              {token.text}
            </motion.span>
          )
        })}
      </motion.span>
    </Tag>
  )
}
