import { FeaturedToolInner } from './FeaturedToolInner'
import styles from './FeaturedTool.module.css'

export function FeaturedTool() {
  return (
    <section className={styles.section} aria-label="Featured lab tools">
      <FeaturedToolInner />
    </section>
  )
}
