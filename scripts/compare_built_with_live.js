const http = require('http');
const fs = require('fs');
const path = require('path');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const outDir = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2\\out';
const compDir = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2\\comparison';
const artifactDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\86cc7a99-3ee1-407f-acb3-4448c0c4dc28';

if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };
  return types[ext] || 'application/octet-stream';
}

function startServer(port = 3001) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      
      let filePath = path.join(outDir, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
        return;
      }

      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
    });

    server.listen(port, () => {
      console.log(`Static server running on http://localhost:${port}`);
      resolve(server);
    });

    server.on('error', reject);
  });
}

async function run() {
  const server = await startServer(3001);
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox'],
  });

  try {
    // 1. Desktop 1440px
    console.log('Capturing Desktop view at http://localhost:3001/ ...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    // Scroll down to load all images
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    const desktopPath = path.join(compDir, 'built_desktop_full.png');
    await page.screenshot({ path: desktopPath, fullPage: true });
    fs.copyFileSync(desktopPath, path.join(artifactDir, 'mocosmetics_built_desktop_full.png'));
    console.log(`Saved desktop screenshot to ${desktopPath}`);

    // 2. Mobile 390px
    console.log('Capturing Mobile view at http://localhost:3001/ ...');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    });
    await mobilePage.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
    await mobilePage.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await mobilePage.waitForTimeout(1000);

    const mobilePath = path.join(compDir, 'built_mobile_full.png');
    await mobilePage.screenshot({ path: mobilePath, fullPage: true });
    fs.copyFileSync(mobilePath, path.join(artifactDir, 'mocosmetics_built_mobile_full.png'));
    console.log(`Saved mobile screenshot to ${mobilePath}`);

    // 3. Test Cart Drawer interaction
    console.log('Testing Cart Drawer...');
    const quickAddBtn = await page.$('.mo-prod__grid button');
    if (quickAddBtn) {
      await quickAddBtn.click();
      await page.waitForTimeout(800);
      const cartPath = path.join(compDir, 'built_cart_drawer.png');
      await page.screenshot({ path: cartPath });
      fs.copyFileSync(cartPath, path.join(artifactDir, 'mocosmetics_built_cart_drawer.png'));
      console.log(`Saved cart drawer screenshot to ${cartPath}`);
    }

    console.log('All comparison captures completed successfully!');
  } finally {
    await browser.close();
    server.close();
    console.log('Server stopped.');
  }
}

run().catch(err => {
  console.error('Comparison error:', err);
  process.exit(1);
});
