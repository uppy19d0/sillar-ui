import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { readJson, resolveInside } from '../project.js';

const supported = {
  '@radix-ui/react-accordion': 'sillar-ui/accordion',
  '@radix-ui/react-checkbox': 'sillar-ui/choice',
  '@radix-ui/react-collapsible': 'sillar-ui/collapsible',
  '@radix-ui/react-dialog': 'sillar-ui/dialog',
  '@radix-ui/react-dropdown-menu': 'sillar-ui/dropdown-menu',
  '@radix-ui/react-label': 'sillar-ui/label',
  '@radix-ui/react-navigation-menu': 'sillar-ui/navigation-menu',
  '@radix-ui/react-popover': 'sillar-ui/popover',
  '@radix-ui/react-progress': 'sillar-ui/progress',
  '@radix-ui/react-radio-group': 'sillar-ui/choice',
  '@radix-ui/react-select': 'sillar-ui/select-root',
  '@radix-ui/react-separator': 'sillar-ui/separator',
  '@radix-ui/react-slot': 'sillar-ui/slot',
  '@radix-ui/react-switch': 'sillar-ui/switch',
  '@radix-ui/react-tabs': 'sillar-ui/tabs',
  '@radix-ui/react-toast': 'sillar-ui/toast',
  '@radix-ui/react-tooltip': 'sillar-ui/tooltip',
};

const ignoredDirectories = new Set(['.git', 'dist', 'build', '.next', 'node_modules', 'coverage']);
const sourceExtension = /\.(?:[cm]?[jt]sx?)$/;
const radixImport = /@radix-ui\/react-[a-z0-9-]+/g;

async function collectSourceFiles(directory, root, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory() && !ignoredDirectories.has(entry.name)) await collectSourceFiles(absolute, root, files);
    else if (entry.isFile() && sourceExtension.test(entry.name)) files.push(path.relative(root, absolute));
  }
  return files;
}

export async function scanRadixMigration(cwd) {
  const packageJson = await readJson(path.join(cwd, 'package.json'));
  if (!packageJson) throw new Error('No package.json found. Run this command from a project root.');
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const packages = new Set(Object.keys(dependencies).filter((name) => name.startsWith('@radix-ui/react-')));
  const occurrences = [];

  for (const file of await collectSourceFiles(cwd, cwd)) {
    const source = await readFile(path.join(cwd, file), 'utf8');
    source.split(/\r?\n/).forEach((line, index) => {
      for (const packageName of line.match(radixImport) ?? []) {
        packages.add(packageName);
        occurrences.push({ file, line: index + 1, packageName });
      }
    });
  }

  const entries = Array.from(packages).sort().map((packageName) => ({
    packageName,
    replacement: supported[packageName] ?? null,
    occurrences: occurrences.filter((occurrence) => occurrence.packageName === packageName),
  }));
  return { entries, supported: entries.filter((entry) => entry.replacement), unsupported: entries.filter((entry) => !entry.replacement) };
}

export function formatMigrationReport(result) {
  const lines = ['# Radix to Sillar migration report', '', `Found ${result.entries.length} Radix packages and ${result.entries.reduce((total, entry) => total + entry.occurrences.length, 0)} source imports.`, ''];
  if (result.entries.length === 0) lines.push('No Radix React packages or imports were found.', '');
  if (result.supported.length) {
    lines.push('## Supported migrations', '', '| Radix package | Sillar entry | Source imports |', '| --- | --- | ---: |');
    for (const entry of result.supported) lines.push(`| \`${entry.packageName}\` | \`${entry.replacement}\` | ${entry.occurrences.length} |`);
    lines.push('', 'Review component APIs before replacing imports. Sillar intentionally does not guarantee Radix prop compatibility.', '');
  }
  if (result.unsupported.length) {
    lines.push('## Manual migration required', '');
    for (const entry of result.unsupported) lines.push(`- \`${entry.packageName}\` (${entry.occurrences.length} source imports)`);
    lines.push('');
  }
  if (result.entries.some((entry) => entry.occurrences.length)) {
    lines.push('## Locations', '');
    for (const entry of result.entries) for (const occurrence of entry.occurrences) lines.push(`- \`${occurrence.file}:${occurrence.line}\` — \`${entry.packageName}\``);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

export async function migrateRadix({ cwd, report = false, force = false, output = console.log }) {
  const result = await scanRadixMigration(cwd);
  output(`Found ${result.entries.length} Radix packages: ${result.supported.length} supported, ${result.unsupported.length} manual.`);
  for (const entry of result.entries) output(`${entry.replacement ? '✓' : '!'} ${entry.packageName}${entry.replacement ? ` → ${entry.replacement}` : ' → manual migration'}`);
  if (report) {
    const target = resolveInside(cwd, 'sillar-radix-migration.md');
    try {
      await writeFile(target, formatMigrationReport(result), { flag: force ? 'w' : 'wx' });
    } catch (error) {
      if (error && error.code === 'EEXIST') throw new Error('sillar-radix-migration.md already exists. Use --force to replace it.');
      throw error;
    }
    output('Created sillar-radix-migration.md');
  }
  return result;
}
