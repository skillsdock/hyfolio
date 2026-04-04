interface RawBlock {
  slug: string
  name: string
  description: string
  category: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

interface RawTemplate {
  slug: string
  name: string
  globalExport: string
  description: string
  blocks: string[]
  files: string[]
}

const BLOCK_PRIMITIVES: Record<string, string[]> = {
  hero: ['button.tsx', 'section.tsx', 'container.tsx'],
  features: ['section.tsx', 'container.tsx', 'card.tsx'],
  content: ['section.tsx', 'container.tsx'],
  stats: ['section.tsx', 'container.tsx'],
  details: ['section.tsx', 'container.tsx'],
  team: ['section.tsx', 'container.tsx', 'card.tsx'],
  timeline: ['section.tsx', 'container.tsx'],
  testimonials: ['section.tsx', 'container.tsx', 'card.tsx'],
  logos: ['section.tsx', 'container.tsx'],
  pricing: ['section.tsx', 'container.tsx', 'card.tsx', 'button.tsx', 'badge.tsx'],
  comparison: ['section.tsx', 'container.tsx'],
  cta: ['section.tsx', 'container.tsx', 'button.tsx'],
  contact: ['section.tsx', 'container.tsx', 'button.tsx'],
  newsletter: ['section.tsx', 'container.tsx', 'button.tsx'],
  faq: ['section.tsx', 'container.tsx'],
  gallery: ['section.tsx', 'container.tsx'],
  'blog-list': ['section.tsx', 'container.tsx', 'card.tsx'],
  footer: ['container.tsx'],
  navbar: ['container.tsx', 'button.tsx'],
}

export function adaptBlocksRegistry(blocks: RawBlock[]) {
  return blocks.map((b) => ({
    name: b.slug,
    category: b.category,
    description: b.description,
    slug: b.slug,
    payloadExportName: `${b.name}Block`,
    files: b.files,
    dependencies: {
      npm: b.dependencies,
      shared: ['render.tsx', 'types.ts'],
      primitives: BLOCK_PRIMITIVES[b.slug] ?? [],
    },
  }))
}

export function adaptTemplatesRegistry(templates: RawTemplate[]) {
  return templates.map((t) => ({
    name: t.slug,
    description: t.description,
    blocks: t.blocks,
    globalExportName: t.globalExport,
    files: t.files,
  }))
}
