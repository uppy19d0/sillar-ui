import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const files = await readdir(new URL('../dist', import.meta.url));
const javascriptFiles = files.filter((file) => file.endsWith('.js'));
let totalRaw = 0;
let totalGzip = 0;

for (const file of javascriptFiles) {
  const contents = await readFile(new URL(`../dist/${file}`, import.meta.url));
  const raw = contents.byteLength;
  const gzip = gzipSync(contents).byteLength;
  totalRaw += raw;
  totalGzip += gzip;
  assert.ok(raw <= 10_000, `${file} is ${raw} B; the per-entry raw budget is 10000 B`);
  assert.ok(gzip <= 4_000, `${file} is ${gzip} B gzip; the per-entry gzip budget is 4000 B`);
}

assert.ok(totalRaw <= 90_000, `all JavaScript entries total ${totalRaw} B; the budget is 90000 B`);
assert.ok(totalGzip <= 35_000, `all JavaScript entries total ${totalGzip} B gzip; the budget is 35000 B`);
console.log(`${javascriptFiles.length} JavaScript entries: ${totalRaw} B raw / ${totalGzip} B gzip total`);

const css = await readFile(new URL('../dist/styles.css', import.meta.url));
const cssGzip = gzipSync(css).byteLength;
assert.ok(css.byteLength <= 34_000, `dist/styles.css is ${css.byteLength} B; the budget is 34000 B`);
assert.ok(cssGzip <= 7_000, `dist/styles.css is ${cssGzip} B gzip; the budget is 7000 B`);
console.log(`dist/styles.css: ${css.byteLength} B raw / ${cssGzip} B gzip`);
