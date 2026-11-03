const path = require('path');
const fs = require('fs');
const playwrightPath = path.resolve(__dirname, '../.agent/skills/website-duplicator/website-duplicator/node_modules/playwright');
const { chromium } = require(playwrightPath);

async function main() {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const url = 'https://curvdlondonclothing.com/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  const cssRules = await page.evaluate(() => {
    const rules = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        const cssRules = sheet.cssRules || sheet.rules;
        if (!cssRules) continue;
        for (const rule of Array.from(cssRules)) {
          rules.push(rule.cssText);
        }
      } catch (e) {
        // cross-origin sheet might throw, ignore
      }
    }
    return rules;
  });

  console.log(`Found ${cssRules.length} total CSS rules from document.styleSheets`);
  fs.writeFileSync(path.join(__dirname, '../reference_pdp/exact_sections/all_live_css_rules.css'), cssRules.join('\n\n'), 'utf8');

  // Let's filter rules relevant to our sections
  const prefixes = [
    'sb-', 'sb_', 'sbrq', 'sbwwm', 'sbt3', 'sbdt', 'sblw', 'sbch',
    'sbop', 'sbcc', 'sbof', 'sbcp', 'sbws', 'sbtb', 'sbhw', 'sbot'
  ];

  const matchedRules = cssRules.filter(r => prefixes.some(p => r.includes(p)));
  console.log(`Matched ${matchedRules.length} rules matching section prefixes`);
  fs.writeFileSync(path.join(__dirname, '../reference_pdp/exact_sections/matched_section_rules.css'), matchedRules.join('\n\n'), 'utf8');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
