const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Match all elements with id or class starting with mo-
const regex = /<([a-z0-9]+)\s+[^>]*(?:class|id)=["']([^"']*)["'][^>]*>/gi;
let match;
const sectionsFound = [];
while ((match = regex.exec(content)) !== null) {
  const tag = match[1];
  const attr = match[2];
  if (attr.includes('mo-h') || attr.includes('mo-hero') || attr.includes('mo-trust') || attr.includes('mo-cat') || attr.includes('mo-rail') || attr.includes('mo-proof') || attr.includes('mo-dec')) {
    sectionsFound.push({ tag, attr: attr.trim() });
  }
}
console.log('Key sections found:', sectionsFound.slice(0, 30));

