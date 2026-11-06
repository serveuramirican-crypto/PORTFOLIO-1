const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const BLEAME_DIR = path.resolve(__dirname, '../reference_bleame');
const BLEAME_ASSETS = path.resolve(__dirname, '../public/bleame_assets');
const PRIMALS_DIR = path.resolve(__dirname, '../reference_primals');
const PRIMALS_ASSETS = path.resolve(__dirname, '../public/primals_assets');

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

async function scrapeBleameSection(browser) {
  console.log('[Bleame] Loading page...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Close any popups if present
  try {
    await page.evaluate(() => {
      const closeButtons = document.querySelectorAll('[aria-label*="close" i], button[class*="close" i], .close-modal, .klaviyo-close-form');
      closeButtons.forEach(btn => btn.click());
    });
  } catch (e) {}

  const data = await page.evaluate(() => {
    // Search for element with "Loving Their Bleame"
    const headings = Array.from(document.querySelectorAll('*'));
    const match = headings.find(el => el.children.length === 0 && el.innerText && el.innerText.includes('Loving Their Bleame'));
    if (!match) return null;

    // Find the enclosing section/container
    let section = match;
    while (section && section.tagName !== 'SECTION' && !section.className?.includes('section') && section.parentElement) {
      if (section.parentElement.tagName === 'BODY' || section.parentElement.tagName === 'MAIN') break;
      section = section.parentElement;
    }

    const title = match.innerText;
    const allImgs = Array.from(section.querySelectorAll('img')).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      width: img.width,
      height: img.height
    }));

    // Find story / review card items
    const cards = [];
    const cardElements = section.querySelectorAll('[class*="slide"], [class*="card"], [class*="item"]');
    cardElements.forEach(c => {
      const img = c.querySelector('img');
      if (img) {
        cards.push({
          img: img.currentSrc || img.src,
          alt: img.alt || '',
          text: c.innerText?.trim()
        });
      }
    });

    return {
      title,
      sectionHTML: section.outerHTML,
      text: section.innerText,
      allImgs,
      cards
    };
  });

  fs.writeFileSync(path.join(BLEAME_DIR, 'bleame_extracted.json'), JSON.stringify(data, null, 2));

  // Screenshot the exact element
  const sectionHandle = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('*'));
    const match = headings.find(el => el.children.length === 0 && el.innerText && el.innerText.includes('Loving Their Bleame'));
    if (!match) return null;
    let section = match;
    while (section && section.tagName !== 'SECTION' && !section.className?.includes('section') && section.parentElement) {
      if (section.parentElement.tagName === 'BODY' || section.parentElement.tagName === 'MAIN') break;
      section = section.parentElement;
    }
    return section;
  });

  if (sectionHandle) {
    await sectionHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await sectionHandle.screenshot({ path: path.join(BLEAME_DIR, 'bleame_section_desktop.png') });
  }

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  if (sectionHandle) {
    await sectionHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await sectionHandle.screenshot({ path: path.join(BLEAME_DIR, 'bleame_section_mobile.png') });
  }

  // Download images
  if (data?.allImgs) {
    console.log(`[Bleame] Downloading ${data.allImgs.length} images...`);
    for (let i = 0; i < data.allImgs.length; i++) {
      const src = data.allImgs[i].src;
      if (src && src.startsWith('http')) {
        let ext = path.extname(src.split('?')[0]) || '.webp';
        if (ext.length > 5) ext = '.webp';
        const filename = `bleame_${i}${ext}`;
        const dest = path.join(BLEAME_ASSETS, filename);
        await downloadFile(src, dest);
      }
    }
  }

  await page.close();
}

