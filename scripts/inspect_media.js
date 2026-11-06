const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const data = await page.evaluate(() => {
    // Look at the columns and their items
    const columns = Array.from(document.querySelectorAll('.grid-column'));
    const results = [];

    // Let's inspect the elements that have photos
    const mediaEls = Array.from(document.querySelectorAll('[data-testid*="media"], .media, [class*="media"], [class*="image"], [style*="background-image"]'));
    const mediaInfo = mediaEls.map(m => ({
      tag: m.tagName,
      class: m.className,
      style: m.getAttribute('style'),
      imgSrc: m.querySelector('img')?.src || m.querySelector('img')?.getAttribute('data-src'),
      bg: m.style.backgroundImage,
      html: m.outerHTML.slice(0, 300)
    }));

    // Let's inspect each grid block
    const allBlocks = Array.from(document.querySelectorAll('.grid-column > div, .grid > div'));
    const blocksInfo = allBlocks.slice(0, 10).map(b => ({
      html: b.outerHTML.slice(0, 600),
      images: Array.from(b.querySelectorAll('img')).map(i => i.src || i.getAttribute('data-src')),
      bg: Array.from(b.querySelectorAll('*')).map(el => el.style.backgroundImage).filter(Boolean)
    }));

    return {
      mediaCount: mediaEls.length,
      mediaSample: mediaInfo.slice(0, 8),
      blocksCount: allBlocks.length,
      blocksSample: blocksInfo
    };
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame_reviews/media_info.json'), JSON.stringify(data, null, 2));
  console.log('Media info extracted:', data.mediaCount, data.blocksCount);
  console.log('Sample media:', data.mediaSample.slice(0, 3));
  console.log('Sample blocks images:', data.blocksSample.slice(0, 3));

  await browser.close();
})();

