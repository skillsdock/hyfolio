import path from 'path'
import fs from 'fs-extra'
import { loadConfig } from './utils/config-loader.js'
import { logger } from './utils/logger.js'
import { detectPackageManager, getAddCommand } from './utils/package-manager.js'
import { addBlockImport, addBlockToArray, addGlobalImport, addGlobalToArray } from './utils/payload-patcher.js'

interface BlockRegistryEntry {
  name: string
  category: string
  description: string
  slug: string
  payloadExportName: string
  files: string[]
  dependencies: {
    npm: string[]
    shared: string[]
    primitives: string[]
  }
}

interface TemplateRegistryEntry {
  name: string
  description: string
  blocks: string[]
  globalExportName: string
  files: string[]
}

type ExecFn = (command: string, options: { cwd: string }) => Promise<void>

export async function addAction(options: {
  names: string[]
  projectDir: string
  sourceDir: string
  blocksRegistry: BlockRegistryEntry[]
  templatesRegistry: TemplateRegistryEntry[]
  exec: ExecFn
}): Promise<void> {
  const { names, projectDir, sourceDir, blocksRegistry, templatesRegistry, exec: runCommand } = options
  const config = await loadConfig(projectDir)
  const payloadConfigPath = path.join(projectDir, config.payload)

  const allNpmDeps: Set<string> = new Set()
  const addedBlocks: string[] = []
  const skippedBlocks: string[] = []

  for (const name of names) {
    // Check if it's a template
    const template = templatesRegistry.find((t) => t.name === name)
    if (template) {
      await addTemplate({
        template,
        projectDir,
        sourceDir,
        config,
        blocksRegistry,
        payloadConfigPath,
        allNpmDeps,
        addedBlocks,
        skippedBlocks,
      })
      continue
    }

    // Check if it's a block
    const block = blocksRegistry.find((b) => b.name === name)
    if (!block) {
      throw new Error(`"${name}" not found in registry. Run "hyfolio list" to see available blocks and templates.`)
    }

    await addBlock({
      block,
      projectDir,
      sourceDir,
      config,
      payloadConfigPath,
      allNpmDeps,
      addedBlocks,
      skippedBlocks,
    })
  }

  // Install collected npm deps
  if (allNpmDeps.size > 0) {
    const pm = detectPackageManager(projectDir)
    const installCmd = getAddCommand(pm, [...allNpmDeps])
    logger.info(`Installing dependencies: ${[...allNpmDeps].join(', ')}`)
    await runCommand(installCmd, { cwd: projectDir })
  }

  // Report results
  for (const name of addedBlocks) {
    logger.success(`Added ${name} block. Edit at ${config.blocks}/${name}/`)
  }
  for (const name of skippedBlocks) {
    logger.warn(`${name} already installed, skipping.`)
  }
}

async function addBlock(options: {
  block: BlockRegistryEntry
  projectDir: string
  sourceDir: string
  config: Awaited<ReturnType<typeof loadConfig>>
  payloadConfigPath: string
  allNpmDeps: Set<string>
  addedBlocks: string[]
  skippedBlocks: string[]
}): Promise<void> {
  const {
    block,
    projectDir,
    sourceDir,
    config,
    payloadConfigPath,
    allNpmDeps,
    addedBlocks,
    skippedBlocks,
  } = options

  const targetBlockDir = path.join(projectDir, config.blocks, block.name)

  // Skip if already installed
  if (await fs.pathExists(targetBlockDir)) {
    skippedBlocks.push(block.name)
    return
  }

  // Copy block files
  const sourceBlockDir = path.join(sourceDir, 'blocks', block.name)
  await fs.copy(sourceBlockDir, targetBlockDir)

  // Copy shared dependencies if not present
  for (const sharedFile of block.dependencies.shared) {
    const targetPath = path.join(projectDir, config.lib, sharedFile)
    if (!(await fs.pathExists(targetPath))) {
      const sourcePath = path.join(sourceDir, 'shared', sharedFile)
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, targetPath)
      }
    }
  }

  // Copy primitive dependencies if not present
  if (block.dependencies.primitives) {
    for (const primitiveFile of block.dependencies.primitives) {
      const targetPath = path.join(projectDir, config.lib, 'primitives', primitiveFile)
      if (!(await fs.pathExists(targetPath))) {
        const sourcePath = path.join(sourceDir, 'primitives', primitiveFile)
        if (await fs.pathExists(sourcePath)) {
          await fs.ensureDir(path.dirname(targetPath))
          await fs.copy(sourcePath, targetPath)
        }
      }
    }
  }

  // Collect npm deps
  for (const dep of block.dependencies.npm) {
    allNpmDeps.add(dep)
  }

  // Patch payload.config.ts
  if (await fs.pathExists(payloadConfigPath)) {
    await addBlockImport(payloadConfigPath, {
      name: block.payloadExportName,
      importPath: `@/blocks/${block.name}/payload`,
    })
    await addBlockToArray(payloadConfigPath, block.payloadExportName)
  }

  addedBlocks.push(block.name)
}

async function addTemplate(options: {
  template: TemplateRegistryEntry
  projectDir: string
  sourceDir: string
  config: Awaited<ReturnType<typeof loadConfig>>
  blocksRegistry: BlockRegistryEntry[]
  payloadConfigPath: string
  allNpmDeps: Set<string>
  addedBlocks: string[]
  skippedBlocks: string[]
}): Promise<void> {
  const {
    template,
    projectDir,
    sourceDir,
    config,
    blocksRegistry,
    payloadConfigPath,
    allNpmDeps,
    addedBlocks,
    skippedBlocks,
  } = options

  // First, add all required blocks (skipping already-added ones)
  for (const blockName of template.blocks) {
    const block = blocksRegistry.find((b) => b.name === blockName)
    if (block) {
      await addBlock({
        block,
        projectDir,
        sourceDir,
        config,
        payloadConfigPath,
        allNpmDeps,
        addedBlocks,
        skippedBlocks,
      })
    }
  }

  // Copy template files
  const sourceTemplateDir = path.join(sourceDir, 'templates', template.name)
  const targetTemplateDir = path.join(projectDir, config.templates, template.name)

  if (await fs.pathExists(sourceTemplateDir)) {
    await fs.copy(sourceTemplateDir, targetTemplateDir)
  }

  // Patch payload.config.ts with global
  if (await fs.pathExists(payloadConfigPath)) {
    await addGlobalImport(payloadConfigPath, {
      name: template.globalExportName,
      importPath: `@/templates/${template.name}/payload`,
    })
    await addGlobalToArray(payloadConfigPath, template.globalExportName)
  }

  logger.success(`Added ${template.name} template at ${config.templates}/${template.name}/`)
}
