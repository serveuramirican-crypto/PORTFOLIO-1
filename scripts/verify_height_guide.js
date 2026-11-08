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
  '.mp4': 'video/mp4',
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

const PORT = 3046;

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Static server running on http://127.0.0.1:${PORT}`);

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
    
    // --- 1. Desktop Test ---
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await desktopPage.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);

    const sectionLocator = desktopPage.locator('text=Looks Good at Every Height').locator('xpath=ancestor::section[1]');
    await sectionLocator.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(800);

    const desktopShotPath = path.join(ARTIFACTS_DIR, 'height_guide_desktop_verified.png');
    await sectionLocator.screenshot({ path: desktopShotPath });
    console.log(`Saved desktop screenshot to ${desktopShotPath}`);

    // --- 2. Mobile Test ---
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    await mobilePage.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    const mobileSectionLocator = mobilePage.locator('text=Looks Good at Every Height').locator('xpath=ancestor::section[1]');
    await mobileSectionLocator.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(800);

    const mobileShotPath = path.join(ARTIFACTS_DIR, 'height_guide_mobile_verified.png');
    await mobileSectionLocator.screenshot({ path: mobileShotPath });
    console.log(`Saved mobile screenshot to ${mobileShotPath}`);

    await browser.close();
    server.close();
    console.log('Verification completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during verification:', err);
    server.close();
    process.exit(1);
  }
});

