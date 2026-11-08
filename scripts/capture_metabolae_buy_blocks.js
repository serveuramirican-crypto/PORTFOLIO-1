const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const ARTIFACT_DIR = 'C:/Users/dell/.gemini/antigravity/brain/506422e4-f2da-46c6-aa51-f66101c72afa';

async function run() {
  console.log('[Playwright] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();
  console.log('[Playwright] Navigating to https://metabolae.com/products/softgels-ceylon ...');
  await page.goto('https://metabolae.com/products/softgels-ceylon', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  await page.waitForTimeout(3000);

  // Take screenshot of the right side buy box area
  const buyBoxTarget = await page.$('.product-form, [class*="product-form"], [class*="product__info"], form[action*="/cart/add"]');
  if (buyBoxTarget) {
    await buyBoxTarget.screenshot({ path: path.join(ARTIFACT_DIR, 'metabolae_target_buybox.png') });
    console.log('Saved metabolae_target_buybox.png');
  }

  // Also full desktop viewport of the upper fold
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'metabolae_target_desktop_hero.png'), fullPage: false });
  console.log('Saved metabolae_target_desktop_hero.png');

  // Mobile viewport
  const mobilePage = await (await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  })).newPage();

  await mobilePage.goto('https://metabolae.com/products/softgels-ceylon', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: path.join(ARTIFACT_DIR, 'metabolae_target_mobile_hero.png'), fullPage: false });
  console.log('Saved metabolae_target_mobile_hero.png');

  await browser.close();
  console.log('Done capturing targets!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
