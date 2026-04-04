import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { HyfRichText } from '../../src/primitives/rich-text'

describe('HyfRichText', () => {
  it('returns null for null content', () => {
    const result = renderToStaticMarkup(<HyfRichText content={null} />)
    expect(result).toBe('')
  })

  it('returns null for undefined content', () => {
    const result = renderToStaticMarkup(<HyfRichText content={undefined} />)
    expect(result).toBe('')
  })

  it('renders string content as a paragraph', () => {
    const result = renderToStaticMarkup(<HyfRichText content="Hello world" />)
    expect(result).toBe('<p>Hello world</p>')
  })

  it('applies className to string content paragraph', () => {
    const result = renderToStaticMarkup(
      <HyfRichText content="Hello" className="text-lg" />
    )
    expect(result).toBe('<p class="text-lg">Hello</p>')
  })

  it('renders a simple Lexical paragraph', () => {
    const content = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Hello world' },
            ],
          },
        ],
      },
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<p>Hello world</p>')
  })

  it('renders bold text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'bold', format: 1 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<strong>bold</strong>')
  })

  it('renders italic text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'italic', format: 2 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<em>italic</em>')
  })

  it('renders combined bold+italic text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'both', format: 3 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<strong>')
    expect(result).toContain('<em>')
    expect(result).toContain('both')
  })

  it('renders underline text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'underlined', format: 8 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<u>underlined</u>')
  })

  it('renders strikethrough text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'struck', format: 4 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<s>struck</s>')
  })

  it('renders code text', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'code', format: 16 },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<code>code</code>')
  })

  it('renders headings', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 'h2',
          children: [
            { type: 'text', text: 'My Heading' },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<h2>My Heading</h2>')
  })

  it('renders links', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: 'https://example.com',
              children: [{ type: 'text', text: 'Click here' }],
            },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('href="https://example.com"')
    expect(result).toContain('Click here')
  })

  it('renders links with newTab', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'link',
              url: 'https://example.com',
              newTab: true,
              children: [{ type: 'text', text: 'External' }],
            },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('target="_blank"')
    expect(result).toContain('rel="noopener noreferrer"')
  })

  it('renders unordered lists', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'list',
          listType: 'bullet',
          children: [
            { type: 'listitem', children: [{ type: 'text', text: 'Item 1' }] },
            { type: 'listitem', children: [{ type: 'text', text: 'Item 2' }] },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<ul>')
    expect(result).toContain('<li>Item 1</li>')
    expect(result).toContain('<li>Item 2</li>')
  })

  it('renders ordered lists', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'list',
          listType: 'number',
          children: [
            { type: 'listitem', children: [{ type: 'text', text: 'First' }] },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<ol>')
    expect(result).toContain('<li>First</li>')
  })

  it('renders blockquotes', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'quote',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'A quote' }],
            },
          ],
        },
      ],
    }
    const result = renderToStaticMarkup(<HyfRichText content={content} />)
    expect(result).toContain('<blockquote>')
    expect(result).toContain('A quote')
  })

  it('wraps Lexical content in div when className provided', () => {
    const content = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'styled' }],
        },
      ],
    }
    const result = renderToStaticMarkup(
      <HyfRichText content={content} className="prose" />
    )
    expect(result).toContain('<div class="prose">')
  })
})
