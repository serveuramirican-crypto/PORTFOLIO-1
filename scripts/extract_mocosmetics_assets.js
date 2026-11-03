const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const P2_DIR = path.resolve(__dirname, '../../PORTFOLIO-2');
const REF_DIR = path.resolve(P2_DIR, 'reference_live');
const IMAGES_DIR = path.resolve(P2_DIR, 'public/images');
fs.mkdirSync(REF_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

async function downloadFile(url, dest) {
  return new Promise((resolve) => {
    try {
      const fullUrl = url.startsWith('//') ? 'https:' + url : url;
      const parsed = new URL(fullUrl);
      const mod = parsed.protocol === 'https:' ? https : http;
      const file = fs.createWriteStream(dest);
      mod.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 200) {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
        } else {
          file.close();
          try { fs.unlinkSync(dest); } catch (e) {}
          resolve(false);
        }
      }).on('error', () => {
        file.close();
        try { fs.unlinkSync(dest); } catch (e) {}
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

async function run() {
  console.log('[MoCosmetics Extractor] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('[MoCosmetics Extractor] Navigating to https://mocosmetics.ma/...');
  await page.goto('https://mocosmetics.ma/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(4000);

  // Smooth scroll
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 350);
        h += 350;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(resolve, 800);
        }
      }, 60);
    });
  });

  console.log('[MoCosmetics Extractor] Extracting full outerHTML...');
  const html = await page.content();
  fs.writeFileSync(path.join(REF_DIR, 'page.html'), html, 'utf8');

  console.log('[MoCosmetics Extractor] Extracting CSS rules...');
  const cssRules = await page.evaluate(() => {
    const rules = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const cssRules = sheet.cssRules || sheet.rules;
        if (!cssRules) continue;
        for (const rule of Array.from(cssRules)) {
          rules.push(rule.cssText);
        }
      } catch (e) {}
    }
    return rules;
  });
  fs.writeFileSync(path.join(REF_DIR, 'all_styles.css'), cssRules.join('\n\n'), 'utf8');

  // Extract all sections raw HTML
  console.log('[MoCosmetics Extractor] Extracting structural sections outerHTML...');
  const sectionsData = await page.evaluate(() => {
    const data = {};
    const elements = document.querySelectorAll('header, [id^="shopify-section-"], .announcement-bar, footer');
    elements.forEach(el => {
      const key = el.id || el.tagName.toLowerCase();
      if (!data[key]) {
        data[key] = {
          tag: el.tagName.toLowerCase(),
          id: el.id,
          className: el.className,
          html: el.outerHTML,
          text: el.innerText,
        };
      }
    });
    return data;
  });

  const SECTIONS_DIR = path.join(REF_DIR, 'sections_html');
  fs.mkdirSync(SECTIONS_DIR, { recursive: true });
  for (const [key, val] of Object.entries(sectionsData)) {
    const safeName = key.replace(/[^a-zA-Z0-9_-]/g, '_');
    fs.writeFileSync(path.join(SECTIONS_DIR, `${safeName}.html`), val.html, 'utf8');
  }

  // Extract images
  console.log('[MoCosmetics Extractor] Extracting images...');
  const images = await page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll('img').forEach(img => {
      const src = img.currentSrc || img.src || img.getAttribute('data-src') || img.getAttribute('srcset');
      if (src && !src.startsWith('data:')) {
        urls.add(src.split(' ')[0]);
      }
    });
    return Array.from(urls);
  });

  console.log(`[MoCosmetics Extractor] Found ${images.length} images. Downloading key assets...`);
  fs.writeFileSync(path.join(REF_DIR, 'images_list.json'), JSON.stringify(images, null, 2), 'utf8');

  let downloaded = 0;
  for (let i = 0; i < Math.min(images.length, 50); i++) {
    const imgUrl = images[i];
    try {
      const cleanUrl = imgUrl.split('?')[0];
      const ext = path.extname(cleanUrl) || '.jpg';
      const filename = `asset_${String(i + 1).padStart(2, '0')}${ext}`;
      const dest = path.join(IMAGES_DIR, filename);
      const success = await downloadFile(imgUrl, dest);
      if (success) downloaded++;
    } catch (e) {}
  }
  console.log(`[MoCosmetics Extractor] Downloaded ${downloaded} assets into PORTFOLIO-2/public/images/`);

  await browser.close();
  console.log('[MoCosmetics Extractor] Asset extraction complete!');
}

run().catch(err => {
  console.error('[Extractor Error]', err);
  process.exit(1);
});

