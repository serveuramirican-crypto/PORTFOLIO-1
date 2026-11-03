const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const secDir = path.join(p2, 'reference_live', 'sections_html');

function parseFile(fileName) {
  const content = fs.readFileSync(path.join(secDir, fileName), 'utf8');
  console.log(`\n=================== ${fileName} ===================`);
  // Find all classes matching mo-
  const classMatches = [...content.matchAll(/class=["']([^"']+)["']/g)];
  const uniqueClasses = new Set();
  classMatches.forEach(m => {
    m[1].split(/\s+/).forEach(c => {
      if (c.startsWith('mo-')) uniqueClasses.add(c);
    });
  });
  console.log('MO classes count:', uniqueClasses.size);

  // Find headings
  const headings = [...content.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)];
  console.log('Headings:');
  headings.forEach(h => {
    console.log(`  [${h[1]}] ${h[2].replace(/<[^>]+>/g, '').trim()}`);
  });

  // Find images
  const imgs = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  console.log(`Images count: ${imgs.length}`);
  imgs.slice(0, 10).forEach(img => {
    const src = img[1];
    const alt = (img[0].match(/alt=["']([^"']*)["']/) || [])[1] || '';
    console.log(`  IMG: alt="${alt}" src="${src.substring(0, 60)}"`);
  });
}

parseFile('shopify-section-template--23767866048771__mo_home_m.html');
parseFile('shopify-section-template--23767866048771__mo_home_bas.html');
parseFile('shopify-section-template--23767866048771__mo_home_avis.html');
