const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const robsrtInfo = await page.evaluate(() => {
    // Find text containing Robsrt
    const all = Array.from(document.querySelectorAll('*'));
    const t = all.find(e => e.innerText && e.innerText.trim() === 'Robsrt S.');
    if (!t) return 'Not found';
    const card = t.closest('.grid-column > div, [class*="card"], .block')?.parentElement;
    return {
      titleHTML: t.outerHTML,
      cardHTML: card ? card.innerHTML.slice(0, 2000) : 'no card'
    };
  });

  console.log('Robsrt HTML:', robsrtInfo);
  await browser.close();
})();

