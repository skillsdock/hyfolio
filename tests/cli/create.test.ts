import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { createAction } from '../../src/cli/create.js'

let tmpDir: string
let hyfolioSourceDir: string

beforeEach(async () => {
  tmpDir = path.join(os.tmpdir(), `hyfolio-test-create-${Date.now()}`)
  hyfolioSourceDir = path.join(os.tmpdir(), `hyfolio-test-create-source-${Date.now()}`)

  await fs.ensureDir(tmpDir)

  // Set up starter template
  await fs.ensureDir(path.join(hyfolioSourceDir, 'starter'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/package.json'),
    JSON.stringify({
      name: '{{PROJECT_NAME}}',
      version: '0.1.0',
      private: true,
      scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
      dependencies: {
        next: '^15.0.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        payload: '^3.0.0',
        '@payloadcms/next': '^3.0.0',
        '@payloadcms/richtext-lexical': '^3.0.0',
        '@payloadcms/db-sqlite': '^3.0.0',
      },
    }, null, 2)
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/tsconfig.json'),
    JSON.stringify({ compilerOptions: { target: 'ES2017' } })
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/next.config.mjs'),
    `import { withPayload } from '@payloadcms/next/withPayload'\nexport default withPayload({})\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/tailwind.config.ts'),
    `import type { Config } from 'tailwindcss'\nconst config: Config = { content: ['./src/**/*.{ts,tsx}'] }\nexport default config\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/postcss.config.mjs'),
    `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/payload.config.ts'),
    `import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  db: sqliteAdapter({
    url: path.resolve(dirname, 'hyfolio.db'),
  }),
  collections: [
    { slug: 'media', upload: true, fields: [] },
    {
      slug: 'pages',
      fields: [{ name: 'blocks', type: 'blocks', blocks: [] }],
    },
  ],
  globals: [],
  secret: process.env.PAYLOAD_SECRET || 'hyfolio-dev-secret-change-me',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/hyfolio.config.ts'),
    `import { defineConfig } from 'hyfolio'\nexport default defineConfig({})\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/hyfolio.theme.yaml'),
    'colors:\n  background: "#ffffff"\n'
  )

  // App directory
  await fs.ensureDir(path.join(hyfolioSourceDir, 'starter/src/app/(site)'))
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/src/app/layout.tsx'),
    `export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return <html><body>{children}</body></html>\n}\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/src/app/(site)/page.tsx'),
    `export default function HomePage() {\n  return <main><h1>Welcome</h1></main>\n}\n`
  )
  await fs.writeFile(
    path.join(hyfolioSourceDir, 'starter/src/app/(site)/layout.tsx'),
    `export default function SiteLayout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>\n}\n`
  )

  // Lib / shared
  await fs.ensureDir(path.join(hyfolioSourceDir, 'starter/src/lib/hyfolio'))
  await fs.writeFile(path.join(hyfolioSourceDir, 'starter/src/lib/hyfolio/render.tsx'), 'export function renderBlock() { return null }')
  await fs.writeFile(path.join(hyfolioSourceDir, 'starter/src/lib/hyfolio/types.ts'), 'export interface BlockProps { blockType: string }')

  // Blocks + templates dirs
  await fs.ensureDir(path.join(hyfolioSourceDir, 'starter/src/blocks'))
  await fs.ensureDir(path.join(hyfolioSourceDir, 'starter/src/templates'))

  // Presets
  await fs.ensureDir(path.join(hyfolioSourceDir, 'presets'))
  await fs.writeFile(path.join(hyfolioSourceDir, 'presets/minimal.yaml'), 'colors:\n  background: "#ffffff"\n  foreground: "#0a0a0a"\n')
  await fs.writeFile(path.join(hyfolioSourceDir, 'presets/bold.yaml'), 'colors:\n  background: "#000000"\n  foreground: "#ffffff"\n')
  await fs.writeFile(path.join(hyfolioSourceDir, 'presets/warm.yaml'), 'colors:\n  background: "#fef7ee"\n  foreground: "#1a1a1a"\n')
})

afterEach(async () => {
  await fs.remove(tmpDir)
  await fs.remove(hyfolioSourceDir)
})

const mockRunCommand = vi.fn(async () => {})
const mockPrompt = vi.fn()
const mockAddAction = vi.fn(async () => {})
const mockGenerateTheme = vi.fn(() => ':root { --hyf-background: #ffffff; }')

