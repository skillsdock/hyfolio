import type { RichText } from '@/types'

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  listType?: string
  url?: string
  newTab?: boolean
  [key: string]: unknown
}

interface HyfRichTextProps {
  content: RichText | string | null | undefined
  className?: string
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_STRIKETHROUGH = 4
const FORMAT_CODE = 16

function renderText(node: LexicalNode, key: string): React.ReactNode {
  let element: React.ReactNode = node.text ?? ''
  const format = node.format ?? 0

  if (format & FORMAT_CODE) {
    element = <code key={`${key}-code`}>{element}</code>
  }
  if (format & FORMAT_BOLD) {
    element = <strong key={`${key}-bold`}>{element}</strong>
  }
  if (format & FORMAT_ITALIC) {
    element = <em key={`${key}-italic`}>{element}</em>
  }
  if (format & FORMAT_UNDERLINE) {
    element = <u key={`${key}-underline`}>{element}</u>
  }
  if (format & FORMAT_STRIKETHROUGH) {
    element = <s key={`${key}-strike`}>{element}</s>
  }

  return element
}

function renderNode(node: LexicalNode, key: string): React.ReactNode {
  const children = node.children?.map((child, i) =>
    renderNode(child, `${key}-${i}`)
  )

  switch (node.type) {
    case 'root':
      return <>{children}</>

    case 'paragraph':
      return <p key={key}>{children}</p>

    case 'heading': {
      const Tag = (node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') ?? 'h2'
      return <Tag key={key}>{children}</Tag>
    }

    case 'text':
      return renderText(node, key)

    case 'link': {
      const rel = node.newTab ? 'noopener noreferrer' : undefined
      const target = node.newTab ? '_blank' : undefined
      return (
        <a key={key} href={node.url as string} rel={rel} target={target}>
          {children}
        </a>
      )
    }

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{children}</Tag>
    }

    case 'listitem':
      return <li key={key}>{children}</li>

    case 'quote':
      return <blockquote key={key}>{children}</blockquote>

    default:
      if (children) {
        return <>{children}</>
      }
      return null
  }
}

export function HyfRichText({ content, className }: HyfRichTextProps) {
  if (!content) {
    return null
  }

  if (typeof content === 'string') {
    return <p className={className}>{content}</p>
  }

  // Payload Lexical stores state as { root: { type: 'root', children: [...] } }
  const node = content as Record<string, unknown>
  const root = (node.root ?? node) as unknown as LexicalNode
  const rendered = renderNode(root, 'rt')

  if (!className) {
    return <>{rendered}</>
  }

  return <div className={className}>{rendered}</div>
}
