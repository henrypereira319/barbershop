import { test, expect } from '@playwright/test';

test('check console errors on load', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text() + '\n' + msg.location().url + ':' + msg.location().lineNumber);
    }
  });
  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(5000); // Wait 5 seconds for 3D viewer to load

  if (errors.length > 0) {
    console.error('--- CONSOLE ERRORS FOUND ---');
    errors.forEach(e => console.error(e));
    throw new Error('Console errors were found');
  }
});
