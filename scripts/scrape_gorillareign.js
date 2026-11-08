const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { chromium } = require('../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');

const ARTIFACTS_DIR = 'C:/Users/dell/.gemini/antigravity/brain/506422e4-f2da-46c6-aa51-f66101c72afa';
const ASSETS_DIR = path.resolve(__dirname, '../public/gorilla_assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('http')) {
      return resolve(null);
    }
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return resolve(null);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(dest);
      });
      stream.on('error', (err) => {
        fs.unlink(dest, () => {});
        resolve(null);
      });
    }).on('error', (err) => resolve(null));
  });
}

(async () => {
  console.log('Launching browser to scrape gorillareign...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Desktop capture
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  console.log('Navigating to https://www.gorillareign.site/store/products/man-r-3 ...');
  try {
    await page.goto('https://www.gorillareign.site/store/products/man-r-3', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    console.log('Page loaded!');
    await page.waitForTimeout(3000);

    // Save desktop screenshot
    const desktopScreenshotPath = path.join(ARTIFACTS_DIR, 'gorilla_hero_desktop_target.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log('Saved desktop screenshot to', desktopScreenshotPath);

    // Extract hero details
    const heroDetails = await page.evaluate(() => {
      // Find main product container
      const productTitle = document.querySelector('h1')?.innerText?.trim() || '';
      
      // Collect all images in product area
      const imgElements = Array.from(document.querySelectorAll('img'));
      const images = imgElements.map(img => ({
        src: img.src,
        srcset: img.srcset,
        alt: img.alt,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        className: img.className,
      })).filter(i => i.src && !i.src.includes('data:image/svg'));

      // Look for pricing, buttons, text
      const textSnippets = Array.from(document.querySelectorAll('p, span, div, h1, h2, h3, button, a'))
        .filter(el => el.children.length === 0 && el.innerText.trim().length > 0)
        .map(el => ({ tag: el.tagName, text: el.innerText.trim(), className: el.className }));

      // Grab outerHTML of main or product section
      const mainEl = document.querySelector('main') || document.querySelector('#main') || document.querySelector('.product') || document.body;
      
      return {
        title: document.title,
        productTitle,
        images,
        textSnippets: textSnippets.slice(0, 150),
        mainHtmlSnippet: mainEl.outerHTML.substring(0, 25000),
      };
    });

    fs.writeFileSync(path.join(__dirname, 'gorilla_details.json'), JSON.stringify(heroDetails, null, 2));
    console.log('Saved hero details to gorilla_details.json');

    // Download unique images
    const uniqueImages = [...new Set(heroDetails.images.map(i => i.src))].filter(Boolean);
    console.log(`Found ${uniqueImages.length} images. Downloading...`);
    let imgIdx = 0;
    const downloadedMap = {};
    for (const imgUrl of uniqueImages) {
      const ext = path.extname(new URL(imgUrl).pathname) || '.jpg';
      const filename = `gorilla_img_${imgIdx}${ext.includes('?') ? ext.split('?')[0] : ext}`;
      const dest = path.join(ASSETS_DIR, filename);
      await downloadImage(imgUrl, dest);
      downloadedMap[imgUrl] = `/gorilla_assets/${filename}`;
      imgIdx++;
    }
    fs.writeFileSync(path.join(__dirname, 'gorilla_images_map.json'), JSON.stringify(downloadedMap, null, 2));
    console.log('Images downloaded and mapped!');

  } catch (err) {
    console.error('Error during scraping:', err);
  }

  // 2. Mobile capture
  try {
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('https://www.gorillareign.site/store/products/man-r-3', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await mobilePage.waitForTimeout(2000);
    const mobileScreenshotPath = path.join(ARTIFACTS_DIR, 'gorilla_hero_mobile_target.png');
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log('Saved mobile screenshot to', mobileScreenshotPath);
    await mobileContext.close();
  } catch (mErr) {
    console.error('Error mobile capture:', mErr);
  }

  await browser.close();
  console.log('Scraping finished!');
})();
