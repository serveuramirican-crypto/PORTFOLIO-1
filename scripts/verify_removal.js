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

server.listen(3032, '127.0.0.1', async () => {
  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

    await page.goto('http://127.0.0.1:3032/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    // Verify UpsellCard is removed
    const hasUpsell = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasAdore: text.includes('Adore the fit but want a longer option?'),
        hasComfortFirst: text.includes('Comfort-First Promise'),
        hasHappyWomen: text.includes('50,000+ HAPPY WOMEN')
      };
    });

    console.log('Verification check (all should be false):', hasUpsell);

    // Capture screenshot above Bleame reviews
    const reviewsEl = page.locator('#customer-reviews');
    await reviewsEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'above_reviews_verify.png') });
    console.log('Saved above_reviews_verify.png');

    await browser.close();
  } catch (e) {
    console.error(e);
  } finally {
    server.close();
    process.exit(0);
  }
});

