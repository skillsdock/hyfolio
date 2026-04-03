import blocksRegistry from './blocks.json' with { type: 'json' }
import templatesRegistry from './templates.json' with { type: 'json' }

/** Metadata for a single block in the registry. */
export interface BlockMeta {
  slug: string
  name: string
  description: string
  category: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

/** Metadata for a single template in the registry. */
export interface TemplateMeta {
  slug: string
  name: string
  description: string
  blocks: string[]
  files: string[]
}

/** Result of resolving a single block. */
export interface ResolvedBlock {
  slug: string
  files: string[]
  dependencies: string[]
}

/** Result of resolving multiple blocks at once. */
export interface ResolvedBlocks {
  files: string[]
  dependencies: string[]
}

/** Result of resolving a template (its own files + all block files). */
export interface ResolvedTemplate {
  slug: string
  templateFiles: string[]
  blocks: ResolvedBlock[]
  dependencies: string[]
}

const blocks: BlockMeta[] = blocksRegistry.blocks as BlockMeta[]
const templates: TemplateMeta[] = templatesRegistry.templates as TemplateMeta[]

/**
 * Resolve a single block by slug.
 * Returns the files to copy and npm dependencies to install.
 * Throws if the block slug is not found.
 */
export function resolveBlock(slug: string): ResolvedBlock {
  const block = blocks.find((b) => b.slug === slug)
  if (!block) {
    throw new Error(`Block "${slug}" not found in registry`)
  }

  return {
    slug: block.slug,
    files: [...block.files],
    dependencies: [...block.dependencies],
  }
}

/**
 * Resolve multiple blocks at once.
 * Deduplicates files and npm dependencies.
 * Throws if any block slug is not found.
 */
export function resolveBlocks(slugs: string[]): ResolvedBlocks {
  const uniqueSlugs = [...new Set(slugs)]
  const resolved = uniqueSlugs.map((slug) => resolveBlock(slug))

  const files = resolved.flatMap((r) => r.files)
  const dependencies = [...new Set(resolved.flatMap((r) => r.dependencies))]

  return { files, dependencies }
}

/**
 * Resolve a template by slug.
 * Returns the template's own files, plus all block files and dependencies.
 * Throws if the template slug is not found.
 */
export function resolveTemplate(slug: string): ResolvedTemplate {
  const template = templates.find((t) => t.slug === slug)
  if (!template) {
    throw new Error(`Template "${slug}" not found in registry`)
  }

  const resolvedBlockList = template.blocks.map((blockSlug) =>
    resolveBlock(blockSlug)
  )
  const allDeps = [...new Set(resolvedBlockList.flatMap((b) => b.dependencies))]

  return {
    slug: template.slug,
    templateFiles: [...template.files],
    blocks: resolvedBlockList,
    dependencies: allDeps,
  }
}

/**
 * Get full metadata for a block by slug.
 * Returns null if not found (does not throw).
 */
export function getBlockMeta(slug: string): BlockMeta | null {
  const block = blocks.find((b) => b.slug === slug)
  if (!block) {
    return null
  }
  return { ...block }
}

/**
 * List all blocks in the registry.
 * Optionally filter by category.
 */
export function listBlocks(category?: string): BlockMeta[] {
  if (category) {
    return blocks.filter((b) => b.category === category).map((b) => ({ ...b }))
  }
  return blocks.map((b) => ({ ...b }))
}

/**
 * List all templates in the registry.
 */
export function listTemplates(): TemplateMeta[] {
  return templates.map((t) => ({ ...t }))
}
