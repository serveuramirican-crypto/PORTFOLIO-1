const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const styleIdx = content.indexOf('<style>');
if (styleIdx !== -1) {
  const styleEnd = content.indexOf('</style>', styleIdx);
  console.log(content.substring(styleIdx, styleEnd + 8));
}

