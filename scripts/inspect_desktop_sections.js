const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '../../PORTFOLIO-2/reference_live/page.html'), 'utf8');

// Find all shopify-section tags
const sectionMatches = [...html.matchAll(/<div\s+id=["'](shopify-section-[^"']+)["'][^>]*class=["']([^"']+)["']/gi)];
console.log(`Found ${sectionMatches.length} shopify-sections:`);
sectionMatches.forEach(m => {
  console.log(`- ID: ${m[1]} | Class: ${m[2]}`);
});