async function scrapePrimalsSection(browser) {
  console.log('[Primals] Loading page...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('https://primals.shop/products/boar-hair-bristle-toothbrush-4-pack', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Dismiss popup modals / spin wheels
  await page.evaluate(() => {
    // remove wheel / overlay modals
    const popups = document.querySelectorAll('[class*="modal"], [class*="popup"], [class*="spin"], [id*="wheel"], [class*="overlay"]');
    popups.forEach(p => {
      // Check if it's high z-index overlay
      const style = window.getComputedStyle(p);
      if (style.position === 'fixed' || style.position === 'absolute' || parseInt(style.zIndex, 10) > 100) {
        p.remove();
      }
    });
    // also remove backdrop if any
    document.querySelectorAll('.backdrop, [class*="backdrop"]').forEach(b => b.remove());
  });

  const data = await page.evaluate(() => {
    // Search for element with "DITCHED PLASTIC FOR GOOD"
    const headings = Array.from(document.querySelectorAll('*'));
    const match = headings.find(el => el.children.length === 0 && el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
    if (!match) return null;

    let section = match;
    while (section && section.tagName !== 'SECTION' && !section.className?.includes('section') && section.parentElement) {
      if (section.parentElement.tagName === 'BODY' || section.parentElement.tagName === 'MAIN') break;
      section = section.parentElement;
    }

    // Extract all text, headings, buttons, pills
    const pills = Array.from(section.querySelectorAll('button, [class*="tab"], [class*="pill"], [class*="filter"]')).map(b => b.innerText?.trim());
    
    // Extract video elements and poster images
    const videos = Array.from(section.querySelectorAll('video, [class*="video"]')).map(v => ({
      poster: v.getAttribute('poster') || v.querySelector('img')?.src || '',
      title: v.innerText?.trim()
    }));

    // Extract all images
    const allImgs = Array.from(section.querySelectorAll('img')).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt || ''
    }));

    // Extract reviews
    const reviews = [];
    const reviewCards = section.querySelectorAll('[class*="review"], [class*="testimonial"], [class*="quote"]');
    reviewCards.forEach(rc => {
      reviews.push(rc.innerText?.trim());
    });

    return {
      title: match.innerText,
      sectionHTML: section.outerHTML,
      fullText: section.innerText,
      pills,
      videos,
      allImgs,
      reviews
    };
  });

  fs.writeFileSync(path.join(PRIMALS_DIR, 'primals_extracted.json'), JSON.stringify(data, null, 2));

  // Screenshot exact section
  const sectionHandle = await page.evaluateHandle(() => {
    const headings = Array.from(document.querySelectorAll('*'));
    const match = headings.find(el => el.children.length === 0 && el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
    if (!match) return null;
    let section = match;
    while (section && section.tagName !== 'SECTION' && !section.className?.includes('section') && section.parentElement) {
      if (section.parentElement.tagName === 'BODY' || section.parentElement.tagName === 'MAIN') break;
      section = section.parentElement;
    }
    return section;
  });

  if (sectionHandle) {
    await sectionHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await sectionHandle.screenshot({ path: path.join(PRIMALS_DIR, 'primals_section_desktop.png') });
  }

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  if (sectionHandle) {
    await sectionHandle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await sectionHandle.screenshot({ path: path.join(PRIMALS_DIR, 'primals_section_mobile.png') });
  }

  // Download Primals image thumbnails/posters
  if (data?.allImgs) {
    console.log(`[Primals] Downloading ${data.allImgs.length} images...`);
    for (let i = 0; i < data.allImgs.length; i++) {
      const src = data.allImgs[i].src;
      if (src && src.startsWith('http')) {
        let ext = path.extname(src.split('?')[0]) || '.webp';
        if (ext.length > 5) ext = '.webp';
        const filename = `primals_${i}${ext}`;
        const dest = path.join(PRIMALS_ASSETS, filename);
        await downloadFile(src, dest);
      }
    }
  }

  await page.close();
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  try {
    await scrapeBleameSection(browser);
    console.log('Bleame scraping done');
  } catch (e) {
    console.error('Bleame error:', e);
  }
  try {
    await scrapePrimalsSection(browser);
    console.log('Primals scraping done');
  } catch (e) {
    console.error('Primals error:', e);
  }
  await browser.close();
})();

