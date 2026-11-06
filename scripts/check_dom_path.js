const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const structure = await page.evaluate(() => {
    const title = document.querySelector('[data-testid$="-title"]');
    if (!title) return 'No title found';

    // Trace parents
    const path = [];
    let cur = title;
    while (cur && cur.tagName !== 'BODY') {
      path.push({
        tag: cur.tagName,
        id: cur.id,
        class: cur.className,
        style: cur.getAttribute('style'),
        childrenCount: cur.children.length
      });
      cur = cur.parentElement;
    }
    return path;
  });

  console.log('DOM Path:', JSON.stringify(structure, null, 2));
  await browser.close();
})();

