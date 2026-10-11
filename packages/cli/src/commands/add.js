import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { CONFIG_FILE } from './init.js';
import { readJson, resolveInside, assertProjectPath, writeProjectFile } from '../project.js';
import { componentNames, registry } from '../registry.js';

export async function addComponents({ cwd, names, force = false, output = console.log }) {
  const config = await readJson(path.join(cwd, CONFIG_FILE));
  if (!config) throw new Error(`Run "sillar init" before adding components.`);
  if (!Array.isArray(names) || names.length === 0) throw new Error(`Choose a component. Available: ${componentNames.join(', ')}`);

  const unknown = names.filter((name) => !Object.hasOwn(registry, name));
  if (unknown.length) throw new Error(`Unknown component${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}. Run "sillar list" to see the registry.`);

  const targetDirectory = resolveInside(cwd, config.componentsDir || 'src/components/ui');
  await assertProjectPath(cwd, targetDirectory);
  await mkdir(targetDirectory, { recursive: true });
  const extension = config.typescript === false ? 'js' : 'ts';
  const created = [];

  for (const name of [...new Set(names)]) {
    const definition = registry[name];
    const target = resolveInside(targetDirectory, `${name}.${extension}`);
    const source = `export { ${definition.exports.join(', ')} } from 'sillar-ui/${definition.entry}';\n`;
    try {
      await writeProjectFile(cwd, target, source, force);
    } catch (error) {
      if (error && error.code === 'EEXIST') throw new Error(`${path.relative(cwd, target)} already exists. Use --force to replace it.`);
      throw error;
    }
    const relative = path.relative(cwd, target);
    created.push(relative);
    output(`Added ${relative}`);
  }
  return created;
}
