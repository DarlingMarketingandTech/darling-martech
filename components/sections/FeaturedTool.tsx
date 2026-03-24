import { FeaturedToolInner } from './FeaturedToolInner'
import styles from './FeaturedTool.module.css'

export function FeaturedTool() {
  return (
    <section className={styles.section} aria-label="Featured tool — CMO Simulator">
      <FeaturedToolInner />
    </section>
  )
}
