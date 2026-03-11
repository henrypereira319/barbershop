import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text() + '\n' + msg.location().url + ':' + msg.location().lineNumber);
    }
  });
  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });

  console.log("Navigating to preview server...");
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(5000);

  if (errors.length > 0) {
    console.error('--- CONSOLE ERRORS FOUND ---');
    errors.forEach(e => console.error(e));
  } else {
    console.log('No console errors found!');
  }

  await browser.close();
  process.exit(0);
})();
