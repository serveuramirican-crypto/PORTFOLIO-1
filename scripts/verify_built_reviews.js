const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const SCREENSHOT_DIR = path.resolve(__dirname, '../reference_bleame_reviews');
const HTML_FILE = path.resolve(__dirname, '../out/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort.html');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');
  console.log('Opening file URL:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  const targetSection = page.locator('section').filter({ hasText: '4,973 Reviews' }).first();
  await targetSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await targetSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'built_desktop_reviews.png') });
  console.log('Saved built_desktop_reviews.png');

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await targetSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  await targetSection.screenshot({ path: path.join(SCREENSHOT_DIR, 'built_mobile_reviews.png') });
  console.log('Saved built_mobile_reviews.png');

  await browser.close();
  console.log('Completed screenshot capture!');
})();
