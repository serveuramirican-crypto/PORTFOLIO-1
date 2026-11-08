const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const getLookIdx = html.indexOf('Get The Look');
console.log('Context around Get The Look:');
console.log(html.substring(getLookIdx - 200, getLookIdx + 800));

