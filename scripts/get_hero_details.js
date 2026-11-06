const path = require('path');
const fs = require('fs');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://metabolae.com/products/softgels-ceylon', { waitUntil: 'domcontentloaded', timeout: 60000 });
  
  // Wait a bit for dynamic content
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    // Collect accordions
    const accordions = [];
    document.querySelectorAll('[class*="accordion"], details, [class*="collapsible"], .product__accordion').forEach(el => {
      const title = el.querySelector('summary, [class*="title"], [class*="heading"], button')?.innerText?.trim() || '';
      const body = el.querySelector('[class*="content"], [class*="body"], p')?.innerText?.trim() || el.innerText.trim();
      if (title) {
        accordions.push({ title, body });
      }
    });

    // Also get the HTML of the main hero section
    const mainSection = document.querySelector('.product, [id*="MainProduct"], main') || document.body;
    
    // Find all reviews / testimonial quotes or cards
    const videoCards = Array.from(document.querySelectorAll('[class*="video"], [class*="ugc"], [class*="review"], [class*="slider"] img')).map(img => ({
      src: img.src,
      alt: img.alt,
      parentText: img.closest('div')?.innerText?.slice(0, 100)
    }));

    return {
      accordions,
      htmlSnippet: mainSection ? mainSection.innerHTML.slice(0, 50000) : ''
    };
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_metabolae/hero_raw_details.json'), JSON.stringify(data, null, 2));
  console.log('Saved hero_raw_details.json, accordions count:', data.accordions.length);
  await browser.close();
})();
