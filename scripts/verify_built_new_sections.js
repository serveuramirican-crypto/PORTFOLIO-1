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
  const port = 3016;
  const server = await createStaticServer(port);

  console.log('Launching Chrome for built new sections capture...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  // 1. Desktop
  console.log('Capturing Desktop...');
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(2000);

  // Locate and screenshot Bleame section
  const bleameHandle = await desktopPage.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll('h2, section, div'));
    const found = all.find(el => el.innerText && el.innerText.includes('Loving Their Bleame'));
    return found ? (found.closest('section') || found.parentElement) : null;
  });

  if (bleameHandle) {
    await bleameHandle.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    await bleameHandle.screenshot({ path: path.join(COMPARISON_DIR, 'built_bleame_desktop.png') });
    console.log('Saved built_bleame_desktop.png');
  }

  // Locate and screenshot Primals section
  const primalsHandle = await desktopPage.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll('h2, section, div'));
    const found = all.find(el => el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
    return found ? (found.closest('section') || found.parentElement) : null;
  });

  if (primalsHandle) {
    await primalsHandle.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(1000);
    await primalsHandle.screenshot({ path: path.join(COMPARISON_DIR, 'built_primals_desktop.png') });
    console.log('Saved built_primals_desktop.png');
  }

  // 2. Mobile
  console.log('Capturing Mobile...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(2000);

  // Mobile Bleame
  const mobBleameHandle = await mobilePage.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll('h2, section, div'));
    const found = all.find(el => el.innerText && el.innerText.includes('Loving Their Bleame'));
    return found ? (found.closest('section') || found.parentElement) : null;
  });

  if (mobBleameHandle) {
    await mobBleameHandle.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobBleameHandle.screenshot({ path: path.join(COMPARISON_DIR, 'built_bleame_mobile.png') });
    console.log('Saved built_bleame_mobile.png');
  }

  // Mobile Primals
  const mobPrimalsHandle = await mobilePage.evaluateHandle(() => {
    const all = Array.from(document.querySelectorAll('h2, section, div'));
    const found = all.find(el => el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
    return found ? (found.closest('section') || found.parentElement) : null;
  });

  if (mobPrimalsHandle) {
    await mobPrimalsHandle.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(1000);
    await mobPrimalsHandle.screenshot({ path: path.join(COMPARISON_DIR, 'built_primals_mobile.png') });
    console.log('Saved built_primals_mobile.png');
  }

  console.log('All comparison screenshots captured successfully!');
  await browser.close();
  server.close();
  process.exit(0);
})();

