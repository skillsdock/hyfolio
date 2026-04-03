import type { AnyBlock } from './types.js'

/**
 * A map of block type slugs to their React component.
 * Each component receives the block's props (minus blockType).
 */
export type BlockComponentMap = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => React.ReactNode | string | null
>

/**
 * Creates a block renderer function that maps block data to components.
 *
 * This is a factory -- call it once with your component map, then use the
 * returned function to render arrays of blocks dynamically.
 *
 * @example
 * ```tsx
 * import { createBlockRenderer } from '@/lib/hyfolio/render'
 * import { HeroBlock } from '@/blocks/hero/component'
 * import { CTABlock } from '@/blocks/cta/component'
 *
 * const renderBlocks = createBlockRenderer({
 *   hero: HeroBlock,
 *   cta: CTABlock,
 * })
 *
 * // In a page component:
 * export default function Page({ blocks }) {
 *   return <>{renderBlocks(blocks)}</>
 * }
 * ```
 */
export function createBlockRenderer(components: BlockComponentMap) {
  /**
   * Render an array of blocks using the registered component map.
   * Blocks with no registered component are skipped with a console warning.
   */
  return function renderBlocks(blocks: AnyBlock[]): React.ReactNode[] {
    return blocks.reduce<React.ReactNode[]>((rendered, block, index) => {
      const Component = components[block.blockType]

      if (!Component) {
        console.warn(
          `[hyfolio] No component registered for block type "${block.blockType}"`
        )
        return rendered
      }

      const { blockType, ...props } = block
      rendered.push(<Component key={`${blockType}-${index}`} {...props} />)
      return rendered
    }, [])
  }
}
