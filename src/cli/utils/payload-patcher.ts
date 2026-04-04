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

  // Find all blocks: [...] matches to detect ambiguity
  const blocksArrayRegex = /blocks:\s*\[([^\]]*)\]/g
  const matches = [...content.matchAll(blocksArrayRegex)]

  if (matches.length === 0) {
    throw new Error(
      `No "blocks: [...]" array found in ${configPath}. ` +
      `Add the block manually: blocks: [${blockName}]`
    )
  }

  // Filter to the blocks array that is inside a field with type: 'blocks'
  // (the Payload CMS pattern: { type: 'blocks', blocks: [...] })
  const targetMatch = findPayloadBlocksArray(content, matches)

  if (!targetMatch) {
    throw new Error(
      `Found ${matches.length} "blocks: [...]" arrays in ${configPath} but could not ` +
      `determine which one to patch. Add ${blockName} manually to the correct blocks array.`
    )
  }

  const existingItems = targetMatch[1].trim()

  if (existingItems.includes(blockName)) {
    return
  }

  const newItems = existingItems ? `${existingItems}, ${blockName}` : blockName
  const updated = content.slice(0, targetMatch.index!) +
    `blocks: [${newItems}]` +
    content.slice(targetMatch.index! + targetMatch[0].length)

  await fs.writeFile(configPath, updated)
}

/**
 * Find the correct blocks array to patch.
 * In Payload CMS configs, the pattern is: { type: 'blocks', blocks: [...] }
 * If there's only one match, return it directly.
 * If there are multiple, find the one preceded by type: 'blocks'.
 */
function findPayloadBlocksArray(
  content: string,
  matches: RegExpExecArray[]
): RegExpExecArray | null {
  if (matches.length === 1) {
    return matches[0]
  }

  // Look for the blocks array preceded by type: 'blocks' (Payload field pattern)
  for (const match of matches) {
    const precedingContent = content.slice(Math.max(0, match.index! - 100), match.index!)
    if (/type:\s*['"]blocks['"]/.test(precedingContent)) {
      return match
    }
  }

  return null
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

  // Find all globals: [...] matches
  const globalsArrayRegex = /globals:\s*\[([^\]]*)\]/g
  const matches = [...content.matchAll(globalsArrayRegex)]

  if (matches.length === 0) {
    throw new Error(
      `No "globals: [...]" array found in ${configPath}. ` +
      `Add the global manually: globals: [${globalName}]`
    )
  }

  if (matches.length > 1) {
    throw new Error(
      `Found ${matches.length} "globals: [...]" arrays in ${configPath}. ` +
      `Cannot determine which one to patch. Add ${globalName} manually.`
    )
  }

  const match = matches[0]
  const existingItems = match[1].trim()

  if (existingItems.includes(globalName)) {
    return
  }

  const newItems = existingItems
    ? `${existingItems}, ${globalName}`
    : globalName

  const updated = content.slice(0, match.index!) +
    `globals: [${newItems}]` +
    content.slice(match.index! + match[0].length)

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
