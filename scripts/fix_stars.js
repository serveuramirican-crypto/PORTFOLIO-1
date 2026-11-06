const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const ratings = await page.evaluate(() => {
    const list = [];
    const titleEls = Array.from(document.querySelectorAll('[data-testid$="-title"]'));
    titleEls.forEach(t => {
      const match = t.getAttribute('data-testid').match(/^review-(.+)-title$/);
      if (!match) return;
      const id = match[1];
      const parent = t.parentElement;
      // find svg stars in parent
      const starsSvg = Array.from(parent.querySelectorAll('svg.loox-icon-star, svg[class*="star"]'));
      let filled = 0;
      starsSvg.forEach(s => {
        const use = s.querySelector('use');
        const href = use ? (use.getAttribute('href') || use.getAttribute('xlink:href') || '') : '';
        if (href.includes('star-filled') || !href.includes('star-empty')) {
          filled++;
        }
      });
      list.push({ id, author: t.childNodes[0]?.textContent?.trim(), stars: filled || 5 });
    });
    return list;
  });

  const complete = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../reference_bleame_reviews/complete_reviews.json'), 'utf8'));
  complete.reviews.forEach(r => {
    const found = ratings.find(x => x.id === r.id);
    if (found) {
      r.stars = found.stars;
    }
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame_reviews/complete_reviews.json'), JSON.stringify(complete, null, 2));
  console.log('Updated stars for reviews:');
  console.log(ratings.slice(0, 10));

  await browser.close();
})();

