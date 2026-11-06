const http = require('http');
const fs = require('fs');
const path = require('path');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../out');
const SCREENSHOT_DIR = path.resolve(__dirname, '../reference_bleame_reviews');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  let filePath = path.join(OUT_DIR, cleanUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3018, '127.0.0.1', async () => {
  console.log('Server listening on http://127.0.0.1:3018');

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

    await page.goto('http://127.0.0.1:3018/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(1500);

    const section = page.locator('section').filter({ hasText: '4,973 Reviews' }).first();
    // Scroll so section is in full view
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    // Take screenshot of section with full bounding box
    await section.screenshot({ path: path.join(SCREENSHOT_DIR, 'built_desktop_reviews.png') });
    console.log('Captured built_desktop_reviews.png');

    // Also take a viewport screenshot focused on the header and first row
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes('4,973 Reviews'));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 30;
        window.scrollTo(0, top);
      }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'built_viewport_match.png') });
    console.log('Captured built_viewport_match.png');

    // Mobile screenshot
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.includes('4,973 Reviews'));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo(0, top);
      }
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'built_mobile_viewport.png') });
    console.log('Captured built_mobile_viewport.png');

    await browser.close();
  } catch (e) {
    console.error('Error:', e);
  } finally {
    server.close();
    process.exit(0);
  }
});
