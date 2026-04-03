import type { GalleryBlock as GalleryProps } from '@/types'
import { HyfSection } from '@/primitives/section'
import { HyfContainer } from '@/primitives/container'

const columnClassMap: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function GalleryBlock({
  heading,
  images,
  columns = '3',
}: GalleryProps) {
  const gridCols = columnClassMap[columns] || columnClassMap['3']

  return (
    <HyfSection className="hyf-gallery">
      <HyfContainer>
        {heading && (
          <h2 className="text-4xl font-bold tracking-tight text-[var(--hyf-color-foreground)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className={`grid ${gridCols} gap-4`}>
          {images?.map((item, index) => {
            const imageUrl =
              item.image &&
              typeof item.image === 'object' &&
              'url' in item.image
                ? item.image.url
                : null

            if (!imageUrl) return null

            return (
              <figure key={index} className="group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={
                      (typeof item.image === 'object' &&
                        'alt' in item.image &&
                        item.image.alt) ||
                      item.caption ||
                      ''
                    }
                    className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                {item.caption && (
                  <figcaption className="mt-2 text-sm text-[var(--hyf-color-muted-foreground)] text-center">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>
      </HyfContainer>
    </HyfSection>
  )
}
