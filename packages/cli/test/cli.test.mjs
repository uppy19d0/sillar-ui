import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { addComponents } from '../src/commands/add.js';
import { inspectProject } from '../src/commands/doctor.js';
import { initProject } from '../src/commands/init.js';
import { formatMigrationReport, migrateRadix, scanRadixMigration } from '../src/commands/migrate.js';
import { resolveInside } from '../src/project.js';
import { checkTokens, contrastRatio, createTokenTheme, initTokens, inspectTokenTheme } from '../src/commands/tokens.js';

async function fixture({ withSillar = false } = {}) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'sillar-cli-'));
  await mkdir(path.join(cwd, 'src'), { recursive: true });
  await writeFile(path.join(cwd, 'package.json'), JSON.stringify({ dependencies: { react: '^19.0.0', ...(withSillar ? { 'sillar-ui': '^1.1.0' } : {}) } }));
  await writeFile(path.join(cwd, 'tsconfig.json'), '{}');
  await writeFile(path.join(cwd, 'src/main.tsx'), `import 'sillar-ui/styles.css';\n`);
  return cwd;
}

test('init creates a safe typed project configuration without overwriting it', async () => {
  const cwd = await fixture();
  const messages = [];
  const config = await initProject({ cwd, output: (message) => messages.push(message) });
  assert.equal(config.typescript, true);
  assert.equal(config.componentsDir, 'src/components/ui');
  assert.match(messages.join('\n'), /npm install sillar-ui/);
  await assert.rejects(() => initProject({ cwd }), /already exists/);
});

test('add creates focused aliases and rejects unknown or existing components', async () => {
  const cwd = await fixture({ withSillar: true });
  await initProject({ cwd, output: () => {} });
  const created = await addComponents({ cwd, names: ['button', 'select'], output: () => {} });
  assert.deepEqual(created, ['src/components/ui/button.ts', 'src/components/ui/select.ts']);
  assert.equal(await readFile(path.join(cwd, created[0]), 'utf8'), `export { Button } from 'sillar-ui/button';\n`);
  await assert.rejects(() => addComponents({ cwd, names: ['unknown'] }), /Unknown component/);
  await assert.rejects(() => addComponents({ cwd, names: ['button'] }), /already exists/);
});

test('doctor reports a complete setup and actionable missing requirements', async () => {
  const healthy = await fixture({ withSillar: true });
  await initProject({ cwd: healthy, output: () => {} });
  assert.equal((await inspectProject(healthy)).every((check) => check.ok), true);

  const incomplete = await fixture();
  const failed = (await inspectProject(incomplete)).filter((check) => !check.ok).map((check) => check.name);
  assert.deepEqual(failed, ['sillar-ui', 'sillar.config.json']);
});

test('project paths cannot escape the configured root', () => {
  assert.throws(() => resolveInside('/tmp/project', '../outside'), /inside the project/);
});

test('Radix migration audit finds supported and manual migrations without changing source', async () => {
  const cwd = await fixture({ withSillar: true });
  await writeFile(path.join(cwd, 'package.json'), JSON.stringify({ dependencies: { react: '^19.0.0', '@radix-ui/react-dialog': '^1.0.0', '@radix-ui/react-avatar': '^1.0.0' } }));
  const source = `import * as Dialog from '@radix-ui/react-dialog';\n`;
  await writeFile(path.join(cwd, 'src/main.tsx'), source);
  const result = await scanRadixMigration(cwd);
  assert.equal(result.supported[0].replacement, 'sillar-ui/dialog');
  assert.equal(result.unsupported[0].packageName, '@radix-ui/react-avatar');
  assert.match(formatMigrationReport(result), /src\/main\.tsx:1/);
  await migrateRadix({ cwd, report: true, output: () => {} });
  assert.match(await readFile(path.join(cwd, 'sillar-radix-migration.md'), 'utf8'), /Review component APIs/);
  assert.equal(await readFile(path.join(cwd, 'src/main.tsx'), 'utf8'), source);
});

test('token tooling generates a complete accessible light and dark brand contract', async () => {
  const cwd = await fixture({ withSillar: true });
  await initProject({ cwd, output: () => {} });
  const report = inspectTokenTheme(createTokenTheme('#6750a4'));
  assert.equal(report.valid, true);
  assert.ok(contrastRatio(report.light.brand, report.light['brand-contrast']) >= 4.5);
  assert.ok(contrastRatio(report.dark.brand, report.dark['brand-contrast']) >= 4.5);
  await initTokens({ cwd, brand: '#6750a4', output: () => {} });
  assert.equal((await checkTokens({ cwd, output: () => {} })).valid, true);
  await assert.rejects(() => initTokens({ cwd, brand: '#6750a4' }), /already exists/);
});

test('token tooling rejects invalid colors and incomplete or inaccessible themes', () => {
  assert.throws(() => createTokenTheme('purple'), /Invalid brand color/);
  const invalid = inspectTokenTheme(':root { --slr-color-brand: #777777; --slr-color-brand-contrast: #888888; }');
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.some((error) => error.includes('below 4.5:1')));
  assert.ok(invalid.errors.some((error) => error.includes('dark: missing')));
});
