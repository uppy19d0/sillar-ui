import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('CLI release tags must match the package version exactly', () => {
  const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  const valid = spawnSync(process.execPath, ['scripts/verify-cli-release.mjs', `cli-v${version}`], { encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stderr);
  const invalid = spawnSync(process.execPath, ['scripts/verify-cli-release.mjs', `cli-v${version}-wrong`], { encoding: 'utf8' });
  assert.notEqual(invalid.status, 0);
});
