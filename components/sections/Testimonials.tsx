'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, viewport } from '@/lib/motion'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    quote:
      "Jacob has a great balance of strategic thinking and hands-on execution... I'd recommend him to anyone looking for a marketing professional who's both forward-thinking and results-oriented.",
    author: 'Jesse Wey',
    year: '2025',
  },
  {
    quote:
      'Jacob is the kind of marketer who makes an immediate impact... figuring out how to put new technologies to work in practical ways.',
    author: 'Andrew Bastnagel',
    year: '2025',
  },
  {
    quote:
      'Exuberance and moxie are unparalleled... ability to implement strategies that produce a positive ROI.',
    author: 'Kevin Martin See',
    year: '',
  },
  {
    quote:
      'Energy and ingenuity are extremely valuable assets... expanded our vision.',
    author: 'Ben Worrell',
    year: '',
  },
]

export function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.p
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={itemVariants}
        >
          What Clients Say
        </motion.p>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.div key={t.author} className={styles.quoteBlock} variants={itemVariants}>
              <span className={styles.openMark} aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className={styles.quoteText}>
                {t.quote}
              </blockquote>
              <cite className={styles.attribution}>
                — {t.author}{t.year ? `, ${t.year}` : ''}
              </cite>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
