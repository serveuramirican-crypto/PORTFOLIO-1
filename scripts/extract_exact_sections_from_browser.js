const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

async function run() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://curvdlondonclothing.com/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  const targets = [
    'shopify-section-template--26949813928209__sb_rev_quotes',
    'sb-why-we-made-this',
    'sb-top3-reasons',
    'sb-designed-to',
    'sb-loved-by-women',
    'sb-capri-height',
    'sb-capri-onepair',
    'sb-capri-comfort',
    'sb-capri-offer',
    'sb-capri-promise',
    'sb-cv-why-switch',
    'sb-cv-trust-bar',
    'sb-capri-088',
    'sb-capri-089',
    'sb-capri-090',
    'shopify-section-template--26949813928209__sbot_reviews',
    'sb-capri-happy-women',
    'sb-capri-offer-bar',
    'sb-capri-faq'
  ];

  const outDir = path.resolve(__dirname, '../reference_pdp/exact_sections');
  fs.mkdirSync(outDir, { recursive: true });

  for (const id of targets) {
    const data = await page.evaluate((targetId) => {
      const el = document.getElementById(targetId) || document.querySelector(`[id*="${targetId}"]`);
      if (!el) return null;
      return {
        id: targetId,
        outerHTML: el.outerHTML,
        innerText: el.innerText
      };
    }, id);

    if (data) {
      fs.writeFileSync(path.join(outDir, `${id}.html`), data.outerHTML);
      fs.writeFileSync(path.join(outDir, `${id}.txt`), data.innerText);
      console.log(`[Extracted] ${id} (${data.outerHTML.length} chars)`);
    } else {
      console.warn(`[NOT FOUND] ${id}`);
    }
  }

  await browser.close();
  console.log('Finished extracting exact sections!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

