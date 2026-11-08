const fs = require('fs');
const html = fs.readFileSync('scripts/gorilla_full_main.html', 'utf8');
const accIdx = html.indexOf('details-accordion');
console.log('Accordion:');
console.log(html.substring(accIdx - 50, accIdx + 1000));

