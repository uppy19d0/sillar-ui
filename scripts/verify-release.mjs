import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export function verifyReleaseTag(version, tag) {
  if (!tag) throw new Error('A release tag is required. Expected v<package-version>.');
  const expected = `v${version}`;
  if (tag !== expected) throw new Error(`Release tag ${tag} does not match package version ${version}. Expected ${expected}.`);
  return expected;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  const tag = process.argv[2] ?? process.env.GITHUB_REF_NAME;
  console.log(`Verified release ${verifyReleaseTag(packageJson.version, tag)}.`);
}
