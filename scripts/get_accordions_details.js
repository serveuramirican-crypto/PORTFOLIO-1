const path = require('path');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://metabolae.com/products/softgels-ceylon', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  const accordions = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.accordion__title')).map(el => {
      const details = el.closest('details');
      return {
        title: el.innerText.trim(),
        content: details ? details.querySelector('.accordion__content')?.innerText?.trim() || details.innerText : ''
      };
    });
  });

  console.log(JSON.stringify(accordions, null, 2));
  await browser.close();
})();

