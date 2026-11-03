const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const COMPARISON_DIR = path.resolve(__dirname, '../comparison');
const BUILT_SLICES_DIR = path.resolve(COMPARISON_DIR, 'built_slices');
fs.mkdirSync(BUILT_SLICES_DIR, { recursive: true });

const PORT = 3055;

async function run() {
  console.log(`[Compare] Starting Next.js production server on port ${PORT}...`);
  
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log('[Server stdout]:', d.toString().trim()));
  server.stderr.on('data', (d) => console.error('[Server stderr]:', d.toString().trim()));

  // Wait for server to respond
  await new Promise((resolve) => setTimeout(resolve, 6000));

  console.log('[Compare] Launching Chrome to inspect built page...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox'],
  });

  // 1. Desktop Comparison
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopCtx.newPage();

  const targetUrl = `http://localhost:${PORT}/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort`;
  console.log(`[Compare] Navigating to ${targetUrl}...`);
  await desktopPage.goto(targetUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await desktopPage.waitForTimeout(3000);

  // Scroll to trigger any lazy elements and get total height
  const scrollInfo = await desktopPage.evaluate(async () => {
    return await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 400);
        h += 400;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          const totalH = document.body.scrollHeight;
          window.scrollTo(0, 0);
          setTimeout(() => resolve({ totalHeight: totalH }), 1000);
        }
      }, 80);
    });
  });

  console.log(`[Compare] Built page total height: ${scrollInfo.totalHeight}px`);

  console.log('[Compare] Taking built Desktop Full Screenshot...');
  await desktopPage.screenshot({
    path: path.join(COMPARISON_DIR, 'built_desktop_full.png'),
    fullPage: true,
  });

  // Slices matching the live site slices
  const sliceOffsets = [0, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 8100, 9000, 9900, 10800, 11700];
  for (let i = 0; i < sliceOffsets.length; i++) {
    const offset = sliceOffsets[i];
    await desktopPage.evaluate((y) => window.scrollTo(0, y), offset);
    await desktopPage.waitForTimeout(400);
    const filename = `slice_${String(i + 1).padStart(2, '0')}_top_${offset}.png`;
    await desktopPage.screenshot({
      path: path.join(BUILT_SLICES_DIR, filename),
      fullPage: false,
    });
    console.log(`[Compare] Saved built slice ${filename}`);
  }

  // Test opening Cart Drawer
  console.log('[Compare] Testing interactive Add to Cart...');
  const atcBtn = await desktopPage.locator('button:has-text("Add to cart")').first();
  if (await atcBtn.isVisible()) {
    await atcBtn.click();
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({
      path: path.join(COMPARISON_DIR, 'built_cart_drawer.png'),
      fullPage: false,
    });

    // Close cart drawer
    const closeCartBtn = await desktopPage.locator('button[aria-label="Close cart"]').first();
    if (await closeCartBtn.isVisible()) {
      await closeCartBtn.click();
      await desktopPage.waitForTimeout(500);
    }
  }

  // Test opening Size Guide Modal
  console.log('[Compare] Testing Size Guide modal...');
  const sizeGuideBtn = await desktopPage.locator('button:has-text("What\'s My Size?")').first();
  if (await sizeGuideBtn.isVisible()) {
    await sizeGuideBtn.click();
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: path.join(COMPARISON_DIR, 'built_size_guide.png'),
      fullPage: false,
    });
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(500);
  }

  await desktopCtx.close();

  // 2. Mobile Comparison
  console.log('[Compare] Inspecting Mobile viewport (390x844)...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(targetUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
  await mobilePage.waitForTimeout(3000);

  console.log('[Compare] Taking built Mobile Full Screenshot...');
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'built_mobile_full.png'),
    fullPage: true,
  });

  await mobileCtx.close();
  await browser.close();

  server.kill();
  console.log('[Compare] Visual comparison completed successfully! Screenshots in /comparison/');
}

run().catch((err) => {
  console.error('[Compare Error]', err);
  process.exit(1);
});
