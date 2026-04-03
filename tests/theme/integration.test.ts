import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { generateThemeCSS } from '@/theme/generator'

describe('full theme pipeline integration', () => {
  const presets = ['minimal', 'bold', 'warm'] as const

  for (const preset of presets) {
    describe(`${preset} preset`, () => {
      const yamlPath = resolve(__dirname, `../../src/theme/presets/${preset}.yaml`)
      const yaml = readFileSync(yamlPath, 'utf-8')

      it('generates valid CSS without throwing', () => {
        expect(() => generateThemeCSS(yaml)).not.toThrow()
      })

      it('produces a :root block', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain(':root {')
      })

      it('produces a .dark block', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('.dark {')
      })

      it('contains all color token families', () => {
        const css = generateThemeCSS(yaml)
        const colorKeys = [
          'background', 'foreground', 'primary', 'primary-foreground',
          'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
          'accent', 'destructive', 'border', 'ring',
        ]
        for (const key of colorKeys) {
          expect(css).toContain(`--hyf-color-${key}:`)
        }
      })

      it('contains font family tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-font-heading:')
        expect(css).toContain('--hyf-font-body:')
        expect(css).toContain('--hyf-font-mono:')
      })

      it('contains heading tokens with resolved scale values', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-h1-size:')
        expect(css).toContain('--hyf-h1-weight:')
        expect(css).toContain('--hyf-h2-size:')
      })

      it('contains spacing tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-section-padding:')
        expect(css).toContain('--hyf-container-max:')
        expect(css).toContain('--hyf-container-padding:')
      })

      it('contains radius tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-radius-sm:')
        expect(css).toContain('--hyf-radius-md:')
        expect(css).toContain('--hyf-radius-full:')
      })

      it('contains button tokens with resolved cross-references', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-btn-radius:')
        expect(css).toContain('--hyf-btn-primary-bg: var(--hyf-color-primary);')
        expect(css).toContain('--hyf-btn-primary-fg: var(--hyf-color-primary-foreground);')
      })

      it('contains card tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-card-radius:')
        expect(css).toContain('--hyf-card-padding:')
        expect(css).toContain('--hyf-card-shadow:')
      })

      it('contains loader tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-loader-color:')
        expect(css).toContain('--hyf-loader-speed:')
      })

      it('contains badge tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-badge-radius:')
        expect(css).toContain('--hyf-badge-font-size:')
      })

      it('contains layout tokens', () => {
        const css = generateThemeCSS(yaml)
        expect(css).toContain('--hyf-text-align-default:')
        expect(css).toContain('--hyf-text-align-hero:')
      })

      it('dark block only contains color overrides', () => {
        const css = generateThemeCSS(yaml)
        const darkBlock = css.split('.dark {')[1]?.split('}')[0] ?? ''
        const lines = darkBlock.split('\n').filter(l => l.trim().length > 0)
        for (const line of lines) {
          expect(line.trim()).toMatch(/^--hyf-color-/)
        }
      })
    })
  }

  it('different presets produce different CSS output', () => {
    const minimalYaml = readFileSync(resolve(__dirname, '../../src/theme/presets/minimal.yaml'), 'utf-8')
    const boldYaml = readFileSync(resolve(__dirname, '../../src/theme/presets/bold.yaml'), 'utf-8')
    const warmYaml = readFileSync(resolve(__dirname, '../../src/theme/presets/warm.yaml'), 'utf-8')

    const minimalCSS = generateThemeCSS(minimalYaml)
    const boldCSS = generateThemeCSS(boldYaml)
    const warmCSS = generateThemeCSS(warmYaml)

    expect(minimalCSS).not.toBe(boldCSS)
    expect(minimalCSS).not.toBe(warmCSS)
    expect(boldCSS).not.toBe(warmCSS)
  })
})
