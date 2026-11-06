const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const parsed = await page.evaluate(() => {
    // Each review card has container. Let's find elements that contain reviews.
    // In Loox grid, reviews are usually inside columns (.grid-column) or direct cards.
    const gridColumns = document.querySelectorAll('.grid-column, [class*="column"], .grid-item');
    console.log('Columns found:', gridColumns.length);

    // Let's find review cards: elements that contain a .main-text or [data-testid$="-text"]
    const textEls = Array.from(document.querySelectorAll('[data-testid$="-text"]'));
    const cards = textEls.map(tEl => {
      // Find the card container
      let cur = tEl;
      while (cur && cur.parentElement && !cur.getAttribute('data-id') && !cur.className?.includes('card') && !cur.className?.includes('item') && !cur.className?.includes('grid-item')) {
        if (cur.parentElement.className?.includes('grid-column') || cur.parentElement.id === 'grid' || cur.parentElement.className?.includes('grid')) {
          break;
        }
        cur = cur.parentElement;
      }

      const card = cur;
      const authorEl = card.querySelector('[data-testid$="-title"]');
      const author = authorEl ? authorEl.childNodes[0]?.textContent?.trim() : '';
      const verified = !!card.querySelector('.loox-verified-badge, [class*="verified"]');
      
      const dateEl = card.querySelector('.date, [class*="date"], [data-testid$="-date"]');
      const date = dateEl ? dateEl.innerText.trim() : '';

      const text = tEl.innerText.trim();

      // Stars
      const starIcons = card.querySelectorAll('.loox-icon-star, svg[class*="star"], [class*="star"]');
      let stars = 5;
      const filledStars = card.querySelectorAll('[href*="star-filled"], [class*="star-filled"], .filled');
      if (filledStars.length > 0) {
        stars = filledStars.length;
      }

      // Image / Video
      const img = card.querySelector('img');
      const imgSrc = img ? (img.currentSrc || img.src || img.getAttribute('data-src') || '') : '';
      const hasVideo = !!card.querySelector('.play, [class*="play"], svg[class*="play"], [data-testid*="play"]');
      const moreBadge = card.querySelector('[class*="badge"], [class*="counter"], [class*="more"]')?.innerText?.trim() || '';
      const itemTypeEl = card.querySelector('.metadata');
      const itemType = itemTypeEl ? itemTypeEl.innerText.replace('\n', ' ').trim() : '';

      return {
        author,
        verified,
        date,
        text,
        stars,
        imgSrc,
        hasVideo,
        moreBadge,
        itemType
      };
    });

    return {
      totalCards: cards.length,
      cards: cards.slice(0, 25)
    };
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame_reviews/reviews_clean.json'), JSON.stringify(parsed, null, 2));
  console.log('Clean reviews extracted:', parsed.totalCards);
  console.log('Sample cards:', parsed.cards.slice(0, 5));

  await browser.close();
})();

