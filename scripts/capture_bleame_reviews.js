const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const BLEAME_REVIEWS_DIR = path.resolve(__dirname, '../reference_bleame_reviews');
const BLEAME_REVIEWS_ASSETS = path.resolve(__dirname, '../public/bleame_review_assets');

if (!fs.existsSync(BLEAME_REVIEWS_DIR)) fs.mkdirSync(BLEAME_REVIEWS_DIR, { recursive: true });
if (!fs.existsSync(BLEAME_REVIEWS_ASSETS)) fs.mkdirSync(BLEAME_REVIEWS_ASSETS, { recursive: true });

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
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve(null);
    });
  });
}

(async () => {
  console.log('Launching Chrome to inspect Bleame Customer Reviews section...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);

  // Scroll down until the review widget is loaded
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= 12000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await page.waitForTimeout(4000);

  // Locate the review container
  const reviewLocator = page.locator('text=Write a review').first();
  const count = await reviewLocator.count();
  console.log('Found "Write a review" count:', count);

  let targetElement = null;
  if (count > 0) {
    const el = await reviewLocator.elementHandle();
    targetElement = await page.evaluateHandle((btn) => {
      let cur = btn;
      while (cur && cur.parentElement) {
        if (cur.parentElement.tagName === 'MAIN' || cur.parentElement.tagName === 'BODY' || cur.tagName === 'SECTION' || cur.id?.includes('review') || cur.className?.includes('review')) {
          return cur;
        }
        cur = cur.parentElement;
      }
      return btn.parentElement.parentElement;
    }, el);
  }

  const elHandle = targetElement ? targetElement.asElement() : null;

  if (elHandle) {
    await elHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await elHandle.screenshot({ path: path.join(BLEAME_REVIEWS_DIR, 'live_desktop_reviews.png') });
    console.log('Saved live_desktop_reviews.png');
  } else {
    console.log('Could not find specific container, taking full viewport screenshot...');
    await page.screenshot({ path: path.join(BLEAME_REVIEWS_DIR, 'live_desktop_reviews.png') });
  }

  // Extract structured details of the review cards
  const data = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('*')).find(e => e.innerText && e.innerText.trim() === 'Write a review');
    if (!btn) return { error: 'No Write a review found' };

    let container = btn;
    while (container && container.parentElement && !container.className?.includes('review') && !container.id?.includes('review') && container.tagName !== 'SECTION') {
      if (container.parentElement.tagName === 'MAIN' || container.parentElement.tagName === 'BODY') break;
      container = container.parentElement;
    }

    // Find all review cards inside or near container
    const cardSelectors = ['.jdgm-rev', '.review-card', '[class*="review_item"]', '[class*="ReviewCard"]', '[class*="review-item"]', '[class*="card"]'];
    let cards = [];
    for (const sel of cardSelectors) {
      const found = container.querySelectorAll(sel);
      if (found.length > 3) {
        cards = Array.from(found);
        break;
      }
    }

    // If none found by selector, inspect direct children of the list grid
    if (cards.length === 0) {
      const allDivs = container.querySelectorAll('div');
      cards = Array.from(allDivs).filter(d => d.innerText && (d.innerText.includes('Verified') || d.innerText.includes('★')));
    }

    // Extract images inside container
    const images = Array.from(container.querySelectorAll('img')).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      class: img.className
    })).filter(x => x.src && !x.src.includes('avatar') && !x.src.includes('star'));

    return {
      containerTag: container.tagName,
      containerClass: container.className,
      containerId: container.id,
      cardCount: cards.length,
      sampleCardTexts: cards.slice(0, 15).map(c => c.innerText.slice(0, 150)),
      images: images.slice(0, 30)
    };
  });

  console.log('Extracted Data Summary:', JSON.stringify({
    containerClass: data.containerClass,
    cardCount: data.cardCount,
    imagesFound: data.images?.length,
    sampleTexts: data.sampleCardTexts?.slice(0, 5)
  }, null, 2));

  fs.writeFileSync(path.join(BLEAME_REVIEWS_DIR, 'details.json'), JSON.stringify(data, null, 2));

  // Download all images from data.images
  if (data.images && data.images.length > 0) {
    console.log(`Downloading ${data.images.length} images...`);
    for (let i = 0; i < data.images.length; i++) {
      const url = data.images[i].src;
      if (url && url.startsWith('http')) {
        let ext = path.extname(url.split('?')[0]) || '.jpg';
        if (ext.length > 5) ext = '.jpg';
        const filename = `rev_${i}${ext}`;
        await downloadFile(url, path.join(BLEAME_REVIEWS_ASSETS, filename));
      }
    }
    console.log('All images downloaded successfully.');
  }

  // Also take mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  if (elHandle) {
    await elHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await elHandle.screenshot({ path: path.join(BLEAME_REVIEWS_DIR, 'live_mobile_reviews.png') });
    console.log('Saved live_mobile_reviews.png');
  }

  await browser.close();
})();
