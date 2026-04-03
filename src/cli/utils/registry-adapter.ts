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
  description: string
  blocks: string[]
  files: string[]
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
      primitives: [],
    },
  }))
}

export function adaptTemplatesRegistry(templates: RawTemplate[]) {
  return templates.map((t) => ({
    name: t.slug,
    description: t.description,
    blocks: t.blocks,
    globalExportName: `${t.name.replace(/\s+/g, '')}Global`,
    files: t.files,
  }))
}
