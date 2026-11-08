const path = require('path');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  const heroData = await page.evaluate(() => {
    const hero = document.querySelector('section');
    const leftCol = hero?.querySelector('.lg\\:w-\\[58\\%\\], .lg\\:w-\\[60\\%\\]');
    const rightCol = hero?.querySelector('.lg\\:w-\\[42\\%\\], .lg\\:w-\\[40\\%\\]');
    const gallery = leftCol?.firstElementChild;
    const buyBox = rightCol?.children[0];
    const reviews = rightCol?.children[1];
    const getLook = rightCol?.children[2];
    
    return {
      leftColRect: leftCol ? leftCol.getBoundingClientRect() : null,
      rightColRect: rightCol ? rightCol.getBoundingClientRect() : null,
      galleryRect: gallery ? gallery.getBoundingClientRect() : null,
      buyBoxRect: buyBox ? buyBox.getBoundingClientRect() : null,
      reviewsRect: reviews ? reviews.getBoundingClientRect() : null,
      getLookRect: getLook ? getLook.getBoundingClientRect() : null,
    };
  });
  
  console.log('MEASUREMENTS:', JSON.stringify(heroData, null, 2));
  await browser.close();
})();

