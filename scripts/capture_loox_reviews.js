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
  console.log('Opening Loox reviews directly...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1300, height: 1600 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Take screenshot of desktop reviews
  await page.screenshot({ path: path.join(BLEAME_REVIEWS_DIR, 'live_desktop_reviews.png'), fullPage: true });
  console.log('Saved live_desktop_reviews.png');

  // Mobile screenshot
  await page.setViewportSize({ width: 400, height: 1200 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(BLEAME_REVIEWS_DIR, 'live_mobile_reviews.png') });
  console.log('Saved live_mobile_reviews.png');

  // Restore viewport
  await page.setViewportSize({ width: 1300, height: 1600 });

  // Extract all review data
  const reviewData = await page.evaluate(() => {
    const headerEl = document.querySelector('.header, [class*="header"], [class*="summary"]');
    const headerText = headerEl ? headerEl.innerText : '';

    const cards = Array.from(document.querySelectorAll('.grid-item, [class*="grid-item"], [class*="review-item"], [class*="card"], [class*="block"]'));

    const items = [];
    // If specific class not found, find all elements with author/stars
    const allReviews = document.querySelectorAll('[data-id], .block, .item, [class*="review"]');
    
    // Loox cards usually have class `.block` or `.grid-item`
    const reviewBlocks = Array.from(document.querySelectorAll('.block'));
    
    reviewBlocks.forEach((block, idx) => {
      const author = block.querySelector('.name, [class*="name"], .author')?.innerText?.trim() || '';
      const verified = !!block.querySelector('.verified, [class*="verified"], [class*="icon-verified"], svg');
      const date = block.querySelector('.date, [class*="date"], time')?.innerText?.trim() || '';
      const text = block.querySelector('.text, [class*="text"], .pre-wrap, p')?.innerText?.trim() || '';
      
      // Star rating
      const starsFilled = block.querySelectorAll('.star.filled, [class*="star"][class*="fill"], .fa-star, svg[class*="star"]').length;
      
      // Images / Videos
      const imgEl = block.querySelector('img');
      const imgSrc = imgEl ? (imgEl.src || imgEl.getAttribute('data-src') || '') : '';
      
      const hasVideo = !!block.querySelector('.play, [class*="play"], video, .video-icon');
      const moreBadge = block.querySelector('[class*="badge"], [class*="count"], [class*="more"]')?.innerText?.trim() || '';
      const itemType = block.querySelector('[class*="variant"], [class*="item-type"], [class*="tag"]')?.innerText?.trim() || '';

      if (author || text || imgSrc) {
        items.push({
          id: idx,
          author,
          verified,
          date,
          text,
          stars: starsFilled || 5,
          imgSrc,
          hasVideo,
          moreBadge,
          itemType,
          rawHTML: block.outerHTML.slice(0, 1000)
        });
      }
    });

    // Also get all image URLs
    const allImages = Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src')).filter(Boolean);

    // Get page colors and CSS
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(s => s.outerHTML).join('\n');

    return {
      headerText,
      count: items.length,
      items,
      allImages: Array.from(new Set(allImages)),
      bodyHTML: document.body.innerHTML.slice(0, 50000)
    };
  });

  fs.writeFileSync(path.join(BLEAME_REVIEWS_DIR, 'extracted_loox.json'), JSON.stringify(reviewData, null, 2));
  console.log(`Extracted ${reviewData.count} review cards!`);
  console.log(`Found ${reviewData.allImages.length} images.`);

  // Download all review images
  for (let i = 0; i < reviewData.allImages.length; i++) {
    const url = reviewData.allImages[i];
    if (url && url.startsWith('http') && !url.includes('badge') && !url.includes('svg')) {
      let ext = path.extname(url.split('?')[0]) || '.jpg';
      if (ext.length > 5) ext = '.jpg';
      const filename = `bleame_rev_${i}${ext}`;
      await downloadFile(url, path.join(BLEAME_REVIEWS_ASSETS, filename));
    }
  }
  console.log('All review images downloaded successfully.');

  await browser.close();
})();

