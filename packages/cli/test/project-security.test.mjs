import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { addComponents } from '../src/commands/add.js';
import { initTokens } from '../src/commands/tokens.js';
import { initProject } from '../src/commands/init.js';
import { migrateRadix } from '../src/commands/migrate.js';

async function fixture(action) {
  const directory = await mkdtemp(path.join(tmpdir(), 'sillar-security-'));
  const cwd = path.join(directory, 'project');
  const outside = path.join(directory, 'outside');
  await mkdir(cwd); await mkdir(outside);
  await writeFile(path.join(cwd, 'package.json'), '{}');
  const victim = path.join(outside, 'victim');
  await writeFile(victim, 'preserve me');
  try { await action({ cwd, outside, victim }); }
  finally { await rm(directory, { recursive: true, force: true }); }
}
const output = () => {};

test('forced CLI writes refuse symlink files and preserve their targets', async () => {
  for (const [filename, run] of [
    ['sillar.config.json', cwd => initProject({ cwd, force: true, output })],
    ['tokens.css', cwd => initTokens({ cwd, force: true, output })],
    ['sillar-radix-migration.md', cwd => migrateRadix({ cwd, report: true, force: true, output })],
  ]) await fixture(async ({ cwd, victim }) => {
    if (filename === 'tokens.css') await writeFile(path.join(cwd, 'sillar.config.json'), JSON.stringify({ tokensFile: filename }));
    await symlink(victim, path.join(cwd, filename));
    await assert.rejects(run(cwd), /symbolic link/);
    assert.equal(await readFile(victim, 'utf8'), 'preserve me');
  });
});

test('component and token output directories cannot escape through symlinks', async () => {
  await fixture(async ({ cwd, outside }) => {
    await symlink(outside, path.join(cwd, 'linked'));
    await writeFile(path.join(cwd, 'sillar.config.json'), JSON.stringify({ componentsDir: 'linked/ui', tokensFile: 'linked/styles/tokens.css' }));
    await assert.rejects(addComponents({ cwd, names: ['button'], force: true, output }), /symbolic link/);
    await assert.rejects(initTokens({ cwd, force: true, output }), /symbolic link/);
    await assert.rejects(readFile(path.join(outside, 'ui/button.ts')), { code: 'ENOENT' });
    await assert.rejects(readFile(path.join(outside, 'styles/tokens.css')), { code: 'ENOENT' });
  });
});

test('inherited registry properties are rejected as unknown components', async () => {
  await fixture(async ({ cwd }) => {
    await writeFile(path.join(cwd, 'sillar.config.json'), '{}');
    for (const name of ['constructor', 'toString', '__proto__']) {
      await assert.rejects(addComponents({ cwd, names: [name], output }), /Unknown component/);
    }
  });
});
