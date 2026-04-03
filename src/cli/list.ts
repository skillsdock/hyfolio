import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import { loadConfig } from './utils/config-loader.js'
import { logger } from './utils/logger.js'

interface BlockRegistryEntry {
  name: string
  category: string
  description: string
  files: string[]
  dependencies: { npm: string[]; shared: string[] }
}

interface TemplateRegistryEntry {
  name: string
  description: string
  blocks: string[]
}

function isBlockInstalled(projectDir: string, blocksDir: string, blockName: string): boolean {
  const blockPath = path.join(projectDir, blocksDir, blockName)
  return fs.existsSync(blockPath)
}

function padRight(str: string, len: number): string {
  return str.length >= len ? str : str + ' '.repeat(len - str.length)
}

export async function listAction(options: {
  projectDir: string
  blocksRegistry: BlockRegistryEntry[]
  templatesRegistry: TemplateRegistryEntry[]
}): Promise<void> {
  const { projectDir, blocksRegistry, templatesRegistry } = options

  let blocksDir = 'src/blocks'
  try {
    const config = await loadConfig(projectDir)
    blocksDir = config.blocks
  } catch {
    // Use default
  }

  // Display blocks
  logger.info('Available blocks:')
  logger.newline()

  const nameWidth = 18
  const categoryWidth = 14
  const statusWidth = 12

  process.stdout.write(
    `  ${chalk.bold(padRight('Name', nameWidth))}${chalk.bold(padRight('Category', categoryWidth))}${chalk.bold(padRight('Status', statusWidth))}${chalk.bold('Description')}\n`
  )
  process.stdout.write(`  ${'-'.repeat(nameWidth + categoryWidth + statusWidth + 40)}\n`)

  for (const block of blocksRegistry) {
    const installed = isBlockInstalled(projectDir, blocksDir, block.name)
    const status = installed
      ? chalk.green('installed')
      : chalk.dim('available')

    process.stdout.write(
      `  ${padRight(block.name, nameWidth)}${padRight(block.category, categoryWidth)}${padRight(status, statusWidth)}${chalk.dim(block.description)}\n`
    )
  }

  logger.newline()

  // Display templates
  logger.info('Available templates:')
  logger.newline()

  process.stdout.write(
    `  ${chalk.bold(padRight('Name', nameWidth))}${chalk.bold(padRight('Blocks', 40))}${chalk.bold('Description')}\n`
  )
  process.stdout.write(`  ${'-'.repeat(nameWidth + 40 + 40)}\n`)

  for (const template of templatesRegistry) {
    process.stdout.write(
      `  ${padRight(template.name, nameWidth)}${padRight(template.blocks.join(', '), 40)}${chalk.dim(template.description)}\n`
    )
  }

  logger.newline()
}
