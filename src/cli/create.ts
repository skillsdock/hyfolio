import path from 'path'
import fs from 'fs-extra'
import { logger } from './utils/logger.js'
import { detectPackageManager, getInstallCommand, getRunCommand } from './utils/package-manager.js'

type PromptFn = (questions: unknown) => Promise<Record<string, unknown>>
type RunCommandFn = (command: string, options: { cwd: string }) => Promise<void>
type AddActionFn = (options: { names: string[]; projectDir: string; [key: string]: unknown }) => Promise<void>
type GenerateThemeFn = (yamlContent: string) => string

const SQLITE_DB_IMPORT = `import { sqliteAdapter } from '@payloadcms/db-sqlite'`
const SQLITE_DB_CONFIG = `db: sqliteAdapter({
    url: path.resolve(dirname, 'hyfolio.db'),
  }),`

const POSTGRES_DB_IMPORT = `import { postgresAdapter } from '@payloadcms/db-postgres'`
const POSTGRES_DB_CONFIG = `db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),`

export async function createAction(options: {
  projectName: string
  parentDir: string
  starterDir: string
  presetsDir: string
  prompt: PromptFn
  exec: RunCommandFn
  addAction: AddActionFn
  generateTheme: GenerateThemeFn
}): Promise<void> {
  const { projectName, parentDir, starterDir, presetsDir, prompt, exec: runCommand, addAction, generateTheme } = options
  const projectDir = path.resolve(parentDir, projectName)
  const isCurrentDir = projectName === '.' || projectName === './'

  // For existing directories, check they're empty
  if (await fs.pathExists(projectDir)) {
    const files = await fs.readdir(projectDir)
    const meaningful = files.filter(f => !f.startsWith('.'))
    if (meaningful.length > 0) {
      throw new Error(
        isCurrentDir
          ? 'Current directory is not empty.'
          : `Directory "${projectName}" already exists and is not empty.`
      )
    }
  }

  const packageName = isCurrentDir ? path.basename(path.resolve(projectDir)) : projectName

  // Interactive prompts
  const dbResponse = await prompt({
    type: 'select',
    name: 'database',
    message: 'Database:',
    choices: [
      { title: 'SQLite (recommended for development)', value: 'sqlite' },
      { title: 'PostgreSQL', value: 'postgres' },
    ],
  })

  const presetResponse = await prompt({
    type: 'select',
    name: 'preset',
    message: 'Theme preset:',
    choices: [
      { title: 'Minimal — Clean, whitespace, neutral palette', value: 'minimal' },
      { title: 'Bold — High contrast, strong colors, larger type', value: 'bold' },
      { title: 'Warm — Soft tones, rounded corners, friendly feel', value: 'warm' },
    ],
  })

  const examplesResponse = await prompt({
    type: 'confirm',
    name: 'examples',
    message: 'Include example blocks? (hero + features + cta)',
    initial: true,
  })

  const database = dbResponse.database as string
  const preset = presetResponse.preset as string
  const includeExamples = examplesResponse.examples as boolean

  if (!database || !preset || includeExamples === undefined) {
    logger.error('Setup cancelled.')
    return
  }

  // 1. Copy starter template
  logger.info(`Creating ${projectName}...`)
  await fs.copy(starterDir, projectDir)
  logger.step('Copied project template')

  // 2. Replace project name in package.json
  const pkgJsonPath = path.join(projectDir, 'package.json')
  const pkgJson = await fs.readJson(pkgJsonPath)
  const updatedPkgJson = {
    ...pkgJson,
    name: packageName,
  }
  await fs.writeJson(pkgJsonPath, updatedPkgJson, { spaces: 2 })
  logger.step('Configured package.json')

  // 3. Copy chosen theme preset
  const presetPath = path.join(presetsDir, `${preset}.yaml`)
  const themePath = path.join(projectDir, 'hyfolio.theme.yaml')
  await fs.copy(presetPath, themePath)
  logger.step(`Applied ${preset} theme preset`)

  // 3b. Generate theme.css from preset
  const yamlContent = await fs.readFile(themePath, 'utf-8')
  const css = generateTheme(yamlContent)
  const libDir = path.join(projectDir, 'src/lib/hyfolio')
  await fs.ensureDir(libDir)
  await fs.writeFile(path.join(libDir, 'theme.css'), css)
  logger.step('Generated theme.css')

  // 4. Configure database in payload.config.ts
  const payloadConfigPath = path.join(projectDir, 'payload.config.ts')
  if (await fs.pathExists(payloadConfigPath)) {
    let payloadConfig = await fs.readFile(payloadConfigPath, 'utf-8')

    if (database === 'postgres') {
      payloadConfig = payloadConfig.replace(SQLITE_DB_IMPORT, POSTGRES_DB_IMPORT)
      payloadConfig = payloadConfig.replace(SQLITE_DB_CONFIG, POSTGRES_DB_CONFIG)

      // Also swap the db dependency in package.json
      const pkgData = await fs.readJson(pkgJsonPath)
      const { '@payloadcms/db-sqlite': _removed, ...otherDeps } = pkgData.dependencies
      const updatedDeps = {
        ...otherDeps,
        '@payloadcms/db-postgres': '^3.0.0',
      }
      await fs.writeJson(
        pkgJsonPath,
        { ...pkgData, dependencies: updatedDeps },
        { spaces: 2 }
      )
    }

    await fs.writeFile(payloadConfigPath, payloadConfig)
    logger.step(`Configured ${database} database`)
  }

  // 5. Install dependencies
  const pm = detectPackageManager(projectDir)
  const installCmd = getInstallCommand(pm)
  logger.info('Installing dependencies...')
  try {
    await runCommand(installCmd, { cwd: projectDir })
    logger.step('Installed dependencies')
  } catch {
    logger.warn(`Could not install dependencies. Run "${installCmd}" manually.`)
  }

  // 6. Add example blocks if selected
  if (includeExamples) {
    logger.info('Adding example blocks...')
    await addAction({
      names: ['hero', 'features', 'cta'],
      projectDir,
    })
    logger.step('Added hero, features, and cta blocks')
  }

  // 7. Success output
  const runCmd = getRunCommand(pm)

  logger.newline()
  logger.success(`Created ${packageName}${isCurrentDir ? '' : '/'}`)
  logger.newline()
  const steps = isCurrentDir
    ? [`  ${runCmd} dev`]
    : [`  cd ${projectName}`, `  ${runCmd} dev`]
  logger.box([
    ...steps,
    '',
    `  Admin panel: http://localhost:3000/admin`,
    `  Site:        http://localhost:3000`,
  ])
}
