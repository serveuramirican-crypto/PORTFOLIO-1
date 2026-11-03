const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const pageHtml = fs.readFileSync(path.join(p2, 'reference_live', 'page.html'), 'utf8');

// Find all sections in page.html
const sectionRegex = /<section\b[^>]*id=["']([^"']*)["'][^>]*>|<div\b[^>]*class=["']([^"']*shopify-section[^"']*)["'][^>]*id=["']([^"']*)["']/gi;
let match;
console.log('Sections found in page.html:');
while ((match = sectionRegex.exec(pageHtml)) !== null) {
  const id = match[1] || match[3];
  console.log(' - ' + id);
}

