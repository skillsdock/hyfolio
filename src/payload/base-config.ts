/**
 * Payload CMS base configuration scaffold.
 *
 * Provides a media collection and a pages collection as starting points.
 * The CLI's `init` and `create` commands use these when scaffolding new projects.
 *
 * Uses object literals instead of importing Payload types directly so hyfolio
 * does not require payload at module resolution time. The objects conform to
 * Payload's CollectionConfig shape and are spread into the user's payload.config.ts.
 */

/** Media collection for image/file uploads. */
export const mediaCollection = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text' as const,
      required: true,
    },
  ],
} as const

/** Pages collection for content-managed pages. */
export const pagesCollection = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'slug',
      type: 'text' as const,
      required: true,
      unique: true,
      admin: {
        position: 'sidebar' as const,
      },
    },
    {
      name: 'layout',
      type: 'blocks' as const,
      blocks: [],
    },
  ],
} as const

/**
 * Returns the base collections array that every hyfolio project starts with.
 * The CLI injects block definitions into `pagesCollection.fields.layout.blocks`.
 */
export function getBaseCollections() {
  return [
    { ...mediaCollection },
    {
      ...pagesCollection,
      fields: pagesCollection.fields.map((field) => ({ ...field })),
    },
  ]
}
