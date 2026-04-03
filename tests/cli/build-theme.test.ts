import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { buildThemeAction } from '../../src/cli/build-theme.js'

let tmpDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-buildtheme-${Date.now()}`)
  await fs.ensureDir(tmpDir)
  await fs.ensureDir(path.join(tmpDir, 'src/lib/hyfolio'))
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

const mockGenerateTheme = vi.fn((yamlContent: string) => {
  return `:root {\n  --hyf-background: #ffffff;\n  --hyf-foreground: #0a0a0a;\n}\n`
})

describe('buildThemeAction', () => {
  it('reads theme YAML and writes CSS output', async () => {
    const themeYaml = `colors:\n  background: "#ffffff"\n  foreground: "#0a0a0a"\n`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.theme.yaml'), themeYaml)

    const configContent = `export default {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.config.ts'), configContent)

    await buildThemeAction({
      projectDir: tmpDir,
      generateTheme: mockGenerateTheme,
    })

    const cssPath = path.join(tmpDir, 'src/lib/hyfolio/theme.css')
    expect(await fs.pathExists(cssPath)).toBe(true)

    const css = await fs.readFile(cssPath, 'utf-8')
    expect(css).toContain('--hyf-background')
  })

  it('errors when theme YAML file does not exist', async () => {
    const configContent = `export default {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'missing.yaml' },
  payload: 'payload.config.ts',
}`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.config.ts'), configContent)

    await expect(
      buildThemeAction({
        projectDir: tmpDir,
        generateTheme: mockGenerateTheme,
      })
    ).rejects.toThrow('Theme file not found')
  })

  it('calls generateTheme with YAML content', async () => {
    const themeYaml = `colors:\n  primary: "#2563eb"\n`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.theme.yaml'), themeYaml)

    const configContent = `export default {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: { framework: 'tailwind', theme: 'hyfolio.theme.yaml' },
  payload: 'payload.config.ts',
}`
    await fs.writeFile(path.join(tmpDir, 'hyfolio.config.ts'), configContent)

    await buildThemeAction({
      projectDir: tmpDir,
      generateTheme: mockGenerateTheme,
    })

    expect(mockGenerateTheme).toHaveBeenCalledWith(
      expect.stringContaining('primary')
    )
  })
})
