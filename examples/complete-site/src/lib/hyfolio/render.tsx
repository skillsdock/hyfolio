import type { HyfRichText } from './types'

interface RichTextProps {
  content: HyfRichText | undefined
  className?: string
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null

  // Payload 3.x with Lexical returns serialized editor state.
  // In production, replace this with @payloadcms/richtext-lexical/client
  // or a custom serializer for full Lexical node support.
  const html = typeof content === 'string' ? content : ''

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
