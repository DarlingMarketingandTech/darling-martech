import Image from 'next/image'

import type { MediaAsset, ProjectMediaMap } from '@/data/assets/types'
import { getCloudinaryImageUrl } from '@/lib/media/getCloudinaryImageUrl'

import styles from './ProjectMediaGallery.module.css'

type ProjectMediaSectionKey = 'hero' | 'screens' | 'productInUse' | 'campaign' | 'logos'

type Props = {
  media: ProjectMediaMap
  sections?: ProjectMediaSectionKey[]
}

const sectionOrder: ProjectMediaSectionKey[] = ['hero', 'screens', 'productInUse', 'campaign', 'logos']

const sectionContent = {
  hero: {
    heading: null,
    getAssets: (media: ProjectMediaMap) => (media.hero ? [media.hero] : []),
    width: 1600,
    height: 900,
    layout: 'hero' as const,
  },
  screens: {
    heading: 'Website Screens',
    getAssets: (media: ProjectMediaMap) => media.screens ?? [],
    width: 1200,
    height: 750,
    layout: 'grid' as const,
  },
  productInUse: {
    heading: 'Product In Use',
    getAssets: (media: ProjectMediaMap) => media.productInUse ?? [],
    width: 900,
    height: 1200,
    layout: 'grid' as const,
  },
  campaign: {
    heading: 'Campaign Creative',
    getAssets: (media: ProjectMediaMap) => media.campaign ?? [],
    width: 900,
    height: 1200,
    layout: 'grid' as const,
  },
  logos: {
    heading: 'Brand Assets',
    getAssets: (media: ProjectMediaMap) => media.logos ?? [],
    width: 600,
    height: 400,
    layout: 'grid' as const,
  },
} satisfies Record<
  ProjectMediaSectionKey,
  {
    heading: string | null
    getAssets: (media: ProjectMediaMap) => MediaAsset[]
    width: number
    height: number
    layout: 'hero' | 'grid'
  }
>

function renderAsset(asset: MediaAsset, width: number, height: number, isHero = false) {
  return (
    <figure
      key={asset.publicId}
      className={`${styles.figure} ${isHero ? styles.figureHero : ''}`.trim()}
    >
      <div className={styles.imageFrame}>
        <Image
          src={getCloudinaryImageUrl({
            publicId: asset.publicId,
            width,
            height,
            crop: 'fill',
          })}
          alt={asset.alt}
          width={width}
          height={height}
          className={styles.image}
          sizes={isHero ? '(min-width: 1280px) 1200px, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
        />
      </div>
      {asset.caption ? <figcaption className={styles.caption}>{asset.caption}</figcaption> : null}
    </figure>
  )
}

export function ProjectMediaGallery({ media, sections = sectionOrder }: Props) {
  const selectedSections = sections.filter((section) => sectionOrder.includes(section))

  if (selectedSections.length === 0) {
    return null
  }

  return (
    <section className={styles.gallery} aria-label={`${media.projectSlug} media gallery`}>
      <div className={styles.inner}>
        {selectedSections.map((sectionKey) => {
          const config = sectionContent[sectionKey]
          const assets = config.getAssets(media)

          if (assets.length === 0) {
            return null
          }

          const isHero = config.layout === 'hero'

          return (
            <div key={sectionKey} className={styles.block}>
              {config.heading ? <h2 className={styles.heading}>{config.heading}</h2> : null}
              <div className={isHero ? styles.heroGrid : styles.assetGrid}>
                {assets.map((asset) => renderAsset(asset, config.width, config.height, isHero))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
