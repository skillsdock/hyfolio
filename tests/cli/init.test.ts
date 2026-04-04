import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { initAction } from '../../src/cli/init.js'

let tmpDir: string
let hyfolioSourceDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-init-${Date.now()}`)
  hyfolioSourceDir = path.join(os.tmpdir(), `hyfolio-test-init-source-${Date.now()}`)

  await fs.ensureDir(tmpDir)

  // Simulate existing Next.js project
  await fs.writeFile(
    path.join(tmpDir, 'package.json'),
    JSON.stringify({
      name: 'my-existing-site',
      dependencies: { next: '^15.0.0', react: '^19.0.0' },
    })
  )
  await fs.writeFile(path.join(tmpDir, 'package-lock.json'), '{}')
  await fs.ensureDir(path.join(tmpDir, 'src/app'))

  // Set up hyfolio source
  await fs.ensureDir(path.join(hyfolioSourceDir, 'primitives'))
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/button.tsx'), 'export function HyfButton() { return <button /> }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/card.tsx'), 'export function HyfCard() { return <div /> }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/container.tsx'), 'export function HyfContainer() { return <div /> }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/section.tsx'), 'export function HyfSection() { return <section /> }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/loader.tsx'), 'export function HyfLoader() { return <div /> }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'primitives/badge.tsx'), 'export function HyfBadge() { return <span /> }')

  // Shared files live at sourceDir root (not shared/ subdirectory)
  await fs.writeFile(path.join(hyfolioSourceDir, 'render.tsx'), 'export function renderBlock() { return null }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'types.ts'), 'export interface BlockProps { blockType: string }')

  // Presets live under theme/presets/
  await fs.ensureDir(path.join(hyfolioSourceDir, 'theme/presets'))
  await fs.writeFile(path.join(hyfolioSourceDir, 'theme/presets/minimal.yaml'), 'colors:\n  background: "#ffffff"\n  foreground: "#0a0a0a"\n')
  await fs.writeFile(path.join(hyfolioSourceDir, 'theme/presets/bold.yaml'), 'colors:\n  background: "#000000"\n  foreground: "#ffffff"\n')
  await fs.writeFile(path.join(hyfolioSourceDir, 'theme/presets/warm.yaml'), 'colors:\n  background: "#fef7ee"\n  foreground: "#1a1a1a"\n')
})

afterEach(async () => {
  await fs.remove(tmpDir)
  await fs.remove(hyfolioSourceDir)
})

const mockRunCommand = vi.fn(async () => {})
const mockPrompt = vi.fn()
const mockGenerateTheme = vi.fn(() => ':root { --hyf-background: #ffffff; }')

describe('initAction', () => {
  it('creates hyfolio.config.ts in project root', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'hyfolio.config.ts'))).toBe(true)
    const config = await fs.readFile(path.join(tmpDir, 'hyfolio.config.ts'), 'utf-8')
    expect(config).toContain("blocks: 'src/blocks'")
  })

  it('creates hyfolio.theme.yaml from chosen preset', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'hyfolio.theme.yaml'))).toBe(true)
    const theme = await fs.readFile(path.join(tmpDir, 'hyfolio.theme.yaml'), 'utf-8')
    expect(theme).toContain('#ffffff')
  })

  it('creates directory structure', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/blocks'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/templates'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio'))).toBe(true)
  })

  it('copies shared primitives', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/primitives/button.tsx'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/primitives/card.tsx'))).toBe(true)
  })

  it('copies shared render.tsx and types.ts', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/render.tsx'))).toBe(true)
    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/types.ts'))).toBe(true)
  })

  it('generates theme.css from the selected preset', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'src/lib/hyfolio/theme.css'))).toBe(true)
    expect(mockGenerateTheme).toHaveBeenCalled()
  })

  it('creates payload.config.ts with buildConfig if not present', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'bold' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'payload.config.ts'))).toBe(true)
    const content = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    expect(content).toContain('buildConfig')
    expect(content).toContain('lexicalEditor')
    expect(content).toContain('sqliteAdapter')
  })

  it('does not overwrite existing payload.config.ts', async () => {
    const existingPayload = '// my existing config'
    await fs.writeFile(path.join(tmpDir, 'payload.config.ts'), existingPayload)
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    const content = await fs.readFile(path.join(tmpDir, 'payload.config.ts'), 'utf-8')
    expect(content).toBe(existingPayload)
  })

  it('installs payload if not in dependencies', async () => {
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    expect(mockRunCommand).toHaveBeenCalledWith(
      expect.stringContaining('payload'),
      expect.objectContaining({ cwd: tmpDir })
    )
  })

  it('does not reinstall payload if already in dependencies', async () => {
    await fs.writeFile(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({
        name: 'my-site',
        dependencies: { next: '^15.0.0', react: '^19.0.0', payload: '^3.0.0' },
      })
    )
    mockPrompt.mockResolvedValueOnce({ preset: 'minimal' })
    mockRunCommand.mockClear()

    await initAction({
      projectDir: tmpDir,
      sourceDir: hyfolioSourceDir,
      prompt: mockPrompt,
      exec: mockRunCommand,
      generateTheme: mockGenerateTheme,
    })

    const payloadInstallCalls = mockRunCommand.mock.calls.filter(
      (call) => typeof call[0] === 'string' && call[0].includes('payload')
    )
    expect(payloadInstallCalls).toHaveLength(0)
  })
})
