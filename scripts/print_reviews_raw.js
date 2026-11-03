const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_avis.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const trackIdx = content.indexOf('class="mo-av__track"');
if (trackIdx !== -1) {
  console.log(content.substring(trackIdx, trackIdx + 3000));
}

