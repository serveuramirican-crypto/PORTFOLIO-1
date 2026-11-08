const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const leftCol = html.substring(html.indexOf('lg:w-[58%]'), html.indexOf('lg:w-[42%]'));
console.log(leftCol.substring(leftCol.indexOf('<div class="grid'), leftCol.indexOf('<div class="grid') + 500));

