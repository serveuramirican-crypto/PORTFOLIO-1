const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-sections--23767866507523__mo_mascot_bas.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log(content.substring(0, 2000));

