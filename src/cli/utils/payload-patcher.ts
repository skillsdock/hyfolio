import fs from 'fs-extra'

export interface ImportSpec {
  name: string
  importPath: string
}

export async function addBlockImport(
  configPath: string,
  spec: ImportSpec
): Promise<void> {
  const content = await fs.readFile(configPath, 'utf-8')

  if (content.includes(`import { ${spec.name} }`)) {
    return
  }

  const lines = content.split('\n')
  let lastImportIndex = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      lastImportIndex = i
    }
  }

  const importLine = `import { ${spec.name} } from '${spec.importPath}'`

  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, importLine)
  } else {
    lines.unshift(importLine)
  }

  await fs.writeFile(configPath, lines.join('\n'))
}

export async function addBlockToArray(
  configPath: string,
  blockName: string
): Promise<void> {
  const content = await fs.readFile(configPath, 'utf-8')

  const blocksArrayRegex = /blocks:\s*\[([^\]]*)\]/
  const match = content.match(blocksArrayRegex)

  if (!match) {
    return
  }

  const existingItems = match[1].trim()

  if (existingItems.includes(blockName)) {
    return
  }

  const newItems = existingItems ? `${existingItems}, ${blockName}` : blockName

  const updated = content.replace(blocksArrayRegex, `blocks: [${newItems}]`)
  await fs.writeFile(configPath, updated)
}

export async function addGlobalImport(
  configPath: string,
  spec: ImportSpec
): Promise<void> {
  return addBlockImport(configPath, spec)
}

export async function addGlobalToArray(
  configPath: string,
  globalName: string
): Promise<void> {
  const content = await fs.readFile(configPath, 'utf-8')

  const globalsArrayRegex = /globals:\s*\[([^\]]*)\]/
  const match = content.match(globalsArrayRegex)

  if (!match) {
    return
  }

  const existingItems = match[1].trim()

  if (existingItems.includes(globalName)) {
    return
  }

  const newItems = existingItems
    ? `${existingItems}, ${globalName}`
    : globalName

  const updated = content.replace(globalsArrayRegex, `globals: [${newItems}]`)
  await fs.writeFile(configPath, updated)
}

export async function patchPayloadConfig(
  configPath: string,
  options: {
    blocks?: Array<{ name: string; importPath: string }>
    globals?: Array<{ name: string; importPath: string }>
  }
): Promise<void> {
  if (options.blocks) {
    for (const block of options.blocks) {
      await addBlockImport(configPath, block)
      await addBlockToArray(configPath, block.name)
    }
  }

  if (options.globals) {
    for (const global of options.globals) {
      await addGlobalImport(configPath, global)
      await addGlobalToArray(configPath, global.name)
    }
  }
}
