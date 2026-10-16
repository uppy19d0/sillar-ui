import { expect, test } from '@playwright/test';

test('loading indicator announces text and respects reduced motion', async ({ page }) => {
  const indicator = page.getByRole('status').filter({ hasText: 'Loading results…' });
  await expect(indicator).toBeVisible();
  await expect(indicator).toHaveAttribute('aria-live', 'polite');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(indicator.locator('.slr-spinner')).toHaveCSS('animation-name', 'none');
});

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('form summary links focus the invalid control and async validation recovers', async ({ page }) => {
  const card = page.locator('.component-card').filter({ hasText: 'Form + validation' });
  await expect(card.getByRole('region', { name: 'Check the form' })).toHaveCount(0);
  await card.getByRole('button', { name: 'Validate', exact: true }).click();
  const summary = card.getByRole('region', { name: 'Check the form' });
  await expect(summary).toBeFocused();
  await summary.getByRole('link', { name: 'Enter a valid email.' }).click();
  const input = card.getByRole('textbox', { name: 'Email' });
  await expect(input).toBeFocused();
  const ids = (await input.getAttribute('aria-describedby'))?.split(/\s+/) ?? [];
  expect(ids.length).toBeGreaterThan(1);
  for (const id of ids) await expect(page.locator(`[id=${JSON.stringify(id)}]`)).toHaveCount(1);
  await input.fill('demo@example.test');
  await card.getByRole('button', { name: 'Validate', exact: true }).click();
  await expect(card.getByRole('button', { name: 'Validating…' })).toBeDisabled();
  await expect(card.getByRole('status')).toHaveText('Valid form. Demo complete.');
  await expect(summary).toHaveCount(0);
});

test('Spanish form workflow exposes localized errors and preserves field focus', async ({ page }) => {
  await page.getByRole('button', { name: 'Change language', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  const card = page.locator('.component-card').filter({ hasText: 'Form + validation' });
  await card.getByRole('button', { name: 'Validar', exact: true }).click();
  const summary = card.getByRole('region', { name: 'Revisa el formulario' });
  await expect(summary).toBeFocused();
  await summary.getByRole('link', { name: 'Escribe un correo válido.' }).click();
  await expect(card.getByRole('textbox', { name: 'Correo electrónico' })).toBeFocused();
  await expect(card.getByRole('link', { name: 'Ver el ejemplo completo' })).toHaveAttribute('href', /formularios\.md$/);
});

test('theme contract remains readable in light and dark modes', async ({ page, browserName, isMobile }) => {
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('color', 'rgb(245, 247, 250)');

  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('color', 'rgb(16, 24, 40)');

  if (browserName === 'chromium' && !isMobile) {
    await expect(page.locator('.theme-comparison')).toHaveScreenshot('light-dark-contract.png');
  }
});

test('popover dismisses with Escape and restores trigger focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Open popover' });
  await trigger.click();
  await expect(page.getByText('Independent foundations')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText('Independent foundations')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('getting started tutorial exposes an actionable learning path', async ({ page }) => {
  const tutorial = page.locator('#tutorial');
  await expect(tutorial.getByRole('heading', { level: 2 })).toBeVisible();
  await expect(tutorial.getByRole('listitem')).toHaveCount(4);
  await expect(tutorial.getByRole('link', { name: /Markdown tutorial/i })).toHaveAttribute('href', /tutorial\.md$/);
  await expect(tutorial.getByText('RD$ 84,250.00')).toBeVisible();
});

test('select supports typeahead selection in a portal', async ({ page }) => {
  const card = page.locator('.component-card').filter({ hasText: 'Select + Combobox' });
  const trigger = card.getByRole('combobox', { name: 'Country' });
  await trigger.click();
  await expect(page.getByRole('listbox')).toBeVisible();
  const selectedOption = page.getByRole('option', { name: 'United States' });
  await expect(selectedOption).toBeFocused();
  await selectedOption.press('s');
  const matchedOption = page.getByRole('option', { name: 'Singapore' });
  await expect(matchedOption).toBeFocused();
  await matchedOption.press('Enter');
  await expect(trigger).toHaveText('Singapore');
  await expect(page.getByRole('listbox')).toBeHidden();
});

test('combobox filters and commits an option from the keyboard', async ({ page }) => {
  const input = page.getByPlaceholder('Search a city');
  await input.fill('lon');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('London');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
});

test('date picker moves its roving focus with arrow keys', async ({ page }) => {
  const calendar = page.getByRole('grid');
  const activeDay = calendar.locator('[role="gridcell"][tabindex="0"]');
  const initialLabel = await activeDay.getAttribute('aria-label');
  await activeDay.press('ArrowRight');
  const nextDay = calendar.locator('[role="gridcell"][tabindex="0"]');
  await expect(nextDay).toBeFocused();
  await expect(nextDay).not.toHaveAttribute('aria-label', initialLabel ?? '');
});

test('mobile documentation does not overflow horizontally', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile viewport contract');
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  await expect(page.locator('.docs-header')).toBeVisible();
});
