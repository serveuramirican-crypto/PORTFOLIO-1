const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const pageHtml = fs.readFileSync(path.join(p2, 'reference_live', 'page.html'), 'utf8');

const mainIdx = pageHtml.indexOf('id="MainContent"');
const mainEnd = pageHtml.indexOf('</main>');
console.log('Main content substring:');
const mainContent = pageHtml.substring(mainIdx, mainEnd);

// Find all children divs or sections
const divMatches = [...mainContent.matchAll(/<div\s+id=["']([^"']+)["']/g)];
divMatches.forEach(m => console.log('Child in main:', m[1]));

