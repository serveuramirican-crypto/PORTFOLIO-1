const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const htmlPath = path.join(p2, 'reference_live', 'sections_html', 'shopify-section-template--23767866048771__mo_home_avis.html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract all reviews
const reviewCards = [...content.matchAll(/<div class="mo-av__card">([\s\S]*?)<\/div>\s*<\/div>/gi)];
console.log('Reviews count:', reviewCards.length);

const reviews = [];
const cardRegex = /<div class="mo-av__card"[\s\S]*?<b>(.*?)<\/b>[\s\S]*?<small>(.*?)<\/small>[\s\S]*?<p class="mo-av__text">(.*?)<\/p>/g;
let m;
while ((m = cardRegex.exec(content)) !== null) {
  reviews.push({
    name: m[1].trim(),
    source: m[2].trim(),
    text: m[3].trim(),
  });
}
console.log('Parsed reviews:', reviews);

// Extract map info
const mapInfoIdx = content.indexOf('class="mo-av-map__info"');
if (mapInfoIdx !== -1) {
  console.log('Map info:');
  console.log(content.substring(mapInfoIdx, mapInfoIdx + 1500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

