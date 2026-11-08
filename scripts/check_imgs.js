const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const leftCol = html.substring(html.indexOf('lg:w-[58%]'), html.indexOf('lg:w-[42%]'));
const matches = [...leftCol.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Images in leftCol:', matches);