describe('createAction', () => {
  it('creates project directory from starter template', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: true })

    const projectDir = path.join(tmpDir, 'my-site')

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(projectDir)).toBe(true)
    expect(await fs.pathExists(path.join(projectDir, 'package.json'))).toBe(true)
    expect(await fs.pathExists(path.join(projectDir, 'next.config.mjs'))).toBe(true)
    expect(await fs.pathExists(path.join(projectDir, 'payload.config.ts'))).toBe(true)
  })

  it('replaces project name placeholder in package.json', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-cool-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    const pkgJson = await fs.readJson(path.join(tmpDir, 'my-cool-site', 'package.json'))
    expect(pkgJson.name).toBe('my-cool-site')
  })

  it('copies chosen theme preset as hyfolio.theme.yaml', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'bold' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    const theme = await fs.readFile(path.join(tmpDir, 'my-site', 'hyfolio.theme.yaml'), 'utf-8')
    expect(theme).toContain('#000000')
  })

  it('generates theme.css after copying preset', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(mockGenerateTheme).toHaveBeenCalled()
    expect(await fs.pathExists(path.join(tmpDir, 'my-site', 'src/lib/hyfolio/theme.css'))).toBe(true)
    const css = await fs.readFile(path.join(tmpDir, 'my-site', 'src/lib/hyfolio/theme.css'), 'utf-8')
    expect(css).toContain('--hyf-background')
  })

  it('uses postgres adapter when postgres is selected', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'postgres' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    const payloadConfig = await fs.readFile(path.join(tmpDir, 'my-site', 'payload.config.ts'), 'utf-8')
    expect(payloadConfig).toContain('postgresAdapter')
  })

  it('runs install after creating project', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(mockRunCommand).toHaveBeenCalledWith(
      expect.stringContaining('install'),
      expect.objectContaining({ cwd: path.join(tmpDir, 'my-site') })
    )
  })

  it('calls addAction with example blocks when examples selected', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: true })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(mockAddAction).toHaveBeenCalledWith(
      expect.objectContaining({
        names: ['hero', 'features', 'cta'],
      })
    )
  })

  it('does not call addAction when examples not selected', async () => {
    mockAddAction.mockClear()
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(mockAddAction).not.toHaveBeenCalled()
  })

  it('errors when project directory already exists and is not empty', async () => {
    const existingDir = path.join(tmpDir, 'my-site')
    await fs.ensureDir(existingDir)
    await fs.writeFile(path.join(existingDir, 'index.ts'), 'export {}')

    await expect(
      createAction({
        projectName: 'my-site',
        parentDir: tmpDir,
        starterDir: path.join(hyfolioSourceDir, 'starter'),
        presetsDir: path.join(hyfolioSourceDir, 'presets'),
        prompt: mockPrompt,
        exec: mockRunCommand,
        addAction: mockAddAction,
        generateTheme: mockGenerateTheme,
      })
    ).rejects.toThrow('already exists and is not empty')
  })

  it('creates project in current directory when name is "."', async () => {
    const dotDir = path.join(tmpDir, 'my-project')
    await fs.ensureDir(dotDir)

    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: '.',
      parentDir: dotDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(dotDir, 'package.json'))).toBe(true)
    expect(await fs.pathExists(path.join(dotDir, 'next.config.mjs'))).toBe(true)
  })

  it('creates project in empty existing directory', async () => {
    const emptyDir = path.join(tmpDir, 'empty-site')
    await fs.ensureDir(emptyDir)
    // Add only dotfiles (should be ignored)
    await fs.writeFile(path.join(emptyDir, '.gitkeep'), '')

    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: 'empty-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(emptyDir, 'package.json'))).toBe(true)
  })

  it('uses directory basename as package name for "." projects', async () => {
    const dotDir = path.join(tmpDir, 'cool-project')
    await fs.ensureDir(dotDir)

    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    await createAction({
      projectName: '.',
      parentDir: dotDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    const pkgJson = await fs.readJson(path.join(dotDir, 'package.json'))
    expect(pkgJson.name).toBe('cool-project')
  })

  it('errors when current directory is not empty', async () => {
    const nonEmptyDir = path.join(tmpDir, 'non-empty')
    await fs.ensureDir(nonEmptyDir)
    await fs.writeFile(path.join(nonEmptyDir, 'index.ts'), 'export {}')

    await expect(
      createAction({
        projectName: '.',
        parentDir: nonEmptyDir,
        starterDir: path.join(hyfolioSourceDir, 'starter'),
        presetsDir: path.join(hyfolioSourceDir, 'presets'),
        prompt: mockPrompt,
        exec: mockRunCommand,
        addAction: mockAddAction,
        generateTheme: mockGenerateTheme,
      })
    ).rejects.toThrow('Current directory is not empty')
  })

  it('warns but continues when npm install fails', async () => {
    const failingRunCommand = vi.fn(async (command: string) => {
      if (command.includes('install')) {
        throw new Error('npm install failed')
      }
    })

    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: false })

    // Should not throw
    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: failingRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    expect(await fs.pathExists(path.join(tmpDir, 'my-site', 'package.json'))).toBe(true)
  })

  it('returns early when prompts are cancelled', async () => {
    mockPrompt
      .mockResolvedValueOnce({ database: 'sqlite' })
      .mockResolvedValueOnce({ preset: 'minimal' })
      .mockResolvedValueOnce({ examples: undefined })

    await createAction({
      projectName: 'my-site',
      parentDir: tmpDir,
      starterDir: path.join(hyfolioSourceDir, 'starter'),
      presetsDir: path.join(hyfolioSourceDir, 'presets'),
      prompt: mockPrompt,
      exec: mockRunCommand,
      addAction: mockAddAction,
      generateTheme: mockGenerateTheme,
    })

    // Should not have copied the template
    expect(await fs.pathExists(path.join(tmpDir, 'my-site', 'package.json'))).toBe(false)
  })
})
