#!/usr/bin/env node
import { Command } from 'commander'
import { execFileSync } from 'child_process'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'
import prompts from 'prompts'

import { addAction } from './add.js'
import { createAction } from './create.js'
import { initAction } from './init.js'
import { listAction } from './list.js'
import { buildThemeAction } from './build-theme.js'
import { logger } from './utils/logger.js'
import { adaptBlocksRegistry, adaptTemplatesRegistry } from './utils/registry-adapter.js'

// Resolve paths to hyfolio package source
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '../..')
const sourceDir = path.join(packageRoot, 'src')

// Load registries
import blocksRegistryData from '../registry/blocks.json' with { type: 'json' }
import templatesRegistryData from '../registry/templates.json' with { type: 'json' }

// Import theme generator (from Plan 2)
import { generateThemeCSS } from '../theme/generator.js'

const blocksRegistry = adaptBlocksRegistry(blocksRegistryData.blocks)
const templatesRegistry = adaptTemplatesRegistry(templatesRegistryData.templates)

// Safe command execution: splits command string and uses execFileSync (no shell)
const runCommand = async (command: string, options: { cwd: string }): Promise<void> => {
  const parts = command.split(/\s+/)
  const bin = parts[0]
  const args = parts.slice(1)
  execFileSync(bin, args, { cwd: options.cwd, stdio: 'pipe' })
}

const prompt = async (questions: unknown): Promise<Record<string, string>> => {
  return prompts(questions as prompts.PromptObject) as Promise<Record<string, string>>
}

const program = new Command()

program
  .name('hyfolio')
  .description('Beautiful, CMS-ready website blocks you own')
  .version(createRequire(import.meta.url)('../../package.json').version)

program
  .command('add')
  .description('Add a block or template to your project')
  .argument('<names...>', 'block or template names to add')
  .action(async (names: string[]) => {
    try {
      await addAction({
        names,
        projectDir: process.cwd(),
        sourceDir,
        blocksRegistry,
        templatesRegistry,
        exec: runCommand,
      })
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program
  .command('init')
  .description('Initialize hyfolio in an existing Next.js project')
  .action(async () => {
    try {
      await initAction({
        projectDir: process.cwd(),
        sourceDir,
        prompt,
        exec: runCommand,
        generateTheme: generateThemeCSS,
      })
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program
  .command('list')
  .description('List all available blocks and templates')
  .action(async () => {
    try {
      await listAction({
        projectDir: process.cwd(),
        blocksRegistry,
        templatesRegistry,
      })
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

const boundAddAction = async (options: { names: string[]; projectDir: string; [key: string]: unknown }) => {
  await addAction({
    names: options.names,
    projectDir: options.projectDir,
    sourceDir,
    blocksRegistry,
    templatesRegistry,
    exec: runCommand,
  })
}

program
  .command('create')
  .description('Create a new hyfolio project')
  .argument('[project-name]', 'project directory (default: current directory)', '.')
  .action(async (projectName: string) => {
    try {
      await createAction({
        projectName,
        parentDir: process.cwd(),
        starterDir: path.join(packageRoot, 'templates', 'starter'),
        presetsDir: path.join(sourceDir, 'theme', 'presets'),
        prompt,
        exec: runCommand,
        addAction: boundAddAction,
        generateTheme: generateThemeCSS,
      })
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program
  .command('build-theme')
  .description('Generate theme.css from hyfolio.theme.yaml')
  .action(async () => {
    try {
      await buildThemeAction({
        projectDir: process.cwd(),
        generateTheme: generateThemeCSS,
      })
    } catch (error) {
      logger.error(error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

program.parse()
