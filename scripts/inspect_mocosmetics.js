const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

const OUT_DIR = path.resolve(__dirname, '../../PORTFOLIO-2/reference_live');
const SLICES_DIR = path.resolve(OUT_DIR, 'slices');
fs.mkdirSync(SLICES_DIR, { recursive: true });

async function run() {
  console.log('[MoCosmetics Inspector] Launching Chrome...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--no-sandbox'],
  });

  // 1. Desktop full inspection (1440 x 900)
  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopCtx.newPage();

  console.log('[MoCosmetics Inspector] Navigating to https://mocosmetics.ma/...');
  await desktopPage.goto('https://mocosmetics.ma/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await desktopPage.waitForTimeout(4000);

  // Smooth scroll to bottom to load all lazy images & animations
  console.log('[MoCosmetics Inspector] Scrolling through page...');
  const pageMetrics = await desktopPage.evaluate(async () => {
    return await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 350);
        h += 350;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          const totalH = document.body.scrollHeight;
          window.scrollTo(0, 0);
          setTimeout(() => resolve({ totalHeight: totalH, title: document.title }), 1000);
        }
      }, 70);
    });
  });

  console.log(`[MoCosmetics Inspector] Page loaded. Title: "${pageMetrics.title}", Total Height: ${pageMetrics.totalHeight}px`);

  // Take Full-Page Desktop Screenshot
  console.log('[MoCosmetics Inspector] Taking Full Desktop Screenshot...');
  await desktopPage.screenshot({
    path: path.join(OUT_DIR, 'desktop_full.png'),
    fullPage: true,
  });

  // Take Slices across the page
  const totalH = pageMetrics.totalHeight;
  const sliceStep = 900;
  const numSlices = Math.ceil(totalH / sliceStep);
  console.log(`[MoCosmetics Inspector] Taking ${numSlices} viewport slices...`);
  
  for (let i = 0; i < numSlices; i++) {
    const y = i * sliceStep;
    await desktopPage.evaluate((offset) => window.scrollTo(0, offset), y);
    await desktopPage.waitForTimeout(300);
    const sliceName = `slice_${String(i + 1).padStart(2, '0')}_top_${y}.png`;
    await desktopPage.screenshot({
      path: path.join(SLICES_DIR, sliceName),
      fullPage: false,
    });
  }

  // Audit DOM sections, headings, structure
  const domAudit = await desktopPage.evaluate(() => {
    const sections = [];
    // Query main structural containers
    const candidates = document.querySelectorAll('header, nav, main, section, footer, [id^="shopify-section-"], .shopify-section, [class*="section"]');
    candidates.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      if (rect.height > 20 && style.display !== 'none' && style.visibility !== 'hidden') {
        sections.push({
          index: idx,
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: el.className || '',
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height),
          innerTextPreview: (el.innerText || '').slice(0, 200).replace(/\s+/g, ' ').trim(),
        });
      }
    });

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim(),
      className: h.className,
    }));

    return {
      title: document.title,
      sections,
      headings,
    };
  });

  fs.writeFileSync(path.join(OUT_DIR, 'dom_audit.json'), JSON.stringify(domAudit, null, 2), 'utf8');
  console.log(`[MoCosmetics Inspector] DOM audit saved. Found ${domAudit.sections.length} structural elements and ${domAudit.headings.length} headings.`);

  await desktopCtx.close();

  // 2. Mobile Inspection (390 x 844)
  console.log('[MoCosmetics Inspector] Launching Mobile Viewport (390 x 844)...');
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('https://mocosmetics.ma/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await mobilePage.waitForTimeout(3000);

  // Trigger mobile scroll
  await mobilePage.evaluate(async () => {
    return await new Promise((resolve) => {
      let h = 0;
      const t = setInterval(() => {
        window.scrollBy(0, 300);
        h += 300;
        if (h >= document.body.scrollHeight) {
          clearInterval(t);
          window.scrollTo(0, 0);
          setTimeout(resolve, 800);
        }
      }, 60);
    });
  });

  console.log('[MoCosmetics Inspector] Taking Full Mobile Screenshot...');
  await mobilePage.screenshot({
    path: path.join(OUT_DIR, 'mobile_full.png'),
    fullPage: true,
  });

  await mobileCtx.close();
  await browser.close();

  console.log('[MoCosmetics Inspector] Inspection complete! Files in PORTFOLIO-2/reference_live/');
}

run().catch((err) => {
  console.error('[Inspector Error]', err);
  process.exit(1);
});

