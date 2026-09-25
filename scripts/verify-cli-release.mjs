import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const tag = process.argv[2] ?? process.env.GITHUB_REF_NAME;
const packageJson = JSON.parse(await readFile(new URL('../packages/cli/package.json', import.meta.url), 'utf8'));
const expected = `cli-v${packageJson.version}`;

assert.equal(tag, expected, `CLI release tag must be ${expected}; received ${tag ?? '(missing)'}.`);
console.log(`CLI release tag ${tag} matches sillar-cli@${packageJson.version}.`);
