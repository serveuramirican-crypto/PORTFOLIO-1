const path = require('path');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://metabolae.com/products/softgels-ceylon', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  const accordions = await page.evaluate(() => {
    const results = [];
    // look for elements with text Clinically Supported Benefits
    const all = document.querySelectorAll('*');
    for (const el of all) {
      if (el.children.length === 0 && el.innerText?.includes('Clinically Supported Benefits')) {
        const parent = el.closest('details, div, section');
        results.push({
          tag: el.tagName,
          text: el.innerText,
          parentHTML: parent ? parent.outerHTML.slice(0, 1000) : ''
        });
      }
    }
    return results;
  });

  console.log(JSON.stringify(accordions, null, 2));
  await browser.close();
})();

