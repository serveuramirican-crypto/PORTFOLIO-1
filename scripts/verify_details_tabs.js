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

server.listen(3041, '127.0.0.1', async () => {
  console.log('Static server running on http://127.0.0.1:3041');

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });

    // 1. Desktop Screenshot of DetailsTabs (The Details)
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    await desktopPage.goto('http://127.0.0.1:3041/', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(2500);

    // Scroll to DetailsTabs with offset for sticky header
    await desktopPage.evaluate(() => {
      const el = document.querySelector('[role="tablist"]');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await desktopPage.waitForTimeout(1000);

    const desktopTab0Path = path.join(ARTIFACTS_DIR, 'details_tabs_desktop_verified.png');
    await desktopPage.screenshot({ path: desktopTab0Path });
    console.log('Saved details_tabs_desktop_verified to', desktopTab0Path);

    // Click Fabric & Care tab
    await desktopPage.evaluate(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      if (tabs[1]) tabs[1].click();
    });
    await desktopPage.waitForTimeout(1000);
    const desktopTab1Path = path.join(ARTIFACTS_DIR, 'details_tabs_fabric_verified.png');
    await desktopPage.screenshot({ path: desktopTab1Path });
    console.log('Saved details_tabs_fabric_verified to', desktopTab1Path);

    // Click Shipping tab
    await desktopPage.evaluate(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      if (tabs[2]) tabs[2].click();
    });
    await desktopPage.waitForTimeout(1000);
    const desktopTab2Path = path.join(ARTIFACTS_DIR, 'details_tabs_shipping_verified.png');
    await desktopPage.screenshot({ path: desktopTab2Path });
    console.log('Saved details_tabs_shipping_verified to', desktopTab2Path);

    // Switch back to tab 0
    await desktopPage.evaluate(() => {
      const tabs = document.querySelectorAll('[role="tab"]');
      if (tabs[0]) tabs[0].click();
    });
    await desktopPage.waitForTimeout(500);

    // 2. Mobile Screenshot of DetailsTabs
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3041/', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(2500);

    await mobilePage.evaluate(() => {
      const el = document.querySelector('[role="tablist"]');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await mobilePage.waitForTimeout(1000);

    const mobileTab0Path = path.join(ARTIFACTS_DIR, 'details_tabs_mobile_verified.png');
    await mobilePage.screenshot({ path: mobileTab0Path });
    console.log('Saved details_tabs_mobile_verified to', mobileTab0Path);

    await browser.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    server.close();
    console.log('Server closed.');
  }
});
