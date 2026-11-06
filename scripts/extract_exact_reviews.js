const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });
  
  const looxUrl = 'https://loox.io/widget/xRD5uwFXG6/reviews/7105770193071?h=1793556553001&limit=40&default_tab=automatic';
  await page.goto(looxUrl, { waitUntil: 'networkidle', timeout: 30000 });

  const completeReviews = await page.evaluate(() => {
    // Collect all review IDs
    const testIdEls = Array.from(document.querySelectorAll('[data-testid$="-title"]'));
    const ids = testIdEls.map(el => {
      const match = el.getAttribute('data-testid').match(/^review-(.+)-title$/);
      return match ? match[1] : null;
    }).filter(Boolean);

    const reviews = [];
    ids.forEach((id, index) => {
      const titleEl = document.querySelector(`[data-testid="review-${id}-title"]`);
      const author = titleEl?.childNodes[0]?.textContent?.trim() || '';
      const verified = !!titleEl?.querySelector('.loox-verified-badge, [class*="verified"]');

      // Date
      const dateEl = document.querySelector(`[data-testid="review-${id}-date"]`);
      let date = dateEl ? dateEl.innerText.trim() : '';
      // convert MM/DD/YYYY to DD/MM/YYYY to match user's screenshot
      if (date && date.includes('/')) {
        const parts = date.split('/');
        if (parts.length === 3) {
          const m = parts[0].padStart(2, '0');
          const d = parts[1].padStart(2, '0');
          const y = parts[2];
          date = `${d}/${m}/${y}`;
        }
      }

      // Stars
      let stars = 5;
      const starsEl = document.querySelector(`[data-testid="review-${id}-stars"]`);
      if (starsEl) {
        const fullStars = starsEl.querySelectorAll('[data-lx-fill="full"]');
        if (fullStars.length > 0) {
          stars = fullStars.length;
        } else {
          const ariaLabel = starsEl.querySelector('span')?.getAttribute('aria-label');
          const m = ariaLabel?.match(/(\d+)\s*\/\s*5/);
          if (m) stars = parseInt(m[1], 10);
        }
      }

      // Text
      const textEl = document.querySelector(`[data-testid="review-${id}-text"]`);
      const text = textEl ? textEl.innerText.trim() : '';

      // Media
      const mediaEl = document.querySelector(`[data-testid="review-${id}-media"]`);
      let imgSrc = '';
      let hasVideo = false;
      let moreBadge = '';
      let aspectRatio = 1.0;
      if (mediaEl) {
        const img = mediaEl.querySelector('img');
        if (img) {
          imgSrc = img.currentSrc || img.src || img.getAttribute('data-src') || '';
        }
        hasVideo = !!mediaEl.querySelector('.loox-video-icon, .play, [class*="play"], svg[class*="play"]') || (img && img.alt?.includes('video'));
        const moreEl = mediaEl.querySelector('.badge, .counter, [class*="more"], [class*="badge"]');
        if (moreEl) {
          moreBadge = moreEl.innerText.trim();
        }
        const aspectDiv = mediaEl.querySelector('.image-aspect-ratio');
        if (aspectDiv && aspectDiv.style.paddingBottom) {
          const pb = parseFloat(aspectDiv.style.paddingBottom);
          if (!isNaN(pb)) aspectRatio = pb / 100;
        }
      }

      // Item type
      let itemType = '';
      if (titleEl && titleEl.parentElement) {
        const meta = titleEl.parentElement.querySelector('.metadata');
        if (meta) {
          itemType = meta.innerText.replace('\n', ' ').trim();
        }
      }

      reviews.push({
        id,
        order: index,
        author,
        verified,
        date,
        stars,
        text,
        imgSrc,
        hasVideo,
        moreBadge,
        aspectRatio,
        itemType
      });
    });

    return reviews;
  });

  // Map each imgSrc to downloaded bleame_rev_X file
  const extractedLoox = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../reference_bleame_reviews/extracted_loox.json'), 'utf8'));
  const allImagesList = extractedLoox.allImages || [];

  completeReviews.forEach(rev => {
    if (rev.imgSrc) {
      const idx = allImagesList.findIndex(u => u === rev.imgSrc || (rev.imgSrc.includes(u) || u.includes(rev.imgSrc)));
      if (idx !== -1) {
        let ext = path.extname(allImagesList[idx].split('?')[0]) || '.jpg';
        if (ext.length > 5) ext = '.jpg';
        rev.localImage = `/bleame_review_assets/bleame_rev_${idx}${ext}`;
      } else {
        rev.localImage = rev.imgSrc;
      }
    }
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame_reviews/complete_reviews.json'), JSON.stringify(completeReviews, null, 2));
  console.log(`Saved ${completeReviews.length} fully structured reviews!`);
  console.log(completeReviews.slice(0, 8).map(r => ({ author: r.author, stars: r.stars, date: r.date, hasVideo: r.hasVideo, badge: r.moreBadge, img: r.localImage })));

  await browser.close();
})();

