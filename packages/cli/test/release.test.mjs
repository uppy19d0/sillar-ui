import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

test('CLI release tags must match the package version exactly', () => {
  const valid = spawnSync(process.execPath, ['scripts/verify-cli-release.mjs', 'cli-v0.1.0'], { encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stderr);
  const invalid = spawnSync(process.execPath, ['scripts/verify-cli-release.mjs', 'cli-v0.2.0'], { encoding: 'utf8' });
  assert.notEqual(invalid.status, 0);
});
