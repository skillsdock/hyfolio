import path from 'path'
import fs from 'fs-extra'
import { logger } from './utils/logger.js'
import { detectPackageManager, getAddCommand } from './utils/package-manager.js'

type PromptFn = (questions: unknown) => Promise<Record<string, string>>
type RunCommandFn = (command: string, options: { cwd: string }) => Promise<void>
type GenerateThemeFn = (yamlContent: string) => string

const PAYLOAD_PACKAGES = [
  'payload',
  '@payloadcms/next',
  '@payloadcms/richtext-lexical',
  '@payloadcms/db-sqlite',
]

const HYFOLIO_CONFIG_CONTENT = `export default {
  blocks: 'src/blocks',
  templates: 'src/templates',
  lib: 'src/lib/hyfolio',
  styling: {
    framework: 'tailwind',
    theme: 'hyfolio.theme.yaml',
  },
  payload: 'payload.config.ts',
}
`

export async function initAction(options: {
  projectDir: string
  sourceDir: string
  prompt: PromptFn
  exec: RunCommandFn
  generateTheme: GenerateThemeFn
}): Promise<void> {
  const { projectDir, sourceDir, prompt, exec: runCommand, generateTheme } = options

  logger.info('Initializing hyfolio in your project...')

  // 1. Detect if Payload is installed, install if not
  await ensurePayloadInstalled(projectDir, runCommand)

  // 2. Prompt for theme preset
  const response = await prompt({
    type: 'select',
    name: 'preset',
    message: 'Choose a theme preset:',
    choices: [
      { title: 'Minimal — Clean, whitespace, neutral palette', value: 'minimal' },
      { title: 'Bold — High contrast, strong colors, larger type', value: 'bold' },
      { title: 'Warm — Soft tones, rounded corners, friendly feel', value: 'warm' },
    ],
  })

  const preset = response.preset

  // 3. Create hyfolio.config.ts
  const configPath = path.join(projectDir, 'hyfolio.config.ts')
  await fs.writeFile(configPath, HYFOLIO_CONFIG_CONTENT)
  logger.step('Created hyfolio.config.ts')

  // 4. Copy theme preset as hyfolio.theme.yaml
  const presetPath = path.join(sourceDir, 'presets', `${preset}.yaml`)
  const themePath = path.join(projectDir, 'hyfolio.theme.yaml')
  await fs.copy(presetPath, themePath)
  logger.step(`Created hyfolio.theme.yaml (${preset} preset)`)

  // 5. Create directory structure
  const dirs = [
    'src/blocks',
    'src/templates',
    'src/lib/hyfolio/primitives',
  ]
  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectDir, dir))
  }
  logger.step('Created directory structure')

  // 6. Copy shared primitives
  const primitivesSourceDir = path.join(sourceDir, 'primitives')
  const primitivesTargetDir = path.join(projectDir, 'src/lib/hyfolio/primitives')
  if (await fs.pathExists(primitivesSourceDir)) {
    const primitiveFiles = await fs.readdir(primitivesSourceDir)
    for (const file of primitiveFiles) {
      await fs.copy(
        path.join(primitivesSourceDir, file),
        path.join(primitivesTargetDir, file)
      )
    }
  }
  logger.step('Copied shared primitives')

  // 7. Copy shared render.tsx and types.ts
  const sharedFiles = ['render.tsx', 'types.ts']
  for (const file of sharedFiles) {
    const sourcePath = path.join(sourceDir, 'shared', file)
    const targetPath = path.join(projectDir, 'src/lib/hyfolio', file)
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, targetPath)
    }
  }
  logger.step('Copied shared utilities (render.tsx, types.ts)')

  // 8. Generate theme.css
  const yamlContent = await fs.readFile(themePath, 'utf-8')
  const css = generateTheme(yamlContent)
  await fs.writeFile(path.join(projectDir, 'src/lib/hyfolio/theme.css'), css)
  logger.step('Generated theme.css')

  // 9. Create payload.config.ts if not exists
  const payloadConfigPath = path.join(projectDir, 'payload.config.ts')
  if (!(await fs.pathExists(payloadConfigPath))) {
    const baseConfigPath = path.join(sourceDir, 'payload', 'base-config.ts')
    if (await fs.pathExists(baseConfigPath)) {
      await fs.copy(baseConfigPath, payloadConfigPath)
    }
    logger.step('Created payload.config.ts')
  }

  logger.newline()
  logger.success('Initialized hyfolio in your project')
  logger.newline()
  logger.box([
    'Next steps:',
    `  npx hyfolio add hero        Add your first block`,
    `  npx hyfolio list             See all available blocks`,
    `  npx hyfolio build-theme      Regenerate theme CSS`,
  ])
}

async function ensurePayloadInstalled(
  projectDir: string,
  runCommand: RunCommandFn
): Promise<void> {
  const pkgJsonPath = path.join(projectDir, 'package.json')

  if (!(await fs.pathExists(pkgJsonPath))) {
    return
  }

  const pkgJson = await fs.readJson(pkgJsonPath)
  const deps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  }

  if (deps.payload) {
    return
  }

  logger.info('Payload CMS not detected. Installing...')
  const pm = detectPackageManager(projectDir)
  const installCmd = getAddCommand(pm, PAYLOAD_PACKAGES)
  await runCommand(installCmd, { cwd: projectDir })
  logger.step('Installed Payload CMS')
}
