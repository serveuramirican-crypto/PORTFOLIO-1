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

[BLEAME_DIR, BLEAME_ASSETS, PRIMALS_DIR, PRIMALS_ASSETS].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

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

async function captureBleame(browser) {
  console.log('[Bleame] Opening page...');
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Find the section containing "Look At How Others Are Loving Their Bleame" or "Loving Their Bleame"
  const sectionInfo = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section'));
    const target = headings.find(el => el.innerText && el.innerText.includes('Loving Their Bleame'));
    if (!target) return null;
    const section = target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement;
    
    // Collect all images inside this section
    const images = Array.from(section.querySelectorAll('img')).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt || ''
    }));

    return {
      text: section.innerText,
      html: section.outerHTML.slice(0, 50000),
      images
    };
  });

  fs.writeFileSync(path.join(BLEAME_DIR, 'section_info.json'), JSON.stringify(sectionInfo, null, 2));
  console.log('[Bleame] Found section info, images count:', sectionInfo?.images?.length || 0);

  // Take screenshot of that section
  try {
    const sectionHandle = await page.evaluateHandle(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section'));
      const target = headings.find(el => el.innerText && el.innerText.includes('Loving Their Bleame'));
      return target ? (target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement) : null;
    });
    if (sectionHandle) {
      await sectionHandle.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await sectionHandle.screenshot({ path: path.join(BLEAME_DIR, 'desktop_section.png') });
      console.log('[Bleame] Saved desktop_section.png');
    }
  } catch (err) {
    console.error('[Bleame] Error capturing section screenshot:', err.message);
  }

  // Mobile screenshot of Bleame section
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mobilePage.waitForTimeout(4000);

  try {
    const mobileHandle = await mobilePage.evaluateHandle(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section'));
      const target = headings.find(el => el.innerText && el.innerText.includes('Loving Their Bleame'));
      return target ? (target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement) : null;
    });
    if (mobileHandle) {
      await mobileHandle.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(1000);
      await mobileHandle.screenshot({ path: path.join(BLEAME_DIR, 'mobile_section.png') });
      console.log('[Bleame] Saved mobile_section.png');
    }
  } catch (err) {
    console.error('[Bleame] Error capturing mobile section screenshot:', err.message);
  }

  // Download Bleame images
  if (sectionInfo?.images) {
    for (let i = 0; i < sectionInfo.images.length; i++) {
      const img = sectionInfo.images[i];
      if (img.src && img.src.startsWith('http')) {
        let ext = path.extname(img.src.split('?')[0]) || '.webp';
        if (ext.length > 5) ext = '.webp';
        const filename = `bleame_ugc_${i}${ext}`;
        const dest = path.join(BLEAME_ASSETS, filename);
        await downloadFile(img.src, dest);
        img.localSrc = `/bleame_assets/${filename}`;
      }
    }
    fs.writeFileSync(path.join(BLEAME_DIR, 'section_info_with_assets.json'), JSON.stringify(sectionInfo, null, 2));
  }
}

async function capturePrimals(browser) {
  console.log('[Primals] Opening page...');
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  await page.goto('https://primals.shop/products/boar-hair-bristle-toothbrush-4-pack', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // Find the section containing "JOIN MILLIONS WHO DITCHED PLASTIC FOR GOOD" or "DITCHED PLASTIC"
  const sectionInfo = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section, p'));
    const target = headings.find(el => el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
    if (!target) return null;
    const section = target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement;
    
    // Collect all images inside this section (posters / thumbnails)
    const images = Array.from(section.querySelectorAll('img')).map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt || ''
    }));

    // Collect videos (if any poster attributes)
    const videos = Array.from(section.querySelectorAll('video')).map(v => ({
      poster: v.poster || '',
      src: '' // leave empty as user instructed
    }));

    return {
      text: section.innerText,
      html: section.outerHTML.slice(0, 50000),
      images,
      videos
    };
  });

  fs.writeFileSync(path.join(PRIMALS_DIR, 'section_info.json'), JSON.stringify(sectionInfo, null, 2));
  console.log('[Primals] Found section info, images count:', sectionInfo?.images?.length || 0);

  // Desktop screenshot
  try {
    const sectionHandle = await page.evaluateHandle(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section, p'));
      const target = headings.find(el => el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
      return target ? (target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement) : null;
    });
    if (sectionHandle) {
      await sectionHandle.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await sectionHandle.screenshot({ path: path.join(PRIMALS_DIR, 'desktop_section.png') });
      console.log('[Primals] Saved desktop_section.png');
    }
  } catch (err) {
    console.error('[Primals] Error capturing section screenshot:', err.message);
  }

  // Mobile screenshot of Primals section
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://primals.shop/products/boar-hair-bristle-toothbrush-4-pack', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mobilePage.waitForTimeout(4000);

  try {
    const mobileHandle = await mobilePage.evaluateHandle(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, div, section, p'));
      const target = headings.find(el => el.innerText && el.innerText.toUpperCase().includes('DITCHED PLASTIC'));
      return target ? (target.closest('section') || target.closest('[class*="section"]') || target.parentElement.parentElement) : null;
    });
    if (mobileHandle) {
      await mobileHandle.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(1000);
      await mobileHandle.screenshot({ path: path.join(PRIMALS_DIR, 'mobile_section.png') });
      console.log('[Primals] Saved mobile_section.png');
    }
  } catch (err) {
    console.error('[Primals] Error capturing mobile section screenshot:', err.message);
  }

  // Download Primals images / video posters
  if (sectionInfo?.images) {
    for (let i = 0; i < sectionInfo.images.length; i++) {
      const img = sectionInfo.images[i];
      if (img.src && img.src.startsWith('http')) {
        let ext = path.extname(img.src.split('?')[0]) || '.webp';
        if (ext.length > 5) ext = '.webp';
        const filename = `primals_img_${i}${ext}`;
        const dest = path.join(PRIMALS_ASSETS, filename);
        await downloadFile(img.src, dest);
        img.localSrc = `/primals_assets/${filename}`;
      }
    }
    fs.writeFileSync(path.join(PRIMALS_DIR, 'section_info_with_assets.json'), JSON.stringify(sectionInfo, null, 2));
  }
}

(async () => {
  console.log('Launching Chrome for dual capture...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  try {
    await captureBleame(browser);
  } catch (e) {
    console.error('Failed Bleame capture:', e);
  }

  try {
    await capturePrimals(browser);
  } catch (e) {
    console.error('Failed Primals capture:', e);
  }

  await browser.close();
  console.log('Capture completed!');
})();

