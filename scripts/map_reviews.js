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
    // Collect all review IDs accurately
    const testIdEls = Array.from(document.querySelectorAll('[data-testid]'));
    const ids = [];
    testIdEls.forEach(el => {
      const tid = el.getAttribute('data-testid');
      const match = tid.match(/^review-(.+)-(title|text|media|date|rating)$/);
      if (match && !ids.includes(match[1])) {
        ids.push(match[1]);
      }
    });

    const reviews = [];
    ids.forEach((id, index) => {
      // Find title / author
      const titleEl = document.querySelector(`[data-testid="review-${id}-title"]`);
      let author = '';
      let verified = false;
      if (titleEl) {
        author = titleEl.childNodes[0]?.textContent?.trim() || '';
        verified = !!titleEl.querySelector('.loox-verified-badge, [class*="verified"]');
      }

      // Date
      const dateEl = document.querySelector(`[data-testid="review-${id}-date"]`);
      const date = dateEl ? dateEl.innerText.trim() : '';

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

      // Stars
      let stars = 5;
      const cardContainer = titleEl ? titleEl.closest('.grid-column > div, [class*="grid-item"], .block') : null;
      const ratingContainer = document.querySelector(`[data-testid="review-${id}-rating"]`) || titleEl?.parentElement;
      if (ratingContainer) {
        const fullStars = ratingContainer.querySelectorAll('[href*="star-filled"], [class*="star-filled"], .filled');
        if (fullStars.length > 0) stars = fullStars.length;
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

    return { reviews };
  });

  // Map each imgSrc to the downloaded bleame_rev_X file
  const extractedLoox = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../reference_bleame_reviews/extracted_loox.json'), 'utf8'));
  const allImagesList = extractedLoox.allImages || [];

  completeReviews.reviews.forEach(rev => {
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
  console.log(`Saved ${completeReviews.reviews.length} processed reviews!`);
  console.log('Processed first 6:', JSON.stringify(completeReviews.reviews.slice(0, 6), null, 2));

  await browser.close();
})();
