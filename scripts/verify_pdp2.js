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

  // For port 5000 root, serve pdp-2
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/pdp-2.html';
  }

  let filePath = path.join(OUT_DIR, cleanUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 5000;

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`PDP 2 server running on http://127.0.0.1:${PORT}`);

  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
    
    // --- 1. Desktop Test (1440px) ---
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Hero Desktop Screenshot
    const heroLocator = page.locator('section').first();
    await heroLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const heroShot = path.join(ARTIFACTS_DIR, 'pdp2_hero_desktop.png');
    await heroLocator.screenshot({ path: heroShot });
    console.log(`Saved hero desktop screenshot to ${heroShot}`);

    // Customer Video Reviews Screenshot
    const videoLoc = page.locator('text=What our customers are saying:').locator('xpath=ancestor::div[2]');
    await videoLoc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const videoShot = path.join(ARTIFACTS_DIR, 'pdp2_customer_videos.png');
    await videoLoc.screenshot({ path: videoShot });
    console.log(`Saved customer videos screenshot to ${videoShot}`);

    // Top 3 Reasons Screenshot
    const top3Loc = page.locator('#sb-top3-reasons');
    await top3Loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const top3Shot = path.join(ARTIFACTS_DIR, 'pdp2_top3_reasons.png');
    await top3Loc.screenshot({ path: top3Shot });
    console.log(`Saved top 3 reasons screenshot to ${top3Shot}`);

    // Loved By Women ("Every Shape & Lifestyle") Screenshot
    const lovedLoc = page.locator('#sb-loved-by-women');
    await lovedLoc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const lovedShot = path.join(ARTIFACTS_DIR, 'pdp2_loved_by_women.png');
    await lovedLoc.screenshot({ path: lovedShot });
    console.log(`Saved loved by women screenshot to ${lovedShot}`);

    // So Comfortable ("You Won’t Believe These Are Work Pants.") Screenshot
    const comfLoc = page.locator('#sb-capri-comfort');
    await comfLoc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const comfShot = path.join(ARTIFACTS_DIR, 'pdp2_so_comfortable.png');
    await comfLoc.screenshot({ path: comfShot });
    console.log(`Saved so comfortable screenshot to ${comfShot}`);

    // --- 2. Mobile Test (390px) ---
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    await mobilePage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1500);

    const mobileHero = mobilePage.locator('section').first();
    await mobileHero.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
    const mobileShot = path.join(ARTIFACTS_DIR, 'pdp2_hero_mobile.png');
    await mobileHero.screenshot({ path: mobileShot });
    console.log(`Saved mobile hero screenshot to ${mobileShot}`);

    await browser.close();
    server.close();
    console.log('PDP 2 verification completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error during verification:', err);
    server.close();
    process.exit(1);
  }
});

