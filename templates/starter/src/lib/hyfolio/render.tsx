import type { BlockProps } from './types'

/**
 * Maps block slugs to their React components.
 * Updated automatically when you run `hyfolio add`.
 *
 * Usage:
 *   import { blockComponents } from '@/lib/hyfolio/render'
 *   const Component = blockComponents[block.blockType]
 *   if (Component) return <Component {...block} />
 */

export const blockComponents: Record<string, React.ComponentType<BlockProps>> = {}

export function RenderBlock({ block }: { block: BlockProps }) {
  const Component = blockComponents[block.blockType]

  if (!Component) {
    return null
  }

  return <Component {...block} />
}

export function RenderBlocks({ blocks }: { blocks: BlockProps[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <RenderBlock key={`${block.blockType}-${index}`} block={block} />
      ))}
    </>
  )
}
