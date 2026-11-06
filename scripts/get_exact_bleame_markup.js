const path = require('path');
const fs = require('fs');

const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  
  await page.goto('https://bleame.com/products/crystal-hair-eraser', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  const sectionDetails = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('*')).find(
      e => e.children.length === 0 && e.innerText && e.innerText.includes('Loving Their Bleame')
    );
    if (!el) return null;

    let section = el;
    while (section && section.tagName !== 'SECTION' && !section.className?.includes('section') && section.parentElement) {
      if (section.parentElement.tagName === 'BODY' || section.parentElement.tagName === 'MAIN') break;
      section = section.parentElement;
    }

    // Get computed styles of section, heading, button, cards
    const headingEl = section.querySelector('h1, h2, h3, [class*="heading"], [class*="title"]') || el;
    const buttonEl = section.querySelector('a, button');
    const cardList = Array.from(section.querySelectorAll('[class*="slide"], [class*="card"], [class*="item"]'));

    const cardsData = cardList.map(c => {
      const img = c.querySelector('img');
      const video = c.querySelector('video');
      const computed = window.getComputedStyle(c);
      return {
        className: c.className,
        width: computed.width,
        height: computed.height,
        borderRadius: computed.borderRadius,
        imgSrc: img ? (img.currentSrc || img.src) : '',
        videoSrc: video ? (video.currentSrc || video.src) : '',
        poster: video ? video.poster : '',
        text: c.innerText?.trim()
      };
    });

    return {
      outerHTML: section.outerHTML,
      headingText: headingEl ? headingEl.innerText : '',
      headingStyle: headingEl ? {
        fontSize: window.getComputedStyle(headingEl).fontSize,
        fontWeight: window.getComputedStyle(headingEl).fontWeight,
        color: window.getComputedStyle(headingEl).color,
        lineHeight: window.getComputedStyle(headingEl).lineHeight,
        fontFamily: window.getComputedStyle(headingEl).fontFamily,
      } : null,
      buttonStyle: buttonEl ? {
        backgroundColor: window.getComputedStyle(buttonEl).backgroundColor,
        color: window.getComputedStyle(buttonEl).color,
        borderRadius: window.getComputedStyle(buttonEl).borderRadius,
        padding: window.getComputedStyle(buttonEl).padding,
        fontSize: window.getComputedStyle(buttonEl).fontSize,
        fontWeight: window.getComputedStyle(buttonEl).fontWeight,
      } : null,
      sectionStyle: {
        backgroundColor: window.getComputedStyle(section).backgroundColor,
        padding: window.getComputedStyle(section).padding,
      },
      cardsCount: cardList.length,
      cardsData: cardsData.slice(0, 15)
    };
  });

  fs.writeFileSync(path.resolve(__dirname, '../reference_bleame/exact_bleame_section.json'), JSON.stringify(sectionDetails, null, 2));
  console.log('Saved exact_bleame_section.json');
  console.log('Heading:', sectionDetails?.headingText);
  console.log('Cards count:', sectionDetails?.cardsCount);
  console.log('Sample cards:', sectionDetails?.cardsData?.slice(0, 5));

  await browser.close();
})();

