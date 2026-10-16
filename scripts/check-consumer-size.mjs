import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build } from 'vite';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const directory = await mkdtemp(join(tmpdir(), 'sillar-consumer-'));
const entries = [
  { name: 'Button (focused)', file: 'button', symbol: 'Button', budget: 18_000 },
  { name: 'Button (root)', file: 'index', symbol: 'Button', budget: 18_000 },
  { name: 'TextField', file: 'text-field', symbol: 'TextField', budget: 18_000 },
  { name: 'FormErrorSummary', file: 'form-error-summary', symbol: 'FormErrorSummary', budget: 18_000 },
];
const results = [];
try {
  for (const entry of entries) {
    const input = join(directory, entry.file + '.mjs');
    await writeFile(input, `export { ${entry.symbol} } from ${JSON.stringify(resolve(project, 'dist', entry.file + '.js'))};\n`);
    const output = await build({
      root: project, configFile: false, logLevel: 'silent',
      build: {
        write: false, minify: true, lib: { entry: input, formats: ['es'] },
        rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
      },
    });
    const chunks = (Array.isArray(output) ? output : [output]).flatMap(value => value.output).filter(value => value.type === 'chunk');
    const code = chunks.map(chunk => chunk.code).join('\n');
    const bytes = gzipSync(code).byteLength;
    const modules = chunks.flatMap(chunk => Object.keys(chunk.modules));
    assert.ok(modules.some(id => id.includes('node_modules/clsx/')), `${entry.name} must include its actual runtime dependencies`);
    assert.ok(!modules.some(id => /\/dist\/(date-picker|combobox|toast|dialog)\.js$/.test(id)), `${entry.name} unexpectedly pulled unrelated components`);
    assert.ok(bytes <= entry.budget, `${entry.name}: ${bytes} B gzip exceeds ${entry.budget} B`);
    results.push({ name: entry.name, raw: Buffer.byteLength(code), gzip: bytes, budget: entry.budget });
  }
  const [focused, root] = results;
  assert.ok(root.gzip <= focused.gzip + 1_024, 'root Button import pulled extra component code');
  console.table(results);
  console.log('ES library fixtures include runtime class utilities; React peers, CSS and app code are excluded. Gzip sums are not browser timings.');
} finally {
  await rm(directory, { recursive: true, force: true });
}
