const fs = require('fs');
const path = require('path');

const p2 = 'c:\\Users\\dell\\Downloads\\PORTFOLIO-2';
const pageHtml = fs.readFileSync(path.join(p2, 'reference_live', 'page.html'), 'utf8');

// Find all matches for mo-hm-keep
const matches = [...pageHtml.matchAll(/class=["'][^"']*mo-hm-keep[^"']*["']/g)];
console.log('mo-hm-keep occurrences:', matches.length);

// Let's check the exact CSS for mo-hm-keep
const cssMatch = pageHtml.match(/mo-hm-keep[^{]*\{[^}]*\}/g);
console.log('mo-hm-keep CSS:', cssMatch);

