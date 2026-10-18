import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map(channel => parseInt(channel, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(first, second) {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}
test('default semantic text, action and focus colors meet their contrast targets in both themes', async () => {
  const css = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8');
  const blocks = css.split(/\}\s*/).filter(block => block.includes('--slr-color-bg:'));
  assert.equal(blocks.length, 2);
  for (const block of blocks) {
    const values = Object.fromEntries([...block.matchAll(/--slr-color-([\w-]+):\s*(#[a-f\d]{6})/gi)].map(([, key, value]) => [key, value]));
    for (const surface of ['bg', 'surface', 'surface-raised', 'surface-sunken']) {
      for (const text of ['text', 'muted', 'subtle']) assert.ok(contrast(values[text], values[surface]) >= 4.5, `${text} on ${surface}`);
      assert.ok(contrast(values.focus, values[surface]) >= 3, `focus on ${surface}`);
    }
    assert.ok(contrast(values.brand, values['brand-contrast']) >= 4.5);
    assert.ok(contrast(values['brand-hover'], values['brand-contrast']) >= 4.5);
  }
});
