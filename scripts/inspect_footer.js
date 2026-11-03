const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-sections--23767866507523__footer.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const headings = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
headings.forEach(h => console.log('Footer H2:', h[1].replace(/<[^>]+>/g, '').trim()));

const links = [...content.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Footer links:');
links.forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').trim();
  if (text) console.log(`  href: "${l[1]}" -> text: "${text}"`);
});

