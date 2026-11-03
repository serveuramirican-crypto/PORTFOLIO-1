const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(
  path.join(__dirname, '../.agent/skills/website-duplicator/website-duplicator/mirror/products/comfort-stretch-smart-capri-pants-high-rise-all-day-comfort/index.html'),
  'utf8'
);

const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Total style tags in mirror index.html:', styles.length);

const outDir = path.join(__dirname, '../reference_pdp/exact_sections');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let matchedCount = 0;
styles.forEach((s, idx) => {
  const match = s.match(/(sb-why-we-made-this|sb-top3|sb-designed|sb-loved|sb-capri|sbws|sbtb|sbhw|sbof|sbop|sbcc|sbcp|sbrq)/);
  if (match) {
    matchedCount++;
    console.log(`Style tag ${idx} matched ${match[0]} (length: ${s.length})`);
    fs.writeFileSync(path.join(outDir, `matched_style_${idx}.css`), s, 'utf8');
  }
});

console.log('Matched count:', matchedCount);

