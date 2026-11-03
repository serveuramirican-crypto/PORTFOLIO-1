const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-sections--23767866540291__header.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('Header length:', content.length);
// Extract links in header
const links = [...content.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Header links count:', links.length);
links.slice(0, 15).forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').trim();
  if (text) console.log(`  href: "${l[1]}" -> text: "${text}"`);
});

