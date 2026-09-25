import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { exists, findSourceEntry, readJson, resolveInside } from '../project.js';

export const CONFIG_FILE = 'sillar.config.json';

export async function initProject({ cwd, force = false, output = console.log }) {
  const packagePath = path.join(cwd, 'package.json');
  const packageJson = await readJson(packagePath);
  if (!packageJson) throw new Error('No package.json found. Run this command from a React project.');

  const configPath = path.join(cwd, CONFIG_FILE);
  if (await exists(configPath) && !force) throw new Error(`${CONFIG_FILE} already exists. Use --force to replace it.`);

  const typescript = await exists(path.join(cwd, 'tsconfig.json'));
  const componentsDir = 'src/components/ui';
  const config = {
    $schema: 'https://uppy19d0.github.io/sillar-ui/schema/cli.json',
    library: 'sillar-ui',
    componentsDir,
    typescript,
    sourceEntry: await findSourceEntry(cwd),
  };

  await mkdir(resolveInside(cwd, componentsDir), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, { flag: force ? 'w' : 'wx' });

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  output(`Created ${CONFIG_FILE}`);
  output(`Components: ${componentsDir}`);
  if (!dependencies['sillar-ui']) output('Next: install the library with npm install sillar-ui');
  if (config.sourceEntry) output(`Import "sillar-ui/styles.css" once from ${config.sourceEntry}`);
  return config;
}
