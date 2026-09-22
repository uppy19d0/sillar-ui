import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const budgets = [
  { file: 'dist/index.js', raw: 36_000, gzip: 9_000 },
  { file: 'dist/styles.css', raw: 22_000, gzip: 5_500 },
];

for (const budget of budgets) {
  const contents = await readFile(new URL(`../${budget.file}`, import.meta.url));
  const sizes = { raw: contents.byteLength, gzip: gzipSync(contents).byteLength };
  assert.ok(
    sizes.raw <= budget.raw,
    `${budget.file} is ${sizes.raw} B; the raw budget is ${budget.raw} B`,
  );
  assert.ok(
    sizes.gzip <= budget.gzip,
    `${budget.file} is ${sizes.gzip} B gzip; the gzip budget is ${budget.gzip} B`,
  );
  console.log(`${budget.file}: ${sizes.raw} B raw / ${sizes.gzip} B gzip`);
}
