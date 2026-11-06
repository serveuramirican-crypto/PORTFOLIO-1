const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const columnsData = await page.evaluate(() => {
    // Check if there are .grid-column elements
    const cols = Array.from(document.querySelectorAll('.grid-column'));
    if (cols.length > 0) {
      return cols.map((c, colIdx) => {
        const titles = Array.from(c.querySelectorAll('[data-testid$="-title"]')).map(t => {
          const match = t.getAttribute('data-testid').match(/^review-(.+)-title$/);
          return {
            id: match ? match[1] : '',
            author: t.childNodes[0]?.textContent?.trim()
          };
        });
        return { colIdx, count: titles.length, titles };
      });
    }

    return [];
  });

  console.log('Columns structure in Loox:', JSON.stringify(columnsData, null, 2));
  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame_reviews/columns_layout.json'), JSON.stringify(columnsData, null, 2));

  await browser.close();
})();

