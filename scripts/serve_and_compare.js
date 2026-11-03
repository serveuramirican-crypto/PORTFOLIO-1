const http = require('http');
const fs = require('fs');
const path = require('path');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../out');
const COMPARISON_DIR = path.resolve(__dirname, '../comparison');
const BUILT_SLICES_DIR = path.resolve(COMPARISON_DIR, 'built_slices');
fs.mkdirSync(BUILT_SLICES_DIR, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function createStaticServer(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') {
        reqPath = '/index.html';
      }
      
      let filePath = path.join(OUT_DIR, reqPath);
      
      // If path doesn't have an extension, try appending .html or /index.html
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        if (fs.existsSync(filePath + '.html')) {
          filePath = filePath + '.html';
        } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
          filePath = path.join(filePath, 'index.html');
        }
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found: ' + reqPath);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, '127.0.0.1', () => {
      console.log(`[Static Server] Listening on http://127.0.0.1:${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

async function run() {
  const PORT = 4123;
  const server = await createStaticServer(PORT);

  console.log('[Compare] Launching Chrome browser...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox'],
  });

  // 1. Desktop Visual Capture (1440 x 900)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopCtx.newPage();

  const url = `http://127.0.0.1:${PORT}/`;
  console.log(`[Compare] Navigating to ${url}...`);
  await desktopPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await desktopPage.waitForTimeout(3000);

  // Smooth scroll through entire page to ensure all images and fonts render
  console.log('[Compare] Scrolling through page to trigger all views...');
  const scrollInfo = await desktopPage.evaluate(async () => {
    return await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 350);
        h += 350;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          const totalH = document.body.scrollHeight;
          window.scrollTo(0, 0);
          setTimeout(() => resolve({ totalHeight: totalH }), 1200);
        }
      }, 70);
    });
  });

  console.log(`[Compare] Built page total height: ${scrollInfo.totalHeight}px`);

  console.log('[Compare] Capturing built Desktop Full-Page Screenshot...');
  await desktopPage.screenshot({
    path: path.join(COMPARISON_DIR, 'built_desktop_full.png'),
    fullPage: true,
  });

  // Capture all 14 slices
  const sliceOffsets = [0, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 8100, 9000, 9900, 10800, 11700];
  for (let i = 0; i < sliceOffsets.length; i++) {
    const offset = sliceOffsets[i];
    await desktopPage.evaluate((y) => window.scrollTo(0, y), offset);
    await desktopPage.waitForTimeout(300);
    const filename = `slice_${String(i + 1).padStart(2, '0')}_top_${offset}.png`;
    await desktopPage.screenshot({
      path: path.join(BUILT_SLICES_DIR, filename),
      fullPage: false,
    });
    console.log(`[Compare] Sliced [${i + 1}/14]: ${filename}`);
  }

  // Test interactive Add to Cart -> Cart Drawer
  console.log('[Compare] Testing interactive Add to Cart Drawer...');
  await desktopPage.evaluate(() => window.scrollTo(0, 400));
  await desktopPage.waitForTimeout(400);
  const atcBtn = await desktopPage.locator('button:has-text("Add to cart")').first();
  if (await atcBtn.isVisible()) {
    await atcBtn.click();
    await desktopPage.waitForTimeout(1000);
    await desktopPage.screenshot({
      path: path.join(COMPARISON_DIR, 'built_cart_drawer.png'),
      fullPage: false,
    });
    console.log('[Compare] Captured Cart Drawer open state');

    const closeCartBtn = await desktopPage.locator('button[aria-label="Close cart"]').first();
    if (await closeCartBtn.isVisible()) {
      await closeCartBtn.click();
      await desktopPage.waitForTimeout(400);
    }
  }

  // Test Size Guide Modal
  console.log('[Compare] Testing Size Guide modal...');
  const sizeGuideBtn = await desktopPage.locator('button:has-text("What\'s My Size?")').first();
  if (await sizeGuideBtn.isVisible()) {
    await sizeGuideBtn.click();
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: path.join(COMPARISON_DIR, 'built_size_guide.png'),
      fullPage: false,
    });
    console.log('[Compare] Captured Size Guide Modal open state');
    await desktopPage.keyboard.press('Escape');
    await desktopPage.waitForTimeout(400);
  }

  await desktopCtx.close();

  // 2. Mobile Visual Capture (390 x 844)
  console.log('[Compare] Launching Mobile Viewport (390 x 844)...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mobilePage.waitForTimeout(2500);

  // Trigger mobile scroll
  await mobilePage.evaluate(async () => {
    return await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 300);
        h += 300;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(resolve, 800);
        }
      }, 60);
    });
  });

  console.log('[Compare] Capturing built Mobile Full-Page Screenshot...');
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'built_mobile_full.png'),
    fullPage: true,
  });

  // Mobile Sticky ATC check
  await mobilePage.evaluate(() => window.scrollTo(0, 900));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'built_mobile_sticky_atc.png'),
    fullPage: false,
  });
  console.log('[Compare] Captured Mobile Sticky ATC check');

  await mobileCtx.close();
  await browser.close();

  server.close();
  console.log('[Compare] All visual comparisons and screenshot captures completed successfully!');
}

run().catch((err) => {
  console.error('[Compare Error]', err);
  process.exit(1);
});

