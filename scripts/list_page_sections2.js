const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const pageHtml = fs.readFileSync(path.join(p2, 'reference_live', 'page.html'), 'utf8');

const regex = /id=["'](shopify-section-[^"']+)["']/gi;
let match;
const ids = [];
while ((match = regex.exec(pageHtml)) !== null) {
  ids.push(match[1]);
}
console.log('Shopify section IDs in page.html:', [...new Set(ids)]);

