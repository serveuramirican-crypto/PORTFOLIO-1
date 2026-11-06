const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  
  console.log('Navigating with domcontentloaded...');
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Scroll down step by step
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(400);
  }

  // Check frames
  const frames = page.frames();
  console.log('Total frames found:', frames.length);
  for (let i = 0; i < frames.length; i++) {
    console.log(`Frame ${i}: ${frames[i].url().slice(0, 100)}`);
  }

  // Look for text or ids in all frames
  for (let i = 0; i < frames.length; i++) {
    const f = frames[i];
    try {
      const info = await f.evaluate(() => {
        const text = document.body ? document.body.innerText : '';
        const has4973 = text.includes('4,973') || text.includes('Reviews');
        const hasMeagan = text.includes('Meagan');
        const hasWrite = text.includes('Write a review');
        return { has4973, hasMeagan, hasWrite, len: text.length };
      });
      console.log(`Frame ${i} check:`, info);
    } catch (e) {
      console.log(`Frame ${i} evaluate error:`, e.message);
    }
  }

  // Search main page for any review-related elements or scripts
  const reviewApps = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
    const reviewScripts = scripts.filter(s => s.includes('judgeme') || s.includes('yotpo') || s.includes('loox') || s.includes('okendo') || s.includes('junip') || s.includes('stamped') || s.includes('air-reviews'));
    return reviewScripts;
  });
  console.log('Review scripts found:', reviewApps);

  await browser.close();
})();
