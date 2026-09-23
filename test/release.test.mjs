import assert from 'node:assert/strict';
import test from 'node:test';
import { verifyReleaseTag } from '../scripts/verify-release.mjs';

test('release tags must match the package version exactly', () => {
  assert.equal(verifyReleaseTag('1.2.3', 'v1.2.3'), 'v1.2.3');
  assert.throws(() => verifyReleaseTag('1.2.3', 'v1.2.4'), /does not match/);
  assert.throws(() => verifyReleaseTag('1.2.3', ''), /required/);
});
