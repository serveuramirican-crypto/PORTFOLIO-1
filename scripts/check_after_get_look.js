const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const getLookIdx = html.indexOf('Get The Look');
console.log('After Get The Look:');
console.log(html.substring(getLookIdx + 1000, getLookIdx + 3000));

