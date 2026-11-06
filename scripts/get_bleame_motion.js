const path = require('path');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);

  const motionInfo = await page.evaluate(async () => {
    const slider = document.querySelector('.marquee-poster-slider, [class*="marquee"]');
    if (!slider) return 'No slider found';

    const track = slider.querySelector('.slick-track') || slider;
    const transform1 = window.getComputedStyle(track).transform;
    const scroll1 = slider.scrollLeft;

    await new Promise(r => setTimeout(r, 1500));

    const transform2 = window.getComputedStyle(track).transform;
    const scroll2 = slider.scrollLeft;

    return {
      classes: slider.className,
      trackClasses: track.className,
      transform1,
      transform2,
      scroll1,
      scroll2,
      slickSettings: slider.getAttribute('data-slick') || ''
    };
  });

  console.log('Motion info:', motionInfo);
  await browser.close();
})();

