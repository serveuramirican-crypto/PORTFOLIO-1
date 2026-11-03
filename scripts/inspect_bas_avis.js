const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';

['shopify-section-template--23767866048771__mo_home_bas.html',
 'shopify-section-template--23767866048771__mo_home_avis.html'].forEach(f => {
  const htmlPath = path.join(p2, 'reference_live', 'sections_html', f);
  const content = fs.readFileSync(htmlPath, 'utf8');
  const regex = /<([a-z0-9]+)\s+[^>]*(?:class|id)=["']([^"']*)["'][^>]*>/gi;
  let match;
  const sectionsFound = [];
  while ((match = regex.exec(content)) !== null) {
    const attr = match[2];
    if (attr.includes('mo-')) {
      sectionsFound.push(attr.trim());
    }
  }
  console.log(`\n=== ${f} ===`);
  console.log([...new Set(sectionsFound)].slice(0, 25));
});

