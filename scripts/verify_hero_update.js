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

server.listen(3039, '127.0.0.1', async () => {
  console.log('Static server running on http://127.0.0.1:3039');

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });

    // 1. Desktop Screenshot 1: Top Hero with Desmond & Dempsey Images and Buybox
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await desktopPage.goto('http://127.0.0.1:3039/', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(2500);

    const heroTopPath = path.join(ARTIFACTS_DIR, 'desmond_hero_gallery_desktop.png');
    await desktopPage.screenshot({ path: heroTopPath });
    console.log('Saved desmond_hero_gallery_desktop to', heroTopPath);

    // 2. Desktop Screenshot 2: Scrolled to show Videos & Get The Look
    await desktopPage.evaluate(() => window.scrollBy(0, 1050));
    await desktopPage.waitForTimeout(2000);
    const heroVideosPath = path.join(ARTIFACTS_DIR, 'customer_videos_block_desktop.png');
    await desktopPage.screenshot({ path: heroVideosPath });
    console.log('Saved customer_videos_block_desktop to', heroVideosPath);

    // 3. Desktop Screenshot 3: Gallery bottom showing image 5, 6, 7
    await desktopPage.evaluate(() => window.scrollTo(0, 1600));
    await desktopPage.waitForTimeout(1500);
    const galleryBottomPath = path.join(ARTIFACTS_DIR, 'desmond_gallery_bottom_desktop.png');
    await desktopPage.screenshot({ path: galleryBottomPath });
    console.log('Saved desmond_gallery_bottom_desktop to', galleryBottomPath);

    // 4. Mobile Screenshot 1: Top of Mobile PDP
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:3039/', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(2500);

    const mobileTopPath = path.join(ARTIFACTS_DIR, 'desmond_hero_mobile_top.png');
    await mobilePage.screenshot({ path: mobileTopPath });
    console.log('Saved desmond_hero_mobile_top to', mobileTopPath);

    // 5. Mobile Screenshot 2: Scrolled down directly to video reviews
    await mobilePage.evaluate(() => window.scrollBy(0, 2050));
    await mobilePage.waitForTimeout(2000);
    const mobileVideosPath = path.join(ARTIFACTS_DIR, 'customer_videos_block_mobile.png');
    await mobilePage.screenshot({ path: mobileVideosPath });
    console.log('Saved customer_videos_block_mobile to', mobileVideosPath);

    await browser.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    server.close();
    console.log('Server closed.');
  }
});
