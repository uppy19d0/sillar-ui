import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { CONFIG_FILE } from './init.js';
import { exists, findSourceEntry, readJson } from '../project.js';

export async function inspectProject(cwd) {
  const checks = [];
  const packageJson = await readJson(path.join(cwd, 'package.json'));
  checks.push({ name: 'package.json', ok: Boolean(packageJson), detail: packageJson ? 'React project manifest found' : 'Missing package.json' });
  if (!packageJson) return checks;

  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  checks.push({ name: 'react', ok: Boolean(dependencies.react), detail: dependencies.react ? `React ${dependencies.react}` : 'Install React 18.2 or newer' });
  checks.push({ name: 'sillar-ui', ok: Boolean(dependencies['sillar-ui']), detail: dependencies['sillar-ui'] ? `sillar-ui ${dependencies['sillar-ui']}` : 'Run npm install sillar-ui' });

  const config = await readJson(path.join(cwd, CONFIG_FILE));
  checks.push({ name: CONFIG_FILE, ok: Boolean(config), detail: config ? `Components: ${config.componentsDir}` : 'Run sillar init' });

  const entry = config?.sourceEntry || await findSourceEntry(cwd);
  let hasStyles = false;
  if (entry && await exists(path.join(cwd, entry))) {
    const source = await readFile(path.join(cwd, entry), 'utf8');
    hasStyles = /["']sillar-ui\/styles\.css["']/.test(source);
  }
  checks.push({ name: 'styles', ok: hasStyles, detail: hasStyles ? `Imported from ${entry}` : 'Import "sillar-ui/styles.css" once in the application entry' });
  return checks;
}

export async function doctorProject({ cwd, output = console.log }) {
  const checks = await inspectProject(cwd);
  for (const check of checks) output(`${check.ok ? '✓' : '✗'} ${check.name}: ${check.detail}`);
  const healthy = checks.every((check) => check.ok);
  output(healthy ? 'Sillar UI is configured correctly.' : 'Sillar UI needs attention. Resolve the failed checks above.');
  return { healthy, checks };
}
