const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const queryIdx = content.indexOf('@media screen and (min-width: 750px)');
if (queryIdx !== -1) {
  console.log(content.substring(queryIdx, queryIdx + 2500));
}

