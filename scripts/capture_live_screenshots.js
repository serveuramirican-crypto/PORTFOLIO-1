const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

async function capture() {
  const outDir = path.resolve(__dirname, '../reference_pdp/live_screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('[Capture] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Desktop capture
  console.log('[Capture] Opening desktop page...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await desktopContext.newPage();

  try {
    console.log('[Capture] Navigating to target PDP...');
    await page.goto('https://curvdlondonclothing.com/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  } catch (e) {
    console.log('[Capture] Navigation wait note:', e.message);
  }

  // Smooth scroll down to load lazy images
  console.log('[Capture] Scrolling desktop...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 1500);
        }
      }, 150);
    });
  });

  await page.waitForTimeout(2000);

  console.log('[Capture] Taking desktop full page screenshot...');
  await page.screenshot({ path: path.join(outDir, 'live_desktop_full.png'), fullPage: true });
  await page.screenshot({ path: path.join(outDir, 'live_desktop_above_fold.png'), fullPage: false });

  // Mobile capture
  console.log('[Capture] Opening mobile context...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto('https://curvdlondonclothing.com/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
  } catch (e) {
    console.log('[Capture] Mobile navigation note:', e.message);
  }

  console.log('[Capture] Scrolling mobile...');
  await mobilePage.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 1500);
        }
      }, 150);
    });
  });

  await mobilePage.waitForTimeout(2000);

  console.log('[Capture] Taking mobile screenshots...');
  await mobilePage.screenshot({ path: path.join(outDir, 'live_mobile_full.png'), fullPage: true });
  await mobilePage.screenshot({ path: path.join(outDir, 'live_mobile_above_fold.png'), fullPage: false });

  await browser.close();
  console.log('[Capture] Done! Saved screenshots to reference_pdp/live_screenshots');
}

capture().catch(err => {
  console.error('[Capture Error]', err);
  process.exit(1);
});

