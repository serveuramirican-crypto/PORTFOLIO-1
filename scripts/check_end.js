const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const heroEnd = html.indexOf('</main>');
console.log('Total length of html:', html.length);
console.log('After right column:');
const rightColIdx = html.indexOf('lg:w-[42%]');
console.log(html.substring(html.length - 2000));

