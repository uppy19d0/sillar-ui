import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import test from 'node:test';
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const target = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    return entry.isDirectory() ? files(target) : [target.pathname];
  }))).flat();
}
test('React library source stays TypeScript; emitted JavaScript belongs in dist', async () => {
  const source = await files(new URL('../src/', import.meta.url));
  assert.deepEqual(source.filter(file => /\.[cm]?jsx?$/.test(file)), []);
});
