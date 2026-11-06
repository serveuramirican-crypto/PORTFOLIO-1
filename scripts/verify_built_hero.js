const http = require('http');
const fs = require('fs');
const path = require('path');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../out');
const COMPARISON_DIR = path.resolve(__dirname, '../comparison');
if (!fs.existsSync(COMPARISON_DIR)) fs.mkdirSync(COMPARISON_DIR, { recursive: true });

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
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') {
        reqPath = '/index.html';
      }
      
      let filePath = path.join(OUT_DIR, reqPath);
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
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

(async () => {
  const port = 3012;
  const server = await createStaticServer(port);

  console.log('Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  // 1. Desktop
  console.log('Capturing Desktop Hero...');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(1500);

  // Take screenshot of above the fold / hero
  await desktopPage.screenshot({
    path: path.join(COMPARISON_DIR, 'metabolae_built_desktop_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1250 }
  });

  // Scroll a bit down to capture lower part of hero (video reviews & why trust metabolae)
  await desktopPage.evaluate(() => window.scrollBy(0, 700));
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({
    path: path.join(COMPARISON_DIR, 'metabolae_built_desktop_hero_lower.png'),
    clip: { x: 0, y: 0, width: 1440, height: 1100 }
  });

  // 2. Mobile
  console.log('Capturing Mobile Hero...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1500);

  // Top mobile
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'metabolae_built_mobile_top.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  // Scroll to buy box on mobile
  await mobilePage.evaluate(() => window.scrollBy(0, 500));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'metabolae_built_mobile_buybox.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  // Scroll to trust box on mobile
  await mobilePage.evaluate(() => window.scrollBy(0, 700));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({
    path: path.join(COMPARISON_DIR, 'metabolae_built_mobile_trust.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 }
  });

  console.log('Screenshots saved successfully!');
  await browser.close();
  server.close();
  process.exit(0);
})();

