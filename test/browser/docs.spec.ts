import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
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

test('select supports typeahead selection in a portal', async ({ page }) => {
  const card = page.locator('.component-card').filter({ hasText: 'Select + Combobox' });
  const trigger = card.getByRole('combobox', { name: 'Country' });
  await trigger.click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('p');
  await expect(page.getByRole('option', { name: 'Puerto Rico' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveText('Puerto Rico');
  await expect(page.getByRole('listbox')).toBeHidden();
});

test('combobox filters and commits an option from the keyboard', async ({ page }) => {
  const input = page.getByPlaceholder('Search a city');
  await input.fill('santo');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Santo Domingo');
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
