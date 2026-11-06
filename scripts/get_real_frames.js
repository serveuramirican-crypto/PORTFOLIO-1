const path = require('path');
const fs = require('fs');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const vids = [
    'https://cdn.shopify.com/videos/c/o/v/99ba32c890fc462bbf6556372613f198.mp4',
    'https://cdn.shopify.com/videos/c/o/v/3f12169b657b412b9a26b3292fcad475.mp4',
    'https://cdn.shopify.com/videos/c/o/v/f808f1bfcd73465a81abd5c33bd5bbd7.mp4',
    'https://cdn.shopify.com/videos/c/o/v/371a4e979934463699dbcfae68213d16.mp4',
    'https://cdn.shopify.com/videos/c/o/v/1f63007f39b14951b1450926b75f414c.mp4'
  ];

  for (let i = 0; i < vids.length; i++) {
    await page.goto(vids[i]);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.resolve(__dirname, `../reference_bleame/real_frame_${i + 1}.png`) });
    console.log(`Captured real_frame_${i + 1}.png for vid ${i + 1}`);
  }

  await browser.close();
})();

