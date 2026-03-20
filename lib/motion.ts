import type { Variants } from 'framer-motion'

export const springStandard  = { type: 'spring' as const, stiffness: 120, damping: 20 }
export const springEntrance  = { type: 'spring' as const, stiffness: 80,  damping: 18 }
export const springCinematic = { type: 'spring' as const, stiffness: 55,  damping: 16 }

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 }
  }
}

export const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springEntrance }
}

export const fadeVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: springEntrance }
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: springEntrance }
}

// Shared viewport config — import alongside variants for every whileInView
export const viewport = { once: true, margin: '-80px' } as const
