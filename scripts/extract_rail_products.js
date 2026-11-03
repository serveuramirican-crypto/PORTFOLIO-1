const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_m.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// The file has two mo-hm-rail sections:
const railMatches = [...content.matchAll(/<div class="mo-hm-rail">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];
console.log('Rail count:', railMatches.length);

const rails = [];
// Find headings
const railRegex = /<div class="mo-hm-rail">([\s\S]*?)(?=<div class="mo-hm-rail"|<div class="mo-hm-conf"|<a class="mo-hm-dec"|$)/g;
let rm;
let count = 0;
while ((rm = railRegex.exec(content)) !== null) {
  count++;
  const railHtml = rm[1];
  const titleMatch = railHtml.match(/<h2>(.*?)<\/h2>/);
  const title = titleMatch ? titleMatch[1].trim() : 'Rail ' + count;
  console.log(`\n=================== Rail ${count}: ${title} ===================`);

  // Extract products
  const productCards = [...railHtml.matchAll(/<product-component[\s\S]*?<\/product-component>/gi)];
  console.log(`Products count: ${productCards.length}`);

  const products = [];
  productCards.forEach((pc, idx) => {
    const pStr = pc[0];
    const title = (pStr.match(/title-template--[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/) || [])[1]?.trim() || '';
    const vendor = (pStr.match(/caption-with-letter-spacing light">([\s\S]*?)<\/div>/) || [])[1]?.trim() || '';
    const price = (pStr.match(/<span class="price-item price-item--regular">\s*([\s\S]*?)\s*<\/span>/) || [])[1]?.trim() || '';
    const imgSrc = (pStr.match(/<img[^>]+src="([^">]+)"/) || [])[1] || '';
    const isSoldOut = pStr.includes('disabled') || pStr.includes('Épuisé') || pStr.includes('%puis');

    products.push({ idx, title, vendor, price, imgSrc, isSoldOut });
    console.log(`  #${idx + 1}: [${vendor}] ${title} -> ${price} (soldOut: ${isSoldOut})`);
  });
  rails.push({ title, products });
}

fs.writeFileSync(path.join(p2, 'reference_live', 'rail_products.json'), JSON.stringify(rails, null, 2), 'utf8');

