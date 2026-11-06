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
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
      
      let filePath = path.join(OUT_DIR, reqPath);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        if (fs.existsSync(filePath + '.html')) filePath = filePath + '.html';
        else if (fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found: ' + reqPath);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

(async () => {
  const port = 3020;
  const server = await createStaticServer(port);

  console.log('Launching Chrome for tight capture...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  // 1. Desktop
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(2000);

  // Force scroll down to trigger all lazy images
  await desktopPage.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= 3000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await desktopPage.waitForTimeout(1500);

  // Capture Bleame Desktop
  const bleameEl = await desktopPage.$('section:has-text("Loving Their Bleame")');
  if (bleameEl) {
    await bleameEl.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    await bleameEl.screenshot({ path: path.join(COMPARISON_DIR, 'bleame_tight_desktop.png') });
    console.log('Saved bleame_tight_desktop.png');
  }

  // Capture Primals Desktop
  const primalsEl = await desktopPage.$('section:has-text("DITCHED PLASTIC")');
  if (primalsEl) {
    await primalsEl.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    await primalsEl.screenshot({ path: path.join(COMPARISON_DIR, 'primals_tight_desktop.png') });
    console.log('Saved primals_tight_desktop.png');
  }

  // 2. Mobile
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  // Force scroll down to trigger all lazy images on mobile
  await mobilePage.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= 3500) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await mobilePage.waitForTimeout(1500);

  // Capture Bleame Mobile
  const mobBleameEl = await mobilePage.$('section:has-text("Loving Their Bleame")');
  if (mobBleameEl) {
    await mobBleameEl.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobBleameEl.screenshot({ path: path.join(COMPARISON_DIR, 'bleame_tight_mobile.png') });
    console.log('Saved bleame_tight_mobile.png');
  }

  // Capture Primals Mobile
  const mobPrimalsEl = await mobilePage.$('section:has-text("DITCHED PLASTIC")');
  if (mobPrimalsEl) {
    await mobPrimalsEl.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobPrimalsEl.screenshot({ path: path.join(COMPARISON_DIR, 'primals_tight_mobile.png') });
    console.log('Saved primals_tight_mobile.png');
  }

  console.log('Finished tight screenshots!');
  await browser.close();
  server.close();
  process.exit(0);
})();

