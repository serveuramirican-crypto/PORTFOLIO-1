const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../.agent/reference_pdp/page.html'), 'utf8');
const outDir = path.resolve(__dirname, '../reference_pdp/extracted_sections');
fs.mkdirSync(outDir, { recursive: true });

const sectionIds = [
  'shopify-section-template--26949813928209__sb_rev_quotes',
  'sb-why-we-made-this',
  'sb-top3-reasons',
  'sb-designed-to',
  'sb-loved-by-women',
  'sb-capri-height',
  'sb-capri-onepair',
  'sb-capri-comfort',
  'sb-capri-offer',
  'sb-capri-promise',
  'sb-cv-why-switch',
  'sb-cv-trust-bar'
];

sectionIds.forEach(id => {
  // Try matching <section id="..." or <div id="..."
  const regex = new RegExp(`(<(?:section|div)[^>]*id=["']${id}["'][\\s\\S]*?<\\/(?:section|div)>)`, 'i');
  // Or match from id="id" to the end of its container or next section
  let match = html.match(regex);
  if (!match) {
    const idx = html.indexOf(id);
    if (idx !== -1) {
      match = [html.slice(Math.max(0, idx - 100), idx + 10000)];
    }
  }

  if (match) {
    fs.writeFileSync(path.join(outDir, `${id}.html`), match[0]);
    console.log(`[Extracted] ${id} (${match[0].length} bytes)`);
  } else {
    console.warn(`[Not found] ${id}`);
  }
});

console.log('Done extracting missing sections!');

