const http = require('http');
const fs = require('fs');
const path = require('path');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../out');
const ARTIFACTS_DIR = 'C:/Users/dell/.gemini/antigravity/brain/506422e4-f2da-46c6-aa51-f66101c72afa';

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

server.listen(3036, '127.0.0.1', async () => {
  console.log('Static server running on http://127.0.0.1:3036');

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });

    // 1. Desktop Screenshot
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    await desktopPage.goto('http://127.0.0.1:3036/', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(2000);

    const desktopPath = path.join(ARTIFACTS_DIR, 'polo_hero_built_desktop.png');
    await desktopPage.screenshot({ path: desktopPath });
    console.log('Saved built desktop screenshot to', desktopPath);

    // 2. Mobile Screenshot
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3036/', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(2000);

    const mobilePath = path.join(ARTIFACTS_DIR, 'polo_hero_built_mobile.png');
    await mobilePage.screenshot({ path: mobilePath });
    console.log('Saved built mobile screenshot to', mobilePath);

    await browser.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    server.close();
    console.log('Server closed. Verification complete.');
  }
});

