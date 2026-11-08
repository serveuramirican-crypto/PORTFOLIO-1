const path = require('path');
const { chromium } = require(path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright'));

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('https://www.gorillareign.site/store/products/man-r-3', { waitUntil: 'networkidle' });
  await page.waitForSelector('#details-accordion', { timeout: 10000 });
  
  const buttons = await page.$$('#details-accordion button');
  for (const btn of buttons) {
    try {
      await btn.click();
      await page.waitForTimeout(400);
    } catch (e) {}
  }
  const accHtml = await page.evaluate(() => document.querySelector('#details-accordion')?.innerHTML);
  console.log('--- ACCORDION CONTENT ---');
  console.log(accHtml);
  await browser.close();
})();
