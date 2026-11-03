const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

async function run() {
  console.log('[Live Inspector] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('[Live Inspector] Navigating to live PDP...');
  await page.goto('https://curvdlondonclothing.com/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForTimeout(4000);

  // Scroll down smoothly to bottom to trigger everything
  console.log('[Live Inspector] Scrolling through page...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let h = 0;
      const interval = setInterval(() => {
        window.scrollBy(0, 300);
        h += 300;
        if (h >= document.body.scrollHeight) {
          clearInterval(interval);
          window.scrollTo(0, 0);
          setTimeout(resolve, 2000);
        }
      }, 100);
    });
  });

  await page.waitForTimeout(3000);

  // Get full structured DOM sections
  const report = await page.evaluate(() => {
    const sections = [];
    const main = document.querySelector('main') || document.body;
    
    // Check all direct or prominent section containers in main
    const sectionNodes = document.querySelectorAll('main > div, main > section, div[id^="shopify-section"], section[id]');
    
    sectionNodes.forEach((node, index) => {
      const text = node.innerText?.trim() || '';
      if (!text && !node.querySelector('img, video, svg')) return;
      
      const headings = Array.from(node.querySelectorAll('h1, h2, h3, h4, h5, [class*="title"], [class*="heading"]'))
        .map(h => ({ tag: h.tagName, text: h.innerText.trim(), class: h.className }))
        .filter(h => h.text);

      const images = Array.from(node.querySelectorAll('img'))
        .map(img => ({ src: img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight }))
        .filter(img => img.src && !img.src.startsWith('data:'));

      const videos = Array.from(node.querySelectorAll('video'))
        .map(v => ({ src: v.src, poster: v.poster }));

      sections.push({
        index,
        tagName: node.tagName,
        id: node.id,
        className: node.className,
        headings,
        imagesCount: images.length,
        imagesSample: images.slice(0, 6),
        videos,
        textPreview: text.slice(0, 300),
        fullText: text
      });
    });

    return {
      title: document.title,
      bodyScrollHeight: document.body.scrollHeight,
      sections
    };
  });

  const outDir = path.resolve(__dirname, '../.agent/reference_pdp');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(path.join(outDir, 'live_slices'), { recursive: true });

  fs.writeFileSync(path.join(outDir, 'live_sections_audit.json'), JSON.stringify(report, null, 2));
  console.log(`[Live Inspector] Found ${report.sections.length} sections. Total height: ${report.bodyScrollHeight}px.`);

  // Slice screenshots every 1000px so we see every single piece visually
  const totalHeight = report.bodyScrollHeight;
  const sliceHeight = 900;

  for (let top = 0; top < totalHeight; top += sliceHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await page.waitForTimeout(400);
    const sliceIndex = String(Math.floor(top / sliceHeight) + 1).padStart(2, '0');
    await page.screenshot({
      path: path.join(outDir, `live_slices/slice_${sliceIndex}_top_${top}.png`),
      fullPage: false
    });
  }

  console.log('[Live Inspector] Slices saved to .agent/reference_pdp/live_slices/');
  await browser.close();
}

run().catch(err => {
  console.error('[Live Inspector Error]', err);
  process.exit(1);
});
