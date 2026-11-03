const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const railIdx = content.indexOf('class="mo-hm-rail"');
if (railIdx !== -1) {
  const cardIdx = content.indexOf('class="card__information"', railIdx);
  console.log(content.substring(cardIdx, cardIdx + 1500));
}

