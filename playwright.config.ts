import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/browser',
  outputDir: './test-results/browser',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['line'], ['html', { outputFolder: 'playwright-report', open: 'never' }]] : 'line',
  expect: { timeout: 5_000, toHaveScreenshot: { animations: 'disabled', threshold: 0.25, maxDiffPixelRatio: 0.03 } },
  use: {
    baseURL: 'http://127.0.0.1:4173/sillar-ui/',
    locale: 'en-US',
    timezoneId: 'America/Santo_Domingo',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run docs:dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/sillar-ui/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
