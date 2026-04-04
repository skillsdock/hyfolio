#!/usr/bin/env node
import { Command } from 'commander'
import { execFileSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import prompts from 'prompts'

import { createAction } from './create.js'
import { addAction } from './add.js'
import { logger } from './utils/logger.js'
import { adaptBlocksRegistry, adaptTemplatesRegistry } from './utils/registry-adapter.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '../..')
const sourceDir = path.join(packageRoot, 'src')

import blocksRegistryData from '../registry/blocks.json' with { type: 'json' }
import templatesRegistryData from '../registry/templates.json' with { type: 'json' }

// Import theme generator
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

const prompt = async (questions: unknown): Promise<Record<string, unknown>> => {
  return prompts(questions as prompts.PromptObject)
}

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

const program = new Command()

program
  .name('create-hyfolio')
  .description('Create a new hyfolio project')
  .argument('<project-name>', 'name of the project to create')
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

program.parse()
