const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_bas.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const aboutIdx = content.indexOf('class="mo-hb-about"');
if (aboutIdx !== -1) {
  console.log(content.substring(aboutIdx, aboutIdx + 2000));
}

