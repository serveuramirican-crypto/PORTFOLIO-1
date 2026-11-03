const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Let's find each main class block
const blocks = ['mo-hm-hero', 'mo-hm-trust', 'mo-hm-cats', 'mo-hm-ess', 'mo-hm-conf', 'mo-hm-dec'];
blocks.forEach(b => {
  const idx = content.indexOf(`class="${b}"`);
  if (idx !== -1) {
    console.log(`\n=================== BLOCK: ${b} ===================`);
    console.log(content.substring(idx, idx + 1000));
  }
});

