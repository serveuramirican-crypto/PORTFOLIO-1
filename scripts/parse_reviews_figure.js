const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_avis.html');
const content = fs.readFileSync(htmlPath, 'utf8');

const regex = /<figure class="mo-av__card">([\s\S]*?)<\/figure>/g;
let m;
const reviews = [];
while ((m = regex.exec(content)) !== null) {
  const card = m[1];
  const ini = (card.match(/class="mo-av__ini"[^>]*>(.*?)<\/span>/) || [])[1]?.trim();
  const name = (card.match(/<b>(.*?)<\/b>/) || [])[1]?.trim();
  const small = (card.match(/<small>(.*?)<\/small>/) || [])[1]?.trim();
  const text = (card.match(/<blockquote class="mo-av__text">(.*?)<\/blockquote>/) || [])[1]?.trim();
  reviews.push({ ini, name, small, text });
}
console.log(`Found ${reviews.length} reviews:`);
reviews.forEach((r, i) => console.log(`${i + 1}. [${r.ini}] ${r.name}: ${r.text.substring(0, 70)}...`));

fs.writeFileSync(path.join(p2, 'reference_live', 'customer_reviews.json'), JSON.stringify(reviews, null, 2), 'utf8');

