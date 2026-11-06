const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../reference_metabolae');
const ASSETS_DIR = path.resolve(__dirname, '../public/metabolae_assets');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

async function downloadFile(url, dest) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) return resolve(null);
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    }).on('error', () => {
      fs.unlink(dest, () => { });
      resolve(null);
    });
  });
}

async function capture() {
  console.log('[Scraper] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await desktopCtx.newPage();

  console.log('[Scraper] Navigating to page...');
  await page.goto('https://metabolae.com/products/softgels-ceylon', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  // Take full desktop and viewport screenshots
  console.log('[Scraper] Taking desktop screenshots...');
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop_above_fold.png'), fullPage: false });

  // Scroll down a bit to capture below fold hero details (accordions, why trust metabolae, reviews)
  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop_hero_middle.png'), fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop_hero_lower.png'), fullPage: false });

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Extract all images in the upper section (< 3000px)
  const pageData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).map((img, i) => {
      const rect = img.getBoundingClientRect();
      return {
        id: i,
        src: img.currentSrc || img.src,
        alt: img.alt || '',
        width: img.naturalWidth,
        height: img.naturalHeight,
        className: img.className,
        top: rect.top + window.scrollY,
        left: rect.left,
        w: rect.width,
        h: rect.height
      };
    }).filter(img => img.src && !img.src.startsWith('data:') && img.top < 3000);

    // Extract product form / buy box details
    const title = document.querySelector('h1')?.innerText?.trim() || '';
    const price = document.querySelector('[class*="price"]')?.innerText?.trim() || '';

    // Extract all option cards
    const cards = Array.from(document.querySelectorAll('[class*="tier"], [class*="bundle"], [class*="variant"], [class*="option"], [data-package]')).map(c => ({
      text: c.innerText?.trim() || '',
      html: c.innerHTML
    }));

    return {
      title,
      price,
      images,
      cards,
      bodyText: document.body.innerText.substring(0, 15000)
    };
  });

  console.log(`[Scraper] Found ${pageData.images.length} images.`);
  fs.writeFileSync(path.join(OUT_DIR, 'page_data.json'), JSON.stringify(pageData, null, 2));

  // Download all images
  for (let i = 0; i < pageData.images.length; i++) {
    const item = pageData.images[i];
    try {
      const urlObj = new URL(item.src);
      const ext = path.extname(urlObj.pathname) || '.png';
      const base = path.basename(urlObj.pathname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `img_${String(i).padStart(2, '0')}_${base}${ext}`;
      const dest = path.join(ASSETS_DIR, filename);
      await downloadFile(item.src, dest);
      item.localPath = `/metabolae_assets/${filename}`;
      console.log(`[Downloaded ${i + 1}/${pageData.images.length}] ${filename}`);
    } catch (e) {
      console.log('Error downloading', item.src, e.message);
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, 'page_data_with_local_assets.json'), JSON.stringify(pageData, null, 2));

  // Mobile screenshots
  console.log('[Scraper] Capturing mobile view...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://metabolae.com/products/softgels-ceylon', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'mobile_hero_top.png') });

  await mobilePage.evaluate(() => window.scrollBy(0, 500));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'mobile_hero_cards.png') });

  await mobilePage.evaluate(() => window.scrollBy(0, 600));
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({ path: path.join(OUT_DIR, 'mobile_hero_trust.png') });

  await browser.close();
  console.log('[Scraper] Complete!');
}

capture().catch(console.error);
