/**
 * Base type for all hyfolio blocks.
 * Each block extends this with its specific fields.
 *
 * These types are generated from your Payload block configs.
 * Run `npx payload generate:types` to regenerate payload-types.ts,
 * then update these types to match.
 */
export interface BlockProps {
  blockType: string
  id?: string
}

/**
 * Media type matching Payload's media collection.
 */
export interface Media {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  mimeType?: string
}

/**
 * CTA (Call to Action) field group.
 * Used across multiple blocks.
 */
export interface CTAField {
  label: string
  href: string
}

/**
 * Rich text content from Payload's Lexical editor.
 */
export type RichText = Record<string, unknown>
